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

interface ChartProductsProps {
  data?: { product: string; count: number }[]
}

export default function ChartProducts({ data }: ChartProductsProps) {
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
          Sin datos de productos discutidos
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
        Productos Discutidos
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            horizontal={false}
          />
          <XAxis
            type="number"
            tick={{ fill: '#94A3B8', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="product"
            tick={{ fill: '#94A3B8', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={90}
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
            fill="#8B5CF6"
            radius={[0, 4, 4, 0]}
            maxBarSize={24}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
