'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { TopBar } from '@/components/layout/TopBar'
import { KpiCard } from '@/components/dashboard/KpiCard'
import { SalesChart } from '@/components/dashboard/SalesChart'
import { TopProducts } from '@/components/dashboard/TopProducts'
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils/formatters'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const PRESETS = [
  { label: '7 días', from: '2025-06-24', to: '2025-06-30' },
  { label: '30 días', from: '2025-06-01', to: '2025-06-30' },
  { label: '90 días', from: '2025-04-01', to: '2025-06-30' },
  { label: 'H1 2025', from: '2025-01-01', to: '2025-06-30' },
]

interface AnalyticsData {
  kpis: { totalRevenue: number; totalUnits: number; revenueGrowth: number; stockAlerts: number }
  dailySales: { key: string; label: string; revenue: number; units: number }[]
  topProducts: { key: string; label: string; revenue: number; units: number }[]
  topPharmacies: { key: string; label: string; revenue: number; units: number }[]
  topRegions: { key: string; label: string; revenue: number; units: number }[]
  sellerPerf: { seller_name: string; actual_revenue: number; target_monthly: number; performance_pct: number; region: string }[]
}

const REGION_COLORS = ['#2D7A4F', '#A3D9B5', '#6EE7A0', '#16A34A', '#F59E0B']

export default function AnalyticsPage() {
  const [preset, setPreset] = useState(PRESETS[3])

  const { data, isLoading } = useQuery<AnalyticsData>({
    queryKey: ['analytics', preset.from, preset.to],
    queryFn: () => fetch(`/api/analytics?from=${preset.from}&to=${preset.to}`).then(r => r.json()).then(r => r.data),
  })

  const kpis = data?.kpis
  const days = Math.max(1, (new Date(preset.to).getTime() - new Date(preset.from).getTime()) / 86400000)
  const avgPerDay = kpis ? kpis.totalRevenue / days : 0

  return (
    <>
      <TopBar title="Analíticas" subtitle="Inteligencia de ventas" />
      <div className="p-6 space-y-6">

        {/* Period selector */}
        <div className="flex gap-2">
          {PRESETS.map(p => (
            <button
              key={p.label}
              onClick={() => setPreset(p)}
              className="px-4 py-2 rounded-[10px] text-xs font-semibold transition-colors"
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

        {/* KPI Row */}
        <div className="grid grid-cols-4 gap-4">
          <KpiCard label="Ingresos Totales" value={kpis ? formatCurrency(kpis.totalRevenue) : '—'} change={kpis ? formatPercent(kpis.revenueGrowth) + ' vs período anterior' : ''} changePositive={kpis ? kpis.revenueGrowth >= 0 : true} />
          <KpiCard label="Unidades Vendidas" value={kpis ? formatNumber(kpis.totalUnits) : '—'} />
          <KpiCard label="Promedio por Día" value={kpis ? formatCurrency(avgPerDay) : '—'} />
          <KpiCard label="Alertas Stock" value={kpis ? String(kpis.stockAlerts) : '—'} alert={!!kpis && kpis.stockAlerts > 0} />
        </div>

        {/* Main sales chart */}
        {data?.dailySales && (
          <SalesChart data={data.dailySales} title={`Ventas Diarias — ${preset.label}`} />
        )}

        {/* Top Products + Pharmacies */}
        <div className="grid grid-cols-2 gap-4">
          {data?.topProducts && <TopProducts data={data.topProducts} />}
          {data?.topPharmacies && (
            <div className="bg-white rounded-[12px] border p-5" style={{ borderColor: 'var(--border)' }}>
              <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-dark)' }}>Top Farmacias por Ingresos</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data.topPharmacies.slice(0, 8)} layout="vertical" margin={{ left: -10, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--text-faint)', fontFamily: 'var(--font-ibm-mono)' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                  <YAxis type="category" dataKey="label" tick={{ fontSize: 9, fill: 'var(--text-faint)' }} axisLine={false} tickLine={false} width={120} />
                  <Tooltip formatter={(v: number) => formatCurrency(v)} />
                  <Bar dataKey="revenue" fill="var(--leaf)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Regions + Seller table */}
        <div className="grid grid-cols-3 gap-4">
          {/* Region donut */}
          {data?.topRegions && (
            <div className="bg-white rounded-[12px] border p-5" style={{ borderColor: 'var(--border)' }}>
              <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-dark)' }}>Ventas por Región</h3>
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie data={data.topRegions} dataKey="revenue" nameKey="label" cx="50%" cy="50%" innerRadius={40} outerRadius={60}>
                    {data.topRegions.map((_, i) => <Cell key={i} fill={REGION_COLORS[i % REGION_COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => formatCurrency(v)} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 mt-2">
                {data.topRegions.slice(0, 5).map((r, i) => (
                  <div key={r.key} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ background: REGION_COLORS[i % REGION_COLORS.length] }} />
                      <span style={{ color: 'var(--text-muted)' }}>{r.label}</span>
                    </div>
                    <span className="font-mono text-[11px]" style={{ color: 'var(--text-faint)' }}>{formatCurrency(r.revenue)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Seller performance table */}
          {data?.sellerPerf && (
            <div className="col-span-2 bg-white rounded-[12px] border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
              <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--border-light)' }}>
                <h3 className="text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>Rendimiento de Vendedores</h3>
              </div>
              <table className="w-full text-xs">
                <thead style={{ background: 'var(--mint-paper)' }}>
                  <tr>
                    {['#', 'Vendedor', 'Región', 'Ingresos', 'Objetivo', '% Cumpl.'].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 font-mono text-[10px] uppercase tracking-wide" style={{ color: 'var(--text-faint)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.sellerPerf.sort((a, b) => b.actual_revenue - a.actual_revenue).map((s, i) => (
                    <tr key={s.seller_name} className="border-t" style={{ borderColor: 'var(--border-light)' }}>
                      <td className="px-4 py-2.5 font-mono text-[10px]" style={{ color: 'var(--text-faint)' }}>{i + 1}</td>
                      <td className="px-4 py-2.5 font-medium" style={{ color: 'var(--text-dark)' }}>{s.seller_name}</td>
                      <td className="px-4 py-2.5" style={{ color: 'var(--text-muted)' }}>{s.region}</td>
                      <td className="px-4 py-2.5 font-mono">{formatCurrency(s.actual_revenue)}</td>
                      <td className="px-4 py-2.5 font-mono" style={{ color: 'var(--text-faint)' }}>{formatCurrency(s.target_monthly)}</td>
                      <td className="px-4 py-2.5">
                        <span style={{ color: s.performance_pct >= 100 ? 'var(--success)' : s.performance_pct >= 75 ? 'var(--warning)' : 'var(--alert)' }} className="font-semibold">
                          {s.performance_pct.toFixed(0)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {isLoading && (
          <div className="text-center py-8">
            <p style={{ color: 'var(--text-faint)' }}>Cargando datos analíticos...</p>
          </div>
        )}

      </div>
    </>
  )
}
