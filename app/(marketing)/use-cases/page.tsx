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
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    color: '#22D3EE',
    problem: {
      title: 'El problema',
      description:
        'Carlos es visitador médico en la Ciudad de Panamá. Cada día pasa más de 3 horas conduciendo entre consultorios, pierde tiempo valioso buscando estacionamiento y frecuentemente llega a consultorios donde el médico ya no está disponible. Sus visitas a médicos de alto valor (segmento A+) representan menos del 20% de su día.',
      bullets: [
        'Más de 3 horas diarias perdidas en desplazamiento',
        'Sin información actualizada sobre disponibilidad de médicos',
        'Baja frecuencia de visitas a HCPs de alto valor',
        'Registro manual de visitas al final del día (con datos incompletos)',
      ],
    },
    solution: {
      title: 'La solución con Vistara',
      description:
        'Cada mañana a las 7:00 AM, Carlos recibe por WhatsApp su ruta optimizada del día. El algoritmo ha considerado el tráfico en tiempo real, los horarios de atención de cada médico y la prioridad de cada visita. Entre consultas, recibe briefings automáticos con historial y puntos de conversación.',
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
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
        'María lidera un equipo de 15 visitadores médicos en la región metropolitana de Panamá. No tiene visibilidad en tiempo real de qué están haciendo sus representantes, depende de reportes manuales que llegan incompletos al final de la semana y no puede identificar rápidamente problemas de cobertura o rendimiento.',
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
        'María accede a un dashboard en tiempo real que muestra la ubicación y progreso de cada representante. Las analíticas automatizadas destacan anomalías, representantes que necesitan coaching y áreas con baja cobertura. Los reportes se generan automáticamente cada semana.',
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
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="10" />
        <line x1="18" y1="20" x2="18" y2="4" />
        <line x1="6" y1="20" x2="6" y2="16" />
        <rect x="2" y="20" width="20" height="2" rx="1" />
      </svg>
    ),
    color: '#22D3EE',
    problem: {
      title: 'El problema',
      description:
        'Roberto dirige las ventas farmacéuticas a nivel nacional con más de 60 representantes en 5 distritos. Enfrenta brechas de cobertura que resultan en médicos de alto valor sin visitar, riesgo de incumplimiento regulatorio por falta de trazabilidad y una presión constante por demostrar ROI de la fuerza de campo.',
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
        'Roberto accede a analíticas territoriales que identifican brechas de cobertura, proyectan tendencias de ingreso y generan reportes de cumplimiento regulatorio automáticos. Puede simular escenarios de redistribución de territorio y medir el impacto antes de implementar cambios.',
      bullets: [
        'Analíticas territoriales con detección de brechas de cobertura',
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
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          Casos de uso
        </h1>
        <p className="text-lg sm:text-xl text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
          Desde el visitador médico en campo hasta el director de ventas nacional,
          Vistara transforma la productividad en cada nivel de la organización
          farmacéutica.
        </p>
      </section>

      {/* Personas */}
      {personas.map((persona, index) => {
        const bgClass = index % 2 === 0 ? 'bg-[#0A0E17]' : 'bg-[#111827]/50'
        return (
          <section key={persona.id} className={`${bgClass} py-24`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Persona header */}
              <div className="flex items-center gap-5 mb-16">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/[0.06]"
                  style={{ backgroundColor: `${persona.color}10` }}
                >
                  {persona.icon}
                </div>
                <div>
                  <h2
                    className="text-3xl sm:text-4xl font-bold text-[#F8FAFC]"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {persona.role}
                  </h2>
                  <p className="text-[#94A3B8] text-lg">{persona.subtitle}</p>
                </div>
              </div>

              {/* Problem & Solution */}
              <div className="grid lg:grid-cols-2 gap-8 mb-16">
                {/* Problem */}
                <div className="rounded-3xl border border-white/[0.06] bg-[#1A2236]/50 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#EF4444]/10 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                      </svg>
                    </div>
                    <h3
                      className="text-xl font-bold text-[#F8FAFC]"
                      style={{ fontFamily: 'var(--font-syne)' }}
                    >
                      {persona.problem.title}
                    </h3>
                  </div>
                  <p className="text-[#94A3B8] leading-relaxed mb-6">
                    {persona.problem.description}
                  </p>
                  <ul className="space-y-3">
                    {persona.problem.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-[#EF4444]/60 mt-0.5 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>
                        <span className="text-sm text-[#F8FAFC]/70">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solution */}
                <div className="rounded-3xl border border-[#22D3EE]/10 bg-[#1A2236]/50 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#22D3EE]/10 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3
                      className="text-xl font-bold text-[#F8FAFC]"
                      style={{ fontFamily: 'var(--font-syne)' }}
                    >
                      {persona.solution.title}
                    </h3>
                  </div>
                  <p className="text-[#94A3B8] leading-relaxed mb-6">
                    {persona.solution.description}
                  </p>
                  <ul className="space-y-3">
                    {persona.solution.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-[#22D3EE] mt-0.5 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="text-sm text-[#F8FAFC]/80">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Results */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {persona.results.map((result, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/[0.06] bg-[#1A2236]/30 p-6 text-center"
                  >
                    <div
                      className="text-3xl sm:text-4xl font-bold mb-2"
                      style={{
                        fontFamily: 'var(--font-syne)',
                        color: persona.color,
                      }}
                    >
                      {result.metric}
                    </div>
                    <p className="text-sm text-[#94A3B8]">{result.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* CTA */}
      <section className="py-24 bg-[#0A0E17]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] mb-6"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            ¿Cuál es tu caso de uso?
          </h2>
          <p className="text-lg text-[#94A3B8] mb-10 max-w-2xl mx-auto">
            Cuéntanos sobre tu equipo y te mostraremos exactamente cómo Vistara
            puede transformar tu operación comercial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#22D3EE] text-[#0A0E17] font-semibold text-base hover:bg-[#22D3EE]/90 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            >
              Agendar una demo
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-white/[0.06] text-[#F8FAFC] font-medium text-base hover:border-[#22D3EE]/40 hover:text-[#22D3EE] transition-all"
            >
              Explorar características
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
