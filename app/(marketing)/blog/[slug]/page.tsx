import type { Metadata } from 'next'
import Link from 'next/link'

const articles: Record<string, { title: string; date: string; author: string; readTime: string; category: string; content: string }> = {
  'optimizar-rutas-visita-medica-panama': {
    title: 'Cómo optimizar las rutas de visita médica en Panamá',
    date: '15 enero 2026',
    author: 'Alejandro Morales',
    readTime: '8 min',
    category: 'Optimización',
    content: `La planificación de rutas para visitadores médicos en Panamá presenta desafíos únicos. Con más de 1.5 millones de habitantes concentrados en el área metropolitana, el tráfico en corredores como la Vía España, Tumba Muerto y el Corredor Sur puede agregar hasta 45 minutos por trayecto durante horas pico.

## El problema de la planificación manual

La mayoría de los equipos comerciales pharma en Panamá todavía planifican rutas manualmente. Los representantes médicos organizan sus visitas basándose en experiencia e intuición, sin considerar variables como patrones de tráfico, disponibilidad de HCPs o priorización por segmento.

Esto genera tres problemas principales:

- **Tiempo perdido en tránsito**: Un visitador promedio en Panamá Centro pasa 2+ horas al día en el auto
- **Baja cobertura de HCPs prioritarios**: Los doctores de segmento A+ reciben menos visitas de las necesarias
- **Fatiga y desmotivación**: Rutas ineficientes generan frustración y reducen la calidad de las interacciones

## El enfoque basado en datos

La optimización algorítmica de rutas considera simultáneamente: ubicación geográfica de cada HCP, ventanas de disponibilidad, frecuencia regulatoria por segmento, y condiciones de tráfico en tiempo real.

En nuestro análisis con equipos pharma panameños, la implementación de rutas optimizadas produjo resultados significativos: reducción del 41% en tiempo de tránsito, aumento del 32% en visitas a HCPs A+, y mejora del 28% en cobertura territorial.

## Consideraciones específicas para Panamá

El mercado panameño tiene particularidades que cualquier sistema de optimización debe considerar: la concentración de hospitales principales en el corredor Paitilla-San Fernando, los horarios de consulta que varían entre práctica privada y hospitales de la CSS, y las restricciones vehiculares en zonas como el Casco Antiguo.

## Implementación gradual

Recomendamos un enfoque en tres fases: primera semana de observación y datos base, segunda semana de rutas sugeridas con ajuste manual, y tercera semana de adopción completa. Este enfoque garantiza que los representantes se adapten naturalmente al nuevo sistema.`,
  },
  'whatsapp-productividad-visitadores-medicos': {
    title: 'WhatsApp como herramienta de productividad para visitadores médicos',
    date: '28 enero 2026',
    author: 'Roberto Castañeda',
    readTime: '6 min',
    category: 'Productividad',
    content: `En Panamá, WhatsApp no es solo una app de mensajería — es la infraestructura de comunicación del país. Con una penetración del 98% entre profesionales, cualquier herramienta que quiera ser adoptada por equipos de campo debe hablar el idioma de WhatsApp.

## Por qué WhatsApp como interfaz

Los CRMs tradicionales tienen tasas de adopción del 40-60% entre representantes de campo. ¿La razón? Interfaces complejas que requieren múltiples clicks y formularios. En contraste, una interfaz tipo chat logra adopciones del 95%+ porque replica un comportamiento que ya es natural.

## Casos de uso en pharma

Las aplicaciones más valiosas de una interfaz conversacional para visita médica incluyen: recibir la ruta optimizada del día cada mañana, obtener briefings pre-visita con un simple mensaje, registrar visitas completadas con voz o texto, y reportar cancelaciones para re-ruteo instantáneo.

## El factor de adopción

La clave está en la simplicidad. Un representante que puede escribir "visita 1 terminada" y que el sistema automáticamente registre la hora, actualice el CRM, y presente la siguiente visita, es un representante que usará el sistema consistentemente.

## Resultados medibles

En implementaciones piloto, los equipos que usan una interfaz conversacional reportan un 45% menos de tiempo en tareas administrativas, permitiendo más tiempo frente al profesional de salud.`,
  },
  'ia-ventas-pharma-guia-2026': {
    title: 'IA en ventas pharma: guía 2026',
    date: '5 febrero 2026',
    author: 'Dra. Sofía Herrera',
    readTime: '10 min',
    category: 'Inteligencia Artificial',
    content: `La inteligencia artificial está transformando las ventas farmacéuticas en tres dimensiones principales: optimización operativa, personalización de mensajes, y predicción de comportamiento.

## Optimización operativa con IA

Los algoritmos de ruteo inteligente van más allá del GPS tradicional. Consideran patrones históricos de disponibilidad de cada HCP, priorización dinámica basada en ciclo de ventas, condiciones de tráfico en tiempo real, y restricciones regulatorias de frecuencia.

## Briefings generados por IA

Antes de cada visita, un sistema de IA puede compilar: historial de interacciones previas, productos discutidos y reacciones, preferencias de comunicación del HCP, y datos clínicos relevantes recientes. Esto permite que cada conversación sea informada y personalizada.

## Predicción y re-ruteo

La IA puede anticipar cancelaciones basándose en patrones históricos y sugerir alternativas antes de que ocurran. Cuando una cancelación sí ocurre, el sistema recalcula la ruta en segundos, minimizando el impacto en la productividad del día.

## El horizonte 2026-2027

Las tendencias emergentes incluyen análisis de sentimiento en tiempo real, generación automática de materiales promocionales personalizados, y coaching asistido por IA basado en datos de rendimiento individual.`,
  },
  'cumplimiento-regulatorio-visita-medica-centroamerica': {
    title: 'Cumplimiento regulatorio y visita médica en Centroamérica',
    date: '12 febrero 2026',
    author: 'Alejandro Morales',
    readTime: '7 min',
    category: 'Regulación',
    content: `El cumplimiento regulatorio en la visita médica varía significativamente entre países de Centroamérica. En Panamá, la Dirección Nacional de Farmacia y Drogas establece lineamientos específicos sobre frecuencia y contenido de las visitas promocionales.

## Marco regulatorio en Panamá

Las principales consideraciones incluyen: registro de cada interacción con profesionales de salud, limitaciones en materiales promocionales, requisitos de reporting para muestras médicas, y normas sobre frecuencia de visita según categoría de producto.

## Herramientas de compliance integrado

Un sistema de gestión de visitas moderno debe integrar las reglas de cumplimiento directamente en el flujo de trabajo. Esto significa alertas automáticas cuando se acerca el límite de frecuencia, plantillas aprobadas para registro de visitas, y trazabilidad completa para auditorías.

## El costo del no-cumplimiento

Las multas regulatorias pueden ser significativas, pero el verdadero costo es reputacional. Un sistema que garantiza compliance por diseño protege tanto a la empresa como a los representantes individuales.

## Hacia la estandarización regional

Existe un movimiento hacia la armonización regulatoria en Centroamérica que facilitará la operación multi-país. Las herramientas que anticipen esta estandarización tendrán una ventaja competitiva.`,
  },
  'roi-optimizacion-rutas-caso-practico': {
    title: 'ROI de la optimización de rutas: caso práctico',
    date: '20 febrero 2026',
    author: 'Roberto Castañeda',
    readTime: '9 min',
    category: 'ROI',
    content: `Analizamos el impacto de la optimización de rutas en una farmacéutica mediana operando en el área metropolitana de Panamá con un equipo de 12 representantes médicos cubriendo 200+ HCPs.

## Situación inicial

Antes de la optimización, el equipo reportaba: promedio de 3.2 visitas diarias por representante, 2 horas y 15 minutos de tiempo en tránsito, cobertura del 68% en HCPs de segmento A+, y una tasa de visitas "improductivas" del 22%.

## Implementación y resultados a 90 días

Tras implementar optimización de rutas con IA, los resultados fueron: 4.8 visitas diarias promedio (+50%), 1 hora 20 minutos en tránsito (-41%), cobertura del 92% en HCPs A+ (+35%), y reducción de visitas improductivas al 8%.

## Análisis financiero

El costo del sistema representó una inversión de $39 por representante al mes. El retorno se calculó en función del aumento en frecuencia de visita a HCPs de alto valor, que se correlacionó con un incremento del 15% en prescripciones de los productos promovidos.

## Factores clave de éxito

Los elementos más importantes para el ROI fueron: adopción completa del equipo gracias a la interfaz conversacional, datos de calidad desde el día uno, y soporte continuo del gerente distrital como champion interno.

## Conclusión

El ROI de la optimización de rutas en pharma es medible y significativo. Con un período de payback de menos de 2 meses, es una de las inversiones tecnológicas más rentables disponibles para equipos comerciales farmacéuticos.`,
  },
}

