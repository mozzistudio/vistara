'use client'

interface KPICardProps {
  icon: string
  label: string
  value: string | number
  delta?: number
  comparison?: string
}

export default function KPICard({
  icon,
  label,
  value,
  delta,
  comparison,
}: KPICardProps) {
  const isPositive = delta !== undefined && delta >= 0

  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-3 transition-all duration-200 hover:scale-[1.02]"
      style={{
        background: '#111827',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xl">{icon}</span>
        {delta !== undefined && (
          <span
            className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
              isPositive
                ? 'text-[#34D399] bg-[rgba(52,211,153,0.1)]'
                : 'text-[#EF4444] bg-[rgba(239,68,68,0.1)]'
            }`}
          >
            <span>{isPositive ? '▲' : '▼'}</span>
            <span>{Math.abs(delta)}%</span>
          </span>
        )}
      </div>
      <div>
        <p className="text-[#94A3B8] text-xs mb-1">{label}</p>
        <p
          className="text-2xl font-bold text-[#F8FAFC]"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          {value}
        </p>
      </div>
      {comparison && (
        <p className="text-[10px] text-[#94A3B8]">{comparison}</p>
      )}
    </div>
  )
}
