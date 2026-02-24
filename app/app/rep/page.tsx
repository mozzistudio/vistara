'use client'

import { useState } from 'react'
import ChatPanel from './components/ChatPanel'
import MapPanel from './components/MapPanel'
import RouteSidebar from './components/RouteSidebar'
import StatsBar from './components/StatsBar'

type TabId = 'chat' | 'map' | 'route'

export default function RepPage() {
  const [activeTab, setActiveTab] = useState<TabId>('chat')

  return (
    <div className="flex flex-col h-full bg-[#0A0E17]">
      <h1 className="sr-only">Panel de Representante</h1>

      {/* Mobile tab bar — only on narrow screens */}
      <div className="flex lg:hidden border-b border-white/[0.06] shrink-0" style={{ background: 'rgba(17,24,39,0.8)' }}>
        {([
          { id: 'chat' as TabId, label: 'Chat' },
          { id: 'map' as TabId, label: 'Mapa' },
          { id: 'route' as TabId, label: 'Ruta' },
        ]).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center py-3 text-xs font-medium transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'text-[#22D3EE] border-b-2 border-[#22D3EE]'
                : 'text-[#94A3B8]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Panel layout — single set of panels, CSS controls visibility */}
      <div className="flex flex-1 min-h-0">
        <div className={`lg:block lg:w-auto lg:shrink-0 ${activeTab === 'chat' ? 'block w-full' : 'hidden'}`}>
          <ChatPanel />
        </div>
        <div className={`lg:block lg:flex-1 ${activeTab === 'map' ? 'block w-full' : 'hidden'}`}>
          <MapPanel />
        </div>
        <div className={`lg:block lg:w-auto lg:shrink-0 ${activeTab === 'route' ? 'block w-full' : 'hidden'}`}>
          <RouteSidebar />
        </div>
      </div>

      {/* Bottom stats bar */}
      <StatsBar />
    </div>
  )
}
