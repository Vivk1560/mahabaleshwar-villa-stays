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
  params: Promise<{
    slug: string
  }>
}

// ── Static params ─────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}

// ── Per-blog keywords map ─────────────────────────────────────────────────────
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
    'Mahabaleshwar travel guide 2026, how to reach Mahabaleshwar, Mahabaleshwar trip planning, complete guide Mahabaleshwar',
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params

  const blog = blogs.find((b) => b.slug === slug)

  if (!blog) {
    return {}
  }

  const keywords =
    BLOG_KEYWORDS[slug] ||
    'Mahabaleshwar villas, luxury villas Mahabaleshwar'

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
export default async function BlogDetailPage({
  params,
}: PageProps) {
  const { slug } = await params

  const blog = blogs.find((b) => b.slug === slug)

  if (!blog) {
    notFound()
  }

  const relatedVillas = villas.filter((villa) =>
    blog.relatedVillas.includes(villa.id)
  )

  const imageUrl = blog.banner.startsWith('http')
    ? blog.banner
    : `https://www.mahabaleshwarvillastays.com${blog.banner}`

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
    },

    publisher: {
      '@type': 'Organization',
      name: 'Mahabaleshwar Villa Stays',

      logo: {
        '@type': 'ImageObject',
        url: 'https://www.mahabaleshwarvillastays.com/logo.jpeg',
      },
    },

    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.mahabaleshwarvillastays.com/blogs/${blog.slug}`,
    },
  }

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
        name: 'Blogs',
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

  const contentBlocks = blog.content
    .split('\n\n')
    .filter(Boolean)

  return (
    <main className="min-h-screen bg-background">

      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <NavBar />

      {/* Banner */}
      <section className="pt-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-elevated mb-8">
            <Image
              src={blog.banner}
              alt={blog.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 bg-background">
        <div className="max-w-4xl mx-auto">

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

            <p className="text-xl text-muted-foreground leading-relaxed border-l-4 border-primary pl-4">
              {blog.excerpt}
            </p>
          </div>

          <article className="space-y-5 mb-16">
            {contentBlocks.map((block, i) => {
              const trimmed = block.trim()

              const isHeading =
                trimmed.length < 80 &&
                !trimmed.endsWith('.') &&
                !trimmed.endsWith('?') &&
                !trimmed.endsWith('!') &&
                i > 0

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

              const lines = trimmed.split('\n')

              return (
                <p
                  key={i}
                  className="text-lg text-foreground leading-relaxed"
                >
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

          {/* Related Villas */}
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
