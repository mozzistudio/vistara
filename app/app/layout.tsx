'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import RoleToggle from './components/RoleToggle'
import { Logo } from '@/components/ui/Logo'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0A0E17]">
        <div className="animate-pulse">
          <Logo size="lg" />
        </div>
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="h-screen flex flex-col bg-[#0A0E17] overflow-hidden">
      {/* Top Bar */}
      <header
        className="flex items-center justify-between px-4 h-14 shrink-0"
        style={{
          background: 'rgba(17,24,39,0.8)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <Logo size="sm" />
        <RoleToggle />
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#94A3B8] hidden sm:block">
            {session.user?.name}
          </span>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
            style={{
              background: 'linear-gradient(135deg, #22D3EE, #8B5CF6)',
            }}
          >
            {session.user?.name?.charAt(0) || '👤'}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  )
}
