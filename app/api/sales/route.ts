import { NextRequest, NextResponse } from 'next/server'
import { getSalesData, getSalesComparison } from '@/lib/supabase/queries/sales'
import type { GroupBy } from '@/lib/supabase/queries/sales'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    if (searchParams.get('compare') === 'true') {
      const data = await getSalesComparison({
        period1_from: searchParams.get('p1_from') ?? '2025-01-01',
        period1_to: searchParams.get('p1_to') ?? '2025-03-31',
        period2_from: searchParams.get('p2_from') ?? '2025-04-01',
        period2_to: searchParams.get('p2_to') ?? '2025-06-30',
      })
      return NextResponse.json({ data })
    }

    const data = await getSalesData({
      product_id: searchParams.get('product_id') ?? undefined,
      pharmacy_id: searchParams.get('pharmacy_id') ?? undefined,
      seller_id: searchParams.get('seller_id') ?? undefined,
      region: searchParams.get('region') ?? undefined,
      date_from: searchParams.get('from') ?? undefined,
      date_to: searchParams.get('to') ?? undefined,
      group_by: (searchParams.get('group_by') as GroupBy) ?? undefined,
      order_by: (searchParams.get('order_by') as 'revenue_desc' | 'revenue_asc') ?? 'revenue_desc',
      limit: parseInt(searchParams.get('limit') ?? '20'),
    })
    return NextResponse.json({ data })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
