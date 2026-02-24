import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de Vistara. Cómo recopilamos, usamos y protegemos tus datos.',
}

const sections = [
  {
    title: '1. Información que Recopilamos',
    content: 'Recopilamos información que usted nos proporciona directamente, incluyendo: nombre, dirección de correo electrónico, empresa, cargo, y datos de uso de la plataforma. También recopilamos datos de ubicación GPS necesarios para la optimización de rutas, con su consentimiento explícito.',
  },
  {
    title: '2. Uso de la Información',
    content: 'Utilizamos su información para: proporcionar y mantener nuestros servicios de optimización de rutas, personalizar su experiencia, enviar comunicaciones relacionadas con el servicio, y mejorar nuestros algoritmos de optimización. No vendemos ni compartimos su información personal con terceros para fines de marketing.',
  },
  {
    title: '3. Almacenamiento y Seguridad',
    content: 'Sus datos se almacenan en servidores seguros con cifrado AES-256 en reposo y TLS 1.3 en tránsito. Implementamos controles de acceso basados en roles, auditorías regulares, y copias de seguridad automáticas. Los datos de ubicación se anonimizan después de 90 días.',
  },
  {
    title: '4. Sus Derechos',
    content: 'Usted tiene derecho a: acceder a sus datos personales, solicitar su corrección o eliminación, oponerse al procesamiento, y solicitar la portabilidad de sus datos. Para ejercer estos derechos, contacte a privacidad@vistara.ai.',
  },
  {
    title: '5. Cookies',
    content: 'Utilizamos cookies esenciales para el funcionamiento de la plataforma y cookies analíticas para mejorar nuestros servicios. Puede gestionar sus preferencias de cookies a través de la configuración de su navegador.',
  },
  {
    title: '6. Contacto',
    content: 'Para preguntas sobre esta política de privacidad, contacte a: privacidad@vistara.ai o escriba a nuestra dirección: Torre Global Bank, Piso 24, Calle 50, Bella Vista, Ciudad de Panamá, Panamá.',
  },
]

export default function PrivacyPage() {
  return (
    <div className="pt-24">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-[#94A3B8] text-xs mb-5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Última actualización: 1 de enero de 2026
          </span>
          <h1
            className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-3"
            style={{ fontFamily: 'var(--font-syne)', fontWeight: 800 }}
          >
            Política de Privacidad
          </h1>
          <p className="text-[#64748B] text-sm">
            Tu privacidad es importante para nosotros. Esta política describe cómo manejamos tus datos.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-10">
          {/* Sticky TOC */}
          <nav className="hidden lg:block" aria-label="Tabla de contenidos">
            <div className="sticky top-28 space-y-2">
              <p className="text-[11px] font-medium uppercase tracking-wider text-[#64748B] mb-3">Contenido</p>
              {sections.map((section, i) => (
                <a
                  key={i}
                  href={`#privacy-section-${i}`}
                  className="block text-xs text-[#94A3B8] hover:text-[#22D3EE] transition-colors py-1 truncate"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </nav>

          {/* Content */}
          <div className="space-y-8">
            {sections.map((section, i) => (
              <section
                key={i}
                id={`privacy-section-${i}`}
                className="group rounded-xl p-6 -mx-6 transition-colors hover:bg-white/[0.01] scroll-mt-28"
              >
                <h2
                  className="text-lg font-bold text-[#F8FAFC] mb-3"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {section.title}
                </h2>
                <p className="text-[#94A3B8] leading-relaxed text-sm">{section.content}</p>
              </section>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}
