import { useState, useEffect, useCallback } from 'react';
import { ethers, Eip1193Provider } from 'ethers';

declare global {
  interface Window {
    ethereum?: Eip1193Provider & {
      on: (event: string, handler: (args: any) => void) => void;
      removeListener: (event: string, handler: (args: any) => void) => void;
    };
  }
}

// Spicy Club NFT Contract ABI (simplified for minting)
const SPICY_CLUB_ABI = [
  'function mint(uint256 quantity) external payable',
  'function getCurrentPrice() external view returns (uint256)',
  'function totalSupply() external view returns (uint256)',
  'function MAX_SUPPLY() external view returns (uint256)',
  'function PRICE_INCREMENT() external view returns (uint256)',
  'function BASE_PRICE() external view returns (uint256)',
];

// Contract addresses (replace with actual deployed addresses)
const CONTRACT_ADDRESSES = {
  mainnet: '0x0000000000000000000000000000000000000000', // TODO: Replace with mainnet address
  sepolia: '0x0000000000000000000000000000000000000000', // TODO: Replace with testnet address
};

export interface EthereumWalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  chainId: number | null;
  balance: string | null;
  error: string | null;
}

export interface MintResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
}

export function useEthereumWallet() {
  const [state, setState] = useState<EthereumWalletState>({
    address: null,
    isConnected: false,
    isConnecting: false,
    chainId: null,
    balance: null,
    error: null,
  });

  // Check if MetaMask is installed
  const isMetaMaskInstalled = useCallback(() => {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  }, []);

  // Get provider
  const getProvider = useCallback(() => {
    if (!isMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed');
    }

    // Handle multiple injected providers (e.g. MetaMask + Phantom)
    // Phantom and other wallets might inject themselves as window.ethereum
    // We need to be careful about which one we select if possible, or handle the conflict
    let provider = window.ethereum;

    // If multiple providers are injected, window.ethereum might be an object with providers array
    // or we might need to look for specific flags
    // @ts-ignore
    if (window.ethereum?.providers?.length) {
      // @ts-ignore
      const providers = window.ethereum.providers;
      // Prefer MetaMask if available
      const metaMaskProvider = providers.find((p: any) => p.isMetaMask && !p.isPhantom);
      if (metaMaskProvider) {
        provider = metaMaskProvider;
      }
    }

    return new ethers.BrowserProvider(provider as Eip1193Provider);
  }, [isMetaMaskInstalled]);

  // Get contract instance
  const getContract = useCallback(async () => {
    const provider = getProvider();
    const signer = await provider.getSigner();
    const network = await provider.getNetwork();
    
    // Use sepolia for testnet, mainnet for production
    const contractAddress = network.chainId === BigInt(1) 
      ? CONTRACT_ADDRESSES.mainnet 
      : CONTRACT_ADDRESSES.sepolia;

    return new ethers.Contract(contractAddress, SPICY_CLUB_ABI, signer);
  }, [getProvider]);

  // Connect wallet
  const connect = useCallback(async () => {
    if (!isMetaMaskInstalled()) {
      setState(prev => ({ ...prev, error: 'MetaMask is not installed. Please install MetaMask to continue.' }));
      return false;
    }

    setState(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      const provider = getProvider();
      
      // Request account access
      // Using .send('eth_requestAccounts', []) is standard
      const accounts = await provider.send('eth_requestAccounts', []).catch((err) => {
        throw err;
      });
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found');
      }
      
      const address = accounts[0];

      // Get network info
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);

      // Get balance
      let balanceInEth = '0.0';
      try {
        const balance = await provider.getBalance(address);
        balanceInEth = ethers.formatEther(balance);
      } catch (balanceError) {
        console.warn('Failed to fetch balance:', balanceError);
      }

      setState({
        address,
        isConnected: true,
        isConnecting: false,
        chainId,
        balance: balanceInEth,
        error: null,
      });

      return true;
    } catch (error: any) {
      console.error('Failed to connect wallet:', error);
      
      let errorMessage = error.message || 'Failed to connect wallet';
      
      // Handle common error codes
      if (error.code === 4001 || error.info?.error?.code === 4001) {
        errorMessage = 'User rejected the connection request';
      } else if (errorMessage.includes('Unexpected error') || errorMessage.includes('User rejected')) {
        // Handle Phantom/MetaMask conflict errors
        errorMessage = 'Connection failed. Please check your wallet extension settings or try disabling conflicting wallets.';
      }

      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: errorMessage,
      }));
      return false;
    }
  }, [isMetaMaskInstalled, getProvider]);

  // Disconnect wallet
  const disconnect = useCallback(() => {
    setState({
      address: null,
      isConnected: false,
      isConnecting: false,
      chainId: null,
      balance: null,
      error: null,
    });
  }, []);

  // Get current NFT price from contract
  const getCurrentPrice = useCallback(async (): Promise<string> => {
    try {
      const contract = await getContract();
      const price = await contract.getCurrentPrice();
      return ethers.formatEther(price);
    } catch (error) {
      console.error('Failed to get current price:', error);
      return '0.01'; // Fallback to base price
    }
  }, [getContract]);

  // Calculate total price for multiple NFTs (bonding curve)
  const calculateTotalPrice = useCallback(async (quantity: number): Promise<string> => {
    try {
      const contract = await getContract();
      const currentPrice = await contract.getCurrentPrice();
      const priceIncrement = await contract.PRICE_INCREMENT();

      // Calculate sum of prices: currentPrice + (currentPrice + increment) + (currentPrice + 2*increment) + ...
      let totalPrice = BigInt(0);
      for (let i = 0; i < quantity; i++) {
        totalPrice += currentPrice + (priceIncrement * BigInt(i));
      }

      return ethers.formatEther(totalPrice);
    } catch (error) {
      console.error('Failed to calculate total price:', error);
      // Fallback calculation: base price 0.01 ETH, increment 0.01 ETH
      const basePrice = 0.01;
      const increment = 0.01;
      let total = 0;
      for (let i = 0; i < quantity; i++) {
        total += basePrice + (increment * i);
      }
      return total.toFixed(2);
    }
  }, [getContract]);

  // Mint NFT
  const mint = useCallback(async (quantity: number): Promise<MintResult> => {
    if (!state.isConnected) {
      return { success: false, error: 'Wallet not connected' };
    }

    try {
      const contract = await getContract();
      
      // Calculate total price
      const totalPriceStr = await calculateTotalPrice(quantity);
      const totalPrice = ethers.parseEther(totalPriceStr);

      // Send transaction
      const tx = await contract.mint(quantity, { value: totalPrice });
      
      // Wait for confirmation
      const receipt = await tx.wait();

      return {
        success: true,
        transactionHash: receipt.hash,
      };
    } catch (error: any) {
      console.error('Mint failed:', error);
      
      // Parse error message
      let errorMessage = 'Mint failed';
      if (error.code === 'ACTION_REJECTED') {
        errorMessage = 'Transaction was rejected by user';
      } else if (error.message) {
        errorMessage = error.message;
      }

      return { success: false, error: errorMessage };
    }
  }, [state.isConnected, getContract, calculateTotalPrice]);

  // Listen to account changes
  useEffect(() => {
    if (!isMetaMaskInstalled()) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected wallet
        disconnect();
      } else if (accounts[0] !== state.address) {
        // User switched account
        setState(prev => ({ ...prev, address: accounts[0] }));
      }
    };

    const handleChainChanged = (chainId: string) => {
      // Reload page on chain change (recommended by MetaMask)
      window.location.reload();
    };

    window.ethereum?.on('accountsChanged', handleAccountsChanged);
    window.ethereum?.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum?.removeListener('chainChanged', handleChainChanged);
    };
  }, [isMetaMaskInstalled, disconnect, state.address]);

  // Check if already connected on mount
  useEffect(() => {
    if (!isMetaMaskInstalled()) return;

    const checkConnection = async () => {
      try {
        const provider = getProvider();
        const accounts = await provider.send('eth_accounts', []);
        
        if (accounts.length > 0) {
          // Already connected
          const address = accounts[0];
          const network = await provider.getNetwork();
          const balance = await provider.getBalance(address);

          setState({
            address,
            isConnected: true,
            isConnecting: false,
            chainId: Number(network.chainId),
            balance: ethers.formatEther(balance),
            error: null,
          });
        }
      } catch (error) {
        console.error('Failed to check connection:', error);
      }
    };

    checkConnection();
  }, [isMetaMaskInstalled, getProvider]);

  return {
    ...state,
    isMetaMaskInstalled: isMetaMaskInstalled(),
    connect,
    disconnect,
    getCurrentPrice,
    calculateTotalPrice,
    mint,
  };
}
