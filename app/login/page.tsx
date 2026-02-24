'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'

const demoAccounts = [
  {
    name: 'Carlos Mendoza',
    role: 'Representante',
    territory: 'Panamá Centro',
    email: 'carlos.rep@vistara-demo.com',
    password: 'demo2026',
    color: '#22D3EE',
    redirect: '/app/rep',
  },
  {
    name: 'Maria Silva',
    role: 'Manager',
    territory: 'Panamá Metro',
    email: 'maria.manager@vistara-demo.com',
    password: 'demo2026',
    color: '#8B5CF6',
    redirect: '/app/director/dashboard',
  },
  {
    name: 'Jorge Fernández',
    role: 'Director Nacional',
    territory: 'Nacional',
    email: 'jorge.director@vistara-demo.com',
    password: 'demo2026',
    color: '#34D399',
    redirect: '/app/director/dashboard',
  },
  {
    name: 'Admin',
    role: 'Administrador',
    territory: 'Nacional',
    email: 'admin@vistara-demo.com',
    password: 'demo2026',
    color: '#FB923C',
    redirect: '/app/director/settings',
  },
]

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [demoExpanded, setDemoExpanded] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Credenciales inválidas. Intenta de nuevo.')
      } else if (result?.ok) {
        const account = demoAccounts.find(a => a.email === email)
        window.location.href = account?.redirect || '/app'
      }
    } catch {
      setError('Ocurrió un error. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async (account: (typeof demoAccounts)[number]) => {
    setEmail(account.email)
    setPassword(account.password)
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email: account.email,
        password: account.password,
        redirect: false,
      })

      if (result?.error) {
        setError('Error al iniciar sesión de demo.')
      } else if (result?.ok) {
        window.location.href = account.redirect
      }
    } catch {
      setError('Ocurrió un error. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel - branding */}
      <div
        className="hidden lg:flex lg:w-[480px] xl:w-[560px] flex-col justify-between relative overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 20%, rgba(34,211,238,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 60% 60% at 80% 80%, rgba(139,92,246,0.12) 0%, transparent 60%),
            #070B14
          `,
        }}
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative z-10 p-10 pt-12">
          <Link href="/">
            <Logo size="sm" />
          </Link>
        </div>

        <div className="relative z-10 p-10 space-y-8">
          <div>
            <h2
              className="text-3xl xl:text-4xl leading-tight"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, color: '#F8FAFC' }}
            >
              Inteligencia de rutas
              <br />
              <span className="gradient-text">para pharma</span>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed max-w-sm" style={{ color: '#64748B' }}>
              Optimiza las rutas de tus visitadores médicos con IA. Más visitas de alto valor, menos tiempo en tránsito.
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-8">
            {[
              { value: '+32%', label: 'Visitas A+' },
              { value: '-41%', label: 'Tiempo ruta' },
              { value: '98%', label: 'Adopción' },
            ].map(stat => (
              <div key={stat.label}>
                <p
                  className="text-2xl gradient-text"
                  style={{ fontFamily: 'var(--font-syne)', fontWeight: 800 }}
                >
                  {stat.value}
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#475569' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 p-10 pb-8">
          <p className="text-xs" style={{ color: '#334155' }}>
            &copy; 2026 Vistara. Panamá.
          </p>
        </div>
      </div>

      {/* Right panel - form */}
      <div
        className="flex-1 flex items-center justify-center px-6 py-12"
        style={{ background: '#0A0E17' }}
      >
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="flex justify-center mb-10 lg:hidden">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <div className="mb-8">
            <h1
              className="text-2xl mb-2"
              style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, color: '#F8FAFC' }}
            >
              Bienvenido de vuelta
            </h1>
            <p className="text-sm" style={{ color: '#64748B' }}>
              Ingresa tus credenciales para continuar
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
              style={{
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.15)',
                color: '#F87171',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider mb-2" style={{ color: '#64748B' }}>
                Correo electrónico
              </label>
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#475569]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="3" />
                  <path d="M22 7l-10 6L2 7" />
                </svg>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="w-full pl-10 pr-4 py-3 text-sm text-[#F8FAFC] rounded-xl outline-none transition-all duration-200 placeholder:text-[#334155] focus:ring-2 focus:ring-[#22D3EE]/25 focus:border-[#22D3EE]/40"
                  style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: '#0F1629',
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider mb-2" style={{ color: '#64748B' }}>
                Contraseña
              </label>
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#475569]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-11 py-3 text-sm text-[#F8FAFC] rounded-xl outline-none transition-all duration-200 placeholder:text-[#334155] focus:ring-2 focus:ring-[#22D3EE]/25 focus:border-[#22D3EE]/40"
                  style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: '#0F1629',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#94A3B8] transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-sm font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:brightness-110"
              style={{
                background: 'linear-gradient(135deg, #22D3EE 0%, #06B6D4 100%)',
                color: '#0A0E17',
                boxShadow: '0 0 24px rgba(34,211,238,0.2), 0 4px 12px rgba(0,0,0,0.3)',
              }}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Iniciando sesión...
                </span>
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <span className="text-[11px] font-medium uppercase tracking-widest" style={{ color: '#334155' }}>
              Demo rápido
            </span>
            <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>

          {/* Accordion toggle for small screens */}
          <button
            type="button"
            onClick={() => setDemoExpanded(!demoExpanded)}
            className="sm:hidden w-full flex items-center justify-between px-4 py-3 rounded-xl mb-3 cursor-pointer transition-all"
            style={{
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(15,22,41,0.5)',
            }}
          >
            <span className="text-sm text-[#94A3B8]">Usar perfil de demo</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="2"
              strokeLinecap="round"
              className={`transition-transform duration-200 ${demoExpanded ? 'rotate-180' : ''}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {/* Demo accounts - one-click login (always visible on sm+, collapsible on mobile) */}
          <div className={`space-y-2.5 ${demoExpanded ? 'block' : 'hidden'} sm:block`}>
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                type="button"
                onClick={() => handleDemoLogin(account)}
                disabled={loading}
                className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-left transition-all duration-200 cursor-pointer disabled:opacity-50 group"
                style={{
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(15,22,41,0.5)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${account.color}30`
                  e.currentTarget.style.background = 'rgba(15,22,41,0.8)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.background = 'rgba(15,22,41,0.5)'
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    background: `${account.color}12`,
                    color: account.color,
                    border: `1px solid ${account.color}20`,
                  }}
                >
                  {account.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#F8FAFC] truncate">{account.name}</p>
                  <p className="text-[11px] truncate" style={{ color: '#475569' }}>
                    {account.role} · {account.territory}
                  </p>
                </div>
                <svg className="w-4 h-4 text-[#334155] group-hover:text-[#64748B] transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            ))}
          </div>

          <p className="text-center mt-8 text-xs" style={{ color: '#334155' }}>
            <Link href="/" className="hover:text-[#64748B] transition-colors">&larr; Volver al inicio</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
