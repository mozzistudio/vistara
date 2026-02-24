import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Características',
  description:
    'Descubre las funcionalidades de Vistara: optimización de rutas con IA, chat WhatsApp integrado, briefings inteligentes, re-ruteo dinámico, sincronización CRM y cumplimiento regulatorio para equipos pharma en Panamá.',
}

const features = [
  {
    id: 'route-optimization',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h4l3-9 4 18 3-9h4" />
      </svg>
    ),
    title: 'Optimización IA de Rutas',
    description:
      'Nuestro algoritmo de inteligencia artificial analiza más de 40 variables en tiempo real para calcular la secuencia óptima de visitas médicas. Considera el tráfico en Panamá, las ventanas de atención de cada profesional de salud, la prioridad de segmento y la ubicación geográfica para reducir el tiempo de conducción hasta un 41%.',
    bullets: [
      'Reducción promedio del 41% en tiempo de conducción entre visitas',
      'Priorización automática de HCPs de alto valor (segmentos A+ y A)',
      'Algoritmo adaptativo que aprende de patrones de tráfico panameños',
      'Consideración de ventanas de atención y horarios preferidos de cada médico',
    ],
    gradient: 'from-[#22D3EE]/20 to-transparent',
  },
  {
    id: 'whatsapp-chat',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
    title: 'Chat WhatsApp Integrado',
    description:
      'Interactúa con Vistara de la forma más natural posible: a través de una interfaz tipo WhatsApp. Recibe tu ruta optimizada cada mañana, registra visitas con un mensaje de voz, consulta información de médicos y reporta incidencias sin salir de la conversación.',
    bullets: [
      'Interfaz conversacional familiar tipo WhatsApp para adopción inmediata',
      'Comandos en lenguaje natural: "muéstrame mi ruta de hoy" o "registra visita con Dr. Pérez"',
      'Push automático de ruta optimizada cada mañana a las 7:00 AM',
      'Registro de visitas por texto o nota de voz con transcripción automática',
    ],
    gradient: 'from-[#8B5CF6]/20 to-transparent',
  },
  {
    id: 'smart-briefings',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    title: 'Briefings Inteligentes',
    description:
      'Antes de cada visita, recibe un resumen generado por IA con todo lo que necesitas saber. Historial de interacciones, productos discutidos, preferencias del médico, puntos de conversación recomendados y alertas relevantes para maximizar el impacto de cada encuentro.',
    bullets: [
      'Historial completo de visitas anteriores y temas tratados',
      'Preferencias del HCP: horarios, productos de interés, estilo de comunicación',
      'Puntos de conversación sugeridos basados en datos recientes del mercado',
    ],
    gradient: 'from-[#22D3EE]/20 to-transparent',
  },
  {
    id: 'dynamic-rerouting',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" />
        <polyline points="1 20 1 14 7 14" />
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
      </svg>
    ),
    title: 'Re-ruteo Dinámico',
    description:
      'Cuando un médico cancela, sale antes del consultorio o surge un imprevisto, Vistara recalcula tu ruta en segundos. El sistema identifica alternativas cercanas disponibles para que no pierdas productividad y mantengas tu cobertura al máximo.',
    bullets: [
      'Recálculo de ruta en menos de 3 segundos ante cancelaciones',
      'Sugerencias automáticas de HCPs alternativos cercanos y disponibles',
      'Cero pérdida de productividad por imprevistos en campo',
      'Notificaciones proactivas cuando se detectan cambios en disponibilidad',
    ],
    gradient: 'from-[#8B5CF6]/20 to-transparent',
  },
  {
    id: 'crm-sync',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 16 12 12 8 16" />
        <line x1="12" y1="12" x2="12" y2="21" />
        <polyline points="8 8 12 12 16 8" />
        <line x1="12" y1="12" x2="12" y2="3" />
      </svg>
    ),
    title: 'Sincronización CRM',
    description:
      'Conecta Vistara con tu CRM existente (Veeva, Salesforce, IQVIA u otros) mediante sincronización bidireccional en tiempo real. Cada visita registrada en Vistara se refleja automáticamente en tu CRM, eliminando la doble captura de datos y garantizando la integridad de la información.',
    bullets: [
      'Sincronización bidireccional con Veeva, Salesforce e IQVIA',
      'Registro automático de visitas sin entrada manual duplicada',
      'Actualización en tiempo real de datos de contacto y actividad',
    ],
    gradient: 'from-[#22D3EE]/20 to-transparent',
  },
  {
    id: 'compliance',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    title: 'Cumplimiento Regulatorio',
    description:
      'El cumplimiento regulatorio farmacéutico está integrado en cada aspecto de Vistara. El sistema aplica automáticamente las reglas de frecuencia de visita, genera trails de auditoría completos y asegura que cada interacción con profesionales de salud cumpla con las normativas de Panamá y la región centroamericana.',
    bullets: [
      'Reglas de frecuencia de visita configurables por producto y segmento',
      'Trail de auditoría completo para cada interacción registrada',
      'Alertas de cumplimiento en tiempo real antes de cada visita',
      'Reportes automatizados para inspecciones regulatorias',
    ],
    gradient: 'from-[#8B5CF6]/20 to-transparent',
  },
]

