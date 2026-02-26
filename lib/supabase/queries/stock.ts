import type { StockLevel } from '@/types'
import { MOCK_STOCK_ALERTS, MOCK_STOCK_BY_PRODUCT } from './mock-data'

export async function getStockAlerts(opts?: { region?: string; product_id?: string }) {
  let results = [...MOCK_STOCK_ALERTS]
  if (opts?.region)     results = results.filter(r => r.pharmacy.region === opts.region)
  if (opts?.product_id) results = results.filter(r => r.product.id === opts.product_id)
  return results
}

export async function getStockMatrix(opts?: {
  region?: string
  level?: StockLevel
  product_ids?: string[]
  pharmacy_ids?: string[]
}) {
  const all = Object.values(MOCK_STOCK_BY_PRODUCT).flat()
  let results = all as unknown as {
    id: string; quantity: number; level: StockLevel; min_threshold: number; last_updated: string
    product: { id: string; name: string; therapeutic_class: string }
    pharmacy: { id: string; name: string; region: string }
  }[]

  if (opts?.level)         results = results.filter(r => r.level === opts.level)
  if (opts?.region)        results = results.filter(r => r.pharmacy?.region === opts?.region)
  if (opts?.product_ids?.length) results = results.filter(r => opts.product_ids!.includes(r.product?.id))
  if (opts?.pharmacy_ids?.length) results = results.filter(r => opts.pharmacy_ids!.includes(r.pharmacy?.id))

  return results
}

export async function getStockSummary() {
  const all = Object.values(MOCK_STOCK_BY_PRODUCT).flat()
  const summary = { ALTO: 0, MEDIO: 0, BAJO: 0, RUPTURA: 0 }
  all.forEach(s => { if (s.level in summary) summary[s.level as StockLevel]++ })
  return summary
}
