// Contract addresses
export const CONTRACTS = {
  ethereum: {
    sepolia: "0xEB47627e1820a90B7cb7a975E5468B2377BD899a",
    mainnet: "0x7Cd91FC5498703f7F9107131dE81b4A9F6C0E4e1",
  },
  solana: {
    devnet: "", // To be filled when Solana contract is ready
    mainnet: "", // To be filled when deploying to mainnet
  },
};

// RPC endpoints (multiple endpoints for fallback)
export const RPC_ENDPOINTS = {
  ethereum: {
    sepolia: [
      "https://rpc.sepolia.org",
      "https://ethereum-sepolia-rpc.publicnode.com",
      "https://1rpc.io/sepolia",
    ],
    mainnet: [
      "https://eth.llamarpc.com",
      "https://rpc.ankr.com/eth",
      "https://ethereum-rpc.publicnode.com",
    ],
  },
  solana: {
    devnet: "https://api.devnet.solana.com",
    mainnet: "https://api.mainnet-beta.solana.com",
  },
};

// Current environment (change to 'mainnet' for production)
export const CURRENT_ENV = "mainnet";

// Mint site URL (to be configured after custom domain setup)
export const MINT_SITE_URL = ""; // TODO: Add custom domain URL here
