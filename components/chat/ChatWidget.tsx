'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Send, Bot, Wifi } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: Date
}

interface ChatWidgetProps {
  open: boolean
}

export function ChatWidget({ open }: ChatWidgetProps) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'assistant',
      content: '¡Hola! Soy **Vistara AI**. Puedo consultarle datos sobre productos, farmacias, stock y ventas. ¿En qué le ayudo?',
      createdAt: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [conversationId, setConversationId] = useState<string | undefined>()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      createdAt: new Date(),
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationId,
          channel: 'WEB',
          context: { page: pathname, userId: session?.user?.id },
        }),
      })

      if (!res.ok) throw new Error('Chat error')
      const data = await res.json()

      setConversationId(data.conversationId)
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString() + '-ai',
          role: 'assistant',
          content: data.message,
          createdAt: new Date(),
        },
      ])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString() + '-err',
          role: 'assistant',
          content: 'Lo siento, ocurrió un error al procesar su consulta. Por favor intente de nuevo.',
          createdAt: new Date(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }, [input, loading, conversationId, pathname, session?.user?.id])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Simple markdown-to-html renderer
  const renderContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />')
  }

  if (!open) return null

  return (
    <div
      className="fixed bottom-24 right-6 z-40 w-[320px] rounded-[16px] overflow-hidden shadow-2xl border flex flex-col"
      style={{
        borderColor: 'var(--border)',
        maxHeight: '520px',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2.5 px-4 py-3 flex-shrink-0"
        style={{ background: 'var(--deep)' }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: 'var(--neon-mint)' }}
        />
        <span className="text-white text-sm font-semibold font-body flex-1">Vistara AI</span>
        <div className="flex gap-1.5">
          <span
            className="text-[8px] font-mono font-semibold px-2 py-0.5 rounded"
            style={{ background: 'var(--neon-mint-dim)', color: 'var(--neon-mint)' }}
          >
            WEB
          </span>
          <span
            className="text-[8px] font-mono font-semibold px-2 py-0.5 rounded flex items-center gap-1"
            style={{ background: 'rgba(37,211,102,0.15)', color: 'var(--wa-green)' }}
          >
            <Wifi className="w-2 h-2" />
            WA
          </span>
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-3 py-3 space-y-2 min-h-0"
        style={{ background: 'var(--mint-paper)', maxHeight: '360px' }}
      >
        {messages.map(msg => (
          <div
            key={msg.id}
            className={cn(
              'max-w-[88%] px-3 py-2 rounded-[12px] text-[12px] leading-relaxed',
              msg.role === 'user'
                ? 'ml-auto text-white rounded-br-sm'
                : 'mr-auto rounded-bl-sm border',
            )}
            style={
              msg.role === 'user'
                ? { background: 'var(--forest)' }
                : { background: 'white', borderColor: 'var(--border-light)', color: 'var(--text-mid)' }
            }
            dangerouslySetInnerHTML={{ __html: renderContent(msg.content) }}
          />
        ))}

        {loading && (
          <div
            className="max-w-[88%] px-3 py-2.5 rounded-[12px] rounded-bl-sm border flex gap-1 items-center"
            style={{ background: 'white', borderColor: 'var(--border-light)' }}
          >
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: 'var(--forest)',
                  animation: `bounce 1.2s ${i * 0.2}s ease-in-out infinite`,
                }}
              />
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        className="flex items-center gap-2 px-3 py-2.5 border-t flex-shrink-0"
        style={{ background: 'white', borderColor: 'var(--border)' }}
      >
        <input
          className="flex-1 text-[12px] outline-none bg-transparent font-body"
          style={{ color: 'var(--text-dark)' }}
          placeholder="Consulte sobre productos, stock, ventas..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-opacity disabled:opacity-40"
          style={{ background: 'var(--forest)', color: 'white' }}
        >
          <Send className="w-3 h-3" />
        </button>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
