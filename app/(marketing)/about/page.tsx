import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre Nosotros',
  description: 'Conoce al equipo detrás de Vistara. Fundada en Panamá, democratizamos la optimización de ventas pharma en Latinoamérica.',
}

const team = [
  { name: 'Alejandro Morales', role: 'CEO & Co-fundador', bio: 'Ex-Director Comercial en MSD Panamá. 15 años en pharma LATAM.', initials: 'AM' },
  { name: 'Dra. Mei-Lin Chen', role: 'CTO & Co-fundadora', bio: 'PhD en Optimización Combinatoria, MIT. Ex-Google Maps routing team.', initials: 'MC' },
  { name: 'Roberto Castañeda', role: 'VP de Ventas', bio: 'Ex-Gerente Regional en Pfizer Centroamérica. Experto en fuerza de ventas.', initials: 'RC' },
  { name: 'Dra. Sofía Herrera', role: 'Head of AI', bio: 'PhD en Machine Learning, Stanford. Especialista en NLP y optimización.', initials: 'SH' },
]

const values = [
  { icon: '🎯', title: 'Impacto medible', desc: 'Cada función se mide por su impacto en visitas de alto valor y eficiencia de ruta.' },
  { icon: '🤝', title: 'Centrado en el usuario', desc: 'Diseñamos con y para los visitadores médicos, no contra ellos.' },
  { icon: '🔒', title: 'Cumplimiento primero', desc: 'La regulación pharma no es un obstáculo — es un requisito de diseño.' },
  { icon: '🌎', title: 'LATAM nativo', desc: 'Construido para las realidades del mercado latinoamericano desde el día uno.' },
]

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <p className="text-[#22D3EE] text-sm font-medium tracking-wider uppercase mb-4">Sobre Vistara</p>
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#F8FAFC] max-w-3xl leading-tight" style={{ fontFamily: 'var(--font-syne)' }}>
          Transformando la visita médica en Latinoamérica
        </h1>
        <p className="text-lg text-[#94A3B8] max-w-2xl mt-6 leading-relaxed">
          Fundada en 2024 en Ciudad de Panamá, Vistara nació de una frustración compartida: los visitadores médicos pasan más tiempo manejando que visitando doctores. Nuestra misión es cambiar eso con inteligencia artificial.
        </p>
      </section>

      {/* Story */}
      <section className="bg-[#111827] border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#F8FAFC] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
                Nuestra Historia
              </h2>
              <div className="space-y-4 text-[#94A3B8] leading-relaxed">
                <p>
                  Todo comenzó cuando Alejandro, tras 15 años dirigiendo equipos de ventas pharma en Panamá, se dio cuenta de un patrón: sus mejores representantes perdían el 40% de su tiempo en tránsito.
                </p>
                <p>
                  Al asociarse con Mei-Lin, experta en algoritmos de ruteo de Google Maps, encontraron que la tecnología de optimización existente ignoraba las particularidades de la visita médica: frecuencias regulatorias, segmentación de HCPs, y las realidades del tráfico panameño.
                </p>
                <p>
                  Vistara fue construida desde cero para pharma, no adaptada. Cada algoritmo, cada flujo de trabajo, cada dato está diseñado para maximizar el tiempo frente al doctor.
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-[#0A0E17] border border-white/[0.06] p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🇵🇦</div>
                <p className="text-xl font-bold text-[#F8FAFC]" style={{ fontFamily: 'var(--font-syne)' }}>Ciudad de Panamá</p>
                <p className="text-sm text-[#94A3B8] mt-2">Torre Global Bank, Piso 24</p>
                <p className="text-sm text-[#94A3B8]">Calle 50, Bella Vista</p>
                <p className="text-sm text-[#94A3B8]">Panamá, República de Panamá</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#F8FAFC] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Nuestra Misión
          </h2>
          <p className="text-xl text-[#94A3B8] leading-relaxed">
            Democratizar la optimización de ventas farmacéuticas en Latinoamérica, para que cada visitador médico pueda maximizar su impacto con los profesionales de salud que más importan.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[#111827] border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold text-[#F8FAFC] mb-12 text-center" style={{ fontFamily: 'var(--font-syne)' }}>
            Nuestro Equipo
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(member => (
              <div key={member.name} className="rounded-xl bg-[#0A0E17] border border-white/[0.06] p-6 text-center hover:border-[#22D3EE]/20 transition-colors">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold text-[#0A0E17]" style={{ background: 'linear-gradient(135deg, #22D3EE, #8B5CF6)' }}>
                  {member.initials}
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC]" style={{ fontFamily: 'var(--font-syne)' }}>{member.name}</h3>
                <p className="text-sm text-[#22D3EE] mt-1">{member.role}</p>
                <p className="text-xs text-[#94A3B8] mt-3 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-[#F8FAFC] mb-12 text-center" style={{ fontFamily: 'var(--font-syne)' }}>
          Nuestros Valores
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map(v => (
            <div key={v.title} className="p-6">
              <span className="text-3xl">{v.icon}</span>
              <h3 className="text-lg font-bold text-[#F8FAFC] mt-4 mb-2" style={{ fontFamily: 'var(--font-syne)' }}>{v.title}</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
