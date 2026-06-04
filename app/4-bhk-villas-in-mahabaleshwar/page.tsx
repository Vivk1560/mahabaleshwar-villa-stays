// app/4-bhk-villas-in-mahabaleshwar/page.tsx
// Root-level SEO landing page — "4 BHK Villas in Mahabaleshwar"
// URL: https://www.mahabaleshwarvillastays.com/4-bhk-villas-in-mahabaleshwar

import Link from 'next/link'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { FloatingButtons } from '@/components/FloatingButtons'
import { VillaCard } from '@/components/VillaCard'
import { MessageCircle, Home, ChevronRight } from 'lucide-react'
import villas from '@/lib/data/villas.json'
import { buildMetadata, dedupeKeywords } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { buildBreadcrumbSchema, buildFaqSchema, buildItemListSchema } from '@/lib/seo/schema'

// ── Page config ───────────────────────────────────────────────────────────────

const PAGE_PATH = '/4-bhk-villas-in-mahabaleshwar'

const SEO_TITLE =
  '4 BHK Villas in Mahabaleshwar | Private Villa for 8–12 Guests'
const SEO_DESCRIPTION =
  'Book 4 BHK villas in Mahabaleshwar for 8–12 guests. Private pools, professional cook, caretaker, valley views, and direct WhatsApp booking — no platform fees.'

const KEYWORDS = [
  '4 BHK villas in Mahabaleshwar',
  '4 bedroom villas Mahabaleshwar',
  'private 4 BHK villa Mahabaleshwar',
  'family villa Mahabaleshwar',
  'group villa Mahabaleshwar',
  'pool villa Mahabaleshwar',
  'villa for 8 guests Mahabaleshwar',
  'villa for 10 guests Mahabaleshwar',
  'weekend villa Mahabaleshwar',
  'private villa stay Mahabaleshwar',
  'family vacation villa Mahabaleshwar',
  'Panchgani villa 4 BHK',
]

// ── Villa selection ───────────────────────────────────────────────────────────
// Select villas: capacity 8–16, prefer pool-villas / family-villas / valley-view-villas,
// exclude obvious budget 3 BHK properties, sorted by rating then capacity.

function select4BhkVillas() {
  return villas
    .filter((v) => {
      const cap = v.capacity ?? 0
      const bhkNum = Number((v.bhk ?? '').replace(/[^0-9]/g, '')) || 0
      // Target 4 BHK range — capacity 8–16, BHK 3–5 (villas.json may store 4 or nearby)
      const capacityOk = cap >= 8 && cap <= 16
      const bhkOk = bhkNum >= 3 && bhkNum <= 5
      const notBudget = v.category !== 'budget-villas'
      return capacityOk && (bhkOk || notBudget)
    })
    .sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating
      return b.capacity - a.capacity
    })
    .slice(0, 6)
}

const featuredVillas = select4BhkVillas()

// ── FAQs ──────────────────────────────────────────────────────────────────────

