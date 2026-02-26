import { notFound } from 'next/navigation'
import { getSellerById, getSellerPerformance } from '@/lib/supabase/queries/sellers'
import { getSalesData } from '@/lib/supabase/queries/sales'
import { MOCK_PHARMACIES } from '@/lib/supabase/queries/mock-data'
import { TopBar } from '@/components/layout/TopBar'
import { SalesChart } from '@/components/dashboard/SalesChart'
import { formatCurrency, formatDate } from '@/lib/utils/formatters'
import { Users, MapPin, Briefcase, Building2, Calendar } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function SellerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [seller, perf, salesData] = await Promise.all([
    getSellerById(id).catch(() => null),
    getSellerPerformance(id, '2025-01-01', '2025-06-30'),
    getSalesData({ seller_id: id, date_from: '2025-01-01', date_to: '2025-06-30', group_by: 'day', limit: 180 }),
  ])

  if (!seller) notFound()

  // Visit logs — mock data (visit_logs table not yet migrated)
  const visitLogs = Array.from({ length: 6 }, (_, i) => ({
    id: `vl-${i}`,
    visit_date: `2025-0${6 - i}-${String(10 + i).padStart(2, '0')}`,
    outcome: ['Pedido realizado', 'Seguimiento pendiente', 'Stock revisado'][i % 3],
    pharmacy: { name: MOCK_PHARMACIES[i % MOCK_PHARMACIES.length].name, region: MOCK_PHARMACIES[i % MOCK_PHARMACIES.length].region },
  }))

  const performance = perf[0]
  const pct = performance?.performance_pct ?? 0
  const pharmacies = (seller.seller_pharmacies as unknown as { pharmacy: { id: string; name: string; region: string; type: string; tier: string; address: string } }[]) ?? []

  return (
    <>
      <TopBar title={(seller.user as { name?: string } | null)?.name ?? 'Vendedor'} subtitle={`${seller.territory} · ${seller.employee_code}`} />
      <div className="p-6 space-y-6">

        {/* Header */}
        <div className="bg-white rounded-[16px] border p-6 flex items-center gap-5" style={{ borderColor: 'var(--border)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ background: 'var(--forest)' }}>
            {(seller.user as { name?: string } | null)?.name?.split(' ').map((n: string) => n[0]).slice(0, 2).join('') ?? 'V'}
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl" style={{ color: 'var(--text-dark)' }}>
              {(seller.user as { name?: string } | null)?.name}
            </h1>
            <div className="flex items-center gap-4 mt-2">
              {[
                { icon: Briefcase, value: seller.employee_code },
                { icon: MapPin, value: seller.territory },
                { icon: Calendar, value: `Desde ${formatDate(seller.hire_date)}` },
              ].map(({ icon: Icon, value }) => (
                <div key={value} className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5" style={{ color: 'var(--text-faint)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Objetivo Mensual', value: formatCurrency(seller.target_monthly) },
            { label: 'Ingresos H1 2025', value: formatCurrency(performance?.actual_revenue ?? 0) },
            { label: '% Cumplimiento', value: `${pct.toFixed(1)}%`, color: pct >= 100 ? 'var(--success)' : pct >= 75 ? 'var(--warning)' : 'var(--alert)' },
            { label: 'Visitas H1 2025', value: String(performance?.visit_count ?? 0) },
          ].map(kpi => (
            <div key={kpi.label} className="bg-white rounded-[12px] border p-4" style={{ borderColor: 'var(--border)' }}>
              <p className="text-[10px] uppercase tracking-wide font-mono mb-2" style={{ color: 'var(--text-faint)' }}>{kpi.label}</p>
              <p className="font-display font-bold text-2xl" style={{ color: kpi.color ?? 'var(--text-dark)' }}>{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Sales chart */}
        <SalesChart data={salesData as { key: string; label: string; revenue: number; units: number }[]} title="Ventas Diarias (Ene–Jun 2025)" />

        {/* Pharmacies & Visits row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Assigned pharmacies */}
          <div className="bg-white rounded-[12px] border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
            <div className="px-5 py-4 border-b flex items-center gap-2" style={{ borderColor: 'var(--border-light)' }}>
              <Building2 className="w-4 h-4" style={{ color: 'var(--forest)' }} />
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>Farmacias Asignadas</h3>
            </div>
            <div className="overflow-auto max-h-64">
              {pharmacies.map(({ pharmacy }) => (
                <div key={pharmacy.id} className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: 'var(--border-light)' }}>
                  <Building2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--text-faint)' }} />
                  <div>
                    <p className="text-xs font-medium" style={{ color: 'var(--text-dark)' }}>{pharmacy.name}</p>
                    <p className="text-[10px]" style={{ color: 'var(--text-faint)' }}>{pharmacy.region}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent visits */}
          <div className="bg-white rounded-[12px] border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
            <div className="px-5 py-4 border-b flex items-center gap-2" style={{ borderColor: 'var(--border-light)' }}>
              <Calendar className="w-4 h-4" style={{ color: 'var(--forest)' }} />
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>Visitas Recientes</h3>
            </div>
            <div className="overflow-auto max-h-64">
              {(visitLogs ?? []).map(visit => (
                <div key={visit.id} className="px-4 py-3 border-b" style={{ borderColor: 'var(--border-light)' }}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-medium" style={{ color: 'var(--text-dark)' }}>
                      {(visit.pharmacy as { name?: string } | null)?.name}
                    </span>
                    <span className="font-mono text-[10px]" style={{ color: 'var(--text-faint)' }}>{visit.visit_date}</span>
                  </div>
                  {visit.outcome && <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{visit.outcome}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
