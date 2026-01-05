import React from 'react';
import { motion } from 'framer-motion';

export const BondingCurveVisual = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const arrowVariants = {
    hidden: { opacity: 0, scaleX: 0 },
    visible: { opacity: 1, scaleX: 1, transition: { duration: 0.5, delay: 0.5 } }
  };

  return (
    <div className="w-full bg-[#0a0a0a] rounded-2xl border border-white/10 p-6 md:p-10 overflow-hidden relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <h3 className="text-2xl font-bold text-white">Bonding Curve Model</h3>
        <div className="px-4 py-1.5 rounded-full bg-[#ff0080]/20 border border-[#ff0080]/30 text-[#ff0080] text-sm font-medium">
          Early Access Advantage
        </div>
      </div>

      {/* Flow Diagram (Top) - Scrollable on mobile */}
      <div className="w-full overflow-x-auto pb-6 mb-12 scrollbar-hide">
        <div className="flex items-center min-w-[800px] justify-between relative z-10 px-4">
          {/* Start Node */}
          <motion.div 
            className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#ff0080] flex items-center justify-center shadow-[0_0_20px_rgba(255,0,128,0.5)] z-10 shrink-0"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <span className="text-white font-bold text-sm md:text-base">Start</span>
          </motion.div>

          {/* Arrow 1 */}
          <motion.div 
            className="h-0.5 w-12 md:flex-1 bg-gradient-to-r from-[#ff0080] to-gray-600 mx-2"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />

          {/* Sale #1 */}
          <motion.div 
            className="px-4 py-2 md:px-6 md:py-3 bg-[#1a1a1a] border border-[#ff0080] rounded-lg shadow-[0_0_15px_rgba(255,0,128,0.2)] z-10 shrink-0"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-white font-bold text-sm md:text-base">Sale #1</span>
          </motion.div>

          {/* Arrow 2 (Price Up) */}
          <div className="w-24 md:flex-1 flex items-center mx-2 relative shrink-0">
            <motion.div 
              className="h-0.5 w-full bg-gray-700"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            />
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 px-2 py-1 rounded text-[10px] md:text-xs text-gray-300 whitespace-nowrap border border-gray-700"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              Price +0.01
            </motion.div>
          </div>

          {/* Sale #2 */}
          <motion.div 
            className="px-4 py-2 md:px-6 md:py-3 bg-[#1a1a1a] border border-[#ff0080] rounded-lg shadow-[0_0_15px_rgba(255,0,128,0.2)] z-10 shrink-0"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.0 }}
          >
            <span className="text-white font-bold text-sm md:text-base">Sale #2</span>
          </motion.div>

          {/* Arrow 3 (Price Up) */}
          <div className="w-24 md:flex-1 flex items-center mx-2 relative shrink-0">
            <motion.div 
              className="h-0.5 w-full bg-gray-700"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.2 }}
            />
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 px-2 py-1 rounded text-[10px] md:text-xs text-gray-300 whitespace-nowrap border border-gray-700"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4 }}
            >
              Price +0.01
            </motion.div>
          </div>

          {/* Sale #3 */}
          <motion.div 
            className="px-4 py-2 md:px-6 md:py-3 bg-[#1a1a1a] border border-[#ff0080] rounded-lg shadow-[0_0_15px_rgba(255,0,128,0.2)] z-10 shrink-0"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.6 }}
          >
            <span className="text-white font-bold text-sm md:text-base">Sale #3</span>
          </motion.div>

          {/* Arrow 4 */}
          <motion.div 
            className="h-0.5 w-8 md:flex-1 bg-gray-700 mx-2"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.8 }}
          />

          {/* Dots */}
          <motion.div 
            className="text-gray-500 font-bold mx-2 shrink-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2.0 }}
          >
            ...
          </motion.div>

          {/* Arrow 5 */}
          <motion.div 
            className="h-0.5 w-8 md:flex-1 bg-gradient-to-r from-gray-700 to-[#7928ca] mx-2"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 2.2 }}
          />

          {/* Sale #200 */}
          <motion.div 
            className="px-4 py-2 md:px-6 md:py-3 bg-[#7928ca] rounded-lg shadow-[0_0_20px_rgba(121,40,202,0.5)] z-10 border border-white/20 shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2.4, type: "spring" }}
          >
            <span className="text-white font-bold text-sm md:text-base">Sale #200</span>
          </motion.div>
        </div>
      </div>

      {/* Visual Representation (Bottom) - Flex on desktop, Stack on mobile */}
      <div className="flex flex-col md:flex-row justify-between items-center relative gap-8 md:gap-4">
        {/* Step 1 */}
        <motion.div 
          className="flex flex-col items-center text-center group w-full md:w-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="w-24 h-32 rounded-xl border-2 border-white/20 bg-white/5 flex flex-col items-center justify-center mb-4 relative overflow-hidden group-hover:border-[#ff0080]/50 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#ff0080]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="text-2xl font-bold text-white/80">NFT</span>
            <div className="w-12 h-1 bg-white/20 mt-2 rounded-full" />
            <div className="w-8 h-1 bg-white/20 mt-1 rounded-full" />
            
            {/* Glow effect */}
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] rounded-xl" />
          </div>
          <div className="text-[#ff0080] font-bold text-lg mb-1">0.01 ETH</div>
          <div className="text-gray-400 text-sm">0.2 SOL</div>
        </motion.div>

        {/* Arrow & Label - Vertical on mobile, Horizontal on desktop */}
        <div className="flex md:flex-col items-center justify-center md:-mt-8 w-full md:w-auto relative">
          <span className="text-xs text-gray-400 mb-2 hidden md:block">1個販売</span>
          <span className="text-xs text-gray-400 mr-4 md:hidden">1個販売</span>
          
          {/* Desktop Arrow */}
          <div className="hidden md:block w-32 h-px bg-gradient-to-r from-[#ff0080] to-[#ff0080]/30 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-[#ff0080]/50 rotate-45" />
          </div>

          {/* Mobile Arrow */}
          <div className="md:hidden h-12 w-px bg-gradient-to-b from-[#ff0080] to-[#ff0080]/30 relative">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 border-b border-r border-[#ff0080]/50 rotate-45" />
          </div>
        </div>

        {/* Step 2 */}
        <motion.div 
          className="flex flex-col items-center text-center group w-full md:w-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0 }}
        >
          <div className="w-24 h-32 rounded-xl border-2 border-white/20 bg-white/5 flex flex-col items-center justify-center mb-4 relative overflow-hidden group-hover:border-[#ff0080]/50 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#ff0080]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="text-2xl font-bold text-white/90">NFT</span>
            <div className="w-12 h-1 bg-white/30 mt-2 rounded-full" />
            <div className="w-8 h-1 bg-white/30 mt-1 rounded-full" />
             {/* Glow effect */}
             <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(255,0,128,0.1)] rounded-xl" />
          </div>
          <div className="text-[#ff0080] font-bold text-lg mb-1">0.02 ETH</div>
          <div className="text-gray-400 text-sm">0.4 SOL</div>
        </motion.div>

        {/* Arrow & Label - Vertical on mobile, Horizontal on desktop */}
        <div className="flex md:flex-col items-center justify-center md:-mt-8 w-full md:w-auto relative">
          <span className="text-xs text-gray-400 mb-2 hidden md:block">1個販売</span>
          <span className="text-xs text-gray-400 mr-4 md:hidden">1個販売</span>
          
          {/* Desktop Arrow */}
          <div className="hidden md:block w-32 h-px bg-gradient-to-r from-[#ff0080]/50 to-[#7928ca]/50 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-[#7928ca]/50 rotate-45" />
          </div>

          {/* Mobile Arrow */}
          <div className="md:hidden h-12 w-px bg-gradient-to-b from-[#ff0080]/50 to-[#7928ca]/50 relative">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 border-b border-r border-[#7928ca]/50 rotate-45" />
          </div>
        </div>

        {/* Step 3 */}
        <motion.div 
          className="flex flex-col items-center text-center group w-full md:w-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.6 }}
        >
          <div className="w-24 h-32 rounded-xl border-2 border-white/20 bg-white/5 flex flex-col items-center justify-center mb-4 relative overflow-hidden group-hover:border-[#7928ca]/50 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#7928ca]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="text-2xl font-bold text-white">NFT</span>
            <div className="w-12 h-1 bg-white/40 mt-2 rounded-full" />
            <div className="w-8 h-1 bg-white/40 mt-1 rounded-full" />
             {/* Glow effect */}
             <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(121,40,202,0.2)] rounded-xl" />
          </div>
          <div className="text-[#7928ca] font-bold text-lg mb-1">0.03 ETH</div>
          <div className="text-gray-400 text-sm">0.6 SOL</div>
        </motion.div>
      </div>

      {/* Footer Note */}
      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm">
          * 早期購入者が最大限のメリットを得る設計
        </p>
      </div>

      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#ff0080] rounded-full blur-[120px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#7928ca] rounded-full blur-[120px] opacity-10 pointer-events-none" />
    </div>
  );
};
