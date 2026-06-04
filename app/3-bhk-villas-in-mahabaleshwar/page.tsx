// app/3-bhk-villas-in-mahabaleshwar/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Semantic SEO landing page — "3 BHK Villas in Mahabaleshwar"
// URL: /3-bhk-villas-in-mahabaleshwar
// Intent: small families, couples, weekend groups (4–10 guests)
// Content: ~2200 words | 20 FAQs | full schema | internal linking
// ─────────────────────────────────────────────────────────────────────────────

import Link from 'next/link'
import { ChevronRight, Home, MessageCircle, Phone } from 'lucide-react'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { FloatingButtons } from '@/components/FloatingButtons'
import { JsonLd } from '@/components/seo/json-ld'
import { buildMetadata, dedupeKeywords } from '@/lib/seo/metadata'
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildItemListSchema,
} from '@/lib/seo/schema'

// ── Metadata ──────────────────────────────────────────────────────────────────

export function generateMetadata() {
  return buildMetadata({
    title: '3 BHK Villas in Mahabaleshwar | Private 3 Bedroom Villa Stays',
    description:
      'Book 3 BHK villas in Mahabaleshwar with private pool, AC rooms & caretaker. Perfect for small families, couples & weekend groups of 6–12 guests. Direct WhatsApp booking.',
    path: '/3-bhk-villas-in-mahabaleshwar',
    image: '/images/villa-listing-1.jpg',
    imageAlt: '3 BHK villa in Mahabaleshwar with private pool and valley views',
    keywords: dedupeKeywords(
      [
        '3 BHK villas in Mahabaleshwar',
        '3 bedroom villa Mahabaleshwar',
        '3 BHK villa stay Mahabaleshwar',
        'private 3 BHK villa Mahabaleshwar',
        '3 BHK villa with pool Mahabaleshwar',
      ],
      [
        'small family villa Mahabaleshwar',
        'couple villa Mahabaleshwar',
        'weekend villa Mahabaleshwar',
        'villa for 6 guests Mahabaleshwar',
        'villa for 8 guests Mahabaleshwar',
        'private villa Mahabaleshwar',
        'villa near Mapro Garden',
        'hill station villa Maharashtra',
        'Panchgani villa stay',
        'weekend getaway from Pune villa',
        'affordable villa Mahabaleshwar',
        'pool villa Mahabaleshwar',
      ]
    ),
  })
}

