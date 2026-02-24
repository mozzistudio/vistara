import { tables } from '../client'
import { cachedQuery } from '../cache'

export interface Route {
  id: string
  rep: string[]
  repName: string
  date: string
  status: string
  optimizationScore: number
  totalDistance: number
  driveTime: number
  visits: string[]
  waypoints: string
}

function mapRecord(record: any): Route {
  return {
    id: record.id,
    rep: record.get('Rep') || [],
    repName: record.get('Rep Name') || '',
    date: record.get('Date') || '',
    status: record.get('Status') || '',
    optimizationScore: record.get('Optimization Score') || 0,
    totalDistance: record.get('Total Distance (km)') || 0,
    driveTime: record.get('Drive Time (min)') || 0,
    visits: record.get('Visits') || [],
    waypoints: record.get('Waypoints') || '',
  }
}

export async function getRoutes(filters?: {
  repId?: string
  dateFrom?: string
  dateTo?: string
  status?: string
}): Promise<Route[]> {
  const conditions: string[] = []

  if (filters?.repId) {
    conditions.push(`FIND('${filters.repId}', ARRAYJOIN({Rep}))`)
  }
  if (filters?.status) {
    conditions.push(`{Status} = '${filters.status}'`)
  }
  if (filters?.dateFrom) {
    conditions.push(`IS_AFTER({Date}, '${filters.dateFrom}')`)
  }
  if (filters?.dateTo) {
    conditions.push(`IS_BEFORE({Date}, '${filters.dateTo}')`)
  }

  const formula = conditions.length > 0 ? `AND(${conditions.join(', ')})` : ''
  const key = `routes:${JSON.stringify(filters || {})}`

  return cachedQuery(key, async () => {
    const records = await tables.routes
      .select({
        filterByFormula: formula,
        sort: [{ field: 'Date', direction: 'desc' }],
      })
      .all()
    return records.map(mapRecord)
  })
}

export async function getRouteForDate(repId: string, date: string): Promise<Route | null> {
  const records = await tables.routes
    .select({
      filterByFormula: `AND(FIND('${repId}', ARRAYJOIN({Rep})), {Date} = '${date}')`,
      maxRecords: 1,
    })
    .all()

  if (records.length === 0) return null
  return mapRecord(records[0])
}

export async function getOptimizationScoresTrend(dateFrom?: string, dateTo?: string): Promise<{ date: string; score: number }[]> {
  const routes = await getRoutes({ dateFrom, dateTo })
  return routes
    .filter(r => r.optimizationScore > 0)
    .map(r => ({ date: r.date, score: r.optimizationScore }))
    .sort((a, b) => a.date.localeCompare(b.date))
}
