import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Casos de uso',
  description:
    'Descubre cómo visitadores médicos, gerentes distritales y directores de ventas usan Vistara para optimizar rutas, mejorar cobertura y aumentar ingresos en Panamá.',
}

const personas = [
  {
    id: 'visitador',
    role: 'Visitador Médico',
    subtitle: 'Representante de campo',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    color: '#22D3EE',
    problem: {
      title: 'El problema',
      description:
        'Carlos es visitador médico en la Ciudad de Panamá. Cada día pasa más de 3 horas conduciendo entre consultorios, pierde tiempo valioso buscando estacionamiento y frecuentemente llega a consultorios donde el médico ya no está disponible.',
      bullets: [
        'Más de 3 horas diarias perdidas en desplazamiento',
        'Sin información actualizada sobre disponibilidad de médicos',
        'Baja frecuencia de visitas a HCPs de alto valor',
        'Registro manual de visitas al final del día',
      ],
    },
    solution: {
      title: 'La solución con Vistara',
      description:
        'Cada mañana a las 7:00 AM, Carlos recibe por WhatsApp su ruta optimizada del día. El algoritmo ha considerado el tráfico en tiempo real, los horarios de atención y la prioridad de cada visita.',
      bullets: [
        'Ruta optimizada entregada cada mañana por WhatsApp',
        'Navegación paso a paso con tiempos estimados precisos',
        'Briefings inteligentes antes de cada visita',
        'Registro de visita con un mensaje de voz',
      ],
    },
    results: [
      { metric: '+32%', label: 'Visitas A+ por semana' },
      { metric: '-41%', label: 'Tiempo de conducción' },
      { metric: '+2.5h', label: 'Horas productivas/día' },
      { metric: '98%', label: 'Precisión de registro' },
    ],
  },
  {
    id: 'gerente',
    role: 'Gerente Distrital',
    subtitle: 'Gestión de equipo regional',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    color: '#8B5CF6',
    problem: {
      title: 'El problema',
      description:
        'María lidera un equipo de 15 visitadores médicos en la región metropolitana de Panamá. No tiene visibilidad en tiempo real de qué están haciendo sus representantes, depende de reportes manuales que llegan incompletos.',
      bullets: [
        'Cero visibilidad en tiempo real de la actividad del equipo',
        'Reportes manuales tardíos, incompletos e inconsistentes',
        'Imposible identificar brechas de cobertura a tiempo',
        'Coaching basado en intuición, no en datos',
      ],
    },
    solution: {
      title: 'La solución con Vistara',
      description:
        'María accede a un dashboard en tiempo real que muestra la ubicación y progreso de cada representante. Las analíticas automatizadas destacan anomalías y áreas con baja cobertura.',
      bullets: [
        'Dashboard en tiempo real con ubicación y progreso del equipo',
        'Alertas automáticas de anomalías y bajo rendimiento',
        'Reportes automatizados semanales y mensuales',
        'Herramientas de coaching basadas en datos concretos',
      ],
    },
    results: [
      { metric: '+28%', label: 'Eficiencia del equipo' },
      { metric: '100%', label: 'Visibilidad en campo' },
      { metric: '-60%', label: 'Tiempo en reportes' },
      { metric: '+18%', label: 'Cobertura de territorio' },
    ],
  },
  {
    id: 'director',
    role: 'Director de Ventas',
    subtitle: 'Liderazgo comercial nacional',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="10" />
        <line x1="18" y1="20" x2="18" y2="4" />
        <line x1="6" y1="20" x2="6" y2="16" />
      </svg>
    ),
    color: '#34D399',
    problem: {
      title: 'El problema',
      description:
        'Roberto dirige las ventas farmacéuticas a nivel nacional con más de 60 representantes en 5 distritos. Enfrenta brechas de cobertura, riesgo de incumplimiento regulatorio y presión constante por demostrar ROI.',
      bullets: [
        'Brechas de cobertura en territorios clave sin detectar',
        'Riesgo de incumplimiento por falta de trail de auditoría',
        'Dificultad para demostrar ROI del equipo comercial',
        'Decisiones estratégicas basadas en datos fragmentados',
      ],
    },
    solution: {
      title: 'La solución con Vistara',
      description:
        'Roberto accede a analíticas territoriales que identifican brechas de cobertura, proyectan tendencias de ingreso y generan reportes de cumplimiento regulatorio automáticos.',
      bullets: [
        'Analíticas territoriales con detección de brechas',
        'Cumplimiento regulatorio con trail de auditoría completo',
        'Proyecciones de ingreso basadas en actividad de campo',
        'Simulador de escenarios para redistribución de territorios',
      ],
    },
    results: [
      { metric: '100%', label: 'Cumplimiento regulatorio' },
      { metric: '+15%', label: 'Crecimiento en ingresos' },
      { metric: '-45%', label: 'Brechas de cobertura' },
      { metric: '3.2x', label: 'ROI primer año' },
    ],
  },
]

