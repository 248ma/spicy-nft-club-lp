// Contract addresses
export const CONTRACTS = {
  ethereum: {
    sepolia: "0xEB47627e1820a90B7cb7a975E5468B2377BD899a",
    mainnet: "", // To be filled when deploying to mainnet
  },
  solana: {
    devnet: "", // To be filled when Solana contract is ready
    mainnet: "", // To be filled when deploying to mainnet
  },
};

// RPC endpoints
export const RPC_ENDPOINTS = {
  ethereum: {
    sepolia: "https://eth-sepolia.g.alchemy.com/v2/demo",
    mainnet: "https://eth.llamarpc.com",
  },
  solana: {
    devnet: "https://api.devnet.solana.com",
    mainnet: "https://api.mainnet-beta.solana.com",
  },
};

// Current environment (change to 'mainnet' for production)
export const CURRENT_ENV = "sepolia";
