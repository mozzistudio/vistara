import { getAllSellers } from '@/lib/supabase/queries/sellers'
import { getSellerPerformance } from '@/lib/supabase/queries/sellers'
import { TopBar } from '@/components/layout/TopBar'
import Link from 'next/link'
import { formatCurrency, formatPercent } from '@/lib/utils/formatters'
import { Users, MapPin, Target, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export const dynamic = 'force-dynamic'

export default async function SellersPage() {
  const [sellers, performance] = await Promise.all([
    getAllSellers(),
    getSellerPerformance(undefined, '2025-01-01', '2025-06-30'),
  ])

  const perfMap = new Map(performance.map(p => [p.seller_id, p]))

  return (
    <>
      <TopBar title="Vendedores" subtitle={`${sellers.length} representantes activos`} />
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {sellers.map(seller => {
            const perf = perfMap.get(seller.id)
            const pct = perf?.performance_pct ?? 0

            return (
              <Link
                key={seller.id}
                href={`/sellers/${seller.id}`}
                className="bg-white rounded-[12px] border p-5 hover:shadow-md transition-all hover:border-[var(--leaf)] group"
                style={{ borderColor: 'var(--border)' }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0"
                    style={{ background: 'var(--forest)' }}
                  >
                    {(seller.user as { name?: string } | null)?.name?.split(' ').map((n: string) => n[0]).slice(0, 2).join('') ?? 'V'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-sm" style={{ color: 'var(--text-dark)' }}>
                          {(seller.user as { name?: string } | null)?.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <MapPin className="w-3 h-3" style={{ color: 'var(--text-faint)' }} />
                          <span className="text-[11px]" style={{ color: 'var(--text-faint)' }}>{seller.territory}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text-faint)' }} />
                    </div>

                    {/* Performance bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono flex items-center gap-1" style={{ color: 'var(--text-faint)' }}>
                          <Target className="w-3 h-3" />
                          {perf ? formatCurrency(perf.actual_revenue) : '$0'} / {formatCurrency(seller.target_monthly)}
                        </span>
                        <span
                          className={cn('text-[11px] font-semibold')}
                          style={{ color: pct >= 100 ? 'var(--success)' : pct >= 75 ? 'var(--warning)' : 'var(--alert)' }}
                        >
                          {pct.toFixed(0)}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{
                            width: `${Math.min(100, pct)}%`,
                            background: pct >= 100 ? 'var(--success)' : pct >= 75 ? 'var(--warning)' : 'var(--alert)',
                          }}
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-4 mt-3">
                      {[
                        { label: 'Visitas', value: perf?.visit_count ?? 0 },
                        { label: 'Farmacias', value: perf?.pharmacy_count ?? 0 },
                        { label: 'Región', value: seller.region },
                      ].map(stat => (
                        <div key={stat.label}>
                          <p className="text-[10px]" style={{ color: 'var(--text-faint)' }}>{stat.label}</p>
                          <p className="font-mono text-xs font-medium" style={{ color: 'var(--text-dark)' }}>{stat.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
