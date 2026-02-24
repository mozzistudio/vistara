'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

const segments = ['Todos', 'A+', 'A', 'B+', 'B', 'C']
const segmentColors: Record<string, string> = {
  'A+': '#22D3EE', A: '#8B5CF6', 'B+': '#34D399', B: '#FB923C', C: '#94A3B8',
}

export default function HCPsPage() {
  const [search, setSearch] = useState('')
  const [segmentFilter, setSegmentFilter] = useState('Todos')
  const [page, setPage] = useState(0)
  const perPage = 15

  const { data: hcps = [], isLoading } = useQuery({
    queryKey: ['hcps'],
    queryFn: () => fetch('/api/hcps').then(r => r.json()),
  })

  const filtered = hcps.filter((h: any) => {
    const matchesSearch = !search ||
      h.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      h.specialty?.toLowerCase().includes(search.toLowerCase()) ||
      h.institution?.toLowerCase().includes(search.toLowerCase()) ||
      h.city?.toLowerCase().includes(search.toLowerCase())
    const matchesSegment = segmentFilter === 'Todos' || h.segment === segmentFilter
    return matchesSearch && matchesSegment
  })

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice(page * perPage, (page + 1) * perPage)

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#F8FAFC]" style={{ fontFamily: 'var(--font-syne)' }}>
            Base de Datos HCPs
          </h1>
          <p className="text-sm text-[#94A3B8] mt-1">{filtered.length} profesionales de salud</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-[250px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por nombre, especialidad, institución..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(0) }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111827] border border-white/[0.06] text-[#F8FAFC] text-sm placeholder:text-[#94A3B8]/50 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/40"
          />
        </div>
        <div className="flex gap-2">
          {segments.map(seg => (
            <button
              key={seg}
              onClick={() => { setSegmentFilter(seg); setPage(0) }}
              className={`px-3 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                segmentFilter === seg
                  ? 'bg-[#22D3EE] text-[#0A0E17]'
                  : 'bg-[#111827] text-[#94A3B8] border border-white/[0.06] hover:border-[#22D3EE]/30'
              }`}
            >
              {seg}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/[0.06] overflow-hidden bg-[#111827]/70 backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {['Nombre', 'Especialidad', 'Segmento', 'Institución', 'Ciudad', 'Rep Asignado', 'Última Visita', 'Estado'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-[#94A3B8] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <tr key={i} className="border-b border-white/[0.04]">
                    {Array.from({ length: 8 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 bg-[#1A2236] rounded animate-pulse" style={{ width: `${60 + Math.random() * 40}%` }} />
                      </td>
                    ))}
                  </tr>
                ))
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-[#94A3B8]">
                    No se encontraron HCPs
                  </td>
                </tr>
              ) : (
                paginated.map((hcp: any) => (
                  <tr
                    key={hcp.id}
                    className="border-b border-white/[0.04] hover:bg-[#1A2236]/50 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <Link href={`/app/director/hcps/${hcp.id}`} className="text-sm font-medium text-[#F8FAFC] hover:text-[#22D3EE]">
                        {hcp.fullName}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#94A3B8]">{hcp.specialty}</td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: `${segmentColors[hcp.segment] || '#94A3B8'}20`,
                          color: segmentColors[hcp.segment] || '#94A3B8',
                          border: `1px solid ${segmentColors[hcp.segment] || '#94A3B8'}30`,
                        }}
                      >
                        {hcp.segment}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#94A3B8]">{hcp.institution}</td>
                    <td className="px-4 py-3 text-sm text-[#94A3B8]">{hcp.city}</td>
                    <td className="px-4 py-3 text-sm text-[#94A3B8]">{hcp.assignedRepName || '—'}</td>
                    <td className="px-4 py-3 text-sm text-[#94A3B8]">{hcp.lastVisitDate || '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-xs ${hcp.status === 'Active' ? 'text-[#34D399]' : 'text-[#94A3B8]'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${hcp.status === 'Active' ? 'bg-[#34D399]' : 'bg-[#94A3B8]'}`} />
                        {hcp.status || 'Activo'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.06]">
            <p className="text-xs text-[#94A3B8]">
              Mostrando {page * perPage + 1}-{Math.min((page + 1) * perPage, filtered.length)} de {filtered.length}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                className="px-3 py-1 rounded-lg text-xs bg-[#1A2236] text-[#94A3B8] disabled:opacity-50 hover:bg-[#22D3EE]/10 cursor-pointer"
              >
                Anterior
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="px-3 py-1 rounded-lg text-xs bg-[#1A2236] text-[#94A3B8] disabled:opacity-50 hover:bg-[#22D3EE]/10 cursor-pointer"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
