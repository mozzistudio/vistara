'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function AppLanding() {
  const router = useRouter()
  const { data: session } = useSession()
  const [savedRole, setSavedRole] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const role = localStorage.getItem('vistara-role')
    setSavedRole(role)
    setLoaded(true)
  }, [])

  // Auto-redirect if user has a remembered preference
  useEffect(() => {
    if (loaded && savedRole) {
      if (savedRole === 'director') {
        router.replace('/app/director/dashboard')
      } else {
        router.replace('/app/rep')
      }
    }
  }, [loaded, savedRole, router])

  // Show role chooser only if no saved preference
  if (!loaded || savedRole) {
    return null
  }

  const userName = session?.user?.name || 'Usuario'

  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        <h1
          className="text-2xl font-bold text-[#F8FAFC] mb-2"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          Bienvenido, {userName}
        </h1>
        <p className="text-sm text-[#94A3B8] mb-8">
          Selecciona tu vista para continuar. Tu preferencia se recordará para futuras sesiones.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Director option */}
          <Link
            href="/app/director/dashboard"
            onClick={() => localStorage.setItem('vistara-role', 'director')}
            className="group rounded-xl p-6 text-left transition-all duration-200 hover:-translate-y-1"
            style={{
              background: '#111827',
              border: '1px solid rgba(139,92,246,0.15)',
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{
                background: 'rgba(139,92,246,0.1)',
                border: '1px solid rgba(139,92,246,0.2)',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18" />
                <path d="M7 16l4-8 4 4 5-6" />
              </svg>
            </div>
            <h2
              className="text-lg font-bold text-[#F8FAFC] mb-1 group-hover:text-[#8B5CF6] transition-colors"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Director
            </h2>
            <p className="text-xs text-[#94A3B8]">
              Dashboard, mapa de equipo, reportes y configuración
            </p>
          </Link>

          {/* Rep option */}
          <Link
            href="/app/rep"
            onClick={() => localStorage.setItem('vistara-role', 'rep')}
            className="group rounded-xl p-6 text-left transition-all duration-200 hover:-translate-y-1"
            style={{
              background: '#111827',
              border: '1px solid rgba(34,211,238,0.15)',
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{
                background: 'rgba(34,211,238,0.1)',
                border: '1px solid rgba(34,211,238,0.2)',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h2
              className="text-lg font-bold text-[#F8FAFC] mb-1 group-hover:text-[#22D3EE] transition-colors"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              Representante
            </h2>
            <p className="text-xs text-[#94A3B8]">
              Chat con IA, mapa de ruta y visitas del día
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}
