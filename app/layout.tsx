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

// ✅ LocalBusiness JSON-LD — critical for Google Maps & local SEO
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Mahabaleshwar Villa Stays',
  description:
    '25+ premium luxury villas in Mahabaleshwar with breathtaking valley views. Pool villas, family villas, couple villas & group villas. Direct WhatsApp booking.',
  url: 'https://www.mahabaleshwarvillastays.com',
  telephone: '+918080557611',
  email: 'rajeshgarela0@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bhilar, Panchgani Mahabaleshwar Road, Poladpur Mahabaleshwar Road',
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
  hasMap: 'https://maps.google.com/?q=Bhilar+Mahabaleshwar+Satara+Maharashtra',
  numberOfRooms: '25',
}

// ✅ FAQ JSON-LD — enables FAQ rich results in Google Search
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How many villas does Mahabaleshwar Villa Stays offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer 25+ premium curated villas including pool villas, family villas, couple villas, group villas, valley view villas, and budget villas across Mahabaleshwar and Panchgani.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I book a villa in Mahabaleshwar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can book directly via WhatsApp at +91-9921372661 or call us at 8080557611. We provide personalized booking assistance with 24/7 concierge support and reply within minutes.',
      },
    },
    {
      '@type': 'Question',
      name: 'What amenities are available in your Mahabaleshwar villas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our villas include valley views, private pools, WiFi, hot water, parking, power backup, fully AC rooms, indoor games, BBQ areas, professional cook service, and caretaker availability.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there villas available for large groups in Mahabaleshwar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Our group villas accommodate up to 25 guests. Valley View Manor (8 BHK, 25 guests), Nature Haven Villa (7 BHK, 25 guests), and Timeless Elegance Estate (7 BHK, 25 guests) are perfect for large groups.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which is the best location for villas in Mahabaleshwar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most of our villas are located near Mapro Garden — one of the most popular and well-connected areas in Mahabaleshwar with easy access to Venna Lake, Wilson Point, and the famous strawberry farms.',
      },
    },
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="font-lato antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
