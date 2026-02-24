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
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0E17]/90 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <Logo size="sm" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  pathname === link.href
                    ? 'text-[#22D3EE]'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
            >
              Iniciar sesión
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium px-5 py-2 rounded-full bg-[#22D3EE] text-[#0A0E17] hover:bg-[#22D3EE]/90 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            >
              Solicitar demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[#F8FAFC] p-2"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A0E17]/95 backdrop-blur-xl border-b border-white/[0.06]">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-[#94A3B8] hover:text-[#F8FAFC] py-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-white/[0.06] flex flex-col gap-3">
              <Link href="/login" className="text-sm text-[#94A3B8]">
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
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-[#111827] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Logo size="sm" />
            <p className="mt-4 text-sm text-[#94A3B8] max-w-xs">
              Inteligencia de rutas para equipos comerciales farmacéuticos en Panamá.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#F8FAFC] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              Producto
            </h4>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-sm text-[#94A3B8] hover:text-[#22D3EE]">Características</Link></li>
              <li><Link href="/pricing" className="text-sm text-[#94A3B8] hover:text-[#22D3EE]">Precios</Link></li>
              <li><Link href="/use-cases" className="text-sm text-[#94A3B8] hover:text-[#22D3EE]">Casos de uso</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#F8FAFC] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              Empresa
            </h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-[#94A3B8] hover:text-[#22D3EE]">Nosotros</Link></li>
              <li><Link href="/blog" className="text-sm text-[#94A3B8] hover:text-[#22D3EE]">Blog</Link></li>
              <li><Link href="/contact" className="text-sm text-[#94A3B8] hover:text-[#22D3EE]">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#F8FAFC] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              Legal
            </h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-sm text-[#94A3B8] hover:text-[#22D3EE]">Privacidad</Link></li>
              <li><Link href="/terms" className="text-sm text-[#94A3B8] hover:text-[#22D3EE]">Términos</Link></li>
              <li><Link href="/security" className="text-sm text-[#94A3B8] hover:text-[#22D3EE]">Seguridad</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#94A3B8]">
            © 2026 Vistara. Todos los derechos reservados. Panamá 🇵🇦
          </p>
          <div className="flex gap-4">
            <span className="text-[#94A3B8] hover:text-[#22D3EE] cursor-pointer text-sm">LinkedIn</span>
            <span className="text-[#94A3B8] hover:text-[#22D3EE] cursor-pointer text-sm">Twitter</span>
          </div>
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
