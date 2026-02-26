import type { Metadata } from 'next'
import { Bricolage_Grotesque, DM_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600', '700'],
})

const ibmMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-mono',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Vistara — Pharma Intelligence',
  description: 'Plataforma de inteligencia farmacéutica para equipos de ventas',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${bricolage.variable} ${dmSans.variable} ${ibmMono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
