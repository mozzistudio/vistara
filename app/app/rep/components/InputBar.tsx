'use client'

import { useState } from 'react'

interface InputBarProps {
  onSend: (text: string) => void
}

export default function InputBar({ onSend }: InputBarProps) {
  const [text, setText] = useState('')

  const handleSend = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    onSend(trimmed)
    setText('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const hasText = text.trim().length > 0

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-[#F0F2F5] border-t border-[#E9EDEF]">
      {/* Emoji button */}
      <button
        className="flex items-center justify-center w-9 h-9 rounded-full text-[#54656F] hover:bg-[#D9DBDF] transition-colors"
        title="Emoji"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm5.694 0c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm0-3.5c-2.209 0-4-1.343-4-3h1.5c0 .828 1.119 1.5 2.5 1.5s2.5-.672 2.5-1.5H16c0 1.657-1.791 3-4 3z" />
        </svg>
      </button>

      {/* Attach button */}
      <button
        className="flex items-center justify-center w-9 h-9 rounded-full text-[#54656F] hover:bg-[#D9DBDF] transition-colors"
        title="Adjuntar"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 003.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.501.501 1.134.812 1.732.853.521.036 1.004-.14 1.36-.497l6.109-6.107a.55.55 0 000-.777.55.55 0 00-.777 0l-6.11 6.108c-.147.146-.339.174-.521.16-.27-.019-.575-.186-.853-.463-.578-.578-.643-1.36-.157-1.847l7.916-7.916c.818-.816 2.56-.636 3.735.539 1.176 1.176 1.355 2.917.539 3.735l-9.547 9.547a4.028 4.028 0 01-2.864 1.19 4.028 4.028 0 01-2.864-1.19 4.028 4.028 0 01-1.19-2.864 4.028 4.028 0 011.19-2.864l8.024-8.024a.55.55 0 000-.777.55.55 0 00-.777 0L3.463 12.69a5.12 5.12 0 00-1.647 3.866z" />
        </svg>
      </button>

      {/* Text input */}
      <div className="flex-1 relative">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe un mensaje"
          className="w-full px-4 py-2.5 rounded-lg bg-white text-[#111B21] text-sm placeholder-[#667781] outline-none border border-transparent focus:border-[#00A884] transition-colors"
        />
      </div>

      {/* Mic or Send button */}
      {hasText ? (
        <button
          onClick={handleSend}
          className="flex items-center justify-center w-9 h-9 rounded-full text-[#54656F] hover:bg-[#D9DBDF] transition-colors"
          title="Enviar"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z" />
          </svg>
        </button>
      ) : (
        <button
          className="flex items-center justify-center w-9 h-9 rounded-full text-[#54656F] hover:bg-[#D9DBDF] transition-colors"
          title="Mensaje de voz"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.003H4.761c0 4.001 3.178 7.297 7.061 7.885v3.884h.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-1z" />
          </svg>
        </button>
      )}
    </div>
  )
}
