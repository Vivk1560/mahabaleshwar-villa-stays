// app/villas/category/[slug]/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// PROGRAMMATIC SEO — Real indexable URLs for each villa category.
// Replaces weak ?category=pool-villas query params with proper routes:
//   /villas/category/pool-villas-in-mahabaleshwar
//   /villas/category/family-villas-in-mahabaleshwar
//   /villas/category/couple-villas-in-mahabaleshwar
//   /villas/category/group-villas-in-mahabaleshwar
//   /villas/category/valley-view-villas-in-mahabaleshwar
//   /villas/category/budget-villas-in-mahabaleshwar
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, Home, MessageCircle } from 'lucide-react'

import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { FloatingButtons } from '@/components/FloatingButtons'
import { VillaCard } from '@/components/VillaCard'

import villas from '@/lib/data/villas.json'
import { buildMetadata, dedupeKeywords } from '@/lib/seo/metadata'

// ── Category config — single source of truth ─────────────────────────────────
export const CATEGORY_CONFIG: Record<
  string,
  {
    villaKey: string        // matches villa.category in villas.json
    label: string          // human-readable name
    h1: string             // page H1
    intro: string          // 120-160 word SEO intro paragraph
    faqItems: { q: string; a: string }[]
    seoTitle: string
    seoDescription: string
  }
