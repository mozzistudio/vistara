'use client'

import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { TopBar } from '@/components/layout/TopBar'
import { SalesChart } from '@/components/dashboard/SalesChart'
import { formatCurrency, formatNumber } from '@/lib/utils/formatters'
import { ShoppingCart, TrendingUp, Package, Filter } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────
interface SaleRow {
  id: string
  date: string
  product_id: string
  product_name: string
  pharmacy_id: string
  pharmacy_name: string
  pharmacy_region: string
  seller_id: string
  quantity: number
  revenue: number
}

// ─── Constants ────────────────────────────────────────────────────────────────
const PRESETS = [
  { label: '7 días',  from: '2025-06-24', to: '2025-06-30' },
  { label: '30 días', from: '2025-06-01', to: '2025-06-30' },
  { label: '90 días', from: '2025-04-01', to: '2025-06-30' },
  { label: 'H1 2025', from: '2025-01-01', to: '2025-06-30' },
]

const SELLER_NAMES: Record<string, string> = {
  's-v1-1': 'Ana García',
  's-v1-2': 'Carlos Mendoza',
  's-v1-3': 'Luis Rodríguez',
  's-v1-4': 'Sofía Torres',
}

const REGIONS = ['Ciudad de Panamá', 'Chiriquí', 'Colón', 'Panamá Oeste']

const PAGE_SIZE = 50

