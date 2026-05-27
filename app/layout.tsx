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
  name: SITE.name,
  description:
    'Premium luxury villas in Mahabaleshwar with valley views, private pools, family stays, and direct WhatsApp booking.',
  url: SITE.url,
  telephone: SITE.contact.phone,
  email: SITE.contact.email,

  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.streetAddress,
    addressLocality: SITE.address.addressLocality,
    addressRegion: SITE.address.addressRegion,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.addressCountry,
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
    telephone: SITE.contact.phone,
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi', 'Marathi'],
  },

  priceRange: '₹₹₹',

  image: absoluteUrl(SITE.defaultImage),

  logo: {
    '@type': 'ImageObject',
    url: absoluteUrl(SITE.logoPath),
  },

  hasMap: 'https://maps.google.com/?q=Bhilar+Mahabaleshwar+Satara+Maharashtra',

  numberOfRooms: '25',

  // FIX: sameAs links tell Google which social/map profiles belong to this business
  sameAs: [...SITE.socialProfiles],
}

// ── WebSite schema — enables Google Sitelinks Searchbox ───────────────────
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE.url,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE.url}/villas?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

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