> = {
  'pool-villas-in-mahabaleshwar': {
    villaKey: 'pool-villas',
    label: 'Pool Villas',
    h1: 'Private Pool Villas in Mahabaleshwar',
    seoTitle: 'Private Pool Villas in Mahabaleshwar – Book Direct | Mahabaleshwar Villa Stays',
    seoDescription:
      'Browse the best private pool villas in Mahabaleshwar. All villas include a private swimming pool, AC rooms, caretaker & WhatsApp booking. Groups of 12–25 guests.',
    intro:
      'A private pool villa in Mahabaleshwar is the definitive hill-station upgrade — the difference between watching the valley from a hotel balcony and actually swimming in a pool that appears to float above it. Every pool villa in our Mahabaleshwar collection includes a fully private pool reserved exclusively for your group, so there are no shared pool schedules, no strangers, and no time limits. Most properties are positioned on elevated land near Mapro Garden or along the Panchgani–Mahabaleshwar Road, giving the pool a west-facing aspect that makes evening swims genuinely spectacular. The pools are well-maintained year-round and our caretakers manage water quality throughout your stay. Whether you are planning a birthday trip, a family reunion, or a corporate offsite, a pool villa turns the property itself into the destination — sightseeing becomes optional rather than mandatory.',
    faqItems: [
      {
        q: 'Are the pools at Mahabaleshwar pool villas private?',
        a: 'Yes — every pool villa in our collection has a completely private pool. No other guests share the pool during your booking period.',
      },
      {
        q: 'Are pool villas in Mahabaleshwar available in monsoon?',
        a: 'Yes, pool villas are available year-round including monsoon (June–September). The surrounding landscape is exceptionally green during this period. Pool temperature is cooler in monsoon months.',
      },
      {
        q: 'How far are pool villas from Mapro Garden, Mahabaleshwar?',
        a: 'Most of our pool villas are 5–15 minutes from Mapro Garden by car, depending on the specific property. Exact distances are listed on each villa page.',
      },
    ],
  },

  'family-villas-in-mahabaleshwar': {
    villaKey: 'family-villas',
    label: 'Family Villas',
    h1: 'Family Villas in Mahabaleshwar',
    seoTitle: 'Family Villas in Mahabaleshwar – Large Group Stays | Mahabaleshwar Villa Stays',
    seoDescription:
      'Book family villas in Mahabaleshwar with 15–25 guest capacity. Private pool, professional cook, caretaker & kids-friendly amenities. Perfect for family reunions & holidays.',
    intro:
      'Family vacations to Mahabaleshwar work best when the entire group stays under one roof — and our family villas are built precisely for that. With capacities ranging from 15 to 25 guests across multiple bedrooms, these properties accommodate multi-generational Indian family trips where grandparents, parents, and children all need their own space without being spread across different hotel rooms. Each family villa includes a professional cook who handles vegetarian and non-vegetarian meals based on your preferences, a caretaker available round the clock, and child-friendly amenities including indoor games and spacious gardens. Properties near Mapro Garden put Mahabaleshwar\'s most family-friendly attraction within a short drive. Velocity Park and Venna Lake — both popular with children — are within 10–15 minutes of most properties. Book a family villa and turn the stay itself into the main event rather than just a base for day trips.',
    faqItems: [
      {
        q: 'What is the ideal family villa size for a Mahabaleshwar trip?',
        a: 'For a standard Indian joint family of 15–20 people, a 7 BHK villa works well. For smaller families of 8–12, a 4–5 BHK is sufficient. All our family villas list exact capacities on the villa page.',
      },
      {
        q: 'Do family villas in Mahabaleshwar include a cook?',
        a: 'Most of our family villas include a professional cook. Meal preferences — vegetarian, non-vegetarian, dietary restrictions — should be shared a day before arrival.',
      },
      {
        q: 'Are Mahabaleshwar family villas suitable for children?',
        a: 'Yes — our family villas include child-friendly features like enclosed gardens, supervised pool areas, indoor games, and proximity to family attractions like Velocity Park and Mapro Garden.',
      },
    ],
  },

  'couple-villas-in-mahabaleshwar': {
    villaKey: 'couple-villas',
    label: 'Couple Villas',
    h1: 'Couple-Friendly Villas in Mahabaleshwar',
    seoTitle: 'Couple Villas in Mahabaleshwar – Romantic Private Stays | Mahabaleshwar Villa Stays',
    seoDescription:
      'Book romantic couple-friendly villas in Mahabaleshwar with private pools, valley views & bonfire areas. Perfect for honeymoons, anniversaries & weekend getaways.',
    intro:
      'Mahabaleshwar has long been Maharashtra\'s go-to hill station for couples — the misty valleys, the cool air, and the strawberry farms have been drawing honeymooners and anniversary travellers for decades. Our couple-friendly villas take that experience further by giving you complete privacy within a fully exclusive property. Rather than a hotel room with a view, you get an entire villa: your own pool, your own garden, your own bonfire setup in the evenings, and a caretaker who handles everything so the only decision you need to make is whether to drive to Parsi Point for the sunset or watch it from the villa terrace. Properties in this category are selected for their intimacy — the right balance of seclusion, premium interiors, and proximity to the viewpoints and attractions that make Mahabaleshwar particularly romantic. Ideal for honeymoons, anniversaries, and weekend escapes from Pune or Mumbai.',
    faqItems: [
      {
        q: 'Are couple villas in Mahabaleshwar suitable for honeymoons?',
        a: 'Yes — our couple-friendly villas offer complete privacy, valley views, private pools, and bonfire facilities that make them ideal for honeymoons and anniversary stays.',
      },
      {
        q: 'Which is the most romantic viewpoint near Mahabaleshwar couple villas?',
        a: 'Parsi Point is widely considered the best sunset viewpoint in the area — about 10 minutes from most of our couple villa locations. Wilson Point is the best for sunrise.',
      },
      {
        q: 'Can we book a couple villa in Mahabaleshwar for 2 people only?',
        a: 'Yes — while villas have higher capacities, smaller groups including just 2 people can book. Contact us for pricing on smaller occupancies.',
      },
    ],
  },

  'group-villas-in-mahabaleshwar': {
    villaKey: 'group-villas',
    label: 'Group Villas',
    h1: 'Group Villas in Mahabaleshwar for Large Parties',
    seoTitle: 'Group Villas in Mahabaleshwar – 15 to 25 Guests | Mahabaleshwar Villa Stays',
    seoDescription:
      'Book large group villas in Mahabaleshwar for 15–25 guests. 7–8 BHK private villas with pool, cook, caretaker & group activities. Corporate retreats, birthday trips & reunions.',
    intro:
      'When you are travelling with a large group — office colleagues, a college batch, or a circle of families — finding accommodation that keeps everyone together without compromise is the real challenge. Our group villas in Mahabaleshwar solve that with 7–8 BHK properties that comfortably house 17–25 people under one roof, with the full villa exclusively yours for the duration of the booking. Group travel to Mahabaleshwar works particularly well because the area\'s attractions — Mapro Garden, Venna Lake boating, Wilson Point sunrise, Lingmala Waterfall — are all easily accessible by private vehicle and require no advance booking queues. The villa itself handles the logistics: professional cook, on-site caretaker, power backup, WiFi, and enough outdoor space for group games, bonfires, and evening gatherings. Several group villas also include sports equipment and activity areas for groups that want structured outdoor recreation alongside sightseeing.',
    faqItems: [
      {
        q: 'What is the maximum group size for Mahabaleshwar group villas?',
        a: 'Our largest group villas accommodate up to 25 guests across 7–8 bedrooms. For groups larger than 25, contact us — we can sometimes accommodate extended groups with additional arrangements.',
      },
      {
        q: 'Are group villas in Mahabaleshwar suitable for corporate team outings?',
        a: 'Yes — several group villas include stable WiFi, large common areas, and outdoor spaces that work well for corporate retreats and team offsite events.',
      },
      {
        q: 'Can we arrange group activities at Mahabaleshwar group villas?',
        a: 'Yes — caretakers can arrange bonfires, outdoor games, and coordinate local transport for group sightseeing. Some villas include sports equipment on-site.',
      },
    ],
  },

  'valley-view-villas-in-mahabaleshwar': {
    villaKey: 'valley-view-villas',
    label: 'Valley View Villas',
    h1: 'Valley View Villas in Mahabaleshwar',
    seoTitle: 'Valley View Villas in Mahabaleshwar – Panoramic Sahyadri Views | Mahabaleshwar Villa Stays',
    seoDescription:
      'Book valley view villas in Mahabaleshwar with panoramic Sahyadri views. Private pools facing the valley, sunrise & sunset vistas, AC rooms & caretaker. Book direct via WhatsApp.',
    intro:
      'The Sahyadri valley views from Mahabaleshwar are one of Maharashtra\'s most photographed landscapes — and our valley view villas position you inside that landscape rather than just passing through it. Each property in this category is selected specifically for its view axis: pools that face the valley, bedrooms whose windows frame the ridgeline, and terraces where morning coffee comes with an unobstructed 180–270 degree panorama. The difference between a standard villa and a valley view villa becomes clearest at sunrise and sunset — when the light changes across the Sahyadri ranges and the mist rolls through the valleys below your terrace. Properties are located across the Mahabaleshwar area including Mapro Garden Road, Satara–Mahabaleshwar Road, and the Bhilar stretch — each offering a slightly different angle of the valley. If the view is your primary reason for visiting Mahabaleshwar, this is the category to book from.',
    faqItems: [
      {
        q: 'Do valley view villas in Mahabaleshwar have pools facing the valley?',
        a: 'Yes — properties in our valley view category are specifically chosen for pools and terraces that face the valley, creating the "infinity" visual effect where water meets the valley horizon.',
      },
      {
        q: 'When is the best time to see valley views in Mahabaleshwar?',
        a: 'October to February offers the clearest valley views. Monsoon (June–September) brings dramatic cloud views and misty ridgelines. March to May is clear but can be hazy in the afternoons.',
      },
      {
        q: 'Are valley view villas available near Mapro Garden?',
        a: 'Yes — several of our valley view villas are located within 5–10 minutes of Mapro Garden while still maintaining elevated positions with open valley views.',
      },
    ],
  },

  'budget-villas-in-mahabaleshwar': {
    villaKey: 'budget-villas',
    label: 'Budget Villas',
    h1: 'Budget Villas in Mahabaleshwar with Private Pool',
    seoTitle: 'Budget Villas in Mahabaleshwar with Pool – Best Rates | Mahabaleshwar Villa Stays',
    seoDescription:
      'Book budget villas in Mahabaleshwar with private pool at the best rates. 3–5 BHK villas for 12–15 guests with AC, caretaker & WhatsApp booking. Luxury experience, budget price.',
    intro:
      'A budget villa in Mahabaleshwar does not mean a budget experience. Our budget category includes properties that deliver the full private villa setup — exclusive use, private pool, AC rooms, caretaker on-site — at per-person costs that compare favourably with mid-range hotel rooms once you split across the group. The properties in this category are typically 3–5 BHK, accommodating groups of 12–15 guests, and are located across Mahabaleshwar and Panchgani including areas near Mapro Garden, Bhilar, and the Table Land. Budget villas are particularly popular with college groups, young professional friend groups, and families who want the villa experience on their first Mahabaleshwar trip before committing to larger luxury properties. Every property in this category has been selected to ensure quality is maintained: clean pools, functional AC, responsive caretakers, and good proximity to Mahabaleshwar\'s main attractions.',
    faqItems: [
      {
        q: 'Do budget villas in Mahabaleshwar have private pools?',
        a: 'Yes — even our budget-category villas include a private pool exclusive to your group. Pool quality and maintenance standards are maintained across all price points.',
      },
      {
        q: 'What is the per-person cost for a budget villa in Mahabaleshwar?',
        a: 'Per-person costs vary by season and group size. Contact us via WhatsApp for current pricing — splitting a budget villa across 12–15 people typically costs less than a mid-range hotel room per head.',
      },
      {
        q: 'Are budget villas in Mahabaleshwar near Mapro Garden?',
        a: 'Several budget villas are within 10–15 minutes of Mapro Garden. The Bhilar and Panchgani areas also have budget options that are slightly further but offer quieter surroundings.',
      },
    ],
  },
}

