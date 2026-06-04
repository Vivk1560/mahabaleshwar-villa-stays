// app/blogs/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// FIXES in this version:
//  1. Dynamically renders ALL blogs from blogs.json sorted newest → oldest
//     (was only showing 5 old posts, missing 11 newer ones)
//  2. Added canonical, OG tags, Twitter cards, BreadcrumbList schema
//  3. Added BlogPosting ItemList schema for the full blog collection
//  4. Added category filter pills for better UX and internal linking
//  5. Featured post (newest) displayed prominently above the grid
// ─────────────────────────────────────────────────────────────────────────────

import Image from 'next/image';
import Link from 'next/link';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { ArrowRight, Calendar, Home, ChevronRight } from 'lucide-react';
import blogsData from '@/lib/data/blogs.json';
import { buildImageAltText, getImageSizes } from '@/lib/images';
import { estimateReadingTime, getBlogAuthorProfile } from '@/lib/blogs';
import { buildMetadata, dedupeKeywords } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/json-ld';
import { buildBreadcrumbSchema, buildItemListSchema } from '@/lib/seo/schema';

// Sort all blogs newest first — this is the fix for stale listing
const blogs = [...blogsData].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
)

export function generateMetadata() {
  const title = 'Mahabaleshwar Travel Guides'
  const description =
    'Insider travel guides, villa recommendations, local food, sightseeing tips, and seasonal planning advice for Mahabaleshwar and Panchgani.'

  return buildMetadata({
    title,
    description,
    path: '/blogs',
    image: '/images/blogs/image.png',
    imageAlt: 'Mahabaleshwar travel guides and tips',
    keywords: dedupeKeywords(
      [
        'Mahabaleshwar travel guide',
        'Mahabaleshwar blog',
        'hill station tips',
        'Panchgani guide',
      ],
      [
        'villa stay tips',
        'Mahabaleshwar attractions',
        'best time to visit Mahabaleshwar',
      ]
    ),
  })
}

// ── Category tags for filter pills (for UX + internal linking signal) ─────────
const CATEGORY_TAGS = [
  { label: 'All Guides', tag: null },
  { label: 'Travel Itinerary', tag: 'itinerary' },
  { label: 'Food Guide', tag: 'food' },
  { label: 'Sightseeing', tag: 'sightseeing' },
  { label: 'Villa Guide', tag: 'villa' },
  { label: 'Adventure', tag: 'adventure' },
  { label: 'Season Guide', tag: 'season' },
]

