import Image from 'next/image'
import Link from 'next/link'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { FloatingButtons } from '@/components/FloatingButtons'
import { VillaCard } from '@/components/VillaCard'
import { Calendar, ArrowLeft } from 'lucide-react'
import blogs from '@/lib/data/blogs.json'
import villas from '@/lib/data/villas.json'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string
  }
}

// ── Static params ─────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}

// ── Per-blog keywords map ─────────────────────────────────────────────────────
// Add keywords specific to each blog for better on-page SEO targeting.
const BLOG_KEYWORDS: Record<string, string> = {
  'best-villas-families':
    'best family villas Mahabaleshwar, family vacation Mahabaleshwar, villas for families hill station, Mahabaleshwar family trip, large villa Mahabaleshwar',
  'romantic-couple-retreat':
    'romantic villas Mahabaleshwar, couple villa Mahabaleshwar, honeymoon villa Mahabaleshwar, romantic getaway hill station Maharashtra',
  'group-gathering-guide':
    'group villas Mahabaleshwar, large group stay Mahabaleshwar, corporate retreat Mahabaleshwar, team outing villa Maharashtra',
  'budget-travel-mahabaleshwar':
    'budget villas Mahabaleshwar, affordable villas Mahabaleshwar, cheap villa Mahabaleshwar, budget stay hill station Maharashtra',
  'valley-views-photography':
    'Mahabaleshwar photography guide, valley views Mahabaleshwar, best viewpoints Mahabaleshwar, villa photography hill station',
  'best-time-visit-mahabaleshwar':
    'best time to visit Mahabaleshwar, Mahabaleshwar weather, Mahabaleshwar season guide, when to visit Mahabaleshwar',
  'mahabaleshwar-tourist-places':
    'tourist places Mahabaleshwar, Mahabaleshwar sightseeing, things to do Mahabaleshwar, Wilson Point Mapro Garden Venna Lake',
  'mahabaleshwar-complete-travel-guide':
    'Mahabaleshwar travel guide 2025, how to reach Mahabaleshwar, Mahabaleshwar trip planning, complete guide Mahabaleshwar',
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const blog = blogs.find((b) => b.slug === slug)
  if (!blog) return {}

  const keywords =
    BLOG_KEYWORDS[slug] ||
    'Mahabaleshwar villas, luxury villas Mahabaleshwar, hill station Maharashtra'

  // Build absolute image URL
  const imageUrl = blog.banner.startsWith('http')
    ? blog.banner
    : `https://www.mahabaleshwarvillastays.com${blog.banner}`

  return {
    title: `${blog.title} | Mahabaleshwar Villa Stays`,
    description: blog.excerpt,
    keywords,
    authors: [{ name: 'Mahabaleshwar Villa Stays' }],
    alternates: {
      canonical: `https://www.mahabaleshwarvillastays.com/blogs/${slug}`,
    },
    openGraph: {
      type: 'article',
      url: `https://www.mahabaleshwarvillastays.com/blogs/${slug}`,
      siteName: 'Mahabaleshwar Villa Stays',
      title: `${blog.title} | Mahabaleshwar Villa Stays`,
      description: blog.excerpt,
      publishedTime: blog.date,
      modifiedTime: blog.date,
      authors: ['Mahabaleshwar Villa Stays'],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${blog.title} | Mahabaleshwar Villa Stays`,
      description: blog.excerpt,
      images: [imageUrl],
    },
  }
}

// ── Page Component ────────────────────────────────────────────────────────────
export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params
  const blog = blogs.find((b) => b.slug === slug)
  if (!blog) {
    notFound()
  }

  const relatedVillas = villas.filter((villa) =>
    blog.relatedVillas.includes(villa.id)
  )

  // Absolute image URL for schema
  const imageUrl = blog.banner.startsWith('http')
    ? blog.banner
    : `https://www.mahabaleshwarvillastays.com${blog.banner}`

  // ── Article Schema ──────────────────────────────────────────────────────────
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    image: imageUrl,
    datePublished: blog.date,
    dateModified: blog.date,
    url: `https://www.mahabaleshwarvillastays.com/blogs/${blog.slug}`,
    author: {
      '@type': 'Organization',
      name: 'Mahabaleshwar Villa Stays',
      url: 'https://www.mahabaleshwarvillastays.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mahabaleshwar Villa Stays',
      url: 'https://www.mahabaleshwarvillastays.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.mahabaleshwarvillastays.com/logo.jpeg',
        width: 200,
        height: 200,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.mahabaleshwarvillastays.com/blogs/${blog.slug}`,
    },
    keywords: BLOG_KEYWORDS[slug] || 'Mahabaleshwar villas',
    articleSection: 'Travel Guide',
    inLanguage: 'en-IN',
  }

  // ── BreadcrumbList Schema ───────────────────────────────────────────────────
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.mahabaleshwarvillastays.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://www.mahabaleshwarvillastays.com/blogs',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: blog.title,
        item: `https://www.mahabaleshwarvillastays.com/blogs/${blog.slug}`,
      },
    ],
  }

  // Format the blog content: split on double newlines to create paragraphs
  // and detect section headings (lines that don't end with punctuation)
  const contentBlocks = blog.content.split('\n\n').filter(Boolean)

  return (
    <main className="min-h-screen bg-background">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <NavBar />

      {/* ── Banner ───────────────────────────────────────────────────────── */}
      <section className="pt-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-elevated mb-8">
            <Image
              src={blog.banner}
              alt={`${blog.title} — Mahabaleshwar Villa Stays`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── Blog Content ─────────────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-background">
        <div className="max-w-4xl mx-auto">

          {/* Back link + Title + Date */}
          <div className="mb-10 space-y-4">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blogs
            </Link>

            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground leading-tight">
              {blog.title}
            </h1>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <time dateTime={blog.date}>
                {new Date(blog.date).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>

            {/* Excerpt as lead paragraph */}
            <p className="text-xl text-muted-foreground leading-relaxed border-l-4 border-primary pl-4">
              {blog.excerpt}
            </p>
          </div>

          {/* 
            Blog body — render each double-newline block as its own element.
            Lines that look like section headings (short, no trailing punctuation,
            or followed by a colon) become <h2>. Everything else is <p>.
            Single newlines within a block become <br />.
          */}
          <article className="space-y-5 mb-16">
            {contentBlocks.map((block, i) => {
              const trimmed = block.trim()

              // Detect heading: short line (under 80 chars) with no sentence-ending punctuation,
              // OR ends with a colon, OR starts with a number like "1." or "Day 1"
              const isHeading =
                trimmed.length < 80 &&
                !trimmed.endsWith('.') &&
                !trimmed.endsWith('?') &&
                !trimmed.endsWith('!') &&
                !trimmed.startsWith('Q:') &&
                !trimmed.startsWith('"') &&
                i > 0 // first block is always body text

              if (isHeading) {
                return (
                  <h2
                    key={i}
                    className="font-playfair text-2xl md:text-3xl font-bold text-foreground mt-10 mb-2"
                  >
                    {trimmed}
                  </h2>
                )
              }

              // Regular paragraph — preserve single newlines within block as line breaks
              const lines = trimmed.split('\n')
              return (
                <p key={i} className="text-lg text-foreground leading-relaxed">
                  {lines.map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < lines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              )
            })}
          </article>

          {/* ── Related Villas ──────────────────────────────────────────── */}
          {relatedVillas.length > 0 && (
            <div className="mt-12 pt-12 border-t border-border">
              <h2 className="font-playfair text-3xl font-bold text-foreground mb-8">
                Featured Villas from This Article
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedVillas.map((villa) => (
                  <VillaCard
                    key={villa.id}
                    id={villa.id}
                    name={villa.name}
                    location={villa.location}
                    rating={villa.rating}
                    capacity={villa.capacity}
                    amenities={villa.amenities}
                    image={villa.images.listing}
                    category={villa.category}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── Back to all blogs CTA ───────────────────────────────────── */}
          <div className="mt-16 text-center">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-all font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              View All Blogs
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  )
}
