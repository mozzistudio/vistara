'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface ChartVisitsPerRepProps {
  data?: { rep: string; count: number }[]
}

export default function ChartVisitsPerRep({ data }: ChartVisitsPerRepProps) {
  const chartData = data && data.length > 0 ? data : []

  if (chartData.length === 0) {
    return (
      <div
        className="rounded-xl p-5 h-[350px] flex items-center justify-center"
        style={{
          background: '#111827',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <p className="text-[#94A3B8] text-sm">Sin datos de visitas por rep</p>
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
        Visitas por Rep
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />
          <XAxis
            dataKey="rep"
            tick={{ fill: '#94A3B8', fontSize: 11 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#94A3B8', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: '#1A2236',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              color: '#F8FAFC',
              fontSize: 12,
            }}
          />
          <Bar
            dataKey="count"
            fill="#22D3EE"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
