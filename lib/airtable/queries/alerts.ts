import { tables } from '../client'
import { cachedQuery } from '../cache'

export interface Alert {
  id: string
  user: string[]
  type: string
  title: string
  message: string
  status: string
  createdAt: string
}

function mapRecord(record: any): Alert {
  return {
    id: record.id,
    user: record.get('User') || [],
    type: record.get('Type') || '',
    title: record.get('Title') || '',
    message: record.get('Message') || '',
    status: record.get('Status') || '',
    createdAt: record.get('Created At') || '',
  }
}

export async function getAlerts(userId?: string): Promise<Alert[]> {
  const formula = userId ? `FIND('${userId}', ARRAYJOIN({User}))` : ''
  return cachedQuery(`alerts:${userId || 'all'}`, async () => {
    const records = await tables.alerts
      .select({
        filterByFormula: formula,
        sort: [{ field: 'Created At', direction: 'desc' }],
      })
      .all()
    return records.map(mapRecord)
  })
}
