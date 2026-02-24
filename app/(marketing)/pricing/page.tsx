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
    price: 'Custom',
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
    answer: 'Sí, puedes escalar o reducir tu plan en cualquier momento. Los cambios se aplican en tu próximo ciclo de facturación. Si escalas a un plan superior, se prorratean los días restantes del ciclo actual.',
  },
  {
    question: '¿Hay compromiso de permanencia mínima?',
    answer: 'No exigimos contratos a largo plazo. Nuestros planes son mensuales y puedes cancelar cuando quieras. Para clientes Enterprise, ofrecemos descuentos por compromisos anuales que van del 15% al 25%.',
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos tarjetas de crédito (Visa, Mastercard, American Express), transferencias bancarias locales en Panamá y ACH. Para clientes Enterprise, también ofrecemos facturación por orden de compra con términos neto-30.',
  },
  {
    question: '¿Ofrecen un período de prueba gratuito?',
    answer: 'Sí, ofrecemos 14 días de prueba gratuita sin necesidad de tarjeta de crédito en los planes Starter y Professional. Durante la prueba tienes acceso completo a todas las funcionalidades del plan seleccionado.',
  },
  {
    question: '¿Los precios incluyen la configuración inicial?',
    answer: 'Los planes Starter y Professional incluyen onboarding guiado virtual sin costo adicional. El plan Enterprise incluye configuración completa, migración de datos, integraciones personalizadas y capacitación presencial como parte del acuerdo.',
  },
  {
    question: '¿Cómo funciona la facturación por representante?',
    answer: 'Se factura por cada usuario activo con rol de representante en la plataforma. Los gerentes y administradores no generan costo adicional. Si un representante es desactivado durante el mes, deja de facturarse en el siguiente ciclo.',
  },
]