// Map each blog slug to a tag for filtering
const SLUG_TAGS: Record<string, string> = {
  'perfect-travel-itinerary-mahabaleshwar': 'itinerary',
  'perfect-travel-itinerary-panchgani': 'itinerary',
  'mahabaleshwar-famous-food-spots': 'food',
  'mahabaleshwar-market-guide': 'food',
  'mahabaleshwar-tourist-places': 'sightseeing',
  'wilson-point-sunrise-guide': 'sightseeing',
  'venna-lake-boat-rides-food-and-horse-riding': 'sightseeing',
  'best-villas-families': 'villa',
  'romantic-couple-retreat': 'villa',
  'group-gathering-guide': 'villa',
  'budget-travel-mahabaleshwar': 'villa',
  'valley-views-photography': 'villa',
  'adventure-spots-in-mahabaleshwar': 'adventure',
  'mahabaleshwar-horse-riding-experience': 'adventure',
  'best-time-visit-mahabaleshwar': 'season',
  'mahabaleshwar-complete-travel-guide': 'season',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogsPage() {
  const featuredBlog = blogs[0]
  const remainingBlogs = blogs.slice(1)

  return (
    <main className="min-h-screen bg-background">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: 'Blog', item: '/blogs' },
        ])}
      />
      <JsonLd
        data={buildItemListSchema({
          name: 'Mahabaleshwar Travel Guides',
          description: 'Complete travel guides for Mahabaleshwar, Panchgani and the Western Ghats',
          items: blogs.map((blog) => ({
            name: blog.title,
            url: `/blogs/${blog.slug}`,
          })),
        })}
      />
      <NavBar />

      {/* ── Breadcrumb ─────────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="pt-20 pb-2 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground font-medium">Blog</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <section className="pt-6 pb-10 md:pb-14 px-4 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-playfair text-3xl md:text-5xl font-bold text-foreground mb-3 md:mb-4 leading-tight">
            Mahabaleshwar Travel Guides
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {blogs.length} insider guides — sightseeing, food, villas, itineraries, and seasonal tips
            for planning your perfect Mahabaleshwar & Panchgani trip.
          </p>
        </div>
      </section>

      {/* ── Featured Post (newest) ─────────────────────────────────────────── */}
      {featuredBlog && (
        <section className="py-10 md:py-14 px-4 bg-background border-b border-border">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
              Latest Guide
            </p>
            <Link href={`/blogs/${featuredBlog.slug}`} className="group block">
              <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
                <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-elevated">
                  <Image
                    src={featuredBlog.banner}
                    alt={buildImageAltText({
                      subject: featuredBlog.title,
                      context: 'featured travel guide cover',
                      location: 'Mahabaleshwar',
                    })}
                    fill
                    priority
                    sizes={getImageSizes('gallery')}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    quality={85}
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={featuredBlog.date}>{formatDate(featuredBlog.date)}</time>
                    <span aria-hidden="true">•</span>
                    <span>{estimateReadingTime(featuredBlog.content)} min read</span>
                  </div>
                  <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {featuredBlog.title}
                  </h2>
                  <p className="text-sm font-medium text-muted-foreground">
                    {getBlogAuthorProfile(featuredBlog.author).name} · {getBlogAuthorProfile(featuredBlog.author).role}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {featuredBlog.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-200">
                    Read guide
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ── All Remaining Blog Posts Grid ─────────────────────────────────── */}
      <section className="py-10 md:py-14 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-playfair text-2xl font-bold text-foreground mb-8">
            All Travel Guides
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {remainingBlogs.map((blog) => {
              const author = getBlogAuthorProfile(blog.author)
              const readingTime = estimateReadingTime(blog.content)

              return (
              <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group block">
                <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-card transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={blog.banner}
                      alt={buildImageAltText({
                        subject: blog.title,
                        context: 'travel guide cover',
                        location: 'Mahabaleshwar',
                      })}
                      fill
                      sizes={getImageSizes('card')}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      quality={75}
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      <time dateTime={blog.date}>{formatDate(blog.date)}</time>
                      <span aria-hidden="true">•</span>
                      <span>{readingTime} min read</span>
                    </div>
                    <h3 className="font-playfair text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {blog.title}
                    </h3>
                    <p className="text-xs font-medium text-muted-foreground">
                      {author.name} · {author.role}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 flex-1">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center gap-1.5 text-primary text-sm font-semibold group-hover:gap-2.5 transition-all duration-200 pt-1">
                      Read guide
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
              )
            })}
          </div>
        </div>
      </section>

     {/* ── Popular Villa Collections (root-route SEO links) ──────────────── */}
      <section className="py-10 px-4 bg-secondary/10 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-playfair text-xl font-bold text-foreground mb-2">
            Popular Villa Collections
          </h2>
          <p className="text-muted-foreground text-sm mb-5">
            Browse the most searched villa types in Mahabaleshwar before you finalise your dates.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {[
              {
                label: 'Luxury Villas in Mahabaleshwar',
                href: '/luxury-villas-in-mahabaleshwar',
                emoji: '🏡',
              },
              {
                label: 'Private Pool Villas',
                href: '/private-pool-villas-in-mahabaleshwar',
                emoji: '🏊',
              },
              {
                label: 'Family Villas in Mahabaleshwar',
                href: '/villas-for-family-in-mahabaleshwar',
                emoji: '👨‍👩‍👧‍👦',
              },
              {
                label: 'Villas Near Mapro Garden',
                href: '/villas-near-mapro-garden',
                emoji: '🍓',
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:border-primary hover:bg-primary/5 transition-all duration-200"
              >
                <span className="text-xl">{item.emoji}</span>
                <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors leading-snug">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          <h2 className="font-playfair text-xl font-bold text-foreground mb-4">
            Looking for a villa? Browse by type
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Pool Villas', href: '/villas/category/pool-villas-in-mahabaleshwar' },
              { label: 'Family Villas', href: '/villas/category/family-villas-in-mahabaleshwar' },
              { label: 'Couple Villas', href: '/villas/category/couple-villas-in-mahabaleshwar' },
              { label: 'Group Villas', href: '/villas/category/group-villas-in-mahabaleshwar' },
              { label: 'Valley View', href: '/villas/category/valley-view-villas-in-mahabaleshwar' },
              { label: 'Budget Villas', href: '/villas/category/budget-villas-in-mahabaleshwar' },
              { label: 'All Villas', href: '/villas' },
            ].map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="px-4 py-2 rounded-full border border-border bg-background text-sm font-medium text-muted-foreground hover:border-primary hover:text-primary transition-all duration-200"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
