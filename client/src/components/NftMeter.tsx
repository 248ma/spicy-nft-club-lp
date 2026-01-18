import { useImperativeHandle, forwardRef } from 'react';
import { useNFTData } from '../hooks/useNFTData';

// 設定値
const MAX_SUPPLY = 400;

export interface NftMeterHandle {
  incrementSupply: () => void;
}

export const NftMeter = forwardRef<NftMeterHandle>((_, ref) => {
  const { eth } = useNFTData();
  
  const supply = eth.totalMinted;
  const loading = eth.isLoading;
  const error = eth.error !== null;

  // 外部からsupplyを増加させる関数を公開（現在は使用されていないが、互換性のために残す）
  useImperativeHandle(ref, () => ({
    incrementSupply: () => {
      // useNFTDataフックが自動的に更新するため、この関数は何もしない
      console.log('incrementSupply called, but data is managed by useNFTData hook');
    }
  }));

  // パーセンテージ計算
  let percentage = (supply / MAX_SUPPLY) * 100;
  if (percentage > 100) percentage = 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-12 px-4">
      {/* 高級感のあるアウターフレーム */}
      <div className="relative p-[2px] rounded-full bg-gradient-to-b from-white/20 to-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-sm">
        <div className="relative h-10 bg-black/80 rounded-full overflow-hidden shadow-inner">
          
          {/* 背景のグリッドパターン */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_100%]" />
          
          {/* プログレスバー本体 */}
          <div 
            className="h-full relative transition-all duration-1000 ease-out flex items-center justify-end pr-4"
            style={{ 
              width: `${loading ? 0 : percentage}%`,
              background: 'linear-gradient(90deg, rgba(255,0,128,0.8) 0%, rgba(121,40,202,1) 100%)',
              boxShadow: '0 0 20px rgba(255,0,128,0.5), inset 0 1px 0 rgba(255,255,255,0.3)'
            }}
          >
            {/* バーの先端の光 */}
            <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            
            {/* パーセンテージ表示（バー内部） */}
            <span className="text-white text-sm font-bold drop-shadow-md whitespace-nowrap tracking-wider">
              {loading ? '' : `${Math.floor(percentage)}%`}
            </span>
          </div>
        </div>
      </div>
      
      {/* ステータステキスト */}
      <div className="mt-6 text-center">
        {loading ? (
          <span className="text-gray-400 font-light tracking-widest text-sm">LOADING DATA...</span>
        ) : error ? (
          <span className="text-red-400 font-light tracking-widest text-sm">DATA UNAVAILABLE</span>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff0080] to-[#7928ca] font-mono tracking-tighter drop-shadow-[0_0_10px_rgba(255,0,128,0.3)]">
                {supply}
              </span>
              <span className="text-gray-600 text-xl font-light">/</span>
              <span className="text-gray-400 text-xl font-mono tracking-wider">{MAX_SUPPLY}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00f2ea] shadow-[0_0_5px_#00f2ea]" />
              <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-medium">Total Minted</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
