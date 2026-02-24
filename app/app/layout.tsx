'use client'

import { useSession, signOut } from 'next-auth/react'
import { useState, useRef, useEffect } from 'react'
import RoleToggle from './components/RoleToggle'
import { Logo } from '@/components/ui/Logo'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Middleware handles unauthenticated redirect; show skeleton while session resolves
  if (status === 'loading' || !session) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0A0E17]">
        <div className="animate-pulse">
          <Logo size="lg" />
        </div>
      </div>
    )
  }

  const userInitial = session.user?.name?.charAt(0) || '?'
  const userRole = (session.user as any)?.role || ''

  return (
    <div className="h-screen flex flex-col bg-[#0A0E17] overflow-hidden">
      {/* Top Bar */}
      <header
        role="banner"
        className="flex items-center justify-between px-4 h-14 shrink-0"
        style={{
          background: 'rgba(17,24,39,0.8)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <Logo size="sm" />
        <RoleToggle />
        <div className="flex items-center gap-3 relative" ref={menuRef}>
          <span className="text-sm text-[#94A3B8] hidden sm:block">
            {session.user?.name}
          </span>
          {userRole && (
            <span className="text-[10px] text-[#64748B] hidden sm:block px-2 py-0.5 rounded-full border border-white/[0.06] bg-white/[0.02]">
              {userRole}
            </span>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer focus-ring"
            style={{
              background: 'linear-gradient(135deg, #22D3EE, #8B5CF6)',
            }}
            aria-label="Menú de usuario"
            aria-expanded={menuOpen}
          >
            {userInitial}
          </button>

          {/* Profile dropdown */}
          {menuOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-56 rounded-xl overflow-hidden z-50"
              style={{
                background: '#111827',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
              }}
            >
              <div className="px-4 py-3 border-b border-white/[0.06]">
                <p className="text-sm font-medium text-[#F8FAFC]">{session.user?.name}</p>
                <p className="text-xs text-[#64748B] truncate">{session.user?.email}</p>
                {userRole && (
                  <span className="inline-block mt-1 text-[10px] text-[#22D3EE] px-2 py-0.5 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/20">
                    {userRole}
                  </span>
                )}
              </div>
              <div className="py-1">
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="w-full text-left px-4 py-2.5 text-sm text-[#F87171] hover:bg-white/[0.04] transition-colors cursor-pointer flex items-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Cerrar sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  )
}
