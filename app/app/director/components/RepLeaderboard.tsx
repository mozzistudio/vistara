'use client'

interface RepRow {
  name: string
  visits: number
  avgRating: number
  routeEfficiency: number
  coverageA: number
}

interface RepLeaderboardProps {
  data?: RepRow[]
}

const FALLBACK_DATA: RepRow[] = [
  { name: 'Carlos Mendoza', visits: 142, avgRating: 4.8, routeEfficiency: 94, coverageA: 98 },
  { name: 'Ana García', visits: 138, avgRating: 4.7, routeEfficiency: 91, coverageA: 95 },
  { name: 'Luis Rodríguez', visits: 125, avgRating: 4.5, routeEfficiency: 88, coverageA: 92 },
  { name: 'Sofía Torres', visits: 118, avgRating: 4.6, routeEfficiency: 85, coverageA: 90 },
  { name: 'Miguel Herrera', visits: 112, avgRating: 4.3, routeEfficiency: 82, coverageA: 87 },
  { name: 'Isabella Vargas', visits: 105, avgRating: 4.4, routeEfficiency: 80, coverageA: 85 },
]

function getRankBadge(rank: number) {
  if (rank === 1) return { bg: 'rgba(34,211,238,0.15)', color: '#22D3EE', icon: '🥇' }
  if (rank === 2) return { bg: 'rgba(139,92,246,0.15)', color: '#8B5CF6', icon: '🥈' }
  if (rank === 3) return { bg: 'rgba(52,211,153,0.15)', color: '#34D399', icon: '🥉' }
  return { bg: 'transparent', color: '#94A3B8', icon: '' }
}

export default function RepLeaderboard({ data }: RepLeaderboardProps) {
  const rows = data && data.length > 0 ? data : FALLBACK_DATA
  const sorted = [...rows].sort((a, b) => b.visits - a.visits)

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: '#111827',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="px-5 py-4 border-b border-[rgba(255,255,255,0.06)]">
        <h3
          className="text-sm font-bold text-[#F8FAFC]"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          Leaderboard de Representantes
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.06)]">
              <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider text-[#94A3B8] font-medium">
                Rank
              </th>
              <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider text-[#94A3B8] font-medium">
                Representante
              </th>
              <th className="px-5 py-3 text-right text-[10px] uppercase tracking-wider text-[#94A3B8] font-medium">
                Visitas
              </th>
              <th className="px-5 py-3 text-right text-[10px] uppercase tracking-wider text-[#94A3B8] font-medium">
                Promedio
              </th>
              <th className="px-5 py-3 text-right text-[10px] uppercase tracking-wider text-[#94A3B8] font-medium">
                Eficiencia Ruta
              </th>
              <th className="px-5 py-3 text-right text-[10px] uppercase tracking-wider text-[#94A3B8] font-medium">
                Cobertura A+
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((rep, i) => {
              const rank = i + 1
              const badge = getRankBadge(rank)

              return (
                <tr
                  key={rep.name}
                  className="border-b border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                >
                  <td className="px-5 py-3">
                    <span
                      className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold"
                      style={{
                        background: badge.bg,
                        color: badge.color,
                      }}
                    >
                      {badge.icon || rank}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-[#F8FAFC] font-medium">
                    {rep.name}
                  </td>
                  <td className="px-5 py-3 text-sm text-[#F8FAFC] text-right font-semibold">
                    {rep.visits}
                  </td>
                  <td className="px-5 py-3 text-sm text-right">
                    <span className="text-[#FB923C]">{'★'.repeat(Math.round(rep.avgRating))}</span>
                    <span className="text-[#94A3B8] ml-1 text-xs">{rep.avgRating}</span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span
                      className="text-sm font-medium"
                      style={{
                        color:
                          rep.routeEfficiency >= 90
                            ? '#34D399'
                            : rep.routeEfficiency >= 80
                            ? '#FB923C'
                            : '#EF4444',
                      }}
                    >
                      {rep.routeEfficiency}%
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span
                      className="text-sm font-medium"
                      style={{
                        color:
                          rep.coverageA >= 95
                            ? '#34D399'
                            : rep.coverageA >= 85
                            ? '#FB923C'
                            : '#EF4444',
                      }}
                    >
                      {rep.coverageA}%
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
