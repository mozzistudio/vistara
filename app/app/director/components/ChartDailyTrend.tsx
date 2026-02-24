'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'

interface ChartDailyTrendProps {
  data?: { date: string; count: number }[]
}

export default function ChartDailyTrend({ data }: ChartDailyTrendProps) {
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
        <p className="text-[#94A3B8] text-sm">Sin datos de tendencia diaria</p>
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
        Tendencia Diaria
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart
          data={chartData}
          margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
        >
          <defs>
            <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />
          <XAxis
            dataKey="date"
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
          <Area
            type="monotone"
            dataKey="count"
            stroke="#22D3EE"
            strokeWidth={2}
            fill="url(#cyanGradient)"
            dot={{ fill: '#22D3EE', strokeWidth: 0, r: 3 }}
            activeDot={{ r: 5, fill: '#22D3EE', strokeWidth: 2, stroke: '#0A0E17' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
