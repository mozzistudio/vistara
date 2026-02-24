'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Logo } from '@/components/ui/Logo'

const demoAccounts = [
  {
    icon: '🩺',
    name: 'Carlos Mendoza',
    role: 'Rep Panamá Centro',
    email: 'carlos.rep@vistara-demo.com',
    password: 'demo2026',
  },
  {
    icon: '📊',
    name: 'Maria Silva',
    role: 'Manager Panamá Metro',
    email: 'maria.manager@vistara-demo.com',
    password: 'demo2026',
  },
  {
    icon: '🏢',
    name: 'Jorge Fernández',
    role: 'Director Nacional',
    email: 'jorge.director@vistara-demo.com',
    password: 'demo2026',
  },
  {
    icon: '⚙️',
    name: 'Admin',
    role: 'Administrador',
    email: 'admin@vistara-demo.com',
    password: 'demo2026',
  },
]

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
        window.location.href = '/app/rep'
      }
    } catch {
      setError('Ocurrió un error. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoClick = (account: (typeof demoAccounts)[number]) => {
    setEmail(account.email)
    setPassword(account.password)
    setError('')
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background: `
          radial-gradient(ellipse 60% 40% at 30% 20%, rgba(34,211,238,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 70% 80%, rgba(139,92,246,0.06) 0%, transparent 60%),
          #0A0E17
        `,
      }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        {/* Card */}
        <div
          className="p-8"
          style={{
            background: 'rgba(17,24,39,0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '20px',
          }}
        >
          <h1
            className="text-center mb-2"
            style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: '1.5rem', color: '#F8FAFC' }}
          >
            Bienvenido de vuelta
          </h1>
          <p
            className="text-center mb-8"
            style={{ fontFamily: 'var(--font-ibm)', fontWeight: 300, fontSize: '14px', color: '#94A3B8' }}
          >
            Ingresa tus credenciales para continuar
          </p>

          {/* Error message */}
          {error && (
            <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block mb-1.5"
                style={{ fontFamily: 'var(--font-ibm)', fontWeight: 400, fontSize: '13px', color: '#94A3B8' }}
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full px-4 py-2.5 text-sm text-white outline-none transition-colors"
                style={{
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: '#0F1629',
                  fontFamily: 'var(--font-ibm)',
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = 'rgba(34,211,238,0.4)'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(34,211,238,0.1)'
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-1.5"
                style={{ fontFamily: 'var(--font-ibm)', fontWeight: 400, fontSize: '13px', color: '#94A3B8' }}
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2.5 text-sm text-white outline-none transition-colors"
                style={{
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: '#0F1629',
                  fontFamily: 'var(--font-ibm)',
                }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = 'rgba(34,211,238,0.4)'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(34,211,238,0.1)'
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 text-sm text-[#0A0E17] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                fontFamily: 'var(--font-ibm)',
                fontWeight: 600,
                borderRadius: '100px',
                background: '#22D3EE',
                boxShadow: '0 0 20px rgba(34,211,238,0.2)',
              }}
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Iniciando sesión...
                </span>
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </form>
        </div>

        {/* Demo accounts */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span
              className="uppercase"
              style={{ fontFamily: 'var(--font-ibm)', fontWeight: 500, fontSize: '11px', letterSpacing: '1.5px', color: '#475569' }}
            >
              Cuentas de demo
            </span>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                type="button"
                onClick={() => handleDemoClick(account)}
                className="group relative flex items-start gap-3 text-left transition-all duration-200"
                style={{
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(17,24,39,0.5)',
                  padding: '12px 14px',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(34,211,238,0.2)'
                  e.currentTarget.style.background = 'rgba(17,24,39,0.8)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.background = 'rgba(17,24,39,0.5)'
                }}
              >
                <span className="text-lg leading-none mt-0.5">
                  {account.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p style={{ fontFamily: 'var(--font-ibm)', fontWeight: 500, fontSize: '13px', color: '#F8FAFC' }} className="truncate">
                    {account.name}
                  </p>
                  <p style={{ fontFamily: 'var(--font-ibm)', fontWeight: 300, fontSize: '11px', color: '#475569' }}>
                    {account.role}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
