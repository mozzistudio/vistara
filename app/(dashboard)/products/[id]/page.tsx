import { notFound } from 'next/navigation'
import { getProductById } from '@/lib/supabase/queries/products'
import { getSalesData } from '@/lib/supabase/queries/sales'
import { TopBar } from '@/components/layout/TopBar'
import { StockBadge } from '@/components/products/StockBadge'
import { SalesChart } from '@/components/dashboard/SalesChart'
import { formatCurrency, formatNumber } from '@/lib/utils/formatters'
import { Package } from 'lucide-react'
import type { StockLevel } from '@/types'

export const dynamic = 'force-dynamic'

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [product, salesData] = await Promise.all([
    getProductById(id).catch(() => null),
    getSalesData({ product_id: id, date_from: '2025-01-01', date_to: '2025-06-30', group_by: 'day', limit: 180 }),
  ])

  if (!product) notFound()

  type StockRow = { quantity: number; level: StockLevel; min_threshold: number; last_updated: string; pharmacy: { id: string; name: string; region: string; type: string; tier: string } | null }
  const stockRows = (product.stock as unknown as StockRow[]) ?? []
  const totalStock = stockRows.reduce((s: number, x: StockRow) => s + x.quantity, 0)
  const totalRevenue = salesData.reduce((s, x) => s + ((x as { revenue?: number }).revenue ?? 0), 0)

  return (
    <>
      <TopBar title={product.name} subtitle={product.molecule} />
      <div className="p-6 space-y-6">

        {/* Header card */}
        <div
          className="bg-white rounded-[16px] border p-6 flex items-start gap-5"
          style={{ borderColor: 'var(--border)' }}
        >
          <div
            className="w-14 h-14 rounded-[12px] flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--mint-light)' }}
          >
            <Package className="w-7 h-7" style={{ color: 'var(--forest)' }} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="font-display font-bold text-2xl" style={{ color: 'var(--text-dark)' }}>
                {product.name}
              </h1>
              <span
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{ background: 'var(--mint-light)', color: 'var(--forest)' }}
              >
                {product.therapeutic_class}
              </span>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {product.molecule} · {product.dosage_form}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {product.presentations.map((p: string) => (
                <span
                  key={p}
                  className="text-[11px] px-2.5 py-1 rounded-[6px] font-mono"
                  style={{ background: 'var(--mint-bg)', color: 'var(--text-muted)' }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wide font-mono mb-1" style={{ color: 'var(--text-faint)' }}>Estado</p>
            <span className="badge-alto">{product.regulatory_status}</span>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-[12px] border p-4" style={{ borderColor: 'var(--border)' }}>
            <p className="text-[10px] uppercase tracking-wide font-mono mb-2" style={{ color: 'var(--text-faint)' }}>Stock Total Red</p>
            <p className="font-display font-bold text-2xl" style={{ color: 'var(--text-dark)' }}>{formatNumber(totalStock)}</p>
            <p className="text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>unidades en {stockRows.length} farmacias</p>
          </div>
          <div className="bg-white rounded-[12px] border p-4" style={{ borderColor: 'var(--border)' }}>
            <p className="text-[10px] uppercase tracking-wide font-mono mb-2" style={{ color: 'var(--text-faint)' }}>Ingresos H1 2025</p>
            <p className="font-display font-bold text-2xl" style={{ color: 'var(--text-dark)' }}>{formatCurrency(totalRevenue)}</p>
          </div>
          <div className="bg-white rounded-[12px] border p-4" style={{ borderColor: 'var(--border)' }}>
            <p className="text-[10px] uppercase tracking-wide font-mono mb-2" style={{ color: 'var(--text-faint)' }}>Alertas de Stock</p>
            <p className="font-display font-bold text-2xl" style={{ color: 'var(--alert)' }}>
              {stockRows.filter((s: StockRow) => s.level === 'BAJO' || s.level === 'RUPTURA').length}
            </p>
            <p className="text-[11px] mt-1" style={{ color: 'var(--alert)' }}>farmacias bajo mínimo</p>
          </div>
        </div>

        {/* Sales chart */}
        <SalesChart
          data={salesData as { key: string; label: string; revenue: number; units: number }[]}
          title="Ventas Diarias (Ene–Jun 2025)"
        />

        {/* Stock table */}
        <div className="bg-white rounded-[12px] border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border-light)' }}>
            <h3 className="text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>Stock por Farmacia</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ background: 'var(--mint-paper)' }}>
                  {['Farmacia', 'Región', 'Cantidad', 'Mín.', 'Nivel', 'Última actualización'].map(h => (
                    <th key={h} className="text-left px-4 py-2.5 font-mono text-[10px] uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stockRows.sort((a: StockRow, b: StockRow) => {
                  const order = { RUPTURA: 0, BAJO: 1, MEDIO: 2, ALTO: 3 }
                  return order[a.level] - order[b.level]
                }).map((row: StockRow, i: number) => (
                  <tr key={i} className="border-t hover:bg-mint-paper transition-colors" style={{ borderColor: 'var(--border-light)' }}>
                    <td className="px-4 py-2.5 font-medium" style={{ color: 'var(--text-dark)' }}>{row.pharmacy?.name}</td>
                    <td className="px-4 py-2.5" style={{ color: 'var(--text-muted)' }}>{row.pharmacy?.region}</td>
                    <td className="px-4 py-2.5 font-mono">{row.quantity}</td>
                    <td className="px-4 py-2.5 font-mono" style={{ color: 'var(--text-faint)' }}>{row.min_threshold}</td>
                    <td className="px-4 py-2.5"><StockBadge level={row.level} /></td>
                    <td className="px-4 py-2.5 font-mono text-[10px]" style={{ color: 'var(--text-faint)' }}>
                      {new Date(row.last_updated).toLocaleDateString('es-PA')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Clinical info */}
        {(product.indications || product.contraindications || product.interactions) && (
          <div className="grid grid-cols-3 gap-4">
            {[
              { title: 'Indicaciones', content: product.indications },
              { title: 'Contraindicaciones', content: product.contraindications },
              { title: 'Interacciones', content: product.interactions },
            ].filter(x => x.content).map(block => (
              <div key={block.title} className="bg-white rounded-[12px] border p-4" style={{ borderColor: 'var(--border)' }}>
                <h4 className="text-xs font-semibold mb-2" style={{ color: 'var(--text-dark)' }}>{block.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{block.content}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </>
  )
}
