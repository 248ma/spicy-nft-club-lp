import { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { ethers } from 'ethers';

// 設定値
const CONTRACT_ADDRESS = "0xYourContractAddressHere..."; // 後で実際の値に変更
const MAX_SUPPLY = 400;
const RPC_URL = "https://eth.llamarpc.com";

// ABI
const ABI = [
  "function totalSupply() view returns (uint256)"
];

export interface NftMeterHandle {
  incrementSupply: () => void;
}

export const NftMeter = forwardRef<NftMeterHandle>((_, ref) => {
  const [supply, setSupply] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // 外部からsupplyを増加させる関数を公開
  useImperativeHandle(ref, () => ({
    incrementSupply: () => {
      setSupply(prev => Math.min(prev + 1, MAX_SUPPLY));
    }
  }));

  useEffect(() => {
    const fetchSupply = async () => {
      try {
        // プロバイダーを作成（ウォレット接続不要で読み取り専用）
        const provider = new ethers.JsonRpcProvider(RPC_URL);
        
        // コントラクトのインスタンス化
        // 注: 実際のアドレスが設定されるまではダミーデータを使用
        if (CONTRACT_ADDRESS === "0xYourContractAddressHere...") {
          // デモ用：ランダムな数値を設定（実際の実装時は削除）
          setTimeout(() => {
            setSupply(0); // デモ値
            setLoading(false);
          }, 1000);
          return;
        }

        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

        // 現在の販売数を取得
        const supplyBN = await contract.totalSupply();
        setSupply(Number(supplyBN));
        setLoading(false);
      } catch (err) {
        console.error("データの取得に失敗しました:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchSupply();
  }, []);

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
          <span className="text-gray-400 animate-pulse font-light tracking-widest text-sm">LOADING DATA...</span>
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
              <div className="w-1.5 h-1.5 rounded-full bg-[#00f2ea] shadow-[0_0_5px_#00f2ea] animate-pulse" />
              <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-medium">Total Minted</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
