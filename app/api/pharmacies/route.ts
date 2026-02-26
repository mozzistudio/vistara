import { NextRequest, NextResponse } from 'next/server'
import { searchPharmacies, getRegions } from '@/lib/supabase/queries/pharmacies'
import type { PharmacyType, PharmacyTier } from '@/types'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    if (searchParams.get('regions') === 'true') {
      const regions = await getRegions()
      return NextResponse.json({ data: regions })
    }

    const data = await searchPharmacies({
      query: searchParams.get('q') ?? undefined,
      region: searchParams.get('region') ?? undefined,
      type: (searchParams.get('type') as PharmacyType) ?? undefined,
      tier: (searchParams.get('tier') as PharmacyTier) ?? undefined,
      limit: parseInt(searchParams.get('limit') ?? '50'),
    })
    return NextResponse.json({ data })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
