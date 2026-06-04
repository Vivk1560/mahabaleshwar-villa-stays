// app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { SITE, absoluteUrl } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { buildLodgingBusinessSchema, buildWebsiteSchema } from '@/lib/seo/schema'
import { StickyMobileCTA } from '@/components/StickyMobileCTA'

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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.webmanifest',
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
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Mahabaleshwar Villa Stays',
            url: SITE.url,
            logo: `${SITE.url}/icons/icon-512x512.png`,
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+91-9921372661',
              contactType: 'customer service',
              areaServed: 'IN',
              availableLanguage: ['English', 'Hindi', 'Marathi'],
            },
            sameAs: [],
          }}
        />
        {children}
        <StickyMobileCTA />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
