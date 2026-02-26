'use client'

import { useState, FormEvent } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email: email.toLowerCase(),
      password,
      redirect: false,
    })

    setLoading(false)
    if (result?.error) {
      setError('Credenciales incorrectas. Por favor verifique su email y contraseña.')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--deep)' }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(110,231,160,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🌿</div>
          <h1
            className="font-display font-bold text-3xl"
            style={{ color: 'var(--neon-mint)' }}
          >
            Vistara
          </h1>
          <p className="mt-1 text-sm" style={{ color: '#8AAFA0' }}>
            Pharma Intelligence Platform
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-[20px] p-8 border"
          style={{
            background: 'var(--deep-mid)',
            borderColor: 'rgba(110,231,160,0.1)',
          }}
        >
          <h2 className="font-display font-semibold text-lg text-white mb-6">
            Iniciar sesión
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#8AAFA0' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="usuario@vistara.com"
                required
                className="w-full px-4 py-2.5 rounded-[10px] text-sm text-white placeholder-[#4A6B5A] outline-none transition-colors focus:ring-1"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1.5px solid rgba(255,255,255,0.1)',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--forest)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>

            <div>
              <label className="text-xs font-semibold mb-1.5 block" style={{ color: '#8AAFA0' }}>
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-2.5 rounded-[10px] text-sm text-white placeholder-[#4A6B5A] outline-none pr-10"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1.5px solid rgba(255,255,255,0.1)',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--forest)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: '#4A6B5A' }}
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div
                className="text-xs px-3 py-2 rounded-[8px] font-medium"
                style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444' }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-[10px] text-sm font-semibold text-white transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
              style={{ background: 'var(--forest)' }}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Verificando...' : 'Ingresar'}
            </button>
          </form>

          {/* Demo hint */}
          <div
            className="mt-6 pt-5 border-t text-center"
            style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          >
            <p className="text-[11px] font-mono" style={{ color: '#4A6B5A' }}>
              Demo: vendedor@vistara.com · demo2026
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
