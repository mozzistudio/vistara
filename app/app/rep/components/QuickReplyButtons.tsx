'use client'

interface QuickReplyButtonsProps {
  replies: string[]
  onSelect: (reply: string) => void
}

export default function QuickReplyButtons({ replies, onSelect }: QuickReplyButtonsProps) {
  if (!replies || replies.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 px-4 py-2">
      {replies.map((reply) => (
        <button
          key={reply}
          onClick={() => onSelect(reply)}
          className="px-4 py-1.5 rounded-full text-sm border border-[#25D366] text-[#25D366] bg-transparent hover:bg-[#25D366] hover:text-white transition-colors duration-200 whitespace-nowrap"
        >
          {reply}
        </button>
      ))}
    </div>
  )
}
