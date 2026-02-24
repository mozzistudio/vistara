'use client'

interface StatsBarProps {
  visitsDone?: number
  visitsTotal?: number
  avgRating?: number
  distanceKm?: number
  score?: number
}

export default function StatsBar({
  visitsDone = 4,
  visitsTotal = 5,
  avgRating = 4.2,
  distanceKm = 34,
  score = 94,
}: StatsBarProps) {
  return (
    <div
      className="h-10 shrink-0 flex items-center justify-center gap-6 text-xs font-medium border-t border-white/5"
      style={{
        background: 'rgba(17,24,39,0.9)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <span className="text-[#F8FAFC]">
        <span className="text-[#22D3EE]">{visitsDone}/{visitsTotal}</span> visitas
      </span>

      <span className="text-[#F8FAFC]/30">|</span>

      <span className="text-[#F8FAFC]">
        <span className="mr-1">&#11088;</span>
        <span className="text-[#22D3EE]">{avgRating.toFixed(1)}</span> avg
      </span>

      <span className="text-[#F8FAFC]/30">|</span>

      <span className="text-[#F8FAFC]">
        <span className="mr-1">&#128663;</span>
        <span className="text-[#22D3EE]">{distanceKm}km</span>
      </span>

      <span className="text-[#F8FAFC]/30">|</span>

      <span className="text-[#F8FAFC]">
        Score{' '}
        <span
          className={`font-bold ${
            score >= 90
              ? 'text-[#22D3EE]'
              : score >= 70
                ? 'text-yellow-400'
                : 'text-red-400'
          }`}
        >
          {score}
        </span>
      </span>
    </div>
  )
}
