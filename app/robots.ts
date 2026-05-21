import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
        ],
      },
    ],
    sitemap: 'https://www.mahabaleshwarvillastays.com/sitemap.xml',
    host: 'https://www.mahabaleshwarvillastays.com',
  }
}