export default function SalesPage() {
  const [preset, setPreset] = useState(PRESETS[3])
  const [filterSeller, setFilterSeller] = useState('')
  const [filterRegion, setFilterRegion] = useState('')
  const [page, setPage] = useState(0)

  // ── Fetch individual sale rows ────────────────────────────────────────────
  const params = new URLSearchParams({
    from: preset.from,
    to: preset.to,
    limit: '1000',
    ...(filterSeller ? { seller_id: filterSeller } : {}),
    ...(filterRegion ? { region: filterRegion } : {}),
  })
  const { data: rows = [], isLoading } = useQuery<SaleRow[]>({
    queryKey: ['sales-rows', preset.from, preset.to, filterSeller, filterRegion],
    queryFn: () => fetch(`/api/sales?${params}`).then(r => r.json()).then(r => r.data ?? []),
  })

  // ── Fetch chart data (grouped by day) ────────────────────────────────────
  const chartParams = new URLSearchParams({
    from: preset.from, to: preset.to, group_by: 'day', limit: '180',
    ...(filterSeller ? { seller_id: filterSeller } : {}),
    ...(filterRegion ? { region: filterRegion } : {}),
  })
  const { data: chartData = [] } = useQuery<{ key: string; label: string; revenue: number; units: number }[]>({
    queryKey: ['sales-chart', preset.from, preset.to, filterSeller, filterRegion],
    queryFn: () => fetch(`/api/sales?${chartParams}`).then(r => r.json()).then(r => r.data ?? []),
  })

  // ── KPIs ─────────────────────────────────────────────────────────────────
  const totalRevenue = useMemo(() => rows.reduce((s, r) => s + r.revenue, 0), [rows])
  const totalUnits   = useMemo(() => rows.reduce((s, r) => s + r.quantity, 0), [rows])
  const avgPerUnit   = totalUnits > 0 ? totalRevenue / totalUnits : 0

  // ── Pagination ────────────────────────────────────────────────────────────
  const sorted = useMemo(
    () => [...rows].sort((a, b) => b.date.localeCompare(a.date)),
    [rows]
  )
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE)
  const pageRows   = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  // Reset page when filters change
  const handlePreset = (p: typeof preset) => { setPreset(p); setPage(0) }
  const handleSeller = (v: string) => { setFilterSeller(v); setPage(0) }
  const handleRegion = (v: string) => { setFilterRegion(v); setPage(0) }

  return (
    <>
      <TopBar title="Ventas" subtitle="Historial de transacciones" />
      <div className="p-6 space-y-5">

        {/* ── Filter bar ─────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Date presets */}
          <div className="flex gap-1.5">
            {PRESETS.map(p => (
              <button
                key={p.label}
                onClick={() => handlePreset(p)}
                className="px-3 py-1.5 rounded-[8px] text-xs font-semibold transition-colors"
                style={{
                  background: preset.label === p.label ? 'var(--forest)' : 'white',
                  color: preset.label === p.label ? 'white' : 'var(--text-muted)',
                  border: `1px solid ${preset.label === p.label ? 'var(--forest)' : 'var(--border)'}`,
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="w-px h-5" style={{ background: 'var(--border)' }} />

          {/* Vendedor select */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--text-faint)' }} />
            <select
              value={filterSeller}
              onChange={e => handleSeller(e.target.value)}
              className="text-xs py-1.5 pl-2 pr-6 rounded-[8px] border outline-none appearance-none"
              style={{ background: 'white', borderColor: 'var(--border)', color: filterSeller ? 'var(--text-dark)' : 'var(--text-faint)' }}
            >
              <option value="">Todos los vendedores</option>
              {Object.entries(SELLER_NAMES).map(([id, name]) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
          </div>

          {/* Región select */}
          <div>
            <select
              value={filterRegion}
              onChange={e => handleRegion(e.target.value)}
              className="text-xs py-1.5 pl-2 pr-6 rounded-[8px] border outline-none appearance-none"
              style={{ background: 'white', borderColor: 'var(--border)', color: filterRegion ? 'var(--text-dark)' : 'var(--text-faint)' }}
            >
              <option value="">Todas las regiones</option>
              {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <span className="ml-auto font-mono text-[11px]" style={{ color: 'var(--text-faint)' }}>
            {rows.length.toLocaleString()} transacciones
          </span>
        </div>

        {/* ── KPI cards ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Ingresos Totales',     value: formatCurrency(totalRevenue), icon: TrendingUp,   color: 'var(--forest)' },
            { label: 'Unidades Vendidas',    value: formatNumber(totalUnits),     icon: Package,      color: 'var(--forest)' },
            { label: 'Transacciones',        value: formatNumber(rows.length),    icon: ShoppingCart, color: 'var(--forest)' },
            { label: 'Precio Medio/Unidad',  value: formatCurrency(avgPerUnit),   icon: TrendingUp,   color: 'var(--forest)' },
          ].map(kpi => {
            const Icon = kpi.icon
            return (
              <div key={kpi.label} className="bg-white rounded-[12px] border p-4 flex gap-3 items-start" style={{ borderColor: 'var(--border)' }}>
                <div className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0" style={{ background: 'var(--mint-light)' }}>
                  <Icon className="w-4 h-4" style={{ color: kpi.color }} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wide font-mono mb-1" style={{ color: 'var(--text-faint)' }}>{kpi.label}</p>
                  <p className="font-display font-bold text-xl" style={{ color: 'var(--text-dark)' }}>{isLoading ? '—' : kpi.value}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Chart ──────────────────────────────────────────────────────── */}
        <SalesChart data={chartData} title={`Ventas Diarias — ${preset.label}`} />

        {/* ── Sales table ────────────────────────────────────────────────── */}
        <div className="bg-white rounded-[12px] border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-light)' }}>
            <h3 className="text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>Transacciones</h3>
            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="text-xs px-2.5 py-1 rounded-[6px] border disabled:opacity-40"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                >
                  ← Anterior
                </button>
                <span className="font-mono text-[11px]" style={{ color: 'var(--text-faint)' }}>
                  {page + 1} / {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                  disabled={page === totalPages - 1}
                  className="text-xs px-2.5 py-1 rounded-[6px] border disabled:opacity-40"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
                >
                  Siguiente →
                </button>
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead style={{ background: 'var(--mint-paper)' }}>
                <tr>
                  {['Fecha', 'Producto', 'Farmacia', 'Región', 'Vendedor', 'Unidades', 'Ingresos'].map(h => (
                    <th key={h} className="text-left px-4 py-2.5 font-mono text-[10px] uppercase tracking-wide whitespace-nowrap" style={{ color: 'var(--text-faint)' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <tr key={i} className="border-t" style={{ borderColor: 'var(--border-light)' }}>
                      {Array.from({ length: 7 }).map((__, j) => (
                        <td key={j} className="px-4 py-3">
                          <div className="h-3 rounded animate-pulse" style={{ background: 'var(--border)', width: j === 0 ? '70px' : '90px' }} />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : pageRows.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-10 text-center text-xs" style={{ color: 'var(--text-faint)' }}>
                      Sin transacciones para el período seleccionado
                    </td>
                  </tr>
                ) : (
                  pageRows.map(row => (
                    <tr key={row.id} className="border-t hover:bg-[var(--mint-paper)] transition-colors" style={{ borderColor: 'var(--border-light)' }}>
                      <td className="px-4 py-2.5 font-mono text-[11px]" style={{ color: 'var(--text-faint)' }}>
                        {row.date}
                      </td>
                      <td className="px-4 py-2.5 font-medium max-w-[140px] truncate" style={{ color: 'var(--text-dark)' }}>
                        {row.product_name}
                      </td>
                      <td className="px-4 py-2.5 max-w-[160px] truncate" style={{ color: 'var(--text-muted)' }}>
                        {row.pharmacy_name}
                      </td>
                      <td className="px-4 py-2.5 whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
                        {row.pharmacy_region}
                      </td>
                      <td className="px-4 py-2.5 whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
                        {SELLER_NAMES[row.seller_id] ?? row.seller_id}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-right pr-6" style={{ color: 'var(--text-dark)' }}>
                        {row.quantity}
                      </td>
                      <td className="px-4 py-2.5 font-mono font-semibold text-right pr-4" style={{ color: 'var(--forest)' }}>
                        {formatCurrency(row.revenue)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  )
}
