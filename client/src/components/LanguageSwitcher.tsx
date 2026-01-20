import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import analytics from '@/lib/analytics';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    analytics.trackLanguageSwitch(lng);
    i18n.changeLanguage(lng);
  };

  const getLanguageLabel = (lang: string) => {
    switch (lang) {
      case 'en': return { label: 'English', flag: '🇺🇸' };
      case 'zh': return { label: '中文', flag: '🇨🇳' };
      case 'ko': return { label: '한국어', flag: '🇰🇷' };
      case 'es': return { label: 'Español', flag: '🇪🇸' };
      default: return { label: '日本語', flag: '🇯🇵' };
    }
  };

  const currentLang = getLanguageLabel(i18n.language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={cn(
            "rounded-full bg-black/60 backdrop-blur-md border-white/20 hover:bg-black/80 hover:border-[#ff0080]/50 text-white px-4 py-2 h-10 gap-2 transition-all duration-300 group shadow-[0_0_10px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(255,0,128,0.2)] data-[state=open]:bg-black/80",
            className
          )}
        >
          <span className="text-lg leading-none">{currentLang.flag}</span>
          <span className="font-medium text-sm hidden md:inline-block text-inherit">
            {currentLang.label}
          </span>
          <ChevronDown className="h-3 w-3 text-inherit transition-colors" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black/90 border-white/10 backdrop-blur-xl min-w-[150px] p-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.5)] rounded-xl mt-2 z-[10000]">
        <DropdownMenuItem 
          onClick={() => changeLanguage('ja')} 
          className={`text-white hover:bg-white/10 cursor-pointer rounded-lg py-2.5 px-3 mb-1 flex items-center gap-3 transition-colors ${i18n.language === 'ja' ? 'bg-white/10 font-bold text-[#ff0080]' : ''}`}
        >
          <span className="text-xl leading-none">🇯🇵</span>
          <span className="text-sm">日本語</span>
          {i18n.language === 'ja' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#ff0080] shadow-[0_0_5px_#ff0080]" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('en')} 
          className={`text-white hover:bg-white/10 cursor-pointer rounded-lg py-2.5 px-3 mb-1 flex items-center gap-3 transition-colors ${i18n.language === 'en' ? 'bg-white/10 font-bold text-[#ff0080]' : ''}`}
        >
          <span className="text-xl leading-none">🇺🇸</span>
          <span className="text-sm">English</span>
          {i18n.language === 'en' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#ff0080] shadow-[0_0_5px_#ff0080]" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('zh')} 
          className={`text-white hover:bg-white/10 cursor-pointer rounded-lg py-2.5 px-3 mb-1 flex items-center gap-3 transition-colors ${i18n.language === 'zh' ? 'bg-white/10 font-bold text-[#ff0080]' : ''}`}
        >
          <span className="text-xl leading-none">🇨🇳</span>
          <span className="text-sm">中文</span>
          {i18n.language === 'zh' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#ff0080] shadow-[0_0_5px_#ff0080]" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('ko')} 
          className={`text-white hover:bg-white/10 cursor-pointer rounded-lg py-2.5 px-3 mb-1 flex items-center gap-3 transition-colors ${i18n.language === 'ko' ? 'bg-white/10 font-bold text-[#ff0080]' : ''}`}
        >
          <span className="text-xl leading-none">🇰🇷</span>
          <span className="text-sm">한국어</span>
          {i18n.language === 'ko' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#ff0080] shadow-[0_0_5px_#ff0080]" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('es')} 
          className={`text-white hover:bg-white/10 cursor-pointer rounded-lg py-2.5 px-3 flex items-center gap-3 transition-colors ${i18n.language === 'es' ? 'bg-white/10 font-bold text-[#ff0080]' : ''}`}
        >
          <span className="text-xl leading-none">🇪🇸</span>
          <span className="text-sm">Español</span>
          {i18n.language === 'es' && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#ff0080] shadow-[0_0_5px_#ff0080]" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
