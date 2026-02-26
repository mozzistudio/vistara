// V2 pharmacies table does not exist yet — serves rich mock data
import { MOCK_PHARMACIES, MOCK_STOCK_BY_PRODUCT, P_NAMES, PH_SELLER, SELLER_NAMES, SELLER_EMAILS } from './mock-data'

export async function searchPharmacies(opts: {
  query?: string
  region?: string
  type?: string
  tier?: string
  limit?: number
}) {
  let results = [...MOCK_PHARMACIES]

  if (opts.query) {
    const q = opts.query.toLowerCase()
    results = results.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.region.toLowerCase().includes(q) ||
      p.address.toLowerCase().includes(q)
    )
  }
  if (opts.region) results = results.filter(p => p.region === opts.region)
  if (opts.type)   results = results.filter(p => p.type === opts.type)
  if (opts.tier)   results = results.filter(p => p.tier === opts.tier)

  return results.slice(0, opts.limit ?? 50)
}

export async function getPharmacyById(id: string) {
  const ph = MOCK_PHARMACIES.find(p => p.id === id)
  if (!ph) return null

  // Build stock with product info
  const stockWithProducts = Object.entries(MOCK_STOCK_BY_PRODUCT).flatMap(([pid, entries]) =>
    entries
      .filter(e => e.pharmacy_id === id)
      .map(e => ({
        ...e,
        product: { id: pid, name: P_NAMES[pid] ?? '', molecule: '', therapeutic_class: '' },
        pharmacy: ph,
      }))
  )

  // Build seller_pharmacies from PH_SELLER assignment mapping
  const sellerId = PH_SELLER[id]
  const sellerPharmacies = sellerId ? [{
    seller: {
      id: sellerId,
      employee_code: `EMP-00${sellerId.slice(-1)}`,
      territory: ph.region,
      user: {
        name: SELLER_NAMES[sellerId] ?? 'Vendedor',
        email: SELLER_EMAILS[sellerId] ?? '',
      },
    },
  }] : []

  return { ...ph, stock: stockWithProducts, seller_pharmacies: sellerPharmacies }
}

export async function getRegions(): Promise<string[]> {
  return [...new Set(MOCK_PHARMACIES.map(p => p.region))].sort()
}
