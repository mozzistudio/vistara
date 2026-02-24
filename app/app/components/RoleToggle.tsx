'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function RoleToggle() {
  const router = useRouter()
  const pathname = usePathname()
  const [role, setRole] = useState<'director' | 'rep'>('rep')

  useEffect(() => {
    const saved = localStorage.getItem('vistara-role')
    if (saved === 'director' || saved === 'rep') {
      setRole(saved)
    } else if (pathname.includes('/director')) {
      setRole('director')
    }
  }, [pathname])

  const toggle = () => {
    const newRole = role === 'director' ? 'rep' : 'director'
    setRole(newRole)
    localStorage.setItem('vistara-role', newRole)

    if (newRole === 'director') {
      router.push('/app/director/dashboard')
    } else {
      router.push('/app/rep')
    }
  }

  const isDirector = role === 'director'

  return (
    <button
      onClick={toggle}
      className="relative flex items-center h-10 rounded-full p-1 transition-all duration-300 cursor-pointer"
      style={{
        background: isDirector
          ? 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(139,92,246,0.1))'
          : 'linear-gradient(135deg, rgba(34,211,238,0.3), rgba(34,211,238,0.1))',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: isDirector
          ? '0 0 20px rgba(139,92,246,0.2)'
          : '0 0 20px rgba(34,211,238,0.2)',
      }}
    >
      <span
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
          isDirector
            ? 'bg-[#8B5CF6] text-white shadow-lg'
            : 'text-[#94A3B8] hover:text-[#F8FAFC]'
        }`}
      >
        <span>👔</span>
        <span className="hidden sm:inline">Director</span>
      </span>
      <span
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
          !isDirector
            ? 'bg-[#22D3EE] text-[#0A0E17] shadow-lg'
            : 'text-[#94A3B8] hover:text-[#F8FAFC]'
        }`}
      >
        <span>🩺</span>
        <span className="hidden sm:inline">Visiteur Médical</span>
      </span>
    </button>
  )
}
