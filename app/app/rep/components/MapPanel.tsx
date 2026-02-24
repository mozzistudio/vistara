'use client'

interface MapMarker {
  id: string
  label: string
  x: number
  y: number
  color: string
  status: 'current' | 'next' | 'pending' | 'completed'
}

const markers: MapMarker[] = [
  { id: '1', label: 'Rep', x: 30, y: 45, color: '#22D3EE', status: 'current' },
  { id: '2', label: '1. H. Santo Tomas', x: 38, y: 32, color: '#8B5CF6', status: 'next' },
  { id: '3', label: '2. H. Nacional', x: 52, y: 28, color: '#94A3B8', status: 'pending' },
  { id: '4', label: '3. C.M. Paitilla', x: 65, y: 38, color: '#94A3B8', status: 'pending' },
  { id: '5', label: '4. H. Punta Pacifica', x: 72, y: 52, color: '#94A3B8', status: 'pending' },
  { id: '6', label: '5. Clin. San Fernando', x: 58, y: 62, color: '#94A3B8', status: 'pending' },
]

const routePoints = markers.map((m) => ({ x: m.x, y: m.y }))

export default function MapPanel() {
  return (
    <div
      className="flex-1 h-full relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #1A2236, #0F1520 60%, #0A0E17)',
      }}
    >
      {/* Grid overlay for map feel */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* "Water" areas for Panama Bay */}
      <div
        className="absolute rounded-full opacity-10"
        style={{
          width: '60%',
          height: '50%',
          bottom: '-10%',
          right: '-5%',
          background: 'radial-gradient(ellipse, #22D3EE 0%, transparent 70%)',
        }}
      />

      {/* Title */}
      <div className="absolute top-4 left-4 z-10">
        <h2 className="text-[#F8FAFC] text-base font-semibold">Mapa de Ruta</h2>
        <p className="text-[#94A3B8] text-xs">Panama Centro</p>
      </div>

      {/* SVG route lines + markers */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Route line */}
        <polyline
          points={routePoints.map((p) => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="0.4"
          strokeDasharray="1.5,1"
          opacity="0.6"
        />
        {/* Animated segment from current to next */}
        <line
          x1={markers[0].x}
          y1={markers[0].y}
          x2={markers[1].x}
          y2={markers[1].y}
          stroke="#22D3EE"
          strokeWidth="0.5"
          opacity="0.8"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="10"
            to="0"
            dur="2s"
            repeatCount="indefinite"
          />
        </line>
      </svg>

      {/* Markers */}
      {markers.map((marker) => (
        <div
          key={marker.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
          style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
        >
          {/* Pulse ring for current position */}
          {marker.status === 'current' && (
            <div
              className="absolute inset-0 rounded-full animate-ping"
              style={{
                backgroundColor: marker.color,
                opacity: 0.3,
                width: '24px',
                height: '24px',
                margin: '-6px',
              }}
            />
          )}

          {/* Dot */}
          <div
            className="relative rounded-full border-2 border-[#0A0E17] z-10 transition-transform duration-200 group-hover:scale-150"
            style={{
              width: marker.status === 'current' ? '14px' : '12px',
              height: marker.status === 'current' ? '14px' : '12px',
              backgroundColor: marker.color,
              boxShadow: `0 0 8px ${marker.color}60`,
            }}
          />

          {/* Label */}
          <div
            className="absolute left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20"
          >
            <span
              className="text-[10px] px-2 py-0.5 rounded-md font-medium"
              style={{
                backgroundColor: 'rgba(10, 14, 23, 0.9)',
                color: marker.color,
                border: `1px solid ${marker.color}30`,
              }}
            >
              {marker.label}
            </span>
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex flex-col gap-1.5 z-10">
        <div className="bg-[#0A0E17]/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/5">
          <p className="text-[10px] text-[#94A3B8] font-medium uppercase tracking-wider mb-1.5">Leyenda</p>
          <div className="flex flex-col gap-1">
            <LegendItem color="#22D3EE" label="Tu posicion" />
            <LegendItem color="#8B5CF6" label="Siguiente" />
            <LegendItem color="#94A3B8" label="Pendiente" />
            <LegendItem color="#22C55E" label="Completada" />
          </div>
        </div>
      </div>

      {/* Distance / ETA badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-[#0A0E17]/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/5 text-right">
          <p className="text-[10px] text-[#94A3B8]">Proxima parada</p>
          <p className="text-sm font-semibold text-[#8B5CF6]">H. Santo Tomas</p>
          <p className="text-xs text-[#22D3EE]">12 min &middot; 3.2 km</p>
        </div>
      </div>

      {/* Center watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <span className="text-white text-6xl font-bold tracking-widest uppercase">VISTARA</span>
      </div>
    </div>
  )
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-2.5 h-2.5 rounded-full shrink-0"
        style={{ backgroundColor: color }}
      />
      <span className="text-[10px] text-[#F8FAFC]/70">{label}</span>
    </div>
  )
}