// ── FAQ Data ──────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'What is a 3 BHK villa in Mahabaleshwar?',
    a: 'A 3 BHK villa in Mahabaleshwar is a private property with three bedrooms, a full common living area, a kitchen, and typically a private garden or pool exclusively for your group. Unlike a hotel, the entire villa is booked for your group — no shared spaces with other guests.',
  },
  {
    q: 'How many guests can stay in a 3 BHK villa in Mahabaleshwar?',
    a: 'Most 3 BHK villas in Mahabaleshwar comfortably accommodate 6 to 12 guests, depending on the bed configuration and available mattresses. Some villas support up to 14 guests with additional bedding. Always confirm capacity with us before booking.',
  },
  {
    q: 'Do 3 BHK villas in Mahabaleshwar have private pools?',
    a: 'Yes, several 3 BHK villas in our collection include a private swimming pool exclusively for your group. The pool is not shared with other guests, so you can use it at any hour without scheduling constraints.',
  },
  {
    q: 'Are 3 BHK villas in Mahabaleshwar suitable for couples?',
    a: 'Absolutely. A 3 BHK villa gives couples more space than they need, which makes for a genuinely relaxed stay — one room for sleeping, one as a private lounge or workspace, and a third if friends or family join. Private pool and bonfire setups make these properties particularly popular for honeymoon and anniversary trips.',
  },
  {
    q: 'Are 3 BHK villas in Mahabaleshwar good for small families?',
    a: 'Yes — a 3 BHK villa is the most common choice for small families of 4 to 8 people visiting Mahabaleshwar. One bedroom for parents, one for children, and a third for grandparents or a guest gives the family natural separation without booking multiple hotel rooms.',
  },
  {
    q: 'How far are 3 BHK villas from Mapro Garden in Mahabaleshwar?',
    a: 'Depending on the specific villa, most properties in our collection are located 5 to 20 minutes from Mapro Garden. We can recommend the closest option based on your preference during inquiry.',
  },
  {
    q: 'Do 3 BHK villas in Mahabaleshwar include a caretaker?',
    a: 'Yes, all villas in our collection include a dedicated caretaker who manages the property, pool upkeep, and guest requirements during your stay. The caretaker is available throughout your visit.',
  },
  {
    q: 'Are meals included in 3 BHK villa bookings in Mahabaleshwar?',
    a: 'Meal arrangements vary by villa. Some 3 BHK villas include a professional cook who prepares vegetarian and non-vegetarian meals on request. Others have a fully equipped kitchen where guests can cook independently. We confirm this during booking.',
  },
  {
    q: 'What is the best time to book a 3 BHK villa in Mahabaleshwar?',
    a: 'October to February is the peak season with cool weather, clear views, and strawberry season from December to March. Monsoon between June and September offers dramatic green landscapes and waterfalls. Summer is pleasant compared to plains. Book at least 2–3 weeks in advance during peak season and long weekends.',
  },
  {
    q: 'Can I book a 3 BHK villa in Mahabaleshwar for a weekend trip from Pune?',
    a: 'Yes — Mahabaleshwar is approximately 120 km and 3 to 4 hours from Pune, making it an ideal weekend destination. Many guests book 3 BHK villas for Friday evening to Sunday stays. Weekend availability moves fast, so early inquiry is recommended.',
  },
  {
    q: 'Do 3 BHK villas in Mahabaleshwar allow pets?',
    a: 'Some villas are pet-friendly while others have restrictions. Please mention your pet during inquiry so we can shortlist properties with garden spaces and owner approval for pets.',
  },
  {
    q: 'What amenities are typically available in a 3 BHK villa in Mahabaleshwar?',
    a: 'Standard amenities across most 3 BHK villas include air-conditioned bedrooms, a private pool, WiFi, a fully equipped kitchen or cook service, a garden or lawn, parking, power backup, indoor games, and a bonfire setup area. Specific amenities vary by property.',
  },
  {
    q: 'Can we arrange a bonfire at a 3 BHK villa in Mahabaleshwar?',
    a: 'Yes — bonfire evenings are one of the most popular experiences during winter and monsoon visits to Mahabaleshwar. Most 3 BHK villas have dedicated bonfire areas in the garden or lawn. The caretaker handles the setup.',
  },
  {
    q: 'How do I book a 3 BHK villa in Mahabaleshwar directly?',
    a: 'WhatsApp or call us with your travel dates, group size, and any specific requirements like a private pool, valley view, or proximity to Mapro Garden. We recommend suitable villas, share photos and pricing, and confirm availability the same day — no platform fees.',
  },
  {
    q: 'Is a 3 BHK villa cheaper than booking multiple hotel rooms in Mahabaleshwar?',
    a: 'For a group of 6 or more, a private 3 BHK villa is almost always more economical per person than equivalent hotel rooms, while offering significantly more space, a private pool, and a caretaker. The per-head math changes decisively in the villa\'s favour once you split across 8 to 12 guests.',
  },
  {
    q: 'Are 3 BHK villas in Mahabaleshwar suitable for office trips or corporate groups?',
    a: 'A 3 BHK villa works well for a small corporate team of 8 to 12 people. The private setting, WiFi, and common areas support informal meetings and team bonding. For larger corporate groups, 4 BHK or 5 BHK villas offer more space.',
  },
  {
    q: 'What tourist places are near 3 BHK villas in Mahabaleshwar?',
    a: 'Most 3 BHK villas in our portfolio are within easy reach of Mapro Garden (5–15 min), Venna Lake (8–22 min), Wilson Point (12–25 min), Lingmala Waterfall (10–20 min), Panchgani Table Land (20–30 min), and Pratapgad Fort (20–30 min).',
  },
  {
    q: 'Do 3 BHK villas in Mahabaleshwar have valley views?',
    a: 'Several 3 BHK villas are positioned on elevated sites with open valley views of the Sahyadri ranges. If a valley-facing pool or terrace view is important to you, mention it during inquiry and we will shortlist matching properties.',
  },
  {
    q: 'Can a 3 BHK villa in Mahabaleshwar be booked for a birthday celebration?',
    a: 'Yes — 3 BHK villas are popular for small birthday parties of 10 to 15 guests. The private pool, garden, bonfire area, and cook service make for a complete celebration setting. Inform us of the occasion during booking and the caretaker can coordinate basic decoration and cake delivery.',
  },
  {
    q: 'Is there a difference between a 3 BHK villa stay and a 3 BHK hotel suite in Mahabaleshwar?',
    a: 'A significant one. A 3 BHK villa gives you complete privacy — the entire property exclusively for your group, your own pool, your own garden, and no shared hotel corridors or lobbies. A hotel suite offers services but also shared common areas and other guests throughout the property. Most guests who try a private villa do not return to hotels for group stays.',
  },
]

