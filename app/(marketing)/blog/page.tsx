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
    excerpt: 'Las particularidades del tráfico panameño y la distribución de hospitales hacen que la planificación manual de rutas sea ineficiente. Descubre estrategias basadas en datos.',
  },
  {
    slug: 'whatsapp-productividad-visitadores-medicos',
    title: 'WhatsApp como herramienta de productividad para visitadores médicos',
    date: '28 enero 2026',
    category: 'Productividad',
    excerpt: 'El 98% de los profesionales en Panamá usan WhatsApp. Aprende cómo convertir esta familiaridad en una ventaja operativa para equipos de campo.',
  },
  {
    slug: 'ia-ventas-pharma-guia-2026',
    title: 'IA en ventas pharma: guía 2026',
    date: '5 febrero 2026',
    category: 'Inteligencia Artificial',
    excerpt: 'Desde briefings automatizados hasta re-ruteo dinámico, la IA está redefiniendo cómo trabajan los equipos comerciales farmacéuticos.',
  },
  {
    slug: 'cumplimiento-regulatorio-visita-medica-centroamerica',
    title: 'Cumplimiento regulatorio y visita médica en Centroamérica',
    date: '12 febrero 2026',
    category: 'Regulación',
    excerpt: 'Navegar las regulaciones de visita médica en Panamá, Costa Rica y Guatemala requiere herramientas que integren compliance desde el diseño.',
  },
  {
    slug: 'roi-optimizacion-rutas-caso-practico',
    title: 'ROI de la optimización de rutas: caso práctico',
    date: '20 febrero 2026',
    category: 'ROI',
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

export default function BlogPage() {
  return (
    <div className="pt-24">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <p className="text-[#22D3EE] text-sm font-medium tracking-wider uppercase mb-4">Blog</p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#F8FAFC] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
          Artículos y recursos
        </h1>
        <p className="text-lg text-[#94A3B8] max-w-2xl">
          Insights sobre optimización de rutas, productividad comercial y tecnología para equipos pharma en Latinoamérica.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {articles.map((article, i) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className={`group rounded-xl bg-[#111827]/70 backdrop-blur-xl border border-white/[0.06] overflow-hidden hover:border-[#22D3EE]/20 transition-all ${
                i === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div className="h-48 bg-gradient-to-br from-[#1A2236] to-[#0A0E17] flex items-center justify-center">
                <span className="text-5xl opacity-30">📄</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${categoryColors[article.category] || '#94A3B8'}15`,
                      color: categoryColors[article.category] || '#94A3B8',
                    }}
                  >
                    {article.category}
                  </span>
                  <span className="text-xs text-[#94A3B8]">{article.date}</span>
                </div>
                <h2 className="text-lg font-bold text-[#F8FAFC] group-hover:text-[#22D3EE] transition-colors mb-2" style={{ fontFamily: 'var(--font-syne)' }}>
                  {article.title}
                </h2>
                <p className="text-sm text-[#94A3B8] leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>
                <span className="inline-block mt-4 text-sm text-[#22D3EE] font-medium">
                  Leer más →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
