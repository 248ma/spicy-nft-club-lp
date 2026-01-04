import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShieldCheck, Globe, Zap } from "lucide-react";
import { Link } from "wouter";

export default function Exit() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <ShieldCheck className="w-12 h-12 text-[#ff0080]" />,
      titleKey: 'exit_page.features.security.title',
      descKey: 'exit_page.features.security.desc'
    },
    {
      icon: <Globe className="w-12 h-12 text-[#7928ca]" />,
      titleKey: 'exit_page.features.global.title',
      descKey: 'exit_page.features.global.desc'
    },
    {
      icon: <Zap className="w-12 h-12 text-[#0088cc]" />,
      titleKey: 'exit_page.features.tech.title',
      descKey: 'exit_page.features.tech.desc'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#ff0080]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#7928ca]/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full text-center relative z-10"
      >
        <div className="mb-12">
          <img src="/logo.png" alt="SPICY NFT CLUB" className="h-16 mx-auto mb-8 opacity-80" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            {t('exit_page.title')}
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('exit_page.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <div className="mb-6 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-white">{t(feature.titleKey)}</h3>
              <p className="text-gray-400 leading-relaxed">
                {t(feature.descKey)}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          <p className="text-sm text-gray-500">
            {t('exit_page.note')}
          </p>
          
          <Link href="/">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full">
              <ArrowLeft className="mr-2 h-5 w-5" />
              {t('exit_page.back_button')}
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
