'use client'

import { useState } from 'react'
import Link from 'next/link'

const tiers = [
  {
    name: 'Starter',
    price: '$49',
    unit: '/rep/mes',
    description: 'Para equipos pequeños que buscan optimizar sus rutas de visita médica.',
    limit: 'Hasta 10 representantes',
    popular: false,
    features: [
      'Optimización de rutas con IA',
      'Chat WhatsApp integrado',
      'Analíticas básicas de rendimiento',
      'Soporte por correo electrónico',
      'Dashboard de equipo',
      'Exportación de reportes PDF',
    ],
    cta: 'Comenzar ahora',
    ctaHref: '/contact',
  },
  {
    name: 'Professional',
    price: '$39',
    unit: '/rep/mes',
    description: 'Todo lo que necesitas para maximizar la productividad de tu equipo de campo.',
    limit: 'Hasta 50 representantes',
    popular: true,
    features: [
      'Todo lo de Starter, más:',
      'Briefings inteligentes pre-visita',
      'Re-ruteo dinámico en tiempo real',
      'Sincronización CRM bidireccional',
      'Analíticas avanzadas y dashboards',
      'Soporte prioritario (respuesta < 4h)',
      'Cumplimiento regulatorio básico',
      'API de integraciones',
    ],
    cta: 'Comenzar ahora',
    ctaHref: '/contact',
  },
  {
    name: 'Enterprise',
    price: 'Personalizado',
    unit: '',
    description: 'Solución a medida para grandes operaciones farmacéuticas en la región.',
    limit: 'Representantes ilimitados',
    popular: false,
    features: [
      'Todo lo de Professional, más:',
      'Integraciones personalizadas',
      'Customer Success Manager dedicado',
      'SLA garantizado (99.9% uptime)',
      'Opción de despliegue on-premise',
      'Cumplimiento regulatorio avanzado',
      'Capacitación presencial del equipo',
      'Soporte 24/7 con gerente de cuenta',
    ],
    cta: 'Contactar ventas',
    ctaHref: '/contact',
  },
]

const comparisonFeatures = [
  { name: 'Representantes', starter: 'Hasta 10', professional: 'Hasta 50', enterprise: 'Ilimitados' },
  { name: 'Optimización de rutas IA', starter: true, professional: true, enterprise: true },
  { name: 'Chat WhatsApp', starter: true, professional: true, enterprise: true },
  { name: 'Analíticas básicas', starter: true, professional: true, enterprise: true },
  { name: 'Briefings inteligentes', starter: false, professional: true, enterprise: true },
  { name: 'Re-ruteo dinámico', starter: false, professional: true, enterprise: true },
  { name: 'Sincronización CRM', starter: false, professional: true, enterprise: true },
  { name: 'Analíticas avanzadas', starter: false, professional: true, enterprise: true },
  { name: 'API de integraciones', starter: false, professional: true, enterprise: true },
  { name: 'Cumplimiento regulatorio', starter: false, professional: 'Básico', enterprise: 'Avanzado' },
  { name: 'Integraciones personalizadas', starter: false, professional: false, enterprise: true },
  { name: 'CSM dedicado', starter: false, professional: false, enterprise: true },
  { name: 'SLA garantizado', starter: false, professional: false, enterprise: true },
  { name: 'Opción on-premise', starter: false, professional: false, enterprise: true },
  { name: 'Capacitación presencial', starter: false, professional: false, enterprise: true },
  { name: 'Soporte', starter: 'Email', professional: 'Prioritario', enterprise: '24/7 dedicado' },
]

