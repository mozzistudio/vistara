'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface StockDistributionProps {
  data: { ALTO: number; MEDIO: number; BAJO: number; RUPTURA: number }
}

const COLORS = {
  ALTO: '#16A34A',
  MEDIO: '#F59E0B',
  BAJO: '#EF4444',
  RUPTURA: '#991B1B',
}

const LABELS = {
  ALTO: 'Alto',
  MEDIO: 'Medio',
  BAJO: 'Bajo',
  RUPTURA: 'Ruptura',
}

export function StockDistribution({ data }: StockDistributionProps) {
  const total = Object.values(data).reduce((s, v) => s + v, 0)
  const chartData = Object.entries(data).map(([key, value]) => ({
    name: LABELS[key as keyof typeof LABELS],
    value,
    color: COLORS[key as keyof typeof COLORS],
    pct: total > 0 ? Math.round((value / total) * 100) : 0,
  }))

  return (
    <div
      className="bg-white rounded-[12px] border p-5"
      style={{ borderColor: 'var(--border)' }}
    >
      <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-dark)' }}>
        Distribución de Stock
      </h3>
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={65}
            paddingAngle={3}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [`${value} productos`, name]}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="space-y-1.5 mt-2">
        {chartData.map(item => (
          <div key={item.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
              <span style={{ color: 'var(--text-muted)' }}>{item.name}</span>
            </div>
            <span className="font-mono text-[11px]" style={{ color: 'var(--text-faint)' }}>
              {item.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