// ── Static params — tells Next.js which slugs to pre-render ──────────────────
export function generateStaticParams() {
  return Object.keys(CATEGORY_CONFIG).map((slug) => ({ slug }))
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const config = CATEGORY_CONFIG[slug]
  if (!config) return {}

  return buildMetadata({
    title: config.seoTitle,
    description: config.seoDescription,
    path: `/villas/category/${slug}`,
    image: '/images/villa-listing-2.jpg',
    imageAlt: config.h1,
    keywords: dedupeKeywords(
      [
        `${config.label.toLowerCase()} Mahabaleshwar`,
        `Mahabaleshwar ${config.label.toLowerCase()}`,
      ],
      [
        'Mahabaleshwar villa stay',
        'Panchgani villa stay',
        'private villa booking',
      ]
    ),
  })
}

// ── Page Component ────────────────────────────────────────────────────────────
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const config = CATEGORY_CONFIG[slug]
  if (!config) notFound()

  const canonicalUrl = `https://www.mahabaleshwarvillastays.com/villas/category/${slug}`
  const filteredVillas = villas.filter((v) => v.category === config.villaKey)

  // ── Structured Data ────────────────────────────────────────────────────────
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mahabaleshwarvillastays.com' },
      { '@type': 'ListItem', position: 2, name: 'Villas', item: 'https://www.mahabaleshwarvillastays.com/villas' },
      { '@type': 'ListItem', position: 3, name: config.label, item: canonicalUrl },
    ],
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: config.h1,
    description: config.seoDescription,
    numberOfItems: filteredVillas.length,
    itemListElement: filteredVillas.map((villa, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: villa.name,
      url: `https://www.mahabaleshwarvillastays.com/villas/${villa.id}`,
    })),
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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
              <Link href="/villas" className="hover:text-primary transition-colors">Villas</Link>
            </li>
            <li className="flex items-center gap-1">
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground font-medium">{config.label}</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="pt-8 pb-6 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            {config.h1}
          </h1>
          <p className="text-muted-foreground text-base">
            {filteredVillas.length} {filteredVillas.length === 1 ? 'villa' : 'villas'} available
            · Direct WhatsApp booking · Best rates guaranteed
          </p>
        </div>
      </section>

      {/* ── SEO Intro paragraph ────────────────────────────────────────────── */}
      <section className="pb-8 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <p className="text-muted-foreground leading-8 text-base md:text-lg">
              {config.intro}
            </p>
          </div>
        </div>
      </section>

      {/* ── Villa Grid ─────────────────────────────────────────────────────── */}
      <section className="py-8 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          {filteredVillas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVillas.map((villa) => (
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
            <p className="text-center text-muted-foreground py-16 text-lg">
              No villas found in this category. <Link href="/villas" className="text-primary underline">Browse all villas</Link>.
            </p>
          )}
        </div>
      </section>

      {/* ── FAQ Section ────────────────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-3xl font-bold text-foreground mb-8">
            Frequently Asked Questions — {config.label} in Mahabaleshwar
          </h2>
          <div className="space-y-5">
            {config.faqItems.map((faq, index) => (
              <details
                key={index}
                className="group border border-border rounded-2xl p-6 bg-background"
              >
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <h3 className="font-semibold text-lg text-foreground pr-5">{faq.q}</h3>
                  <span className="text-primary text-2xl font-bold group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-5 text-muted-foreground leading-7">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Internal links to other categories ────────────────────────────── */}
      <section className="py-12 px-4 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-playfair text-2xl font-bold text-foreground mb-6">
            Explore Other Villa Categories in Mahabaleshwar
          </h2>
          <div className="flex flex-wrap gap-3">
            {Object.entries(CATEGORY_CONFIG)
              .filter(([s]) => s !== slug)
              .map(([s, c]) => (
                <Link
                  key={s}
                  href={`/villas/category/${s}`}
                  className="px-5 py-2.5 rounded-full border border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  {c.label}
                </Link>
              ))}
            <Link
              href="/villas"
              className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all duration-200"
            >
              All Villas
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Strip ──────────────────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-card border-t border-border">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h2 className="font-playfair text-2xl font-bold text-foreground">
            Not sure which villa to pick?
          </h2>
          <p className="text-muted-foreground">
            WhatsApp us with your group size, dates, and budget — we will recommend the best option.
          </p>
          <a
            href="https://wa.me/919921372661?text=Hi, I am looking for a villa in Mahabaleshwar. Can you help?"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-lg text-base"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Us Now
          </a>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  )
}
