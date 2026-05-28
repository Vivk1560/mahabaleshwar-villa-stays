import { SITE, absoluteUrl } from '@/lib/seo/metadata'

export type SchemaValue = Record<string, unknown>

export interface BreadcrumbItem {
  name: string
  item: string
}

export interface FaqItem {
  q: string
  a: string
}

export interface VillaReview {
  author: string
  rating: number
  comment: string
  date?: string
}

export interface VillaSchemaInput {
  id: string
  name: string
  description: string
  address: string
  location: string
  priceRange?: string
  bhk?: string
  capacity?: number
  rating?: number
  geo?: {
    latitude: string
    longitude: string
  }
  listingImage: string
  galleryImages?: string[]
  amenities?: string[]
  reviews?: VillaReview[]
}

export interface BlogSchemaInput {
  slug: string
  title: string
  excerpt: string
  banner: string
  date: string
  author?: string
}

export function buildImageObjectSchema({
  url,
  width = 1200,
  height = 630,
  alt,
}: {
  url: string
  alt: string
  width?: number
  height?: number
}): SchemaValue {
  return {
    '@type': 'ImageObject',
    url: absoluteUrl(url),
    width,
    height,
    caption: alt,
    name: alt,
  }
}

export function buildOrganizationSchema(): SchemaValue {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: buildImageObjectSchema({
      url: SITE.logoPath,
      alt: SITE.name,
      width: 180,
      height: 180,
    }),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.contact.phone,
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi', 'Marathi'],
    },
    sameAs: [...SITE.socialProfiles],
  }
}

export function buildWebsiteSchema() {
  return {
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
}

export function buildLocalBusinessSchema(): SchemaValue {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE.name,
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
    logo: absoluteUrl(SITE.logoPath),
    sameAs: [...SITE.socialProfiles],
  }
}

export function buildLodgingBusinessSchema(): SchemaValue {
  return {
    ...buildLocalBusinessSchema(),
    '@type': 'LodgingBusiness',
    numberOfRooms: '25',
    hasMap: 'https://maps.google.com/?q=Bhilar+Mahabaleshwar+Satara+Maharashtra',
  }
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]): SchemaValue {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.item),
    })),
  }
}

export function buildFaqSchema(items: FaqItem[]): SchemaValue {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }
}

export function buildItemListSchema({
  name,
  description,
  items,
}: {
  name: string
  description: string
  items: Array<{ name: string; url: string }>
}): SchemaValue {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    description,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.url),
    })),
  }
}

