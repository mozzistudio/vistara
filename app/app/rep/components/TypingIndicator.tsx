'use client'

export default function TypingIndicator() {
  return (
    <div className="flex justify-start px-4 py-1">
      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex items-center gap-1">
        <span
          className="w-2 h-2 rounded-full bg-[#94A3B8] animate-bounce"
          style={{ animationDelay: '0ms', animationDuration: '600ms' }}
        />
        <span
          className="w-2 h-2 rounded-full bg-[#94A3B8] animate-bounce"
          style={{ animationDelay: '150ms', animationDuration: '600ms' }}
        />
        <span
          className="w-2 h-2 rounded-full bg-[#94A3B8] animate-bounce"
          style={{ animationDelay: '300ms', animationDuration: '600ms' }}
        />
      </div>
    </div>
  )
}
