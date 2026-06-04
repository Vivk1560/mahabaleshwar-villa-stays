// app/villas/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// FIX: Title now uses { absolute: ... } to prevent layout.tsx template from
// appending "| Mahabaleshwar Villa Stays" to an already-branded string,
// which previously produced:
//   "All Luxury Villas in Mahabaleshwar — Browse 25+ Properties |
//    Mahabaleshwar Villa Stays | Mahabaleshwar Villa Stays"
// ─────────────────────────────────────────────────────────────────────────────

import Link from 'next/link'
import { MessageCircle, ChevronRight, Home } from 'lucide-react'

import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { FloatingButtons } from '@/components/FloatingButtons'
import { VillaCard } from '@/components/VillaCard'

import villas from '@/lib/data/villas.json'
import { buildMetadata, dedupeKeywords } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/json-ld'
import { buildBreadcrumbSchema, buildItemListSchema } from '@/lib/seo/schema'

// ── Metadata ─────────────────────────────────────────────────────────────────
export function generateMetadata() {
  const title = 'All Luxury Villas in Mahabaleshwar'
  const description =
    'Browse 25+ premium villas in Mahabaleshwar and Panchgani. Private pool villas, family villas, couple villas, group villas, and budget options with direct WhatsApp booking.'

  return buildMetadata({
    title,
    description,
    path: '/villas',
    image: '/images/villa-listing-1.jpg',
    imageAlt: 'Luxury villas in Mahabaleshwar',
    keywords: dedupeKeywords(
      [
        'luxury villas Mahabaleshwar',
        'pool villas Mahabaleshwar',
        'family villas Mahabaleshwar',
        'couple villas Mahabaleshwar',
      ],
      [
        'group villas Mahabaleshwar',
        'budget villas Mahabaleshwar',
        'vacation rentals Mahabaleshwar',
        'private villa Panchgani',
      ]
    ),
  })
}

// ── Category config for real URL links ───────────────────────────────────────
const CATEGORY_LINKS = [
  {
    label: 'Pool Villas',
    slug: 'pool-villas-in-mahabaleshwar',
    key: 'pool-villas',
    description: 'Private swimming pool exclusively for your group',
  },
  {
    label: 'Family Villas',
    slug: 'family-villas-in-mahabaleshwar',
    key: 'family-villas',
    description: 'Spacious layouts for 15–25 guests with cook & caretaker',
  },
  {
    label: 'Couple Villas',
    slug: 'couple-villas-in-mahabaleshwar',
    key: 'couple-villas',
    description: 'Romantic & private — ideal for honeymoons & anniversaries',
  },
  {
    label: 'Group Villas',
    slug: 'group-villas-in-mahabaleshwar',
    key: 'group-villas',
    description: 'Large 7–8 BHK villas for office trips & reunions',
  },
  {
    label: 'Valley View',
    slug: 'valley-view-villas-in-mahabaleshwar',
    key: 'valley-view-villas',
    description: 'Panoramic Sahyadri views from pool & terrace',
  },
  {
    label: 'Budget Villas',
    slug: 'budget-villas-in-mahabaleshwar',
    key: 'budget-villas',
    description: 'Full private villa experience at best-value rates',
  },
]

