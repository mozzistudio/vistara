'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface ChartOptScoreProps {
  data?: { date: string; score: number }[]
}

export default function ChartOptScore({ data }: ChartOptScoreProps) {
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
        <p className="text-[#94A3B8] text-sm">
          Sin datos de score de optimización
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
        Score Optimización de Ruta
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart
          data={chartData}
          margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
        >
          <defs>
            <linearGradient id="optScoreGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="optScoreStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="#8B5CF6" />
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
            domain={[0, 100]}
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
            formatter={(value) => [`${value}%`, 'Score']}
          />
          <Area
            type="monotone"
            dataKey="score"
            stroke="url(#optScoreStroke)"
            strokeWidth={2}
            fill="url(#optScoreGradient)"
            dot={{ fill: '#8B5CF6', strokeWidth: 0, r: 3 }}
            activeDot={{
              r: 5,
              fill: '#8B5CF6',
              strokeWidth: 2,
              stroke: '#0A0E17',
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
