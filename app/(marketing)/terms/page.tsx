import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos de Servicio',
  description: 'Términos y condiciones de uso de la plataforma Vistara.',
}

const sections = [
  {
    title: '1. Aceptación de los Términos',
    content: 'Al acceder o utilizar los servicios de Vistara, usted acepta estar sujeto a estos términos de servicio. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder al servicio.',
  },
  {
    title: '2. Descripción del Servicio',
    content: 'Vistara proporciona una plataforma de optimización de rutas e inteligencia comercial para equipos de ventas farmacéuticas. El servicio incluye optimización algorítmica de rutas, interfaz conversacional, dashboard analítico, y gestión de HCPs.',
  },
  {
    title: '3. Cuentas de Usuario',
    content: 'Usted es responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las actividades que ocurran bajo su cuenta. Debe notificarnos inmediatamente de cualquier uso no autorizado de su cuenta.',
  },
  {
    title: '4. Uso Aceptable',
    content: 'El servicio debe utilizarse exclusivamente para fines comerciales legítimos dentro de la industria farmacéutica. No está permitido el uso del servicio para actividades ilegales, el acceso no autorizado a datos de otros usuarios, o la ingeniería inversa de nuestros algoritmos.',
  },
  {
    title: '5. Propiedad Intelectual',
    content: 'Todo el contenido, diseño, código, algoritmos y marcas registradas de Vistara son propiedad exclusiva de Vistara Technologies S.A. Los datos que usted ingrese al sistema son de su propiedad y puede solicitar su exportación en cualquier momento.',
  },
  {
    title: '6. Disponibilidad del Servicio',
    content: 'Nos esforzamos por mantener una disponibilidad del 99.9%. Sin embargo, el servicio puede interrumpirse para mantenimiento programado, el cual será notificado con al menos 48 horas de anticipación.',
  },
  {
    title: '7. Limitación de Responsabilidad',
    content: 'Vistara no será responsable por daños indirectos, incidentales o consecuentes que resulten del uso del servicio. Nuestra responsabilidad total no excederá el monto pagado por el cliente en los 12 meses anteriores al reclamo.',
  },
  {
    title: '8. Ley Aplicable',
    content: 'Estos términos se regirán por las leyes de la República de Panamá. Cualquier disputa será resuelta en los tribunales de la Ciudad de Panamá.',
  },
  {
    title: '9. Contacto',
    content: 'Para consultas sobre estos términos: legal@vistara.ai',
  },
]

export default function TermsPage() {
  return (
    <div className="pt-24">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-[#94A3B8] text-xs mb-5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            Última actualización: 1 de enero de 2026
          </span>
          <h1
            className="text-3xl md:text-4xl font-bold text-[#F8FAFC] mb-3"
            style={{ fontFamily: 'var(--font-syne)', fontWeight: 800 }}
          >
            Términos de Servicio
          </h1>
          <p className="text-[#64748B] text-sm">
            Por favor lee estos términos cuidadosamente antes de usar la plataforma Vistara.
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <section
              key={i}
              className="group rounded-xl p-6 -mx-6 transition-colors hover:bg-white/[0.01]"
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
      </article>
    </div>
  )
}
