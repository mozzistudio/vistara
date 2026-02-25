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

        const totalVisits = visitsByRep.reduce((sum, v) => sum + v.count, 0)
        const numReps = visitsByRep.filter(v => v.count > 0).length
        const numDays = dateFrom && dateTo
          ? Math.max(1, Math.ceil((new Date(dateTo).getTime() - new Date(dateFrom).getTime()) / (1000 * 60 * 60 * 24)))
          : 30
        const avgPerRepDay = numReps > 0
          ? Math.round((totalVisits / numReps / numDays) * 10) / 10
          : 0
        const avgRouteScore = optScore.length > 0
          ? Math.round(optScore.reduce((sum, s) => sum + s.score, 0) / optScore.length)
          : 0
        const avgCoverageA = leaderboard.length > 0
          ? Math.round(leaderboard.reduce((sum, r) => sum + r.coverageA, 0) / leaderboard.length)
          : 0

        const kpis = {
          totalVisits,
          totalVisitsDelta: 0,
          avgPerRepDay,
          avgPerRepDayDelta: 0,
          coverageA: `${avgCoverageA}%`,
          coverageADelta: 0,
          avgRouteScore: `${avgRouteScore}%`,
          avgRouteScoreDelta: 0,
        }

        return NextResponse.json({ visitsByRep, dailyTrend, ratings, products, leaderboard, optScore, kpis })
      }
      default:
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}
