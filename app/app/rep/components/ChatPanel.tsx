'use client'

import { useState, useRef, useEffect } from 'react'
import MessageBubble, { type Message } from './MessageBubble'
import InputBar from './InputBar'
import QuickReplyButtons from './QuickReplyButtons'
import TypingIndicator from './TypingIndicator'
import DemoAutoPlay from './DemoAutoPlay'

const MORNING_ROUTE_MESSAGE = `Buenos dias! Soy *Vistara AI*

Tu ruta de hoy esta lista:

*5 visitas | Panama Centro*
*Distancia total: 34 km | Tiempo est.: 3h 20min*

1. 08:30 - Dr. Ricardo Arias
   Cardiologo | Hosp. Santo Tomas
   Segmento: A+

2. 09:45 - Dra. Carmen Quintero
   Endocrinologa | Hosp. Nacional
   Segmento: A

3. 11:15 - Dr. Manuel Espinosa
   Internista | Centro Med. Paitilla
   Segmento: B+

4. 14:00 - Dr. Alejandro Batista
   Neurologo | Hosp. Punta Pacifica
   Segmento: A

5. 15:30 - Dra. Rosa Moreno
   Cardiologa | Clin. San Fernando
   Segmento: B

Tu primera visita es en *45 minutos*.
Quieres que te de el briefing del Dr. Arias?`

const initialMessages: Message[] = [
  {
    id: '1',
    sender: 'bot',
    text: MORNING_ROUTE_MESSAGE,
    timestamp: '07:45',
    quickReplies: ['Si, briefing', 'Ver mapa', 'Ajustar ruta', 'Llamar al doctor'],
  },
]

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = async (text: string) => {
    const now = new Date()
    const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp,
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    try {
      const res = await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      const data = await res.json()
      setIsTyping(false)
      if (data && data.text) {
        setMessages((prev) => [
          ...prev,
          {
            id: data.id || Date.now().toString(),
            sender: 'bot' as const,
            text: data.text,
            timestamp: data.timestamp || timestamp,
            quickReplies: data.quickReplies,
          },
        ])
      }
    } catch {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'bot' as const,
          text: 'No se pudo procesar el mensaje. Intenta de nuevo.',
          timestamp,
        },
      ])
    }
  }

  const handleQuickReply = (reply: string) => {
    handleSend(reply)
  }

  // Get quick replies from the last bot message
  const lastBotMessage = [...messages].reverse().find((m) => m.sender === 'bot')
  const quickReplies = lastBotMessage?.quickReplies || []

  return (
    <div className="w-[320px] shrink-0 flex flex-col h-full border-r border-white/5">
      {/* WhatsApp-style Header */}
      <div className="bg-[#075E54] px-3 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
            style={{ background: 'linear-gradient(135deg, #22D3EE, #8B5CF6)' }}
          >
            <span className="text-sm">&#129302;</span>
          </div>
          <div>
            <h3 className="text-white text-sm font-medium leading-tight">Vistara AI</h3>
            <p className="text-[#A8D8B9] text-[11px] leading-tight">en linea</p>
          </div>
        </div>
        <DemoAutoPlay />
      </div>

      {/* Chat area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto py-3"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5ddd5' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundColor: '#ECE5DD',
        }}
      >
        {/* Date pill */}
        <div className="flex justify-center mb-3">
          <span className="bg-white/80 text-[#54656F] text-[11px] px-3 py-1 rounded-lg shadow-sm">
            HOY
          </span>
        </div>

        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isTyping && <TypingIndicator />}

        {/* Quick replies shown below last bot message */}
        {!isTyping && quickReplies.length > 0 && (
          <QuickReplyButtons replies={quickReplies} onSelect={handleQuickReply} />
        )}
      </div>

      {/* Input Bar */}
      <InputBar onSend={handleSend} />
    </div>
  )
}
