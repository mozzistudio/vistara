'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { TopBar } from '@/components/layout/TopBar'
import { StockBadge } from '@/components/products/StockBadge'
import { formatDate } from '@/lib/utils/formatters'
import { AlertTriangle, Filter } from 'lucide-react'
import type { StockLevel } from '@/types'

interface StockAlertRow {
  id: string
  quantity: number
  level: StockLevel
  min_threshold: number
  last_updated: string
  product: { id: string; name: string; molecule: string; therapeutic_class: string }
  pharmacy: { id: string; name: string; region: string; province: string }
}

export default function StockPage() {
  const [filterRegion, setFilterRegion] = useState<string | null>(null)
  const [filterLevel, setFilterLevel] = useState<'all' | 'BAJO' | 'RUPTURA'>('all')

  const { data: alerts = [], isLoading } = useQuery<StockAlertRow[]>({
    queryKey: ['stock-alerts', filterRegion],
    queryFn: () =>
      fetch(`/api/stock?view=alerts${filterRegion ? `&region=${encodeURIComponent(filterRegion)}` : ''}`)
        .then(r => r.json())
        .then(r => r.data),
  })

  const { data: summary } = useQuery({
    queryKey: ['stock-summary'],
    queryFn: () => fetch('/api/stock?view=summary').then(r => r.json()).then(r => r.data as { ALTO: number; MEDIO: number; BAJO: number; RUPTURA: number }),
  })

  const regions = [...new Set(alerts.map(a => a.pharmacy?.region).filter(Boolean))]
  const filtered = alerts.filter(a => {
    if (filterLevel !== 'all' && a.level !== filterLevel) return false
    return true
  })

  const ruptura = alerts.filter(a => a.level === 'RUPTURA').length
  const bajo = alerts.filter(a => a.level === 'BAJO').length

  return (
    <>
      <TopBar title="Alertas de Stock" subtitle="Inventario crítico en la red" />
      <div className="p-6 space-y-5">

        {/* Alert banner */}
        {(ruptura > 0 || bajo > 0) && (
          <div
            className="flex items-center gap-3 px-5 py-4 rounded-[12px] border"
            style={{ background: 'rgba(239,68,68,0.05)', borderColor: 'rgba(239,68,68,0.2)' }}
          >
            <AlertTriangle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--alert)' }} />
            <p className="text-sm font-medium" style={{ color: 'var(--alert)' }}>
              {ruptura > 0 && `${ruptura} producto${ruptura > 1 ? 's' : ''} en RUPTURA`}
              {ruptura > 0 && bajo > 0 && ' · '}
              {bajo > 0 && `${bajo} producto${bajo > 1 ? 's' : ''} en nivel BAJO`}
              {' · '}Requieren reposición inmediata
            </p>
          </div>
        )}

        {/* Summary row */}
        {summary && (
          <div className="grid grid-cols-4 gap-3">
            {[
              { level: 'ALTO', label: 'Alto', count: summary.ALTO, color: 'var(--success)', bg: '#DCFCE7' },
              { level: 'MEDIO', label: 'Medio', count: summary.MEDIO, color: 'var(--warning)', bg: '#FFFBEB' },
              { level: 'BAJO', label: 'Bajo', count: summary.BAJO, color: 'var(--alert)', bg: '#FEF2F2' },
              { level: 'RUPTURA', label: 'Ruptura', count: summary.RUPTURA, color: '#991B1B', bg: '#FEE2E2' },
            ].map(s => (
              <div key={s.level} className="rounded-[12px] border p-4" style={{ background: s.bg, borderColor: 'var(--border)' }}>
                <p className="font-display font-bold text-2xl" style={{ color: s.color }}>{s.count}</p>
                <p className="text-xs font-semibold mt-1" style={{ color: s.color }}>{s.label}</p>
                <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>entradas de stock</p>
              </div>
            ))}
          </div>
        )}

        {/* Filters */}
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--text-faint)' }} />
          <div className="flex gap-2 flex-wrap">
            {(['all', 'BAJO', 'RUPTURA'] as const).map(l => (
              <button
                key={l}
                onClick={() => setFilterLevel(l)}
                className="text-xs px-3 py-1.5 rounded-full border font-medium transition-colors"
                style={{ background: filterLevel === l ? 'var(--forest)' : 'white', color: filterLevel === l ? 'white' : 'var(--text-muted)', borderColor: filterLevel === l ? 'var(--forest)' : 'var(--border)' }}
              >
                {l === 'all' ? 'Todos' : l}
              </button>
            ))}
            {regions.map(r => (
              <button
                key={r}
                onClick={() => setFilterRegion(filterRegion === r ? null : r)}
                className="text-xs px-3 py-1.5 rounded-full border font-medium transition-colors"
                style={{ background: filterRegion === r ? 'var(--deep)' : 'white', color: filterRegion === r ? 'white' : 'var(--text-muted)', borderColor: filterRegion === r ? 'var(--deep)' : 'var(--border)' }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Alert list */}
        <div className="bg-white rounded-[12px] border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-light)' }}>
            <h3 className="text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>
              Alertas Activas
            </h3>
            <span className="font-mono text-xs" style={{ color: 'var(--text-faint)' }}>{filtered.length} registros</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead style={{ background: 'var(--mint-paper)' }}>
                <tr>
                  {['Producto', 'Farmacia', 'Región', 'Cantidad', 'Mín.', 'Nivel', 'Última Act.', 'Acción'].map(h => (
                    <th key={h} className="text-left px-4 py-2.5 font-mono text-[10px] uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-t" style={{ borderColor: 'var(--border-light)' }}>
                      {Array.from({ length: 8 }).map((__, j) => (
                        <td key={j} className="px-4 py-3">
                          <div className="h-3 rounded animate-pulse" style={{ background: 'var(--border)' }} />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  filtered.map(alert => (
                    <tr key={alert.id} className="border-t hover:bg-mint-paper transition-colors" style={{ borderColor: 'var(--border-light)' }}>
                      <td className="px-4 py-2.5">
                        <p className="font-medium" style={{ color: 'var(--text-dark)' }}>{alert.product?.name}</p>
                        <p className="text-[10px]" style={{ color: 'var(--text-faint)' }}>{alert.product?.therapeutic_class}</p>
                      </td>
                      <td className="px-4 py-2.5 max-w-[160px]">
                        <p className="truncate" style={{ color: 'var(--text-dark)' }}>{alert.pharmacy?.name}</p>
                      </td>
                      <td className="px-4 py-2.5" style={{ color: 'var(--text-muted)' }}>{alert.pharmacy?.region}</td>
                      <td className="px-4 py-2.5 font-mono font-semibold" style={{ color: alert.level === 'RUPTURA' ? 'var(--alert)' : 'inherit' }}>
                        {alert.quantity}
                      </td>
                      <td className="px-4 py-2.5 font-mono" style={{ color: 'var(--text-faint)' }}>{alert.min_threshold}</td>
                      <td className="px-4 py-2.5"><StockBadge level={alert.level} /></td>
                      <td className="px-4 py-2.5 font-mono text-[10px]" style={{ color: 'var(--text-faint)' }}>
                        {formatDate(alert.last_updated)}
                      </td>
                      <td className="px-4 py-2.5">
                        <button
                          className="text-[10px] px-2.5 py-1 rounded-[6px] font-semibold transition-colors hover:opacity-80"
                          style={{ background: 'var(--mint-light)', color: 'var(--forest)' }}
                        >
                          Reordenar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {!isLoading && filtered.length === 0 && (
              <p className="text-center py-8 text-sm" style={{ color: 'var(--text-faint)' }}>
                Sin alertas activas para los filtros seleccionados
              </p>
            )}
          </div>
        </div>

      </div>
    </>
  )
}
