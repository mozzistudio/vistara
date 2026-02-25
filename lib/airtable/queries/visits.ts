import { tables } from '../client'
import { cachedQuery, invalidateCache } from '../cache'

export interface Visit {
  id: string
  rep: string[]
  repName: string
  hcp: string[]
  hcpName: string
  scheduledDate: string
  actualDate: string
  status: string
  rating: number | null
  notes: string
  productsDiscussed: string[]
  duration: number
  checkInTime: string
  checkOutTime: string
}

function mapRecord(record: any): Visit {
  return {
    id: record.id,
    rep: record.get('Rep') || [],
    repName: record.get('Rep Name') || '',
    hcp: record.get('HCP') || [],
    hcpName: record.get('HCP Name') || '',
    scheduledDate: record.get('Scheduled Date') || '',
    actualDate: record.get('Actual Date') || '',
    status: record.get('Status') || '',
    rating: record.get('Rating') || null,
    notes: record.get('Notes') || '',
    productsDiscussed: (record.get('Products Discussed') || '').split('\n').map((p: string) => p.trim()).filter(Boolean),
    duration: record.get('Duration (min)') || 0,
    checkInTime: record.get('Check-in Time') || '',
    checkOutTime: record.get('Check-out Time') || '',
  }
}

export async function getVisits(filters?: {
  repId?: string
  status?: string
  dateFrom?: string
  dateTo?: string
  limit?: number
}): Promise<Visit[]> {
  const conditions: string[] = []

  if (filters?.repId) {
    conditions.push(`FIND('${filters.repId}', ARRAYJOIN({Rep}))`)
  }
  if (filters?.status) {
    conditions.push(`{Status} = '${filters.status}'`)
  }
  if (filters?.dateFrom) {
    conditions.push(`IS_AFTER({Scheduled Date}, '${filters.dateFrom}')`)
  }
  if (filters?.dateTo) {
    conditions.push(`IS_BEFORE({Scheduled Date}, '${filters.dateTo}')`)
  }

  const formula = conditions.length > 0
    ? `AND(${conditions.join(', ')})`
    : ''

  const key = `visits:${JSON.stringify(filters || {})}`
  return cachedQuery(key, async () => {
    const records = await tables.visits
      .select({
        filterByFormula: formula,
        sort: [{ field: 'Scheduled Date', direction: 'desc' }],
        maxRecords: filters?.limit || 100,
      })
      .all()
    return records.map(mapRecord)
  })
}

export async function getVisitsForDate(repId: string, date: string): Promise<Visit[]> {
  const key = `visits:date:${repId}:${date}`
  return cachedQuery(key, async () => {
    const records = await tables.visits
      .select({
        filterByFormula: `AND(FIND('${repId}', ARRAYJOIN({Rep})), {Scheduled Date} = '${date}')`,
        sort: [{ field: 'Check-in Time', direction: 'asc' }],
      })
      .all()
    return records.map(mapRecord)
  })
}

export async function getVisitsStats(dateFrom?: string, dateTo?: string) {
  const visits = await getVisits({
    status: 'completed',
    dateFrom,
    dateTo,
  })

  const totalVisits = visits.length
  const avgRating = visits.reduce((sum, v) => sum + (v.rating || 0), 0) / (totalVisits || 1)
  const byRep = visits.reduce((acc, v) => {
    const rep = v.repName || 'Unknown'
    acc[rep] = (acc[rep] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return { totalVisits, avgRating, byRep }
}

export async function updateVisitStatus(visitId: string, status: string, rating?: number, notes?: string) {
  const fields: Record<string, string | number> = { Status: status }
  if (rating !== undefined) fields['Rating'] = rating
  if (notes) fields['Notes'] = notes
  if (status === 'Completed') fields['Actual Date'] = new Date().toISOString().split('T')[0]

  await tables.visits.update(visitId, fields as any)
  invalidateCache('visits')
  invalidateCache('analytics')
}
