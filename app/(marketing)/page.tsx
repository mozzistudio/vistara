'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

/* ------------------------------------------------------------------ */
/*  Animated Counter Hook                                              */
/* ------------------------------------------------------------------ */
function useCounter(target: number, suffix = '', prefix = '', duration = 2000) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const step = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            // ease-out cubic
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
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const features = [
  {
    icon: '\uD83D\uDDFA\uFE0F',
    title: 'Optimizaci\u00f3n IA de Rutas',
    description:
      'Algoritmos de enrutamiento inteligente que priorizan HCPs de alto valor, minimizando kil\u00f3metros recorridos y maximizando el tiempo cara-a-cara con m\u00e9dicos clave.',
  },
  {
    icon: '\uD83D\uDCAC',
    title: 'Chat WhatsApp Integrado',
    description:
      'Tus representantes reciben la ruta del d\u00eda, alertas de re-ruteo y briefings directamente en WhatsApp. Sin apps adicionales, sin fricci\u00f3n.',
  },
  {
    icon: '\uD83D\uDCCB',
    title: 'Briefings Inteligentes',
    description:
      'Antes de cada visita, el rep recibe un resumen con historial de interacciones, productos de inter\u00e9s y puntos clave de conversaci\u00f3n generados por IA.',
  },
  {
    icon: '\uD83D\uDD04',
    title: 'Re-ruteo Din\u00e1mico',
    description:
      'Cancelaciones, tr\u00e1fico o emergencias? Vistara recalcula la ruta en tiempo real y notifica al visitador con la mejor alternativa disponible.',
  },
  {
    icon: '\uD83D\uDD17',
    title: 'Sincronizaci\u00f3n CRM',
    description:
      'Integraci\u00f3n bidireccional con Veeva, Salesforce y IQVIA. Las visitas se registran autom\u00e1ticamente con geolocalizaci\u00f3n y duraci\u00f3n verificada.',
  },
  {
    icon: '\uD83D\uDEE1\uFE0F',
    title: 'Cumplimiento Regulatorio',
    description:
      'Frecuencias de visita, restricciones de zona y l\u00edmites regulatorios de Panam\u00e1 integrados en cada ruta. Auditor\u00eda completa en un clic.',
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
      'Desde que implementamos Vistara, nuestros visitadores cubren un 30% m\u00e1s de m\u00e9dicos clase A por semana. La diferencia en productividad es impresionante.',
    name: 'Dra. Carolina M\u00e9ndez',
    role: 'Directora Comercial',
    company: 'BioGenesis Pharma',
  },
  {
    quote:
      'El re-ruteo din\u00e1mico nos ha salvado incontables visitas perdidas. Cuando un m\u00e9dico cancela, el sistema ya tiene la alternativa lista en WhatsApp.',
    name: 'Roberto Castillo',
    role: 'Gerente de Fuerza de Ventas',
    company: 'MediLatam',
  },
  {
    quote:
      'Lo que m\u00e1s valoro es que los reps lo adoptaron sin resistencia. Llega por WhatsApp, es intuitivo, y los briefings pre-visita les dan una confianza enorme.',
    name: 'Lic. Valeria Ng',
    role: 'Representante M\u00e9dica Senior',
    company: 'Isthmus Therapeutics',
  },
]

