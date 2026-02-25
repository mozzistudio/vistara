import { tables } from '../client'
import { cachedQuery } from '../cache'

export interface HCP {
  id: string
  fullName: string
  specialty: string
  segment: string
  institution: string
  city: string
  address: string
  phone: string
  email: string
  lat: number
  lng: number
  assignedRep: string[]
  assignedRepName: string
  lastVisitDate: string
  visitFrequencyTarget: number
  notes: string
  status: string
}

function mapRecord(record: any): HCP {
  return {
    id: record.id,
    fullName: record.get('Full Name') || '',
    specialty: record.get('Specialty') || '',
    segment: record.get('Segment') || '',
    institution: record.get('Institution') || '',
    city: record.get('City') || '',
    address: record.get('Address') || '',
    phone: record.get('Phone') || '',
    email: record.get('Email') || '',
    lat: record.get('Lat') || 0,
    lng: record.get('Lng') || 0,
    assignedRep: record.get('Assigned Rep') || [],
    assignedRepName: record.get('Assigned Rep Name') || '',
    lastVisitDate: record.get('Last Visit Date') || '',
    visitFrequencyTarget: record.get('Visit Frequency Target') || 30,
    notes: record.get('Notes') || '',
    status: record.get('Status') || 'Active',
  }
}

const TWO_MINUTES = 2 * 60 * 1000

export async function getAllHCPs(): Promise<HCP[]> {
  return cachedQuery('hcps:all', async () => {
    const records = await tables.hcps.select().all()
    return records.map(mapRecord)
  }, TWO_MINUTES)
}

export async function getHCPById(id: string): Promise<HCP | null> {
  try {
    const record = await tables.hcps.find(id)
    return mapRecord(record)
  } catch {
    return null
  }
}

export async function getHCPsByRep(repId: string): Promise<HCP[]> {
  return cachedQuery(`hcps:rep:${repId}`, async () => {
    const records = await tables.hcps
      .select({
        filterByFormula: `FIND('${repId}', ARRAYJOIN({Assigned Rep}))`,
      })
      .all()
    return records.map(mapRecord)
  }, TWO_MINUTES)
}

export async function searchHCPs(query: string): Promise<HCP[]> {
  const records = await tables.hcps
    .select({
      filterByFormula: `OR(
        FIND(LOWER('${query}'), LOWER({Full Name})),
        FIND(LOWER('${query}'), LOWER({Specialty})),
        FIND(LOWER('${query}'), LOWER({Institution})),
        FIND(LOWER('${query}'), LOWER({City}))
      )`,
    })
    .all()
  return records.map(mapRecord)
}

export async function getOverdueHCPs(): Promise<HCP[]> {
  const allHcps = await getAllHCPs()
  const today = new Date()
  return allHcps.filter(hcp => {
    if (!hcp.lastVisitDate) return true
    const lastVisit = new Date(hcp.lastVisitDate)
    const daysSince = Math.floor((today.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24))
    return daysSince > hcp.visitFrequencyTarget
  })
}
