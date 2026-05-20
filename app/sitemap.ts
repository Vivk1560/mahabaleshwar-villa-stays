import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.mahabaleshwarvillastays.com',
      lastModified: new Date(),
    },
    {
      url: 'https://www.mahabaleshwarvillastays.com/villas',
      lastModified: new Date(),
    },
    {
      url: 'https://www.mahabaleshwarvillastays.com/blogs',
      lastModified: new Date(),
    },
    {
      url: 'https://www.mahabaleshwarvillastays.com/about',
      lastModified: new Date(),
    },
    {
      url: 'https://www.mahabaleshwarvillastays.com/contact',
      lastModified: new Date(),
    },
  ]
}
