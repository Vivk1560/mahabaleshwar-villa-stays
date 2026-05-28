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
import { absoluteUrl, buildMetadata, dedupeKeywords } from '@/lib/seo/metadata'
import { getBlogCategoryLinks, getBlogRelatedLinks } from '@/lib/internal-links'
import { buildImageAltText, getImageSizes } from '@/lib/images'
import { buildBlogOutline, estimateReadingTime, getBlogAuthorProfile } from '@/lib/blogs'
import { JsonLd } from '@/components/seo/json-ld'
import { RelatedLinks } from '@/components/seo/RelatedLinks'
import { buildBlogPostingSchema, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo/schema'

// ── Types ─────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

interface FaqItem {
  q: string
  a: string
}

// ── Per-slug FAQ content ───────────────────────────────────────────────────────

const BLOG_FAQ_MAP: Record<string, FaqItem[]> = {
  'best-villas-families': [
    {
      q: 'Which are the best family villas in Mahabaleshwar?',
      a: 'Valley View Manor (8 BHK, 25 guests), Nature Haven Villa (7 BHK, 25 guests), and Peaceful Nook Villa (7 BHK, 20 guests) are consistently the top choices for large family stays. All three include a professional cook, private pool, and caretaker.',
    },
    {
      q: 'What should I look for in a family villa in Mahabaleshwar?',
      a: 'Key features include multiple bedrooms with attached bathrooms, a private pool with shallow sections for children, a fully equipped kitchen or professional cook service, an enclosed garden or lawn for safe outdoor play, and a location within 10–15 minutes of Mapro Garden.',
    },
    {
      q: 'Is a family villa in Mahabaleshwar cheaper than a hotel for large groups?',
      a: 'Yes — for groups of 15 or more, splitting a private villa per person typically costs significantly less than booking equivalent hotel rooms, while providing more space, privacy, a pool, and cook service that hotels do not offer at that price point.',
    },
    {
      q: 'What is the best time for a family vacation to Mahabaleshwar?',
      a: 'October through February is ideal for families. The weather is cool and pleasant, strawberries are in season from December through March, and all viewpoints are accessible. May is also popular during school summer holidays.',
    },
    {
      q: 'Are there activities near family villas in Mahabaleshwar for children?',
      a: 'Yes — Mapro Garden strawberry picking, Venna Lake boating and horse riding, Velocity Park amusement rides, and Wilson Point sunrise are all child-friendly and within 5–20 minutes of most villas.',
    },
  ],

  'romantic-couple-retreat': [
    {
      q: 'Which villas in Mahabaleshwar are best for couples?',
      a: 'Modern Essence Villa (near Parsi Point, valley-view pool), Artisan Villa (creative lounge, private balconies), and Riverside Hideaway (private bonfire garden) are the most popular couple-friendly properties in the Mahabaleshwar Villa Stays collection.',
    },
    {
      q: 'Is Mahabaleshwar good for a honeymoon?',
      a: 'Mahabaleshwar is one of Maharashtra\'s most popular honeymoon destinations. The cool climate, misty valleys, private pool villas, strawberry farms, and sunset viewpoints like Parsi Point create a naturally romantic setting throughout the year.',
    },
    {
      q: 'What romantic experiences can couples enjoy near Mahabaleshwar villas?',
      a: 'Private candlelit dinners arranged by the villa cook, bonfire evenings in the garden, Wilson Point sunrise visits, strawberry picking at Mapro Garden, and sunset drives to Parsi Point or Bombay Point are the most popular romantic experiences.',
    },
    {
      q: 'What is the best season for a romantic Mahabaleshwar trip?',
      a: 'October through February is the most romantic season — cool evenings, clear valley views, and the strawberry season from December through March. December and January are especially popular for honeymooners.',
    },
    {
      q: 'Can we book a couple villa in Mahabaleshwar for just 2 people?',
      a: 'Yes — while villas have higher technical capacities, smaller groups including just 2 people can book. Contact us via WhatsApp for pricing on smaller occupancy bookings.',
    },
  ],

  'group-gathering-guide': [
    {
      q: 'What is the largest group villa available in Mahabaleshwar?',
      a: 'Valley View Manor accommodates up to 25 guests across 8 bedrooms with a private pool, BBQ area, professional cook, and panoramic valley views near Mapro Garden. It is the largest single villa in the Mahabaleshwar Villa Stays portfolio.',
    },
    {
      q: 'How do I plan a corporate retreat at a Mahabaleshwar villa?',
      a: 'Book a 7–8 BHK villa at least 3–4 weeks in advance, communicate meal preferences to the cook in advance, plan structured activities in the mornings and open exploration in the afternoons, and use the bonfire area for informal team bonding in the evenings.',
    },
    {
      q: 'Are Mahabaleshwar group villas suitable for birthday party celebrations?',
      a: 'Yes — private group villas with BBQ areas, bonfire zones, private pools, and professional cooks are ideal for birthday celebrations. Inform the team when booking and the caretaker can coordinate cake delivery, basic decoration, and bonfire setup.',
    },
    {
      q: 'How far in advance should I book a group villa in Mahabaleshwar?',
      a: 'For peak season (October–February) and long weekends, book at least 3–6 weeks in advance. For weekday stays in off-peak months, 1–2 weeks is usually sufficient. Large group villas fill quickly on festive weekends.',
    },
    {
      q: 'What group transport is recommended for Mahabaleshwar from Pune?',
      a: 'A 26-seater or 32-seater Tempo Traveller is the most economical option for groups of 15–25 from Pune or Mumbai. Per-head transport cost is significantly lower than individual cabs and the group travels together.',
    },
  ],

  'budget-travel-mahabaleshwar': [
    {
      q: 'What is the cheapest way to stay in Mahabaleshwar with a private pool?',
      a: 'Book a budget villa like Mist Haven Villa (4 BHK, 15 guests), Zen Retreat Villa (3 BHK, 12 guests), or Grand Vista Palace (4 BHK, 15 guests) and split the cost across the group. Per-person cost typically undercuts mid-range hotel rooms while including a private pool.',
    },
    {
      q: 'Are budget villas in Mahabaleshwar clean and well-maintained?',
      a: 'Every villa in the Mahabaleshwar Villa Stays collection — including budget-category properties — is personally vetted for cleanliness, pool maintenance, working amenities, and caretaker responsiveness. Budget refers to price-to-value ratio, not standards.',
    },
    {
      q: 'How can I reduce costs on a Mahabaleshwar villa trip?',
      a: 'Travel in a group of 12–15 to maximise the per-person value split, use the professional cook for meals instead of dining out, book on weekdays rather than weekends when rates are lower, and book directly via WhatsApp to avoid third-party platform fees.',
    },
    {
      q: 'What free or low-cost things can I do in Mahabaleshwar?',
      a: 'Wilson Point sunrise (small entry fee), Arthur\'s Seat and Elephant\'s Head Point viewpoints (minimal entry), forest walks, the Panchganga Temple in Old Mahabaleshwar, and walking the Venna Lake perimeter path are all low-cost or free experiences.',
    },
    {
      q: 'Are budget villas near Mapro Garden in Mahabaleshwar?',
      a: 'Yes — Mist Haven Villa and Grand Vista Palace are within 5–7 minutes of Mapro Garden. Zen Retreat Villa is within 7 minutes. All three are budget-category properties that include private pools and full caretaker service.',
    },
  ],

  'valley-views-photography': [
    {
      q: 'Which Mahabaleshwar villas are best for photography?',
      a: 'Mountain Echo Residence (valley-facing pool with reflection shots), Cloud Castle Villa (cloud-level terrace), and Royal Abode Estate (grand staircase and valley-facing pool) are the most photographed properties in the portfolio.',
    },
    {
      q: 'What is the best time for photography in Mahabaleshwar?',
      a: 'Golden hour — the hour after sunrise and the hour before sunset — produces the most dramatic light on the Sahyadri valleys. On winter mornings (October–February), valley fog creates exceptional photography conditions from 6 to 8 AM.',
    },
    {
      q: 'Which are the most photogenic viewpoints in Mahabaleshwar?',
      a: 'Wilson Point (sunrise panorama), Arthur\'s Seat (sheer cliff drop), Elephant\'s Head Point (unique rock formation), and Kate\'s Point (broad valley panorama) are the four most photographed viewpoints. Each is best in early morning light.',
    },
    {
      q: 'How do I photograph the valley fog at Mahabaleshwar villas?',
      a: 'Expose for the mid-tone sky rather than the bright horizon. On phones, tap the area just above the fog layer to lock exposure. On DSLR, bracket exposures and blend — the fog is significantly brighter than the dark valley below it.',
    },
    {
      q: 'Is Mahabaleshwar good for monsoon photography?',
      a: 'Monsoon (June–September) offers dramatic photography — waterfalls at full volume, fog at terrace level, and the Sahyadri ranges in deep saturated green. The dynamic cloud formations during this season are unlike any other time of year.',
    },
  ],

  'perfect-travel-itinerary-mahabaleshwar': [
    {
      q: 'How many days are enough for a Mahabaleshwar trip?',
      a: 'A minimum of 2 days is needed to cover the key viewpoints and attractions. 3 days allows a more relaxed experience with time for Pratapgad Fort, Panchgani Table Land, and proper enjoyment of your villa\'s pool and bonfire. Anything more reveals the quieter, less-visited side of the hill station.',
    },
    {
      q: 'What time should I reach Wilson Point for sunrise?',
      a: 'Arrive at least 30 minutes before sunrise — in most seasons this means being at the point by 6:00 AM. In December and January, sunrise is around 6:45–7:00 AM; arrive by 6:15 AM. The pre-sunrise sky transition is worth being there for.',
    },
    {
      q: 'Is Nana\'s Chana in Old Mahabaleshwar easy to find?',
      a: 'The stall is near the Old Mahabaleshwar bus stand area and is best found by asking locals. It opens early in the morning and sells out before 11 AM. Arrive before 9 AM for the best experience and full availability.',
    },
    {
      q: 'What is the best route from Pune to Mahabaleshwar?',
      a: 'The most common route is NH 48 from Pune to Satara, then toward Wai and up the Panchgani ghat. The final stretch through Panchgani with hairpin valley views is one of the most scenic drives in Maharashtra. Total distance is approximately 120 km.',
    },
    {
      q: 'Can I visit Panchgani and Mahabaleshwar in the same trip?',
      a: 'Yes — they are 19 km apart and most 3-day itineraries include both. Table Land in Panchgani and Bhilar Book Village are the standard Panchgani inclusions. Staying in a villa on the Panchgani–Mahabaleshwar Road gives easy access to both.',
    },
  ],
}

// ── Static params ──────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}

// ── Keyword map ───────────────────────────────────────────────────────────────

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
  'perfect-travel-itinerary-mahabaleshwar':
    'Mahabaleshwar itinerary, Mahabaleshwar travel plan, Wilson Point sunrise guide, Pratapgad Fort Mahabaleshwar trip',
  'perfect-travel-itinerary-panchgani':
    'Panchgani itinerary, things to do Panchgani, Table Land Panchgani guide, Bhilar book village Panchgani travel',
  'mahabaleshwar-market-guide':
    'Mahabaleshwar market guide, what to buy Mahabaleshwar, Mahabaleshwar bazaar, strawberry market Mahabaleshwar chikki',
  'mahabaleshwar-famous-food-spots':
    'Mahabaleshwar food guide, what to eat Mahabaleshwar, Mapro Garden food, Makka Patties Mahabaleshwar street food',
  'adventure-spots-in-mahabaleshwar':
    'adventure activities Mahabaleshwar, paragliding Mahabaleshwar, go karting Mahabaleshwar, horse riding Mahabaleshwar',
  'wilson-point-sunrise-guide':
    'Wilson Point sunrise Mahabaleshwar, Wilson Point timing, jamun shots Wilson Point, sunrise point Mahabaleshwar guide',
  'mahabaleshwar-horse-riding-experience':
    'horse riding Mahabaleshwar, Venna Lake horse riding price, horse riding Kate\'s Point, Mahabaleshwar horse riding guide',
  'venna-lake-boat-rides-food-and-horse-riding':
    'Venna Lake boating price, Venna Lake Mahabaleshwar, boat rides Venna Lake, Venna Lake food horse riding guide',
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: PageProps) {
  const { slug } = await params
  const blog = blogs.find((b) => b.slug === slug)

  if (!blog) {
    return {}
  }

  const keywords =
    BLOG_KEYWORDS[slug] || 'Mahabaleshwar villas, luxury villas Mahabaleshwar'

  const imageUrl = absoluteUrl(blog.banner)

  return buildMetadata({
    title: blog.title,
    description: blog.excerpt,
    path: `/blogs/${slug}`,
    type: 'article',
    image: imageUrl,
    imageAlt: blog.title,
    authors: [{ name: 'Mahabaleshwar Villa Stays' }],
    publishedTime: blog.date,
    modifiedTime: blog.date,
    keywords: dedupeKeywords(
      keywords.split(',').map((keyword) => keyword.trim()),
      ['Mahabaleshwar travel guide', 'Mahabaleshwar villa stay', 'Panchgani travel']
    ),
  })
}

