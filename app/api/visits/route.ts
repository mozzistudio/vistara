import { NextRequest, NextResponse } from 'next/server'
import { getVisits, updateVisitStatus } from '@/lib/airtable/queries/visits'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const repId = searchParams.get('repId') || undefined
    const status = searchParams.get('status') || undefined
    const dateFrom = searchParams.get('dateFrom') || undefined
    const dateTo = searchParams.get('dateTo') || undefined
    const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : undefined

    const visits = await getVisits({ repId, status, dateFrom, dateTo, limit })
    return NextResponse.json(visits)
  } catch (error) {
    console.error('Error fetching visits:', error)
    return NextResponse.json({ error: 'Failed to fetch visits' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { visitId, status, rating, notes } = body

    if (!visitId || !status) {
      return NextResponse.json({ error: 'visitId and status required' }, { status: 400 })
    }

    await updateVisitStatus(visitId, status, rating, notes)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating visit:', error)
    return NextResponse.json({ error: 'Failed to update visit' }, { status: 500 })
  }
}
