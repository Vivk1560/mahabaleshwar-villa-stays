import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const ts = require('typescript')
const moduleCache = new Map()

function loadTsModule(relativePath) {
  if (moduleCache.has(relativePath)) {
    return moduleCache.get(relativePath)
  }

  const sourcePath = path.resolve(relativePath)
  const source = fs.readFileSync(sourcePath, 'utf8')
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
    fileName: sourcePath,
  }).outputText

  const module = { exports: {} }
  const customRequire = (request) => {
    if (request === '@/lib/seo/metadata') {
      return loadTsModule('lib/seo/metadata.ts')
    }

    return require(request)
  }
  const sandbox = {
    module,
    exports: module.exports,
    require: customRequire,
    __filename: sourcePath,
    __dirname: path.dirname(sourcePath),
    process,
    console,
    URL,
  }

  vm.runInNewContext(compiled, sandbox, { filename: sourcePath })
  moduleCache.set(relativePath, module.exports)
  return module.exports
}

const { SITE, absoluteUrl, buildMetadata, dedupeKeywords } = loadTsModule('lib/seo/metadata.ts')
const {
  buildBreadcrumbSchema,
  buildBlogPostingSchema,
  buildFaqSchema,
  buildImageObjectSchema,
  buildLocalBusinessSchema,
  buildVacationRentalSchema,
} = loadTsModule('lib/seo/schema.ts')

assert.equal(absoluteUrl('/contact'), `${SITE.url}/contact`)
assert.equal(absoluteUrl('https://example.com/x'), 'https://example.com/x')

assert.deepEqual(Array.from(dedupeKeywords(['villa', 'pool'], ['pool', 'family'])), [
  'villa',
  'pool',
  'family',
])

const metadata = buildMetadata({
  title: 'About Mahabaleshwar Villa Stays',
  description: 'Learn about the team.',
  path: '/about',
  image: '/images/hero-bg.jpg',
  imageAlt: 'About Mahabaleshwar Villa Stays',
  keywords: ['Mahabaleshwar', 'villa stays'],
})

assert.equal(metadata.title, 'About Mahabaleshwar Villa Stays')
assert.equal(metadata.alternates?.canonical, `${SITE.url}/about`)
assert.equal(metadata.openGraph?.type, 'website')
assert.equal(metadata.openGraph?.images?.[0]?.url, `${SITE.url}/images/hero-bg.jpg`)
assert.equal(metadata.twitter?.images?.[0], `${SITE.url}/images/hero-bg.jpg`)
assert.equal(metadata.robots?.index, true)
assert.equal(metadata.robots?.follow, true)

const noIndexMetadata = buildMetadata({
  title: 'Private Page',
  description: 'Do not index this page.',
  path: '/private',
  noIndex: true,
})

assert.equal(noIndexMetadata.robots?.index, false)
assert.equal(noIndexMetadata.robots?.follow, false)

const breadcrumb = buildBreadcrumbSchema([
  { name: 'Home', item: '/' },
  { name: 'Villas', item: '/villas' },
])
assert.equal(breadcrumb['@type'], 'BreadcrumbList')
assert.equal(breadcrumb.itemListElement[1].item, `${SITE.url}/villas`)

const faq = buildFaqSchema([{ q: 'Q1', a: 'A1' }])
assert.equal(faq['@type'], 'FAQPage')
assert.equal(faq.mainEntity[0].acceptedAnswer.text, 'A1')

const imageObject = buildImageObjectSchema({
  url: '/images/villa-listing-1.jpg',
  alt: 'Villa cover',
})
assert.equal(imageObject['@type'], 'ImageObject')
assert.equal(imageObject.url, `${SITE.url}/images/villa-listing-1.jpg`)

const blogSchema = buildBlogPostingSchema({
  slug: 'test-post',
  title: 'Test Post',
  excerpt: 'Test excerpt',
  banner: '/images/villa-listing-1.jpg',
  date: '2025-01-01',
  author: 'Mahabaleshwar Villa Stays',
})
assert.equal(blogSchema['@type'], 'BlogPosting')
assert.equal(blogSchema.mainEntityOfPage['@id'], `${SITE.url}/blogs/test-post`)

const localBusiness = buildLocalBusinessSchema()
assert.equal(localBusiness['@type'], 'LocalBusiness')
assert.equal(localBusiness.address.addressCountry, 'IN')

const rental = buildVacationRentalSchema({
  id: 'villa-1',
  name: 'Villa 1',
  description: 'A villa',
  address: 'Near Mapro Garden',
  location: 'Mahabaleshwar',
  listingImage: '/images/villa-listing-1.jpg',
  galleryImages: ['/images/villa-listing-2.jpg'],
  amenities: ['Pool'],
  rating: 4.8,
  reviews: [{ author: 'A', rating: 5, comment: 'Great', date: '2025-01-01' }],
})
assert.equal(rental['@type'], 'VacationRental')
assert.equal(rental.aggregateRating.ratingValue, 4.8)
assert.equal(rental.review[0].reviewBody, 'Great')

console.log('SEO metadata helper tests passed.')
