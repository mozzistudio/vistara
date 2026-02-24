'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

const segmentColors: Record<string, string> = {
  'A+': '#22D3EE', A: '#8B5CF6', 'B+': '#34D399', B: '#FB923C', C: '#94A3B8',
}

export default function HCPDetailPage() {
  const { id } = useParams()

  const { data: hcp, isLoading } = useQuery({
    queryKey: ['hcp', id],
    queryFn: () => fetch(`/api/hcps?id=${id}`).then(r => r.json()),
    enabled: !!id,
  })

  const { data: visits = [] } = useQuery({
    queryKey: ['hcp-visits', id],
    queryFn: () => fetch(`/api/visits?hcpId=${id}&limit=20`).then(r => r.json()),
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-8 w-48 bg-[#1A2236] rounded animate-pulse" />
        <div className="h-64 bg-[#1A2236] rounded-xl animate-pulse" />
      </div>
    )
  }

  if (!hcp || hcp.error) {
    return (
      <div className="p-6">
        <Link href="/app/director/hcps" className="text-[#22D3EE] text-sm hover:underline mb-4 inline-block">← Volver a HCPs</Link>
        <p className="text-[#94A3B8]">HCP no encontrado</p>
      </div>
    )
  }

  const segColor = segmentColors[hcp.segment] || '#94A3B8'

  return (
    <div className="p-6 h-full overflow-auto">
      <Link href="/app/director/hcps" className="text-[#22D3EE] text-sm hover:underline mb-4 inline-block">← Volver a HCPs</Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="rounded-xl bg-[#111827]/70 backdrop-blur-xl border border-white/[0.06] p-6">
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
                style={{ background: `${segColor}20`, color: segColor }}
              >
                {hcp.fullName?.charAt(0) || '?'}
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#F8FAFC]" style={{ fontFamily: 'var(--font-syne)' }}>
                  {hcp.fullName}
                </h1>
                <p className="text-sm text-[#94A3B8]">{hcp.specialty}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#94A3B8]">Segmento</span>
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                  style={{ backgroundColor: `${segColor}20`, color: segColor, border: `1px solid ${segColor}30` }}
                >
                  {hcp.segment}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#94A3B8]">Institución</span>
                <span className="text-sm text-[#F8FAFC]">{hcp.institution}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#94A3B8]">Ciudad</span>
                <span className="text-sm text-[#F8FAFC]">{hcp.city}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#94A3B8]">Dirección</span>
                <span className="text-sm text-[#F8FAFC] text-right max-w-[60%]">{hcp.address || '—'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#94A3B8]">Rep Asignado</span>
                <span className="text-sm text-[#F8FAFC]">{hcp.assignedRepName || '—'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#94A3B8]">Última Visita</span>
                <span className="text-sm text-[#F8FAFC]">{hcp.lastVisitDate || '—'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#94A3B8]">Frecuencia Target</span>
                <span className="text-sm text-[#F8FAFC]">Cada {hcp.visitFrequencyTarget || 30} días</span>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-6 h-40 rounded-lg bg-[#1A2236] flex items-center justify-center border border-white/[0.06]">
              <div className="text-center">
                <span className="text-2xl">📍</span>
                <p className="text-xs text-[#94A3B8] mt-1">{hcp.lat?.toFixed(4)}, {hcp.lng?.toFixed(4)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visit History & Analytics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Visit History */}
          <div className="rounded-xl bg-[#111827]/70 backdrop-blur-xl border border-white/[0.06] p-6">
            <h2 className="text-lg font-bold text-[#F8FAFC] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              Historial de Visitas
            </h2>
            {Array.isArray(visits) && visits.length > 0 ? (
              <div className="space-y-3">
                {visits.slice(0, 10).map((visit: any) => (
                  <div key={visit.id} className="flex items-center gap-4 p-3 rounded-lg bg-[#0A0E17]/50 border border-white/[0.04]">
                    <div className={`w-2 h-2 rounded-full ${
                      visit.status === 'Completed' ? 'bg-[#34D399]' :
                      visit.status === 'Cancelled' ? 'bg-[#EF4444]' : 'bg-[#94A3B8]'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-[#F8FAFC]">{visit.scheduledDate || visit.actualDate}</p>
                      <p className="text-xs text-[#94A3B8]">{visit.notes || 'Sin notas'}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#94A3B8]">{visit.status}</span>
                      {visit.rating && (
                        <p className="text-sm text-[#FB923C]">{'⭐'.repeat(visit.rating)}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#94A3B8]">No hay visitas registradas</p>
            )}
          </div>

          {/* Products Discussed */}
          <div className="rounded-xl bg-[#111827]/70 backdrop-blur-xl border border-white/[0.06] p-6">
            <h2 className="text-lg font-bold text-[#F8FAFC] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              Productos Discutidos
            </h2>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(visits) && visits.length > 0 ? (
                [...new Set(visits.flatMap((v: any) => v.productsDiscussed || []))].map((product: string) => (
                  <span key={product} className="px-3 py-1 rounded-full text-xs bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/25">
                    {product}
                  </span>
                ))
              ) : (
                <p className="text-sm text-[#94A3B8]">Sin datos</p>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="rounded-xl bg-[#111827]/70 backdrop-blur-xl border border-white/[0.06] p-6">
            <h2 className="text-lg font-bold text-[#F8FAFC] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              Notas
            </h2>
            <p className="text-sm text-[#94A3B8]">{hcp.notes || 'Sin notas adicionales'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