function CellValue({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return value ? (
      <div className="w-6 h-6 rounded-full bg-[#22D3EE]/10 flex items-center justify-center">
        <svg className="w-3.5 h-3.5 text-[#22D3EE]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    ) : (
      <div className="w-6 h-6 rounded-full bg-white/[0.02] flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-[#334155]" />
      </div>
    )
  }
  return <span className="text-sm text-[#F8FAFC] font-medium">{value}</span>
}

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="pt-24 pb-32">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#8B5CF6]/20 bg-[#8B5CF6]/5 text-[#8B5CF6] text-sm mb-6">
          Precios transparentes
        </span>
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F8FAFC] mb-6"
          style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, letterSpacing: '-1px' }}
        >
          Invierte en productividad,{' '}
          <span className="gradient-text">no en kilómetros</span>
        </h1>
        <p className="text-lg sm:text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
          Sin costos ocultos. Sin sorpresas. Elige el plan que mejor se adapte al
          tamaño y las necesidades de tu equipo de campo.
        </p>
      </section>

      {/* Pricing cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border p-8 flex flex-col transition-all duration-300 ${
                tier.popular
                  ? 'border-[#22D3EE]/25 bg-[#111827] scale-[1.02] shadow-[0_0_60px_rgba(34,211,238,0.08)]'
                  : 'border-white/[0.06] bg-[#111827]/50 hover:border-white/[0.1]'
              }`}
            >
              {/* Gradient top line for popular */}
              {tier.popular && (
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                  style={{ background: 'linear-gradient(90deg, #22D3EE, #8B5CF6)' }}
                />
              )}

              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span
                    className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{
                      background: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)',
                      color: '#0A0E17',
                      boxShadow: '0 4px 12px rgba(34,211,238,0.3)',
                    }}
                  >
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
                <p className="text-sm text-[#64748B] mb-6 leading-relaxed">{tier.description}</p>
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-4xl sm:text-5xl font-bold text-[#F8FAFC]"
                    style={{ fontFamily: 'var(--font-syne)', fontWeight: 800 }}
                  >
                    {tier.price}
                  </span>
                  {tier.unit && <span className="text-[#64748B] text-base">{tier.unit}</span>}
                </div>
                <p className="text-xs text-[#475569] mt-2">{tier.limit}</p>
              </div>

              <ul className="space-y-3.5 mb-8 flex-1">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    {i === 0 && feature.startsWith('Todo') ? (
                      <span className="text-xs text-[#8B5CF6] font-medium pt-0.5">{feature}</span>
                    ) : (
                      <>
                        <svg className="w-4 h-4 text-[#22D3EE] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="text-sm text-[#94A3B8]">{feature}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.ctaHref}
                className={`block text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  tier.popular
                    ? 'text-[#0A0E17] hover:brightness-110'
                    : 'border border-white/[0.08] text-[#F8FAFC] hover:border-[#22D3EE]/30 hover:text-[#22D3EE]'
                }`}
                style={tier.popular ? {
                  background: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)',
                  boxShadow: '0 0 24px rgba(34,211,238,0.2)',
                } : undefined}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-24" style={{ background: 'rgba(17,24,39,0.3)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] text-center mb-16"
            style={{ fontFamily: 'var(--font-syne)', fontWeight: 800 }}
          >
            Comparación detallada
          </h2>

          <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
            <table className="w-full">
              <thead>
                <tr style={{ background: 'rgba(17,24,39,0.6)' }}>
                  <th className="text-left py-4 px-6 text-xs font-medium uppercase tracking-wider text-[#64748B] w-1/4">
                    Funcionalidad
                  </th>
                  <th className="text-center py-4 px-4 text-xs font-medium uppercase tracking-wider text-[#64748B] w-1/4">
                    Starter
                  </th>
                  <th className="text-center py-4 px-4 text-xs font-medium uppercase tracking-wider text-[#22D3EE] w-1/4">
                    Professional
                  </th>
                  <th className="text-center py-4 px-4 text-xs font-medium uppercase tracking-wider text-[#64748B] w-1/4">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, i) => (
                  <tr
                    key={i}
                    className="border-t border-white/[0.04] hover:bg-white/[0.01] transition-colors"
                  >
                    <td className="py-3.5 px-6 text-sm text-[#94A3B8]">{row.name}</td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex justify-center">
                        <CellValue value={row.starter} />
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center" style={{ background: 'rgba(34,211,238,0.02)' }}>
                      <div className="flex justify-center">
                        <CellValue value={row.professional} />
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
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
            style={{ fontFamily: 'var(--font-syne)', fontWeight: 800 }}
          >
            Preguntas frecuentes
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/[0.06] overflow-hidden transition-colors"
                style={{ background: openFaq === index ? 'rgba(17,24,39,0.6)' : 'rgba(17,24,39,0.3)' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                >
                  <span className="text-[15px] font-medium text-[#F8FAFC] pr-8">
                    {faq.question}
                  </span>
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200"
                    style={{
                      background: openFaq === index ? 'rgba(34,211,238,0.1)' : 'rgba(255,255,255,0.04)',
                      transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    <svg
                      className="w-4 h-4 transition-colors"
                      style={{ color: openFaq === index ? '#22D3EE' : '#64748B' }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>
                <div
                  className="overflow-hidden transition-all duration-200"
                  style={{
                    maxHeight: openFaq === index ? '200px' : '0',
                    opacity: openFaq === index ? 1 : 0,
                  }}
                >
                  <div className="px-6 pb-5">
                    <p className="text-[#94A3B8] text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 30% 50%, rgba(34,211,238,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 70% 50%, rgba(139,92,246,0.06) 0%, transparent 60%),
            rgba(17,24,39,0.3)
          `,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#F8FAFC] mb-5"
            style={{ fontFamily: 'var(--font-syne)', fontWeight: 800 }}
          >
            ¿Listo para optimizar tu equipo?
          </h2>
          <p className="text-lg text-[#94A3B8] mb-10 max-w-xl mx-auto">
            14 días de prueba gratuita. Sin tarjeta de crédito. Sin compromisos.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-[#0A0E17] font-semibold text-base hover:brightness-110 transition-all"
            style={{
              background: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)',
              boxShadow: '0 0 30px rgba(34,211,238,0.25), 0 4px 12px rgba(0,0,0,0.3)',
            }}
          >
            Comenzar prueba gratuita
          </Link>
        </div>
      </section>
    </div>
  )
}
