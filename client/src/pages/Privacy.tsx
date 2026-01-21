import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
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
              {t('common.back_to_home') || 'Back to Home'}
            </Button>
          </Link>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] to-[#7928ca]">
            Privacy Policy
          </h1>
          <p className="text-gray-400 mb-12">
            Last Updated: January 21, 2026
          </p>

          <div className="space-y-12 text-gray-300 leading-relaxed">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-[#ff0080]">01.</span>
                Introduction
              </h2>
              <div className="space-y-4">
                <p>
                  SPICY NFT CLUB (hereinafter referred to as "the Project", "we", "us", or "our") respects your privacy and is committed to protecting your personal information in accordance with the Act on the Protection of Personal Information (Japan) and other applicable laws.
                </p>
                <p>
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (spicynftclub.com), NFT minting site (mint.spicynftclub.com), and interact with our social media channels including Discord, Telegram, and X (Twitter).
                </p>
              </div>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-[#ff0080]">02.</span>
                Information We Collect
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">a) Automatically Collected Information</h3>
                  <p className="mb-2">When you visit our website, we automatically collect certain information:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-gray-400">
                    <li>IP address</li>
                    <li>Browser type and version</li>
                    <li>Device information (operating system, screen resolution)</li>
                    <li>Access date and time</li>
                    <li>Referring URL</li>
                    <li>Pages visited and time spent on each page</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">b) Information You Provide</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-gray-400">
                    <li>Email address (when subscribing to newsletters or updates)</li>
                    <li>Wallet address (when purchasing NFTs)</li>
                    <li>Discord/Telegram username (when joining our community)</li>
                    <li>Event participation information</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">c) Blockchain Information</h3>
                  <p className="mb-2">When you interact with our NFT smart contracts:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-gray-400">
                    <li>Wallet address</li>
                    <li>Transaction history</li>
                    <li>NFT ownership status</li>
                    <li>Smart contract interaction history</li>
                  </ul>
                  <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-yellow-200 text-sm">
                      <strong>Important:</strong> Blockchain information is publicly available and permanently recorded on the blockchain. We cannot delete or modify information stored on the blockchain.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">d) Local Storage</h3>
                  <p className="mb-2">We use browser local storage to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-gray-400">
                    <li>Remember your age verification status (key: 'age_verified_v2')</li>
                    <li>Store your language preference</li>
                  </ul>
                  <p className="mt-2 text-sm text-gray-400">
                    This information is stored locally in your browser and is not transmitted to our servers.
                  </p>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-[#ff0080]">03.</span>
                How We Use Your Information
              </h2>
              <div className="space-y-3">
                <p>We use the collected information for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-400">
                  <li><strong className="text-white">NFT Sales and Membership Management:</strong> To identify NFT holders and provide member-exclusive benefits</li>
                  <li><strong className="text-white">Communication:</strong> To send project updates, event announcements, and important notices</li>
                  <li><strong className="text-white">Service Improvement:</strong> To analyze website performance and enhance user experience</li>
                  <li><strong className="text-white">Security:</strong> To detect and prevent fraud, unauthorized access, and other illegal activities</li>
                  <li><strong className="text-white">Legal Compliance:</strong> To comply with legal obligations and respond to lawful requests</li>
                  <li><strong className="text-white">Revenue Distribution:</strong> To calculate and distribute revenue share to NFT holders</li>
                </ul>
              </div>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-[#ff0080]">04.</span>
                Information Sharing and Disclosure
              </h2>
              <div className="space-y-4">
                <p>We may share your information with the following third parties:</p>
                
                <div className="bg-white/5 rounded-lg p-6 space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Service Providers</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-gray-400 text-sm">
                      <li><strong>Vercel:</strong> Website hosting and deployment</li>
                      <li><strong>Plausible Analytics:</strong> Privacy-friendly, cookieless website analytics</li>
                      <li><strong>Ethereum/Solana Blockchain:</strong> NFT issuance and management</li>
                      <li><strong>Discord/Telegram:</strong> Community management and communication</li>
                    </ul>
                  </div>
                </div>

                <p>We may also disclose your information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-400">
                  <li>When required by law or in response to valid legal requests</li>
                  <li>To protect our rights, property, or safety, or that of our users</li>
                  <li>In connection with a business transfer, merger, or acquisition</li>
                </ul>

                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-blue-200 text-sm">
                    <strong>We do not sell your personal information to third parties.</strong>
                  </p>
                </div>
              </div>
            </section>

            {/* Cookies and Tracking */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-[#ff0080]">05.</span>
                Cookies and Tracking Technologies
              </h2>
              <div className="space-y-4">
                <p>
                  We prioritize your privacy and use minimal tracking technologies:
                </p>

                <div className="bg-white/5 rounded-lg p-6 space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Plausible Analytics (Cookieless)</h4>
                    <p className="text-gray-400 text-sm">
                      We use Plausible Analytics, a privacy-friendly analytics tool that does not use cookies and does not collect personally identifiable information. Plausible is GDPR, CCPA, and PECR compliant.
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Data collected: Page views, referral sources, device type (without identifying individual users)
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Local Storage</h4>
                    <p className="text-gray-400 text-sm">
                      We use browser local storage (not cookies) to remember your age verification status and language preference. This data is stored locally on your device and is not transmitted to our servers.
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-200 text-sm">
                    <strong>No Cookie Consent Required:</strong> Since we do not use cookies for tracking or advertising, no cookie consent banner is required under GDPR and ePrivacy regulations.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-[#ff0080]">06.</span>
                Data Security
              </h2>
              <div className="space-y-4">
                <p>
                  We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. These measures include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-400">
                  <li>HTTPS encryption for all data transmission</li>
                  <li>Secure hosting infrastructure (Vercel)</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication mechanisms</li>
                </ul>
                <p className="text-gray-400">
                  However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.
                </p>
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-200 text-sm">
                    <strong>Wallet Security:</strong> Never share your wallet's private keys or seed phrase with anyone, including our team. We will never ask for this information.
                  </p>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-[#ff0080]">07.</span>
                Your Rights
              </h2>
              <div className="space-y-4">
                <p>Under applicable privacy laws, you have the following rights:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-400">
                  <li><strong className="text-white">Right to Access:</strong> Request access to the personal information we hold about you</li>
                  <li><strong className="text-white">Right to Rectification:</strong> Request correction of inaccurate personal information</li>
                  <li><strong className="text-white">Right to Erasure:</strong> Request deletion of your personal information (subject to limitations)</li>
                  <li><strong className="text-white">Right to Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
                  <li><strong className="text-white">Right to Data Portability:</strong> Request a copy of your data in a structured format</li>
                </ul>

                <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-yellow-200 text-sm">
                    <strong>Blockchain Limitation:</strong> Information recorded on the blockchain (wallet addresses, transaction history, NFT ownership) cannot be deleted or modified due to the immutable nature of blockchain technology.
                  </p>
                </div>

                <p className="mt-4">
                  To exercise any of these rights, please contact us at: <a href="mailto:privacy@spicynftclub.com" className="text-[#ff0080] hover:underline">privacy@spicynftclub.com</a>
                </p>
              </div>
            </section>

            {/* International Data Transfers */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-[#ff0080]">08.</span>
                International Data Transfers
              </h2>
              <div className="space-y-4">
                <p>
                  Your information may be transferred to and stored on servers located outside of Japan, including in the United States (Vercel hosting). By using our services, you consent to the transfer of your information to countries that may have different data protection laws than Japan.
                </p>
                <p>
                  We ensure that appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
                </p>
              </div>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-[#ff0080]">09.</span>
                Children's Privacy
              </h2>
              <div className="space-y-4">
                <p>
                  Our services are intended for individuals aged 18 and above. We do not knowingly collect personal information from individuals under 18 years of age.
                </p>
                <p>
                  If we become aware that we have collected personal information from someone under 18, we will take steps to delete such information promptly.
                </p>
              </div>
            </section>

            {/* Changes to Privacy Policy */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-[#ff0080]">10.</span>
                Changes to This Privacy Policy
              </h2>
              <div className="space-y-4">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
                <p>
                  We encourage you to review this Privacy Policy periodically for any changes. Your continued use of our services after any modifications indicates your acceptance of the updated Privacy Policy.
                </p>
              </div>
            </section>

            {/* Contact Us */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-[#ff0080]">11.</span>
                Contact Us
              </h2>
              <div className="space-y-4">
                <p>
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
                </p>
                <div className="bg-white/5 rounded-lg p-6">
                  <p className="text-white font-semibold mb-2">SPICY NFT CLUB</p>
                  <p className="text-gray-400 text-sm">Email: <a href="mailto:privacy@spicynftclub.com" className="text-[#ff0080] hover:underline">privacy@spicynftclub.com</a></p>
                  <p className="text-gray-400 text-sm">General Inquiries: <a href="mailto:contact@spicynftclub.com" className="text-[#ff0080] hover:underline">contact@spicynftclub.com</a></p>
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
