import { buildMetadata, dedupeKeywords } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { ProgrammaticLandingPage } from '@/components/seo/ProgrammaticLandingPage'
import { buildBreadcrumbSchema, buildFaqSchema, buildItemListSchema } from '@/lib/seo/schema'
import { getProgrammaticLandingPageData } from '@/lib/programmatic-seo'

const data = getProgrammaticLandingPageData('luxury-villas-in-mahabaleshwar')

export function generateMetadata() {
  return buildMetadata({
    title: data.seoTitle,
    description: data.seoDescription,
    path: data.path,
    image: data.metaImage,
    imageAlt: data.metaImageAlt,
    keywords: dedupeKeywords(data.keywords, ['Mahabaleshwar luxury stay']),
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
