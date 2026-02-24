'use client'

import { useState } from 'react'

/* ── Rep marker data ─────────────────────────────────────── */

interface RepMarker {
  name: string
  status: 'en_route' | 'in_visit' | 'idle'
  x: number // percent position on simulated map
  y: number
  lastUpdate: string
  hcp?: string
}

const REP_MARKERS: RepMarker[] = [
  { name: 'Carlos Mendoza', status: 'en_route', x: 35, y: 28, lastUpdate: 'Hace 3 min', hcp: undefined },
  { name: 'Ana García', status: 'in_visit', x: 55, y: 45, lastUpdate: 'Hace 1 min', hcp: 'Dr. Ramírez' },
  { name: 'Luis Rodríguez', status: 'en_route', x: 72, y: 35, lastUpdate: 'Hace 5 min', hcp: undefined },
  { name: 'Sofía Torres', status: 'idle', x: 20, y: 60, lastUpdate: 'Hace 22 min', hcp: undefined },
  { name: 'Miguel Herrera', status: 'in_visit', x: 48, y: 70, lastUpdate: 'Hace 2 min', hcp: 'Dra. López' },
  { name: 'Isabella Vargas', status: 'en_route', x: 65, y: 55, lastUpdate: 'Hace 7 min', hcp: undefined },
]

const STATUS_CONFIG = {
  en_route: { color: '#22D3EE', label: 'En Ruta', pulse: true },
  in_visit: { color: '#8B5CF6', label: 'En Visita', pulse: false },
  idle: { color: '#94A3B8', label: 'Inactivo', pulse: false },
}

type MapLayer = 'Rutas' | 'HCPs' | 'Calor' | 'Territorios'

