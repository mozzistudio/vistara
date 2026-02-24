import { NextRequest, NextResponse } from 'next/server'
import { getRoutes, getRouteForDate } from '@/lib/airtable/queries/routes'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const repId = searchParams.get('repId') || undefined
    const date = searchParams.get('date') || undefined
    const dateFrom = searchParams.get('dateFrom') || undefined
    const dateTo = searchParams.get('dateTo') || undefined

    if (repId && date) {
      const route = await getRouteForDate(repId, date)
      return NextResponse.json(route)
    }

    const routes = await getRoutes({ repId, dateFrom, dateTo })
    return NextResponse.json(routes)
  } catch (error) {
    console.error('Error fetching routes:', error)
    return NextResponse.json({ error: 'Failed to fetch routes' }, { status: 500 })
  }
}
