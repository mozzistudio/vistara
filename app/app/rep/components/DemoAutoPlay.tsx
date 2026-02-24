'use client'

export default function DemoAutoPlay() {
  const handleClick = () => {
    alert('Demo auto-play coming soon')
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
    >
      <span>&#9654;</span>
      <span>Ver demo completa</span>
    </button>
  )
}