export default function MapPage() {
  const [activeLayers, setActiveLayers] = useState<Set<MapLayer>>(
    new Set(['Rutas', 'HCPs'])
  )
  const [selectedRep, setSelectedRep] = useState<string | null>(null)

  const toggleLayer = (layer: MapLayer) => {
    setActiveLayers((prev) => {
      const next = new Set(prev)
      if (next.has(layer)) {
        next.delete(layer)
      } else {
        next.add(layer)
      }
      return next
    })
  }

  return (
    <div className="flex h-full">
      <h1 className="sr-only">Mapa de Equipo en Campo</h1>
      {/* Map Area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Simulated dark map background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 40% 40%, rgba(34,211,238,0.03), transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(139,92,246,0.03), transparent 60%), #0A0E17',
          }}
        >
          {/* Grid lines to simulate map */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
            {Array.from({ length: 20 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={`${i * 5}%`}
                x2="100%"
                y2={`${i * 5}%`}
                stroke="white"
                strokeWidth="1"
              />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={`${i * 5}%`}
                y1="0"
                x2={`${i * 5}%`}
                y2="100%"
                stroke="white"
                strokeWidth="1"
              />
            ))}
          </svg>

          {/* Road-like lines */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.08]">
            <path
              d="M 10% 20% Q 30% 40%, 50% 45% T 90% 50%"
              fill="none"
              stroke="#22D3EE"
              strokeWidth="2"
            />
            <path
              d="M 20% 80% Q 40% 50%, 60% 55% T 80% 20%"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="2"
            />
            <path
              d="M 5% 50% Q 25% 30%, 45% 35% T 95% 40%"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="1.5"
            />
          </svg>

          {/* Territory shading */}
          {activeLayers.has('Territorios') && (
            <svg className="absolute inset-0 w-full h-full">
              <rect x="5%" y="10%" width="30%" height="40%" rx="8" fill="rgba(34,211,238,0.04)" stroke="rgba(34,211,238,0.1)" strokeWidth="1" strokeDasharray="6 4" />
              <rect x="40%" y="15%" width="35%" height="50%" rx="8" fill="rgba(139,92,246,0.04)" stroke="rgba(139,92,246,0.1)" strokeWidth="1" strokeDasharray="6 4" />
              <rect x="15%" y="55%" width="40%" height="35%" rx="8" fill="rgba(52,211,153,0.04)" stroke="rgba(52,211,153,0.1)" strokeWidth="1" strokeDasharray="6 4" />
            </svg>
          )}

          {/* Heat map overlay */}
          {activeLayers.has('Calor') && (
            <div className="absolute inset-0">
              <div
                className="absolute w-40 h-40 rounded-full"
                style={{
                  left: '30%',
                  top: '25%',
                  background: 'radial-gradient(circle, rgba(239,68,68,0.2), transparent 70%)',
                  transform: 'translate(-50%, -50%)',
                }}
              />
              <div
                className="absolute w-56 h-56 rounded-full"
                style={{
                  left: '55%',
                  top: '50%',
                  background: 'radial-gradient(circle, rgba(251,146,60,0.15), transparent 70%)',
                  transform: 'translate(-50%, -50%)',
                }}
              />
              <div
                className="absolute w-32 h-32 rounded-full"
                style={{
                  left: '70%',
                  top: '35%',
                  background: 'radial-gradient(circle, rgba(34,211,238,0.15), transparent 70%)',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            </div>
          )}

          {/* HCP markers */}
          {activeLayers.has('HCPs') && (
            <>
              {[
                { x: 25, y: 32 }, { x: 42, y: 22 }, { x: 60, y: 40 },
                { x: 38, y: 58 }, { x: 75, y: 48 }, { x: 55, y: 68 },
                { x: 30, y: 72 }, { x: 68, y: 28 }, { x: 82, y: 55 },
              ].map((hcp, i) => (
                <div
                  key={`hcp-${i}`}
                  className="absolute w-2 h-2 rounded-full bg-[#FB923C] opacity-40"
                  style={{
                    left: `${hcp.x}%`,
                    top: `${hcp.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
            </>
          )}

          {/* Rep markers */}
          {REP_MARKERS.map((rep) => {
            const cfg = STATUS_CONFIG[rep.status]
            const isSelected = selectedRep === rep.name

            return (
              <button
                key={rep.name}
                className="absolute flex flex-col items-center gap-1 cursor-pointer group"
                style={{
                  left: `${rep.x}%`,
                  top: `${rep.y}%`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: isSelected ? 20 : 10,
                }}
                onClick={() =>
                  setSelectedRep(isSelected ? null : rep.name)
                }
              >
                <div className="relative">
                  <div
                    className={`w-4 h-4 rounded-full border-2 border-[#0A0E17] transition-transform ${
                      isSelected ? 'scale-150' : 'group-hover:scale-125'
                    }`}
                    style={{
                      background: cfg.color,
                      boxShadow: `0 0 12px ${cfg.color}40`,
                    }}
                  />
                  {cfg.pulse && (
                    <div
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{
                        background: cfg.color,
                        opacity: 0.3,
                      }}
                    />
                  )}
                </div>
                <span
                  className="text-[10px] font-medium whitespace-nowrap px-1.5 py-0.5 rounded"
                  style={{
                    color: cfg.color,
                    background: 'rgba(10,14,23,0.8)',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {rep.name.split(' ')[0]}
                </span>
              </button>
            )
          })}
        </div>

        {/* Layer toggles with active filter chips */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-20">
          {(['Rutas', 'HCPs', 'Calor', 'Territorios'] as MapLayer[]).map(
            (layer) => {
              const isActive = activeLayers.has(layer)
              return (
                <button
                  key={layer}
                  onClick={() => toggleLayer(layer)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#22D3EE] bg-[rgba(34,211,238,0.12)] border border-[rgba(34,211,238,0.2)]'
                      : 'text-[#94A3B8] bg-[rgba(17,24,39,0.8)] border border-[rgba(255,255,255,0.06)] hover:text-[#F8FAFC]'
                  }`}
                  style={{ backdropFilter: 'blur(8px)' }}
                  aria-pressed={isActive}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
                  )}
                  {layer}
                  {isActive && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="opacity-60">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  )}
                </button>
              )
            }
          )}
          {activeLayers.size > 0 && (
            <button
              onClick={() => setActiveLayers(new Set())}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer text-[#F87171] bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.15)] hover:bg-[rgba(239,68,68,0.15)]"
              style={{ backdropFilter: 'blur(8px)' }}
            >
              Limpiar filtros ({activeLayers.size})
            </button>
          )}
        </div>

        {/* Map placeholder notice */}
        <div
          className="absolute bottom-4 left-4 px-3 py-2 rounded-lg text-[10px] text-[#94A3B8] z-20"
          style={{
            background: 'rgba(17,24,39,0.8)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          Mapa placeholder -- integrar Mapbox GL
        </div>
      </div>

      {/* Right Sidebar - Rep List */}
      <div
        className="w-[280px] shrink-0 flex flex-col h-full overflow-hidden"
        style={{
          background: '#111827',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="px-4 py-3 border-b border-[rgba(255,255,255,0.06)]">
          <h2
            className="text-sm font-bold text-[#F8FAFC]"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Equipo en Campo
          </h2>
          <p className="text-[10px] text-[#94A3B8] mt-0.5">
            {REP_MARKERS.filter((r) => r.status !== 'idle').length} de{' '}
            {REP_MARKERS.length} activos
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {REP_MARKERS.map((rep) => {
            const cfg = STATUS_CONFIG[rep.status]
            const isSelected = selectedRep === rep.name

            return (
              <button
                key={rep.name}
                onClick={() =>
                  setSelectedRep(isSelected ? null : rep.name)
                }
                className={`w-full text-left px-4 py-3 border-b border-[rgba(255,255,255,0.03)] transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[rgba(34,211,238,0.06)]'
                    : 'hover:bg-[rgba(255,255,255,0.02)]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-sm font-medium text-[#F8FAFC] truncate">
                    {rep.name}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: cfg.color }}
                    />
                    <span
                      className="text-[10px] font-medium whitespace-nowrap"
                      style={{ color: cfg.color }}
                    >
                      {cfg.label}
                    </span>
                  </div>
                </div>
                <div className="text-[10px] text-[#94A3B8]">
                  {rep.hcp ? (
                    <span>
                      Visitando: <span className="text-[#F8FAFC]">{rep.hcp}</span>
                    </span>
                  ) : (
                    <span>{rep.lastUpdate}</span>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Summary Footer */}
        <div className="px-4 py-3 border-t border-[rgba(255,255,255,0.06)]">
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
              const count = REP_MARKERS.filter((r) => r.status === key).length
              return (
                <div key={key} className="text-center">
                  <p
                    className="text-lg font-bold"
                    style={{ color: cfg.color, fontFamily: 'var(--font-syne)' }}
                  >
                    {count}
                  </p>
                  <p className="text-[9px] text-[#94A3B8]">{cfg.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
