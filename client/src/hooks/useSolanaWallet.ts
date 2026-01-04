import { useState, useEffect, useCallback } from 'react';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

// Phantom wallet types
interface PhantomProvider {
  isPhantom?: boolean;
  connect: () => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  signAndSendTransaction: (transaction: Transaction) => Promise<{ signature: string }>;
  on: (event: string, handler: (args: any) => void) => void;
  removeListener: (event: string, handler: (args: any) => void) => void;
}

declare global {
  interface Window {
    solana?: PhantomProvider;
  }
}

// Solana network configuration
const NETWORK_URL = 'https://api.devnet.solana.com'; // Use devnet for testing
// const NETWORK_URL = 'https://api.mainnet-beta.solana.com'; // Use mainnet for production

// Program ID (replace with actual deployed program)
const PROGRAM_ID = new PublicKey('11111111111111111111111111111111'); // TODO: Replace with actual program ID

export interface SolanaWalletState {
  address: string | null;
  publicKey: PublicKey | null;
  isConnected: boolean;
  isConnecting: boolean;
  balance: string | null;
  error: string | null;
}

export interface MintResult {
  success: boolean;
  signature?: string;
  error?: string;
}

export function useSolanaWallet() {
  const [state, setState] = useState<SolanaWalletState>({
    address: null,
    publicKey: null,
    isConnected: false,
    isConnecting: false,
    balance: null,
    error: null,
  });

  // Check if Phantom is installed
  const isPhantomInstalled = useCallback(() => {
    return typeof window !== 'undefined' && window.solana?.isPhantom === true;
  }, []);

  // Get connection
  const getConnection = useCallback(() => {
    return new Connection(NETWORK_URL, 'confirmed');
  }, []);

  // Connect wallet
  const connect = useCallback(async () => {
    if (!isPhantomInstalled()) {
      setState(prev => ({ ...prev, error: 'Phantom wallet is not installed. Please install Phantom to continue.' }));
      return false;
    }

    setState(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      const provider = window.solana!;
      const response = await provider.connect();
      const publicKey = response.publicKey;
      const address = publicKey.toString();

      // Get balance
      const connection = getConnection();
      const balance = await connection.getBalance(publicKey);
      const balanceInSol = (balance / LAMPORTS_PER_SOL).toFixed(4);

      setState({
        address,
        publicKey,
        isConnected: true,
        isConnecting: false,
        balance: balanceInSol,
        error: null,
      });

      return true;
    } catch (error: any) {
      console.error('Failed to connect wallet:', error);
      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: error.message || 'Failed to connect wallet',
      }));
      return false;
    }
  }, [isPhantomInstalled, getConnection]);

  // Disconnect wallet
  const disconnect = useCallback(async () => {
    if (window.solana?.isPhantom) {
      try {
        await window.solana.disconnect();
      } catch (error) {
        console.error('Failed to disconnect:', error);
      }
    }

    setState({
      address: null,
      publicKey: null,
      isConnected: false,
      isConnecting: false,
      balance: null,
      error: null,
    });
  }, []);

  // Get current NFT price (mock implementation)
  const getCurrentPrice = useCallback(async (): Promise<string> => {
    // TODO: Fetch actual price from Solana program
    // For now, return base price
    return '0.2'; // 0.2 SOL base price
  }, []);

  // Calculate total price for multiple NFTs (bonding curve)
  const calculateTotalPrice = useCallback(async (quantity: number): Promise<string> => {
    // TODO: Fetch actual price from Solana program
    // For now, use simple bonding curve calculation
    const basePrice = 0.2; // 0.2 SOL
    const increment = 0.2; // 0.2 SOL per mint
    
    let total = 0;
    for (let i = 0; i < quantity; i++) {
      total += basePrice + (increment * i);
    }
    
    return total.toFixed(2);
  }, []);

  // Mint NFT
  const mint = useCallback(async (quantity: number): Promise<MintResult> => {
    if (!state.isConnected || !state.publicKey) {
      return { success: false, error: 'Wallet not connected' };
    }

    try {
      const connection = getConnection();
      const provider = window.solana!;

      // Calculate total price
      const totalPriceStr = await calculateTotalPrice(quantity);
      const totalPriceLamports = Math.floor(parseFloat(totalPriceStr) * LAMPORTS_PER_SOL);

      // Create transaction
      // TODO: Replace with actual program instruction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: state.publicKey,
          toPubkey: PROGRAM_ID, // Replace with actual treasury address
          lamports: totalPriceLamports,
        })
      );

      // Get recent blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = state.publicKey;

      // Sign and send transaction
      const { signature } = await provider.signAndSendTransaction(transaction);

      // Confirm transaction
      await connection.confirmTransaction(signature, 'confirmed');

      return {
        success: true,
        signature,
      };
    } catch (error: any) {
      console.error('Mint failed:', error);
      
      // Parse error message
      let errorMessage = 'Mint failed';
      if (error.message?.includes('User rejected')) {
        errorMessage = 'Transaction was rejected by user';
      } else if (error.message) {
        errorMessage = error.message;
      }

      return { success: false, error: errorMessage };
    }
  }, [state.isConnected, state.publicKey, getConnection, calculateTotalPrice]);

  // Listen to wallet events
  useEffect(() => {
    if (!isPhantomInstalled()) return;

    const provider = window.solana!;

    const handleConnect = (publicKey: PublicKey) => {
      console.log('Wallet connected:', publicKey.toString());
    };

    const handleDisconnect = () => {
      console.log('Wallet disconnected');
      disconnect();
    };

    const handleAccountChanged = (publicKey: PublicKey | null) => {
      if (publicKey) {
        setState(prev => ({
          ...prev,
          address: publicKey.toString(),
          publicKey,
        }));
      } else {
        disconnect();
      }
    };

    provider.on('connect', handleConnect);
    provider.on('disconnect', handleDisconnect);
    provider.on('accountChanged', handleAccountChanged);

    return () => {
      provider.removeListener('connect', handleConnect);
      provider.removeListener('disconnect', handleDisconnect);
      provider.removeListener('accountChanged', handleAccountChanged);
    };
  }, [isPhantomInstalled, disconnect]);

  // Check if already connected on mount
  useEffect(() => {
    if (!isPhantomInstalled()) return;

    const checkConnection = async () => {
      try {
        const provider = window.solana!;
        
        // Phantom automatically connects if previously authorized
        if (provider.isPhantom) {
          // @ts-ignore - Phantom connect method accepts options but types might be outdated
          const response = await provider.connect({ onlyIfTrusted: true });
          const publicKey = response.publicKey;
          const address = publicKey.toString();

          const connection = getConnection();
          const balance = await connection.getBalance(publicKey);
          const balanceInSol = (balance / LAMPORTS_PER_SOL).toFixed(4);

          setState({
            address,
            publicKey,
            isConnected: true,
            isConnecting: false,
            balance: balanceInSol,
            error: null,
          });
        }
      } catch (error) {
        // User hasn't authorized connection yet
        console.log('Not connected yet');
      }
    };

    checkConnection();
  }, [isPhantomInstalled, getConnection]);

  return {
    ...state,
    isPhantomInstalled: isPhantomInstalled(),
    connect,
    disconnect,
    getCurrentPrice,
    calculateTotalPrice,
    mint,
  };
}
