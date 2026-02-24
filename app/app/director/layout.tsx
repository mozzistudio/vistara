'use client'

import Sidebar from './components/Sidebar'

export default function DirectorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-[#0A0E17]">{children}</main>
    </div>
  )
}
