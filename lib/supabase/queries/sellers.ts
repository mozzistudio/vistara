import { db } from '../client'
import { MOCK_SALES, MOCK_PHARMACIES, PH_SELLER } from './mock-data'

// Map V1 user (role=Rep) to V2 seller shape
function makeSellerFromUser(u: Record<string, unknown>, idx: number) {
  const targets = [45000, 38000, 32000, 28000]
  const target = targets[idx] ?? 30000
  const code = `EMP-00${idx + 1}`

  const sellerSales = MOCK_SALES.filter(s => s.seller_id === `s-v1-${idx + 1}`)
  const currentMonthSales = sellerSales.filter(s => s.date.startsWith('2025-06'))
  const actual = currentMonthSales.reduce((sum, s) => sum + s.revenue, 0)

  return {
    id: `s-v1-${idx + 1}`,
    user_id: u.id as string,
    employee_code: code,
    region: u.territory as string,
    territory: u.territory as string,
    target_monthly: target,
    target_quarterly: target * 3,
    hire_date: '2022-01-01',
    status: 'ACTIVE',
    user: { id: u.id as string, name: u.name as string, email: u.email as string, avatar: null },
    seller_pharmacies: [],
    // Performance aggregates
    seller_name: u.name as string,
    actual_revenue: actual,
    total_units: Math.floor(actual / 65),
    performance_pct: target > 0 ? (actual / target) * 100 : 0,
    visit_count: 12 + idx * 3,
    pharmacy_count: 4 + idx,
  }
}

export async function getAllSellers() {
  const { data, error } = await db
    .from('users')
    .select('id, name, email, role, territory, avatar_url')
    .eq('role', 'Rep')
    .order('name')

  if (error) throw error
  return (data as unknown as Record<string, unknown>[]).map((u, i) => makeSellerFromUser(u, i))
}

export async function getSellerById(id: string) {
  const { data, error } = await db
    .from('users')
    .select('id, name, email, role, territory, avatar_url')
    .eq('role', 'Rep')
    .order('name')

  if (error) throw error
  const reps = data as unknown as Record<string, unknown>[]
  const idx = reps.findIndex(u => `s-v1-${reps.indexOf(u) + 1}` === id || u.id === id)
  const sellerIdx = idx === -1 ? 0 : idx
  const seller = makeSellerFromUser(reps[sellerIdx] ?? reps[0], sellerIdx)
  if (!seller) return null

  // Populate seller_pharmacies from PH_SELLER mock mapping
  const assignedPhIds = Object.entries(PH_SELLER)
    .filter(([, sid]) => sid === seller.id)
    .map(([pid]) => pid)
  seller.seller_pharmacies = assignedPhIds
    .map(pid => {
      const ph = MOCK_PHARMACIES.find(p => p.id === pid)
      if (!ph) return null
      return { pharmacy: { id: ph.id, name: ph.name, region: ph.region, type: ph.type, tier: ph.tier, address: ph.address } }
    })
    .filter((x): x is { pharmacy: { id: string; name: string; region: string; type: string; tier: string; address: string } } => x !== null)

  return seller
}

export async function getSellerPerformance(sellerId?: string, dateFrom?: string, dateTo?: string) {
  const from = dateFrom ?? new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]
  const to = dateTo ?? new Date().toISOString().split('T')[0]

  const { data, error } = await db
    .from('users')
    .select('id, name, email, role, territory')
    .eq('role', 'Rep')
    .order('name')

  if (error) throw error

  const reps = data as unknown as Record<string, unknown>[]
  const targets = [45000, 38000, 32000, 28000]

  return reps.map((u, idx) => {
    const sid = `s-v1-${idx + 1}`
    if (sellerId && sid !== sellerId) return null

    const sellerSales = MOCK_SALES.filter(s => s.seller_id === sid && s.date >= from && s.date <= to)
    const actual = sellerSales.reduce((sum, s) => sum + s.revenue, 0)
    const units  = sellerSales.reduce((sum, s) => sum + s.quantity, 0)
    const target = targets[idx] ?? 30000

    return {
      seller_id: sid,
      seller_name: u.name as string,
      employee_code: `EMP-00${idx + 1}`,
      region: u.territory as string,
      territory: u.territory as string,
      target_monthly: target,
      actual_revenue: actual,
      total_units: units,
      performance_pct: target > 0 ? (actual / target) * 100 : 0,
      visit_count: 12 + idx * 3,
      pharmacy_count: 4 + idx,
    }
  }).filter((x): x is NonNullable<typeof x> => x !== null)
}
