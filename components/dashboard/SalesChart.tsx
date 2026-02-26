'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency, formatShortDate } from '@/lib/utils/formatters'

interface DataPoint {
  key: string
  label: string
  revenue: number
  units: number
}

interface SalesChartProps {
  data: DataPoint[]
  title?: string
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (!active || !payload?.length) return null
  return (
    <div
      className="rounded-[10px] px-3 py-2.5 shadow-lg border text-xs"
      style={{ background: 'var(--deep)', borderColor: 'rgba(110,231,160,0.2)', color: 'white' }}
    >
      <p className="font-mono text-[10px] mb-1" style={{ color: 'var(--neon-mint)' }}>{label}</p>
      <p className="font-semibold">{formatCurrency(payload[0]?.value ?? 0)}</p>
    </div>
  )
}

export function SalesChart({ data, title }: SalesChartProps) {
  const chartData = data.map(d => ({
    date: formatShortDate(d.key),
    revenue: Math.round(d.revenue),
  }))

  return (
    <div
      className="bg-white rounded-[12px] border p-5"
      style={{ borderColor: 'var(--border)' }}
    >
      {title && (
        <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-dark)' }}>
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="forestGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2D7A4F" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#2D7A4F" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: 'var(--text-faint)', fontFamily: 'var(--font-ibm-mono)' }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 10, fill: 'var(--text-faint)', fontFamily: 'var(--font-ibm-mono)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#2D7A4F"
            strokeWidth={2}
            fill="url(#forestGradient)"
            dot={false}
            activeDot={{ r: 4, fill: '#2D7A4F' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
