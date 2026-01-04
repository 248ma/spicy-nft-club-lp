import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Terms() {
  const { t } = useTranslation();

  // Define sections based on translation keys
  const sections = [
    'intro',
    'definitions',
    'nft_rights',
    'prohibitions',
    'disclaimer',
    'modifications',
    'governing_law'
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">
            <Button variant="ghost" className="mb-8 text-gray-400 hover:text-white pl-0 hover:bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] to-[#7928ca]">
            {t('terms.title')}
          </h1>
          <p className="text-gray-400 mb-12">
            {t('terms.last_updated')}
          </p>

          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={section} className="space-y-4">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <span className="text-[#ff0080] mr-4 opacity-50">0{index + 1}.</span>
                  {t(`terms.sections.${section}.title`)}
                </h2>
                <div className="pl-0 md:pl-10 text-gray-400 leading-relaxed whitespace-pre-line">
                  {t(`terms.sections.${section}.content`)}
                  {section === 'disclaimer' && (
                    <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10 text-sm space-y-2">
                      <p>{t('footer.investment_warning')}</p>
                      <p>{t('footer.price_fluctuation')}</p>
                      <p>{t('footer.service_change')}</p>
                      <p>{t('footer.secondary_market')}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 text-sm text-gray-500 text-center">
            © 2025 SPICY NFT CLUB
          </div>
        </motion.div>
      </div>
    </div>
  );
}
