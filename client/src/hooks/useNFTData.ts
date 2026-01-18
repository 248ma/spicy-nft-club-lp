import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractABI from '../contracts/SpicyBondingCurve721.abi.json';
import { CONTRACTS, RPC_ENDPOINTS, CURRENT_ENV } from '../contracts/config';

interface NFTData {
  eth: {
    currentPrice: string;
    totalMinted: number;
    maxSupply: number;
    nextTokenId: number;
    isLoading: boolean;
    error: string | null;
  };
  sol: {
    currentPrice: string;
    totalMinted: number;
    maxSupply: number;
    nextTokenId: number;
    isLoading: boolean;
    error: string | null;
  };
}

export const useNFTData = () => {
  const [data, setData] = useState<NFTData>({
    eth: {
      currentPrice: '0.01',
      totalMinted: 0,
      maxSupply: 200,
      nextTokenId: 1,
      isLoading: true,
      error: null,
    },
    sol: {
      currentPrice: 'N/A',
      totalMinted: 0,
      maxSupply: 0,
      nextTokenId: 0,
      isLoading: false,
      error: 'Solana chain is coming soon',
    },
  });

  const fetchEthereumData = async () => {
    try {
      const contractAddress = CONTRACTS.ethereum[CURRENT_ENV as keyof typeof CONTRACTS.ethereum];
      if (!contractAddress) {
        throw new Error('Contract address not configured');
      }

      const rpcEndpoints = RPC_ENDPOINTS.ethereum[CURRENT_ENV as keyof typeof RPC_ENDPOINTS.ethereum];
      const endpoints = Array.isArray(rpcEndpoints) ? rpcEndpoints : [rpcEndpoints];
      
      let lastError: Error | null = null;
      
      // Try each RPC endpoint until one succeeds
      for (const endpoint of endpoints) {
        try {
          const provider = new ethers.JsonRpcProvider(endpoint);
          const contract = new ethers.Contract(contractAddress, contractABI, provider);

          // Fetch data from contract with timeout
          const [currentPrice, totalMinted, maxSupply] = await Promise.race([
            Promise.all([
              contract.getCurrentPrice(),
              contract.totalMinted(),
              contract.MAX_SUPPLY(),
            ]),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('RPC timeout')), 5000)
            ),
          ]) as [bigint, bigint, bigint];
          
          // Success! Update state and return
          setData((prev) => ({
            ...prev,
            eth: {
              currentPrice: ethers.formatEther(currentPrice),
              totalMinted: Number(totalMinted),
              maxSupply: Number(maxSupply),
              nextTokenId: Number(totalMinted) + 1,
              isLoading: false,
              error: null,
            },
          }));
          return;
        } catch (error) {
          console.warn(`Failed to fetch from ${endpoint}:`, error);
          lastError = error instanceof Error ? error : new Error('Unknown error');
          // Continue to next endpoint
        }
      }
      
      // All endpoints failed
      throw lastError || new Error('All RPC endpoints failed');
    } catch (error) {
      console.error('Error fetching Ethereum NFT data:', error);
      setData((prev) => ({
        ...prev,
        eth: {
          ...prev.eth,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch data',
        },
      }));
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchEthereumData();

    // Refresh every 10 seconds
    const interval = setInterval(fetchEthereumData, 10000);

    return () => clearInterval(interval);
  }, []);

  return data;
};
