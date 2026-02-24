'use client'

import ChatPanel from './components/ChatPanel'
import MapPanel from './components/MapPanel'
import RouteSidebar from './components/RouteSidebar'
import StatsBar from './components/StatsBar'

export default function RepPage() {
  return (
    <div className="flex flex-col h-full bg-[#0A0E17]">
      {/* 3-panel layout */}
      <div className="flex flex-1 min-h-0">
        {/* Left panel - WhatsApp Chat (320px) */}
        <ChatPanel />

        {/* Center panel - Map (flex) */}
        <MapPanel />

        {/* Right panel - Route Sidebar (280px) */}
        <RouteSidebar />
      </div>

      {/* Bottom stats bar */}
      <StatsBar />
    </div>
  )
}
