'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/app/director/map', icon: '🗺️', label: 'Mapa' },
  { href: '/app/director/dashboard', icon: '📊', label: 'Dashboard' },
  { href: '/app/director/hcps', icon: '👥', label: 'HCPs' },
  { href: '/app/director/reports', icon: '📈', label: 'Reportes' },
  { href: '/app/director/settings', icon: '⚙️', label: 'Configuración' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="w-[200px] shrink-0 flex flex-col h-full py-4"
      style={{
        background: '#111827',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <nav className="flex flex-col gap-1 px-2 flex-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + '/')

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'text-[#22D3EE]'
                  : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[rgba(255,255,255,0.04)]'
              }`}
              style={
                isActive
                  ? {
                      background:
                        'linear-gradient(135deg, rgba(34,211,238,0.12), rgba(34,211,238,0.04))',
                      boxShadow: 'inset 0 0 0 1px rgba(34,211,238,0.15)',
                    }
                  : undefined
              }
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="px-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
        <div className="text-[10px] text-[#94A3B8] opacity-50">
          Vistara Director v1.0
        </div>
      </div>
    </aside>
  )
}
