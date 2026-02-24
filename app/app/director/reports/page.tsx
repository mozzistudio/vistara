'use client'

import { useState } from 'react'

const tabs = [
  { id: 'coverage', label: '🗺️ Cobertura Territorial', icon: '🗺️' },
  { id: 'frequency', label: '📅 Frecuencia de Visita', icon: '📅' },
  { id: 'roi', label: '💰 ROI por Territorio', icon: '💰' },
]

const overdueHCPs = [
  { name: 'Dr. Fernando Ruiz', specialty: 'Neumólogo', segment: 'A+', days: 42, territory: 'Panamá Centro' },
  { name: 'Dra. Patricia Vega', specialty: 'Reumatóloga', segment: 'A', days: 35, territory: 'Panamá Norte' },
  { name: 'Dr. Omar Castillo', specialty: 'Gastroenterólogo', segment: 'B+', days: 31, territory: 'Panamá Centro' },
  { name: 'Dra. Laura Chen', specialty: 'Dermatóloga', segment: 'A', days: 28, territory: 'San Miguelito' },
  { name: 'Dr. Ricardo Flores', specialty: 'Internista', segment: 'B', days: 25, territory: 'Panamá Este' },
]

const territories = [
  { name: 'Panamá Centro', rep: 'Carlos Mendoza', visits: 45, target: 50, revenue: 125000, cost: 8500 },
  { name: 'Panamá Norte', rep: 'Ana García', visits: 38, target: 45, revenue: 98000, cost: 7200 },
  { name: 'San Miguelito', rep: 'Luis Rodríguez', visits: 42, target: 45, revenue: 110000, cost: 7800 },
  { name: 'Panamá Este', rep: 'Sofía Torres', visits: 35, target: 40, revenue: 85000, cost: 6900 },
  { name: 'Panamá Oeste', rep: 'Miguel Herrera', visits: 40, target: 45, revenue: 105000, cost: 7500 },
  { name: 'Chorrera', rep: 'Isabella Vargas', visits: 30, target: 35, revenue: 72000, cost: 6200 },
]

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('coverage')

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#F8FAFC]" style={{ fontFamily: 'var(--font-syne)' }}>Reportes</h1>
          <p className="text-sm text-[#94A3B8] mt-1">Análisis de rendimiento y cobertura</p>
        </div>
        <button className="px-4 py-2 rounded-full bg-[#22D3EE]/10 text-[#22D3EE] text-sm font-medium border border-[#22D3EE]/20 hover:bg-[#22D3EE]/20 transition-colors cursor-pointer">
          📥 Exportar CSV
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#22D3EE] text-[#0A0E17]'
                : 'bg-[#111827] text-[#94A3B8] border border-white/[0.06] hover:border-[#22D3EE]/30'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'coverage' && (
        <div className="space-y-6">
          <div className="rounded-xl bg-[#111827]/70 backdrop-blur-xl border border-white/[0.06] p-6">
            <h2 className="text-lg font-bold text-[#F8FAFC] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              Mapa de Cobertura
            </h2>
            <div className="h-64 rounded-lg bg-[#0A0E17] flex items-center justify-center border border-white/[0.06]">
              <div className="text-center">
                <span className="text-4xl">🗺️</span>
                <p className="text-sm text-[#94A3B8] mt-2">Mapa de calor de cobertura</p>
                <p className="text-xs text-[#94A3B8]">6 territorios · 70 HCPs · 85% cobertura total</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Cobertura Total', value: '85%', delta: '+3%', color: '#34D399' },
              { label: 'HCPs A+ Cubiertos', value: '92%', delta: '+5%', color: '#22D3EE' },
              { label: 'Territorios Activos', value: '6/6', delta: '100%', color: '#8B5CF6' },
            ].map(stat => (
              <div key={stat.label} className="rounded-xl bg-[#111827]/70 backdrop-blur-xl border border-white/[0.06] p-5">
                <p className="text-xs text-[#94A3B8] mb-1">{stat.label}</p>
                <p className="text-2xl font-bold" style={{ color: stat.color, fontFamily: 'var(--font-syne)' }}>{stat.value}</p>
                <p className="text-xs text-[#34D399] mt-1">↑ {stat.delta} vs mes anterior</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'frequency' && (
        <div className="rounded-xl bg-[#111827]/70 backdrop-blur-xl border border-white/[0.06] overflow-hidden">
          <div className="p-4 border-b border-white/[0.06]">
            <h2 className="text-lg font-bold text-[#F8FAFC]" style={{ fontFamily: 'var(--font-syne)' }}>
              HCPs con Visitas Vencidas
            </h2>
            <p className="text-xs text-[#94A3B8] mt-1">Profesionales que exceden su frecuencia de visita objetivo</p>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {['Nombre', 'Especialidad', 'Segmento', 'Días sin visita', 'Territorio'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-[#94A3B8] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {overdueHCPs.map(hcp => (
                <tr key={hcp.name} className="border-b border-white/[0.04] hover:bg-[#1A2236]/50">
                  <td className="px-4 py-3 text-sm text-[#F8FAFC] font-medium">{hcp.name}</td>
                  <td className="px-4 py-3 text-sm text-[#94A3B8]">{hcp.specialty}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs" style={{
                      backgroundColor: hcp.segment === 'A+' ? '#22D3EE20' : hcp.segment === 'A' ? '#8B5CF620' : '#34D39920',
                      color: hcp.segment === 'A+' ? '#22D3EE' : hcp.segment === 'A' ? '#8B5CF6' : '#34D399',
                    }}>
                      {hcp.segment}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-medium ${hcp.days > 30 ? 'text-[#EF4444]' : 'text-[#FB923C]'}`}>
                      {hcp.days} días
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#94A3B8]">{hcp.territory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'roi' && (
        <div className="rounded-xl bg-[#111827]/70 backdrop-blur-xl border border-white/[0.06] overflow-hidden">
          <div className="p-4 border-b border-white/[0.06]">
            <h2 className="text-lg font-bold text-[#F8FAFC]" style={{ fontFamily: 'var(--font-syne)' }}>
              ROI por Territorio
            </h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {['Territorio', 'Rep', 'Visitas', 'Target', 'Cumplimiento', 'Revenue', 'Costo', 'ROI'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-[#94A3B8] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {territories.map(t => {
                const compliance = Math.round((t.visits / t.target) * 100)
                const roi = Math.round(((t.revenue - t.cost) / t.cost) * 100)
                return (
                  <tr key={t.name} className="border-b border-white/[0.04] hover:bg-[#1A2236]/50">
                    <td className="px-4 py-3 text-sm text-[#F8FAFC] font-medium">{t.name}</td>
                    <td className="px-4 py-3 text-sm text-[#94A3B8]">{t.rep}</td>
                    <td className="px-4 py-3 text-sm text-[#F8FAFC]">{t.visits}</td>
                    <td className="px-4 py-3 text-sm text-[#94A3B8]">{t.target}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-[#1A2236]">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${Math.min(compliance, 100)}%`,
                              backgroundColor: compliance >= 90 ? '#34D399' : compliance >= 70 ? '#FB923C' : '#EF4444',
                            }}
                          />
                        </div>
                        <span className="text-xs text-[#94A3B8]">{compliance}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#34D399]">${(t.revenue / 1000).toFixed(0)}k</td>
                    <td className="px-4 py-3 text-sm text-[#94A3B8]">${(t.cost / 1000).toFixed(1)}k</td>
                    <td className="px-4 py-3 text-sm font-medium text-[#22D3EE]">{roi}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
