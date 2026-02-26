import { NextRequest, NextResponse } from 'next/server'
import { getProductById } from '@/lib/supabase/queries/products'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const data = await getProductById(id)
    return NextResponse.json({ data })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
