'use client'

import { useState } from 'react'
import { ChatWidget } from '@/components/chat/ChatWidget'
import { ChatToggle } from '@/components/chat/ChatToggle'

export function DashboardClientLayout({ children }: { children: React.ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <>
      {children}
      <ChatWidget open={chatOpen} />
      <ChatToggle open={chatOpen} onClick={() => setChatOpen(v => !v)} />
    </>
  )
}
