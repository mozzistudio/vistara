import { NextRequest, NextResponse } from 'next/server'
import { getDashboardKpis, getSalesData } from '@/lib/supabase/queries/sales'
import { getSellerPerformance } from '@/lib/supabase/queries/sellers'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const from = searchParams.get('from') ?? '2025-01-01'
    const to = searchParams.get('to') ?? '2025-06-30'

    const [kpis, dailySales, topProducts, topPharmacies, topRegions, sellerPerf] = await Promise.all([
      getDashboardKpis(from, to),
      getSalesData({ date_from: from, date_to: to, group_by: 'day', limit: 180 }),
      getSalesData({ date_from: from, date_to: to, group_by: 'product', order_by: 'revenue_desc', limit: 10 }),
      getSalesData({ date_from: from, date_to: to, group_by: 'pharmacy', order_by: 'revenue_desc', limit: 10 }),
      getSalesData({ date_from: from, date_to: to, group_by: 'region', order_by: 'revenue_desc', limit: 10 }),
      getSellerPerformance(undefined, from, to),
    ])

    return NextResponse.json({
      data: { kpis, dailySales, topProducts, topPharmacies, topRegions, sellerPerf }
    })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
