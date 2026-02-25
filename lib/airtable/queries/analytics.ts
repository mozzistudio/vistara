import { tables } from '../client'
import { cachedQuery } from '../cache'
import { getAllHCPs } from './hcps'

export interface VisitsByRep {
  rep: string
  count: number
}

export interface DailyTrend {
  date: string
  count: number
}

export interface RatingDistribution {
  rating: number
  count: number
}

export interface ProductDiscussed {
  product: string
  count: number
}

export interface RepLeaderboardEntry {
  name: string
  visits: number
  avgRating: number
  routeEfficiency: number
  coverageA: number
}

export async function getVisitsByRep(dateFrom?: string, dateTo?: string): Promise<VisitsByRep[]> {
  const key = `analytics:visitsByRep:${dateFrom}:${dateTo}`
  return cachedQuery(key, async () => {
    const conditions = [`{Status} = 'completed'`]
    if (dateFrom) conditions.push(`IS_AFTER({Actual Date}, '${dateFrom}')`)
    if (dateTo) conditions.push(`IS_BEFORE({Actual Date}, '${dateTo}')`)

    const records = await tables.visits
      .select({ filterByFormula: `AND(${conditions.join(', ')})` })
      .all()

    const grouped: Record<string, number> = {}
    records.forEach((r: any) => {
      const rep = r.get('Rep Name') as string || 'Unknown'
      grouped[rep] = (grouped[rep] || 0) + 1
    })

    return Object.entries(grouped)
      .map(([rep, count]) => ({ rep, count }))
      .sort((a, b) => b.count - a.count)
  })
}

export async function getDailyTrend(dateFrom?: string, dateTo?: string): Promise<DailyTrend[]> {
  const key = `analytics:dailyTrend:${dateFrom}:${dateTo}`
  return cachedQuery(key, async () => {
    const conditions = [`{Status} = 'completed'`]
    if (dateFrom) conditions.push(`IS_AFTER({Actual Date}, '${dateFrom}')`)
    if (dateTo) conditions.push(`IS_BEFORE({Actual Date}, '${dateTo}')`)

    const records = await tables.visits
      .select({ filterByFormula: `AND(${conditions.join(', ')})` })
      .all()

    const grouped: Record<string, number> = {}
    records.forEach((r: any) => {
      const date = r.get('Actual Date') as string || ''
      if (date) grouped[date] = (grouped[date] || 0) + 1
    })

    return Object.entries(grouped)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date))
  })
}

export async function getRatingDistribution(dateFrom?: string, dateTo?: string): Promise<RatingDistribution[]> {
  const key = `analytics:ratings:${dateFrom}:${dateTo}`
  return cachedQuery(key, async () => {
    const conditions = [`{Status} = 'completed'`]
    if (dateFrom) conditions.push(`IS_AFTER({Actual Date}, '${dateFrom}')`)
    if (dateTo) conditions.push(`IS_BEFORE({Actual Date}, '${dateTo}')`)

    const records = await tables.visits
      .select({ filterByFormula: `AND(${conditions.join(', ')})` })
      .all()

    const grouped: Record<number, number> = {}
    records.forEach((r: any) => {
      const rating = r.get('Rating') as number
      if (rating) grouped[rating] = (grouped[rating] || 0) + 1
    })

    return Object.entries(grouped)
      .map(([rating, count]) => ({ rating: Number(rating), count }))
      .sort((a, b) => a.rating - b.rating)
  })
}

export async function getProductsDiscussed(dateFrom?: string, dateTo?: string): Promise<ProductDiscussed[]> {
  const key = `analytics:products:${dateFrom}:${dateTo}`
  return cachedQuery(key, async () => {
    const conditions = [`{Status} = 'completed'`]
    if (dateFrom) conditions.push(`IS_AFTER({Actual Date}, '${dateFrom}')`)
    if (dateTo) conditions.push(`IS_BEFORE({Actual Date}, '${dateTo}')`)

    const records = await tables.visits
      .select({ filterByFormula: `AND(${conditions.join(', ')})` })
      .all()

    const grouped: Record<string, number> = {}
    records.forEach((r: any) => {
      const raw = r.get('Products Discussed') as string || ''
      const products = raw.split('\n').map((p: string) => p.trim()).filter(Boolean)
      products.forEach((p: string) => {
        grouped[p] = (grouped[p] || 0) + 1
      })
    })

    return Object.entries(grouped)
      .map(([product, count]) => ({ product, count }))
      .sort((a, b) => b.count - a.count)
  })
}

