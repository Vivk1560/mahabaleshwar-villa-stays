import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const ts = require('typescript')

function loadTsModule(relativePath) {
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
  return module.exports
}

const { auditImageFilename, isSeoFriendlyImageFilename } = loadTsModule('lib/images.ts')

function walkFiles(rootDir) {
  const entries = fs.readdirSync(rootDir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(rootDir, entry.name)
    if (entry.isDirectory()) {
      files.push(...walkFiles(fullPath))
    } else {
      files.push(fullPath)
    }
  }

  return files
}

function collectImageRefs(value, refs = new Set()) {
  if (typeof value === 'string') {
    if (/\.(avif|webp|png|jpg|jpeg|gif|svg)$/i.test(value)) {
      refs.add(value)
    }
    return refs
  }

  if (Array.isArray(value)) {
    for (const item of value) collectImageRefs(item, refs)
    return refs
  }

  if (value && typeof value === 'object') {
    for (const nested of Object.values(value)) {
      collectImageRefs(nested, refs)
    }
  }

  return refs
}

const publicImageFiles = walkFiles('public').filter((file) =>
  /\.(avif|webp|png|jpg|jpeg|gif|svg)$/i.test(file)
)

const referencedImageRefs = new Set()
for (const dataFile of ['lib/data/villas.json', 'lib/data/blogs.json', 'lib/data/aboutData.json']) {
  const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'))
  collectImageRefs(data, referencedImageRefs)
}

const findings = []

for (const file of publicImageFiles) {
  const relative = `/${path.relative('public', file).split(path.sep).join('/')}`
  const audit = auditImageFilename(relative)
  if (!audit.isSeoFriendly) {
    findings.push({ scope: 'public file', path: relative, ...audit })
  }
}

for (const ref of referencedImageRefs) {
  const audit = auditImageFilename(ref)
  if (!audit.isSeoFriendly || !isSeoFriendlyImageFilename(ref)) {
    findings.push({ scope: 'referenced asset', path: ref, ...audit })
  }
}

const uniqueFindings = Array.from(
  new Map(findings.map((item) => [`${item.scope}:${item.path}`, item])).values()
)

if (uniqueFindings.length === 0) {
  console.log('No image filename issues found.')
} else {
  console.log('Image filename audit')
  for (const item of uniqueFindings) {
    console.log(`- [${item.scope}] ${item.path}`)
    console.log(`  issues: ${item.issues.join(', ')}`)
    console.log(`  suggestion: ${item.suggestion}`)
  }
}
