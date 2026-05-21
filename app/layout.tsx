import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Playfair_Display, Lato } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })
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
  // ✅ Required for all relative URLs (og:image etc.) to work correctly
  metadataBase: new URL('https://www.mahabaleshwarvillastays.com'),

  title: {
    default: 'Mahabaleshwar Villa Stays — Premium Luxury Villas & Vacation Rentals',
    template: '%s | Mahabaleshwar Villa Stays',
  },
  description:
    'Discover premium luxury villas in Mahabaleshwar with breathtaking valley views. Experience world-class hospitality with 25+ curated villa properties. Direct WhatsApp booking.',
  keywords: [
    'Mahabaleshwar villas',
    'luxury villas Mahabaleshwar',
    'vacation rentals Mahabaleshwar',
    'family villas Mahabaleshwar',
    'couple villa Mahabaleshwar',
    'pool villas Mahabaleshwar',
    'valley view villas',
    'hill station villa rental Maharashtra',
    'group stay Mahabaleshwar',
    'budget villa Mahabaleshwar',
  ],
  generator: 'Next.js',
  authors: [{ name: 'Mahabaleshwar Villa Stays' }],
  creator: 'Mahabaleshwar Villa Stays',

  // ✅ THE CANONICAL FIX — this is what GSC was complaining about
  alternates: {
    canonical: 'https://www.mahabaleshwarvillastays.com',
  },

  // ✅ Open Graph — fixes blank social media previews
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.mahabaleshwarvillastays.com',
    siteName: 'Mahabaleshwar Villa Stays',
    title: 'Mahabaleshwar Villa Stays — Premium Luxury Villas & Vacation Rentals',
    description:
      'Premium luxury villas in Mahabaleshwar with breathtaking valley views. 25+ curated properties. Direct WhatsApp booking.',
    images: [
      {
        url: '/og-image.jpg', // ← Upload a 1200×630px villa photo as /public/og-image.jpg
        width: 1200,
        height: 630,
        alt: 'Luxury villa with valley views in Mahabaleshwar',
      },
    ],
  },

  // ✅ Twitter/X card
  twitter: {
    card: 'summary_large_image',
    title: 'Mahabaleshwar Villa Stays — Premium Luxury Villas',
    description:
      'Premium luxury villas in Mahabaleshwar. Valley views, pools, BBQ. Book via WhatsApp.',
    images: ['/og-image.jpg'],
  },

  icons: {
    icon: '/logo.jpeg',
    apple: '/logo.jpeg',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
}

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
