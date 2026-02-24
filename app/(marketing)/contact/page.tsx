'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="pt-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <p className="text-[#22D3EE] text-sm font-medium tracking-wider uppercase mb-4">Contacto</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#F8FAFC] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
          Hablemos
        </h1>
        <p className="text-lg text-[#94A3B8] max-w-2xl mb-12">
          ¿Listo para transformar las rutas de tu equipo comercial? Contáctanos para una demostración personalizada.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Form */}
          <div className="rounded-xl bg-[#111827]/70 backdrop-blur-xl border border-white/[0.06] p-8">
            {submitted ? (
              <div className="text-center py-12">
                <span className="text-5xl">✅</span>
                <h3 className="text-xl font-bold text-[#F8FAFC] mt-4" style={{ fontFamily: 'var(--font-syne)' }}>
                  ¡Mensaje enviado!
                </h3>
                <p className="text-sm text-[#94A3B8] mt-2">Te contactaremos en menos de 24 horas.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', company: '', message: '' }) }}
                  className="mt-6 px-6 py-2 rounded-full bg-[#22D3EE] text-[#0A0E17] text-sm font-medium cursor-pointer"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-[#94A3B8] mb-1.5">Nombre completo</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0A0E17] border border-white/[0.06] text-[#F8FAFC] text-sm focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/40"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#94A3B8] mb-1.5">Email corporativo</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0A0E17] border border-white/[0.06] text-[#F8FAFC] text-sm focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/40"
                    placeholder="tu@empresa.com"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#94A3B8] mb-1.5">Empresa</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0A0E17] border border-white/[0.06] text-[#F8FAFC] text-sm focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/40"
                    placeholder="Nombre de la empresa"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#94A3B8] mb-1.5">Mensaje</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0A0E17] border border-white/[0.06] text-[#F8FAFC] text-sm focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/40 resize-none"
                    placeholder="¿Cómo podemos ayudarte?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#22D3EE] text-[#0A0E17] font-medium text-sm hover:bg-[#22D3EE]/90 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] cursor-pointer"
                >
                  Enviar mensaje
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div className="rounded-xl bg-[#111827]/70 backdrop-blur-xl border border-white/[0.06] p-6">
              <h3 className="text-lg font-bold text-[#F8FAFC] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>📍 Oficina</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Torre Global Bank, Piso 24<br />
                Calle 50, Bella Vista<br />
                Ciudad de Panamá, Panamá
              </p>
            </div>

            <div className="rounded-xl bg-[#111827]/70 backdrop-blur-xl border border-white/[0.06] p-6">
              <h3 className="text-lg font-bold text-[#F8FAFC] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>✉️ Email</h3>
              <p className="text-sm text-[#22D3EE]">hola@vistara.ai</p>
              <p className="text-xs text-[#94A3B8] mt-1">Respuesta en menos de 24 horas</p>
            </div>

            <div className="rounded-xl bg-[#111827]/70 backdrop-blur-xl border border-white/[0.06] p-6">
              <h3 className="text-lg font-bold text-[#F8FAFC] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>📞 Teléfono</h3>
              <p className="text-sm text-[#F8FAFC]">+507 396-8400</p>
              <p className="text-xs text-[#94A3B8] mt-1">Lun-Vie, 8:00 AM - 6:00 PM (EST)</p>
            </div>

            <div className="rounded-xl border-2 border-dashed border-[#22D3EE]/20 p-6 text-center">
              <h3 className="text-lg font-bold text-[#F8FAFC] mb-2" style={{ fontFamily: 'var(--font-syne)' }}>📅 Agendar una demo</h3>
              <p className="text-sm text-[#94A3B8] mb-4">30 minutos personalizados para tu equipo</p>
              <button className="px-6 py-2.5 rounded-full bg-[#8B5CF6] text-white text-sm font-medium hover:bg-[#8B5CF6]/90 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] cursor-pointer">
                Reservar horario
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
