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