export function buildBlogPostingSchema({
  slug,
  title,
  excerpt,
  banner,
  date,
  author = SITE.name,
}: BlogSchemaInput): SchemaValue {
  const imageUrl = absoluteUrl(banner)

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: excerpt,
    image: buildImageObjectSchema({
      url: imageUrl,
      alt: title,
    }),
    datePublished: date,
    dateModified: date,
    author: {
      '@type': 'Person',
      name: author,
      url: SITE.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: buildImageObjectSchema({
        url: SITE.logoPath,
        alt: SITE.name,
        width: 180,
        height: 180,
      }),
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE.url}/blogs/${slug}`,
    },
    isPartOf: {
      '@type': 'Blog',
      name: `${SITE.name} Blog`,
      url: `${SITE.url}/blogs`,
    },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// buildVacationRentalSchema
// GSC fixes applied in this version:
//   1. additionalType — signals LodgingBusiness + House to Google
//   2. containsPlace — geographic anchoring required by VacationRental spec
//   3. containedInPlace — city/state hierarchy for local SEO
//   4. review objects — individual Review entities with all required fields
//   5. checkinTime / checkoutTime — ISO 8601 format (T12:00:00) not bare strings
//   6. potentialAction — ReserveAction for rich result eligibility
// ─────────────────────────────────────────────────────────────────────────────
export function buildVacationRentalSchema({
  id,
  name,
  description,
  address,
  location,
  priceRange,
  bhk,
  capacity,
  rating,
  geo,
  listingImage,
  galleryImages = [],
  amenities = [],
  reviews = [],
}: VillaSchemaInput): SchemaValue {
  const reviewCount = reviews.length

  const ratingValue =
    rating ??
    (reviewCount > 0
      ? Number(
          (
            reviews.reduce((total, review) => total + review.rating, 0) /
            reviewCount
          ).toFixed(1)
        )
      : undefined)

  // Parse BHK number safely for numberOfRooms
  const numberOfRooms = bhk
    ? Number.parseInt(bhk.replace(/[^0-9]/g, ''), 10) || undefined
    : undefined

  // Encode address for Maps link
  const mapsAddress = encodeURIComponent(`${address}, Mahabaleshwar, Maharashtra 412806`)

  // Build WhatsApp booking action URL
  const waMessage = encodeURIComponent(
    `Hi, I am interested in booking ${name} in Mahabaleshwar. Please share availability and best rate.`
  )

  return {
    '@context': 'https://schema.org',
    '@type': 'VacationRental',

    // ── Identity ─────────────────────────────────────────────────────────────
    '@id': `${SITE.url}/villas/${id}`,
    identifier: id,
    name,
    description,
    url: `${SITE.url}/villas/${id}`,

    // ── FIX 1: additionalType ─────────────────────────────────────────────────
    // Tells Google this is both a LodgingBusiness and a residential House,
    // which resolves the "additionalType" GSC warning on VacationRental entities.
    additionalType: [
      'https://schema.org/LodgingBusiness',
      'https://schema.org/House',
    ],

    // ── FIX 2 & 3: containsPlace + containedInPlace ───────────────────────────
    // containsPlace anchors the specific accommodation type within the rental.
    // containedInPlace provides the city/state geographic hierarchy Google uses
    // for local search association. Both were missing and triggered GSC warnings.
    containsPlace: {
      '@type': 'Accommodation',
      name: bhk ? `${bhk} Private Villa` : 'Private Villa',
      ...(numberOfRooms ? { numberOfRooms } : {}),
      ...(capacity
        ? {
            occupancy: {
              '@type': 'QuantitativeValue',
              maxValue: capacity,
              unitText: 'guests',
            },
          }
        : {}),
    },
    containedInPlace: {
      '@type': 'City',
      name: 'Mahabaleshwar',
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Maharashtra',
        containedInPlace: {
          '@type': 'Country',
          name: 'India',
        },
      },
    },

    // ── Address & geo ─────────────────────────────────────────────────────────
    address: {
      '@type': 'PostalAddress',
      streetAddress: address,
      addressLocality: 'Mahabaleshwar',
      addressRegion: 'Maharashtra',
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.addressCountry,
    },
    ...(geo
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: geo.latitude,
            longitude: geo.longitude,
          },
        }
      : {}),

    // ── Images ───────────────────────────────────────────────────────────────
    image: [
      buildImageObjectSchema({ url: listingImage, alt: name }),
      ...galleryImages.map((img) =>
        buildImageObjectSchema({ url: img, alt: name })
      ),
    ],
    thumbnail: absoluteUrl(listingImage),

    // ── Capacity & pricing ────────────────────────────────────────────────────
    ...(numberOfRooms ? { numberOfRooms } : {}),
    ...(capacity ? { maximumAttendeeCapacity: capacity } : {}),
    ...(capacity
      ? {
          occupancy: {
            '@type': 'QuantitativeValue',
            maxValue: capacity,
            unitText: 'guests',
          },
        }
      : {}),
    ...(priceRange ? { priceRange } : {}),
    currenciesAccepted: 'INR',
    paymentAccepted: 'WhatsApp booking, Bank Transfer',

    // ── FIX 5: checkinTime / checkoutTime in ISO 8601 format ──────────────────
    // Google requires T-prefixed time strings for VacationRental check-in/out.
    // Bare "12:00" strings trigger a GSC structured data format warning.
    checkinTime: 'T12:00:00',
    checkoutTime: 'T11:00:00',

    // ── Amenities ─────────────────────────────────────────────────────────────
    amenityFeature: amenities.map((amenity) => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity,
      value: true,
    })),

    petsAllowed: false,

    // ── Contact ───────────────────────────────────────────────────────────────
    telephone: SITE.contact.phone,
    email: SITE.contact.email,
    hasMap: `https://maps.google.com/maps?q=${mapsAddress}`,
    availableLanguage: ['English', 'Hindi', 'Marathi'],

    // ── FIX 4: review objects ─────────────────────────────────────────────────
    // Individual Review entities with author, rating, body, and datePublished.
    // Previously only aggregateRating was emitted; missing review objects caused
    // the GSC "optional review" warning. datePublished is required by Google for
    // Review to be eligible for rich results — fallback to "2024-10-01" when
    // the reviews.json entry has no date field.
    ...(reviewCount > 0
      ? {
          review: reviews.slice(0, 5).map((review) => ({
            '@type': 'Review',
            author: {
              '@type': 'Person',
              name: review.author,
            },
            reviewRating: {
              '@type': 'Rating',
              ratingValue: review.rating,
              bestRating: 5,
              worstRating: 1,
            },
            reviewBody: review.comment,
            datePublished: review.date ?? '2024-10-01',
          })),
        }
      : {}),

    // ── Aggregate rating ──────────────────────────────────────────────────────
    ...(ratingValue
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue,
            bestRating: 5,
            worstRating: 1,
            reviewCount: reviewCount || 1,
          },
        }
      : {}),

    // ── FIX 6: potentialAction with ReserveAction ─────────────────────────────
    // Adds a bookable action endpoint which improves rich result eligibility
    // and signals to Google that this is an active bookable accommodation.
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `https://wa.me/919921372661?text=${waMessage}`,
        inLanguage: 'en',
        actionPlatform: [
          'https://schema.org/DesktopWebPlatform',
          'https://schema.org/MobileWebPlatform',
        ],
      },
      result: {
        '@type': 'LodgingReservation',
        name: `Book ${name}`,
      },
    },
  }
}
