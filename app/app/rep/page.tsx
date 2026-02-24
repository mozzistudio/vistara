'use client'

import { useState } from 'react'
import ChatPanel from './components/ChatPanel'
import MapPanel from './components/MapPanel'
import RouteSidebar from './components/RouteSidebar'
import StatsBar from './components/StatsBar'

const tabs = [
  { id: 'chat', label: 'Chat', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )},
  { id: 'map', label: 'Mapa', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )},
  { id: 'route', label: 'Ruta', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="19" r="3" /><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" /><circle cx="18" cy="5" r="3" />
    </svg>
  )},
] as const

type TabId = typeof tabs[number]['id']

export default function RepPage() {
  const [activeTab, setActiveTab] = useState<TabId>('chat')

  return (
    <div className="flex flex-col h-full bg-[#0A0E17]">
      <h1 className="sr-only">Panel de Representante</h1>

      {/* Mobile tab bar - visible only on narrow screens */}
      <div className="flex lg:hidden border-b border-white/[0.06] shrink-0" style={{ background: 'rgba(17,24,39,0.8)' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'text-[#22D3EE] border-b-2 border-[#22D3EE]'
                : 'text-[#94A3B8]'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Desktop: 3-panel layout */}
      <div className="hidden lg:flex flex-1 min-h-0">
        <ChatPanel />
        <MapPanel />
        <RouteSidebar />
      </div>

      {/* Mobile: single panel based on active tab */}
      <div className="flex-1 min-h-0 lg:hidden">
        <div className={activeTab === 'chat' ? 'h-full' : 'hidden'}>
          <ChatPanel />
        </div>
        <div className={activeTab === 'map' ? 'h-full' : 'hidden'}>
          <MapPanel />
        </div>
        <div className={activeTab === 'route' ? 'h-full' : 'hidden'}>
          <RouteSidebar />
        </div>
      </div>

      {/* Bottom stats bar */}
      <StatsBar />
    </div>
  )
}
