import { MetadataRoute } from 'next'
import villas from '@/lib/data/villas.json'
import blogs from '@/lib/data/blogs.json'
import { PROGRAMMATIC_LANDING_PAGE_SLUGS } from '@/lib/programmatic-seo'
import { SITE } from '@/lib/seo/metadata'

// All 6 category slugs under /villas/category/
const CATEGORY_SLUGS = [
  'pool-villas-in-mahabaleshwar',
  'family-villas-in-mahabaleshwar',
  'couple-villas-in-mahabaleshwar',
  'group-villas-in-mahabaleshwar',
  'valley-view-villas-in-mahabaleshwar',
  'budget-villas-in-mahabaleshwar',
]

// Root-level commercial SEO landing pages
// These are the canonical URLs — priority 0.90 (just below homepage)
const ROOT_LANDING_PAGES = [
  '/luxury-villas-in-mahabaleshwar',
  '/private-pool-villas-in-mahabaleshwar',
  '/villas-for-family-in-mahabaleshwar',
  '/villas-near-mapro-garden',
  '/3-bhk-villas-in-mahabaleshwar',
  '/4-bhk-villas-in-mahabaleshwar',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url
  const now = new Date()

  // ── Static pages ──────────────────────────────────────────────────────────
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
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // ── Root-level commercial landing pages (NEW — canonical URLs) ────────────
  const rootLandingPages: MetadataRoute.Sitemap = ROOT_LANDING_PAGES.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.92,   // Higher than /villas sub-pages; these are canonical
  }))

  // ── Category pages under /villas/category/ ────────────────────────────────
  const categoryPages: MetadataRoute.Sitemap = CATEGORY_SLUGS.map((slug) => ({
    url: `${baseUrl}/villas/category/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // ── Programmatic landing pages under /villas/ (lower priority — non-canonical)
  const landingPages: MetadataRoute.Sitemap = [...PROGRAMMATIC_LANDING_PAGE_SLUGS].map((slug) => ({
    url: `${baseUrl}/villas/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.70,   // Reduced — these defer to root-route canonicals
  }))

  // ── Individual villa pages ─────────────────────────────────────────────────
  const villaPages: MetadataRoute.Sitemap = villas.map((villa) => ({
    url: `${baseUrl}/villas/${villa.id}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // ── Blog pages ────────────────────────────────────────────────────────────
  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...rootLandingPages,   // Root canonical pages — listed first after statics
    ...categoryPages,
    ...landingPages,
    ...villaPages,
    ...blogPages,
  ]
}