export default function FeaturesPage() {
  return (
    <div className="pt-24 pb-32">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#22D3EE]/20 bg-[#22D3EE]/5 text-[#22D3EE] text-sm mb-6">
          Plataforma completa
        </span>
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F8FAFC] mb-6"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          Características
        </h1>
        <p className="text-lg sm:text-xl text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
          Todo lo que tu equipo de campo necesita para visitar más médicos, en menos
          tiempo y con mayor impacto. Seis módulos diseñados específicamente para la
          industria farmacéutica en Panamá.
        </p>
      </section>

      {/* Feature sections */}
      {features.map((feature, index) => {
        const isReversed = index % 2 !== 0
        const bgClass = index % 2 === 0 ? 'bg-[#0A0E17]' : 'bg-[#111827]/50'

        return (
          <section key={feature.id} className={`${bgClass} py-24`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div
                className={`grid lg:grid-cols-2 gap-16 items-center ${
                  isReversed ? 'lg:direction-rtl' : ''
                }`}
              >
                {/* Text */}
                <div className={isReversed ? 'lg:order-2' : 'lg:order-1'}>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1A2236] border border-white/[0.06] mb-6">
                    {feature.icon}
                  </div>

                  <h2
                    className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] mb-6"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {feature.title}
                  </h2>

                  <p className="text-[#94A3B8] text-lg leading-relaxed mb-8">
                    {feature.description}
                  </p>

                  <ul className="space-y-4">
                    {feature.bullets.map((bullet, i) => (
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
                        <span className="text-[#F8FAFC]/80 text-base">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual placeholder */}
                <div className={isReversed ? 'lg:order-1' : 'lg:order-2'}>
                  <div
                    className={`relative rounded-3xl border border-white/[0.06] bg-gradient-to-br ${feature.gradient} bg-[#1A2236]/50 p-8 aspect-[4/3] flex items-center justify-center`}
                  >
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.02] to-transparent" />
                    <div className="relative text-center">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#0A0E17]/60 border border-white/[0.06] mb-4">
                        {feature.icon}
                      </div>
                      <p className="text-[#94A3B8] text-sm">Vista previa interactiva</p>
                    </div>
                  </div>
                </div>
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
            Experimenta todas las características en acción
          </h2>
          <p className="text-lg text-[#94A3B8] mb-10 max-w-2xl mx-auto">
            Agenda una demo personalizada y descubre cómo Vistara puede transformar la
            productividad de tu equipo comercial en Panamá.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#22D3EE] text-[#0A0E17] font-semibold text-base hover:bg-[#22D3EE]/90 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            >
              Solicitar demo gratuita
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-white/[0.06] text-[#F8FAFC] font-medium text-base hover:border-[#22D3EE]/40 hover:text-[#22D3EE] transition-all"
            >
              Ver precios
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
