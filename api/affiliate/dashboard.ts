import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { walletAddress } = req.query;

    if (!walletAddress || typeof walletAddress !== 'string') {
      return res.status(400).json({ error: 'Missing wallet address' });
    }

    // Get affiliate info
    const { data: affiliate, error: affiliateError } = await supabase
      .from('affiliates')
      .select('*')
      .eq('wallet_address', walletAddress)
      .single();

    if (affiliateError || !affiliate) {
      return res.status(404).json({ error: 'Affiliate not found' });
    }

    // Get purchase statistics
    const { data: purchases, error: purchasesError } = await supabase
      .from('purchases')
      .select('*')
      .eq('affiliate_code', affiliate.affiliate_code)
      .order('created_at', { ascending: false });

    if (purchasesError) {
      console.error('Error fetching purchases:', purchasesError);
      return res.status(500).json({ error: 'Failed to fetch purchases' });
    }

    // Calculate statistics
    const totalPurchases = purchases?.length || 0;
    const totalCommission = purchases?.reduce((sum, p) => sum + parseFloat(p.commission_amount), 0) || 0;
    
    // Get currency (assume ETH if no purchases yet)
    const currency = purchases && purchases.length > 0 ? purchases[0].currency : 'ETH';

    // Get recent purchases (last 10)
    const recentPurchases = purchases?.slice(0, 10).map(p => ({
      id: p.id,
      buyerWallet: p.buyer_wallet,
      tokenId: p.token_id,
      purchasePrice: parseFloat(p.purchase_price),
      commissionAmount: parseFloat(p.commission_amount),
      currency: p.currency,
      txHash: p.tx_hash,
      createdAt: p.created_at
    })) || [];

    return res.status(200).json({
      affiliateCode: affiliate.affiliate_code,
      commissionRate: parseFloat(affiliate.commission_rate),
      status: affiliate.status,
      blockchain: affiliate.blockchain,
      stats: {
        totalPurchases,
        totalCommission,
        currency
      },
      recentPurchases
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
