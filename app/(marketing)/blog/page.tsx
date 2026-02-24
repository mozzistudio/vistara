import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Artículos sobre optimización de rutas, visita médica, IA en pharma y productividad comercial en Panamá y Centroamérica.',
}

const articles = [
  {
    slug: 'optimizar-rutas-visita-medica-panama',
    title: 'Cómo optimizar las rutas de visita médica en Panamá',
    date: '15 enero 2026',
    category: 'Optimización',
    readingTime: 8,
    excerpt: 'Las particularidades del tráfico panameño y la distribución de hospitales hacen que la planificación manual de rutas sea ineficiente. Descubre estrategias basadas en datos.',
  },
  {
    slug: 'whatsapp-productividad-visitadores-medicos',
    title: 'WhatsApp como herramienta de productividad para visitadores médicos',
    date: '28 enero 2026',
    category: 'Productividad',
    readingTime: 5,
    excerpt: 'El 98% de los profesionales en Panamá usan WhatsApp. Aprende cómo convertir esta familiaridad en una ventaja operativa para equipos de campo.',
  },
  {
    slug: 'ia-ventas-pharma-guia-2026',
    title: 'IA en ventas pharma: guía 2026',
    date: '5 febrero 2026',
    category: 'Inteligencia Artificial',
    readingTime: 12,
    excerpt: 'Desde briefings automatizados hasta re-ruteo dinámico, la IA está redefiniendo cómo trabajan los equipos comerciales farmacéuticos.',
  },
  {
    slug: 'cumplimiento-regulatorio-visita-medica-centroamerica',
    title: 'Cumplimiento regulatorio y visita médica en Centroamérica',
    date: '12 febrero 2026',
    category: 'Regulación',
    readingTime: 7,
    excerpt: 'Navegar las regulaciones de visita médica en Panamá, Costa Rica y Guatemala requiere herramientas que integren compliance desde el diseño.',
  },
  {
    slug: 'roi-optimizacion-rutas-caso-practico',
    title: 'ROI de la optimización de rutas: caso práctico',
    date: '20 febrero 2026',
    category: 'ROI',
    readingTime: 6,
    excerpt: 'Un análisis detallado de cómo una farmacéutica mediana en Panamá aumentó un 32% las visitas a HCPs de alto valor con optimización de rutas.',
  },
]

const categoryColors: Record<string, string> = {
  'Optimización': '#22D3EE',
  'Productividad': '#34D399',
  'Inteligencia Artificial': '#8B5CF6',
  'Regulación': '#FB923C',
  'ROI': '#22D3EE',
}

/* Each category maps to a unique gradient direction + secondary color blend for visual variety */
const categoryGradients: Record<string, string> = {
  'Optimización': 'linear-gradient(135deg, #0A0E17 0%, #0d2a3a 40%, #133040 60%, #0A0E17 100%)',
  'Productividad': 'linear-gradient(150deg, #0A0E17 0%, #0d2a20 40%, #102a1e 60%, #0A0E17 100%)',
  'Inteligencia Artificial': 'linear-gradient(120deg, #0A0E17 0%, #1a1530 40%, #201a38 60%, #0A0E17 100%)',
  'Regulación': 'linear-gradient(160deg, #0A0E17 0%, #2a1c0d 40%, #2e1f10 60%, #0A0E17 100%)',
  'ROI': 'linear-gradient(140deg, #0A0E17 0%, #0d2530 40%, #102a36 60%, #0A0E17 100%)',
}

/* Category-specific SVG icon for the card header area */
function CategoryIcon({ category, color }: { category: string; color: string }) {
  switch (category) {
    case 'Optimización':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.35">
          <path d="M3 12h4l3-9 4 18 3-9h4" />
        </svg>
      )
    case 'Productividad':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.35">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      )
    case 'Inteligencia Artificial':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.35">
          <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
          <path d="M16 14a4 4 0 0 1 4 4v2H4v-2a4 4 0 0 1 4-4" />
          <circle cx="12" cy="6" r="1" fill={color} opacity="0.5" />
        </svg>
      )
    case 'Regulación':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.35">
          <path d="M12 2l8 4v6c0 5.25-3.5 8.75-8 10-4.5-1.25-8-4.75-8-10V6l8-4z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      )
    case 'ROI':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.35">
          <line x1="12" y1="20" x2="12" y2="10" />
          <line x1="18" y1="20" x2="18" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    default:
      return null
  }
}

export default function BlogPage() {
  return (
    <div className="pt-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="mb-14">
          <p className="text-[#22D3EE] text-sm font-semibold tracking-widest uppercase mb-5" style={{ fontFamily: 'var(--font-ibm)' }}>Blog</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#F8FAFC] mb-5 leading-tight" style={{ fontFamily: 'var(--font-syne)' }}>
            Art&iacute;culos y recursos
          </h1>
          <p className="text-lg md:text-xl text-[#94A3B8] max-w-2xl leading-relaxed" style={{ fontFamily: 'var(--font-ibm)' }}>
            Insights sobre optimizaci&oacute;n de rutas, productividad comercial y tecnolog&iacute;a para equipos pharma en Latinoam&eacute;rica.
          </p>
        </div>

        {/* Article grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {articles.map((article, i) => {
            const color = categoryColors[article.category] || '#94A3B8'
            const gradient = categoryGradients[article.category] || categoryGradients['Optimización']

            return (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className={`group relative rounded-2xl bg-[#111827]/70 backdrop-blur-xl border border-white/[0.06] overflow-hidden transition-all duration-300 hover:border-white/[0.12] hover:-translate-y-1.5 hover:shadow-[0_16px_48px_-12px_rgba(34,211,238,0.1)] ${
                  i === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Category-colored gradient header area */}
                <div
                  className="relative h-48 overflow-hidden"
                  style={{ background: gradient }}
                >
                  {/* Radial glow from category color */}
                  <div
                    className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-100 opacity-70"
                    style={{
                      background: `radial-gradient(ellipse 70% 60% at 50% 60%, ${color}12 0%, transparent 70%)`,
                    }}
                  />
                  {/* Dot pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage: 'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)',
                      backgroundSize: '16px 16px',
                    }}
                  />
                  {/* Diagonal accent line */}
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      background: `linear-gradient(135deg, transparent 40%, ${color}30 50%, transparent 60%)`,
                    }}
                  />
                  {/* Category icon centered */}
                  <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <CategoryIcon category={article.category} color={color} />
                  </div>
                  {/* Bottom fade to card body */}
                  <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(to top, rgba(17,24,39,0.7) 0%, transparent 100%)' }} />
                </div>

                {/* Card body */}
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
                      style={{
                        backgroundColor: `${color}12`,
                        color: color,
                        fontFamily: 'var(--font-ibm)',
                      }}
                    >
                      {article.category}
                    </span>
                    <span className="text-xs text-[#94A3B8]" style={{ fontFamily: 'var(--font-ibm)' }}>{article.date}</span>
                    <span className="flex items-center gap-1 text-xs text-[#94A3B8] ml-auto" style={{ fontFamily: 'var(--font-ibm)' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {article.readingTime} min
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors duration-300 mb-3 leading-snug" style={{ fontFamily: 'var(--font-syne)' }}>
                    {article.title}
                  </h2>
                  <p className="text-sm text-[#94A3B8] leading-relaxed line-clamp-2" style={{ fontFamily: 'var(--font-ibm)' }}>
                    {article.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold transition-all duration-300 group-hover:gap-2.5" style={{ color: color, fontFamily: 'var(--font-ibm)' }}>
                    Leer m&aacute;s
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
