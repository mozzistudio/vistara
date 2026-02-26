'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  Building2,
  Users,
  ShoppingCart,
  BarChart3,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const NAV = [
  {
    label: 'Principal',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/products', label: 'Productos', icon: Package },
      { href: '/pharmacies', label: 'Farmacias', icon: Building2 },
      { href: '/sellers', label: 'Vendedores', icon: Users },
      { href: '/sales', label: 'Ventas', icon: ShoppingCart },
    ],
  },
  {
    label: 'Inteligencia',
    items: [
      { href: '/analytics', label: 'Analíticas', icon: BarChart3 },
      { href: '/stock', label: 'Alertas Stock', icon: AlertTriangle },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-[220px] flex flex-col z-30"
      style={{ background: 'var(--deep)' }}
    >
      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/5">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <span className="text-2xl leading-none">🌿</span>
          <span
            className="font-display font-bold text-lg leading-none"
            style={{ color: 'var(--neon-mint)' }}
          >
            Vistara
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {NAV.map(section => (
          <div key={section.label}>
            <p
              className="font-mono uppercase tracking-widest px-3 mb-2 select-none"
              style={{ fontSize: '9px', color: 'rgba(255,255,255,0.2)' }}
            >
              {section.label}
            </p>
            <ul className="space-y-0.5">
              {section.items.map(item => {
                const active = pathname === item.href || pathname.startsWith(item.href + '/')
                const Icon = item.icon
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-[13px] font-medium transition-all duration-150 group',
                        active
                          ? 'text-neon-mint'
                          : 'text-[#8AAFA0] hover:text-[#C8E8D4] hover:bg-white/5'
                      )}
                      style={active ? { background: 'var(--neon-mint-dim)' } : {}}
                    >
                      <div
                        className="w-2 h-2 rounded-[3px] flex-shrink-0"
                        style={{
                          background: active ? 'var(--forest)' : 'rgba(255,255,255,0.08)',
                        }}
                      />
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      {active && (
                        <ChevronRight className="w-3 h-3 opacity-50" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div
              className="my-4 mx-2"
              style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }}
            />
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div
        className="px-5 py-4 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <p className="font-mono text-[9px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Vistara V2
        </p>
        <p className="font-mono text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.15)' }}>
          Nature Pharma Platform
        </p>
      </div>
    </aside>
  )
}