const faqs = [
  {
    question: '¿Puedo cambiar de plan en cualquier momento?',
    answer:
      'Sí, puedes escalar o reducir tu plan en cualquier momento. Los cambios se aplican en tu próximo ciclo de facturación. Si escalas a un plan superior, se prorratean los días restantes del ciclo actual.',
  },
  {
    question: '¿Hay compromiso de permanencia mínima?',
    answer:
      'No exigimos contratos a largo plazo. Nuestros planes son mensuales y puedes cancelar cuando quieras. Para clientes Enterprise, ofrecemos descuentos por compromisos anuales que van del 15% al 25%.',
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer:
      'Aceptamos tarjetas de crédito (Visa, Mastercard, American Express), transferencias bancarias locales en Panamá y ACH. Para clientes Enterprise, también ofrecemos facturación por orden de compra con términos neto-30.',
  },
  {
    question: '¿Ofrecen un período de prueba gratuito?',
    answer:
      'Sí, ofrecemos 14 días de prueba gratuita sin necesidad de tarjeta de crédito en los planes Starter y Professional. Durante la prueba tienes acceso completo a todas las funcionalidades del plan seleccionado.',
  },
  {
    question: '¿Los precios incluyen la configuración inicial?',
    answer:
      'Los planes Starter y Professional incluyen onboarding guiado virtual sin costo adicional. El plan Enterprise incluye configuración completa, migración de datos, integraciones personalizadas y capacitación presencial como parte del acuerdo.',
  },
  {
    question: '¿Cómo funciona la facturación por representante?',
    answer:
      'Se factura por cada usuario activo con rol de representante en la plataforma. Los gerentes y administradores no generan costo adicional. Si un representante es desactivado durante el mes, deja de facturarse en el siguiente ciclo.',
  },
]

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-[#22D3EE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg className="w-5 h-5 text-[#94A3B8]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return value ? <CheckIcon /> : <XIcon />
  }
  return <span className="text-sm text-[#F8FAFC]">{value}</span>
}

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="pt-24 pb-32">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8B5CF6]/20 bg-[#8B5CF6]/5 text-[#8B5CF6] text-sm mb-6">
          Precios
        </span>
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F8FAFC] mb-6"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          Precios simples y transparentes
        </h1>
        <p className="text-lg sm:text-xl text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
          Sin costos ocultos. Sin sorpresas. Elige el plan que mejor se adapte al
          tamaño y las necesidades de tu equipo de campo.
        </p>
      </section>

      {/* Pricing cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-3xl border p-8 flex flex-col ${
                tier.popular
                  ? 'border-[#22D3EE]/30 bg-[#111827] shadow-[0_0_40px_rgba(34,211,238,0.1)]'
                  : 'border-white/[0.06] bg-[#111827]/50'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#22D3EE] text-[#0A0E17] text-xs font-bold uppercase tracking-wider">
                    Más popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3
                  className="text-xl font-bold text-[#F8FAFC] mb-2"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {tier.name}
                </h3>
                <p className="text-sm text-[#94A3B8] mb-6">{tier.description}</p>
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-4xl sm:text-5xl font-bold text-[#F8FAFC]"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {tier.price}
                  </span>
                  {tier.unit && <span className="text-[#94A3B8] text-base">{tier.unit}</span>}
                </div>
                <p className="text-sm text-[#94A3B8] mt-2">{tier.limit}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-sm text-[#F8FAFC]/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.ctaHref}
                className={`block text-center py-3.5 rounded-full font-semibold text-base transition-all ${
                  tier.popular
                    ? 'bg-[#22D3EE] text-[#0A0E17] hover:bg-[#22D3EE]/90 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                    : 'border border-white/[0.06] text-[#F8FAFC] hover:border-[#22D3EE]/40 hover:text-[#22D3EE]'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-[#111827]/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] text-center mb-16"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Comparación detallada de planes
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left py-4 pr-8 text-sm font-medium text-[#94A3B8] w-1/4">
                    Funcionalidad
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-[#94A3B8] w-1/4">
                    Starter
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-[#22D3EE] w-1/4">
                    Professional
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-medium text-[#94A3B8] w-1/4">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, i) => (
                  <tr key={i} className="border-b border-white/[0.04]">
                    <td className="py-4 pr-8 text-sm text-[#F8FAFC]">{row.name}</td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center">
                        <CellValue value={row.starter} />
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center">
                        <CellValue value={row.professional} />
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex justify-center">
                        <CellValue value={row.enterprise} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] text-center mb-16"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Preguntas frecuentes
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/[0.06] bg-[#111827]/50 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                >
                  <span className="text-base font-medium text-[#F8FAFC] pr-8">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-[#94A3B8] transition-transform duration-200 shrink-0 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5">
                    <p className="text-[#94A3B8] text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#111827]/50 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] mb-6"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            ¿Listo para optimizar tu equipo de campo?
          </h2>
          <p className="text-lg text-[#94A3B8] mb-10 max-w-2xl mx-auto">
            Comienza tu prueba gratuita de 14 días. Sin tarjeta de crédito. Sin
            compromisos.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#22D3EE] text-[#0A0E17] font-semibold text-base hover:bg-[#22D3EE]/90 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          >
            Comenzar prueba gratuita
          </Link>
        </div>
      </section>
    </div>
  )
}
