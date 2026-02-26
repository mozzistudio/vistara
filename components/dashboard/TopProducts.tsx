import { formatCurrency } from '@/lib/utils/formatters'
import Link from 'next/link'

interface TopProductsProps {
  data: { key: string; label: string; revenue: number; units: number }[]
}

export function TopProducts({ data }: TopProductsProps) {
  const maxRevenue = Math.max(...data.map(d => d.revenue), 1)

  return (
    <div
      className="bg-white rounded-[12px] border p-5"
      style={{ borderColor: 'var(--border)' }}
    >
      <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-dark)' }}>
        Top Productos por Ingresos
      </h3>
      <div className="space-y-3">
        {data.slice(0, 8).map((item, i) => (
          <div key={item.key} className="flex items-center gap-3">
            <span
              className="font-mono text-[10px] w-4 text-right flex-shrink-0"
              style={{ color: 'var(--text-faint)' }}
            >
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium truncate" style={{ color: 'var(--text-dark)' }}>
                  {item.label}
                </span>
                <span
                  className="font-mono text-[11px] ml-2 flex-shrink-0"
                  style={{ color: 'var(--text-faint)' }}
                >
                  {formatCurrency(item.revenue)}
                </span>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ background: 'var(--border)' }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(item.revenue / maxRevenue) * 100}%`,
                    background: i === 0 ? 'var(--forest)' : i < 3 ? 'var(--leaf)' : 'var(--border)',
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
