'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Search, Building2, MapPin, ChevronRight, Map, List } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import type { PharmacyType, StockLevel } from '@/types'
import dynamic from 'next/dynamic'

const PharmacyMap = dynamic(() => import('@/components/pharmacies/PharmacyMap').then(m => m.PharmacyMap), {
  ssr: false,
  loading: () => <div className="bg-white rounded-[12px] border h-[500px] flex items-center justify-center" style={{ borderColor: 'var(--border)' }}>
    <p style={{ color: 'var(--text-faint)' }}>Cargando mapa...</p>
  </div>,
})

const TYPE_LABELS: Record<PharmacyType, string> = {
  RETAIL: 'Minorista', HOSPITAL: 'Hospital', CHAIN: 'Cadena', CLINIC: 'Clínica',
}
const TIER_COLORS = {
  PREMIUM: '#DCFCE7', STANDARD: '#F1F5F1', BASIC: '#F9F9F9',
}

interface PharmacyRow {
  id: string
  name: string
  type: PharmacyType
  tier: 'PREMIUM' | 'STANDARD' | 'BASIC'
  address: string
  region: string
  province: string
  latitude?: number
  longitude?: number
  stock: { level: StockLevel }[]
}

function getAlertCount(stock: { level: StockLevel }[]) {
  return stock.filter(s => s.level === 'BAJO' || s.level === 'RUPTURA').length
}

export default function PharmaciesPage() {
  const [query, setQuery] = useState('')
  const [activeRegion, setActiveRegion] = useState<string | null>(null)
  const [view, setView] = useState<'list' | 'map'>('list')

  const { data: regions } = useQuery({
    queryKey: ['regions'],
    queryFn: () => fetch('/api/pharmacies?regions=true').then(r => r.json()).then(r => r.data as string[]),
  })

  const { data, isLoading } = useQuery({
    queryKey: ['pharmacies', query, activeRegion],
    queryFn: () =>
      fetch(`/api/pharmacies?q=${encodeURIComponent(query)}${activeRegion ? `&region=${encodeURIComponent(activeRegion)}` : ''}&limit=50`)
        .then(r => r.json())
        .then(r => r.data as PharmacyRow[]),
  })

  return (
    <>
      <TopBar title="Farmacias" subtitle={`${data?.length ?? 0} farmacias en la red`} />
      <div className="p-6 space-y-5">

        {/* Controls */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-faint)' }} />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar por nombre o dirección..."
              className="w-full pl-10 pr-4 py-2.5 rounded-[10px] text-sm border outline-none"
              style={{ background: 'white', borderColor: 'var(--border)', color: 'var(--text-dark)' }}
            />
          </div>
          <div className="flex rounded-[10px] border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
            <button
              onClick={() => setView('list')}
              className="px-3 py-2 flex items-center gap-1.5 text-xs font-medium transition-colors"
              style={{ background: view === 'list' ? 'var(--forest)' : 'white', color: view === 'list' ? 'white' : 'var(--text-muted)' }}
            >
              <List className="w-3.5 h-3.5" /> Lista
            </button>
            <button
              onClick={() => setView('map')}
              className="px-3 py-2 flex items-center gap-1.5 text-xs font-medium transition-colors"
              style={{ background: view === 'map' ? 'var(--forest)' : 'white', color: view === 'map' ? 'white' : 'var(--text-muted)' }}
            >
              <Map className="w-3.5 h-3.5" /> Mapa
            </button>
          </div>
        </div>

        {/* Region filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveRegion(null)}
            className="text-xs px-3 py-1.5 rounded-full border font-medium transition-colors"
            style={{ background: !activeRegion ? 'var(--forest)' : 'white', color: !activeRegion ? 'white' : 'var(--text-muted)', borderColor: !activeRegion ? 'var(--forest)' : 'var(--border)' }}
          >Todas las regiones</button>
          {(regions ?? []).map(r => (
            <button
              key={r}
              onClick={() => setActiveRegion(activeRegion === r ? null : r)}
              className="text-xs px-3 py-1.5 rounded-full border font-medium transition-colors"
              style={{ background: activeRegion === r ? 'var(--forest)' : 'white', color: activeRegion === r ? 'white' : 'var(--text-muted)', borderColor: activeRegion === r ? 'var(--forest)' : 'var(--border)' }}
            >{r}</button>
          ))}
        </div>

        {/* Map view */}
        {view === 'map' && data && <PharmacyMap pharmacies={data} />}

        {/* List view */}
        {view === 'list' && (
          isLoading ? (
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-[12px] border h-28 animate-pulse" style={{ borderColor: 'var(--border)' }} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {(data ?? []).map(ph => {
                const alerts = getAlertCount(ph.stock)
                return (
                  <Link
                    key={ph.id}
                    href={`/pharmacies/${ph.id}`}
                    className="bg-white rounded-[12px] border p-4 hover:shadow-md transition-all hover:border-[var(--leaf)] group flex items-start gap-4"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <div
                      className="w-10 h-10 rounded-[10px] flex items-center justify-center flex-shrink-0"
                      style={{ background: TIER_COLORS[ph.tier] ?? 'var(--mint-light)' }}
                    >
                      <Building2 className="w-5 h-5" style={{ color: 'var(--forest)' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-sm leading-tight" style={{ color: 'var(--text-dark)' }}>
                          {ph.name}
                        </h3>
                        <ChevronRight className="w-4 h-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text-faint)' }} />
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3 h-3" style={{ color: 'var(--text-faint)' }} />
                        <span className="text-[11px]" style={{ color: 'var(--text-faint)' }}>{ph.region}, {ph.province}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                          style={{ background: 'var(--mint-light)', color: 'var(--forest)' }}
                        >
                          {TYPE_LABELS[ph.type]}
                        </span>
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                          style={{ background: TIER_COLORS[ph.tier], color: 'var(--text-muted)' }}
                        >
                          {ph.tier}
                        </span>
                        {alerts > 0 && (
                          <span
                            className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                            style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--alert)' }}
                          >
                            {alerts} alertas
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )
        )}
      </div>
    </>
  )
}
