/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  async redirects() {
    return [
      // C1 fix — 301 redirects from wrong /villas/X paths to correct root paths
      // These are the 5 programmatic pages Google found at wrong URLs
      {
        source: '/villas/luxury-villas-in-mahabaleshwar',
        destination: '/luxury-villas-in-mahabaleshwar',
        permanent: true,
      },
      {
        source: '/villas/private-pool-villas-in-mahabaleshwar',
        destination: '/private-pool-villas-in-mahabaleshwar',
        permanent: true,
      },
      {
        source: '/villas/villas-for-family-in-mahabaleshwar',
        destination: '/villas-for-family-in-mahabaleshwar',
        permanent: true,
      },
      {
        source: '/villas/villas-near-mapro-garden',
        destination: '/villas-near-mapro-garden',
        permanent: true,
      },
      {
        source: '/villas/pet-friendly-villas-in-mahabaleshwar',
        destination: '/pet-friendly-villas-in-mahabaleshwar',
        permanent: true,
      },
    ]
  },

  async headers() {
    return [
      // L2 fix — noindex on legal pages so Googlebot stops wasting crawl budget
      {
        source: '/terms-of-service',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/privacy-policy',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ]
  },
}

export default nextConfig
