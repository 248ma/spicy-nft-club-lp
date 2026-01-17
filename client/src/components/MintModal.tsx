import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Check, Wallet, ArrowRight, Minus, Plus, ExternalLink, AlertCircle } from 'lucide-react';
import { useEthereumWallet } from '@/hooks/useEthereumWallet';
import { useSolanaWallet } from '@/hooks/useSolanaWallet';

interface MintModalProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

type Step = 'select-chain' | 'connect-wallet' | 'mint' | 'processing' | 'success' | 'error';
type Chain = 'ETH' | 'SOL' | null;

export function MintModal({ trigger, open, onOpenChange }: MintModalProps) {
  const { t } = useTranslation();
  const [step, setStep] = useState<Step>('select-chain');
  const [chain, setChain] = useState<Chain>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentPrice, setCurrentPrice] = useState('0.01');
  const [totalPrice, setTotalPrice] = useState('0.01');
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Wallet hooks
  const ethWallet = useEthereumWallet();
  const solWallet = useSolanaWallet();

  // Get active wallet based on selected chain
  const activeWallet = chain === 'ETH' ? ethWallet : solWallet;

  // Reset state when modal closes
  useEffect(() => {
    if (open === false) {
      setStep('select-chain');
      setChain(null);
      setQuantity(1);
      setTransactionHash(null);
      setErrorMessage(null);
    }
  }, [open]);

  // Update prices when chain or quantity changes
  useEffect(() => {
    if (!chain) return;

    const updatePrices = async () => {
      const wallet = chain === 'ETH' ? ethWallet : solWallet;
      
      try {
        const current = await wallet.getCurrentPrice();
        const total = await wallet.calculateTotalPrice(quantity);
        
        setCurrentPrice(current);
        setTotalPrice(total);
      } catch (error) {
        console.error('Failed to update prices:', error);
      }
    };

    updatePrices();
  }, [chain, quantity, ethWallet, solWallet]);

  const handleChainSelect = (selectedChain: Chain) => {
    setChain(selectedChain);
    setStep('connect-wallet');
  };

  const handleConnectWallet = async () => {
    if (!chain) return;

    const wallet = chain === 'ETH' ? ethWallet : solWallet;
    
    // Check if wallet extension is installed
    if (chain === 'ETH' && !ethWallet.isMetaMaskInstalled) {
      setErrorMessage('MetaMask is not installed. Please install MetaMask extension to continue.');
      setStep('error');
      return;
    }

    if (chain === 'SOL' && !solWallet.isPhantomInstalled) {
      setErrorMessage('Phantom wallet is not installed. Please install Phantom extension to continue.');
      setStep('error');
      return;
    }

    // Connect wallet
    const success = await wallet.connect();
    
    if (success) {
      setStep('mint');
    } else {
      setErrorMessage(wallet.error || 'Failed to connect wallet');
      setStep('error');
    }
  };

  const handleMint = async () => {
    if (!chain) return;

    setStep('processing');
    setErrorMessage(null);

    const wallet = chain === 'ETH' ? ethWallet : solWallet;
    
    try {
      const result = await wallet.mint(quantity);

      if (result.success) {
        setTransactionHash((result as any).transactionHash || (result as any).signature || null);
        setStep('success');
      } else {
        setErrorMessage(result.error || 'Mint failed');
        setStep('error');
      }
    } catch (error: any) {
      console.error('Mint error:', error);
      setErrorMessage(error.message || 'An unexpected error occurred');
      setStep('error');
    }
  };

  const handleRetry = () => {
    setErrorMessage(null);
    setStep('mint');
  };

  const handleBack = () => {
    if (step === 'connect-wallet') {
      setStep('select-chain');
      setChain(null);
    } else if (step === 'error') {
      if (activeWallet.isConnected) {
        setStep('mint');
      } else {
        setStep('connect-wallet');
      }
    }
  };

  const getExplorerUrl = () => {
    if (!transactionHash) return '#';
    
    if (chain === 'ETH') {
      // Use Sepolia testnet explorer for now
      return `https://sepolia.etherscan.io/tx/${transactionHash}`;
    } else {
      // Use Solana devnet explorer for now
      return `https://explorer.solana.com/tx/${transactionHash}?cluster=devnet`;
    }
  };

  const increment = chain === 'ETH' ? '0.01' : '0.2';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-md bg-black/90 border-white/10 text-white backdrop-blur-xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff0080] to-[#7928ca]">
            {step === 'select-chain' && t('purchase_modal.title')}
            {step === 'connect-wallet' && t('purchase_modal.connect_wallet')}
            {step === 'mint' && t('purchase_modal.mint_title')}
            {step === 'processing' && t('purchase_modal.processing')}
            {step === 'success' && t('purchase_modal.success_title')}
            {step === 'error' && 'Error'}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 min-h-[300px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {step === 'select-chain' && (
              <motion.div
                key="select-chain"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-4"
              >
                <Button 
                  className="w-full h-20 text-lg font-bold bg-[#627EEA] hover:bg-[#627EEA]/90 text-white flex items-center justify-between px-6 transition-all hover:scale-[1.02] group"
                  onClick={() => handleChainSelect('ETH')}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-current">
                        <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.994-15.781L16.498 4 9 16.22l7.498 4.353 7.496-4.354zM24 17.616l-7.502 4.351L9 17.617l7.498 10.378L24 17.616z"/>
                      </svg>
                    </div>
                    <span>{t('purchase_modal.eth')}</span>
                  </div>
                  <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        className="w-full h-20 text-lg font-bold bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 text-white flex items-center justify-between px-6 transition-all hover:scale-[1.02] group relative"
                        onClick={() => handleChainSelect('SOL')}
                        disabled
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                            <svg viewBox="0 0 32 32" className="w-6 h-6 fill-current">
                              <path d="M4.77 18.52h4.96l.04-.26c.32-2.18 2.38-3.34 4.56-2.58.56.2.98.64 1.16 1.2l.04.14h4.82c-.22-1.86-1.32-3.48-2.98-4.38l-.18-.1-4.4-2.3-4.42 2.32c-2.08 1.08-3.38 3.24-3.5 5.58l-.1.38zm22.46-5.04h-4.96l-.04.26c-.32 2.18-2.38 3.34-4.56 2.58-.56-.2-.98-.64-1.16-1.2l-.04-.14h-4.82c.22 1.86 1.32 3.48 2.98 4.38l.18.1 4.4 2.3 4.42-2.32c2.08-1.08 3.38-3.24 3.5-5.58l.1-.38z"/>
                            </svg>
                          </div>
                          <div className="flex flex-col items-start">
                            <span>{t('purchase_modal.sol')}</span>
                          </div>
                        </div>
                        <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                          {t('purchase_modal.coming_soon')}
                        </div>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-xs">
                      <p>{t('purchase_modal.sol_coming_soon_tooltip')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            )}

            {step === 'connect-wallet' && (
              <motion.div
                key="connect-wallet"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-4 items-center"
              >
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-4">
                  <Wallet className="w-10 h-10 text-white/80" />
                </div>
                <p className="text-center text-gray-400 text-sm mb-2">
                  {chain === 'ETH' 
                    ? 'Connect your MetaMask wallet to continue' 
                    : 'Connect your Phantom wallet to continue'}
                </p>
                <Button 
                  className="w-full h-14 text-lg font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  onClick={handleConnectWallet}
                >
                  {chain === 'ETH' ? t('purchase_modal.connect_metamask') : t('purchase_modal.connect_phantom')}
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-sm text-gray-400 hover:text-white"
                  onClick={handleBack}
                >
                  Back
                </Button>
              </motion.div>
            )}

            {step === 'mint' && (
              <motion.div
                key="mint"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-6"
              >
                {/* Wallet Info */}
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Connected:</span>
                    <span className="font-mono text-xs">
                      {activeWallet.address?.slice(0, 6)}...{activeWallet.address?.slice(-4)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-1">
                    <span className="text-gray-400">Balance:</span>
                    <span className="font-mono text-xs">
                      {activeWallet.balance} {chain}
                    </span>
                  </div>
                </div>

                {/* Price Info */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400 text-sm">{t('purchase_modal.current_price')}</span>
                    <span className="font-mono font-bold text-lg">{currentPrice} {chain}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">{t('purchase_modal.next_price')}</span>
                    <span className="font-mono text-sm text-[#ff0080]">+{increment} {chain} / mint</span>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center justify-between bg-white/5 rounded-xl p-4 border border-white/10">
                  <span className="font-bold">{t('purchase_modal.quantity')}</span>
                  <div className="flex items-center gap-4">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 rounded-full border-white/20 hover:bg-white/10"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="font-mono text-xl w-8 text-center">{quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 rounded-full border-white/20 hover:bg-white/10"
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="flex justify-between items-center px-2">
                  <span className="text-lg font-bold">{t('purchase_modal.total')}</span>
                  <span className="text-2xl font-black font-mono bg-clip-text text-transparent bg-gradient-to-r from-[#ff0080] to-[#7928ca]">
                    {totalPrice} {chain}
                  </span>
                </div>

                {/* Mint Button */}
                <Button 
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-[#ff0080] to-[#7928ca] hover:from-[#ff0080]/90 hover:to-[#7928ca]/90 text-white shadow-[0_0_20px_rgba(255,0,128,0.4)]"
                  onClick={handleMint}
                >
                  {t('purchase_modal.mint_button')}
                </Button>
              </motion.div>
            )}

            {step === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-8 gap-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff0080] to-[#7928ca] blur-xl opacity-50" />
                  <Loader2 className="w-16 h-16 text-white animate-spin relative z-10" />
                </div>
                <p className="text-lg font-medium">{t('purchase_modal.processing')}</p>
                <p className="text-sm text-gray-400 text-center">
                  Please confirm the transaction in your wallet
                </p>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-6 text-center"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/50">
                  <Check className="w-10 h-10 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t('purchase_modal.success_title')}</h3>
                  <p className="text-gray-400 text-sm">{t('purchase_modal.success_desc')}</p>
                </div>
                {transactionHash && (
                  <Button 
                    variant="outline" 
                    className="w-full border-white/20 hover:bg-white/10"
                    onClick={() => window.open(getExplorerUrl(), '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {chain === 'ETH' ? t('purchase_modal.view_etherscan') : t('purchase_modal.view_solscan')}
                  </Button>
                )}
                <Button 
                  className="w-full bg-white text-black hover:bg-gray-200"
                  onClick={() => onOpenChange?.(false)}
                >
                  {t('purchase_modal.close')}
                </Button>
              </motion.div>
            )}

            {step === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-6 text-center"
              >
                <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/50">
                  <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Transaction Failed</h3>
                  <p className="text-gray-400 text-sm">{errorMessage}</p>
                </div>
                <div className="flex gap-3 w-full">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-white/20 hover:bg-white/10"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button 
                    className="flex-1 bg-gradient-to-r from-[#ff0080] to-[#7928ca] hover:from-[#ff0080]/90 hover:to-[#7928ca]/90"
                    onClick={handleRetry}
                  >
                    Retry
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
