import { NextRequest, NextResponse } from 'next/server'
import { getStockAlerts, getStockMatrix, getStockSummary } from '@/lib/supabase/queries/stock'
import type { StockLevel } from '@/types'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const view = searchParams.get('view') ?? 'alerts'

    if (view === 'summary') {
      const data = await getStockSummary()
      return NextResponse.json({ data })
    }

    if (view === 'matrix') {
      const data = await getStockMatrix({
        region: searchParams.get('region') ?? undefined,
        level: (searchParams.get('level') as StockLevel) ?? undefined,
      })
      return NextResponse.json({ data })
    }

    // Default: alerts
    const data = await getStockAlerts({
      region: searchParams.get('region') ?? undefined,
      product_id: searchParams.get('product_id') ?? undefined,
    })
    return NextResponse.json({ data })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
