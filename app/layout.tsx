// app/layout.tsx
// ─────────────────────────────────────────────────────────────────────────────
// FIXES in this version:
//  1. Added WebSite schema with SearchAction (supports Google sitelinks searchbox)
//  2. LodgingBusiness schema telephone standardised to match NAP consistency
//  3. Added sameAs array for social profiles (improves Knowledge Panel)
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Playfair_Display, Lato } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { SITE, absoluteUrl } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { buildLodgingBusinessSchema, buildWebsiteSchema } from '@/lib/seo/schema'

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
  metadataBase: new URL(SITE.url),

  title: {
    default: SITE.defaultTitle,
    template: SITE.titleTemplate,
  },

  description: SITE.defaultDescription,

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

  authors: [{ name: 'Mahabaleshwar Villa Stays' }],

  creator: 'Mahabaleshwar Villa Stays',

  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    images: [
      {
        url: absoluteUrl(SITE.defaultImage),
        width: 1200,
        height: 630,
        alt: 'Luxury villa stays in Mahabaleshwar',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    images: [absoluteUrl(SITE.defaultImage)],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
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
        <JsonLd data={buildLodgingBusinessSchema()} />
        <JsonLd data={buildWebsiteSchema()} />

        {children}

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