// ── Heading helpers ───────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function renderContentBlocks(
  content: string,
  tocEntries: { level: 2 | 3; text: string; id: string }[]
) {
  // Split into lines first, then group into paragraph blocks
  // This ensures TOC_START / TOC_END are always detected even when
  // they appear inside the same \n\n-delimited chunk
  const lines = content.split('\n')
  // Re-group lines into paragraph blocks, but treat every sentinel line
  // as its own single-line block so matching is reliable
  const blocks: string[] = []
  let current: string[] = []
  for (const line of lines) {
    const t = line.trim()
    if (t === 'TOC_START' || t === 'TOC_END') {
      if (current.length) { blocks.push(current.join('\n')); current = [] }
      blocks.push(t)
    } else if (t === '') {
      if (current.length) { blocks.push(current.join('\n')); current = [] }
    } else {
      current.push(line)
    }
  }
  if (current.length) blocks.push(current.join('\n'))

  // Second pass: render
  const rendered: React.ReactNode[] = []
  let tocRendered = false
  let inToc = false

  for (let i = 0; i < blocks.length; i++) {
    const trimmed = blocks[i].trim()
    if (!trimmed) continue

    if (trimmed === 'TOC_START') {
      inToc = true
      if (!tocRendered && tocEntries.length > 0) {
        tocRendered = true
        rendered.push(
          <nav key="toc" className="my-8 p-6 bg-card border border-border rounded-2xl" aria-label="Table of contents">
            <h2 className="font-playfair text-xl font-bold text-foreground mb-4">Table of Contents</h2>
            <ol className="space-y-2">
              {tocEntries.map((entry, idx) => (
                <li
                  key={idx}
                  className={entry.level === 3 ? 'pl-4 ml-2 border-l border-border' : ''}
                >
                  <a href={`#${entry.id}`} className="text-primary hover:underline text-sm font-medium leading-snug">
                    {entry.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )
      }
      continue
    }

    if (trimmed === 'TOC_END') { inToc = false; continue }
    if (inToc) continue

    if (trimmed.startsWith('## ')) {
      const text = trimmed.slice(3).trim()
      rendered.push(
        <h2 key={i} id={slugify(text)} className="font-playfair text-2xl md:text-3xl font-bold text-foreground mt-12 mb-4 scroll-mt-24">
          {text}
        </h2>
      )
      continue
    }

    if (trimmed.startsWith('### ')) {
      const text = trimmed.slice(4).trim()
      rendered.push(
        <h3 key={i} id={slugify(text)} className="font-playfair text-xl md:text-2xl font-bold text-foreground mt-8 mb-3 scroll-mt-24">
          {text}
        </h3>
      )
      continue
    }

    if (trimmed.startsWith('CTA: ')) {
      rendered.push(
        <div key={i} className="my-8 p-6 bg-primary/5 border border-primary/20 rounded-2xl text-center">
          <p className="text-foreground font-medium">{trimmed.slice(5).trim()}</p>
        </div>
      )
      continue
    }

    const linesPara = trimmed.split('\n')
    rendered.push(
      <p key={i} className="text-lg text-foreground leading-relaxed">
        {linesPara.map((line, j) => (
          <span key={j}>{line}{j < linesPara.length - 1 && <br />}</span>
        ))}
      </p>
    )
  }

  return rendered
}
// ── Page Component ────────────────────────────────────────────────────────────

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params
  const blog = blogs.find((b) => b.slug === slug)

  if (!blog) notFound()

  const relatedVillas = villas.filter((villa) =>
    blog.relatedVillas.includes(villa.id)
  )

  const imageUrl = absoluteUrl(blog.banner)
  const readingTime = estimateReadingTime(blog.content)
  const author = getBlogAuthorProfile(blog.author)
  const tocEntries = buildBlogOutline(blog.content)

  const pageFaqs: FaqItem[] = BLOG_FAQ_MAP[slug] ?? []

  return (
    <main className="min-h-screen bg-background">
      <JsonLd
        data={buildBlogPostingSchema({
          slug: blog.slug,
          title: blog.title,
          excerpt: blog.excerpt,
          banner: imageUrl,
          date: blog.date,
          author: blog.author,
        })}
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: 'Blogs', item: '/blogs' },
          { name: blog.title, item: `/blogs/${blog.slug}` },
        ])}
      />
      {pageFaqs.length > 0 && <JsonLd data={buildFaqSchema(pageFaqs)} />}

      <NavBar />

      <section className="pt-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <article className="grid lg:grid-cols-[1.6fr_0.7fr] gap-10">
            <div className="space-y-10">
              <header className="space-y-5">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blogs
                </Link>

                <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-elevated">
                  <Image
                    src={blog.banner}
                    alt={buildImageAltText({
                      subject: blog.title,
                      context: 'blog hero image',
                      location: 'Mahabaleshwar',
                    })}
                    fill
                    priority
                    sizes={getImageSizes('detailHero')}
                    className="object-cover"
                    quality={85}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={blog.date}>
                        {new Date(blog.date).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </span>
                    <span aria-hidden="true">•</span>
                    <span>{readingTime} min read</span>
                  </div>

                  <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground leading-tight text-balance">
                    {blog.title}
                  </h1>

                  <p className="text-xl text-muted-foreground leading-relaxed border-l-4 border-primary pl-4">
                    {blog.excerpt}
                  </p>
                </div>
              </header>

              <section className="grid gap-5 rounded-2xl border border-border bg-card p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 font-playfair text-lg font-bold text-primary">
                    {author.name
                      .split(' ')
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join('')}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      About the author
                    </p>
                    <h2 className="font-playfair text-2xl font-bold text-foreground">
                      {author.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {author.role}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {author.bio}
                </p>
              </section>

              <section className="rounded-2xl border border-border bg-card p-6 md:p-8">
                <h2 className="font-playfair text-2xl font-bold text-foreground mb-3">
                  Quick take
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  This guide is written for travelers planning a Mahabaleshwar trip around villas,
                  food, viewpoints, and seasonal timing. Use the table of contents to jump between
                  the sections that matter most.
                </p>
              </section>

              <section aria-label="Blog content" className="space-y-5">
                {renderContentBlocks(blog.content, tocEntries)}
              </section>

              <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8">
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground">
                  Need a villa base for this trip?
                </h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  The best travel blogs work when they point to a real booking decision. If this
                  article helped you plan the route, match it with the right villa category before
                  you finalize dates.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {getBlogCategoryLinks(slug).map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-8 lg:sticky lg:top-24 self-start">
              {tocEntries.length > 0 && (
                <nav
                  aria-label="Table of contents"
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                >
                  <h2 className="font-playfair text-xl font-bold text-foreground mb-4">
                    Table of Contents
                  </h2>
                  <ol className="space-y-2">
                    {tocEntries.map((entry) => (
                      <li
                        key={entry.id}
                        className={entry.level === 3 ? 'ml-3 border-l border-border pl-3' : ''}
                      >
                        <a
                          href={`#${entry.id}`}
                          className="text-sm font-medium text-primary hover:underline leading-snug"
                        >
                          {entry.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              <RelatedLinks
                title="Related articles"
                description="Keep reading to move deeper into the same travel topic cluster."
                links={getBlogRelatedLinks(slug)}
              />

              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="font-playfair text-xl font-bold text-foreground mb-3">
                  Quick links
                </h2>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    All blogs
                  </Link>
                  <Link
                    href="/villas"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    Villas
                  </Link>
                </div>
              </div>
            </aside>
          </article>

          <section className="mt-14 pt-14 border-t border-border">
            <h2 className="font-playfair text-3xl font-bold text-foreground mb-8">
              Featured Villas from This Article
            </h2>
            {relatedVillas.length > 0 ? (
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
            ) : (
              <p className="text-muted-foreground leading-relaxed">
                No related villas are mapped for this article yet.
              </p>
            )}
          </section>

          {pageFaqs.length > 0 && (
            <section className="mt-16 pt-12 border-t border-border">
              <h2 className="font-playfair text-3xl font-bold text-foreground mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-5">
                {pageFaqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group border border-border rounded-2xl p-6 bg-card"
                  >
                    <summary className="flex justify-between items-center cursor-pointer list-none">
                      <h3 className="font-semibold text-lg text-foreground pr-5">
                        {faq.q}
                      </h3>
                      <span className="text-primary text-2xl font-bold group-open:rotate-45 transition-transform">
                        +
                      </span>
                    </summary>
                    <p className="mt-5 text-muted-foreground leading-7">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <section className="mt-16 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-border p-6 md:p-8">
            <div className="max-w-3xl">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground">
                Ready to book the right villa for this itinerary?
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Match the route with the stay early so the trip planning stays simple. Use the
                category links above or go straight to the villa listings.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/villas"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                >
                  Browse villas
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/5 transition-colors"
                >
                  Ask for help
                </Link>
              </div>
            </div>
          </section>

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
