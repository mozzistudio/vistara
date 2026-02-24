'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

/* ------------------------------------------------------------------ */
/*  Animated Counter Hook                                              */
/* ------------------------------------------------------------------ */
function useCounter(target: number, suffix = '', prefix = '', duration = 2000) {
  const [value, setValue] = useState(target)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          setValue(0)
          const start = performance.now()
          const step = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { ref, display: `${prefix}${value}${suffix}` }
}

/* ------------------------------------------------------------------ */
/*  SVG Icon Components                                                */
/* ------------------------------------------------------------------ */
function RouteIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </svg>
  )
}

function ChatBubbleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 10h.01" />
      <path d="M12 10h.01" />
      <path d="M16 10h.01" />
    </svg>
  )
}

function ClipboardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M9 12h6" />
      <path d="M9 16h6" />
    </svg>
  )
}

function RefreshCycleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.5 2v6h-6" />
      <path d="M2.5 22v-6h6" />
      <path d="M2.5 11.5a10 10 0 0 1 18.37-4.5" />
      <path d="M21.5 12.5a10 10 0 0 1-18.37 4.5" />
    </svg>
  )
}

function SyncArrowsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 1l4 4-4 4" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <path d="M7 23l-4-4 4-4" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  )
}

function ShieldCheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const features = [
  {
    icon: <RouteIcon />,
    title: 'Optimizacion IA de Rutas',
    description:
      'Algoritmos de enrutamiento inteligente que priorizan HCPs de alto valor, minimizando kilometros recorridos y maximizando el tiempo cara-a-cara con medicos clave.',
  },
  {
    icon: <ChatBubbleIcon />,
    title: 'Chat WhatsApp Integrado',
    description:
      'Tus representantes reciben la ruta del dia, alertas de re-ruteo y briefings directamente en WhatsApp. Sin apps adicionales, sin friccion.',
  },
  {
    icon: <ClipboardIcon />,
    title: 'Briefings Inteligentes',
    description:
      'Antes de cada visita, el rep recibe un resumen con historial de interacciones, productos de interes y puntos clave de conversacion generados por IA.',
  },
  {
    icon: <RefreshCycleIcon />,
    title: 'Re-ruteo Dinamico',
    description:
      'Cancelaciones, trafico o emergencias? Vistara recalcula la ruta en tiempo real y notifica al visitador con la mejor alternativa disponible.',
  },
  {
    icon: <SyncArrowsIcon />,
    title: 'Sincronizacion CRM',
    description:
      'Integracion bidireccional con Veeva, Salesforce y IQVIA. Las visitas se registran automaticamente con geolocalizacion y duracion verificada.',
  },
  {
    icon: <ShieldCheckIcon />,
    title: 'Cumplimiento Regulatorio',
    description:
      'Frecuencias de visita, restricciones de zona y limites regulatorios de Panama integrados en cada ruta. Auditoria completa en un clic.',
  },
]

const companies = [
  'BioGenesis Pharma',
  'MediLatam',
  'Isthmus Therapeutics',
  'Canal Biopharma',
  'Pacifica Salud Labs',
  'Tropic Health Sciences',
]

const testimonials = [
  {
    quote:
      'Desde que implementamos Vistara, nuestros visitadores cubren un 30% mas de medicos clase A por semana. La diferencia en productividad es impresionante.',
    name: 'Dra. Carolina Mendez',
    role: 'Directora Comercial',
    company: 'BioGenesis Pharma',
  },
  {
    quote:
      'El re-ruteo dinamico nos ha salvado incontables visitas perdidas. Cuando un medico cancela, el sistema ya tiene la alternativa lista en WhatsApp.',
    name: 'Roberto Castillo',
    role: 'Gerente de Fuerza de Ventas',
    company: 'MediLatam',
  },
  {
    quote:
      'Lo que mas valoro es que los reps lo adoptaron sin resistencia. Llega por WhatsApp, es intuitivo, y los briefings pre-visita les dan una confianza enorme.',
    name: 'Lic. Valeria Ng',
    role: 'Representante Medica Senior',
    company: 'Isthmus Therapeutics',
  },
]