// ── Page Component ────────────────────────────────────────────────────────────
export default function VillasPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Structured Data */}
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: 'Villas', item: '/villas' },
        ])}
      />
      <JsonLd
        data={buildItemListSchema({
          name: 'Luxury Villas in Mahabaleshwar',
          description: 'Curated collection of 25+ premium villas in Mahabaleshwar and Panchgani',
          items: villas.map((villa) => ({
            name: villa.name,
            url: `/villas/${villa.id}`,
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
              <span className="text-foreground font-medium">Villas</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="pt-6 pb-8 px-4 bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            Luxury Villas in Mahabaleshwar
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {villas.length}+ handpicked private villas in Mahabaleshwar &amp; Panchgani.
            Pool villas, family stays, romantic escapes &amp; large group retreats — all with direct WhatsApp booking.
          </p>
        </div>
      </section>

      {/* ── SEO Content Block ──────────────────────────────────────────────── */}
      <section className="pb-10 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-10 space-y-5 text-muted-foreground leading-8 text-base md:text-lg">
            <p>
              Mahabaleshwar is Maharashtra's most visited hill station — and for good reason. At 1,353 metres above sea level, the plateau offers a climate that feels genuinely cool even in the height of May, views of the Sahyadri ranges that stretch as far as the eye can follow, and a landscape that transforms completely with each season. A private villa stay here turns a standard hill station trip into something far more personal: your own pool, your own kitchen, your own schedule, and a caretaker who handles everything so you don't have to.
            </p>
            <p>
              Our collection covers every type of group and every budget. Large families planning reunions will find 7–8 BHK villas near Mapro Garden that comfortably sleep 20–25 people with a professional cook and dedicated caretaker included. Couples looking for a romantic weekend escape from Pune or Mumbai will find intimate properties with valley-facing pools and private terraces near Parsi Point. Groups of college friends or office colleagues planning a budget trip will find full private villas — pool, AC rooms, indoor games, caretaker — at per-person costs that undercut mid-range hotels once split across the group.
            </p>
            <p>
              All properties in our Mahabaleshwar villa portfolio are located within easy reach of the area's main attractions: Mapro Garden (5–15 minutes), Venna Lake (8–18 minutes), Wilson Point (12–22 minutes), Lingmala Waterfall (10–20 minutes), and Panchgani's Table Land (15–25 minutes). The Panchgani–Mahabaleshwar Road stretch hosts several of our properties, giving guests the advantage of exploring both hill stations from a single villa base.
            </p>
            <p>
              Every booking is handled directly — no third-party platform fees, no hidden charges. WhatsApp us with your group size, travel dates, and preferences, and we will recommend the best available property. Availability moves fast during peak season (October–January) and long weekends, so early inquiry is recommended.
            </p>
          </div>
        </div>
      </section>

      {/* ── Category Navigation Cards ──────────────────────────────────────── */}
      <section className="pb-10 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-playfair text-2xl font-bold text-foreground mb-6">
            Browse by Villa Type
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORY_LINKS.map((cat) => {
              const count = villas.filter((v) => v.category === cat.key).length
              return (
                <Link
                  key={cat.slug}
                  href={`/villas/category/${cat.slug}`}
                  className="group flex flex-col gap-1.5 rounded-2xl border border-border bg-card p-4 hover:border-primary hover:shadow-md transition-all duration-200"
                >
                  <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                    {cat.label}
                  </span>
                  <span className="text-xs text-muted-foreground leading-tight">
                    {cat.description}
                  </span>
                  <span className="text-xs font-semibold text-primary mt-auto">
                    {count} {count === 1 ? 'villa' : 'villas'} →
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── All Villas Grid ────────────────────────────────────────────────── */}
      <section className="py-8 px-4 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-playfair text-2xl font-bold text-foreground mb-8">
            All Villas in Mahabaleshwar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {villas.map((villa) => (
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
      </section>

    {/* ── Intent Landing Pages ─────────────────────────────────────────── */}
      <section className="pb-10 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-playfair text-2xl font-bold text-foreground mb-4">
            Search by Travel Intent
          </h2>
          <p className="text-muted-foreground mb-6 text-base leading-7 max-w-4xl">
            These focused landing pages help you reach the right villa set faster when the search
            intent is specific. They are built from the same villa data as the main listing pages.
          </p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                href: '/private-pool-villas-in-mahabaleshwar',
                title: 'Private pool villas',
                description: 'Exclusive pools for families, couples, and group stays.',
              },
              {
                href: '/luxury-villas-in-mahabaleshwar',
                title: 'Luxury villas',
                description: 'Premium villas with stronger view lines and service setup.',
              },
              {
                href: '/villas-for-family-in-mahabaleshwar',
                title: 'Family villas',
                description: 'Practical layouts for joint families and multi-generational trips.',
              },
              {
                href: '/villas-near-mapro-garden',
                title: 'Villas near Mapro Garden',
                description: 'Convenient stays close to the main sightseeing and food corridor.',
              },
              {
                href: '/villas/pet-friendly-villas-in-mahabaleshwar',
                title: 'Pet-friendly villas',
                description: 'A careful shortlist and policy guidance before you book with pets.',
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-card transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2">
                    <h3 className="font-playfair text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Deep Links (SEO internal linking block) ───────────────── */}
      <section className="py-12 px-4 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-playfair text-2xl font-bold text-foreground mb-4">
            Find Your Perfect Villa in Mahabaleshwar
          </h2>
          <p className="text-muted-foreground mb-8 text-base leading-7">
            Use the links below to browse villas by type — each page lists every available villa in that category with full details, amenities, and WhatsApp booking.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORY_LINKS.map((cat) => {
              const count = villas.filter((v) => v.category === cat.key).length
              return (
                <Link
                  key={cat.slug}
                  href={`/villas/category/${cat.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-background px-5 py-4 hover:border-primary hover:bg-primary/5 transition-all duration-200"
                >
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">
                      {cat.label} in Mahabaleshwar
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{count} properties available</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-background border-t border-border">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h2 className="font-playfair text-2xl font-bold text-foreground">
            Need help choosing the right villa?
          </h2>
          <p className="text-muted-foreground">
            Tell us your group size, dates, and budget on WhatsApp — we'll find the best option for you instantly.
          </p>
          <a
            href="https://wa.me/919921372661?text=Hi, I am looking for a villa in Mahabaleshwar. Can you help me find the right one?"
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
