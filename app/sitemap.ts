import { MetadataRoute } from 'next'
import villas from '@/lib/data/villas.json'
import blogs from '@/lib/data/blogs.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.mahabaleshwarvillastays.com'

  // Static Pages
  const staticPages = [
    '',
    '/villas',
    '/blogs',
    '/about',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic Villa Pages
  const villaPages = villas.map((villa) => ({
    url: `${baseUrl}/villas/${villa.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Dynamic Blog Pages
  const blogPages = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...villaPages,
    ...blogPages,
  ]
}