/* ------------------------------------------------------------------ */
/*  WhatsApp Mockup Component                                          */
/* ------------------------------------------------------------------ */
function WhatsAppMockup() {
  return (
    <div className="w-full max-w-[380px] mx-auto">
      {/* Phone frame */}
      <div
        className="rounded-[2rem] overflow-hidden border border-white/[0.08] shadow-2xl"
        style={{
          background: 'linear-gradient(145deg, #1A2236 0%, #111827 100%)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(34,211,238,0.08)',
        }}
      >
        {/* WhatsApp header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#075E54]">
          <div className="w-9 h-9 rounded-full bg-[#22D3EE]/20 flex items-center justify-center text-xs font-bold text-[#22D3EE]">
            V
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-tight">Vistara Bot</p>
            <p className="text-[11px] text-white/60">en l\u00ednea</p>
          </div>
        </div>

        {/* Chat body */}
        <div
          className="px-3 py-4 space-y-3 min-h-[280px]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 5 L35 15 L30 12 L25 15Z\' fill=\'%23ffffff05\'/%3E%3C/svg%3E")',
            backgroundColor: '#0B141A',
          }}
        >
          {/* Bot message */}
          <div className="flex justify-start">
            <div className="bg-[#1A2236] rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] border border-white/[0.04]">
              <p className="text-[13px] text-[#F8FAFC] leading-relaxed">
                Buenos d\u00edas, Carlos. Tu ruta de hoy est\u00e1 lista.
              </p>
              <p className="text-[10px] text-[#94A3B8] text-right mt-1">7:02 AM</p>
            </div>
          </div>

          {/* Route card */}
          <div className="flex justify-start">
            <div className="bg-[#1A2236] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] border border-white/[0.04]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#22D3EE] text-sm">{'\uD83D\uDCCD'}</span>
                <p className="text-[13px] font-semibold text-[#22D3EE]">Ruta optimizada \u2014 5 visitas</p>
              </div>
              <div className="space-y-1.5 text-[12px] text-[#F8FAFC]/80">
                <p>1. Dr. Ram\u00edrez \u2014 Cl\u00ednica San Fernando <span className="text-[#22D3EE]">(A+)</span></p>
                <p>2. Dra. Patel \u2014 Hospital Nacional <span className="text-[#22D3EE]">(A+)</span></p>
                <p>3. Dr. Vega \u2014 Centro M\u00e9dico Paitilla <span className="text-[#94A3B8]">(B)</span></p>
                <p>4. Dra. Morales \u2014 Consultorios Am\u00e9rica <span className="text-[#22D3EE]">(A)</span></p>
                <p>5. Dr. Chen \u2014 Cl\u00ednica Pacifica <span className="text-[#94A3B8]">(B)</span></p>
              </div>
              <div className="mt-3 pt-2 border-t border-white/[0.06] flex items-center gap-4 text-[11px] text-[#94A3B8]">
                <span>{'\u23F1'} 47 min en ruta</span>
                <span>{'\uD83D\uDCCA'} 3 visitas A+</span>
              </div>
              <p className="text-[10px] text-[#94A3B8] text-right mt-1">7:02 AM</p>
            </div>
          </div>

          {/* Briefing message */}
          <div className="flex justify-start">
            <div className="bg-[#1A2236] rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%] border border-white/[0.04]">
              <p className="text-[13px] text-[#F8FAFC] leading-relaxed">
                {'\uD83D\uDCCB'} <span className="font-semibold text-[#8B5CF6]">Briefing \u2014 Dr. Ram\u00edrez:</span> Prescribe Losart\u00e1n 50mg. \u00daltima visita: 14 d\u00edas. Interes\u00e9 en nueva presentaci\u00f3n pedi\u00e1trica.
              </p>
              <p className="text-[10px] text-[#94A3B8] text-right mt-1">7:03 AM</p>
            </div>
          </div>

          {/* User reply */}
          <div className="flex justify-end">
            <div className="bg-[#005C4B] rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[75%]">
              <p className="text-[13px] text-white leading-relaxed">Perfecto, salgo en 10 min {'\uD83D\uDC4D'}</p>
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
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#22D3EE]/20 bg-[#22D3EE]/[0.06] mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
                <span className="text-xs font-medium text-[#22D3EE] tracking-wide uppercase" style={{ fontFamily: 'var(--font-ibm)' }}>
                  Disponible en Panam\u00e1
                </span>
              </div>

              <h1
                className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight text-[#F8FAFC]"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                Inteligencia de rutas para equipos comerciales{' '}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)',
                  }}
                >
                  pharma
                </span>
              </h1>

              <p
                className="mt-6 text-lg md:text-xl text-[#94A3B8] max-w-xl leading-relaxed mx-auto lg:mx-0"
                style={{ fontFamily: 'var(--font-ibm)' }}
              >
                Vistara optimiza las rutas de tus visitadores m\u00e9dicos con IA, aumentando visitas de alto valor y
                reduciendo tiempo en tr\u00e1nsito.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-base font-semibold bg-[#22D3EE] text-[#0A0E17] hover:bg-[#22D3EE]/90 transition-all shadow-[0_0_30px_rgba(34,211,238,0.25)] hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]"
                  style={{ fontFamily: 'var(--font-ibm)' }}
                >
                  Solicitar una demo
                </Link>
                <Link
                  href="/features"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-base font-semibold border border-white/[0.12] text-[#F8FAFC] hover:border-[#22D3EE]/40 hover:text-[#22D3EE] transition-all bg-white/[0.02]"
                  style={{ fontFamily: 'var(--font-ibm)' }}
                >
                  Ver caracter\u00edsticas
                </Link>
              </div>
            </div>

            {/* Right: WhatsApp mockup */}
            <div className="flex justify-center lg:justify-end animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
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
              'linear-gradient(180deg, rgba(17,24,39,0.8) 0%, rgba(26,34,54,0.5) 50%, rgba(17,24,39,0.8) 100%)',
          }}
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
            {/* Stat 1 */}
            <div ref={stat1.ref}>
              <p
                className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text"
                style={{
                  fontFamily: 'var(--font-syne)',
                  backgroundImage: 'linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)',
                }}
              >
                {stat1.display}
              </p>
              <p className="mt-2 text-base text-[#94A3B8]" style={{ fontFamily: 'var(--font-ibm)' }}>
                visitas A+ por semana
              </p>
            </div>

            {/* Stat 2 */}
            <div ref={stat2.ref} className="md:border-x md:border-white/[0.06]">
              <p
                className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text"
                style={{
                  fontFamily: 'var(--font-syne)',
                  backgroundImage: 'linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)',
                }}
              >
                {stat2.display}
              </p>
              <p className="mt-2 text-base text-[#94A3B8]" style={{ fontFamily: 'var(--font-ibm)' }}>
                tiempo de ruta diario
              </p>
            </div>

            {/* Stat 3 */}
            <div ref={stat3.ref}>
              <p
                className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text"
                style={{
                  fontFamily: 'var(--font-syne)',
                  backgroundImage: 'linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)',
                }}
              >
                {stat3.display}
              </p>
              <p className="mt-2 text-base text-[#94A3B8]" style={{ fontFamily: 'var(--font-ibm)' }}>
                adopci\u00f3n por representantes
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
            <p className="text-sm font-semibold tracking-widest uppercase text-[#22D3EE] mb-4" style={{ fontFamily: 'var(--font-ibm)' }}>
              Caracter\u00edsticas
            </p>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-[#F8FAFC] tracking-tight"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Todo lo que tu equipo necesita,{' '}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #22D3EE, #8B5CF6)' }}>
                en un solo lugar
              </span>
            </h2>
            <p className="mt-5 text-lg text-[#94A3B8]" style={{ fontFamily: 'var(--font-ibm)' }}>
              Desde la planificaci\u00f3n inteligente de rutas hasta el cumplimiento regulatorio, Vistara cubre cada aspecto de la operaci\u00f3n de campo farmac\u00e9utica.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group relative rounded-2xl p-7 border border-white/[0.06] bg-[#111827]/70 backdrop-blur-md hover:border-[#22D3EE]/20 transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.06)]"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.04) 0%, transparent 70%)' }} />

                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3
                  className="text-lg font-bold text-[#F8FAFC] mb-2"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm text-[#94A3B8] leading-relaxed"
                  style={{ fontFamily: 'var(--font-ibm)' }}
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
      <section className="py-20 border-y border-white/[0.06] bg-[#111827]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-center text-sm font-medium uppercase tracking-widest text-[#94A3B8] mb-12"
            style={{ fontFamily: 'var(--font-ibm)' }}
          >
            Empresas que conf\u00edan en Vistara
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {companies.map((name) => (
              <span
                key={name}
                className="text-lg md:text-xl font-bold text-[#94A3B8]/30 hover:text-[#94A3B8]/50 transition-colors select-none whitespace-nowrap"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                {name}
              </span>
            ))}
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
            <p className="text-sm font-semibold tracking-widest uppercase text-[#8B5CF6] mb-4" style={{ fontFamily: 'var(--font-ibm)' }}>
              Testimonios
            </p>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-[#F8FAFC] tracking-tight"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Lo que dicen nuestros clientes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="relative rounded-2xl p-8 border border-white/[0.06] bg-[#111827]/70 backdrop-blur-md"
              >
                {/* Quote mark */}
                <div
                  className="text-6xl font-bold leading-none mb-4 text-transparent bg-clip-text"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    backgroundImage: 'linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)',
                  }}
                >
                  {'\u201C'}
                </div>
                <p
                  className="text-[15px] text-[#F8FAFC]/90 leading-relaxed mb-8"
                  style={{ fontFamily: 'var(--font-ibm)' }}
                >
                  {t.quote}
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-[#0A0E17]"
                    style={{
                      backgroundImage: 'linear-gradient(135deg, #22D3EE, #8B5CF6)',
                    }}
                  >
                    {t.name.charAt(0)}
                    {t.name.split(' ').pop()?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#F8FAFC]" style={{ fontFamily: 'var(--font-syne)' }}>
                      {t.name}
                    </p>
                    <p className="text-xs text-[#94A3B8]" style={{ fontFamily: 'var(--font-ibm)' }}>
                      {t.role} &middot; {t.company}
                    </p>
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
            className="text-4xl md:text-6xl font-extrabold text-[#F8FAFC] tracking-tight leading-tight"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Transforma las rutas de tu equipo{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #22D3EE, #8B5CF6)' }}
            >
              comercial
            </span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-[#94A3B8] max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-ibm)' }}>
            \u00danete a las empresas farmac\u00e9uticas en Panam\u00e1 que ya est\u00e1n maximizando cada d\u00eda de campo con inteligencia artificial.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full text-base font-semibold bg-[#22D3EE] text-[#0A0E17] hover:bg-[#22D3EE]/90 transition-all shadow-[0_0_30px_rgba(34,211,238,0.25)] hover:shadow-[0_0_50px_rgba(34,211,238,0.4)]"
              style={{ fontFamily: 'var(--font-ibm)' }}
            >
              Solicitar una demo
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full text-base font-semibold border border-white/[0.12] text-[#F8FAFC] hover:border-[#8B5CF6]/40 hover:text-[#8B5CF6] transition-all bg-white/[0.02]"
              style={{ fontFamily: 'var(--font-ibm)' }}
            >
              Ver precios
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CSS Keyframes for animations                                */}
      {/* ============================================================ */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}
