import { NextRequest, NextResponse } from 'next/server'
import { searchProducts, getTherapeuticClasses } from '@/lib/supabase/queries/products'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('q') ?? ''
    const therapeutic_class = searchParams.get('class') ?? undefined
    const limit = parseInt(searchParams.get('limit') ?? '50')

    if (searchParams.get('classes') === 'true') {
      const classes = await getTherapeuticClasses()
      return NextResponse.json({ data: classes })
    }

    const data = await searchProducts({ query, therapeutic_class, limit })
    return NextResponse.json({ data })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
