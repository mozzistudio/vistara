'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

interface CoverageRow {
  territory: string
  a: number
  b: number
  c: number
}

interface ChartCoverageProps {
  data?: CoverageRow[]
}

const FALLBACK_DATA: CoverageRow[] = [
  { territory: 'Zona Norte', a: 85, b: 72, c: 45 },
  { territory: 'Zona Sur', a: 78, b: 65, c: 52 },
  { territory: 'Centro', a: 92, b: 80, c: 60 },
  { territory: 'Oeste', a: 70, b: 58, c: 40 },
  { territory: 'Este', a: 88, b: 75, c: 48 },
]

export default function ChartCoverage({ data }: ChartCoverageProps) {
  const chartData = data && data.length > 0 ? data : FALLBACK_DATA

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
        Cobertura por Segmento
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
            dataKey="territory"
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
          <Legend
            wrapperStyle={{ fontSize: 11, color: '#94A3B8' }}
            formatter={(value: string) => (
              <span style={{ color: '#94A3B8' }}>Segmento {value.toUpperCase()}</span>
            )}
          />
          <Bar dataKey="a" stackId="stack" fill="#22D3EE" radius={[0, 0, 0, 0]} />
          <Bar dataKey="b" stackId="stack" fill="#8B5CF6" radius={[0, 0, 0, 0]} />
          <Bar
            dataKey="c"
            stackId="stack"
            fill="#34D399"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
