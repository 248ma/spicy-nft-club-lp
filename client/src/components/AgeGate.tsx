import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocation } from "wouter";

export function AgeGate() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  // Generate random particles
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      color: ['#ff0080', '#7928ca', '#0088cc'][Math.floor(Math.random() * 3)]
    }));
  }, []);

  useEffect(() => {
    // Check local storage for age verification status
    // Changed key to force re-verification for all users
    const isVerified = localStorage.getItem('age_verified_v2');
    if (!isVerified) {
      setIsVisible(true);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleEnter = () => {
    localStorage.setItem('age_verified_v2', 'true');
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }, 500);
  };

  const [, setLocation] = useLocation();

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      setLocation('/exit');
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }, 500);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 backdrop-blur-xl overflow-hidden"
        >
          {/* Dynamic Background Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full opacity-20 blur-sm"
                style={{
                  backgroundColor: particle.color,
                  width: particle.size,
                  height: particle.size,
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  x: [0, Math.random() * 50 - 25, 0],
                  opacity: [0.1, 0.4, 0.1],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: particle.delay,
                }}
              />
            ))}
            {/* Ambient Light Orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff0080]/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7928ca]/10 rounded-full blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.5, 0.3],
                x: [0, -50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative w-full max-w-md mx-4 p-[1px] rounded-2xl bg-gradient-to-br from-[#ff0080]/30 via-[#7928ca]/30 to-[#0088cc]/30 shadow-2xl"
          >
            <div className="bg-white/90 rounded-xl p-8 text-center border border-white/50 shadow-lg backdrop-blur-sm relative">
              <div className="absolute top-4 right-4">
                <div className="p-[1px] rounded-full bg-gradient-to-r from-[#ff0080] to-[#7928ca]">
                  <LanguageSwitcher className="!bg-white !text-gray-800 !border-0 hover:!bg-gray-50 shadow-sm rounded-full" />
                </div>
              </div>
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center mb-6"
              >
                <div className="w-60 h-32 flex items-center justify-center">
                  <img src="/age-gate-logo.png" alt="Spicy NFT Club" className="w-full h-full object-contain drop-shadow-md" />
                </div>
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-2xl font-bold text-gray-800 mb-4 tracking-widest"
              >
                {t('age_gate.title')}
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-600 mb-8 leading-relaxed font-medium"
                dangerouslySetInnerHTML={{ __html: t('age_gate.description') }}
              />

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col gap-4"
              >
                <Button
                  onClick={handleEnter}
                  className="w-full py-6 text-lg font-bold bg-gradient-to-r from-[#ff0080] to-[#7928ca] hover:from-[#ff0080]/90 hover:to-[#7928ca]/90 text-white shadow-lg shadow-[#ff0080]/20 border-0 rounded-lg transition-all hover:scale-105"
                >
                  {t('age_gate.enter')}
                </Button>
                
                <Button
                  onClick={handleExit}
                  variant="outline"
                  className="w-full py-6 text-lg font-bold border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 rounded-lg transition-all"
                >
                  {t('age_gate.exit')}
                </Button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 text-xs text-gray-500"
              >
                {t('age_gate.warning')}
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
