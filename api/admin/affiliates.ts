import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Simple admin authentication (replace with proper auth in production)
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'change-this-secret';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Verify admin authentication
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // GET: List all affiliates
    if (req.method === 'GET') {
      const { data: affiliates, error } = await supabase
        .from('affiliates')
        .select(`
          *,
          purchases:purchases(count)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching affiliates:', error);
        return res.status(500).json({ error: 'Failed to fetch affiliates' });
      }

      // Calculate total commission for each affiliate
      const affiliatesWithStats = await Promise.all(
        affiliates.map(async (affiliate) => {
          const { data: purchases } = await supabase
            .from('purchases')
            .select('commission_amount')
            .eq('affiliate_code', affiliate.affiliate_code);

          const totalCommission = purchases?.reduce(
            (sum, p) => sum + parseFloat(p.commission_amount),
            0
          ) || 0;

          return {
            ...affiliate,
            totalCommission,
            purchaseCount: purchases?.length || 0
          };
        })
      );

      return res.status(200).json({ affiliates: affiliatesWithStats });
    }

    // PUT: Update affiliate status or commission rate
    if (req.method === 'PUT') {
      const { affiliateId, status, commissionRate } = req.body;

      if (!affiliateId) {
        return res.status(400).json({ error: 'Missing affiliate ID' });
      }

      const updates: any = {};
      if (status) updates.status = status;
      if (commissionRate) updates.commission_rate = commissionRate;
      updates.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('affiliates')
        .update(updates)
        .eq('id', affiliateId)
        .select()
        .single();

      if (error) {
        console.error('Error updating affiliate:', error);
        return res.status(500).json({ error: 'Failed to update affiliate' });
      }

      return res.status(200).json({
        success: true,
        affiliate: data
      });
    }

    // DELETE: Remove affiliate
    if (req.method === 'DELETE') {
      const { affiliateId } = req.body;

      if (!affiliateId) {
        return res.status(400).json({ error: 'Missing affiliate ID' });
      }

      const { error } = await supabase
        .from('affiliates')
        .delete()
        .eq('id', affiliateId);

      if (error) {
        console.error('Error deleting affiliate:', error);
        return res.status(500).json({ error: 'Failed to delete affiliate' });
      }

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Admin API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
