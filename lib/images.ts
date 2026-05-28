type ImageContext =
  | 'hero'
  | 'detailHero'
  | 'card'
  | 'gallery'
  | 'logo'
  | 'banner'
  | 'thumbnail'

export interface SeoImageInput {
  subject: string
  context: string
  location?: string
  feature?: string
}

export function buildImageAltText({
  subject,
  context,
  location,
  feature,
}: SeoImageInput) {
  const parts = [subject, context]

  if (feature) {
    parts.push(feature)
  }

  if (location) {
    parts.push(`in ${location}`)
  }

  return parts.join(' ').replace(/\s+/g, ' ').trim()
}

export function getImageSizes(context: ImageContext) {
  switch (context) {
    case 'hero':
      return '100vw'
    case 'detailHero':
      return '(max-width: 1024px) 100vw, 896px'
    case 'banner':
      return '(max-width: 768px) 100vw, 80vw'
    case 'gallery':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
    case 'card':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
    case 'thumbnail':
      return '(max-width: 640px) 50vw, 25vw'
    case 'logo':
      return '56px'
    default:
      return '100vw'
  }
}

const BAD_FILENAME_PATTERNS = [
  /\s/,
  /[A-Z]/,
  /\(/,
  /\)/,
  /\.[^.]+\./,
  /__+/,
  /--+/,
]

export interface ImageFilenameAudit {
  filename: string
  isSeoFriendly: boolean
  issues: string[]
  suggestion: string
}

function getFilenameStem(filename: string) {
  return filename.trim().split('/').pop() ?? ''
}

function toSeoFriendlyFilename(filename: string) {
  const trimmed = getFilenameStem(filename)
  const extMatch = trimmed.match(/\.(avif|webp|png|jpg|jpeg|gif|svg)$/i)
  const extension = extMatch?.[1]?.toLowerCase() ?? ''
  const stem = extMatch ? trimmed.slice(0, -extMatch[0].length) : trimmed
  const normalizedStem = stem
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  return extension ? `${normalizedStem}.${extension}` : normalizedStem
}

export function isSeoFriendlyImageFilename(filename: string) {
  const normalized = getFilenameStem(filename)
  if (!normalized) return false

  if (BAD_FILENAME_PATTERNS.some((pattern) => pattern.test(normalized))) {
    return false
  }

  return /^[a-z0-9]+(?:-[a-z0-9]+)*\.(?:avif|webp|png|jpg|jpeg|gif|svg)$/.test(
    normalized
  )
}

export function getImageFilenameIssues(filename: string) {
  const issues: string[] = []
  const stem = getFilenameStem(filename)

  if (!stem) issues.push('is empty')
  if (/\s/.test(stem)) issues.push('contains spaces')
  if (/[A-Z]/.test(stem)) issues.push('contains uppercase letters')
  if (/\(/.test(stem) || /\)/.test(stem)) issues.push('contains parentheses')
  if (/\.[^.]+\./.test(stem)) issues.push('contains extra dots in the filename')
  if (/__+/.test(stem) || /--+/.test(stem)) issues.push('contains repeated separators')
  if (!/\.(avif|webp|png|jpg|jpeg|gif|svg)$/i.test(stem)) {
    issues.push('uses an unusual file extension')
  }

  return issues
}

export function auditImageFilename(filename: string): ImageFilenameAudit {
  const issues = getImageFilenameIssues(filename)

  return {
    filename,
    isSeoFriendly: issues.length === 0 && isSeoFriendlyImageFilename(filename),
    issues,
    suggestion: toSeoFriendlyFilename(filename),
  }
}

export function getPreferredImageFormats() {
  return ['avif', 'webp']
}
