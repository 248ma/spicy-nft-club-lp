import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { MintModal } from './MintModal';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const languages = [
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const menuItems = [
    { id: 'hero', label: 'Home' },
    { id: 'concept', label: 'Concept' },
    { id: 'nft', label: 'NFT' },
    { id: 'whitepaper', label: 'Whitepaper' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'team', label: 'Team' },
    { id: 'how-to-buy', label: 'How to Buy' },
    { id: 'faq', label: 'FAQ' },
  ];

  const handleScroll = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="relative z-50 text-white hover:bg-white/10 rounded-full w-10 h-10"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[85%] md:w-[360px] bg-black/95 border-l border-white/10 shadow-2xl flex flex-col h-full"
            >
              <div className="flex flex-col h-full overflow-y-auto">
                <div className="p-5 flex flex-col min-h-full">
                  <div className="flex justify-end mb-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="text-white hover:bg-white/10 rounded-full w-8 h-8"
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <nav className="flex flex-col gap-0.5 mb-4 shrink-0">
                    {menuItems.map((item, index) => (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.03 }}
                        onClick={() => handleScroll(item.id)}
                        className="text-sm font-bold text-white/80 hover:text-[#ff0080] transition-colors uppercase tracking-widest text-left py-2 border-b border-white/5"
                      >
                        {item.label}
                      </motion.button>
                    ))}
                  </nav>

                  <div className="space-y-2.5 pb-4 mt-auto">
                    {/* CTA Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <MintModal 
                        trigger={
                          <Button 
                            className="w-full bg-gradient-to-r from-[#ff0080] to-[#7928ca] text-white font-bold py-4 text-sm rounded-full shadow-[0_0_15px_rgba(255,0,128,0.3)] hover:shadow-[0_0_25px_rgba(255,0,128,0.5)] transition-all h-auto"
                          >
                            {t('hero.cta')}
                          </Button>
                        }
                        onOpenChange={(open) => {
                          if (open) setIsOpen(false);
                        }}
                      />
                    </motion.div>

                    {/* Whitepaper Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 }}
                    >
                      <a
                        href="/whitepaper"
                        className="flex items-center justify-center w-full px-4 py-2.5 text-xs font-bold text-white border-2 border-transparent rounded-full transition-all duration-300 group shadow-[0_0_10px_rgba(255,0,128,0.2)] hover:shadow-[0_0_20px_rgba(255,0,128,0.4)]"
                        style={{
                          background: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)) padding-box, linear-gradient(to right, #ff0080, #7928ca) border-box',
                        }}
                      >
                        {t('whitepaper.button')}
                      </a>
                    </motion.div>

                    {/* Telegram Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <a 
                        href="https://t.me/spicynftclub" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 text-white transition-all group bg-black/40 px-4 py-2.5 rounded-full hover:bg-black/60 border border-[#0088cc] shadow-[0_0_10px_rgba(0,136,204,0.3)] hover:shadow-[0_0_20px_rgba(0,136,204,0.5)] w-full"
                      >
                        <div className="w-4 h-4 rounded-full bg-[#0088cc] flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_8px_#0088cc]">
                          <svg viewBox="0 0 24 24" fill="white" className="w-2 h-2">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                          </svg>
                        </div>
                        <span className="text-xs font-bold tracking-wide">Join Telegram</span>
                      </a>
                    </motion.div>

                    {/* X Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55 }}
                    >
                      <a 
                        href="https://x.com/spicynftclub?s=21&t=L0-eN0Ni_qYCds8Mlp3xRA" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 text-white transition-all group bg-black/40 px-4 py-2.5 rounded-full hover:bg-black/60 border border-white shadow-[0_0_10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] w-full"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 group-hover:scale-110 transition-transform drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        <span className="text-xs font-bold tracking-wide">Follow on X</span>
                      </a>
                    </motion.div>

                    {/* Language Switcher */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex gap-2 justify-center pt-3 border-t border-white/10"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition-all min-w-[50px] ${
                            i18n.language === lang.code 
                              ? 'bg-white/10 text-[#ff0080]' 
                              : 'text-white/60 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span className="text-xl">{lang.flag}</span>
                          <span className="text-[10px] font-medium">{lang.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
