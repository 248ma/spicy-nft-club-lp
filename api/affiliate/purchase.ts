import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      affiliateCode,
      buyerWallet,
      tokenId,
      purchasePrice,
      currency,
      txHash
    } = req.body;

    // Validate input
    if (!affiliateCode || !buyerWallet || !purchasePrice || !currency) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get affiliate info to determine commission rate
    const { data: affiliate, error: affiliateError } = await supabase
      .from('affiliates')
      .select('*')
      .eq('affiliate_code', affiliateCode)
      .single();

    if (affiliateError || !affiliate) {
      return res.status(404).json({ error: 'Affiliate not found' });
    }

    // Check if affiliate is approved
    if (affiliate.status !== 'approved') {
      return res.status(403).json({ error: 'Affiliate not approved' });
    }

    // Calculate commission
    const commissionRate = parseFloat(affiliate.commission_rate);
    const commissionAmount = (parseFloat(purchasePrice) * commissionRate) / 100;

    // Insert purchase record
    const { data, error } = await supabase
      .from('purchases')
      .insert({
        affiliate_code: affiliateCode,
        buyer_wallet: buyerWallet,
        token_id: tokenId,
        purchase_price: purchasePrice,
        currency,
        commission_amount: commissionAmount,
        commission_rate: commissionRate,
        tx_hash: txHash
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to record purchase' });
    }

    return res.status(201).json({
      success: true,
      purchaseId: data.id,
      commissionAmount,
      commissionRate
    });

  } catch (error) {
    console.error('Purchase recording error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
