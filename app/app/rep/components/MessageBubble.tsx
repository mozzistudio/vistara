'use client'

export interface Message {
  id: string
  sender: 'bot' | 'user'
  text: string
  timestamp: string
  quickReplies?: string[]
}

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isBot = message.sender === 'bot'

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} px-4 py-0.5`}>
      <div
        className={`
          relative max-w-[85%] px-3 py-2 shadow-sm text-sm leading-relaxed
          ${
            isBot
              ? 'bg-white text-[#111B21] rounded-2xl rounded-tl-sm'
              : 'bg-[#DCF8C6] text-[#111B21] rounded-2xl rounded-tr-sm'
          }
        `}
      >
        {/* Message text - render with line breaks */}
        <div className="whitespace-pre-wrap break-words pr-14">
          {message.text}
        </div>

        {/* Timestamp and read receipts */}
        <div className="flex items-center justify-end gap-1 -mt-1">
          <span className="text-[10px] text-[#667781]">{message.timestamp}</span>
          {!isBot && (
            <span className="text-[#53BDEB] text-[11px] font-bold tracking-tight">
              {'✓✓'}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
