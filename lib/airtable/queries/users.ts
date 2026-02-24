import { tables } from '../client'
import { cachedQuery } from '../cache'

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: string
  territory: string
  team: string[]
  currentLat: number
  currentLng: number
  avatar?: string
}

function mapRecord(record: any): User {
  return {
    id: record.id,
    name: record.get('Name') || '',
    email: record.get('Email') || '',
    password: record.get('Password') || '',
    role: record.get('Role') || '',
    territory: record.get('Territory') || '',
    team: record.get('Team') || [],
    currentLat: record.get('Current Lat') || 0,
    currentLng: record.get('Current Lng') || 0,
    avatar: record.get('Avatar') || undefined,
  }
}

export async function getAllUsers(): Promise<User[]> {
  return cachedQuery('users:all', async () => {
    const records = await tables.users.select().all()
    return records.map(mapRecord)
  })
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const records = await tables.users
    .select({
      filterByFormula: `{Email} = '${email}'`,
      maxRecords: 1,
    })
    .all()

  if (records.length === 0) return null
  return mapRecord(records[0])
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const record = await tables.users.find(id)
    return mapRecord(record)
  } catch {
    return null
  }
}

export async function getRepUsers(): Promise<User[]> {
  return cachedQuery('users:reps', async () => {
    const records = await tables.users
      .select({
        filterByFormula: `OR({Role} = 'Rep', {Role} = 'Visiteur Médical')`,
      })
      .all()
    return records.map(mapRecord)
  })
}
