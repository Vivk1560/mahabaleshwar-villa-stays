// app/villas/villas-near-mapro-garden/page.tsx
// Canonical → /villas-near-mapro-garden (root route)

import { buildMetadata, dedupeKeywords } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { ProgrammaticLandingPage } from '@/components/seo/ProgrammaticLandingPage'
import { buildBreadcrumbSchema, buildFaqSchema, buildItemListSchema } from '@/lib/seo/schema'
import { getProgrammaticLandingPageData } from '@/lib/programmatic-seo'

const data = getProgrammaticLandingPageData('villas-near-mapro-garden')

export function generateMetadata() {
  return buildMetadata({
    title: data.seoTitle,
    description: data.seoDescription,
    path: '/villas-near-mapro-garden',
    image: data.metaImage,
    imageAlt: data.metaImageAlt,
    keywords: dedupeKeywords(data.keywords, ['Mahabaleshwar Mapro Garden stay']),
  })
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: 'Villas', item: '/villas' },
          { name: data.h1, item: data.path },
        ])}
      />
      {data.featuredVillas.length > 0 && (
        <JsonLd
          data={buildItemListSchema({
            name: data.featuredTitle,
            description: data.featuredDescription,
            items: data.featuredVillas.map((villa) => ({
              name: villa.name,
              url: `/villas/${villa.id}`,
            })),
          })}
        />
      )}
      <JsonLd data={buildFaqSchema(data.faqItems)} />
      <ProgrammaticLandingPage data={data} />
    </>
  )
}