export default function UseCasesPage() {
  return (
    <div className="pt-24 pb-32">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#22D3EE]/20 bg-[#22D3EE]/5 text-[#22D3EE] text-sm mb-6">
          Casos de uso
        </span>
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F8FAFC] mb-6"
          style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, letterSpacing: '-1px' }}
        >
          Impacto real en{' '}
          <span className="gradient-text">cada nivel</span>
        </h1>
        <p className="text-lg sm:text-xl text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
          Desde el visitador médico en campo hasta el director de ventas nacional,
          Vistara transforma la productividad en cada nivel de la organización.
        </p>
      </section>

      {/* Personas */}
      {personas.map((persona, index) => {
        const isAlt = index % 2 !== 0
        return (
          <section
            key={persona.id}
            className="py-24"
            style={{ background: isAlt ? 'rgba(17,24,39,0.3)' : 'transparent' }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Persona header */}
              <div className="flex items-center gap-5 mb-16">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{
                    backgroundColor: `${persona.color}10`,
                    border: `1px solid ${persona.color}20`,
                    color: persona.color,
                  }}
                >
                  {persona.icon}
                </div>
                <div>
                  <h2
                    className="text-3xl sm:text-4xl font-bold text-[#F8FAFC]"
                    style={{ fontFamily: 'var(--font-syne)', fontWeight: 800 }}
                  >
                    {persona.role}
                  </h2>
                  <p className="text-[#64748B] text-base">{persona.subtitle}</p>
                </div>
              </div>

              {/* Problem & Solution */}
              <div className="grid lg:grid-cols-2 gap-6 mb-12">
                {/* Problem */}
                <div className="rounded-2xl border border-white/[0.06] bg-[#0F1629]/50 p-7 lg:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-lg bg-[#EF4444]/8 border border-[#EF4444]/15 flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                      </svg>
                    </div>
                    <h3
                      className="text-lg font-bold text-[#F8FAFC]"
                      style={{ fontFamily: 'var(--font-syne)' }}
                    >
                      {persona.problem.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-5">
                    {persona.problem.description}
                  </p>
                  <ul className="space-y-2.5">
                    {persona.problem.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444]/40 mt-2 shrink-0" />
                        <span className="text-sm text-[#94A3B8]/80">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solution */}
                <div
                  className="rounded-2xl p-7 lg:p-8"
                  style={{
                    background: `linear-gradient(135deg, ${persona.color}06 0%, transparent 100%)`,
                    border: `1px solid ${persona.color}12`,
                  }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{
                        background: `${persona.color}10`,
                        border: `1px solid ${persona.color}20`,
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={persona.color} strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3
                      className="text-lg font-bold text-[#F8FAFC]"
                      style={{ fontFamily: 'var(--font-syne)' }}
                    >
                      {persona.solution.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-5">
                    {persona.solution.description}
                  </p>
                  <ul className="space-y-2.5">
                    {persona.solution.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <svg className="w-4 h-4 mt-0.5 shrink-0" style={{ color: persona.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="text-sm text-[#F8FAFC]/80">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Results */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {persona.results.map((result, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/[0.06] bg-[#0F1629]/30 p-5 text-center hover:border-white/[0.1] transition-colors"
                  >
                    <div
                      className="text-2xl sm:text-3xl font-bold mb-1"
                      style={{
                        fontFamily: 'var(--font-syne)',
                        fontWeight: 800,
                        color: persona.color,
                      }}
                    >
                      {result.metric}
                    </div>
                    <p className="text-xs text-[#64748B]">{result.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* CTA */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 30% 50%, rgba(34,211,238,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 70% 50%, rgba(139,92,246,0.06) 0%, transparent 60%)
          `,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] mb-5"
            style={{ fontFamily: 'var(--font-syne)', fontWeight: 800 }}
          >
            ¿Cuál es tu caso de uso?
          </h2>
          <p className="text-lg text-[#94A3B8] mb-10 max-w-xl mx-auto">
            Cuéntanos sobre tu equipo y te mostraremos cómo Vistara puede transformar tu operación.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-[#0A0E17] font-semibold text-base hover:brightness-110 transition-all"
              style={{
                background: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)',
                boxShadow: '0 0 24px rgba(34,211,238,0.2)',
              }}
            >
              Agendar una demo
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl border border-white/[0.08] text-[#F8FAFC] font-medium text-base hover:border-[#22D3EE]/30 hover:text-[#22D3EE] transition-all"
            >
              Explorar características
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
