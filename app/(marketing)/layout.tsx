'use client'

import { useState, useEffect, useCallback } from 'react'
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

/* -------------------------------------------------------------------------- */
/*  Header                                                                     */
/* -------------------------------------------------------------------------- */

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  /* Close mobile menu on route change */
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  /* Scroll listener */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const toggleMobile = useCallback(() => setMobileOpen(prev => !prev), [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      {/* Glass bar */}
      <div
        style={{
          height: 72,
          background: scrolled
            ? 'rgba(10, 14, 23, 0.92)'
            : 'rgba(10, 14, 23, 0.6)',
          backdropFilter: 'blur(24px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
          borderBottom: scrolled
            ? '1px solid rgba(255, 255, 255, 0.07)'
            : '1px solid transparent',
          boxShadow: scrolled
            ? '0 4px 30px rgba(0, 0, 0, 0.35)'
            : 'none',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 relative"
              style={{ transition: 'opacity 0.2s ease' }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.8' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              <Logo size="sm" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-3.5 py-2 rounded-lg group"
                    style={{
                      fontFamily: 'var(--font-ibm)',
                      fontWeight: isActive ? 500 : 400,
                      fontSize: 14,
                      letterSpacing: '0.15px',
                      color: isActive ? '#22D3EE' : '#94A3B8',
                      transition: 'color 0.25s ease',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) e.currentTarget.style.color = '#F8FAFC'
                    }}
                    onMouseLeave={e => {
                      if (!isActive) e.currentTarget.style.color = '#94A3B8'
                    }}
                  >
                    {link.label}
                    {/* Gradient underline indicator */}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 2,
                        left: '50%',
                        transform: isActive ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)',
                        width: '60%',
                        height: 2,
                        borderRadius: 1,
                        background: 'linear-gradient(90deg, #22D3EE, #8B5CF6)',
                        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        transformOrigin: 'center',
                      }}
                    />
                  </Link>
                )
              })}
            </nav>

            {/* Desktop CTA buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/login"
                className="px-5 py-2 rounded-full border"
                style={{
                  fontFamily: 'var(--font-ibm)',
                  fontWeight: 400,
                  fontSize: 14,
                  color: '#94A3B8',
                  borderColor: 'rgba(255, 255, 255, 0.10)',
                  background: 'transparent',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#F8FAFC'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.22)'
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#94A3B8'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.10)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                Iniciar sesión
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-full"
                style={{
                  fontFamily: 'var(--font-ibm)',
                  fontWeight: 600,
                  fontSize: 14,
                  color: '#0A0E17',
                  background: 'linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)',
                  boxShadow: '0 0 20px rgba(34, 211, 238, 0.25), 0 0 60px rgba(139, 92, 246, 0.1)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 0 28px rgba(34, 211, 238, 0.4), 0 0 80px rgba(139, 92, 246, 0.2)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(34, 211, 238, 0.25), 0 0 60px rgba(139, 92, 246, 0.1)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                Solicitar demo
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg"
              onClick={toggleMobile}
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileOpen}
              style={{
                background: mobileOpen ? 'rgba(255, 255, 255, 0.06)' : 'transparent',
                transition: 'background 0.2s ease',
              }}
            >
              {/* Animated hamburger / X icon */}
              <div className="relative w-5 h-4 flex flex-col justify-between">
                <span
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 1.5,
                    borderRadius: 1,
                    background: '#F8FAFC',
                    transition: 'transform 0.3s ease, opacity 0.2s ease',
                    transform: mobileOpen
                      ? 'translateY(7px) rotate(45deg)'
                      : 'translateY(0) rotate(0)',
                  }}
                />
                <span
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 1.5,
                    borderRadius: 1,
                    background: '#F8FAFC',
                    transition: 'opacity 0.2s ease',
                    opacity: mobileOpen ? 0 : 1,
                  }}
                />
                <span
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 1.5,
                    borderRadius: 1,
                    background: '#F8FAFC',
                    transition: 'transform 0.3s ease, opacity 0.2s ease',
                    transform: mobileOpen
                      ? 'translateY(-7px) rotate(-45deg)'
                      : 'translateY(0) rotate(0)',
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className="lg:hidden"
        style={{
          position: 'absolute',
          top: 72,
          left: 0,
          right: 0,
          background: 'rgba(10, 14, 23, 0.97)',
          backdropFilter: 'blur(24px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.5)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          maxHeight: mobileOpen ? '100vh' : 0,
          opacity: mobileOpen ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
      >
        <nav className="px-5 pt-4 pb-8 space-y-1">
          {navLinks.map(link => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-4 py-3"
                style={{
                  fontFamily: 'var(--font-ibm)',
                  fontSize: 15,
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? '#22D3EE' : '#94A3B8',
                  background: isActive ? 'rgba(34, 211, 238, 0.06)' : 'transparent',
                  transition: 'background 0.2s ease, color 0.2s ease',
                }}
                onClick={() => setMobileOpen(false)}
              >
                <span className="flex items-center gap-3">
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #22D3EE, #8B5CF6)',
                      }}
                    />
                  )}
                </span>
              </Link>
            )
          })}

          {/* Divider */}
          <div
            className="my-4"
            style={{
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
            }}
          />

          {/* Mobile CTA buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <Link
              href="/login"
              className="text-center px-5 py-3 rounded-full border"
              style={{
                fontFamily: 'var(--font-ibm)',
                fontSize: 14,
                fontWeight: 400,
                color: '#94A3B8',
                borderColor: 'rgba(255, 255, 255, 0.10)',
              }}
              onClick={() => setMobileOpen(false)}
            >
              Iniciar sesión
            </Link>
            <Link
              href="/contact"
              className="text-center px-5 py-3 rounded-full"
              style={{
                fontFamily: 'var(--font-ibm)',
                fontSize: 14,
                fontWeight: 600,
                color: '#0A0E17',
                background: 'linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)',
              }}
              onClick={() => setMobileOpen(false)}
            >
              Solicitar demo
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                     */
/* -------------------------------------------------------------------------- */

const socialLinks = [
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'X (Twitter)',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
]

const footerColumns = [
  {
    title: 'Producto',
    links: [
      { href: '/features', label: 'Características' },
      { href: '/pricing', label: 'Precios' },
      { href: '/use-cases', label: 'Casos de uso' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { href: '/about', label: 'Nosotros' },
      { href: '/blog', label: 'Blog' },
      { href: '/contact', label: 'Contacto' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacidad' },
      { href: '/terms', label: 'Términos' },
      { href: '/security', label: 'Seguridad' },
    ],
  },
]

function Footer() {
  return (
    <footer style={{ background: '#0A0E17' }}>
      {/* Top divider: gradient line */}
      <div
        style={{
          height: 1,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.2) 30%, rgba(139,92,246,0.2) 70%, transparent 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 pt-16 pb-12">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2.5fr_1fr_1fr_1fr] gap-12 lg:gap-16">
          {/* Brand column */}
          <div className="max-w-sm">
            <div className="mb-5">
              <Logo size="sm" />
            </div>
            <p
              className="leading-relaxed mb-8"
              style={{
                fontFamily: 'var(--font-ibm)',
                fontWeight: 300,
                fontSize: 14,
                lineHeight: 1.75,
                color: '#94A3B8',
              }}
            >
              Inteligencia de rutas para equipos comerciales farmacéuticos en
              Panamá. Optimizamos cada día de campo con IA.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex items-center justify-center w-9 h-9 rounded-full"
                  style={{
                    color: '#94A3B8',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#22D3EE'
                    e.currentTarget.style.background = 'rgba(34, 211, 238, 0.08)'
                    e.currentTarget.style.borderColor = 'rgba(34, 211, 238, 0.2)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#94A3B8'
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)'
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map(column => (
            <div key={column.title}>
              <h4
                className="uppercase tracking-widest mb-5"
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  color: '#F8FAFC',
                }}
              >
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        fontFamily: 'var(--font-ibm)',
                        fontSize: 13,
                        fontWeight: 400,
                        color: '#94A3B8',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#22D3EE' }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#94A3B8' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <p
            style={{
              fontSize: 12,
              color: 'rgba(255, 255, 255, 0.3)',
              fontFamily: 'var(--font-ibm)',
              fontWeight: 400,
            }}
          >
            © 2026 Vistara. Todos los derechos reservados. Panamá.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              style={{
                fontSize: 12,
                color: 'rgba(255, 255, 255, 0.3)',
                fontFamily: 'var(--font-ibm)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#94A3B8' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.3)' }}
            >
              Privacidad
            </Link>
            <Link
              href="/terms"
              style={{
                fontSize: 12,
                color: 'rgba(255, 255, 255, 0.3)',
                fontFamily: 'var(--font-ibm)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#94A3B8' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255, 255, 255, 0.3)' }}
            >
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* -------------------------------------------------------------------------- */
/*  Layout                                                                     */
/* -------------------------------------------------------------------------- */

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0E17]">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