// ── Villa highlights (entity content) ────────────────────────────────────────

const highlights = [
  {
    emoji: '🛏️',
    title: 'Three Private Bedrooms',
    body: 'Each bedroom is air-conditioned with attached or shared bathrooms. Configurations vary — twin beds, double beds, or a mix — so confirm the setup during inquiry if bed type matters for your group.',
  },
  {
    emoji: '🏊',
    title: 'Private Swimming Pool',
    body: 'Most 3 BHK villas in our collection include a private pool reserved exclusively for your group. No other guests. No pool schedule. The pool is yours for the full duration of the stay.',
  },
  {
    emoji: '🌄',
    title: 'Valley Views & Sahyadri Settings',
    body: 'Several properties are positioned on elevated sites with open valley views of the Sahyadri ranges. A pool that appears to float above the valley — this is the core visual experience of a Mahabaleshwar villa stay.',
  },
  {
    emoji: '🍳',
    title: 'Cook or Fully Equipped Kitchen',
    body: 'Some 3 BHK villas include a professional cook who prepares meals per your preferences. Others have full kitchen setups where guests cook independently. Both options are available — specify your preference during inquiry.',
  },
  {
    emoji: '🔥',
    title: 'Bonfire Evenings',
    body: 'A bonfire setup in the garden or terrace is one of the most requested experiences for Mahabaleshwar stays, especially during winter. The caretaker handles setup — guests handle the conversation.',
  },
  {
    emoji: '📍',
    title: 'Close to Key Attractions',
    body: 'Mapro Garden, Venna Lake, Wilson Point, and Lingmala Waterfall are all within easy reach. A 3 BHK villa near the Panchgani–Mahabaleshwar corridor gives you access to both hill stations in a single stay.',
  },
]

// ── Who books 3 BHK villas ─────────────────────────────────────────────────────

const useCases = [
  {
    title: 'Small Families (4–8 Guests)',
    body: 'One bedroom per generation — parents, children, grandparents — with a shared pool and garden that brings everyone together. Mahabaleshwar\'s proximity to Mumbai and Pune makes it a natural school-holiday destination for small families who want privacy without a resort price tag.',
  },
  {
    title: 'Couples & Honeymoon Stays',
    body: 'A 3 BHK villa gives couples far more than they need — and that spaciousness is the point. A private pool, a misty valley morning, a cook who handles breakfast so you can sleep through the fog. Several 3 BHK properties also work well for two couples travelling together.',
  },
  {
    title: 'Friend Groups & Weekend Trips',
    body: 'Groups of 6 to 10 friends from Pune or Mumbai increasingly prefer a private villa weekend over hotels. The math is simple: split a 3 BHK villa across 8 people and the per-head cost is lower than a hotel room, with a private pool and garden included.',
  },
  {
    title: 'Small Reunions & Celebrations',
    body: 'Birthday weekends, anniversary celebrations, and small family reunions all work well in a 3 BHK villa. The private compound means celebrations do not affect other guests, and the caretaker can coordinate additional arrangements on request.',
  },
]

// ── Nearby attractions ────────────────────────────────────────────────────────

const nearbyAttractions = [
  { name: 'Mapro Garden', distance: '5–15 min', note: 'Strawberry products, restaurant, farm visits' },
  { name: 'Venna Lake', distance: '8–22 min', note: 'Boating, horse riding, lakeside food' },
  { name: 'Wilson Point', distance: '12–25 min', note: 'Best sunrise viewpoint in Mahabaleshwar' },
  { name: 'Lingmala Waterfall', distance: '10–20 min', note: 'Forest walk, peak flow in monsoon' },
  { name: 'Panchgani Table Land', distance: '20–30 min', note: 'Asia\'s second-largest volcanic plateau' },
  { name: 'Pratapgad Fort', distance: '20–30 min', note: '17th-century Maratha fort, ridge views' },
]

// ── Page Component ─────────────────────────────────────────────────────────────

