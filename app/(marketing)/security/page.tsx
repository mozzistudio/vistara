import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Seguridad',
  description: 'Cómo Vistara protege tus datos. Cifrado, controles de acceso, cumplimiento y más.',
}

const securityFeatures = [
  {
    icon: '🔐',
    title: 'Cifrado de Datos',
    desc: 'AES-256 en reposo, TLS 1.3 en tránsito. Todas las comunicaciones entre el cliente y nuestros servidores están cifradas con los estándares más altos de la industria.',
  },
  {
    icon: '🛡️',
    title: 'Cumplimiento SOC 2 Type II',
    desc: 'Nuestra infraestructura y procesos cumplen con los estándares SOC 2 Type II, verificados por auditores independientes anualmente.',
  },
  {
    icon: '📍',
    title: 'Residencia de Datos',
    desc: 'Los datos de clientes en Panamá se almacenan en centros de datos ubicados en la región de las Américas, cumpliendo con regulaciones locales de protección de datos.',
  },
  {
    icon: '🔑',
    title: 'Control de Acceso',
    desc: 'RBAC (Control de Acceso Basado en Roles) granular, autenticación multifactor opcional, y registro de auditoría completo de todas las acciones de usuario.',
  },
  {
    icon: '🔍',
    title: 'Monitoreo Continuo',
    desc: 'Monitoreo 24/7 de infraestructura y aplicaciones, detección de anomalías con IA, y alertas automáticas ante comportamientos sospechosos.',
  },
  {
    icon: '🚨',
    title: 'Respuesta a Incidentes',
    desc: 'Plan de respuesta a incidentes documentado con SLA de notificación de 24 horas. Equipo dedicado de seguridad con simulacros trimestrales.',
  },
]

export default function SecurityPage() {
  return (
    <div className="pt-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[#22D3EE] text-sm font-medium tracking-wider uppercase mb-4">Seguridad</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#F8FAFC] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Tu confianza es nuestra prioridad
          </h1>
          <p className="text-lg text-[#94A3B8]">
            En la industria farmacéutica, la seguridad de datos no es negociable. Vistara está diseñada con seguridad desde el núcleo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityFeatures.map(feature => (
            <div key={feature.title} className="rounded-xl bg-[#111827]/70 backdrop-blur-xl border border-white/[0.06] p-6 hover:border-[#22D3EE]/20 transition-colors">
              <span className="text-3xl">{feature.icon}</span>
              <h3 className="text-lg font-bold text-[#F8FAFC] mt-4 mb-2" style={{ fontFamily: 'var(--font-syne)' }}>
                {feature.title}
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-xl bg-[#111827] border border-white/[0.06] p-8 text-center">
          <h2 className="text-2xl font-bold text-[#F8FAFC] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            ¿Preguntas sobre seguridad?
          </h2>
          <p className="text-[#94A3B8] mb-6">
            Nuestro equipo de seguridad está disponible para responder cualquier consulta y compartir documentación de cumplimiento.
          </p>
          <a href="mailto:seguridad@vistara.ai" className="inline-block px-6 py-3 rounded-full bg-[#22D3EE] text-[#0A0E17] font-medium text-sm hover:bg-[#22D3EE]/90 transition-all">
            seguridad@vistara.ai
          </a>
        </div>
      </section>
    </div>
  )
}
