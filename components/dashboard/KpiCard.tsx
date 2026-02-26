import { cn } from '@/lib/utils/cn'

interface KpiCardProps {
  label: string
  value: string
  change?: string
  changePositive?: boolean
  alert?: boolean
  icon?: React.ReactNode
}

export function KpiCard({ label, value, change, changePositive = true, alert = false, icon }: KpiCardProps) {
  return (
    <div
      className="bg-white rounded-[12px] px-5 py-4 border"
      style={{ borderColor: 'var(--border)' }}
    >
      <div className="flex items-start justify-between mb-3">
        <p
          className="text-[10px] uppercase tracking-wide font-mono"
          style={{ color: 'var(--text-faint)' }}
        >
          {label}
        </p>
        {icon && (
          <div
            className="w-8 h-8 rounded-[8px] flex items-center justify-center"
            style={{ background: 'var(--mint-light)' }}
          >
            {icon}
          </div>
        )}
      </div>
      <p
        className="font-display font-bold text-2xl leading-none mb-2"
        style={{ color: alert ? 'var(--alert)' : 'var(--text-dark)' }}
      >
        {value}
      </p>
      {change && (
        <p
          className={cn('text-[11px] font-medium')}
          style={{ color: alert ? 'var(--alert)' : changePositive ? 'var(--success)' : 'var(--alert)' }}
        >
          {change}
        </p>
      )}
    </div>
  )
}