export default function ThreeBHKVillasMahabaleshwarPage() {
  const WHATSAPP_URL =
    'https://wa.me/919921372661?text=Hi%2C%20I%20am%20looking%20for%20a%203%20BHK%20villa%20in%20Mahabaleshwar.%20Can%20you%20help%20me%20find%20the%20right%20one%3F'

  return (
    <main className="min-h-screen bg-background">
      {/* ── Schema ──────────────────────────────────────────────────────────── */}
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: '3 BHK Villas in Mahabaleshwar', item: '/3-bhk-villas-in-mahabaleshwar' },
        ])}
      />
      <JsonLd data={buildFaqSchema(faqs)} />
      <JsonLd
        data={buildItemListSchema({
          name: '3 BHK Villas in Mahabaleshwar',
          description: 'Private 3 bedroom villas in Mahabaleshwar for small families, couples and weekend groups',
          items: [
            { name: 'Luxury Villas in Mahabaleshwar', url: '/luxury-villas-in-mahabaleshwar' },
            { name: 'Private Pool Villas in Mahabaleshwar', url: '/private-pool-villas-in-mahabaleshwar' },
            { name: 'Family Villas in Mahabaleshwar', url: '/villas-for-family-in-mahabaleshwar' },
            { name: 'Villas Near Mapro Garden', url: '/villas-near-mapro-garden' },
          ],
        })}
      />

      <NavBar />

      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
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
              <span className="text-foreground font-medium">3 BHK Villas in Mahabaleshwar</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="pt-8 pb-12 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              3 Bedroom Private Villa Stays
            </p>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground leading-tight">
              3 BHK Villas in Mahabaleshwar
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              Private 3 bedroom villas in Mahabaleshwar with exclusive pools, valley views, and caretaker support.
              Ideal for small families, couples, and friend groups of 6 to 12 guests. Direct booking — no platform fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp for Availability
              </a>
              <a
                href="tel:8080557611"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEO Intro Content ────────────────────────────────────────────────── */}
      <section className="py-12 px-4 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto space-y-6 text-muted-foreground text-base md:text-lg leading-8">
          <p>
            A 3 BHK villa in Mahabaleshwar is the most popular configuration for groups that want
            a private stay without the scale of a large group property. Three bedrooms give a small
            family or a group of friends natural separation — sleeping, lounging, and working can
            happen in different rooms — while a shared pool, garden, and common area keep the group
            connected. The result is a stay that feels like a proper home in the hills rather than
            a hotel arrangement stretched across multiple rooms.
          </p>
          <p>
            Mahabaleshwar at 1,353 metres makes the pool experience genuinely different from a
            lowland resort. Morning swims at this elevation are cool and clear, the surrounding
            landscape is green in most seasons, and the valley views that frame many 3 BHK
            properties in this area are the kind that stop guests from checking their phones.
            The Sahyadri ranges on the horizon, the mist that moves through the valleys at dawn,
            and the strawberry farms that line the roads between the villa and Mapro Garden —
            these are the details that make a 3 BHK villa in Mahabaleshwar more than just
            a place to sleep.
          </p>
          <p>
            Our collection of 3 bedroom private villas spans locations across Mahabaleshwar,
            Panchgani, and Bhilar. Some are positioned close to Mapro Garden for convenience;
            others sit higher on the plateau with valley-facing pools and quieter surroundings.
            All properties include a dedicated caretaker, AC bedrooms, and private parking.
            Booking is direct via WhatsApp — we recommend the best available property for your
            dates and group after a short conversation.
          </p>
          <p>
            Whether you are planning a small family vacation, a romantic couple escape, a group
            of friends from Pune looking for a weekend away, or a birthday celebration for 10 people,
            a 3 BHK villa in Mahabaleshwar solves the accommodation question cleanly.
            The per-person cost, split across 8 to 12 guests, typically comes out lower than
            comparable hotel rooms — with a private pool, garden, and bonfire area included.
          </p>
        </div>
      </section>

      {/* ── Highlights Grid ──────────────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-playfair text-3xl font-bold text-foreground mb-3 text-center">
            What to Expect in a 3 BHK Villa in Mahabaleshwar
          </h2>
          <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
            Every 3 bedroom villa in our collection is personally vetted. Here is what the standard setup looks like.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="bg-card border border-border rounded-2xl p-6 space-y-3 hover:border-primary/40 hover:shadow-md transition-all duration-300"
              >
                <div className="text-3xl">{item.emoji}</div>
                <h3 className="font-playfair text-lg font-bold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who Books a 3 BHK Villa ───────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">
            Who Books 3 BHK Villas in Mahabaleshwar
          </h2>
          <p className="text-muted-foreground mb-10 leading-relaxed max-w-3xl">
            Three bedrooms works across a surprising range of travel styles. Here are the most common groups
            who book this category and why the configuration suits them.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="bg-background border border-border rounded-2xl p-6 space-y-3"
              >
                <h3 className="font-playfair text-xl font-bold text-foreground">{uc.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{uc.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nearby Attractions ───────────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">
            Attractions Near 3 BHK Villas in Mahabaleshwar
          </h2>
          <p className="text-muted-foreground mb-10 leading-relaxed max-w-3xl">
            Every major attraction in Mahabaleshwar is within easy reach of our villa locations.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearbyAttractions.map((place) => (
              <div
                key={place.name}
                className="bg-card border border-border rounded-2xl p-5 space-y-2"
              >
                <h3 className="font-semibold text-foreground">{place.name}</h3>
                <p className="text-primary text-sm font-semibold">📍 {place.distance}</p>
                <p className="text-muted-foreground text-sm">{place.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Internal Linking — Related Collections ──────────────────────────── */}
      <section className="py-12 px-4 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-playfair text-2xl font-bold text-foreground mb-3">
            Explore Related Villa Collections
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            Browse the wider collection if you need a different size, feature, or location focus.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Luxury Villas in Mahabaleshwar', href: '/luxury-villas-in-mahabaleshwar', emoji: '🏡', sub: 'Premium properties with top-tier views' },
              { label: 'Private Pool Villas', href: '/private-pool-villas-in-mahabaleshwar', emoji: '🏊', sub: 'Exclusive pool for your group only' },
              { label: 'Family Villas in Mahabaleshwar', href: '/villas-for-family-in-mahabaleshwar', emoji: '👨‍👩‍👧‍👦', sub: 'Spacious stays for 15–25 guests' },
              { label: 'Villas Near Mapro Garden', href: '/villas-near-mapro-garden', emoji: '🍓', sub: 'Minutes from the main sightseeing corridor' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col gap-2 rounded-2xl border border-border bg-background p-5 hover:border-primary hover:shadow-md hover:bg-primary/5 transition-all duration-200"
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm leading-snug">
                  {item.label}
                </span>
                <span className="text-xs text-muted-foreground">{item.sub}</span>
                <span className="text-xs font-semibold text-primary mt-auto">Browse →</span>
              </Link>
            ))}
          </div>

          {/* BHK size links */}
          <div className="mt-8 pt-8 border-t border-border">
            <h3 className="font-playfair text-xl font-bold text-foreground mb-4">Browse by Bedroom Count</h3>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold">3 BHK Villas</span>
              <Link href="/4-bhk-villas-in-mahabaleshwar" className="px-4 py-2 rounded-full border border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200">
                4 BHK Villas
              </Link>
              <Link href="/5-bhk-villas-in-mahabaleshwar" className="px-4 py-2 rounded-full border border-primary text-primary text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200">
                5 BHK Villas
              </Link>
              <Link href="/budget-villas-in-mahabaleshwar" className="px-4 py-2 rounded-full border border-border text-muted-foreground text-sm font-semibold hover:border-primary hover:text-primary transition-all duration-200">
                Budget Villas
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Book Direct ──────────────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-playfair text-3xl font-bold text-foreground mb-6 text-center">
            Why Book Your 3 BHK Villa Directly with Us
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { stat: '15+', label: 'Years on the Ground', desc: 'We have managed Mahabaleshwar villas since before most platforms existed.' },
              { stat: '0', label: 'Platform Fees', desc: 'Direct WhatsApp booking means you pay the villa rate — nothing else.' },
              { stat: '24/7', label: 'Human Support', desc: 'A real person responds to your inquiry — not a chatbot or a ticket system.' },
              { stat: '100%', label: 'Private Occupancy', desc: 'Your group has the entire 3 BHK villa. No other guests in the property.' },
            ].map((item) => (
              <div key={item.label} className="bg-card border border-border rounded-2xl p-6 text-center space-y-2">
                <p className="font-playfair text-3xl font-bold text-primary">{item.stat}</p>
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section className="py-14 px-4 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">
            Frequently Asked Questions — 3 BHK Villas in Mahabaleshwar
          </h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            Everything you need to know before booking a 3 bedroom private villa in Mahabaleshwar.
          </p>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-background border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none px-6 py-5 select-none">
                  <h3 className="font-playfair text-base md:text-lg font-bold text-foreground pr-4 leading-snug">
                    {faq.q}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 w-7 h-7 rounded-full border border-border bg-card flex items-center justify-center text-primary font-bold text-lg transition-transform duration-300 ease-in-out group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="grid transition-all duration-300 ease-in-out grid-rows-[0fr] group-open:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 pt-1 text-muted-foreground leading-relaxed text-base">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 to-accent/10 border-y border-border">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground">
            Ready to Book a 3 BHK Villa in Mahabaleshwar?
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Tell us your dates, group size, and what matters most — pool, valley view, proximity to
            Mapro Garden, or budget. We will find the right 3 BHK property and confirm availability the same day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
            <Link
              href="/villas"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Browse All Villas
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
      <StickyMobileCTA />
    </main>
  )
}