export async function getRepLeaderboard(dateFrom?: string, dateTo?: string): Promise<RepLeaderboardEntry[]> {
  const key = `analytics:leaderboard:${dateFrom}:${dateTo}`
  return cachedQuery(key, async () => {
    const conditions = [`{Status} = 'completed'`]
    if (dateFrom) conditions.push(`IS_AFTER({Actual Date}, '${dateFrom}')`)
    if (dateTo) conditions.push(`IS_BEFORE({Actual Date}, '${dateTo}')`)

    const [visitRecords, routeRecords, allHCPs] = await Promise.all([
      tables.visits
        .select({ filterByFormula: `AND(${conditions.join(', ')})` })
        .all(),
      tables.routes
        .select({
          filterByFormula: (() => {
            const rc: string[] = []
            if (dateFrom) rc.push(`IS_AFTER({Date}, '${dateFrom}')`)
            if (dateTo) rc.push(`IS_BEFORE({Date}, '${dateTo}')`)
            return rc.length > 0 ? `AND(${rc.join(', ')})` : ''
          })(),
        })
        .all(),
      getAllHCPs(),
    ])

    // Build A+ HCP maps for coverage calculation
    const hcpSegmentMap: Record<string, string> = {}
    const repTotalAPlus: Record<string, Set<string>> = {}
    allHCPs.forEach(hcp => {
      hcpSegmentMap[hcp.fullName] = hcp.segment
      if (hcp.segment === 'A+' && hcp.assignedRepName) {
        if (!repTotalAPlus[hcp.assignedRepName]) repTotalAPlus[hcp.assignedRepName] = new Set()
        repTotalAPlus[hcp.assignedRepName].add(hcp.fullName)
      }
    })

    const repData: Record<string, {
      visits: number
      totalRating: number
      ratedVisits: number
      totalScore: number
      routeCount: number
      visitedAPlus: Set<string>
    }> = {}

    visitRecords.forEach((r: any) => {
      const rep = r.get('Rep Name') as string || 'Unknown'
      if (!repData[rep]) repData[rep] = { visits: 0, totalRating: 0, ratedVisits: 0, totalScore: 0, routeCount: 0, visitedAPlus: new Set() }
      repData[rep].visits++
      const rating = r.get('Rating') as number
      if (rating) {
        repData[rep].totalRating += rating
        repData[rep].ratedVisits++
      }
      const hcpName = r.get('HCP Name') as string || ''
      if (hcpName && hcpSegmentMap[hcpName] === 'A+') {
        repData[rep].visitedAPlus.add(hcpName)
      }
    })

    routeRecords.forEach((r: any) => {
      const rep = r.get('Rep Name') as string || 'Unknown'
      if (!repData[rep]) repData[rep] = { visits: 0, totalRating: 0, ratedVisits: 0, totalScore: 0, routeCount: 0, visitedAPlus: new Set() }
      const score = r.get('Optimization Score') as number || 0
      repData[rep].totalScore += score
      repData[rep].routeCount++
    })

    return Object.entries(repData)
      .map(([name, data]) => ({
        name,
        visits: data.visits,
        avgRating: data.ratedVisits > 0 ? Math.round((data.totalRating / data.ratedVisits) * 10) / 10 : 0,
        routeEfficiency: data.routeCount > 0 ? Math.round(data.totalScore / data.routeCount) : 0,
        coverageA: repTotalAPlus[name]?.size > 0
          ? Math.round(data.visitedAPlus.size / repTotalAPlus[name].size * 100)
          : 0,
      }))
      .sort((a, b) => b.visits - a.visits)
  })
}
