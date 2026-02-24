'use client'

import VisitCard, { type Visit } from './VisitCard'

const todayVisits: Visit[] = [
  {
    id: 'v1',
    time: '08:30',
    name: 'Dr. Ricardo Arias',
    specialty: 'Cardiologia',
    specialtyIcon: '\u2764\uFE0F',
    segment: 'A+',
    segmentColor: '#22D3EE',
    institution: 'Hospital Santo Tomas',
    status: 'next',
  },
  {
    id: 'v2',
    time: '09:45',
    name: 'Dra. Carmen Quintero',
    specialty: 'Endocrinologia',
    specialtyIcon: '\uD83E\uDE78',
    segment: 'A',
    segmentColor: '#8B5CF6',
    institution: 'Hospital Nacional',
    driveMinutes: 12,
    status: 'pending',
  },
  {
    id: 'v3',
    time: '11:15',
    name: 'Dr. Manuel Espinosa',
    specialty: 'Medicina Interna',
    specialtyIcon: '\uD83E\uDE7A',
    segment: 'B+',
    segmentColor: '#F59E0B',
    institution: 'Centro Medico Paitilla',
    driveMinutes: 8,
    status: 'pending',
  },
  {
    id: 'v4',
    time: '14:00',
    name: 'Dr. Alejandro Batista',
    specialty: 'Neurologia',
    specialtyIcon: '\uD83E\uDDE0',
    segment: 'A',
    segmentColor: '#8B5CF6',
    institution: 'Hospital Punta Pacifica',
    driveMinutes: 15,
    status: 'pending',
  },
  {
    id: 'v5',
    time: '15:30',
    name: 'Dra. Rosa Moreno',
    specialty: 'Cardiologia',
    specialtyIcon: '\u2764\uFE0F',
    segment: 'B',
    segmentColor: '#F59E0B',
    institution: 'Clinica San Fernando',
    driveMinutes: 10,
    status: 'pending',
  },
]

export default function RouteSidebar() {
  const today = new Date()
  const dateStr = today.toLocaleDateString('es-PA', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  const handleVisitClick = (visit: Visit) => {
    console.log('Visit clicked:', visit.name)
  }

  return (
    <div className="w-[280px] shrink-0 flex flex-col h-full bg-[#111827] border-l border-white/5">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/5 shrink-0">
        <h2 className="text-[#F8FAFC] text-sm font-semibold">Ruta del dia</h2>
        <p className="text-[#94A3B8] text-xs capitalize mt-0.5">{dateStr}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-[10px] text-[#22D3EE] bg-[#22D3EE]/10 px-2 py-0.5 rounded-full font-medium">
            5 visitas
          </span>
          <span className="text-[10px] text-[#94A3B8]">34 km total</span>
          <span className="text-[10px] text-[#94A3B8]">~3h 20min</span>
        </div>
      </div>

      {/* Visit list */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
        {todayVisits.map((visit) => (
          <VisitCard key={visit.id} visit={visit} onClick={handleVisitClick} />
        ))}
      </div>

      {/* Bottom summary */}
      <div className="px-4 py-2.5 border-t border-white/5 shrink-0">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-[#94A3B8]">Progreso</span>
          <span className="text-[#22D3EE] font-medium">0/5 completadas</span>
        </div>
        <div className="mt-1.5 h-1.5 bg-[#1A2236] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: '0%',
              background: 'linear-gradient(90deg, #22D3EE, #8B5CF6)',
            }}
          />
        </div>
      </div>
    </div>
  )
}
