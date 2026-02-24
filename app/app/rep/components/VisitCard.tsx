'use client'

export interface Visit {
  id: string
  time: string
  name: string
  specialty: string
  specialtyIcon: string
  segment: string
  segmentColor: string
  institution: string
  driveMinutes?: number
  status: 'pending' | 'next' | 'completed' | 'cancelled'
}

interface VisitCardProps {
  visit: Visit
  onClick?: (visit: Visit) => void
}

const statusStyles: Record<Visit['status'], { border: string; badge: string; badgeText: string; label: string }> = {
  next: {
    border: 'border-[#8B5CF6]',
    badge: 'bg-[#8B5CF6]/20 text-[#8B5CF6]',
    badgeText: 'Siguiente',
    label: 'border-l-[#8B5CF6]',
  },
  pending: {
    border: 'border-[#1A2236]',
    badge: 'bg-[#94A3B8]/10 text-[#94A3B8]',
    badgeText: 'Pendiente',
    label: 'border-l-[#1A2236]',
  },
  completed: {
    border: 'border-[#22D3EE]',
    badge: 'bg-[#22D3EE]/20 text-[#22D3EE]',
    badgeText: 'Completada',
    label: 'border-l-[#22D3EE]',
  },
  cancelled: {
    border: 'border-red-500/40',
    badge: 'bg-red-500/20 text-red-400',
    badgeText: 'Cancelada',
    label: 'border-l-red-500/40',
  },
}

export default function VisitCard({ visit, onClick }: VisitCardProps) {
  const style = statusStyles[visit.status]

  return (
    <button
      onClick={() => onClick?.(visit)}
      className={`
        w-full text-left p-3 rounded-lg border-l-4 transition-all duration-200
        bg-[#1A2236] hover:bg-[#1F2A40]
        ${style.border} ${style.label}
      `}
    >
      {/* Top row: time + status badge */}
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-mono text-[#22D3EE]">{visit.time}</span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${style.badge}`}>
          {style.badgeText}
        </span>
      </div>

      {/* Doctor name */}
      <h4 className="text-sm font-medium text-[#F8FAFC] mb-0.5 truncate">{visit.name}</h4>

      {/* Specialty + Segment */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs text-[#94A3B8]">
          {visit.specialtyIcon} {visit.specialty}
        </span>
        <span
          className="text-[10px] px-1.5 py-0.5 rounded font-bold"
          style={{ backgroundColor: visit.segmentColor + '22', color: visit.segmentColor }}
        >
          {visit.segment}
        </span>
      </div>

      {/* Institution */}
      <p className="text-xs text-[#94A3B8] truncate">{visit.institution}</p>

      {/* Drive time */}
      {visit.driveMinutes && (
        <p className="text-[10px] text-[#94A3B8]/60 mt-1">
          &#128663; {visit.driveMinutes} min traslado
        </p>
      )}
    </button>
  )
}
