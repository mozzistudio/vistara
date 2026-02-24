import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad de Vistara. Cómo recopilamos, usamos y protegemos tus datos.',
}

export default function PrivacyPage() {
  return (
    <div className="pt-24">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-3xl font-extrabold text-[#F8FAFC] mb-2" style={{ fontFamily: 'var(--font-syne)' }}>
          Política de Privacidad
        </h1>
        <p className="text-sm text-[#94A3B8] mb-12">Última actualización: 1 de enero de 2026</p>

        <div className="space-y-8 text-[#94A3B8] leading-relaxed text-sm">
          <section>
            <h2 className="text-lg font-bold text-[#F8FAFC] mb-3" style={{ fontFamily: 'var(--font-syne)' }}>1. Información que Recopilamos</h2>
            <p>Recopilamos información que usted nos proporciona directamente, incluyendo: nombre, dirección de correo electrónico, empresa, cargo, y datos de uso de la plataforma. También recopilamos datos de ubicación GPS necesarios para la optimización de rutas, con su consentimiento explícito.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#F8FAFC] mb-3" style={{ fontFamily: 'var(--font-syne)' }}>2. Uso de la Información</h2>
            <p>Utilizamos su información para: proporcionar y mantener nuestros servicios de optimización de rutas, personalizar su experiencia, enviar comunicaciones relacionadas con el servicio, y mejorar nuestros algoritmos de optimización. No vendemos ni compartimos su información personal con terceros para fines de marketing.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#F8FAFC] mb-3" style={{ fontFamily: 'var(--font-syne)' }}>3. Almacenamiento y Seguridad</h2>
            <p>Sus datos se almacenan en servidores seguros con cifrado AES-256 en reposo y TLS 1.3 en tránsito. Implementamos controles de acceso basados en roles, auditorías regulares, y copias de seguridad automáticas. Los datos de ubicación se anonimizan después de 90 días.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#F8FAFC] mb-3" style={{ fontFamily: 'var(--font-syne)' }}>4. Sus Derechos</h2>
            <p>Usted tiene derecho a: acceder a sus datos personales, solicitar su corrección o eliminación, oponerse al procesamiento, y solicitar la portabilidad de sus datos. Para ejercer estos derechos, contacte a privacidad@vistara.ai.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#F8FAFC] mb-3" style={{ fontFamily: 'var(--font-syne)' }}>5. Cookies</h2>
            <p>Utilizamos cookies esenciales para el funcionamiento de la plataforma y cookies analíticas para mejorar nuestros servicios. Puede gestionar sus preferencias de cookies a través de la configuración de su navegador.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#F8FAFC] mb-3" style={{ fontFamily: 'var(--font-syne)' }}>6. Contacto</h2>
            <p>Para preguntas sobre esta política de privacidad, contacte a: privacidad@vistara.ai o escriba a nuestra dirección: Torre Global Bank, Piso 24, Calle 50, Bella Vista, Ciudad de Panamá, Panamá.</p>
          </section>
        </div>
      </article>
    </div>
  )
}
