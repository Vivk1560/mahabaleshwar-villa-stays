import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Playfair_Display, Lato } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({
  subsets: ['latin'],
})

const _geistMono = Geist_Mono({
  subsets: ['latin'],
})

const _playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const _lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
})

export const metadata: Metadata = {
  title: 'Mahabaleshwar Villa Stays - Premium Luxury Villas & Vacation Rentals',

  description:
    'Discover premium luxury villas in Mahabaleshwar with breathtaking valley views. Experience world-class hospitality with curated villa properties.',

  keywords:
    'Mahabaleshwar villas, luxury vacation rentals, hill station resorts, boutique villas, Mahabaleshwar stays, premium accommodations',

  generator: 'Next.js',

  icons: {
    icon: '/logo.jpeg',
    apple: '/logo.jpeg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${_playfairDisplay.variable} ${_lato.variable} bg-background`}
    >
      <body className="font-lato antialiased">
        {children}

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}