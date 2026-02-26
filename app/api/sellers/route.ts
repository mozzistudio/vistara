import { NextResponse } from 'next/server'
import { getAllSellers } from '@/lib/supabase/queries/sellers'

export async function GET() {
  try {
    const data = await getAllSellers()
    return NextResponse.json({ data })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
