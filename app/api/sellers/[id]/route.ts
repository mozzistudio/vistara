import { NextRequest, NextResponse } from 'next/server'
import { getSellerById, getSellerPerformance } from '@/lib/supabase/queries/sellers'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const { searchParams } = new URL(req.url)

    if (searchParams.get('perf') === 'true') {
      const data = await getSellerPerformance(id, searchParams.get('from') ?? undefined, searchParams.get('to') ?? undefined)
      return NextResponse.json({ data })
    }

    const data = await getSellerById(id)
    return NextResponse.json({ data })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
