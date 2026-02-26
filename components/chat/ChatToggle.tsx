'use client'

import { MessageSquare, X } from 'lucide-react'

interface ChatToggleProps {
  open: boolean
  onClick: () => void
  unread?: number
}

export function ChatToggle({ open, onClick, unread = 0 }: ChatToggleProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
      style={{ background: open ? 'var(--deep)' : 'var(--forest)' }}
      aria-label={open ? 'Cerrar chat' : 'Abrir Vistara AI'}
    >
      {open ? (
        <X className="w-5 h-5 text-white" />
      ) : (
        <MessageSquare className="w-5 h-5 text-white" />
      )}
      {!open && unread > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
          {unread}
        </span>
      )}
    </button>
  )
}
