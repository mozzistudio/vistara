import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

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
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
