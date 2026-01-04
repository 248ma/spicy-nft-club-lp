import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function LegalNotice() {
  const { t } = useTranslation();

  const items = [
    'distributor',
    'representative',
    'location',
    'contact',
    'price',
    'charges',
    'payment_method',
    'delivery',
    'return',
    'system_requirements'
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12">
      <div className="container max-w-3xl mx-auto px-4">
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

          <h1 className="text-3xl md:text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] to-[#7928ca]">
            {t('legal_notice.title')}
          </h1>

          <div className="space-y-8">
            <div className="grid gap-px bg-white/10 border border-white/10 rounded-lg overflow-hidden">
              {items.map((key) => (
                <div key={key} className="grid md:grid-cols-[200px_1fr] bg-black/90">
                  <div className="p-4 md:p-6 bg-white/5 font-bold text-gray-200 flex items-center">
                    {t(`legal_notice.items.${key}.label`)}
                  </div>
                  <div className="p-4 md:p-6 text-gray-400 flex items-center">
                    {t(`legal_notice.items.${key}.value`)}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-white/5 rounded-lg border border-white/10 text-sm text-gray-400 space-y-2">
              <h3 className="font-bold text-white mb-2">重要事項・免責</h3>
              <p>{t('footer.investment_warning')}</p>
              <p>{t('footer.price_fluctuation')}</p>
              <p>{t('footer.service_change')}</p>
              <p>{t('footer.secondary_market')}</p>
            </div>
          </div>

          <div className="mt-12 text-sm text-gray-500 text-center">
            © 2025 SPICY NFT CLUB
          </div>
        </motion.div>
      </div>
    </div>
  );
}
