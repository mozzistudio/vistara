'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', team: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#22D3EE]/20 bg-[#22D3EE]/5 text-[#22D3EE] text-sm mb-6">
            Contacto
          </span>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F8FAFC] mb-5"
            style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, letterSpacing: '-1px' }}
          >
            Hablemos
          </h1>
          <p className="text-lg text-[#94A3B8] leading-relaxed max-w-2xl mx-auto">
            ¿Listo para transformar las rutas de tu equipo comercial? Contáctanos para una demostración personalizada.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Form - takes 3 cols */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl bg-[#111827]/70 backdrop-blur-xl border border-white/[0.06] p-8 lg:p-10">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#34D399]/10 border border-[#34D399]/20 flex items-center justify-center mx-auto mb-6">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2" strokeLinecap="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3
                    className="text-2xl font-bold text-[#F8FAFC] mb-3"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    ¡Mensaje enviado!
                  </h3>
                  <p className="text-sm text-[#94A3B8] mb-6 max-w-sm mx-auto">
                    Gracias por tu interés, {form.name || 'estimado usuario'}. Nuestro equipo te contactará en menos de 24 horas hábiles.
                  </p>

                  {/* Confirmation summary */}
                  <div className="rounded-xl bg-[#0A0E17]/60 border border-white/[0.06] p-4 mb-8 text-left max-w-sm mx-auto">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-[#64748B] mb-3">Resumen de tu solicitud</p>
                    <div className="space-y-2 text-sm">
                      {form.name && <div className="flex justify-between"><span className="text-[#94A3B8]">Nombre</span><span className="text-[#F8FAFC]">{form.name}</span></div>}
                      {form.email && <div className="flex justify-between"><span className="text-[#94A3B8]">Email</span><span className="text-[#F8FAFC]">{form.email}</span></div>}
                      {form.company && <div className="flex justify-between"><span className="text-[#94A3B8]">Empresa</span><span className="text-[#F8FAFC]">{form.company}</span></div>}
                      {form.team && <div className="flex justify-between"><span className="text-[#94A3B8]">Equipo</span><span className="text-[#F8FAFC]">{form.team} reps</span></div>}
                    </div>
                  </div>

                  {/* Response SLA */}
                  <div className="flex items-center justify-center gap-2 mb-8 text-xs text-[#64748B]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    Tiempo promedio de respuesta: menos de 4 horas en horario laboral
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', company: '', phone: '', team: '', message: '' }) }}
                      className="px-6 py-2.5 rounded-xl text-sm font-medium cursor-pointer hover:bg-white/[0.06] transition-all"
                      style={{
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#94A3B8',
                      }}
                    >
                      Enviar otro mensaje
                    </button>
                    <button
                      className="px-6 py-2.5 rounded-xl text-sm font-semibold cursor-pointer hover:brightness-110 transition-all"
                      style={{
                        background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                        color: '#fff',
                        boxShadow: '0 0 20px rgba(139,92,246,0.2)',
                      }}
                      onClick={() => {
                        const demoSection = document.querySelector('[data-demo-cta]')
                        demoSection?.scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      Agendar demo ahora
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-medium uppercase tracking-wider text-[#64748B] mb-2">Nombre completo</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0A0E17] border border-white/[0.08] text-[#F8FAFC] text-sm focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/25 focus:border-[#22D3EE]/40 transition-all placeholder:text-[#334155]"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium uppercase tracking-wider text-[#64748B] mb-2">Email corporativo</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0A0E17] border border-white/[0.08] text-[#F8FAFC] text-sm focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/25 focus:border-[#22D3EE]/40 transition-all placeholder:text-[#334155]"
                        placeholder="tu@empresa.com"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-medium uppercase tracking-wider text-[#64748B] mb-2">Empresa</label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={e => setForm({ ...form, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0A0E17] border border-white/[0.08] text-[#F8FAFC] text-sm focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/25 focus:border-[#22D3EE]/40 transition-all placeholder:text-[#334155]"
                        placeholder="Nombre de la empresa"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium uppercase tracking-wider text-[#64748B] mb-2">Tamaño del equipo</label>
                      <select
                        value={form.team}
                        onChange={e => setForm({ ...form, team: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0A0E17] border border-white/[0.08] text-sm focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/25 focus:border-[#22D3EE]/40 transition-all appearance-none cursor-pointer"
                        style={{ color: form.team ? '#F8FAFC' : '#334155' }}
                      >
                        <option value="" disabled>Seleccionar</option>
                        <option value="1-10">1-10 representantes</option>
                        <option value="11-30">11-30 representantes</option>
                        <option value="31-50">31-50 representantes</option>
                        <option value="50+">50+ representantes</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-[#64748B] mb-2">Mensaje</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0A0E17] border border-white/[0.08] text-[#F8FAFC] text-sm focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/25 focus:border-[#22D3EE]/40 transition-all resize-none placeholder:text-[#334155]"
                      placeholder="Cuéntanos sobre tu equipo y qué desafíos enfrentas..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl text-[#0A0E17] font-semibold text-sm hover:brightness-110 transition-all cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)',
                      boxShadow: '0 0 24px rgba(34,211,238,0.2), 0 4px 12px rgba(0,0,0,0.3)',
                    }}
                  >
                    Enviar mensaje
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Info - takes 2 cols */}
          <div className="lg:col-span-2 space-y-4">
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                ),
                title: 'Oficina',
                lines: ['Torre Global Bank, Piso 24', 'Calle 50, Bella Vista', 'Ciudad de Panamá, Panamá'],
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round">
                    <rect x="2" y="4" width="20" height="16" rx="3" />
                    <path d="M22 7l-10 6L2 7" />
                  </svg>
                ),
                title: 'Email',
                lines: ['hola@vistara.ai'],
                accent: true,
                sub: 'Respuesta en menos de 24 horas',
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                ),
                title: 'Teléfono',
                lines: ['+507 396-8400'],
                sub: 'Lun-Vie, 8:00 AM - 6:00 PM (EST)',
              },
            ].map(item => (
              <div
                key={item.title}
                className="rounded-xl bg-[#111827]/70 backdrop-blur-xl border border-white/[0.06] p-5 hover:border-white/[0.12] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0A0E17] border border-white/[0.06] flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#F8FAFC] mb-1.5" style={{ fontFamily: 'var(--font-syne)' }}>
                      {item.title}
                    </h3>
                    {item.lines.map((line, i) => (
                      <p key={i} className={`text-sm ${item.accent ? 'text-[#22D3EE]' : 'text-[#94A3B8]'}`}>
                        {line}
                      </p>
                    ))}
                    {item.sub && (
                      <p className="text-xs text-[#475569] mt-1">{item.sub}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Demo CTA */}
            <div
              data-demo-cta
              className="rounded-xl p-6 text-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(34,211,238,0.08) 0%, rgba(139,92,246,0.08) 100%)',
                border: '1px solid rgba(34,211,238,0.12)',
              }}
            >
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center mx-auto mb-4">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC] mb-2" style={{ fontFamily: 'var(--font-syne)' }}>
                  Agendar una demo
                </h3>
                <p className="text-sm text-[#94A3B8] mb-5">30 minutos personalizados para tu equipo</p>
                <button
                  className="px-6 py-2.5 rounded-xl text-white text-sm font-semibold hover:brightness-110 transition-all cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                    boxShadow: '0 0 20px rgba(139,92,246,0.2)',
                  }}
                >
                  Reservar horario
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
