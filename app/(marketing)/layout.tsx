'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/ui/Logo'

const navLinks = [
  { href: '/features', label: 'Características' },
  { href: '/pricing', label: 'Precios' },
  { href: '/use-cases', label: 'Casos de uso' },
  { href: '/about', label: 'Nosotros' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contacto' },
]

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        height: '72px',
        background: scrolled ? 'rgba(10,14,23,0.85)' : 'rgba(10,14,23,0.7)',
        backdropFilter: 'blur(20px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="flex-shrink-0">
            <Logo size="sm" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors duration-200"
                style={{
                  fontFamily: 'var(--font-ibm)',
                  fontWeight: 400,
                  fontSize: '14px',
                  letterSpacing: '0.2px',
                  color: pathname === link.href ? '#22D3EE' : '#94A3B8',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  if (pathname !== link.href) e.currentTarget.style.color = '#F8FAFC'
                }}
                onMouseLeave={e => {
                  if (pathname !== link.href) e.currentTarget.style.color = '#94A3B8'
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-5 py-2 rounded-full border transition-all duration-200"
              style={{
                fontFamily: 'var(--font-ibm)',
                fontWeight: 400,
                fontSize: '14px',
                color: '#94A3B8',
                borderColor: 'rgba(255,255,255,0.12)',
                background: 'transparent',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#F8FAFC'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#94A3B8'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
              }}
            >
              Iniciar sesión
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2 rounded-full text-[#0A0E17] transition-all duration-200"
              style={{
                fontFamily: 'var(--font-ibm)',
                fontWeight: 500,
                fontSize: '14px',
                background: '#22D3EE',
                boxShadow: '0 0 20px rgba(34,211,238,0.3)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(34,211,238,0.45)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(34,211,238,0.3)'
              }}
            >
              Solicitar demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-[#F8FAFC] p-2"
            onClick={() => {
              const menu = document.getElementById('mobile-menu')
              if (menu) menu.classList.toggle('hidden')
            }}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" className="hidden md:hidden" style={{ background: 'rgba(10,14,23,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="px-4 py-4 space-y-3">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm py-2"
              style={{ fontFamily: 'var(--font-ibm)', color: '#94A3B8' }}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/[0.06] flex flex-col gap-3">
            <Link href="/login" className="text-sm" style={{ color: '#94A3B8', fontFamily: 'var(--font-ibm)' }}>
              Iniciar sesión
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-center px-5 py-2 rounded-full bg-[#22D3EE] text-[#0A0E17]"
            >
              Solicitar demo
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer style={{ background: '#0A0E17', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10">
          {/* Brand column */}
          <div>
            <p
              className="text-xl font-extrabold text-[#F8FAFC] mb-3"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 800 }}
            >
              Vistara
            </p>
            <p className="text-sm max-w-xs leading-relaxed" style={{ fontFamily: 'var(--font-ibm)', fontWeight: 300, color: '#94A3B8' }}>
              Inteligencia de rutas para equipos comerciales farmacéuticos en Panamá. Optimizamos cada día de campo con IA.
            </p>
          </div>

          {/* Producto */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: '#F8FAFC' }}
            >
              Producto
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="/features" className="text-[13px] transition-colors hover:text-[#22D3EE]" style={{ fontFamily: 'var(--font-ibm)', color: '#94A3B8' }}>Características</Link></li>
              <li><Link href="/pricing" className="text-[13px] transition-colors hover:text-[#22D3EE]" style={{ fontFamily: 'var(--font-ibm)', color: '#94A3B8' }}>Precios</Link></li>
              <li><Link href="/use-cases" className="text-[13px] transition-colors hover:text-[#22D3EE]" style={{ fontFamily: 'var(--font-ibm)', color: '#94A3B8' }}>Casos de uso</Link></li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: '#F8FAFC' }}
            >
              Empresa
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="/about" className="text-[13px] transition-colors hover:text-[#22D3EE]" style={{ fontFamily: 'var(--font-ibm)', color: '#94A3B8' }}>Nosotros</Link></li>
              <li><Link href="/blog" className="text-[13px] transition-colors hover:text-[#22D3EE]" style={{ fontFamily: 'var(--font-ibm)', color: '#94A3B8' }}>Blog</Link></li>
              <li><Link href="/contact" className="text-[13px] transition-colors hover:text-[#22D3EE]" style={{ fontFamily: 'var(--font-ibm)', color: '#94A3B8' }}>Contacto</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, color: '#F8FAFC' }}
            >
              Legal
            </h4>
            <ul className="space-y-2.5">
              <li><Link href="/privacy" className="text-[13px] transition-colors hover:text-[#22D3EE]" style={{ fontFamily: 'var(--font-ibm)', color: '#94A3B8' }}>Privacidad</Link></li>
              <li><Link href="/terms" className="text-[13px] transition-colors hover:text-[#22D3EE]" style={{ fontFamily: 'var(--font-ibm)', color: '#94A3B8' }}>Términos</Link></li>
              <li><Link href="/security" className="text-[13px] transition-colors hover:text-[#22D3EE]" style={{ fontFamily: 'var(--font-ibm)', color: '#94A3B8' }}>Seguridad</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] text-center">
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-ibm)' }}>
            © 2026 Vistara. Todos los derechos reservados. Panamá.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0E17]">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