const PAGE_FAQS = [
  {
    q: 'Are 4 BHK villas in Mahabaleshwar good for family trips?',
    a: 'Yes — 4 BHK villas are one of the most practical choices for family trips. With four separate bedrooms, you can comfortably accommodate a joint family of 8 to 12 people, keeping grandparents, parents, and children under one roof without anyone feeling crowded. Most 4 BHK properties in Mahabaleshwar include large common areas, a garden or lawn, and a private pool that the whole family shares exclusively.',
  },
  {
    q: 'How many guests can stay in a 4 BHK villa in Mahabaleshwar?',
    a: 'Most 4 BHK villas in Mahabaleshwar comfortably accommodate between 8 and 12 guests. Properties with sofa beds or additional sleeping areas in the living room can sometimes accommodate 14 to 16 guests. The exact capacity is listed on each villa page — contact us on WhatsApp and we will match you to the right property for your group size.',
  },
  {
    q: 'Do 4 BHK villas in Mahabaleshwar have a private pool?',
    a: 'Many 4 BHK villas include a private swimming pool reserved exclusively for your group. Our pool villas near Mapro Garden, Panchgani Road, and the valley-view stretches are particularly popular for family groups and weekend getaways. Confirm pool availability for specific dates by WhatsApp.',
  },
  {
    q: 'Are meals included in 4 BHK villa bookings?',
    a: 'Most 4 BHK villas include a professional cook as part of the package. Guests typically share meal preferences — vegetarian, non-vegetarian, or specific dietary requirements — a day before arrival and the cook handles breakfast, lunch, and dinner on-site. This is one of the biggest advantages of a villa stay over a hotel for family groups.',
  },
  {
    q: 'Do all 4 BHK villas include a caretaker?',
    a: 'Yes — all villas in the Mahabaleshwar Villa Stays portfolio include a caretaker on-site or on-call. The caretaker manages property upkeep, pool maintenance, cooking coordination, parking, and any requests during your stay.',
  },
  {
    q: 'How far are 4 BHK villas from Mapro Garden?',
    a: 'Most of our villas are within 5 to 20 minutes of Mapro Garden by car, depending on the specific property location. Mapro Garden is one of the most visited spots in Mahabaleshwar — being close to it reduces travel time and makes spontaneous food stops and sightseeing much simpler. Exact distances are listed on each villa page.',
  },
  {
    q: 'Are 4 BHK villas in Mahabaleshwar suitable for couples travelling together?',
    a: 'Yes — 4 BHK villas are also popular with two or three couples travelling together. With four bedrooms, each couple gets a private room while sharing the pool, garden, and common spaces. This is a far better experience than sharing a hotel floor with strangers.',
  },
  {
    q: 'Is a 4 BHK villa a good choice for a weekend trip from Pune?',
    a: 'Absolutely. Mahabaleshwar is approximately 120 km from Pune — around 3 hours by road — making it a natural weekend destination. A 4 BHK villa for a group of 8 to 12 splits the per-person cost to levels that compare favourably with mid-range hotel rooms, while giving your group complete privacy, a pool, and a cook.',
  },
  {
    q: 'Can we arrange a bonfire at a 4 BHK villa in Mahabaleshwar?',
    a: 'Yes — many 4 BHK villas include a dedicated bonfire setup, garden seating area, or an open terrace where a bonfire can be arranged. Bonfire evenings are one of the most popular villa experiences during winter stays in Mahabaleshwar. Mention your preference at booking and the caretaker will arrange it.',
  },
  {
    q: 'What is the best season for a 4 BHK villa stay in Mahabaleshwar?',
    a: 'Mahabaleshwar is worth visiting in any season. October to February offers the sharpest valley views, cold evenings ideal for bonfires, and strawberry season from December to March. Monsoon between June and September brings dramatic green landscapes, full waterfalls at Lingmala, and mist-covered valley mornings. April and May are popular because of school summer holidays.',
  },
  {
    q: 'Are there 4 BHK villas near Venna Lake and Wilson Point?',
    a: 'Yes — several villas in our portfolio are located 10 to 20 minutes from Venna Lake and Wilson Point. Both are standard inclusions on any Mahabaleshwar itinerary — Venna Lake for boating and the lakeside walk, Wilson Point for the sunrise panorama that opens up across the Sahyadri range.',
  },
  {
    q: 'How do I book a 4 BHK villa in Mahabaleshwar?',
    a: 'Booking is direct and simple. WhatsApp or call us with your travel dates, group size, and any preferences — pool, valley view, proximity to Mapro Garden, bonfire setup, or budget. Our team recommends the best available property and shares photos, pricing, and amenity details. No platform fees, no third-party charges.',
  },
  {
    q: 'What are the advantages of a 4 BHK villa over a hotel in Mahabaleshwar?',
    a: 'A 4 BHK villa gives your group complete privacy — no shared corridors, no strangers at breakfast, no lobby crowding. You get a private pool, a cook for all meals, a dedicated caretaker, an open garden or terrace, and the freedom to stay up late around a bonfire without noise complaints. For groups of 8 to 12, the per-person cost of a private villa frequently undercuts equivalent hotel rooms once you factor in meal savings.',
  },
  {
    q: 'Do 4 BHK villas in Mahabaleshwar have WiFi?',
    a: 'Yes — all villas in our portfolio include WiFi connectivity. For guests planning a workation or extended stay, quieter properties in Bhilar and the Panchgani road stretch are especially popular for the calm environment and reliable connectivity.',
  },
]

// ── Metadata ──────────────────────────────────────────────────────────────────

export function generateMetadata() {
  return buildMetadata({
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    path: PAGE_PATH,
    image: '/images/villa-listing-1.jpg',
    imageAlt: '4 BHK villa in Mahabaleshwar with private pool and valley views',
    keywords: dedupeKeywords(KEYWORDS, ['Mahabaleshwar villa booking', 'hill station villa Maharashtra']),
  })
}

// ── Page Component ────────────────────────────────────────────────────────────

export default function FourBhkVillasMahabaleshwarPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Structured Data */}
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: '4 BHK Villas in Mahabaleshwar', item: PAGE_PATH },
        ])}
      />
      {featuredVillas.length > 0 && (
        <JsonLd
          data={buildItemListSchema({
            name: '4 BHK Villas in Mahabaleshwar',
            description: 'Private 4 BHK villa stays for 8–12 guests in Mahabaleshwar and Panchgani',
            items: featuredVillas.map((villa) => ({
              name: villa.name,
              url: `/villas/${villa.id}`,
            })),
          })}
        />
      )}
      <JsonLd data={buildFaqSchema(PAGE_FAQS)} />

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
              <span className="text-foreground font-medium">4 BHK Villas in Mahabaleshwar</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="pt-8 pb-6 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            4 BHK Villas in Mahabaleshwar
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
            Private 4-bedroom villas for groups of 8 to 12 — with exclusive pools, professional cook service, and direct booking across Mahabaleshwar, Panchgani, and Bhilar.
          </p>
        </div>
      </section>

      {/* ── SEO Intro ──────────────────────────────────────────────────────── */}
      <section className="pb-10 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-10 space-y-5 text-muted-foreground leading-8 text-base md:text-lg">
            <p>
              A 4 BHK villa is one of the most practical formats for Mahabaleshwar travel. Four separate bedrooms accommodate groups of 8 to 12 people comfortably — enough for a joint family, two or three couples sharing a weekend trip, or a core group of friends who want their own rooms without splitting across different hotel bookings. The math changes too: split across 10 people, a 4 BHK villa with a private pool and a professional cook frequently costs less per head than a mid-range hotel room that offers none of those things.
            </p>
            <p>
              Most 4 BHK villas in Mahabaleshwar are positioned on elevated plots along the Panchgani–Mahabaleshwar Road, near Mapro Garden, or on quieter stretches in Bhilar — all of which give the property either a valley view, a garden that feels genuinely spacious, or both. The Sahyadri range at 1,353 metres does something particular to the air: it stays noticeably cooler than the plains below it even in April, and the mornings carry a mist that clears slowly enough to watch from a terrace. A 4 BHK villa puts your group inside that landscape rather than passing through it.
            </p>
            <p>
              Every booking in our portfolio is direct — no platform fees, no commission layers, no third-party charges. WhatsApp us with your group size, travel dates, and any preferences and we will recommend the right property from the current available set. Properties near Venna Lake, Wilson Point, Lingmala Waterfall, and Mapro Garden book quickly during peak season and long weekends — early inquiry is recommended.
            </p>
          </div>
        </div>
      </section>

      {/* ── Why 4 BHK section ──────────────────────────────────────────────── */}
      <section className="pb-10 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-6">
            Why a 4 BHK Villa Works for Mahabaleshwar
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                title: 'Right size for most groups',
                body: 'A group of 8 to 12 people is the sweet spot for a 4 BHK villa. Large enough to need four bedrooms, small enough that a single villa keeps everyone together without the property feeling crowded.',
              },
              {
                title: 'Private pool at a shareable cost',
                body: 'Many 4 BHK properties include an exclusive pool. Split the villa cost across 10 guests and the per-person figure is comparable to a budget hotel — but you get a private pool, cook, and caretaker.',
              },
              {
                title: 'The right base for sightseeing',
                body: 'A 4 BHK villa near Mapro Garden puts Venna Lake, Wilson Point, and Lingmala Waterfall all within a short drive. Sightseeing from a villa base is fundamentally different from hotel travel: you return to your own space, not a shared lobby.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-2xl p-6 space-y-3"
              >
                <h3 className="font-playfair text-lg font-bold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Villas ────────────────────────────────────────────────── */}
      <section className="py-10 px-4 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-3">
            4 BHK Villas to Consider
          </h2>
          <p className="text-muted-foreground mb-8 text-base">
            Villas from the current portfolio sorted by rating and capacity — all bookable directly via WhatsApp.
          </p>

          {featuredVillas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredVillas.map((villa) => (
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
            <p className="text-muted-foreground text-center py-10">
              No villas matched the current filter.{' '}
              <Link href="/villas" className="text-primary underline">
                Browse all villas
              </Link>
              .
            </p>
          )}

          <div className="text-center mt-10">
            <Link
              href="/villas"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-lg"
            >
              Browse All Villas
            </Link>
          </div>
        </div>
      </section>

      {/* ── Seasonal context ───────────────────────────────────────────────── */}
      <section className="py-10 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-6">
            When to Book a 4 BHK Villa in Mahabaleshwar
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-muted-foreground leading-8 text-base md:text-lg">
            <div className="space-y-4">
              <p>
                <span className="font-semibold text-foreground">October to February</span> is peak season and for good reason. The cold evenings make bonfires in the villa garden genuinely necessary, the views from Wilson Point and the valley terraces are at their clearest, and December through March brings strawberry season — roadside fruit stalls, Mapro Garden cream servings, and farm visits in Bhilar that are a specific Mahabaleshwar ritual.
              </p>
              <p>
                <span className="font-semibold text-foreground">June to September</span> transforms the Sahyadri landscape entirely. Lingmala Waterfall runs at full volume, the hills are saturated green, and the mist arrives at terrace level on most mornings. A 4 BHK villa in monsoon Mahabaleshwar is a quieter, more atmospheric experience — popular with guests who want the hill station with fewer crowds.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                <span className="font-semibold text-foreground">April and May</span> work well for families during school summer holidays. The elevation keeps Mahabaleshwar cooler than the plains, so the climate is comfortable even in summer. Venna Lake boating, horse riding on the Table Land in Panchgani, and early morning drives to Arthur's Seat all fit into the summer itinerary without requiring a specific season.
              </p>
              <p>
                Regardless of when you travel, book the villa well in advance for peak season and long weekends. 4 BHK properties move quickly because they sit in the most practical size range for the majority of group and family trips.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related pages ──────────────────────────────────────────────────── */}
      <section className="py-10 px-4 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-playfair text-2xl font-bold text-foreground mb-4">
            Related Villa Collections
          </h2>
          <p className="text-muted-foreground mb-6 text-sm leading-7">
            Explore other popular villa types in Mahabaleshwar to find the right match for your group.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                label: '3 BHK Villas in Mahabaleshwar',
                description: 'Ideal for smaller groups of 6 to 10 guests.',
                href: '/3-bhk-villas-in-mahabaleshwar',
              },
              {
                label: 'Family Villas in Mahabaleshwar',
                description: 'Spacious multi-bedroom stays for joint-family trips.',
                href: '/villas-for-family-in-mahabaleshwar',
              },
              {
                label: 'Private Pool Villas in Mahabaleshwar',
                description: 'Exclusive pool villas for groups of all sizes.',
                href: '/private-pool-villas-in-mahabaleshwar',
              },
              {
                label: 'Luxury Villas in Mahabaleshwar',
                description: 'Premium stays with superior views and service.',
                href: '/luxury-villas-in-mahabaleshwar',
              },
              {
                label: 'Villas Near Mapro Garden',
                description: 'Stay close to Mahabaleshwar\'s most visited food and sightseeing spot.',
                href: '/villas-near-mapro-garden',
              },
              {
                label: 'All Villas in Mahabaleshwar',
                description: 'Browse the full portfolio of 25+ curated properties.',
                href: '/villas',
              },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex flex-col gap-2 rounded-2xl border border-border bg-background p-5 hover:border-primary hover:shadow-md transition-all duration-200"
              >
                <span className="font-playfair font-bold text-base text-foreground group-hover:text-primary transition-colors">
                  {link.label}
                </span>
                <span className="text-sm text-muted-foreground leading-snug">
                  {link.description}
                </span>
                <span className="text-xs font-semibold text-primary mt-auto flex items-center gap-1">
                  Browse <ChevronRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-3xl font-bold text-foreground mb-8">
            Frequently Asked Questions — 4 BHK Villas in Mahabaleshwar
          </h2>
          <div className="space-y-5">
            {PAGE_FAQS.map((faq, index) => (
              <details
                key={index}
                className="group border border-border rounded-2xl p-6 bg-card"
              >
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <h3 className="font-semibold text-lg text-foreground pr-5">{faq.q}</h3>
                  <span className="text-primary text-2xl font-bold group-open:rotate-45 transition-transform flex-shrink-0">
                    +
                  </span>
                </summary>
                <p className="mt-5 text-muted-foreground leading-7">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-card border-t border-border">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h2 className="font-playfair text-2xl font-bold text-foreground">
            Looking for a 4 BHK villa for your dates?
          </h2>
          <p className="text-muted-foreground">
            Share your group size, travel dates, and preferences on WhatsApp — we will recommend the best available property the same day.
          </p>
          
            href="https://wa.me/919921372661?text=Hi%2C%20I%20am%20looking%20for%20a%204%20BHK%20villa%20in%20Mahabaleshwar.%20Can%20you%20help%20me%20find%20the%20right%20one%3F"
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