/* ------------------------------------------------------------------ */
/*  WhatsApp Mockup Component                                          */
/* ------------------------------------------------------------------ */
function WhatsAppMockup() {
  return (
    <div className="w-full max-w-[380px] mx-auto" style={{ animation: 'float 6s ease-in-out infinite' }}>
      {/* Phone frame */}
      <div
        className="overflow-hidden"
        style={{
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'linear-gradient(145deg, #1A2236 0%, #111827 100%)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(34,211,238,0.06)',
        }}
      >
        {/* WhatsApp header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#075E54]">
          <div className="w-9 h-9 rounded-full bg-[#22D3EE]/20 flex items-center justify-center text-xs font-bold text-[#22D3EE]">
            V
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white leading-tight">Vistara AI</p>
            <p className="text-[11px] text-white/60">en linea</p>
          </div>
        </div>

        {/* Chat body */}
        <div
          className="px-3 py-4 space-y-3 min-h-[300px]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 5 L35 15 L30 12 L25 15Z\' fill=\'%23ffffff05\'/%3E%3C/svg%3E")',
            backgroundColor: '#0B141A',
          }}
        >
          {/* Bot message - greeting */}
          <div className="flex justify-start">
            <div className="bg-[#1A2236] rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] border border-white/[0.04]">
              <p className="text-[13px] text-[#F8FAFC] leading-relaxed">
                Buenos dias, Carlos. Tu ruta de hoy esta lista.
              </p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-[10px] text-[#94A3B8]">7:02 AM</span>
                <span className="text-[10px] text-[#53BDEB]">{'\u2713\u2713'}</span>
              </div>
            </div>
          </div>

          {/* Route card */}
          <div className="flex justify-start">
            <div className="bg-[#1A2236] rounded-2xl rounded-tl-sm overflow-hidden max-w-[85%] border border-white/[0.04]">
              {/* Cyan header area */}
              <div className="px-4 py-2.5" style={{ background: 'rgba(34,211,238,0.08)' }}>
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <p className="text-[13px] font-semibold text-[#22D3EE]">Ruta optimizada — 5 visitas</p>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-[11px] text-[#94A3B8]">
                  <span>47 min en ruta</span>
                  <span>Score: 94</span>
                </div>
              </div>
              <div className="px-4 py-3">
                <div className="space-y-1.5 text-[12px] text-[#F8FAFC]/80">
                  <p>1. Dr. Ricardo Arias — Hosp. Santo Tomas <span className="text-[#22D3EE] font-semibold">(A+)</span></p>
                  <p>2. Dra. Carmen Quintero — Hosp. Nacional <span className="text-[#22D3EE]">(A)</span></p>
                  <p>3. Dr. Manuel Espinosa — C.M. Paitilla <span className="text-[#94A3B8]">(B+)</span></p>
                  <p>4. Dr. Alejandro Batista — Hosp. Punta Pacifica <span className="text-[#22D3EE]">(A)</span></p>
                  <p>5. Dra. Rosa Moreno — Clin. San Fernando <span className="text-[#94A3B8]">(B)</span></p>
                </div>
                <div className="flex items-center justify-end gap-1 mt-2">
                  <span className="text-[10px] text-[#94A3B8]">7:02 AM</span>
                  <span className="text-[10px] text-[#53BDEB]">{'\u2713\u2713'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Briefing message */}
          <div className="flex justify-start">
            <div className="bg-[#1A2236] rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] border border-white/[0.04]">
              <p className="text-[13px] text-[#F8FAFC] leading-relaxed">
                <span className="font-semibold text-[#8B5CF6]">Briefing — Dr. Ricardo Arias:</span> Prescribe Losartan 50mg. Ultima visita: 14 dias. Interese en nueva presentacion pediatrica.
              </p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-[10px] text-[#94A3B8]">7:03 AM</span>
                <span className="text-[10px] text-[#53BDEB]">{'\u2713\u2713'}</span>
              </div>
            </div>
          </div>

          {/* User reply */}
          <div className="flex justify-end">
            <div className="bg-[#005C4B] rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[75%]">
              <p className="text-[13px] text-white leading-relaxed">Perfecto, salgo en 10 min</p>
              <p className="text-[10px] text-white/50 text-right mt-1">7:05 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */
export default function HomePage() {
  const stat1 = useCounter(32, '%', '+')
  const stat2 = useCounter(41, '%', '-')
  const stat3 = useCounter(98, '%', '')

  return (
    <>
      {/* ============================================================ */}
      {/*  HERO                                                        */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient mesh background */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 10%, rgba(34,211,238,0.12) 0%, transparent 60%),
              radial-gradient(ellipse 60% 50% at 80% 20%, rgba(139,92,246,0.10) 0%, transparent 55%),
              radial-gradient(ellipse 50% 40% at 50% 80%, rgba(34,211,238,0.06) 0%, transparent 50%),
              #0A0E17
            `,
          }}
        />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: copy */}
            <div className="text-center lg:text-left">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
                style={{
                  border: '1px solid rgba(34,211,238,0.2)',
                  background: 'rgba(34,211,238,0.06)',
                }}
              >
                <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                <span
                  className="uppercase"
                  style={{
                    fontFamily: 'var(--font-ibm)',
                    fontWeight: 500,
                    fontSize: '12px',
                    letterSpacing: '1.5px',
                    color: '#22D3EE',
                  }}
                >
                  Disponible en Panama
                </span>
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 800,
                  fontSize: 'clamp(3rem, 5.5vw, 4.5rem)',
                  letterSpacing: '-2px',
                  lineHeight: 1.05,
                  color: '#F8FAFC',
                }}
              >
                Inteligencia de rutas para equipos comerciales{' '}
                <span
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  pharma
                </span>
              </h1>

              <p
                className="mt-6 mx-auto lg:mx-0"
                style={{
                  fontFamily: 'var(--font-ibm)',
                  fontWeight: 300,
                  fontSize: '1.15rem',
                  lineHeight: 1.7,
                  color: '#94A3B8',
                  maxWidth: '520px',
                }}
              >
                Vistara optimiza las rutas de tus visitadores medicos con IA, aumentando visitas de alto valor y
                reduciendo tiempo en transito.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3.5 text-base text-[#0A0E17] transition-all"
                  style={{
                    fontFamily: 'var(--font-ibm)',
                    fontWeight: 600,
                    borderRadius: '14px',
                    background: '#22D3EE',
                    boxShadow: '0 0 30px rgba(34,211,238,0.25)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '0 0 40px rgba(34,211,238,0.4)'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(34,211,238,0.25)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  Solicitar una demo
                </Link>
                <Link
                  href="/features"
                  className="inline-flex items-center justify-center px-8 py-3.5 text-base text-[#F8FAFC] transition-all"
                  style={{
                    fontFamily: 'var(--font-ibm)',
                    fontWeight: 600,
                    borderRadius: '14px',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.02)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(34,211,238,0.4)'
                    e.currentTarget.style.color = '#22D3EE'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                    e.currentTarget.style.color = '#F8FAFC'
                  }}
                >
                  Ver caracteristicas
                </Link>
              </div>
            </div>

            {/* Right: WhatsApp mockup */}
            <div className="flex justify-center lg:justify-end" style={{ animation: 'fadeInUp 0.8s ease-out 0.3s both' }}>
              <WhatsAppMockup />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" fill="none" stroke="#94A3B8" strokeWidth="2" className="opacity-50">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  METRICS BAR                                                 */}
      {/* ============================================================ */}
      <section className="relative border-y border-white/[0.06]">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(180deg, rgba(17,24,39,0.6) 0%, rgba(26,34,54,0.3) 50%, rgba(17,24,39,0.6) 100%)',
          }}
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 text-center">
            {/* Stat 1 */}
            <div ref={stat1.ref} className="py-6 md:py-0">
              <p
                className="gradient-text"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 800,
                  fontSize: '3.5rem',
                  lineHeight: 1,
                }}
              >
                {stat1.display}
              </p>
              <p className="mt-2 text-base" style={{ fontFamily: 'var(--font-ibm)', fontWeight: 300, color: '#94A3B8' }}>
                visitas A+ por semana
              </p>
            </div>

            {/* Stat 2 */}
            <div ref={stat2.ref} className="py-6 md:py-0 md:border-x md:border-white/[0.06]">
              <p
                className="gradient-text"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 800,
                  fontSize: '3.5rem',
                  lineHeight: 1,
                }}
              >
                {stat2.display}
              </p>
              <p className="mt-2 text-base" style={{ fontFamily: 'var(--font-ibm)', fontWeight: 300, color: '#94A3B8' }}>
                tiempo de ruta diario
              </p>
            </div>

            {/* Stat 3 */}
            <div ref={stat3.ref} className="py-6 md:py-0">
              <p
                className="gradient-text"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 800,
                  fontSize: '3.5rem',
                  lineHeight: 1,
                }}
              >
                {stat3.display}
              </p>
              <p className="mt-2 text-base" style={{ fontFamily: 'var(--font-ibm)', fontWeight: 300, color: '#94A3B8' }}>
                adopcion por representantes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FEATURES                                                    */}
      {/* ============================================================ */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] -z-10"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(139,92,246,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <p
              className="section-tag text-sm tracking-widest uppercase mb-4 justify-center"
              style={{ fontFamily: 'var(--font-ibm)', fontWeight: 500, color: '#22D3EE', fontSize: '13px', letterSpacing: '1.5px' }}
            >
              Caracteristicas
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: '#F8FAFC',
                letterSpacing: '-1px',
              }}
            >
              Todo lo que tu equipo necesita,{' '}
              <span
                style={{
                  backgroundImage: 'linear-gradient(135deg, #22D3EE, #8B5CF6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                en un solo lugar
              </span>
            </h2>
            <p className="mt-5" style={{ fontFamily: 'var(--font-ibm)', fontWeight: 300, fontSize: '1.05rem', color: '#94A3B8', lineHeight: 1.7 }}>
              Desde la planificacion inteligente de rutas hasta el cumplimiento regulatorio, Vistara cubre cada aspecto de la operacion de campo farmaceutica.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group relative p-7 transition-all duration-300"
                style={{
                  borderRadius: '16px',
                  background: '#111827',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(34,211,238,0.15)'
                  el.style.transform = 'translateY(-4px)'
                  el.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3), 0 0 40px rgba(34,211,238,0.06)'
                  const line = el.querySelector('[data-gradient-line]') as HTMLElement
                  if (line) line.style.opacity = '1'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(255,255,255,0.06)'
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = 'none'
                  const line = el.querySelector('[data-gradient-line]') as HTMLElement
                  if (line) line.style.opacity = '0'
                }}
              >
                {/* Top gradient line on hover */}
                <div
                  data-gradient-line
                  className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
                  style={{
                    opacity: 0,
                    background: 'linear-gradient(90deg, #22D3EE, #8B5CF6)',
                    borderRadius: '16px 16px 0 0',
                  }}
                />

                {/* Icon box */}
                <div
                  className="flex items-center justify-center mb-5"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(34,211,238,0.08)',
                    border: '1px solid rgba(34,211,238,0.15)',
                  }}
                >
                  {feature.icon}
                </div>

                <h3
                  className="mb-2"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: '#F8FAFC',
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-ibm)',
                    fontWeight: 300,
                    fontSize: '0.85rem',
                    color: '#94A3B8',
                    lineHeight: 1.7,
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SOCIAL PROOF                                                */}
      {/* ============================================================ */}
      <section className="py-20 border-y border-white/[0.06]" style={{ background: 'rgba(17,24,39,0.3)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-center uppercase tracking-widest mb-12"
            style={{ fontFamily: 'var(--font-ibm)', fontWeight: 400, fontSize: '12px', color: '#94A3B8', letterSpacing: '2px' }}
          >
            Empresas que confian en Vistara
          </p>
          <div className="relative">
            {/* Left fade edge */}
            <div
              className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, rgba(17,24,39,0.8), transparent)',
              }}
            />
            {/* Right fade edge */}
            <div
              className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(to left, rgba(17,24,39,0.8), transparent)',
              }}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center px-8">
              {companies.map((name) => (
                <span
                  key={name}
                  className="transition-colors duration-300 select-none whitespace-nowrap cursor-default"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: 'rgba(255,255,255,0.18)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.4)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.18)'
                  }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TESTIMONIALS                                                */}
      {/* ============================================================ */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[400px] -z-10"
          style={{
            background:
              'radial-gradient(ellipse at 80% 20%, rgba(34,211,238,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <p
              className="section-tag text-sm tracking-widest uppercase mb-4 justify-center"
              style={{ fontFamily: 'var(--font-ibm)', fontWeight: 500, color: '#8B5CF6', fontSize: '13px', letterSpacing: '1.5px' }}
            >
              Testimonios
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: '#F8FAFC',
                letterSpacing: '-1px',
              }}
            >
              Lo que dicen nuestros clientes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="relative p-[1px] transition-all duration-300"
                style={{
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.06)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(34,211,238,0.4), rgba(139,92,246,0.4))'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div
                  className="relative p-8 h-full"
                  style={{
                    borderRadius: '15px',
                    background: 'rgba(17,24,39,0.95)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  {/* Quote mark */}
                  <div
                    className="gradient-text leading-none mb-4"
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontWeight: 800,
                      fontSize: '3.5rem',
                    }}
                  >
                    {'\u201C'}
                  </div>
                  <p
                    className="mb-8"
                    style={{
                      fontFamily: 'var(--font-ibm)',
                      fontWeight: 300,
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.85)',
                      lineHeight: 1.7,
                    }}
                  >
                    {t.quote}
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div
                      className="flex items-center justify-center text-sm font-bold text-[#0A0E17]"
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundImage: 'linear-gradient(135deg, #22D3EE, #8B5CF6)',
                      }}
                    >
                      {t.name.charAt(0)}
                      {t.name.split(' ').pop()?.charAt(0)}
                    </div>
                    <div>
                      <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', color: '#F8FAFC' }}>
                        {t.name}
                      </p>
                      <p style={{ fontFamily: 'var(--font-ibm)', fontWeight: 300, fontSize: '12px', color: '#94A3B8' }}>
                        {t.role} · {t.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FINAL CTA                                                   */}
      {/* ============================================================ */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        {/* Gradient mesh */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `
              radial-gradient(ellipse 70% 50% at 30% 50%, rgba(34,211,238,0.10) 0%, transparent 60%),
              radial-gradient(ellipse 60% 50% at 70% 50%, rgba(139,92,246,0.10) 0%, transparent 60%),
              #0A0E17
            `,
          }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: '#F8FAFC',
              letterSpacing: '-1px',
              lineHeight: 1.1,
            }}
          >
            Transforma las rutas de tu equipo{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #22D3EE, #8B5CF6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              comercial
            </span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-ibm)', fontWeight: 300, fontSize: '1.15rem', color: '#94A3B8', lineHeight: 1.7 }}>
            Unete a las empresas farmaceuticas en Panama que ya estan maximizando cada dia de campo con inteligencia artificial.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 text-base text-[#0A0E17] transition-all"
              style={{
                fontFamily: 'var(--font-ibm)',
                fontWeight: 600,
                borderRadius: '14px',
                background: '#22D3EE',
                boxShadow: '0 0 30px rgba(34,211,238,0.25)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 50px rgba(34,211,238,0.4)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(34,211,238,0.25)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Solicitar una demo
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-10 py-4 text-base text-[#F8FAFC] transition-all"
              style={{
                fontFamily: 'var(--font-ibm)',
                fontWeight: 600,
                borderRadius: '14px',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.02)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)'
                e.currentTarget.style.color = '#8B5CF6'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                e.currentTarget.style.color = '#F8FAFC'
              }}
            >
              Ver precios
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
