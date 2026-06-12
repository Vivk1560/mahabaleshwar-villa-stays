// app/pet-friendly-villas-in-mahabaleshwar/page.tsx
// Root-level SEO landing page for "pet-friendly villas in Mahabaleshwar"
// URL: https://www.mahabaleshwarvillastays.com/pet-friendly-villas-in-mahabaleshwar
// Canonical root path — the /villas/pet-friendly-villas-in-mahabaleshwar version
// 301 redirects here via next.config.mjs

import { buildMetadata, dedupeKeywords } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { ProgrammaticLandingPage } from '@/components/seo/ProgrammaticLandingPage'
import { buildBreadcrumbSchema, buildFaqSchema, buildItemListSchema } from '@/lib/seo/schema'
import { getProgrammaticLandingPageData } from '@/lib/programmatic-seo'

const slug = 'pet-friendly-villas-in-mahabaleshwar'
const data = getProgrammaticLandingPageData(slug)
const pageData = { ...data, path: `/${slug}` }

export function generateMetadata() {
  return buildMetadata({
    title: pageData.seoTitle,
    description: pageData.seoDescription,
    path: pageData.path,
    image: pageData.metaImage,
    imageAlt: pageData.metaImageAlt,
    keywords: dedupeKeywords(pageData.keywords, ['Mahabaleshwar pet friendly stay']),
  })
}

export default function PetFriendlyVillasMahabaleshwarPage() {
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
