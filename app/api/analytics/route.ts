import { NextRequest, NextResponse } from 'next/server'
import {
  getVisitsByRep,
  getDailyTrend,
  getRatingDistribution,
  getProductsDiscussed,
  getRepLeaderboard,
} from '@/lib/airtable/queries/analytics'
import { getOptimizationScoresTrend } from '@/lib/airtable/queries/routes'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type')
    const dateFrom = searchParams.get('dateFrom') || undefined
    const dateTo = searchParams.get('dateTo') || undefined

    switch (type) {
      case 'visitsByRep':
        return NextResponse.json(await getVisitsByRep(dateFrom, dateTo))
      case 'dailyTrend':
        return NextResponse.json(await getDailyTrend(dateFrom, dateTo))
      case 'ratings':
        return NextResponse.json(await getRatingDistribution(dateFrom, dateTo))
      case 'products':
        return NextResponse.json(await getProductsDiscussed(dateFrom, dateTo))
      case 'leaderboard':
        return NextResponse.json(await getRepLeaderboard(dateFrom, dateTo))
      case 'optimizationScore':
        return NextResponse.json(await getOptimizationScoresTrend(dateFrom, dateTo))
      case 'all': {
        const [visitsByRep, dailyTrend, ratings, products, leaderboard, optScore] = await Promise.all([
          getVisitsByRep(dateFrom, dateTo),
          getDailyTrend(dateFrom, dateTo),
          getRatingDistribution(dateFrom, dateTo),
          getProductsDiscussed(dateFrom, dateTo),
          getRepLeaderboard(dateFrom, dateTo),
          getOptimizationScoresTrend(dateFrom, dateTo),
        ])
        return NextResponse.json({ visitsByRep, dailyTrend, ratings, products, leaderboard, optScore })
      }
      default:
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}
