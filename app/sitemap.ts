// app/sitemap.ts
import { MetadataRoute } from 'next'
import villas from '@/lib/data/villas.json'
import blogs from '@/lib/data/blogs.json'
import { SITE } from '@/lib/seo/metadata'

// All 6 programmatic category slugs
const CATEGORY_SLUGS = [
  'pool-villas-in-mahabaleshwar',
  'family-villas-in-mahabaleshwar',
  'couple-villas-in-mahabaleshwar',
  'group-villas-in-mahabaleshwar',
  'valley-view-villas-in-mahabaleshwar',
  'budget-villas-in-mahabaleshwar',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url
  const now = new Date()

  // Static Pages
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

  // ✅ NEW — Programmatic Category Pages (real URLs, not query params)
  const categoryPages: MetadataRoute.Sitemap = CATEGORY_SLUGS.map((slug) => ({
    url: `${baseUrl}/villas/category/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // Dynamic Villa Pages
  const villaPages: MetadataRoute.Sitemap = villas.map((villa) => ({
    url: `${baseUrl}/villas/${villa.id}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Dynamic Blog Pages
  const blogPages: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...categoryPages,
    ...villaPages,
    ...blogPages,
  ]
}
