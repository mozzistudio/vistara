'use client'

import { useSession, signOut } from 'next-auth/react'
import { MessageCircle, LogOut, ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface TopBarProps {
  title: string
  subtitle?: string
}

export function TopBar({ title, subtitle }: TopBarProps) {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

  const initials = session?.user?.name
    ?.split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('') ?? 'V'

  return (
    <header
      className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b bg-white/80 backdrop-blur-sm"
      style={{ borderColor: 'var(--border)' }}
    >
      <div>
        <h1 className="font-display font-bold text-xl" style={{ color: 'var(--text-dark)' }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-faint)' }}>{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* WhatsApp Live badge */}
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{ background: 'rgba(37,211,102,0.1)', color: 'var(--wa-green)' }}
        >
          <MessageCircle className="w-3.5 h-3.5" />
          WhatsApp Live
        </div>

        {/* Avatar / user menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-[10px] hover:bg-mint-light transition-colors"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{ background: 'var(--forest)' }}
            >
              {initials}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold" style={{ color: 'var(--text-dark)' }}>
                {session?.user?.name ?? 'Usuario'}
              </p>
              <p className="text-[10px]" style={{ color: 'var(--text-faint)' }}>
                {session?.user?.role ?? 'SELLER'}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5" style={{ color: 'var(--text-faint)' }} />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div
                className="absolute right-0 top-full mt-1 w-44 rounded-[12px] bg-white border shadow-lg z-20 overflow-hidden"
                style={{ borderColor: 'var(--border)' }}
              >
                <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border-light)' }}>
                  <p className="text-xs font-semibold" style={{ color: 'var(--text-dark)' }}>
                    {session?.user?.name}
                  </p>
                  <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-faint)' }}>
                    {session?.user?.email}
                  </p>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium hover:bg-red-50 hover:text-red-600 transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Cerrar sesión
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
