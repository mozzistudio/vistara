import { NextRequest, NextResponse } from 'next/server'
import { getPharmacyById } from '@/lib/supabase/queries/pharmacies'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const data = await getPharmacyById(id)
    return NextResponse.json({ data })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
