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

const TargetIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)

const HandshakeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.5 11.5L17 8l-4.5 1L9 5.5 3.5 11" />
    <path d="M3.5 11L9 16.5l2.5-1 2 2 3-3 4-3" />
    <path d="M2 15l3.5-3.5" />
    <path d="M7 20l3.5-3.5" />
    <path d="M17.5 8.5l4 3.5" />
    <path d="M22 9l-4.5 4" />
  </svg>
)

const LockIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    <circle cx="12" cy="16.5" r="1.5" />
  </svg>
)

const GlobeIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FB923C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <ellipse cx="12" cy="12" rx="4" ry="10" />
    <path d="M2 12h20" />
  </svg>
)

const values = [
  { icon: <TargetIcon />, color: '#22D3EE', title: 'Impacto medible', desc: 'Cada función se mide por su impacto en visitas de alto valor y eficiencia de ruta.' },
  { icon: <HandshakeIcon />, color: '#8B5CF6', title: 'Centrado en el usuario', desc: 'Diseñamos con y para los visitadores médicos, no contra ellos.' },
  { icon: <LockIcon />, color: '#34D399', title: 'Cumplimiento primero', desc: 'La regulación pharma no es un obstáculo — es un requisito de diseño.' },
  { icon: <GlobeIcon />, color: '#FB923C', title: 'LATAM nativo', desc: 'Construido para las realidades del mercado latinoamericano desde el día uno.' },
]

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28">
        <div className="relative">
          {/* Subtle decorative element */}
          <div
            className="absolute -top-10 -left-20 w-72 h-72 rounded-full opacity-[0.04] blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, #22D3EE 0%, transparent 70%)' }}
          />
          <p className="relative text-[#22D3EE] text-sm font-semibold tracking-widest uppercase mb-5" style={{ fontFamily: 'var(--font-ibm)' }}>Sobre Vistara</p>
          <h1 className="relative text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#F8FAFC] max-w-4xl leading-[1.08] tracking-tight" style={{ fontFamily: 'var(--font-syne)' }}>
            Transformando la visita m&eacute;dica en Latinoam&eacute;rica
          </h1>
          <p className="relative text-lg md:text-xl text-[#94A3B8] max-w-2xl mt-8 leading-relaxed" style={{ fontFamily: 'var(--font-ibm)' }}>
            Fundada en 2024 en Ciudad de Panam&aacute;, Vistara naci&oacute; de una frustraci&oacute;n compartida: los visitadores m&eacute;dicos pasan m&aacute;s tiempo manejando que visitando doctores. Nuestra misi&oacute;n es cambiar eso con inteligencia artificial.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="bg-[#111827] border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div>
              <p className="text-[#22D3EE] text-sm font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-ibm)' }}>Or&iacute;genes</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8FAFC] mb-10 leading-tight" style={{ fontFamily: 'var(--font-syne)' }}>
                Nuestra Historia
              </h2>
              <div className="space-y-6 text-[#94A3B8] leading-relaxed text-base" style={{ fontFamily: 'var(--font-ibm)' }}>
                <p>
                  Todo comenz&oacute; cuando Alejandro, tras 15 a&ntilde;os dirigiendo equipos de ventas pharma en Panam&aacute;, se dio cuenta de un patr&oacute;n: sus mejores representantes perd&iacute;an el 40% de su tiempo en tr&aacute;nsito.
                </p>
                <p>
                  Al asociarse con Mei-Lin, experta en algoritmos de ruteo de Google Maps, encontraron que la tecnolog&iacute;a de optimizaci&oacute;n existente ignoraba las particularidades de la visita m&eacute;dica: frecuencias regulatorias, segmentaci&oacute;n de HCPs, y las realidades del tr&aacute;fico paname&ntilde;o.
                </p>
                <p>
                  Vistara fue construida desde cero para pharma, no adaptada. Cada algoritmo, cada flujo de trabajo, cada dato est&aacute; dise&ntilde;ado para maximizar el tiempo frente al doctor.
                </p>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.06]" style={{ minHeight: '380px' }}>
              {/* Animated abstract gradient background */}
              <div className="absolute inset-0">
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg, #0A0E17 0%, #1A2236 30%, #0A0E17 50%, #111827 100%)',
                  }}
                />
                {/* Animated gradient sweep */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(34,211,238,0.04) 60deg, transparent 120deg, rgba(139,92,246,0.04) 180deg, transparent 240deg, rgba(52,211,153,0.03) 300deg, transparent 360deg)',
                    animation: 'spin 20s linear infinite',
                  }}
                />
              </div>
              {/* Layered radial gradient orbs */}
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  background: 'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(34,211,238,0.1) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 80% 30%, rgba(139,92,246,0.1) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 60% 80%, rgba(52,211,153,0.07) 0%, transparent 70%)',
                }}
              />
              {/* Dot grid pattern overlay */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />
              {/* Fine grid lines */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '48px 48px',
                }}
              />
              {/* Abstract geographic shapes */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 380" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Connection lines */}
                <path d="M60 190 Q140 90 200 130 Q260 170 340 140" stroke="#22D3EE" strokeWidth="0.5" opacity="0.08" />
                <path d="M80 220 Q160 130 220 160 Q280 190 360 170" stroke="#8B5CF6" strokeWidth="0.5" opacity="0.08" />
                <path d="M40 250 Q120 180 200 200 Q280 220 380 190" stroke="#34D399" strokeWidth="0.5" opacity="0.06" />
                {/* Abstract isthmus shape */}
                <path d="M80 170 Q120 100 200 120 Q280 140 320 170 Q280 200 200 220 Q120 200 80 170Z" stroke="#22D3EE" strokeWidth="0.5" opacity="0.07" />
                <path d="M100 160 Q140 110 200 130 Q260 150 300 160 Q260 190 200 200 Q140 190 100 160Z" stroke="#8B5CF6" strokeWidth="0.5" opacity="0.07" />
                {/* Scattered nodes */}
                <circle cx="150" cy="140" r="8" stroke="#22D3EE" strokeWidth="0.5" opacity="0.08" />
                <circle cx="250" cy="180" r="6" stroke="#8B5CF6" strokeWidth="0.5" opacity="0.08" />
                <circle cx="200" cy="200" r="4" stroke="#34D399" strokeWidth="0.5" opacity="0.08" />
                <circle cx="120" cy="190" r="3" stroke="#22D3EE" strokeWidth="0.5" opacity="0.06" />
                <circle cx="300" cy="150" r="5" stroke="#FB923C" strokeWidth="0.5" opacity="0.06" />
                {/* Glowing center node */}
                <circle cx="200" cy="165" r="3" fill="#22D3EE" opacity="0.25" />
                <circle cx="200" cy="165" r="6" fill="#22D3EE" opacity="0.08" />
              </svg>
              {/* Location pin marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ marginTop: '-24px' }}>
                <div className="relative">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#22D3EE" fillOpacity="0.15" stroke="#22D3EE" strokeWidth="1.5"/>
                    <circle cx="12" cy="9" r="2.5" fill="#22D3EE"/>
                  </svg>
                  <div className="absolute -inset-3 rounded-full animate-ping opacity-20" style={{ background: 'radial-gradient(circle, #22D3EE 0%, transparent 70%)', animationDuration: '2.5s' }} />
                  <div className="absolute -inset-5 rounded-full animate-ping opacity-10" style={{ background: 'radial-gradient(circle, #22D3EE 0%, transparent 70%)', animationDuration: '3.5s', animationDelay: '0.5s' }} />
                </div>
              </div>
              {/* Content overlay with gradient fade */}
              <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to top, rgba(10,14,23,0.9) 0%, transparent 100%)' }} />
              <div className="relative z-10 flex flex-col items-center justify-end h-full p-8 pt-48">
                <p className="text-xl font-bold text-[#F8FAFC]" style={{ fontFamily: 'var(--font-syne)' }}>Ciudad de Panam&aacute;</p>
                <p className="text-sm text-[#94A3B8] mt-2" style={{ fontFamily: 'var(--font-ibm)' }}>Torre Global Bank, Piso 24</p>
                <p className="text-sm text-[#94A3B8]" style={{ fontFamily: 'var(--font-ibm)' }}>Calle 50, Bella Vista</p>
                <p className="text-sm text-[#94A3B8]" style={{ fontFamily: 'var(--font-ibm)' }}>Panam&aacute;, Rep&uacute;blica de Panam&aacute;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-[#8B5CF6] text-sm font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-ibm)' }}>Prop&oacute;sito</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8FAFC] mb-10 leading-tight" style={{ fontFamily: 'var(--font-syne)' }}>
            Nuestra Misi&oacute;n
          </h2>
          <p className="text-xl md:text-2xl text-[#94A3B8] leading-relaxed" style={{ fontFamily: 'var(--font-ibm)' }}>
            Democratizar la optimizaci&oacute;n de ventas farmac&eacute;uticas en Latinoam&eacute;rica, para que cada visitador m&eacute;dico pueda maximizar su impacto con los profesionales de salud que m&aacute;s importan.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[#111827] border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <p className="text-[#22D3EE] text-sm font-semibold tracking-widest uppercase mb-4 text-center" style={{ fontFamily: 'var(--font-ibm)' }}>Liderazgo</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8FAFC] mb-16 text-center leading-tight" style={{ fontFamily: 'var(--font-syne)' }}>
            Nuestro Equipo
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map(member => (
              <div
                key={member.name}
                className="group relative rounded-2xl bg-[#0A0E17] border border-white/[0.06] p-8 text-center transition-all duration-300 hover:border-[#22D3EE]/30 hover:-translate-y-2 hover:shadow-[0_12px_40px_-8px_rgba(34,211,238,0.18),0_0_0_1px_rgba(34,211,238,0.12)]"
              >
                {/* Subtle top accent line */}
                <div
                  className="absolute top-0 left-6 right-6 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(90deg, transparent, #22D3EE, #8B5CF6, transparent)' }}
                />
                <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-xl font-bold text-[#0A0E17] transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg" style={{ background: 'linear-gradient(135deg, #22D3EE, #8B5CF6)', fontFamily: 'var(--font-syne)' }}>
                  {member.initials}
                </div>
                <h3 className="text-lg font-bold text-[#F8FAFC]" style={{ fontFamily: 'var(--font-syne)' }}>{member.name}</h3>
                <p className="text-sm text-[#22D3EE] mt-1.5 font-medium" style={{ fontFamily: 'var(--font-ibm)' }}>{member.role}</p>
                <p className="text-sm text-[#94A3B8] mt-4 leading-relaxed" style={{ fontFamily: 'var(--font-ibm)' }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <p className="text-[#34D399] text-sm font-semibold tracking-widest uppercase mb-4 text-center" style={{ fontFamily: 'var(--font-ibm)' }}>Principios</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8FAFC] mb-16 text-center leading-tight" style={{ fontFamily: 'var(--font-syne)' }}>
          Nuestros Valores
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map(v => (
            <div key={v.title} className="group relative p-8 rounded-2xl border border-white/[0.04] bg-[#111827]/30 hover:bg-[#111827]/60 transition-all duration-300 hover:border-white/[0.08] hover:-translate-y-1">
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: `inset 0 1px 0 0 ${v.color}15, 0 0 30px -10px ${v.color}10` }}
              />
              <div
                className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                style={{ backgroundColor: `${v.color}10`, boxShadow: `0 0 0 0 ${v.color}00` }}
              >
                {v.icon}
              </div>
              <h3 className="relative text-lg font-bold text-[#F8FAFC] mb-3" style={{ fontFamily: 'var(--font-syne)' }}>{v.title}</h3>
              <p className="relative text-sm text-[#94A3B8] leading-relaxed" style={{ fontFamily: 'var(--font-ibm)' }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CSS animation for the conic gradient */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
