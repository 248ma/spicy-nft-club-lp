import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { ethers } from 'ethers';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Generate unique affiliate code
function generateAffiliateCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'AFF-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Verify Ethereum signature
function verifyEthereumSignature(
  message: string,
  signature: string,
  walletAddress: string
): boolean {
  try {
    const recoveredAddress = ethers.verifyMessage(message, signature);
    return recoveredAddress.toLowerCase() === walletAddress.toLowerCase();
  } catch (error) {
    console.error('Signature verification failed:', error);
    return false;
  }
}

// Verify Solana signature (placeholder - requires @solana/web3.js)
function verifySolanaSignature(
  message: string,
  signature: string,
  walletAddress: string
): boolean {
  // TODO: Implement Solana signature verification
  // For now, return true for development
  console.warn('Solana signature verification not yet implemented');
  return true;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { walletAddress, blockchain, signature, message, commissionRate } = req.body;

    // Validate input
    if (!walletAddress || !blockchain || !signature || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verify signature
    let isValid = false;
    if (blockchain === 'ethereum') {
      isValid = verifyEthereumSignature(message, signature, walletAddress);
    } else if (blockchain === 'solana') {
      isValid = verifySolanaSignature(message, signature, walletAddress);
    } else {
      return res.status(400).json({ error: 'Invalid blockchain' });
    }

    if (!isValid) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Check if wallet already registered
    const { data: existing } = await supabase
      .from('affiliates')
      .select('*')
      .eq('wallet_address', walletAddress)
      .single();

    if (existing) {
      return res.status(409).json({ 
        error: 'Wallet already registered',
        affiliateCode: existing.affiliate_code
      });
    }

    // Generate unique affiliate code
    let affiliateCode = generateAffiliateCode();
    let attempts = 0;
    while (attempts < 10) {
      const { data: codeExists } = await supabase
        .from('affiliates')
        .select('affiliate_code')
        .eq('affiliate_code', affiliateCode)
        .single();
      
      if (!codeExists) break;
      affiliateCode = generateAffiliateCode();
      attempts++;
    }

    // Determine commission rate and status
    const rate = commissionRate === 10 ? 10.00 : 5.00;
    const status = rate === 5.00 ? 'approved' : 'pending';

    // Insert new affiliate
    const { data, error } = await supabase
      .from('affiliates')
      .insert({
        wallet_address: walletAddress,
        blockchain,
        affiliate_code: affiliateCode,
        commission_rate: rate,
        status
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to register affiliate' });
    }

    return res.status(201).json({
      success: true,
      affiliateCode: data.affiliate_code,
      commissionRate: data.commission_rate,
      status: data.status
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
