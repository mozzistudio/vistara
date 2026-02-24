import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos de Servicio',
  description: 'Términos y condiciones de uso de la plataforma Vistara.',
}

export default function TermsPage() {
  return (
    <div className="pt-24">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-3xl font-extrabold text-[#F8FAFC] mb-2" style={{ fontFamily: 'var(--font-syne)' }}>
          Términos de Servicio
        </h1>
        <p className="text-sm text-[#94A3B8] mb-12">Última actualización: 1 de enero de 2026</p>

        <div className="space-y-8 text-[#94A3B8] leading-relaxed text-sm">
          <section>
            <h2 className="text-lg font-bold text-[#F8FAFC] mb-3" style={{ fontFamily: 'var(--font-syne)' }}>1. Aceptación de los Términos</h2>
            <p>Al acceder o utilizar los servicios de Vistara, usted acepta estar sujeto a estos términos de servicio. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder al servicio.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#F8FAFC] mb-3" style={{ fontFamily: 'var(--font-syne)' }}>2. Descripción del Servicio</h2>
            <p>Vistara proporciona una plataforma de optimización de rutas e inteligencia comercial para equipos de ventas farmacéuticas. El servicio incluye optimización algorítmica de rutas, interfaz conversacional, dashboard analítico, y gestión de HCPs.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#F8FAFC] mb-3" style={{ fontFamily: 'var(--font-syne)' }}>3. Cuentas de Usuario</h2>
            <p>Usted es responsable de mantener la confidencialidad de sus credenciales de acceso y de todas las actividades que ocurran bajo su cuenta. Debe notificarnos inmediatamente de cualquier uso no autorizado de su cuenta.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#F8FAFC] mb-3" style={{ fontFamily: 'var(--font-syne)' }}>4. Uso Aceptable</h2>
            <p>El servicio debe utilizarse exclusivamente para fines comerciales legítimos dentro de la industria farmacéutica. No está permitido el uso del servicio para actividades ilegales, el acceso no autorizado a datos de otros usuarios, o la ingeniería inversa de nuestros algoritmos.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#F8FAFC] mb-3" style={{ fontFamily: 'var(--font-syne)' }}>5. Propiedad Intelectual</h2>
            <p>Todo el contenido, diseño, código, algoritmos y marcas registradas de Vistara son propiedad exclusiva de Vistara Technologies S.A. Los datos que usted ingrese al sistema son de su propiedad y puede solicitar su exportación en cualquier momento.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#F8FAFC] mb-3" style={{ fontFamily: 'var(--font-syne)' }}>6. Disponibilidad del Servicio</h2>
            <p>Nos esforzamos por mantener una disponibilidad del 99.9%. Sin embargo, el servicio puede interrumpirse para mantenimiento programado, el cual será notificado con al menos 48 horas de anticipación.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#F8FAFC] mb-3" style={{ fontFamily: 'var(--font-syne)' }}>7. Limitación de Responsabilidad</h2>
            <p>Vistara no será responsable por daños indirectos, incidentales o consecuentes que resulten del uso del servicio. Nuestra responsabilidad total no excederá el monto pagado por el cliente en los 12 meses anteriores al reclamo.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#F8FAFC] mb-3" style={{ fontFamily: 'var(--font-syne)' }}>8. Ley Aplicable</h2>
            <p>Estos términos se regirán por las leyes de la República de Panamá. Cualquier disputa será resuelta en los tribunales de la Ciudad de Panamá.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#F8FAFC] mb-3" style={{ fontFamily: 'var(--font-syne)' }}>9. Contacto</h2>
            <p>Para consultas sobre estos términos: legal@vistara.ai</p>
          </section>
        </div>
      </article>
    </div>
  )
}