const slugs = Object.keys(articles)

export async function generateStaticParams() {
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = articles[slug]
  if (!article) return { title: 'Artículo no encontrado' }
  return {
    title: article.title,
    description: article.content.substring(0, 160),
  }
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles[slug]

  if (!article) {
    return (
      <div className="pt-24 max-w-3xl mx-auto px-4 py-20">
        <p className="text-[#94A3B8]">Artículo no encontrado</p>
        <Link href="/blog" className="text-[#22D3EE] text-sm hover:underline mt-4 inline-block">← Volver al blog</Link>
      </div>
    )
  }

  const paragraphs = article.content.split('\n\n')

  return (
    <div className="pt-24">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link href="/blog" className="text-[#22D3EE] text-sm hover:underline mb-8 inline-block">← Volver al blog</Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#22D3EE]/15 text-[#22D3EE]">
            {article.category}
          </span>
          <span className="text-xs text-[#94A3B8]">{article.readTime} lectura</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-[#F8FAFC] mb-4 leading-tight" style={{ fontFamily: 'var(--font-syne)' }}>
          {article.title}
        </h1>

        <div className="flex items-center gap-4 mb-12 pb-8 border-b border-white/[0.06]">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-[#0A0E17]" style={{ background: 'linear-gradient(135deg, #22D3EE, #8B5CF6)' }}>
            {article.author.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-sm font-medium text-[#F8FAFC]">{article.author}</p>
            <p className="text-xs text-[#94A3B8]">{article.date}</p>
          </div>
        </div>

        <div className="prose-dark space-y-6">
          {paragraphs.map((p, i) => {
            if (p.startsWith('## ')) {
              return (
                <h2 key={i} className="text-xl font-bold text-[#F8FAFC] mt-10 mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
                  {p.replace('## ', '')}
                </h2>
              )
            }
            if (p.startsWith('- ')) {
              const items = p.split('\n').filter(l => l.startsWith('- '))
              return (
                <ul key={i} className="list-disc list-inside space-y-2 text-[#94A3B8] leading-relaxed">
                  {items.map((item, j) => {
                    const text = item.replace(/^- \*\*(.+?)\*\*: /, '')
                    const bold = item.match(/\*\*(.+?)\*\*/)
                    return (
                      <li key={j}>
                        {bold && <strong className="text-[#F8FAFC]">{bold[1]}: </strong>}
                        {text}
                      </li>
                    )
                  })}
                </ul>
              )
            }
            return (
              <p key={i} className="text-[#94A3B8] leading-relaxed">{p}</p>
            )
          })}
        </div>

        {/* Inline CTA */}
        <div className="mt-12 rounded-xl p-8 text-center" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.08) 0%, rgba(139,92,246,0.08) 100%)', border: '1px solid rgba(34,211,238,0.12)' }}>
          <h3 className="text-lg font-bold text-[#F8FAFC] mb-2" style={{ fontFamily: 'var(--font-syne)' }}>
            Optimiza las rutas de tu equipo hoy
          </h3>
          <p className="text-sm text-[#94A3B8] mb-5 max-w-md mx-auto">
            Solicita una demo personalizada y descubre cómo Vistara puede transformar la productividad de tu fuerza de ventas.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-semibold text-[#0A0E17] hover:brightness-110 transition-all"
            style={{ background: 'linear-gradient(135deg, #22D3EE, #06B6D4)', boxShadow: '0 0 20px rgba(34,211,238,0.2)' }}
          >
            Solicitar demo
          </Link>
        </div>

        {/* Related posts */}
        {(() => {
          const otherSlugs = slugs.filter(s => s !== slug)
          const related = otherSlugs.slice(0, 3)
          if (related.length === 0) return null
          return (
            <div className="mt-16 pt-8 border-t border-white/[0.06]">
              <h3 className="text-lg font-bold text-[#F8FAFC] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
                Artículos relacionados
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map(relSlug => {
                  const rel = articles[relSlug]
                  return (
                    <Link
                      key={relSlug}
                      href={`/blog/${relSlug}`}
                      className="group rounded-xl p-4 transition-all hover:-translate-y-0.5"
                      style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                      <span className="text-[10px] font-medium text-[#22D3EE] uppercase tracking-wider">{rel.category}</span>
                      <h4 className="text-sm font-bold text-[#F8FAFC] mt-1 mb-2 group-hover:text-[#22D3EE] transition-colors line-clamp-2" style={{ fontFamily: 'var(--font-syne)' }}>
                        {rel.title}
                      </h4>
                      <span className="text-xs text-[#94A3B8]">{rel.readTime} lectura</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )
        })()}

        <div className="mt-8 pt-8 border-t border-white/[0.06]">
          <Link href="/blog" className="text-[#22D3EE] text-sm hover:underline">← Volver al blog</Link>
        </div>
      </article>
    </div>
  )
}
