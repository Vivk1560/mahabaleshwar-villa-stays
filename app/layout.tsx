// app/layout.tsx
// ─────────────────────────────────────────────────────────────────────────────
// FIXES:
//  1. icons/apple-touch-icon/shortcut properly configured for Google logo pickup
//  2. Organization schema with absolute logo URL (Google requires this)
//  3. manifest.webmanifest referenced for PWA logo
//  4. WebSite schema with SearchAction preserved
//  5. LodgingBusiness schema NAP consistency preserved
// ─────────────────────────────────────────────────────────────────────────────
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { SITE, absoluteUrl } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { buildLodgingBusinessSchema, buildWebsiteSchema } from '@/lib/seo/schema'

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

  // ── Icons — Google reads these for the favicon/logo shown in search ────────
  // The logo file must:
  //   • Be publicly accessible (no auth, no redirect)
  //   • Be at minimum 112×112 px (512×512 recommended)
  //   • Be a square or near-square image
  // Update the paths below to match your actual logo file locations.
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

  // ── Web app manifest ───────────────────────────────────────────────────────
  // The manifest must include an icon with purpose: "any maskable" at 512×512
  // for Google to pick it up as the site logo in search results.
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
        {/*
          LodgingBusiness schema — includes logo with absolute URL.
          Google uses this to determine the logo shown in Knowledge Panel and
          search result favicons. The logo field MUST be an absolute URL.
        */}
        <JsonLd data={buildLodgingBusinessSchema()} />
        <JsonLd data={buildWebsiteSchema()} />
        {/*
          Organization schema — explicit logo declaration for Google.
          This is the most reliable way to get your actual logo shown.
          Update SITE.logo in lib/seo/metadata.ts to point to your logo file.
        */}
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Mahabaleshwar Villa Stays',
            url: SITE.url,
            // IMPORTANT: This must be an absolute URL to a crawlable image.
            // Minimum 112×112px. Recommended: your square brand logo at 512×512.
            // Update this path to match your actual logo file:
            logo: `${SITE.url}/icons/icon-512x512.png`,
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+91-9921372661',
              contactType: 'customer service',
              areaServed: 'IN',
              availableLanguage: ['English', 'Hindi', 'Marathi'],
            },
            sameAs: [
              // Add your social profile URLs here:
              // 'https://www.instagram.com/mahabaleshwarvillastays',
              // 'https://www.facebook.com/mahabaleshwarvillastays',
              // 'https://www.youtube.com/@mahabaleshwarvillastays',
            ],
          }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
