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

// ── LodgingBusiness JSON-LD — represents the overall business entity ───────
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Mahabaleshwar Villa Stays',
  description:
    '25+ premium luxury villas in Mahabaleshwar with breathtaking valley views. Pool villas, family villas, couple villas & group villas. Direct WhatsApp booking.',
  url: 'https://www.mahabaleshwarvillastays.com',
  // FIX: standardised telephone — matches footer and NAP
  telephone: '+918080557611',
  email: 'rajeshgarela0@gmail.com',

  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bhilar, Panchgani Mahabaleshwar Road',
    addressLocality: 'Satara',
    addressRegion: 'Maharashtra',
    postalCode: '412806',
    addressCountry: 'IN',
  },

  geo: {
    '@type': 'GeoCoordinates',
    latitude: '17.9241',
    longitude: '73.7483',
  },

  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '21:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday'],
      opens: '10:00',
      closes: '20:00',
    },
  ],

  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+918080557611',
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi', 'Marathi'],
  },

  priceRange: '₹₹₹',

  image: 'https://www.mahabaleshwarvillastays.com/og-image.jpg',

  logo: {
    '@type': 'ImageObject',
    url: 'https://www.mahabaleshwarvillastays.com/logo.jpeg',
  },

  hasMap: 'https://maps.google.com/?q=Bhilar+Mahabaleshwar+Satara+Maharashtra',

  numberOfRooms: '25',

  // FIX: sameAs links tell Google which social/map profiles belong to this business
  sameAs: [
    'https://wa.me/919921372661',
    'https://maps.google.com/?q=Mahabaleshwar+Villa+Stays+Bhilar+Maharashtra',
  ],
}

// ── WebSite schema — enables Google Sitelinks Searchbox ───────────────────
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Mahabaleshwar Villa Stays',
  url: 'https://www.mahabaleshwarvillastays.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.mahabaleshwarvillastays.com/villas?search={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

export const metadata: Metadata = {
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

  alternates: {
    canonical: 'https://www.mahabaleshwarvillastays.com',
  },

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
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxury villa with valley views in Mahabaleshwar',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Mahabaleshwar Villa Stays — Premium Luxury Villas',
    description: 'Premium luxury villas in Mahabaleshwar. Valley views, pools, BBQ. Book via WhatsApp.',
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
        {/* LodgingBusiness schema — overall business entity */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        {/* WebSite schema — enables Sitelinks Searchbox */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        {children}

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}