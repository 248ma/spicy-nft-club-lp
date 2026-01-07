import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Check, Key, BarChart3, Scale, Wallet, Coins, Link as LinkIcon, ShoppingCart } from "lucide-react";
import { Link } from "wouter";

import { motion, useScroll, useTransform } from "framer-motion";
import { BondingCurveVisual } from '../components/BondingCurveVisual';
import { NftMeter, NftMeterHandle } from "@/components/NftMeter";
import { useRef } from "react";
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileMenu } from "@/components/MobileMenu";
import { AgeGate } from "@/components/AgeGate";
import { MintModal } from "@/components/MintModal";
import '../lib/i18n';

export default function Home() {
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  // アニメーション設定
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8 }
  };

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } },
    viewport: { once: true, margin: "-100px" }
  };

  const staggerItem = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  // コンテンツ定義はi18nに移行したため削除し、直接t関数を使用します
  const benefitsIcons = [Key, BarChart3, Scale];
  const nftMeterRef = useRef<NftMeterHandle>(null);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <AgeGate />
      {/* Fixed Logo */}
      <motion.div
        className="fixed top-6 left-6 z-50 cursor-pointer"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <img src="/logo.webp" alt="SPICY NFT CLUB" className="h-16 w-auto drop-shadow-[0_0_10px_rgba(140,20,80,0.5)]" />
      </motion.div>

      {/* Header Actions (CTA + Language) */}
      <motion.div
        className="fixed top-6 right-6 z-50 flex items-center gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]), pointerEvents: useTransform(scrollYProgress, (v) => v > 0.1 ? 'auto' : 'none') }}
        >
          <MintModal 
            trigger={
              <Button size="sm" className="flex bg-gradient-to-r from-[#ff0080] to-[#7928ca] hover:from-[#ff0080]/90 hover:to-[#7928ca]/90 text-white shadow-[0_0_15px_rgba(255,0,128,0.4)] rounded-full border-0 font-bold px-4 md:px-6 text-xs md:text-sm">
                {t('hero.cta')}
              </Button>
            }
          />
        </motion.div>
        <LanguageSwitcher />
        <MobileMenu />
      </motion.div>

      {/* Dot Navigation */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
        {['hero', 'concept', 'solution', 'nft', 'roadmap', 'team', 'how-to-buy', 'faq'].map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className="w-3 h-3 rounded-full bg-white/20 hover:bg-[#ff0080] transition-all duration-300 border border-transparent hover:border-[#ff0080] hover:scale-125"
            aria-label={`Scroll to ${id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/snchero2.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background z-10" />

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50 z-5" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10" />

        {/* Content */}
        <motion.div 
          className="container relative z-20 text-center"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >

          
          <motion.div 
            className="text-xl md:text-3xl font-bold mb-6 tracking-[0.3em] uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {t('hero.subtitle')}
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-10 tracking-tighter leading-none max-w-6xl mx-auto text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.9)]"
            style={{
              textShadow: "0 0 20px rgba(180,0,80,0.9), 0 0 40px rgba(100,0,60,0.7), 0 0 80px rgba(80,0,120,0.5)"
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            dangerouslySetInnerHTML={{ __html: t('hero.title') }}
          />

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="flex flex-col items-center gap-4">
              <MintModal 
                trigger={
                  <Button size="lg" className="text-lg px-12 py-8 bg-gradient-to-r from-[#ff0080] to-[#7928ca] hover:from-[#ff0080]/90 hover:to-[#7928ca]/90 text-white transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,0,128,0.4)] rounded-full border-0">
                    {t('hero.cta')}
                  </Button>
                }
              />
              <div className="flex flex-col items-center mt-2">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{t('hero.current_price')}</span>
                <div className="text-sm text-white/80 font-mono tracking-wider drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                  ETH: #001 / 0.01eth
                </div>
              </div>
              <div 
                onClick={() => window.open("https://t.me/spicynftclub", "_blank")}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#0088cc] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </div>
                <span className="text-sm font-medium">Join Telegram Channel</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1 shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            <div className="w-1 h-2 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.8)] mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Concept Section (Vision & Mission) */}
      <section id="concept" className="py-12 md:py-20 relative bg-black overflow-hidden">
        {/* Background Elements - Global Gradients */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-[#7928ca]/20 to-transparent pointer-events-none blur-3xl z-0" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-[#ff0080]/10 to-transparent pointer-events-none blur-3xl z-0" />
        
        <div className="container relative z-10">
          {/* Section Header */}
          <motion.div 
            className="text-center mb-24"
            {...fadeInUp}
          >
            <span className="text-gradient-primary tracking-[0.3em] uppercase text-sm font-bold mb-4 block">{t('concept.subtitle')}</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">{t('concept.title')}</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {t('concept.description')}
            </p>
          </motion.div>

          {/* Core Philosophy (Vision & Mission) */}
          <div className="relative mb-16">
            {/* Background Image - Extended to cover Vision/Mission and part of Features */}
            <div className="absolute inset-0 -mx-4 md:-mx-20 -mt-10 -mb-40 z-0 rounded-3xl overflow-hidden">
              <img 
                src="/snclady.webp" 
                alt="Background" 
                className="w-full h-full object-cover opacity-[0.38]"
                style={{ objectPosition: '80% 20%' }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
            </div>

            {/* Connecting Line */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block z-10" />
            
            <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center relative z-10">
              {/* Vision */}
              <motion.div 
                className="relative text-center md:text-right"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-block p-1 rounded-2xl bg-gradient-to-br from-[#ff0080] to-transparent mb-6">
                  <div className="bg-black px-6 py-2 rounded-xl border border-[#ff0080]/30">
                    <h3 className="text-[#ff0080] text-sm font-bold tracking-[0.2em] uppercase">{t('concept.vision.label')}</h3>
                  </div>
                </div>
                <p className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-[0_0_15px_rgba(255,0,128,0.3)]">
                  {t('concept.vision.text')}
                </p>
                <div className="hidden md:block absolute top-1/2 -right-12 w-12 h-px bg-gradient-to-r from-white/20 to-[#ff0080]" />
              </motion.div>

              {/* Mission */}
              <motion.div 
                className="relative text-center md:text-left"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="hidden md:block absolute top-1/2 -left-12 w-12 h-px bg-gradient-to-l from-white/20 to-[#7928ca]" />
                <div className="inline-block p-1 rounded-2xl bg-gradient-to-bl from-[#7928ca] to-transparent mb-6">
                  <div className="bg-black px-6 py-2 rounded-xl border border-[#7928ca]/30">
                    <h3 className="text-[#7928ca] text-sm font-bold tracking-[0.2em] uppercase">{t('concept.mission.label')}</h3>
                  </div>
                </div>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
                  {t('concept.mission.text')}
                </p>
              </motion.div>
            </div>
          </div>



          {/* 3 Core Features (Reasons) */}
          <motion.div 
            className="grid md:grid-cols-3 gap-8 mb-32"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {(t('concept.features', { returnObjects: true }) as any[]).map((feature, i) => (
              <motion.div key={i} variants={staggerItem} className="h-full">
                <div className="group relative h-full glass-card p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  {/* Number Background */}
                  <div className="absolute -right-4 -top-4 text-[120px] font-bold text-white/[0.03] group-hover:text-white/[0.05] transition-colors select-none pointer-events-none">
                    {i + 1}
                  </div>
                  
                  {/* Icon/Number Badge */}
                  <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-[#ff0080]/20 to-[#7928ca]/20 flex items-center justify-center mb-8 border border-white/10 group-hover:border-white/30 transition-colors shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                    <span className="text-white font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-br from-[#ff0080] to-[#7928ca]">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#ff0080] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <div className="w-12 h-0.5 bg-white/10 mb-6 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-[#ff0080] group-hover:to-transparent transition-all duration-500" />
                  
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* New Features Section (4 Cards) - REMOVED (Moved to NFT section) */}
        </div>
      </section>






      {/* End of Concept Section */}

      {/* NFT Section (Features + Tokenomics) */}
      <section id="nft" className="py-12 md:py-20 relative bg-black overflow-hidden">
        <div className="container relative z-10">
          {/* Unified Section Header */}
          <motion.div 
            className="text-center mb-24"
            {...fadeInUp}
          >
            <span className="text-gradient-primary tracking-[0.3em] uppercase text-sm font-bold mb-4 block">Want to join?</span>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight">NFT MEMBERSHIP</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#ff0080] to-[#7928ca] mx-auto rounded-full" />
          </motion.div>



          {/* SPICY NFT CLUB Features Section */}
          <div className="mt-24 mb-32">
            <motion.div 
              className="text-center mb-16"
              {...fadeInUp}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <span className="w-8 h-[2px] bg-[#ff0080]"></span>
                {t('features_section.title')}
                <span className="w-8 h-[2px] bg-[#ff0080]"></span>
              </h3>
            </motion.div>

            <div className="grid grid-cols-2 gap-3 md:gap-6 max-w-5xl mx-auto">
              {(t('features_section.items', { returnObjects: true }) as any[]).map((item, i) => {
                const iconPath = [
                  "/images/icon-crown.webp",            // 実質無料利用権
                  "/images/icon-secondary-market.webp", // 二次流通可能 (修正: 正しいファイル名へ)
                  "/images/icon-governance.webp",       // 経営への参加
                  "/images/icon-rewards.webp"           // 保有還元とユーティリティ
                ][i];
                
                // アイコンの枠線の色（画像に基づく）
                const borderColor = [
                  "border-[#3b82f6]", // 青 (01)
                  "border-[#a855f7]", // 紫 (02)
                  "border-[#f97316]", // オレンジ (03)
                  "border-[#14b8a6]"  // 緑 (04)
                ][i];

                // アイコンの背景色（薄い色）
                const iconBgColor = [
                  "bg-[#3b82f6]/10",
                  "bg-[#a855f7]/10",
                  "bg-[#f97316]/10",
                  "bg-[#14b8a6]/10"
                ][i];

                return (
                  <motion.div 
                    key={i}
                    className="relative p-4 md:p-8 rounded-2xl md:rounded-[2rem] bg-black border border-white/10 overflow-hidden group hover:border-white/20 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className="flex flex-col h-full relative z-10">
                      <div className="flex justify-between items-start mb-4 md:mb-8">
                        {/* Icon Container */}
                        <div className={`w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-2xl ${borderColor} border flex items-center justify-center ${iconBgColor} p-2 md:p-4`}>
                          <img src={iconPath} alt={item.title} className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                        </div>
                        {/* Number */}
                        <span className="text-gray-500 font-mono text-xs md:text-sm tracking-widest">0{i + 1}</span>
                      </div>
                      
                      <h4 className="text-sm md:text-xl font-bold text-white mb-2 md:mb-4">{item.title}</h4>
                      <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                        {item.description.split('*').map((part: string, index: number) => (
                          index === 0 ? part : <span key={index} className="text-gray-400">{part}</span>
                        ))}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Tokenomics Subsection */}
          <div className="mt-24 mb-32 pt-12 border-t border-white/10">
            <motion.div 
              className="text-center mb-16"
              {...fadeInUp}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <span className="w-8 h-[2px] bg-[#ff0080]"></span>
                {t('tokenomics.title')}
                <span className="w-8 h-[2px] bg-[#ff0080]"></span>
              </h3>
            </motion.div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 mb-12">
              {/* NFT Card & Price Display */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, type: "spring" }}
                className="relative flex justify-center w-full md:w-auto"
              >
                <div className="flex flex-col items-center w-full max-w-sm">
                  <div className="relative w-full aspect-[3/4] perspective-1000 mb-8">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#ff0080] via-[#7928ca] to-[#4a00e0] rounded-3xl blur-[100px] opacity-40" />
                    <div className="relative z-10 w-full h-full glass-card rounded-3xl border border-white/20 p-4 transform transition-transform duration-500 preserve-3d">
                      <img 
                        src="/nft-card.webp" loading="lazy" 
                        alt="SPICY NFT Membership Card" 
                        className="w-full h-full object-cover rounded-2xl shadow-2xl"
                      />
                      <div className="absolute bottom-8 left-8 right-8 glass-panel p-4 rounded-xl">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Membership</p>
                            <p className="text-lg font-bold text-white">Premium Pass</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-400 uppercase tracking-wider">ID</p>
                            <p className="text-lg font-mono text-white">#001</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center w-full mt-4 mb-8 md:mb-0">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 block">{t('hero.current_price')}</span>
                    <div className="w-full">
                      <p className="text-center text-xl text-white font-mono tracking-wider drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] bg-white/5 px-6 py-4 rounded-full border border-white/10 w-full">
                        ETH: #001 / 0.01eth
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Tokenomics Details */}
              <div className="w-full md:w-1/2 max-w-xl">
                <div className="grid grid-cols-1 gap-6">
                  {Object.entries(t('tokenomics.items', { returnObjects: true }) as Record<string, { label: string, value: string }>).map(([key, item], i) => (
                    <motion.div 
                      key={key}
                      className="glass-card p-6 rounded-xl flex justify-between items-center border-l-4 border-[#ff0080]"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                      <span className="text-gray-400 font-medium">{item.label}</span>
                      <span className="text-white font-bold text-lg">{item.value}</span>
                    </motion.div>
                  ))}
                </div>
                {/* Note for Secondary Market */}
                <motion.p 
                  className="text-gray-500 text-xs mt-4 text-right"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {t('tokenomics.note')}
                </motion.p>
              </div>
            </div>
          </div>

          {/* Member Exclusive Privileges Subsection */}
          <div className="w-full mb-32">
            <motion.div 
              className="text-center mb-12"
              {...fadeInUp}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                <span className="w-8 h-[2px] bg-[#ff0080]"></span>
                {t('benefits.title')}
                <span className="w-8 h-[2px] bg-[#ff0080]"></span>
              </h3>

            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(t('benefits.items', { returnObjects: true }) as any[]).map((item, i) => {
              const iconPath = [
                "/images/icon-crown.webp",     // VIP利用権
                "/images/icon-priority.webp",  // 優先予約権
                "/images/icon-travel.webp",    // 旅行時利用サポート
                "/images/icon-event.webp",     // 限定イベント参加権
                "/images/icon-rewards.webp",   // 店舗収益の還元
                "/images/icon-governance.webp" // 経営投票権
              ][i];

              return (
                <motion.div 
                  key={i} 
                  className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff0080]/0 to-[#7928ca]/0 group-hover:from-[#ff0080]/10 group-hover:to-[#7928ca]/10 rounded-3xl transition-all duration-500" />
                  <div className="relative z-10 flex flex-col items-center text-center h-full">
                    <div className="mb-8 relative">
                      <div className="absolute inset-0 bg-[#ff0080] blur-[40px] opacity-0" />
                      <img 
                        src={iconPath} 
                        alt={item.title}
                        className="w-24 h-24 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
            </div>
          </div>

          {/* Bonding Curve Explanation */}
          <motion.div 
            className="max-w-5xl mx-auto text-center glass-card p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden mt-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff0080] to-[#7928ca]" />
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#7928ca] rounded-full blur-[100px] opacity-20" />
            
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">{t('bonding_curve.title')}</h3>
            <p className="text-gray-300 leading-relaxed mb-12 max-w-3xl mx-auto">
              {t('bonding_curve.description')}
            </p>

            {/* Visual Component */}
            <div className="mb-12">
              <BondingCurveVisual />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {(t('bonding_curve.features', { returnObjects: true }) as any[]).map((feature, i) => (
                <div key={i} className="bg-black/40 p-6 rounded-xl border border-white/5 hover:bg-white/5 transition-colors">
                  <div className={`${i === 0 ? 'text-[#ff0080]' : i === 1 ? 'text-[#7928ca]' : 'text-[#4a00e0]'} font-bold mb-2 text-lg`}>
                    {feature.title}
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
        <div className="container relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <span className="text-gradient-primary tracking-[0.3em] uppercase text-sm font-bold mb-4 block">{t('solution.subtitle')}</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight">{t('solution.title')}</h2>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
                {t('solution.description')}
              </p>
            </motion.div>
              
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(t('solution.items', { returnObjects: true }) as any[]).map((item, i) => (
                <motion.div 
                  key={i}
                  className="glass-panel p-8 rounded-2xl flex flex-col gap-6 hover:bg-white/5 transition-colors text-center items-center h-full border border-white/10 hover:border-[#ff0080]/30"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ff0080] to-[#7928ca] flex items-center justify-center shrink-0 shadow-lg shadow-purple-500/30">
                    <Check className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            

          </div>
        </div>
      </section>

      {/* Whitepaper Section */}
      <section id="whitepaper" className="py-24 relative bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#111] to-black opacity-80" />
        <div className="container relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center glass-card p-12 rounded-3xl border border-white/10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gray-400 tracking-[0.3em] uppercase text-sm font-bold mb-4 block">{t('whitepaper.subtitle')}</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">{t('whitepaper.title')}</h2>
            <p className="text-gray-300 leading-relaxed mb-10 max-w-2xl mx-auto">
              {t('whitepaper.description')}
            </p>
            
            <motion.a
              href="#"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white border-2 border-transparent rounded-full transition-all duration-300 group shadow-[0_0_20px_rgba(255,0,128,0.3)] hover:shadow-[0_0_30px_rgba(255,0,128,0.6)]"
              style={{
                background: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)) padding-box, linear-gradient(to right, #ff0080, #7928ca) border-box',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('whitepaper.button')}
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform drop-shadow-[0_0_5px_rgba(255,0,128,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-10 md:py-16 relative bg-black overflow-hidden">
        <div className="absolute inset-0 aurora-bg opacity-20" />
        <div className="container relative z-10">
          <motion.div 
            className="text-center mb-32"
            {...fadeInUp}
          >
            <span className="text-gradient-primary tracking-[0.3em] uppercase text-sm font-bold mb-4 block">{t('roadmap.subtitle')}</span>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">{t('roadmap.title')}</h2>
          </motion.div>

          <div className="max-w-7xl mx-auto relative">
            {/* Horizontal Line for Desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-[#ff0080] via-[#7928ca] to-[#4a00e0] opacity-50 -translate-y-1/2" />
            
            {/* Vertical Line for Mobile */}
            <div className="md:hidden absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#ff0080] via-[#7928ca] to-[#4a00e0] opacity-30" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative md:h-[480px]">
              {(t('roadmap.items', { returnObjects: true }) as any[]).map((item, i) => (
                <motion.div 
                  key={i}
                  className={`relative flex md:block h-full`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                >
                  {/* Desktop Dot - Centered on the horizontal line */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 w-6 h-6 rounded-full bg-[#ff0080] shadow-[0_0_20px_#ff0080] -translate-x-1/2 -translate-y-1/2 z-10 border-4 border-black" />
                  
                  {/* Mobile Dot */}
                  <div className="md:hidden absolute left-8 top-8 w-4 h-4 rounded-full bg-[#ff0080] shadow-[0_0_10px_#ff0080] -translate-x-1/2 z-10 border-2 border-black" />

                  {/* Vertical Line Connector for Desktop */}
                  <div className={`hidden md:block absolute left-1/2 w-0.5 bg-gradient-to-b from-[#ff0080] to-[#7928ca] -translate-x-1/2 opacity-50 ${i % 2 === 0 ? 'top-1/2 h-12' : 'bottom-1/2 h-12'}`} />

                  <div className={`glass-card p-6 rounded-xl relative group w-full ml-16 md:ml-0 text-left md:absolute md:left-0 ${i % 2 === 0 ? 'md:top-1/2 md:mt-12' : 'md:bottom-1/2 md:mb-12'}`}>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff0080] to-[#7928ca] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="text-[#ff0080] font-bold mb-2 block tracking-widest text-sm uppercase">{item.date || item.phase}</span>
                    <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-10 md:py-16 relative overflow-hidden">
        <div className="container relative z-10 max-w-5xl">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <span className="text-gradient-primary tracking-[0.3em] uppercase text-sm font-bold mb-4 block">{t('team.subtitle')}</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">{t('team.title')}</h2>
          </motion.div>

          {/* CEO Profile */}
          <motion.div 
            className="glass-card p-8 md:p-12 rounded-3xl mb-12 relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff0080] to-[#7928ca] opacity-50" />
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#ff0080] to-[#7928ca] p-1 flex-shrink-0 shadow-[0_0_30px_rgba(255,0,128,0.3)]">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                  <img 
                    src="/images/nishiyama01.webp" loading="lazy" 
                    alt={t('team.ceo.name')} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="mb-4">
                  <span className="text-[#ff0080] font-bold tracking-wider text-sm uppercase mb-2 block">{t('team.ceo.role')}</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('team.ceo.name')}</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">{t('team.ceo.description')}</p>
                  <a 
                    href="https://x.com/spicy248ma" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#ff0080] hover:text-[#ff0080]/80 transition-colors text-sm font-medium mb-2"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    @spicy248ma
                  </a>
                </div>
                
                <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                  {(t('team.ceo.achievements', { returnObjects: true }) as any[]).map((item, i) => (
                    <div key={i} className="text-center md:text-left">
                      <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">{item.label}</div>
                      <div className="text-xl md:text-2xl font-bold text-white font-mono">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Advisors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(t('team.members', { returnObjects: true }) as any[]).map((member, i) => (
              <motion.div 
                key={i}
                className="glass-card p-6 rounded-xl text-center hover:bg-white/5 transition-colors duration-300 flex flex-col items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                <span className="text-[#ff0080] text-xs font-bold mb-2 block">{member.role}</span>
                <p className="text-gray-400 text-xs">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>      {/* How to Buy Section */}
      <section id="how-to-buy" className="py-12 md:py-20 relative bg-black/30">
        <div className="container relative z-10 max-w-4xl">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <span className="text-gradient-primary tracking-[0.3em] uppercase text-sm font-bold mb-4 block">{t('how_to_buy.subtitle')}</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">{t('how_to_buy.title')}</h2>
          </motion.div>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[27px] md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#ff0080] via-[#7928ca] to-[#4a00e0] opacity-30 -translate-x-1/2" />

            <div className="flex flex-col gap-12">
              {[
                { icon: ShoppingCart, step: 1 },
                { icon: Wallet, step: 2 },
                { icon: Key, step: 3 },
                { icon: Check, step: 4 },
                { icon: Coins, step: "EX" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`relative flex flex-col md:flex-row gap-8 items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Content Card */}
                  <div className="flex-1 w-full pl-16 md:pl-0">
                    <Card className={`relative bg-black/40 border-white/10 backdrop-blur-sm p-6 hover:border-[#ff0080]/50 transition-colors duration-300 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                      <div className={`text-xs font-bold text-[#ff0080] mb-2 tracking-widest`}>STEP {item.step}</div>
                      <h3 className="text-xl font-bold text-white mb-3">{t(`how_to_buy.steps.${index}.title`)}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: t(`how_to_buy.steps.${index}.description`) }} />
                    </Card>
                  </div>

                  {/* Center Icon/Number */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-10">
                    <div className="w-14 h-14 rounded-full bg-black border-2 border-[#ff0080] flex items-center justify-center shadow-[0_0_15px_rgba(255,0,128,0.3)]">
                      <span className="text-xl font-bold text-white">{item.step}</span>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-12 md:py-20 relative bg-black/50 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#ff0080]/10 to-transparent pointer-events-none" />
        <div className="container relative z-10">
          <motion.div 
            className="text-center mb-12"
            {...fadeInUp}
          >
            <span className="text-gradient-primary tracking-[0.3em] uppercase text-xs font-bold mb-2 block">{t('faq.subtitle')}</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{t('faq.title')}</h2>
          </motion.div>

          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full border border-white/10 rounded-2xl bg-[#0a0a0a] overflow-hidden shadow-2xl">
              <Accordion type="single" collapsible className="w-full">
                {(t('faq.items', { returnObjects: true }) as any[]).map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/10 last:border-0 px-6 transition-all duration-300 hover:bg-white/5">
                    <AccordionTrigger className="text-base font-bold text-white hover:text-[#ff0080] transition-colors py-6 [&[data-state=open]]:text-[#ff0080]">
                      <span className="flex-1 text-center pr-4">{item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-400 text-sm pb-6 leading-relaxed text-center px-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              {t('cta.title')}
            </h2>
            <p className="text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              {t('cta.description')}
            </p>
            
            <NftMeter ref={nftMeterRef} />

            <div className="flex flex-col items-center gap-6">
              <Button 
                size="lg" 
                className="text-xl px-12 py-8 bg-gradient-to-r from-[#ff0080] to-[#7928ca] hover:from-[#ff0080]/90 hover:to-[#7928ca]/90 text-white transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,0,128,0.4)] rounded-full border-0"
                onClick={() => nftMeterRef.current?.incrementSupply()}
              >
                {t('cta.button')}
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
              <div className="flex flex-col items-center -mt-4 mb-2">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{t('hero.current_price')}</span>
                <div className="text-sm text-white/80 font-mono tracking-wider drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                  ETH: #001 / 0.01eth
                </div>
              </div>
              <div className="flex flex-col gap-4 w-full max-w-md">
                <a 
                  href="https://t.me/spicynftclub" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 text-white transition-all group bg-black/40 px-6 py-4 rounded-full hover:bg-black/60 border border-[#0088cc] shadow-[0_0_15px_rgba(0,136,204,0.3)] hover:shadow-[0_0_25px_rgba(0,136,204,0.5)] w-full"
                >
                  <div className="w-6 h-6 rounded-full bg-[#0088cc] flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_10px_#0088cc]">
                    <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </div>
                  <span className="text-base font-bold tracking-wide">Join Official Telegram</span>
                </a>

                <a 
                  href="https://x.com/spicynftclub?s=21&t=L0-eN0Ni_qYCds8Mlp3xRA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 text-white transition-all group bg-black/40 px-6 py-4 rounded-full hover:bg-black/60 border border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] w-full"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span className="text-base font-bold tracking-wide">Follow on X</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black/50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <img src="/logo.webp" alt="SPICY NFT CLUB" className="h-10 w-auto" loading="lazy" />
              <span className="text-sm text-muted-foreground">© 2026 SPICY NFT CLUB</span>
            </div>
            <div className="flex flex-col items-end gap-4">
              <div className="flex gap-8 text-sm text-muted-foreground">
                <Link href="/terms" className="hover:text-primary transition-colors cursor-pointer">
                  {t('footer.terms')}
                </Link>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="hover:text-primary transition-colors">{t('footer.privacy')}</button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-black/90 border-white/10 text-white">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold mb-4">{t('footer.privacy')}</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        <div className="space-y-6 text-left">
                          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                            <h3 className="text-lg font-semibold text-primary mb-2 flex items-center gap-2">
                              <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                              {t('footer.cookie_policy.title')}
                            </h3>
                            <p className="text-sm leading-relaxed text-gray-300">
                              {t('footer.cookie_policy.content')}
                            </p>
                          </div>
                          {/* Placeholder for full privacy policy content */}
                          <div className="space-y-4 text-sm text-gray-400">
                            <p>Last updated: December 2025</p>
                            <p>This Privacy Policy describes how SPICY NFT CLUB collects, uses, and discloses your information...</p>
                          </div>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <Link href="/legal-notice" className="hover:text-primary transition-colors cursor-pointer">
                  {t('footer.law')}
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 text-left text-xs text-muted-foreground/50 max-w-3xl mx-auto space-y-2">
            <p>{t('footer.disclaimer')}</p>
            <div className="pt-4 border-t border-white/5 space-y-1 text-[10px] leading-relaxed text-muted-foreground/50">
              <p>{t('footer.investment_warning')}</p>
              <p>{t('footer.price_fluctuation')}</p>
              <p>{t('footer.service_change')}</p>
              <p>{t('footer.secondary_market')}</p>
              <p className="mt-2 pt-2 border-t border-white/5">{t('footer.liability_disclaimer')}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
