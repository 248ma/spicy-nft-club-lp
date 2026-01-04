import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Coins, TrendingUp, ArrowRight } from 'lucide-react';

export function PriceSimulator() {
  const { t } = useTranslation();
  
  // State for simulation
  const [currentSupply, setCurrentSupply] = useState([100]); // Default starting supply
  const [purchaseAmount, setPurchaseAmount] = useState([5]); // Default purchase amount
  
  const [totalCost, setTotalCost] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);
  const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(0);
  const [marketCap, setMarketCap] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);

  // Constants
  const BASE_PRICE_INCREMENT = 0.01; // ETH increase per token
  const MAX_SUPPLY = 500;
  
  useEffect(() => {
    const supply = currentSupply[0];
    const amount = purchaseAmount[0];
    
    // Calculate prices based on linear bonding curve: Price = 0.01 * n
    // Sum of arithmetic progression: n/2 * (first + last)
    
    const firstTokenIndex = supply + 1;
    const lastTokenIndex = supply + amount;
    
    const priceOfFirst = firstTokenIndex * BASE_PRICE_INCREMENT;
    const priceOfLast = lastTokenIndex * BASE_PRICE_INCREMENT;
    
    const total = (amount / 2) * (priceOfFirst + priceOfLast);
    const avg = total / amount;
    
    setStartPrice(priceOfFirst);
    setEndPrice(priceOfLast);
    setTotalCost(total);
    setAveragePrice(avg);
    
    // Calculate market stats
    const currentP = supply * BASE_PRICE_INCREMENT;
    setCurrentPrice(currentP);
    
    // Market Cap = Sum of price for all minted tokens (approximate for linear curve: n * (n+1) / 2 * increment)
    // Or simpler: Current Price * Supply (Traditional Market Cap definition)
    // Let's use Current Price * Supply for standard market cap understanding
    setMarketCap(currentP * supply);
    
  }, [currentSupply, purchaseAmount]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-4xl mx-auto mt-12"
    >
      <Card className="bg-black/40 border-white/10 backdrop-blur-md overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff0080] to-[#7928ca]" />
        
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-3 text-2xl text-white">
            <Calculator className="w-6 h-6 text-[#ff0080]" />
            {t('simulator.title', 'Price Simulator')}
          </CardTitle>
          <p className="text-sm text-gray-400">
            {t('simulator.description', 'Simulate how the Bonding Curve affects the price based on supply and purchase amount.')}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8 pt-6">
          {/* Market Status Dashboard */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-black/50 p-4 rounded-xl border border-white/10 relative overflow-hidden group hover:border-[#ff0080]/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-[#ff0080]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider relative z-10">{t('simulator.market_price', 'Current Price')}</p>
              <p className="text-2xl font-bold text-white font-mono relative z-10">
                {currentPrice.toFixed(2)} <span className="text-sm font-normal text-gray-500">ETH</span>
              </p>
            </div>
            
            <div className="bg-black/50 p-4 rounded-xl border border-white/10 relative overflow-hidden group hover:border-[#7928ca]/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7928ca]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider relative z-10">{t('simulator.supply_progress', 'Supply Progress')}</p>
              <div className="relative z-10">
                <p className="text-2xl font-bold text-white font-mono">
                  {currentSupply[0]} <span className="text-sm font-normal text-gray-500">/ {MAX_SUPPLY}</span>
                </p>
                <div className="w-full h-1 bg-gray-800 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#ff0080] to-[#7928ca]" 
                    style={{ width: `${(currentSupply[0] / MAX_SUPPLY) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-black/50 p-4 rounded-xl border border-white/10 relative overflow-hidden group hover:border-blue-500/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider relative z-10">{t('simulator.market_cap', 'Market Cap')}</p>
              <p className="text-2xl font-bold text-white font-mono relative z-10">
                {marketCap.toFixed(2)} <span className="text-sm font-normal text-gray-500">ETH</span>
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="space-y-8">
            {/* Current Supply Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-300">
                  {t('simulator.current_supply', 'Current Supply (Simulated)')}
                </label>
                <span className="text-primary font-mono font-bold bg-primary/10 px-3 py-1 rounded">
                  #{currentSupply[0]}
                </span>
              </div>
              <Slider
                value={currentSupply}
                onValueChange={setCurrentSupply}
                max={1000}
                min={0}
                step={10}
                className="py-2"
              />
              <p className="text-xs text-gray-500">
                {t('simulator.supply_hint', 'Higher supply means higher base price.')}
              </p>
            </div>

            {/* Purchase Amount Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-300">
                  {t('simulator.purchase_amount', 'Purchase Amount')}
                </label>
                <span className="text-primary font-mono font-bold bg-primary/10 px-3 py-1 rounded">
                  {purchaseAmount[0]} NFT
                </span>
              </div>
              <Slider
                value={purchaseAmount}
                onValueChange={setPurchaseAmount}
                max={50}
                min={1}
                step={1}
                className="py-2"
              />
            </div>
          </div>

            {/* Results */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <div>
                <p className="text-sm text-gray-400 mb-1">{t('simulator.price_range', 'Price Range (Start → End)')}</p>
                <div className="flex items-center gap-2 text-lg font-mono text-white">
                  <span>{startPrice.toFixed(2)} ETH</span>
                  <ArrowRight className="w-4 h-4 text-gray-500" />
                  <span className="text-[#ff0080]">{endPrice.toFixed(2)} ETH</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                  <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {t('simulator.avg_price', 'Avg Price')}
                  </p>
                  <p className="text-xl font-bold text-white font-mono">
                    {averagePrice.toFixed(3)} <span className="text-xs font-normal text-gray-500">ETH</span>
                  </p>
                </div>
                <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                  <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                    <Coins className="w-3 h-3" />
                    {t('simulator.total_cost', 'Total Cost')}
                  </p>
                  <p className="text-xl font-bold text-[#ff0080] font-mono">
                    {totalCost.toFixed(3)} <span className="text-xs font-normal text-gray-500">ETH</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-gray-400 leading-relaxed">
                {t('simulator.disclaimer', '* This is a simulation based on the linear bonding curve model (Price = 0.01 * Supply). Actual gas fees are not included.')}
              </p>
            </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
