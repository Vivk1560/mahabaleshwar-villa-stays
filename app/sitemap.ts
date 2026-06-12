import { MetadataRoute } from 'next'
import villas from '@/lib/data/villas.json'
import blogs from '@/lib/data/blogs.json'
import { SITE } from '@/lib/seo/metadata'

const CATEGORY_SLUGS = [
  'pool-villas-in-mahabaleshwar',
  'family-villas-in-mahabaleshwar',
  'couple-villas-in-mahabaleshwar',
  'group-villas-in-mahabaleshwar',
  'budget-villas-in-mahabaleshwar',
  // valley-view removed — not indexed, under review
]

const ROOT_LANDING_PAGES = [
  '/luxury-villas-in-mahabaleshwar',
  '/private-pool-villas-in-mahabaleshwar',
  '/villas-for-family-in-mahabaleshwar',
  '/villas-near-mapro-garden',
  '/pet-friendly-villas-in-mahabaleshwar',
  '/3-bhk-villas-in-mahabaleshwar',
  '/4-bhk-villas-in-mahabaleshwar',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/villas`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // privacy-policy and terms-of-service intentionally excluded
    // — noindex set on those pages directly; removing from sitemap
    // stops Googlebot wasting crawl budget on non-commercial content
  ]

  const rootLandingPages: MetadataRoute.Sitemap = ROOT_LANDING_PAGES.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.92,
  }))

  const categoryPages: MetadataRoute.Sitemap = CATEGORY_SLUGS.map((slug) => ({
    url: `${baseUrl}/villas/category/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // NOTE: the old landingPages block that mapped PROGRAMMATIC_LANDING_PAGE_SLUGS
  // to /villas/X URLs has been removed entirely. Those /villas/X paths are
  // duplicate URLs — the canonical pages now live at root level above.

  const villaPages: MetadataRoute.Sitemap = villas.map((villa) => ({
    url: `${baseUrl}/villas/${villa.id}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...rootLandingPages,
    ...categoryPages,
    ...villaPages,
    ...blogPages,
  ]
}
