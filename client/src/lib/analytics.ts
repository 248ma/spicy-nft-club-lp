/**
 * Plausible Analytics - Custom Event Tracking
 * 
 * This utility provides type-safe custom event tracking for Plausible Analytics.
 * All events are privacy-friendly and do not collect personal information.
 */

// Extend Window interface to include plausible
declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: { props?: Record<string, string | number | boolean> }
    ) => void;
  }
}

/**
 * Track a custom event in Plausible Analytics
 * @param eventName - Name of the event to track
 * @param props - Optional properties to attach to the event
 */
export function trackEvent(
  eventName: string,
  props?: Record<string, string | number | boolean>
): void {
  if (typeof window !== 'undefined' && window.plausible) {
    if (props) {
      window.plausible(eventName, { props });
    } else {
      window.plausible(eventName);
    }
  }
}

/**
 * Predefined event tracking functions for common actions
 */
export const analytics = {
  /**
   * Track NFT purchase button click
   */
  trackNFTPurchaseClick: () => {
    trackEvent('NFT Purchase Click');
  },

  /**
   * Track wallet connection
   * @param walletType - Type of wallet connected (e.g., 'MetaMask', 'WalletConnect')
   */
  trackWalletConnected: (walletType?: string) => {
    trackEvent('Wallet Connected', walletType ? { wallet: walletType } : undefined);
  },

  /**
   * Track Telegram join button click
   */
  trackTelegramJoin: () => {
    trackEvent('Telegram Join');
  },

  /**
   * Track whitepaper view
   */
  trackWhitepaperView: () => {
    trackEvent('Whitepaper View');
  },

  /**
   * Track language switch
   * @param language - Language code (e.g., 'en', 'ja', 'zh')
   */
  trackLanguageSwitch: (language: string) => {
    trackEvent('Language Switch', { language });
  },

  /**
   * Track section view (scroll into view)
   * @param section - Section name (e.g., 'concept', 'benefits', 'roadmap')
   */
  trackSectionView: (section: string) => {
    trackEvent('Section View', { section });
  },

  /**
   * Track price simulator usage
   */
  trackPriceSimulatorUsed: () => {
    trackEvent('Price Simulator Used');
  },

  /**
   * Track FAQ expansion
   * @param question - Question identifier
   */
  trackFAQExpanded: (question: string) => {
    trackEvent('FAQ Expanded', { question });
  },

  /**
   * Track X (Twitter) follow button click
   */
  trackXFollow: () => {
    trackEvent('X Follow');
  },

  /**
   * Track external link click
   * @param destination - Destination URL or identifier
   */
  trackExternalLink: (destination: string) => {
    trackEvent('External Link', { destination });
  },

  /**
   * Track NFT mint attempt
   * @param quantity - Number of NFTs to mint
   */
  trackMintAttempt: (quantity: number) => {
    trackEvent('Mint Attempt', { quantity });
  },

  /**
   * Track NFT mint success
   * @param quantity - Number of NFTs minted
   * @param totalPrice - Total price paid (in ETH)
   */
  trackMintSuccess: (quantity: number, totalPrice: string) => {
    trackEvent('Mint Success', { quantity, price: totalPrice });
  },

  /**
   * Track NFT mint failure
   * @param reason - Reason for failure (e.g., 'insufficient_funds', 'user_rejected')
   */
  trackMintFailure: (reason: string) => {
    trackEvent('Mint Failure', { reason });
  },
};

export default analytics;
