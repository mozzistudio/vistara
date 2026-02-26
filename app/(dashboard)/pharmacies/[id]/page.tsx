import { notFound } from 'next/navigation'
import { getPharmacyById } from '@/lib/supabase/queries/pharmacies'
import { getSalesData } from '@/lib/supabase/queries/sales'
import { TopBar } from '@/components/layout/TopBar'
import { StockBadge } from '@/components/products/StockBadge'
import { SalesChart } from '@/components/dashboard/SalesChart'
import { formatCurrency, formatNumber } from '@/lib/utils/formatters'
import { Building2, MapPin, Phone, Mail, Clock, Users } from 'lucide-react'
import type { StockLevel } from '@/types'

export const dynamic = 'force-dynamic'

export default async function PharmacyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [pharmacy, salesData] = await Promise.all([
    getPharmacyById(id).catch(() => null),
    getSalesData({ pharmacy_id: id, date_from: '2025-01-01', date_to: '2025-06-30', group_by: 'day', limit: 180 }),
  ])

  if (!pharmacy) notFound()

  type StockRow = { quantity: number; level: StockLevel; min_threshold: number; last_updated: string; product: { id: string; name: string; molecule: string; therapeutic_class: string } | null }
  const stockRows = (pharmacy.stock as unknown as StockRow[]) ?? []
  const totalRevenue = salesData.reduce((s, x) => s + ((x as { revenue?: number }).revenue ?? 0), 0)
  const totalUnits = stockRows.reduce((s: number, x: StockRow) => s + x.quantity, 0)
  const sellers = (pharmacy.seller_pharmacies as unknown as { seller: { id: string; employee_code: string; territory: string; user: { name: string; email: string } } }[]) ?? []

  const TYPE_LABELS: Record<string, string> = { RETAIL: 'Minorista', HOSPITAL: 'Hospital', CHAIN: 'Cadena', CLINIC: 'Clínica' }

  return (
    <>
      <TopBar title={pharmacy.name} subtitle={`${pharmacy.region} · ${pharmacy.province}`} />
      <div className="p-6 space-y-6">

        {/* Header card */}
        <div className="bg-white rounded-[16px] border p-6" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-start gap-4 mb-5">
            <div className="w-14 h-14 rounded-[12px] flex items-center justify-center" style={{ background: 'var(--mint-light)' }}>
              <Building2 className="w-7 h-7" style={{ color: 'var(--forest)' }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="font-display font-bold text-xl" style={{ color: 'var(--text-dark)' }}>{pharmacy.name}</h1>
                <span className="badge-alto">{pharmacy.status}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-medium" style={{ background: 'var(--mint-light)', color: 'var(--forest)' }}>
                  {TYPE_LABELS[pharmacy.type] ?? pharmacy.type}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full border font-medium" style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}>
                  {pharmacy.tier}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mt-3">
                {[
                  { icon: MapPin, value: pharmacy.address },
                  { icon: Clock, value: (pharmacy as Record<string,unknown>).operating_hours as string | undefined },
                  { icon: Phone, value: pharmacy.contact_phone },
                  { icon: Mail, value: (pharmacy as Record<string,unknown>).contact_email as string | undefined },
                ].filter(x => x.value).map(({ icon: Icon, value }) => (
                  <div key={value} className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--text-faint)' }} />
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Productos en Stock', value: formatNumber(stockRows.length) },
            { label: 'Unidades Totales', value: formatNumber(totalUnits) },
            { label: 'Ingresos H1 2025', value: formatCurrency(totalRevenue) },
            { label: 'Vendedores Asignados', value: String(sellers.length) },
          ].map(kpi => (
            <div key={kpi.label} className="bg-white rounded-[12px] border p-4" style={{ borderColor: 'var(--border)' }}>
              <p className="text-[10px] uppercase tracking-wide font-mono mb-2" style={{ color: 'var(--text-faint)' }}>{kpi.label}</p>
              <p className="font-display font-bold text-2xl" style={{ color: 'var(--text-dark)' }}>{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Sales chart */}
        <SalesChart data={salesData as { key: string; label: string; revenue: number; units: number }[]} title="Ventas Diarias (Ene–Jun 2025)" />

        {/* Stock & Sellers row */}
        <div className="grid grid-cols-3 gap-4">
          {/* Stock table (2 cols) */}
          <div className="col-span-2 bg-white rounded-[12px] border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
            <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border-light)' }}>
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>Inventario por Producto</h3>
            </div>
            <div className="overflow-auto max-h-72">
              <table className="w-full text-xs">
                <thead className="sticky top-0" style={{ background: 'var(--mint-paper)' }}>
                  <tr>
                    {['Producto', 'Clase', 'Cantidad', 'Nivel'].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 font-mono text-[10px] uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stockRows.sort((a: StockRow, b: StockRow) => {
                    const order = { RUPTURA: 0, BAJO: 1, MEDIO: 2, ALTO: 3 }
                    return order[a.level] - order[b.level]
                  }).map((row: StockRow, i: number) => (
                    <tr key={i} className="border-t" style={{ borderColor: 'var(--border-light)' }}>
                      <td className="px-4 py-2 font-medium truncate max-w-[160px]" style={{ color: 'var(--text-dark)' }}>{row.product?.name}</td>
                      <td className="px-4 py-2" style={{ color: 'var(--text-faint)' }}>{row.product?.therapeutic_class}</td>
                      <td className="px-4 py-2 font-mono">{row.quantity}</td>
                      <td className="px-4 py-2"><StockBadge level={row.level} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sellers panel */}
          <div className="bg-white rounded-[12px] border p-4" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-4 h-4" style={{ color: 'var(--forest)' }} />
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>Vendedores</h3>
            </div>
            <div className="space-y-3">
              {sellers.map(({ seller }) => (
                <div key={seller.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: 'var(--forest)' }}>
                    {seller.user?.name?.split(' ').map((n: string) => n[0]).slice(0, 2).join('') ?? 'V'}
                  </div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: 'var(--text-dark)' }}>{seller.user?.name}</p>
                    <p className="text-[10px]" style={{ color: 'var(--text-faint)' }}>{seller.territory}</p>
                  </div>
                </div>
              ))}
              {sellers.length === 0 && <p className="text-xs" style={{ color: 'var(--text-faint)' }}>Sin vendedores asignados</p>}
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
