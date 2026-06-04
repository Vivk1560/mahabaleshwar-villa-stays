// app/luxury-villas-in-mahabaleshwar/page.tsx
// Root-level SEO landing page for "luxury villas in Mahabaleshwar"
// URL: https://www.mahabaleshwarvillastays.com/luxury-villas-in-mahabaleshwar
// Uses the same programmatic data as /villas/luxury-villas-in-mahabaleshwar
// but lives at the root for maximum SEO authority and clean URLs.

import { buildMetadata, dedupeKeywords } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { ProgrammaticLandingPage } from '@/components/seo/ProgrammaticLandingPage'
import { buildBreadcrumbSchema, buildFaqSchema, buildItemListSchema } from '@/lib/seo/schema'
import { getProgrammaticLandingPageData } from '@/lib/programmatic-seo'

// Re-use the same data object — no duplication
const slug = 'luxury-villas-in-mahabaleshwar'
const data = getProgrammaticLandingPageData(slug)

// Override the path to reflect the root URL
const pageData = { ...data, path: `/${slug}` }

export function generateMetadata() {
  return buildMetadata({
    title: pageData.seoTitle,
    description: pageData.seoDescription,
    path: pageData.path,          // canonical → /luxury-villas-in-mahabaleshwar
    image: pageData.metaImage,
    imageAlt: pageData.metaImageAlt,
    keywords: dedupeKeywords(pageData.keywords, ['Mahabaleshwar luxury stay']),
  })
}

export default function LuxuryVillasMahabaleshwarPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: pageData.h1, item: pageData.path },
        ])}
      />
      {pageData.featuredVillas.length > 0 && (
        <JsonLd
          data={buildItemListSchema({
            name: pageData.featuredTitle,
            description: pageData.featuredDescription,
            items: pageData.featuredVillas.map((villa) => ({
              name: villa.name,
              url: `/villas/${villa.id}`,
            })),
          })}
        />
      )}
      <JsonLd data={buildFaqSchema(pageData.faqItems)} />
      <ProgrammaticLandingPage data={pageData} />
    </>
  )
}
