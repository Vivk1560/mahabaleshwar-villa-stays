import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const ts = require('typescript')

const sourcePath = path.resolve('lib/seo/metadata.ts')
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
const sandbox = {
  module,
  exports: module.exports,
  require,
  __filename: sourcePath,
  __dirname: path.dirname(sourcePath),
  process,
  console,
  URL,
}

vm.runInNewContext(compiled, sandbox, { filename: sourcePath })

const { SITE, absoluteUrl, buildMetadata, dedupeKeywords } = module.exports

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

console.log('SEO metadata helper tests passed.')
