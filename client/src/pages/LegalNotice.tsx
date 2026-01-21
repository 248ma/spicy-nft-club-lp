import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building, Scale, AlertTriangle, Shield, Ban, Gavel, Mail } from "lucide-react";
import { Link } from "wouter";

export default function LegalNotice() {
  const { t } = useTranslation();

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
              {t('common.back_to_home')}
            </Button>
          </Link>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] to-[#7928ca]">
            {t('legal_notice.title')}
          </h1>
          <p className="text-gray-400 mb-12">
            {t('legal_notice_additional.last_updated')}
          </p>

          <div className="space-y-12">
            {/* Specified Commercial Transactions Law Table */}
            <section>
              <div className="bg-white/5 rounded-lg overflow-hidden border border-white/10">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(t('legal_notice.items', { returnObjects: true }) as Record<string, { label: string; value: string }>).map(([key, item]) => (
                      <tr key={key} className="border-b border-white/10 last:border-b-0">
                        <td className="px-6 py-4 font-semibold text-white bg-white/5 w-1/3">
                          {item.label}
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {item.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Business Description */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Building className="w-6 h-6 text-[#ff0080]" />
                <h2 className="text-2xl font-bold text-white">
                  {t('legal_notice_additional.business_description.title')}
                </h2>
              </div>
              <div className="bg-white/5 rounded-lg p-6 border border-white/10 space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  {t('legal_notice_additional.business_description.content_1')}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {t('legal_notice_additional.business_description.content_2')}
                </p>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-6 h-6 text-[#ff0080]" />
                <h2 className="text-2xl font-bold text-white">
                  {t('legal_notice_additional.intellectual_property.title')}
                </h2>
              </div>
              <div className="bg-white/5 rounded-lg p-6 border border-white/10 space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  {t('legal_notice_additional.intellectual_property.content')}
                </p>
                <div className="border-l-4 border-[#ff0080] pl-4 bg-white/5 p-4 rounded">
                  <p className="text-sm text-gray-300">
                    <strong className="text-white">{t('legal_notice_additional.intellectual_property.nft_holder_rights.title')}</strong>{' '}
                    {t('legal_notice_additional.intellectual_property.nft_holder_rights.content')}
                  </p>
                </div>
              </div>
            </section>

            {/* Disclaimer and Risk Disclosure */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-[#ff0080]" />
                <h2 className="text-2xl font-bold text-white">
                  {t('legal_notice_additional.disclaimer.title')}
                </h2>
              </div>
              <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                  <h3 className="font-bold text-red-200 mb-4 text-lg">
                    {t('legal_notice_additional.disclaimer.important_notice')}
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(t('legal_notice_additional.disclaimer.risks', { returnObjects: true }) as Record<string, { title: string; content: string }>).map(([key, risk]) => (
                      <div key={key} className="text-sm">
                        <p className="text-red-200">
                          <strong>{risk.title}</strong> {risk.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="font-semibold text-white mb-4">
                    {t('legal_notice_additional.disclaimer.additional_risks.title')}
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-400">
                    {t('legal_notice_additional.disclaimer.additional_risks.items', { returnObjects: true }).map((item: any, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#ff0080] mt-1">•</span>
                        <span>
                          <strong className="text-white">{item.title}</strong> {item.desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <p className="text-yellow-200 text-sm">
                    <strong>{t('legal_notice_additional.disclaimer.limitation_liability.title')}</strong>{' '}
                    {t('legal_notice_additional.disclaimer.limitation_liability.content')}
                  </p>
                </div>
              </div>
            </section>

            {/* Legal Compliance */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-[#ff0080]" />
                <h2 className="text-2xl font-bold text-white">
                  {t('legal_notice_additional.compliance.title')}
                </h2>
              </div>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="font-semibold text-white mb-3">
                    {t('legal_notice_additional.compliance.entertainment_act.title')}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {t('legal_notice_additional.compliance.entertainment_act.content')}
                  </p>
                </div>
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="font-semibold text-white mb-3">
                    {t('legal_notice_additional.compliance.aml.title')}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {t('legal_notice_additional.compliance.aml.content')}
                  </p>
                </div>
              </div>
            </section>

            {/* Age Restriction */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Ban className="w-6 h-6 text-[#ff0080]" />
                <h2 className="text-2xl font-bold text-white">
                  {t('legal_notice_additional.age_restriction.title')}
                </h2>
              </div>
              <div className="bg-white/5 rounded-lg p-6 border border-white/10 space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  {t('legal_notice_additional.age_restriction.content_1')}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {t('legal_notice_additional.age_restriction.content_2')}
                </p>
              </div>
            </section>

            {/* Prohibited Activities */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Ban className="w-6 h-6 text-[#ff0080]" />
                <h2 className="text-2xl font-bold text-white">
                  {t('legal_notice_additional.prohibited_activities.title')}
                </h2>
              </div>
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <p className="text-gray-300 mb-4">
                  {t('legal_notice_additional.prohibited_activities.intro')}
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  {t('legal_notice_additional.prohibited_activities.items', { returnObjects: true }).map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#ff0080] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Governing Law */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Gavel className="w-6 h-6 text-[#ff0080]" />
                <h2 className="text-2xl font-bold text-white">
                  {t('legal_notice_additional.governing_law.title')}
                </h2>
              </div>
              <div className="bg-white/5 rounded-lg p-6 border border-white/10 space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  {t('legal_notice_additional.governing_law.content_1')}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {t('legal_notice_additional.governing_law.content_2')}
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-[#ff0080]" />
                <h2 className="text-2xl font-bold text-white">
                  {t('legal_notice_additional.contact_info.title')}
                </h2>
              </div>
              <div className="bg-gradient-to-br from-[#ff0080]/10 to-[#7928ca]/10 rounded-lg p-6 border border-white/10">
                <p className="text-lg font-semibold text-white mb-4">
                  {t('legal_notice_additional.contact_info.company')}
                </p>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>
                    <span className="text-gray-400">{t('legal_notice_additional.contact_info.general')}</span>{' '}
                    <a href="mailto:contact@spicynftclub.com" className="text-[#ff0080] hover:underline">
                      contact@spicynftclub.com
                    </a>
                  </p>
                  <p>
                    <span className="text-gray-400">{t('legal_notice_additional.contact_info.legal')}</span>{' '}
                    <a href="mailto:legal@spicynftclub.com" className="text-[#ff0080] hover:underline">
                      legal@spicynftclub.com
                    </a>
                  </p>
                  <p>
                    <span className="text-gray-400">{t('legal_notice_additional.contact_info.support')}</span>{' '}
                    <a href="mailto:support@spicynftclub.com" className="text-[#ff0080] hover:underline">
                      support@spicynftclub.com
                    </a>
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-16 text-sm text-gray-500 text-center border-t border-white/10 pt-8">
            © 2026 SPICY NFT CLUB. All rights reserved.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
