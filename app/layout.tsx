import type { Metadata } from 'next'
import { Syne, IBM_Plex_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['700', '800'],
  display: 'swap',
})

const ibmPlex = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-ibm',
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Vistara — Inteligencia de Rutas para Pharma',
    template: '%s | Vistara',
  },
  description: 'Optimización de rutas con IA para equipos comerciales farmacéuticos en Panamá. Más visitas, menos tiempo en ruta, mejor cobertura.',
  metadataBase: new URL('https://vistara-rho.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'es_PA',
    url: 'https://vistara-rho.vercel.app',
    siteName: 'Vistara',
    title: 'Vistara — Inteligencia de Rutas para Pharma',
    description: 'Optimización de rutas con IA para equipos comerciales farmacéuticos en Panamá.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vistara — Inteligencia de Rutas para Pharma',
    description: 'Optimización de rutas con IA para equipos comerciales farmacéuticos en Panamá.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://vistara-rho.vercel.app',
    languages: { 'es': 'https://vistara-rho.vercel.app', 'en': 'https://vistara-rho.vercel.app/en' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${syne.variable} ${ibmPlex.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
