import { db } from '../client'
import type { StockLevel } from '@/types'
import { MOCK_STOCK_BY_PRODUCT, MOCK_PHARMACIES } from './mock-data'

// V1 → V2 product mapper
// V1 columns: id, name, category, therapeutic_area, key_messages, studies, competitive_info
function mapV1Product(p: Record<string, unknown>) {
  const name = p.name as string
  const therapeuticArea = (p.therapeutic_area as string) ?? ''

  // Derive molecule from name (extract molecule part before dosage)
  const molecule = name.replace(/\s+\d+.*$/, '').trim()

  return {
    id: p.id as string,
    name,
    molecule,
    therapeutic_class: therapeuticArea,
    dosage_form: (p.category as string) ?? 'Tableta',
    presentations: ['30 unidades', '60 unidades'],
    indications: (p.key_messages as string) ?? '',
    contraindications: null,
    interactions: null,
    clinical_summary: [p.key_messages, p.studies, p.competitive_info]
      .filter(Boolean).join(' — ') || null,
    regulatory_status: 'ACTIVE',
    image_url: null,
    created_at: p.created_at as string,
    updated_at: p.created_at as string,
  }
}

export async function searchProducts(opts: {
  query?: string
  therapeutic_class?: string
  stock_level?: StockLevel
  limit?: number
}) {
  let q = db.from('products').select('*').order('name').limit(opts.limit ?? 50)

  if (opts.query) {
    q = q.or(`name.ilike.%${opts.query}%,category.ilike.%${opts.query}%,therapeutic_area.ilike.%${opts.query}%`)
  }
  if (opts.therapeutic_class) {
    q = q.eq('therapeutic_area', opts.therapeutic_class)
  }

  const { data, error } = await q
  if (error) throw error

  return (data as unknown as Record<string, unknown>[]).map(p => {
    const mapped = mapV1Product(p)
    const stockEntries = MOCK_STOCK_BY_PRODUCT[mapped.id] ?? []
    return {
      ...mapped,
      stock: stockEntries,
    }
  })
}

export async function getProductById(id: string) {
  const { data, error } = await db
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error

  const mapped = mapV1Product(data as unknown as Record<string, unknown>)
  const stockEntries = MOCK_STOCK_BY_PRODUCT[id] ?? []

  // Attach pharmacy info to stock
  const stockWithPharmacy = stockEntries.map(s => ({
    ...s,
    pharmacy: MOCK_PHARMACIES.find(ph => ph.id === s.pharmacy_id) ?? null,
  }))

  return { ...mapped, stock: stockWithPharmacy }
}

export async function getTherapeuticClasses(): Promise<string[]> {
  const { data, error } = await db
    .from('products')
    .select('therapeutic_area')
    .order('therapeutic_area')

  if (error) throw error
  const classes = [...new Set((data as { therapeutic_area: string }[]).map(d => d.therapeutic_area).filter(Boolean))]
  return classes
}
