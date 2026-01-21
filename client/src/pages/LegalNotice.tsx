import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Scale, Shield, AlertTriangle, Users, Ban } from "lucide-react";
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
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">
            <Button variant="ghost" className="mb-8 text-gray-400 hover:text-white pl-0 hover:bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('common.back_to_home') || 'Back to Home'}
            </Button>
          </Link>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] to-[#7928ca]">
            {t('legal_notice.title') || 'Legal Notice'}
          </h1>
          <p className="text-gray-400 mb-12">
            Last Updated: January 21, 2026
          </p>

          <div className="space-y-12">
            {/* Business Information - 特定商取引法に基づく表記 */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-6 h-6 text-[#ff0080]" />
                <h2 className="text-2xl font-bold text-white">
                  Business Information (特定商取引法に基づく表記)
                </h2>
              </div>
              
              <div className="grid gap-px bg-white/10 border border-white/10 rounded-lg overflow-hidden">
                {items.map((key) => (
                  <div key={key} className="grid md:grid-cols-[240px_1fr] bg-black/90">
                    <div className="p-4 md:p-6 bg-white/5 font-bold text-gray-200 flex items-center">
                      {t(`legal_notice.items.${key}.label`)}
                    </div>
                    <div className="p-4 md:p-6 text-gray-400 flex items-center">
                      {t(`legal_notice.items.${key}.value`)}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Business Description */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-6 h-6 text-[#ff0080]" />
                <h2 className="text-2xl font-bold text-white">Business Description</h2>
              </div>
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <p className="text-gray-300 leading-relaxed">
                  SPICY NFT CLUB is a Web3 project that issues and manages premium adult entertainment membership NFTs. We provide NFT holders with exclusive benefits including usage rights at physical stores, revenue distribution, governance participation rights, and other premium privileges.
                </p>
                <p className="text-gray-300 leading-relaxed mt-4">
                  Our mission is to evolve the adult entertainment industry into a safe, fair, and attractive sector through blockchain technology and professional management, providing valuable experiences and possibilities to global stakeholders.
                </p>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Scale className="w-6 h-6 text-[#ff0080]" />
                <h2 className="text-2xl font-bold text-white">Intellectual Property Rights</h2>
              </div>
              <div className="bg-white/5 rounded-lg p-6 border border-white/10 space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  All content on this website and related to our NFTs (including text, images, logos, designs, and other materials) is owned by SPICY NFT CLUB or its licensors and is protected by copyright, trademark, and other intellectual property laws.
                </p>
                <div className="border-l-4 border-[#ff0080] pl-4">
                  <p className="text-gray-300 text-sm">
                    <strong className="text-white">NFT Holder Rights:</strong> NFT holders are granted a limited, non-exclusive license to use, display, and showcase the NFT artwork for personal, non-commercial purposes. Commercial use requires separate authorization.
                  </p>
                </div>
              </div>
            </section>

            {/* Disclaimer */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-[#ff0080]" />
                <h2 className="text-2xl font-bold text-white">Disclaimer and Risk Disclosure</h2>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                  <h3 className="font-bold text-red-200 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Important Notice
                  </h3>
                  <div className="space-y-3 text-sm text-gray-300">
                    <p><strong className="text-white">Investment Risk:</strong> {t('footer.investment_warning') || 'This NFT is not an investment product. We do not guarantee future value appreciation or profits.'}</p>
                    <p><strong className="text-white">Price Volatility:</strong> {t('footer.price_fluctuation') || 'Cryptocurrency prices are constantly fluctuating, and the value of NFTs may change compared to the time of purchase.'}</p>
                    <p><strong className="text-white">Service Changes:</strong> {t('footer.service_change') || 'Benefits and services associated with this NFT may be changed or terminated at the discretion of management.'}</p>
                    <p><strong className="text-white">Secondary Market:</strong> {t('footer.secondary_market') || 'Transactions in the secondary market are not guaranteed by us in terms of content or price.'}</p>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h4 className="font-semibold text-white mb-3">Additional Risks</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-start gap-2">
                      <span className="text-[#ff0080] mt-1">•</span>
                      <span><strong className="text-white">Technical Risk:</strong> The use of blockchain technology, smart contracts, and wallets involves technical risks including potential bugs, vulnerabilities, and network failures.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#ff0080] mt-1">•</span>
                      <span><strong className="text-white">Regulatory Risk:</strong> Changes in laws and regulations regarding cryptocurrencies and NFTs may affect the project.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#ff0080] mt-1">•</span>
                      <span><strong className="text-white">Business Risk:</strong> The success of physical store operations is not guaranteed and may be affected by market conditions.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#ff0080] mt-1">•</span>
                      <span><strong className="text-white">Liquidity Risk:</strong> There is no guarantee of liquidity in the secondary market for NFTs.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <p className="text-yellow-200 text-sm">
                    <strong>Limitation of Liability:</strong> To the extent permitted by law, we shall not be liable for any damages arising from the use of this service beyond the scope required by applicable laws.
                  </p>
                </div>
              </div>
            </section>

            {/* Compliance */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-[#ff0080]" />
                <h2 className="text-2xl font-bold text-white">Legal Compliance</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[#ff0080]" />
                    Entertainment Business Act
                  </h4>
                  <p className="text-sm text-gray-400">
                    We strictly comply with Japan's Act on Control and Improvement of Amusement Business (風俗営業法). Physical store operations will obtain all necessary licenses and permits, and we maintain clean operations that exclude anti-social forces.
                  </p>
                </div>

                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#ff0080]" />
                    Anti-Money Laundering
                  </h4>
                  <p className="text-sm text-gray-400">
                    We are committed to preventing money laundering and terrorist financing. We may implement Know Your Customer (KYC) procedures as necessary and will report suspicious transactions to relevant authorities.
                  </p>
                </div>
              </div>
            </section>

            {/* Age Restriction */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-[#ff0080]" />
                <h2 className="text-2xl font-bold text-white">Age Restriction</h2>
              </div>
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <p className="text-gray-300 leading-relaxed">
                  Our services are intended for individuals aged <strong className="text-white">18 years and above only</strong>. Individuals under 18 years of age are not permitted to use this service.
                </p>
                <p className="text-gray-300 leading-relaxed mt-3">
                  We implement age verification upon website access. By using our services, you confirm that you are 18 years of age or older.
                </p>
              </div>
            </section>

            {/* Prohibited Activities */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Ban className="w-6 h-6 text-[#ff0080]" />
                <h2 className="text-2xl font-bold text-white">Prohibited Activities</h2>
              </div>
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <p className="text-gray-300 mb-4">Users are prohibited from engaging in the following activities:</p>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✕</span>
                    <span>Violating laws, regulations, or public order and morals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✕</span>
                    <span>Infringing on intellectual property rights, privacy rights, or other rights of the Project or third parties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✕</span>
                    <span>Using the service for money laundering, terrorist financing, or other illegal purposes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✕</span>
                    <span>Unauthorized access, hacking, or distribution of malware</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✕</span>
                    <span>Impersonating the Project, staff, or other users</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">✕</span>
                    <span>Any other activities deemed inappropriate by the Project</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Governing Law */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Scale className="w-6 h-6 text-[#ff0080]" />
                <h2 className="text-2xl font-bold text-white">Governing Law and Jurisdiction</h2>
              </div>
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <p className="text-gray-300 leading-relaxed">
                  This Legal Notice and all matters arising from or related to our services shall be governed by and construed in accordance with the laws of Japan.
                </p>
                <p className="text-gray-300 leading-relaxed mt-3">
                  Any disputes arising from or related to our services shall be subject to the exclusive jurisdiction of the Tokyo District Court as the court of first instance.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-6 h-6 text-[#ff0080]" />
                <h2 className="text-2xl font-bold text-white">Contact Information</h2>
              </div>
              <div className="bg-gradient-to-br from-[#ff0080]/10 to-[#7928ca]/10 rounded-lg p-6 border border-white/10">
                <p className="text-white font-semibold mb-4">SPICY NFT CLUB</p>
                <div className="space-y-2 text-sm text-gray-300">
                  <p>
                    <span className="text-gray-400">General Inquiries:</span>{' '}
                    <a href="mailto:contact@spicynftclub.com" className="text-[#ff0080] hover:underline">
                      contact@spicynftclub.com
                    </a>
                  </p>
                  <p>
                    <span className="text-gray-400">Legal Matters:</span>{' '}
                    <a href="mailto:legal@spicynftclub.com" className="text-[#ff0080] hover:underline">
                      legal@spicynftclub.com
                    </a>
                  </p>
                  <p>
                    <span className="text-gray-400">Support:</span>{' '}
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
