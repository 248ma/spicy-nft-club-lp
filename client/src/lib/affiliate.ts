/**
 * アフィリエイトトラッキングシステム
 * Cookieレス設計：localStorageを使用
 */

const AFFILIATE_KEY = 'spicy_affiliate_ref';
const AFFILIATE_TIMESTAMP_KEY = 'spicy_affiliate_timestamp';
const TRACKING_DAYS = 30;

export interface AffiliateData {
  ref: string;
  timestamp: number;
}

/**
 * URLパラメータからアフィリエイトコードを取得してlocalStorageに保存
 */
export function trackAffiliate(): void {
  if (typeof window === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const refCode = urlParams.get('ref');

  if (refCode) {
    const now = Date.now();
    localStorage.setItem(AFFILIATE_KEY, refCode);
    localStorage.setItem(AFFILIATE_TIMESTAMP_KEY, now.toString());
    console.log(`[Affiliate] Tracked: ${refCode}`);
  }
}

/**
 * 保存されたアフィリエイトコードを取得（有効期限チェック付き）
 */
export function getAffiliateRef(): string | null {
  if (typeof window === 'undefined') return null;

  const ref = localStorage.getItem(AFFILIATE_KEY);
  const timestamp = localStorage.getItem(AFFILIATE_TIMESTAMP_KEY);

  if (!ref || !timestamp) {
    return null;
  }

  const now = Date.now();
  const savedTime = parseInt(timestamp, 10);
  const daysPassed = (now - savedTime) / (1000 * 60 * 60 * 24);

  // 30日以内なら有効
  if (daysPassed <= TRACKING_DAYS) {
    return ref;
  } else {
    // 期限切れの場合は削除
    clearAffiliateRef();
    return null;
  }
}

/**
 * アフィリエイトコードをクリア
 */
export function clearAffiliateRef(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(AFFILIATE_KEY);
  localStorage.removeItem(AFFILIATE_TIMESTAMP_KEY);
}

/**
 * アフィリエイト情報を含むミントページURLを生成
 */
export function getMintUrlWithAffiliate(baseUrl: string): string {
  const ref = getAffiliateRef();
  if (ref) {
    const url = new URL(baseUrl);
    url.searchParams.set('ref', ref);
    return url.toString();
  }
  return baseUrl;
}

/**
 * アフィリエイト情報を取得（デバッグ用）
 */
export function getAffiliateData(): AffiliateData | null {
  if (typeof window === 'undefined') return null;

  const ref = localStorage.getItem(AFFILIATE_KEY);
  const timestamp = localStorage.getItem(AFFILIATE_TIMESTAMP_KEY);

  if (!ref || !timestamp) {
    return null;
  }

  return {
    ref,
    timestamp: parseInt(timestamp, 10),
  };
}
