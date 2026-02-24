'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

interface ChartRatingsProps {
  data?: { rating: number; count: number }[]
}

const RATING_COLORS: Record<number, string> = {
  5: '#22D3EE',
  4: '#8B5CF6',
  3: '#34D399',
  2: '#FB923C',
  1: '#EF4444',
}

const RATING_LABELS: Record<number, string> = {
  5: 'Excelente (5)',
  4: 'Bueno (4)',
  3: 'Regular (3)',
  2: 'Bajo (2)',
  1: 'Malo (1)',
}

export default function ChartRatings({ data }: ChartRatingsProps) {
  const chartData =
    data && data.length > 0
      ? data.map((d) => ({
          ...d,
          name: RATING_LABELS[d.rating] || `Rating ${d.rating}`,
        }))
      : []

  if (chartData.length === 0) {
    return (
      <div
        className="rounded-xl p-5 h-[350px] flex items-center justify-center"
        style={{
          background: '#111827',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <p className="text-[#94A3B8] text-sm">
          Sin datos de calificaciones
        </p>
      </div>
    )
  }

  return (
    <div
      className="rounded-xl p-5"
      style={{
        background: '#111827',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <h3
        className="text-sm font-bold text-[#F8FAFC] mb-4"
        style={{ fontFamily: 'var(--font-syne)' }}
      >
        Distribución de Calificaciones
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={3}
            dataKey="count"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={RATING_COLORS[entry.rating] || '#94A3B8'}
                strokeWidth={0}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: '#1A2236',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              color: '#F8FAFC',
              fontSize: 12,
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: 11, color: '#94A3B8' }}
            formatter={(value: string) => (
              <span style={{ color: '#94A3B8' }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
