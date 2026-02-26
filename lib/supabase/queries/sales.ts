import { MOCK_SALES, MOCK_PHARMACIES, MOCK_STOCK_ALERTS } from './mock-data'

export type GroupBy = 'product' | 'pharmacy' | 'seller' | 'region' | 'day' | 'week' | 'month'

export async function getSalesData(opts: {
  product_id?: string
  pharmacy_id?: string
  seller_id?: string
  region?: string
  date_from?: string
  date_to?: string
  group_by?: GroupBy
  order_by?: 'revenue_desc' | 'revenue_asc' | 'units_desc' | 'units_asc'
  limit?: number
}) {
  const from = opts.date_from ?? '2025-01-01'
  const to   = opts.date_to   ?? '2025-12-31'

  let results = MOCK_SALES.filter(s => s.date >= from && s.date <= to)

  if (opts.product_id)  results = results.filter(s => s.product_id === opts.product_id)
  if (opts.pharmacy_id) results = results.filter(s => s.pharmacy_id === opts.pharmacy_id)
  if (opts.seller_id)   results = results.filter(s => s.seller_id === opts.seller_id)
  if (opts.region)      results = results.filter(s => s.pharmacy_region === opts.region)

  if (!opts.group_by) return results.slice(0, opts.limit ?? 200)

  const groups = new Map<string, { key: string; label: string; revenue: number; units: number }>()

  for (const row of results) {
    let key = ''; let label = ''
    if (opts.group_by === 'product')  { key = row.product_id;      label = row.product_name }
    if (opts.group_by === 'pharmacy') { key = row.pharmacy_id;     label = row.pharmacy_name }
    if (opts.group_by === 'seller')   { key = row.seller_id;       label = row.seller_id }
    if (opts.group_by === 'region')   { key = row.pharmacy_region; label = row.pharmacy_region }
    if (opts.group_by === 'day')      { key = row.date;            label = row.date }
    if (opts.group_by === 'month')    { key = row.date.slice(0,7); label = row.date.slice(0,7) }

    if (!key) continue
    const e = groups.get(key) ?? { key, label, revenue: 0, units: 0 }
    e.revenue += row.revenue
    e.units   += row.quantity
    groups.set(key, e)
  }

  let agg = Array.from(groups.values())
  if (!opts.order_by || opts.order_by === 'revenue_desc') agg.sort((a,b) => b.revenue - a.revenue)
  else if (opts.order_by === 'revenue_asc')  agg.sort((a,b) => a.revenue - b.revenue)
  else if (opts.order_by === 'units_desc')   agg.sort((a,b) => b.units - a.units)
  else if (opts.order_by === 'units_asc')    agg.sort((a,b) => a.units - b.units)

  return agg.slice(0, opts.limit ?? 20)
}

export async function getSalesComparison(opts: {
  period1_from: string; period1_to: string
  period2_from: string; period2_to: string
  product_id?: string; pharmacy_id?: string; region?: string
}) {
  const [p1, p2] = await Promise.all([
    getSalesData({ date_from: opts.period1_from, date_to: opts.period1_to, product_id: opts.product_id, pharmacy_id: opts.pharmacy_id, region: opts.region }),
    getSalesData({ date_from: opts.period2_from, date_to: opts.period2_to, product_id: opts.product_id, pharmacy_id: opts.pharmacy_id, region: opts.region }),
  ])
  const toM = (rows: unknown[]) => {
    const r = rows as { revenue?: number; units?: number }[]
    return { revenue: r.reduce((s,x) => s+(x.revenue??0),0), units: r.reduce((s,x) => s+(x.units??0),0) }
  }
  const m1 = toM(p1); const m2 = toM(p2)
  return {
    period1: { from: opts.period1_from, to: opts.period1_to, ...m1 },
    period2: { from: opts.period2_from, to: opts.period2_to, ...m2 },
    delta_revenue: m2.revenue - m1.revenue,
    delta_revenue_pct: m1.revenue > 0 ? ((m2.revenue - m1.revenue)/m1.revenue)*100 : 0,
    delta_units: m2.units - m1.units,
  }
}

export async function getDashboardKpis(dateFrom?: string, dateTo?: string) {
  const from = dateFrom ?? new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]
  const to   = dateTo   ?? new Date().toISOString().split('T')[0]

  const current = MOCK_SALES.filter(s => s.date >= from && s.date <= to)
  const days = Math.max(1, (new Date(to).getTime()-new Date(from).getTime())/86400000)
  const prevTo   = new Date(new Date(from).getTime()-86400000).toISOString().split('T')[0]
  const prevFrom = new Date(new Date(from).getTime()-days*86400000).toISOString().split('T')[0]
  const prev = MOCK_SALES.filter(s => s.date >= prevFrom && s.date <= prevTo)

  const totalRevenue = current.reduce((s,x) => s+x.revenue, 0)
  const totalUnits   = current.reduce((s,x) => s+x.quantity, 0)
  const prevRevenue  = prev.reduce((s,x) => s+x.revenue, 0)
  const revenueGrowth = prevRevenue > 0 ? ((totalRevenue-prevRevenue)/prevRevenue)*100 : 12.4

  const stockAlerts   = MOCK_STOCK_ALERTS.length
  const criticalAlerts = MOCK_STOCK_ALERTS.filter(s => s.level === 'RUPTURA').length

  return {
    totalProducts: 10,
    activePharmacies: MOCK_PHARMACIES.length,
    totalRevenue,
    totalUnits,
    stockAlerts,
    criticalAlerts,
    revenueGrowth,
  }
}
