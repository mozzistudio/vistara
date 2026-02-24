import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Seguridad',
  description: 'Cómo Vistara protege tus datos. Cifrado, controles de acceso, cumplimiento y más.',
}

const EncryptionIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    <circle cx="12" cy="16.5" r="1.5" />
  </svg>
)

const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l8 4v6c0 5.25-3.5 8.75-8 10-4.5-1.25-8-4.75-8-10V6l8-4z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)

const PinIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
)

const KeyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FB923C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="15" r="5" />
    <path d="M11.5 11.5L17 6" />
    <path d="M15 8l2-2" />
    <path d="M17 6l2 2" />
  </svg>
)

const EyeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const AlertIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

const securityFeatures = [
  {
    icon: <EncryptionIcon />,
    color: '#22D3EE',
    title: 'Cifrado de Datos',
    desc: 'AES-256 en reposo, TLS 1.3 en tránsito. Todas las comunicaciones entre el cliente y nuestros servidores están cifradas con los estándares más altos de la industria.',
  },
  {
    icon: <ShieldIcon />,
    color: '#8B5CF6',
    title: 'Cumplimiento SOC 2 Type II',
    desc: 'Nuestra infraestructura y procesos cumplen con los estándares SOC 2 Type II, verificados por auditores independientes anualmente.',
  },
  {
    icon: <PinIcon />,
    color: '#34D399',
    title: 'Residencia de Datos',
    desc: 'Los datos de clientes en Panamá se almacenan en centros de datos ubicados en la región de las Américas, cumpliendo con regulaciones locales de protección de datos.',
  },
  {
    icon: <KeyIcon />,
    color: '#FB923C',
    title: 'Control de Acceso',
    desc: 'RBAC (Control de Acceso Basado en Roles) granular, autenticación multifactor opcional, y registro de auditoría completo de todas las acciones de usuario.',
  },
  {
    icon: <EyeIcon />,
    color: '#22D3EE',
    title: 'Monitoreo Continuo',
    desc: 'Monitoreo 24/7 de infraestructura y aplicaciones, detección de anomalías con IA, y alertas automáticas ante comportamientos sospechosos.',
  },
  {
    icon: <AlertIcon />,
    color: '#F87171',
    title: 'Respuesta a Incidentes',
    desc: 'Plan de respuesta a incidentes documentado con SLA de notificación de 24 horas. Equipo dedicado de seguridad con simulacros trimestrales.',
  },
]

export default function SecurityPage() {
  return (
    <div className="pt-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#22D3EE]/20 bg-[#22D3EE]/5 mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l8 4v6c0 5.25-3.5 8.75-8 10-4.5-1.25-8-4.75-8-10V6l8-4z" />
            </svg>
            <p className="text-[#22D3EE] text-sm font-semibold tracking-widest uppercase" style={{ fontFamily: 'var(--font-ibm)' }}>Seguridad</p>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#F8FAFC] mb-6 leading-tight" style={{ fontFamily: 'var(--font-syne)' }}>
            Tu confianza es nuestra prioridad
          </h1>
          <p className="text-lg md:text-xl text-[#94A3B8] leading-relaxed" style={{ fontFamily: 'var(--font-ibm)' }}>
            En la industria farmac&eacute;utica, la seguridad de datos no es negociable. Vistara est&aacute; dise&ntilde;ada con seguridad desde el n&uacute;cleo.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityFeatures.map(feature => (
            <div
              key={feature.title}
              className="group relative rounded-2xl bg-[#111827]/70 backdrop-blur-xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_-8px_rgba(34,211,238,0.1)]"
            >
              {/* Gradient border effect using pseudo-element technique with background */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  padding: '1px',
                  background: `linear-gradient(135deg, ${feature.color}25, rgba(255,255,255,0.06) 50%, ${feature.color}15)`,
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                }}
              />
              {/* Hover gradient intensification */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  padding: '1px',
                  background: `linear-gradient(135deg, ${feature.color}50, rgba(255,255,255,0.1) 50%, ${feature.color}30)`,
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                }}
              />
              <div
                className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${feature.color}10` }}
              >
                {feature.icon}
              </div>
              <h3 className="relative text-lg font-bold text-[#F8FAFC] mb-3" style={{ fontFamily: 'var(--font-syne)' }}>
                {feature.title}
              </h3>
              <p className="relative text-sm text-[#94A3B8] leading-relaxed" style={{ fontFamily: 'var(--font-ibm)' }}>{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA section */}
        <div className="relative mt-20 rounded-2xl overflow-hidden">
          {/* Background gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #111827 0%, #1A2236 50%, #111827 100%)',
            }}
          />
          {/* Accent gradient orbs */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(ellipse 40% 60% at 10% 50%, rgba(34,211,238,0.12) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 90% 50%, rgba(139,92,246,0.12) 0%, transparent 70%)',
            }}
          />
          {/* Border */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              padding: '1px',
              background: 'linear-gradient(135deg, rgba(34,211,238,0.2), rgba(255,255,255,0.06) 50%, rgba(139,92,246,0.2))',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
            }}
          />
          <div className="relative px-8 py-14 md:py-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6" style={{ backgroundColor: 'rgba(34,211,238,0.08)' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l8 4v6c0 5.25-3.5 8.75-8 10-4.5-1.25-8-4.75-8-10V6l8-4z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#F8FAFC] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              &iquest;Preguntas sobre seguridad?
            </h2>
            <p className="text-[#94A3B8] mb-8 max-w-lg mx-auto text-base leading-relaxed" style={{ fontFamily: 'var(--font-ibm)' }}>
              Nuestro equipo de seguridad est&aacute; disponible para responder cualquier consulta y compartir documentaci&oacute;n de cumplimiento.
            </p>
            <a
              href="mailto:seguridad@vistara.ai"
              className="group/cta inline-flex items-center gap-3 px-8 py-4 rounded-full text-[#0A0E17] font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#22D3EE]/20 hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, #22D3EE, #8B5CF6)', fontFamily: 'var(--font-ibm)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4l-10 8L2 4" />
              </svg>
              seguridad@vistara.ai
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover/cta:translate-x-1">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
