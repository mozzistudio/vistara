'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Logo } from '@/components/ui/Logo'

const demoAccounts = [
  {
    icon: '\u{1FA7A}',
    name: 'Carlos Mendoza',
    role: 'Rep',
    email: 'carlos.rep@vistara-demo.com',
    password: 'demo2026',
  },
  {
    icon: '\u{1F4CA}',
    name: 'Maria Silva',
    role: 'Manager',
    email: 'maria.manager@vistara-demo.com',
    password: 'demo2026',
  },
  {
    icon: '\u{1F454}',
    name: 'Jorge Fern\u00e1ndez',
    role: 'Director',
    email: 'jorge.director@vistara-demo.com',
    password: 'demo2026',
  },
  {
    icon: '\u2699\uFE0F',
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
        redirect: true,
        callbackUrl: '/app/rep',
      })

      if (result?.error) {
        setError('Credenciales inv\u00e1lidas. Intenta de nuevo.')
      }
    } catch {
      setError('Ocurri\u00f3 un error. Intenta de nuevo.')
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
    <div className="min-h-screen bg-[#0A0E17] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        {/* Card */}
        <div className="bg-[#111827]/70 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-white text-center mb-2">
            Bienvenido de vuelta
          </h1>
          <p className="text-sm text-[#94A3B8] text-center mb-8">
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
                className="block text-sm font-medium text-[#94A3B8] mb-1.5"
              >
                Correo electr\u00f3nico
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full rounded-lg border border-white/[0.06] bg-[#0F1629] px-4 py-2.5 text-sm text-white placeholder-[#475569] outline-none transition-colors focus:border-[#22D3EE]/50 focus:ring-1 focus:ring-[#22D3EE]/30"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#94A3B8] mb-1.5"
              >
                Contrase\u00f1a
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                required
                className="w-full rounded-lg border border-white/[0.06] bg-[#0F1629] px-4 py-2.5 text-sm text-white placeholder-[#475569] outline-none transition-colors focus:border-[#22D3EE]/50 focus:ring-1 focus:ring-[#22D3EE]/30"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#22D3EE] py-2.5 text-sm font-semibold text-[#0A0E17] transition-all hover:bg-[#22D3EE]/90 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  Iniciando sesi\u00f3n...
                </span>
              ) : (
                'Iniciar sesi\u00f3n'
              )}
            </button>
          </form>
        </div>

        {/* Demo accounts */}
        <div className="mt-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span className="text-xs font-medium text-[#475569] uppercase tracking-wider">
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
                className="group relative flex items-start gap-3 rounded-xl border border-white/[0.06] bg-[#111827]/50 px-3.5 py-3 text-left transition-all hover:border-[#22D3EE]/20 hover:bg-[#111827]/80"
              >
                <span className="text-lg leading-none mt-0.5">
                  {account.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white truncate">
                    {account.name}
                  </p>
                  <p className="text-xs text-[#475569]">{account.role}</p>
                </div>
                <span className="absolute top-2.5 right-2.5 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {'\u{1F4CB}'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
