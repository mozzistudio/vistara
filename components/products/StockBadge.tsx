import type { StockLevel } from '@/types'

interface StockBadgeProps {
  level: StockLevel
  quantity?: number
}

const CONFIG = {
  ALTO: { label: 'Alto', class: 'badge-alto' },
  MEDIO: { label: 'Medio', class: 'badge-medio' },
  BAJO: { label: 'Bajo', class: 'badge-bajo' },
  RUPTURA: { label: 'Ruptura', class: 'badge-ruptura' },
}

export function StockBadge({ level, quantity }: StockBadgeProps) {
  const config = CONFIG[level]
  return (
    <span className={config.class}>
      {config.label}{quantity !== undefined ? ` · ${quantity}u` : ''}
    </span>
  )
}
