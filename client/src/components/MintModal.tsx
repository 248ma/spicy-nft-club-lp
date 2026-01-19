import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { MINT_SITE_URL } from '@/contracts/config';

interface MintModalProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function MintModal({ trigger, open, onOpenChange }: MintModalProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      
      <DialogContent className="sm:max-w-md bg-black/95 backdrop-blur-xl border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-[#ff0080] to-[#7928ca] bg-clip-text text-transparent">
            {t('purchase_modal.title')}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-400">
            {t('purchase_modal.description') || 'Select your preferred blockchain to purchase NFT'}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 flex flex-col gap-4">
          {/* ETH Purchase Button - Links to Mint Site */}
          {MINT_SITE_URL ? (
            <Button 
              className="w-full h-20 text-lg font-bold bg-[#627EEA] hover:bg-[#627EEA]/90 text-white flex items-center justify-between px-6 transition-all hover:scale-[1.02] group"
              onClick={() => window.open(MINT_SITE_URL, '_blank')}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg viewBox="0 0 32 32" className="w-6 h-6 fill-current">
                    <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.994-15.781L16.498 4 9 16.22l7.498 4.353 7.496-4.354zM24 17.616l-7.502 4.351L9 17.617l7.498 10.378L24 17.616z"/>
                  </svg>
                </div>
                <span>{t('purchase_modal.eth')}</span>
              </div>
              <ExternalLink className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          ) : (
            <div className="w-full h-20 flex items-center justify-center border-2 border-dashed border-white/20 rounded-lg">
              <p className="text-gray-400 text-sm">
                {t('purchase_modal.mint_site_coming_soon') || 'Mint site URL will be configured soon'}
              </p>
            </div>
          )}

          {/* SOL Purchase Button - Coming Soon */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  className="w-full h-20 text-lg font-bold bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 text-white flex items-center justify-between px-6 transition-all hover:scale-[1.02] group relative"
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
