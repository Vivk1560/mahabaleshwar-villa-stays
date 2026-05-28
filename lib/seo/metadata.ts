import type { Metadata } from 'next'

export const SITE = {
  name: 'Mahabaleshwar Villa Stays',
  url: 'https://www.mahabaleshwarvillastays.com',
  locale: 'en_IN',
  titleTemplate: '%s | Mahabaleshwar Villa Stays',
  defaultTitle: 'Luxury Villas in Mahabaleshwar',
  defaultDescription:
    'Discover premium luxury villas in Mahabaleshwar with breathtaking valley views, private pools, family-friendly stays, and direct WhatsApp booking.',
  defaultImage: '/images/hero-bg.jpg',
  logoPath: '/logo.jpeg',
  contact: {
    phone: '+918080557611',
    email: 'rajeshgarela0@gmail.com',
  },
  address: {
    streetAddress: 'Bhilar, Panchgani Mahabaleshwar Road',
    addressLocality: 'Satara',
    addressRegion: 'Maharashtra',
    postalCode: '412806',
    addressCountry: 'IN',
  },
  socialProfiles: [
    'https://wa.me/919921372661',
    'https://maps.google.com/?q=Mahabaleshwar+Villa+Stays+Bhilar+Maharashtra',
  ],
} as const

export interface BuildMetadataInput {
  title: string
  description: string
  path: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  keywords?: string[]
  authors?: Metadata['authors']
  noIndex?: boolean
  publishedTime?: string
  modifiedTime?: string
}

function normalizePath(path: string) {
  if (!path) {
    return '/'
  }

  if (path.startsWith('/')) {
    return path
  }

  return `/${path}`
}

export function absoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path
  }

  return new URL(normalizePath(path), SITE.url).toString()
}

export function dedupeKeywords(...groups: Array<string[] | undefined>) {
  const keywords = new Set<string>()

  for (const group of groups) {
    if (!group) continue
    for (const keyword of group) {
      const cleaned = keyword.trim()
      if (cleaned) {
        keywords.add(cleaned)
      }
    }
  }

  return Array.from(keywords)
}

export function buildRobotsMetadata(noIndex = false): Metadata['robots'] {
  if (noIndex) {
    return {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    }
  }

  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  }
}

export function buildMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  type = 'website',
  keywords,
  authors,
  noIndex = false,
  publishedTime,
  modifiedTime,
}: BuildMetadataInput): Metadata {
  const canonicalUrl = absoluteUrl(path)
  const resolvedImage = image ? absoluteUrl(image) : null

  return {
    title,
    description,
    keywords,
    authors,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: buildRobotsMetadata(noIndex),
    openGraph: {
      type,
      url: canonicalUrl,
      siteName: SITE.name,
      locale: SITE.locale,
      title,
      description,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(resolvedImage
        ? {
            images: [
              {
                url: resolvedImage,
                width: 1200,
                height: 630,
                alt: imageAlt ?? title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(resolvedImage ? { images: [resolvedImage] } : {}),
    },
  }
}
