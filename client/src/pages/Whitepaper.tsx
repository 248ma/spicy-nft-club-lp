import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Download, Menu, X, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

const Whitepaper = () => {
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState('executive-summary');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ホワイトペーパーデータをi18nから取得
  const wpData = t('whitepaper', { returnObjects: true }) as any;

  // スクロール監視
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]');
      let currentSection = 'executive-summary';

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          currentSection = section.getAttribute('data-section') || 'executive-summary';
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsSidebarOpen(false);
  };

  const handleDownloadPDF = () => {
    // Vercelのヘッダー設定でContent-Disposition: inlineを設定済み
    // モバイルでもネイティブPDFビューアーで開く
    window.open('/documents/whitepaper-ja.pdf', '_blank');
  };

  const tocItems = wpData?.toc?.items || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* ヘッダー */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="SPICY NFT CLUB" className="h-10" />
          </Link>
          
          <div className="flex items-center space-x-3">
            {/* 言語切り替えボタン（PC・モバイル両対応） */}
            <LanguageSwitcher />
            
            {/* PDFダウンロードボタン (PC版) */}
            <button
              onClick={handleDownloadPDF}
              className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all"
            >
              <Download className="h-4 w-4" />
              <span className="text-sm font-medium">{wpData.download_pdf}</span>
            </button>
            
            {/* PDFダウンロードボタン (モバイル版) */}
            <button
              onClick={handleDownloadPDF}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              title={wpData.download_pdf}
            >
              <Download className="h-5 w-5" />
            </button>
            
            {/* メニューボタン (モバイル版) */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      <div className="pt-20 flex">
        {/* サイドバー（目次） */}
        <aside
          className={`
            fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] w-80 bg-black/40 backdrop-blur-md border-r border-white/10 
            overflow-y-auto z-40 transition-transform duration-300
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <div className="p-6">
            <h2 className="text-xl font-bold text-white mb-6">{wpData.toc.title}</h2>
            <nav className="space-y-2">
              {tocItems.map((item: any) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between group
                    ${activeSection === item.id 
                      ? 'bg-gradient-to-r from-pink-500/20 to-purple-600/20 text-white border-l-4 border-pink-500' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <span className="text-sm">{item.label}</span>
                  <ChevronRight className={`h-4 w-4 transition-transform ${activeSection === item.id ? 'translate-x-1' : ''}`} />
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* メインコンテンツ */}
        <main className="flex-1 lg:ml-0">
          <div className="container mx-auto px-4 lg:px-12 py-12 max-w-4xl">
            {/* タイトルセクション */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {wpData.title}
              </h1>
              <p className="text-xl text-gray-300 mb-2">{wpData.subtitle}</p>
              <p className="text-sm text-gray-400">{wpData.version}</p>
              
              <div className="mt-8 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <p className="text-gray-300 leading-relaxed">{wpData.overview}</p>
                <div className="mt-6 space-y-2">
                  <p className="text-pink-400 font-semibold">ビジョン: <span className="text-white font-normal">{wpData.vision}</span></p>
                  <p className="text-purple-400 font-semibold">ミッション: <span className="text-white font-normal">{wpData.mission}</span></p>
                </div>
              </div>

              <button
                onClick={handleDownloadPDF}
                className="mt-6 md:hidden flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all w-full justify-center"
              >
                <Download className="h-5 w-5" />
                <span className="font-medium">{wpData.download_pdf}</span>
              </button>
            </motion.div>

            {/* 1. エグゼクティブサマリー */}
            <section id="executive-summary" data-section="executive-summary" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">{wpData.sections.executive_summary.title}</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed mb-6">{wpData.sections.executive_summary.content}</p>
                
                <h3 className="text-2xl font-semibold text-white mt-8 mb-4">{wpData.sections.executive_summary.concept_title}</h3>
                <p className="text-gray-300 mb-4">{wpData.sections.executive_summary.concept_intro}</p>
                
                <div className="space-y-6">
                  {wpData.sections.executive_summary.pillars.map((pillar: any, index: number) => (
                    <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                      <h4 className="text-xl font-semibold text-pink-400 mb-3">{pillar.title}</h4>
                      <ul className="space-y-2">
                        {pillar.items.map((item: string, idx: number) => (
                          <li key={idx} className="text-gray-300 flex items-start">
                            <span className="text-purple-400 mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <p className="text-gray-300 leading-relaxed mt-8">{wpData.sections.executive_summary.closing}</p>

                <div className="grid md:grid-cols-3 gap-4 mt-8">
                  {wpData.sections.executive_summary.highlights.map((highlight: any, index: number) => (
                    <div key={index} className="bg-gradient-to-br from-pink-500/10 to-purple-600/10 rounded-lg p-4 border border-pink-500/20">
                      <p className="text-pink-400 font-semibold mb-2">{highlight.label}</p>
                      <p className="text-sm text-gray-300">{highlight.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 2. プロジェクト背景 */}
            <section id="background" data-section="background" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">{wpData.sections.background.title}</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed mb-6">{wpData.sections.background.intro}</p>
                
                <h3 className="text-2xl font-semibold text-white mt-8 mb-4">{wpData.sections.background.challenges_title}</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  {wpData.sections.background.challenges.map((challenge: any, index: number) => (
                    <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                      <h4 className="text-lg font-semibold text-purple-400 mb-2">{challenge.title}</h4>
                      <p className="text-sm text-gray-300">{challenge.description}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-2xl font-semibold text-white mt-8 mb-4">{wpData.sections.background.ceo_story_title}</h3>
                <p className="text-gray-300 leading-relaxed mb-6">{wpData.sections.background.ceo_story}</p>

                <h4 className="text-xl font-semibold text-pink-400 mb-4">{wpData.sections.background.innovation_title}</h4>
                <ul className="space-y-2 mb-6">
                  {wpData.sections.background.innovations.map((innovation: string, index: number) => (
                    <li key={index} className="text-gray-300 flex items-start">
                      <span className="text-purple-400 mr-2">•</span>
                      <span>{innovation}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-gray-300 leading-relaxed">{wpData.sections.background.closing}</p>
              </div>
            </section>

            {/* 3. NFTの概要 */}
            <section id="nft-overview" data-section="nft-overview" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">{wpData.sections.nft_overview.title}</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed mb-6">{wpData.sections.nft_overview.intro}</p>
                
                <h3 className="text-2xl font-semibold text-white mt-8 mb-4">{wpData.sections.nft_overview.pricing_title}</h3>
                <p className="text-gray-300 leading-relaxed mb-6">{wpData.sections.nft_overview.pricing_description}</p>

                <div className="bg-gradient-to-br from-pink-500/10 to-purple-600/10 rounded-lg p-6 border border-pink-500/20 mb-8">
                  {wpData.sections.nft_overview.specs.map((spec: any, index: number) => (
                    <div key={index} className="flex justify-between items-start py-2 border-b border-white/10 last:border-0">
                      <span className="text-gray-400">{spec.label}</span>
                      <span className="text-white font-medium text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-2xl font-semibold text-white mt-8 mb-4">{wpData.sections.nft_overview.utility_title}</h3>
                <div className="space-y-4 mb-8">
                  {wpData.sections.nft_overview.utilities.map((utility: any, index: number) => (
                    <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                      <h4 className="text-lg font-semibold text-purple-400 mb-2">{utility.title}</h4>
                      <p className="text-sm text-gray-300">{utility.description}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-2xl font-semibold text-white mt-8 mb-4">{wpData.sections.nft_overview.sale_schedule_title}</h3>
                <div className="space-y-2">
                  {wpData.sections.nft_overview.sale_schedule.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-start py-2">
                      <span className="text-gray-400">{item.label}</span>
                      <span className="text-white text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 4. ビジネスモデル */}
            <section id="business-model" data-section="business-model" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">{wpData.sections.business_model.title}</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed mb-6">{wpData.sections.business_model.intro}</p>
                
                <h3 className="text-2xl font-semibold text-white mt-8 mb-4">{wpData.sections.business_model.store_overview_title}</h3>
                <div className="space-y-2 mb-8">
                  {wpData.sections.business_model.store_details.map((detail: any, index: number) => (
                    <div key={index} className="flex justify-between items-start py-2">
                      <span className="text-gray-400">{detail.label}</span>
                      <span className="text-white text-right">{detail.value}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-2xl font-semibold text-white mt-8 mb-4">{wpData.sections.business_model.revenue_title}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {wpData.sections.business_model.revenue.map((rev: any, index: number) => (
                    <div key={index} className="bg-gradient-to-br from-pink-500/10 to-purple-600/10 rounded-lg p-6 border border-pink-500/20">
                      <p className="text-pink-400 font-semibold mb-2">{rev.label}</p>
                      <p className="text-2xl text-white font-bold">{rev.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 5. 市場分析 */}
            <section id="market-analysis" data-section="market-analysis" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">{wpData.sections.market_analysis.title}</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed">{wpData.sections.market_analysis.content}</p>
              </div>
            </section>

            {/* 6. 技術的詳細 */}
            <section id="technical-details" data-section="technical-details" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">{wpData.sections.technical_details.title}</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed">{wpData.sections.technical_details.content}</p>
              </div>
            </section>

            {/* 7. 法令遵守とリスク管理 */}
            <section id="compliance" data-section="compliance" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">{wpData.sections.compliance.title}</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed">{wpData.sections.compliance.content}</p>
              </div>
            </section>

            {/* 8. チーム */}
            <section id="team" data-section="team" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">{wpData.sections.team.title}</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed mb-6">{wpData.sections.team.intro}</p>
                <div className="space-y-4">
                  {wpData.sections.team.members.map((member: any, index: number) => (
                    <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                      <div className="flex items-center space-x-4 mb-2">
                        <span className="text-pink-400 font-semibold">{member.role}</span>
                        <span className="text-white font-bold">{member.name}</span>
                      </div>
                      <p className="text-gray-300">{member.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 9. ロードマップ */}
            <section id="roadmap" data-section="roadmap" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">{wpData.sections.roadmap.title}</h2>
              <div className="prose prose-invert max-w-none">
                <div className="space-y-4">
                  {wpData.sections.roadmap.items.map((item: any, index: number) => (
                    <div key={index} className="flex space-x-4">
                      <div className="flex-shrink-0 w-32">
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-sm font-semibold">
                          {item.date}
                        </span>
                      </div>
                      <div className="flex-1 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                        <p className="text-gray-300">{item.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 10. FAQ */}
            <section id="faq" data-section="faq" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">{wpData.sections.faq.title}</h2>
              <div className="prose prose-invert max-w-none">
                <div className="space-y-4 mb-6">
                  {wpData.sections.faq.items.map((item: any, index: number) => (
                    <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                      <h4 className="text-lg font-semibold text-pink-400 mb-2">Q: {item.question}</h4>
                      <p className="text-gray-300">A: {item.answer}</p>
                    </div>
                  ))}
                </div>
                <p className="text-gray-400 text-sm">{wpData.sections.faq.note}</p>
              </div>
            </section>

            {/* 11. 連絡先 */}
            <section id="contact" data-section="contact" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">{wpData.sections.contact.title}</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed">{wpData.sections.contact.content}</p>
              </div>
            </section>

            {/* 12. トークノミクス */}
            <section id="tokenomics" data-section="tokenomics" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">{wpData.sections.tokenomics.title}</h2>
              <div className="prose prose-invert max-w-none">
                <div className="bg-gradient-to-br from-pink-500/10 to-purple-600/10 rounded-lg p-6 border border-pink-500/20">
                  {wpData.sections.tokenomics.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-start py-2 border-b border-white/10 last:border-0">
                      <span className="text-gray-400">{item.label}</span>
                      <span className="text-white font-medium text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 13. 免責事項 */}
            <section id="disclaimer" data-section="disclaimer" className="mb-16 scroll-mt-24">
              <h2 className="text-3xl font-bold text-white mb-6">{wpData.sections.disclaimer.title}</h2>
              <div className="prose prose-invert max-w-none">
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
                  <p className="text-gray-300 leading-relaxed mb-4">{wpData.sections.disclaimer.content}</p>
                  <p className="text-gray-400 text-sm">{wpData.sections.disclaimer.note}</p>
                </div>
              </div>
            </section>

            {/* フッター */}
            <div className="mt-16 pt-8 border-t border-white/10 text-center">
              <Link 
                to="/" 
                className="inline-block px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all font-semibold"
              >
                トップページに戻る
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Whitepaper;
