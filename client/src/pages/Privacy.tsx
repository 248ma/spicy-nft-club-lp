import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Database, Lock, Globe, Users, FileText } from "lucide-react";
import { Link } from "wouter";

export default function Privacy() {
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
            {t('privacy_policy.title')}
          </h1>
          <p className="text-gray-400 mb-12">
            {t('privacy_policy.last_updated')}
          </p>

          <div className="space-y-12">
            {/* Introduction */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-[#ff0080]">
                  {t('privacy_policy.sections.introduction.number')}
                </span>
                <h2 className="text-2xl font-bold text-white">
                  {t('privacy_policy.sections.introduction.title')}
                </h2>
              </div>
              <div className="bg-white/5 rounded-lg p-6 border border-white/10 space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  {t('privacy_policy.sections.introduction.content_1')}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {t('privacy_policy.sections.introduction.content_2')}
                </p>
              </div>
            </section>

            {/* Information We Collect */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-[#ff0080]">
                  {t('privacy_policy.sections.information_collect.number')}
                </span>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Database className="w-6 h-6" />
                  {t('privacy_policy.sections.information_collect.title')}
                </h2>
              </div>

              <div className="space-y-6">
                {/* Auto Collected */}
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="font-semibold text-white mb-3">
                    {t('privacy_policy.sections.information_collect.auto_collected.subtitle')}
                  </h3>
                  <p className="text-gray-300 mb-3">
                    {t('privacy_policy.sections.information_collect.auto_collected.intro')}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    {t('privacy_policy.sections.information_collect.auto_collected.items', { returnObjects: true }).map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#ff0080] mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* User Provided */}
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="font-semibold text-white mb-3">
                    {t('privacy_policy.sections.information_collect.user_provided.subtitle')}
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-400">
                    {t('privacy_policy.sections.information_collect.user_provided.items', { returnObjects: true }).map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#ff0080] mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Blockchain */}
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="font-semibold text-white mb-3">
                    {t('privacy_policy.sections.information_collect.blockchain.subtitle')}
                  </h3>
                  <p className="text-gray-300 mb-3">
                    {t('privacy_policy.sections.information_collect.blockchain.intro')}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-400 mb-4">
                    {t('privacy_policy.sections.information_collect.blockchain.items', { returnObjects: true }).map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#ff0080] mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <p className="text-yellow-200 text-sm">
                      <strong>{t('privacy_policy.sections.information_collect.blockchain.important')}</strong>{' '}
                      {t('privacy_policy.sections.information_collect.blockchain.important_text')}
                    </p>
                  </div>
                </div>

                {/* Local Storage */}
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h3 className="font-semibold text-white mb-3">
                    {t('privacy_policy.sections.information_collect.local_storage.subtitle')}
                  </h3>
                  <p className="text-gray-300 mb-3">
                    {t('privacy_policy.sections.information_collect.local_storage.intro')}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-400 mb-4">
                    {t('privacy_policy.sections.information_collect.local_storage.items', { returnObjects: true }).map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#ff0080] mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-400 italic">
                    {t('privacy_policy.sections.information_collect.local_storage.note')}
                  </p>
                </div>
              </div>
            </section>

            {/* How We Use */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-[#ff0080]">
                  {t('privacy_policy.sections.how_we_use.number')}
                </span>
                <h2 className="text-2xl font-bold text-white">
                  {t('privacy_policy.sections.how_we_use.title')}
                </h2>
              </div>
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <p className="text-gray-300 mb-4">
                  {t('privacy_policy.sections.how_we_use.intro')}
                </p>
                <ul className="space-y-3 text-sm text-gray-400">
                  {t('privacy_policy.sections.how_we_use.items', { returnObjects: true }).map((item: any, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#ff0080] mt-1">•</span>
                      <span>
                        <strong className="text-white">{item.title}</strong> {item.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Information Sharing */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-[#ff0080]">
                  {t('privacy_policy.sections.information_sharing.number')}
                </span>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Globe className="w-6 h-6" />
                  {t('privacy_policy.sections.information_sharing.title')}
                </h2>
              </div>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-gray-300 mb-4">
                    {t('privacy_policy.sections.information_sharing.intro')}
                  </p>
                  <h4 className="font-semibold text-white mb-3">
                    {t('privacy_policy.sections.information_sharing.service_providers.subtitle')}
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-400 mb-4">
                    {t('privacy_policy.sections.information_sharing.service_providers.items', { returnObjects: true }).map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#ff0080] mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-gray-300 mb-2">
                    {t('privacy_policy.sections.information_sharing.disclosure')}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    {t('privacy_policy.sections.information_sharing.disclosure_items', { returnObjects: true }).map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#ff0080] mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <p className="text-green-200 text-sm font-semibold">
                    {t('privacy_policy.sections.information_sharing.no_sell')}
                  </p>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-[#ff0080]">
                  {t('privacy_policy.sections.cookies.number')}
                </span>
                <h2 className="text-2xl font-bold text-white">
                  {t('privacy_policy.sections.cookies.title')}
                </h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-300">
                  {t('privacy_policy.sections.cookies.intro')}
                </p>
                
                <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-lg p-6 border border-green-500/20">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                    {t('privacy_policy.sections.cookies.plausible.subtitle')}
                  </h4>
                  <p className="text-sm text-gray-300 mb-2">
                    {t('privacy_policy.sections.cookies.plausible.content')}
                  </p>
                  <p className="text-sm text-gray-400 italic">
                    {t('privacy_policy.sections.cookies.plausible.data_collected')}
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h4 className="font-semibold text-white mb-3">
                    {t('privacy_policy.sections.cookies.local_storage.subtitle')}
                  </h4>
                  <p className="text-sm text-gray-300">
                    {t('privacy_policy.sections.cookies.local_storage.content')}
                  </p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <p className="text-blue-200 text-sm">
                    <strong>{t('privacy_policy.sections.cookies.no_consent.subtitle')}</strong>{' '}
                    {t('privacy_policy.sections.cookies.no_consent.content')}
                  </p>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-[#ff0080]">
                  {t('privacy_policy.sections.data_security.number')}
                </span>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Lock className="w-6 h-6" />
                  {t('privacy_policy.sections.data_security.title')}
                </h2>
              </div>
              <div className="bg-white/5 rounded-lg p-6 border border-white/10 space-y-4">
                <p className="text-gray-300">
                  {t('privacy_policy.sections.data_security.intro')}
                </p>
                <ul className="space-y-2 text-sm text-gray-400">
                  {t('privacy_policy.sections.data_security.measures', { returnObjects: true }).map((item: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[#ff0080] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-gray-400">
                  {t('privacy_policy.sections.data_security.limitation')}
                </p>
                <div className="border-l-4 border-[#ff0080] pl-4 bg-white/5 p-4 rounded">
                  <p className="text-sm text-gray-300">
                    <strong className="text-white">{t('privacy_policy.sections.data_security.wallet_security.title')}</strong>{' '}
                    {t('privacy_policy.sections.data_security.wallet_security.content')}
                  </p>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-[#ff0080]">
                  {t('privacy_policy.sections.your_rights.number')}
                </span>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  {t('privacy_policy.sections.your_rights.title')}
                </h2>
              </div>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <p className="text-gray-300 mb-4">
                    {t('privacy_policy.sections.your_rights.intro')}
                  </p>
                  <ul className="space-y-3 text-sm text-gray-400 mb-4">
                    {t('privacy_policy.sections.your_rights.rights', { returnObjects: true }).map((item: any, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#ff0080] mt-1">•</span>
                        <span>
                          <strong className="text-white">{item.title}</strong> {item.desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-4">
                    <p className="text-yellow-200 text-sm">
                      <strong>{t('privacy_policy.sections.your_rights.blockchain_limitation.title')}</strong>{' '}
                      {t('privacy_policy.sections.your_rights.blockchain_limitation.content')}
                    </p>
                  </div>
                  <p className="text-gray-300 mb-2">
                    {t('privacy_policy.sections.your_rights.contact')}
                  </p>
                  <a href={`mailto:${t('privacy_policy.sections.your_rights.email')}`} className="text-[#ff0080] hover:underline">
                    {t('privacy_policy.sections.your_rights.email')}
                  </a>
                </div>
              </div>
            </section>

            {/* International Transfers */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-[#ff0080]">
                  {t('privacy_policy.sections.international_transfers.number')}
                </span>
                <h2 className="text-2xl font-bold text-white">
                  {t('privacy_policy.sections.international_transfers.title')}
                </h2>
              </div>
              <div className="bg-white/5 rounded-lg p-6 border border-white/10 space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  {t('privacy_policy.sections.international_transfers.content_1')}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {t('privacy_policy.sections.international_transfers.content_2')}
                </p>
              </div>
            </section>

            {/* Children's Privacy */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-[#ff0080]">
                  {t('privacy_policy.sections.children_privacy.number')}
                </span>
                <h2 className="text-2xl font-bold text-white">
                  {t('privacy_policy.sections.children_privacy.title')}
                </h2>
              </div>
              <div className="bg-white/5 rounded-lg p-6 border border-white/10 space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  {t('privacy_policy.sections.children_privacy.content_1')}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {t('privacy_policy.sections.children_privacy.content_2')}
                </p>
              </div>
            </section>

            {/* Changes */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-[#ff0080]">
                  {t('privacy_policy.sections.changes.number')}
                </span>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  {t('privacy_policy.sections.changes.title')}
                </h2>
              </div>
              <div className="bg-white/5 rounded-lg p-6 border border-white/10 space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  {t('privacy_policy.sections.changes.content_1')}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {t('privacy_policy.sections.changes.content_2')}
                </p>
              </div>
            </section>

            {/* Contact Us */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-[#ff0080]">
                  {t('privacy_policy.sections.contact_us.number')}
                </span>
                <h2 className="text-2xl font-bold text-white">
                  {t('privacy_policy.sections.contact_us.title')}
                </h2>
              </div>
              <div className="bg-gradient-to-br from-[#ff0080]/10 to-[#7928ca]/10 rounded-lg p-6 border border-white/10">
                <p className="text-gray-300 mb-4">
                  {t('privacy_policy.sections.contact_us.intro')}
                </p>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>
                    <span className="text-gray-400">Privacy:</span>{' '}
                    <a href={`mailto:${t('privacy_policy.sections.contact_us.emails.privacy')}`} className="text-[#ff0080] hover:underline">
                      {t('privacy_policy.sections.contact_us.emails.privacy')}
                    </a>
                  </p>
                  <p>
                    <span className="text-gray-400">General:</span>{' '}
                    <a href={`mailto:${t('privacy_policy.sections.contact_us.emails.general')}`} className="text-[#ff0080] hover:underline">
                      {t('privacy_policy.sections.contact_us.emails.general')}
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
