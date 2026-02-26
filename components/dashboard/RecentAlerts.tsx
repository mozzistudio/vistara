import Link from 'next/link'
import { AlertTriangle, Package } from 'lucide-react'
import type { StockAlert } from '@/types'

interface RecentAlertsProps {
  alerts: StockAlert[]
}

export function RecentAlerts({ alerts }: RecentAlertsProps) {
  return (
    <div
      className="bg-white rounded-[12px] border p-5"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-dark)' }}>
          Alertas de Stock
        </h3>
        <Link
          href="/stock"
          className="text-[11px] font-medium hover:underline"
          style={{ color: 'var(--forest)' }}
        >
          Ver todas →
        </Link>
      </div>

      {alerts.length === 0 ? (
        <p className="text-xs py-4 text-center" style={{ color: 'var(--text-faint)' }}>
          Sin alertas activas
        </p>
      ) : (
        <div className="space-y-2">
          {alerts.slice(0, 6).map(alert => (
            <div
              key={alert.id}
              className="flex items-center gap-3 px-3 py-2 rounded-[10px]"
              style={{
                background: alert.level === 'RUPTURA' ? 'rgba(239,68,68,0.05)' : 'rgba(245,158,11,0.05)',
                borderLeft: `2px solid ${alert.level === 'RUPTURA' ? 'var(--alert)' : 'var(--warning)'}`,
              }}
            >
              <AlertTriangle
                className="w-3.5 h-3.5 flex-shrink-0"
                style={{ color: alert.level === 'RUPTURA' ? 'var(--alert)' : 'var(--warning)' }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate" style={{ color: 'var(--text-dark)' }}>
                  {alert.product_name}
                </p>
                <p className="text-[11px] truncate" style={{ color: 'var(--text-faint)' }}>
                  {alert.pharmacy_name} · {alert.quantity} uds
                </p>
              </div>
              <span
                className={alert.level === 'RUPTURA' ? 'badge-ruptura' : 'badge-bajo'}
              >
                {alert.level}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
