      {/* Tokenomics Section */}
      <section id="tokenomics" className="py-12 md:py-20 relative bg-black overflow-hidden">
        <div className="container relative z-10">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <span className="text-gradient-primary tracking-[0.3em] uppercase text-sm font-bold mb-4 block">{t('tokenomics.subtitle')}</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">{t('tokenomics.title')}</h2>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 mb-24">
            {/* NFT Card & Price Display (Moved from Hero/Concept) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, type: "spring" }}
              className="relative flex justify-center w-full md:w-auto"
            >
              <div className="relative w-full max-w-sm aspect-[3/4] perspective-1000">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#ff0080] via-[#7928ca] to-[#4a00e0] rounded-3xl blur-[100px] opacity-40 animate-pulse" />
                <div className="relative z-10 w-full h-full glass-card rounded-3xl border border-white/20 p-4 transform transition-transform hover:rotate-y-12 hover:rotate-x-12 duration-500 preserve-3d">
                  <img 
                    src="/nft-card.png" 
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
                <div className="flex flex-col items-center mt-8">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">{t('hero.current_price')}</span>
                  <p className="text-center text-xl text-white font-mono tracking-wider drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] bg-white/5 px-6 py-2 rounded-full border border-white/10">
                    ETH: #001 / 0.01eth
                  </p>
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
            </div>
          </div>

          {/* Bonding Curve Explanation */}
          <motion.div 
            className="max-w-4xl mx-auto text-center glass-card p-12 rounded-3xl border border-white/10 relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff0080] to-[#7928ca]" />
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#7928ca] rounded-full blur-[100px] opacity-20" />
            
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">{t('bonding_curve.title')}</h3>
            <p className="text-gray-300 leading-relaxed mb-8">
              {t('bonding_curve.description')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {(t('bonding_curve.features', { returnObjects: true }) as any[]).map((feature, i) => (
                <div key={i} className="bg-black/40 p-6 rounded-xl border border-white/5">
                  <div className={`${i === 0 ? 'text-[#ff0080]' : i === 1 ? 'text-[#7928ca]' : 'text-[#4a00e0]'} font-bold mb-2`}>
                    {feature.title}
                  </div>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
