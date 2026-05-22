import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { PremiumButton } from '@/components/PremiumButton';
import { SectionTitle } from '@/components/SectionTitle';
import { VillaCard } from '@/components/VillaCard';
import { ReviewCard } from '@/components/ReviewCard';
import { ArrowRight } from 'lucide-react';
import villas from '@/lib/data/villas.json';
import testimonials from '@/lib/data/testimonials.json';

// ── Module-level data (shared by schema + JSX) ────────────────────────────────

const homepageFaqs = [
  {
    q: 'How many villas does Mahabaleshwar Villa Stays offer?',
    a: 'We manage 25+ handpicked private villas across Mahabaleshwar, Panchgani, and Bhilar — covering pool villas, family estates, couple-friendly stays, large group properties, valley-view retreats, and budget-conscious options. Every property is directly managed, with no third-party platform in between.',
  },
  {
    q: 'How do I book a villa in Mahabaleshwar?',
    a: 'Booking is direct and personal. WhatsApp or call us with your travel dates, group size, and preferences — pool, view direction, proximity to Mapro Garden, or budget. We\'ll shortlist the best available properties and share details within the hour. No hidden fees, no platform markups.',
  },
  {
    q: 'Do your villas have private swimming pools?',
    a: 'Many properties include private pools — valley-facing, infinity-edge, or standard full-sized pools depending on the villa. Pool availability is listed on each villa\'s page. The pool is exclusively for your group during the stay — no shared access.',
  },
  {
    q: 'What is the best time to visit Mahabaleshwar?',
    a: 'Each season has its own character. October through January brings cool, clear weather — ideal for sightseeing, bonfires, and sharp valley views. February through May is warm and pleasant. Monsoon (June–September) transforms the region entirely: waterfalls fill, the plateau turns vivid green, and the misty atmosphere is unlike any other time. December through March is strawberry season.',
  },
  {
    q: 'How far is Mahabaleshwar from Pune?',
    a: 'Approximately 120 km — around 3 hours depending on traffic. Most guests from Pune travel via NH 48 through Satara, or take the more scenic Panchgani route which adds valley views to the drive. Friday afternoon departures are common for weekend stays; an early start helps avoid the mountain road congestion.',
  },
  {
    q: 'How far is Mahabaleshwar from Mumbai?',
    a: 'Around 260 km — typically 5 hours via the Mumbai–Pune Expressway and then through Satara or Panchgani. The Panchgani approach, with its hairpin bends and valley views opening on both sides, is the more scenic route. Most guests from Mumbai book for 2–3 nights to make the drive worthwhile.',
  },
  {
    q: 'Are your villas suitable for family vacations?',
    a: 'Several properties are purpose-built for multi-generational families: spacious BHK layouts, enclosed gardens, children\'s activity areas, indoor games, professional cooks who handle varied dietary preferences, and resident caretakers. Villas near Velocity Park and Mapro Garden are especially popular with families travelling with young children.',
  },
  {
    q: 'Do you offer villas for large groups and corporate outings?',
    a: 'Yes — we have multiple 7–8 BHK properties with 20–25 person capacities, suited for corporate retreats, college trips, bachelor parties, and extended family reunions. Large common areas, stable WiFi, BBQ setups, and caretaker coordination make group logistics manageable without a hotel\'s formality.',
  },
  {
    q: 'Can we arrange a cook at the villa?',
    a: 'Most of our villas include a professional cook as part of the booking. For properties where it\'s an optional add-on, the caretaker coordinates meal arrangements. Share dietary preferences — vegetarian, non-vegetarian, regional cuisine, or specific restrictions — at least a day before arrival for the best preparation.',
  },
  {
    q: 'Can we have a bonfire at the villa?',
    a: 'Yes, most properties have a dedicated bonfire area, and the caretaker arranges setup with advance notice — typically request by late afternoon for an evening fire. October through February, when Mahabaleshwar temperatures drop to 8–12°C after dark, is when the bonfire becomes genuinely essential rather than optional.',
  },
  {
    q: 'Are your villas available to book during monsoon season?',
    a: 'Yes, and monsoon is genuinely one of the most rewarding times to visit. Lingmala and other waterfalls are at their most dramatic. The plateau turns deep green. Clouds drift through the valleys at viewpoint level. Some of our properties are particularly well-suited for monsoon stays — ask us to recommend based on your specific dates.',
  },
  {
    q: 'Are pets allowed at your villas?',
    a: 'Pet policies vary by property. Some villas are pet-friendly; others have restrictions depending on the season or compound setup. Please mention your pets at the time of enquiry so we can match you with a suitable property and confirm current arrangements.',
  },
  {
    q: 'Are the villas suitable for birthday and anniversary celebrations?',
    a: 'Several of our villas are regularly booked for milestone celebrations — significant birthdays, anniversaries, pre-wedding functions, and reunion dinners. The private compound, outdoor spaces, bonfire areas, and proximity to scenic viewpoints create the kind of setting that a hotel banquet hall simply cannot replicate.',
  },
  {
    q: 'How is WiFi and mobile connectivity at your villas?',
    a: 'WiFi is available at all properties and is stable enough for streaming and video calls at most villas. Mobile coverage varies across Mahabaleshwar — Jio and Airtel generally perform best in the region. If connectivity is a priority for a workation stay, mention it when enquiring and we\'ll recommend accordingly.',
  },
  {
    q: 'Is parking available at the villas?',
    a: 'Yes — all properties have dedicated parking within the compound. For large groups arriving in multiple vehicles, the caretaker coordinates parking arrangements in advance. Overflow parking near the gate is available at most properties.',
  },
  {
    q: 'What are the standard check-in and check-out times?',
    a: 'Standard check-in is 12:00 noon and check-out is 11:00 AM. Early check-in and late check-out are subject to availability and should be requested in advance. The caretaker confirms timing details before your arrival date.',
  },
  {
    q: 'Which areas of Mahabaleshwar are best to stay in?',
    a: 'It depends on your priorities. The Mapro Garden belt offers easy access to the hill station\'s most popular attraction — ideal for families. The Panchgani–Mahabaleshwar Road puts you within reach of both hill stations. Bhilar is quieter and more residential, surrounded by strawberry farms. The Satara–Mahabaleshwar Road is scenic and unhurried, with less tourist traffic.',
  },
  {
    q: 'Can we visit strawberry farms near the villa?',
    a: 'Yes — Mahabaleshwar and Bhilar are Maharashtra\'s primary strawberry-growing areas, and fresh picking is available from December through March at farms near most of our properties. The caretaker can direct you to the nearest farms. Mapro Garden, which processes the region\'s strawberry products, is accessible from virtually all our villas within 5–20 minutes.',
  },
  {
    q: 'How far are your villas from tourist attractions?',
    a: 'Most properties are within 5–20 minutes of Mapro Garden, 10–22 minutes from Venna Lake, 12–25 minutes from Wilson Point, and within 15 minutes of Lingmala Waterfall. Panchgani Table Land is 15–30 minutes from Mahabaleshwar-area villas and 5–8 minutes from our Panchgani properties.',
  },
  {
    q: 'What amenities can we expect at your villas?',
    a: 'The standard amenity set across our portfolio includes WiFi, hot water, power inverter backup, fully AC rooms, parking, indoor games, and a resident caretaker. Higher-end properties add private pools, professional cooks, modular kitchens, bonfire areas, BBQ setups, private terraces, and valley views. Full amenity details are listed on each villa\'s individual page.',
  },
];

const attractions = [
  {
    emoji: '🍓',
    name: 'Mapro Garden',
    description:
      'Mahabaleshwar\'s most-visited stop isn\'t a viewpoint — it\'s a garden that sells strawberry products you\'ll think about on the drive home. The Garden Restaurant is one of the most reliable breakfast spots in the hill station, and fresh strawberry counters open early every morning.',
    tag: '5–15 min from most villas',
  },
  {
    emoji: '🚣',
    name: 'Venna Lake',
    description:
      'The town lake where boating has been a hill station ritual for decades. Paddle boats and rowboats are available through the day. The lakeside loop takes a pleasant hour and is noticeably less crowded in the early morning.',
    tag: '8–22 min from most villas',
  },
  {
    emoji: '🌄',
    name: 'Wilson Point',
    description:
      'The highest viewpoint in Mahabaleshwar at 1,439 metres. Sunrise here — visible from around 5:30 AM on clear mornings — is worth arranging a vehicle for the night before. On cloudless October mornings, the view extends across multiple ridge lines.',
    tag: '12–25 min from most villas',
  },
  {
    emoji: '💧',
    name: 'Lingmala Waterfall',
    description:
      'A tiered cascade dropping through dense forest, best experienced between July and October when the monsoon runs it at full volume. The forest walk from the road to the viewing platform is itself a highlight — cool, shaded, and smelling of wet earth.',
    tag: '10–20 min from most villas',
  },
  {
    emoji: '🐘',
    name: "Elephant's Head Point",
    description:
      'Named for the silhouette formed by two converging rocky ridges — most visible in morning light. Consistently quieter than the main tourist viewpoints, which makes it worth the slightly longer drive.',
    tag: '15–20 min from most villas',
  },
  {
    emoji: '🏔️',
    name: 'Panchgani Table Land',
    description:
      "Asia's second-largest volcanic basalt plateau — flat, windswept, and dramatic at 1,334 metres with valley drops on all sides. Horse riding, street food, and the famous strawberry cream stalls make it a half-day in itself.",
    tag: '20–30 min from Mahabaleshwar villas',
  },
  {
    emoji: '🏰',
    name: 'Pratapgad Fort',
    description:
      'A 17th-century Maratha hill fort built by Chhatrapati Shivaji Maharaj, set on a ridge at 1,080 metres. The 500-step climb is steep and entirely worth it — significant history, ridge views, and considerably fewer crowds than the main tourist circuit.',
    tag: '20–30 min from most villas',
  },
];

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Luxury Villas in Mahabaleshwar | Private Pool, Valley View & Family Stays',

  description:
    'Book 25+ handpicked private villas in Mahabaleshwar & Panchgani. Pool villas, family stays, couple retreats & group escapes near Mapro Garden. Direct WhatsApp booking, best rates guaranteed.',

  keywords: [
    'Mahabaleshwar villas',
    'luxury villas Mahabaleshwar',
    'villa stay Mahabaleshwar',
    'family villas Mahabaleshwar',
    'couple villa Mahabaleshwar',
    'pool villas Mahabaleshwar',
    'group stay Mahabaleshwar',
    'hill station villa Maharashtra',
    'villa near Mapro Garden',
    'Panchgani villa stay',
    'weekend trip from Pune villa',
    'Mahabaleshwar weekend getaway',
    'Western Ghats villa rental',
    'private villa Mahabaleshwar',
  ],

  alternates: {
    canonical: 'https://www.mahabaleshwarvillastays.com',
  },

  openGraph: {
    title: 'Luxury Villas in Mahabaleshwar | Private Pool, Valley View & Family Stays',
    description:
      'Book 25+ handpicked private villas in Mahabaleshwar & Panchgani. Pool villas, family stays, couple retreats & group escapes near Mapro Garden. Direct WhatsApp booking.',
    type: 'website',
    images: [
      {
        url: 'https://www.mahabaleshwarvillastays.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Villas in Mahabaleshwar | Private Pool & Valley View Stays',
    description:
      'Book 25+ handpicked private villas in Mahabaleshwar & Panchgani. Pool villas, family stays, couple retreats & group escapes near Mapro Garden.',
    images: ['https://www.mahabaleshwarvillastays.com/og-image.jpg'],
  },
};

// ── Page Component ────────────────────────────────────────────────────────────

export default function Home() {
  const featuredVillas = villas.slice(0, 3);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mahabaleshwar Villa Stays',
    url: 'https://www.mahabaleshwarvillastays.com',
    logo: 'https://www.mahabaleshwarvillastays.com/logo.jpeg',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-8080557611',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Mahabaleshwar Villa Stays',
    url: 'https://www.mahabaleshwarvillastays.com',
  };

  const homepageFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homepageFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-background">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }}
      />

      <NavBar />

      {/* ── Hero Section ────────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-20 md:pt-28 md:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Private luxury villa with valley views in Mahabaleshwar, Maharashtra"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-start justify-center min-h-[420px] md:min-h-[600px]">
            <div className="space-y-4 md:space-y-6 text-white max-w-2xl pr-4 md:pr-0">
              <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                Luxury Villas in Mahabaleshwar
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-white/95 leading-relaxed max-w-xl">
                25+ handpicked private villas across Mahabaleshwar, Panchgani &amp; Bhilar.
                Pool villas, family retreats, couple stays &amp; large group estates — all with direct booking and no platform fees.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6">
                <PremiumButton
                  size="lg"
                  href="/villas"
                  className="bg-primary text-primary-foreground hover:bg-primary/85 hover:shadow-2xl shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Explore Villas
                  <ArrowRight className="w-5 h-5" />
                </PremiumButton>

                <Link
                  href="/contact"
                  className="px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base whitespace-nowrap"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEO Intro Section ────────────────────────────────────────────────── */}
      <section className="py-16 bg-background px-4">
        <div className="max-w-5xl mx-auto text-center space-y-6">

          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground">
            Private Villa Stays in Mahabaleshwar &amp; Panchgani
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed">
            The difference between a hotel stay and a villa stay in Mahabaleshwar is the difference
            between seeing the valley and actually living in it for a few days. Our villas put your
            group in a private compound — your own pool, your own cook, your own schedule — within
            reach of everything that makes this hill station worth the drive: Mapro Garden, Venna Lake,
            Wilson Point, Lingmala Waterfall, and the winding roads that connect them.
          </p>

          <p className="text-muted-foreground text-lg leading-relaxed">
            The portfolio covers a deliberate range. A family of 25 planning a reunion will find an
            8 BHK estate on the Mapro Garden road with a BBQ lawn and a professional cook. Two couples
            looking for a quiet weekend escape from Pune will find a 3 BHK with a valley-facing pool
            and a garden that catches morning light. A college group of 17 on a budget trip will find
            a full private villa — pool, AC rooms, sports equipment, caretaker — at per-head costs
            that split comfortably. Every booking is direct. Every property is personally managed.
          </p>

        </div>
      </section>

      {/* ── Features Strip ───────────────────────────────────────────────────── */}
      <section className="py-10 md:py-14 bg-secondary/10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: '🏠', label: '25+ Curated Villas', sub: 'Mahabaleshwar & Panchgani' },
              { icon: '🌄', label: 'Valley & Mountain Views', sub: 'Sahyadri & Western Ghats' },
              { icon: '💧', label: 'Private Pool Villas', sub: 'Exclusively for your group' },
              { icon: '📲', label: 'Direct WhatsApp Booking', sub: 'No platform fees' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-4 md:p-6 text-center hover:shadow-card transition-shadow"
              >
                <div className="text-3xl md:text-4xl mb-2">{item.icon}</div>
                <p className="font-semibold text-foreground text-sm md:text-base">{item.label}</p>
                <p className="text-muted-foreground text-xs mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Mahabaleshwar Section ─────────────────────────────────────────── */}
      <section className="py-20 bg-background px-4">
        <div className="max-w-7xl mx-auto">

          <SectionTitle
            title="Why Mahabaleshwar"
            subtitle="A hill station that earns every kilometre of the drive"
          />

          <div className="mt-12 grid md:grid-cols-5 gap-8 md:gap-12 items-start">

            {/* Editorial text — 3 cols */}
            <div className="md:col-span-3 space-y-5 text-muted-foreground text-base md:text-lg leading-8">
              <p>
                At 1,353 metres on the edge of the Sahyadri range, Mahabaleshwar occupies a plateau
                that the Western Ghats seem to have designed specifically for escaping. The elevation
                does something to the air that no hill station closer to Pune or Mumbai quite
                replicates — genuinely cool, reliably misty in the early hours, carrying the smell
                of wet forest on most mornings between June and February.
              </p>
              <p>
                The geography here is particular. Five rivers — the Krishna, Koyna, Venna, Savitri,
                and Gayatri — originate on this plateau. That hydrological fact explains the greenery.
                It also explains why Mahabaleshwar looks the way it does in photographs: everything
                here is watered from the source, and the landscape reflects it in every season.
              </p>
              <p>
                From Pune, the drive takes around three hours. The approach through Panchgani — hairpin
                bends with valley views opening on both sides — is the kind of road that makes you stop
                the car mid-climb, even if you&apos;ve driven it before. From Mumbai, it&apos;s five
                hours via the Expressway and then through Satara. Both routes deliver you to a landscape
                that feels entirely disconnected from the urban weight you left behind.
              </p>
              <p>
                Seasons change everything here. Winter brings sharp, clear views and cold evenings that
                make a bonfire genuinely necessary. Monsoon transforms the plateau into something out
                of a documentary — fog at terrace level, waterfalls at full volume, every ridge line
                clarified by the rain. December through March is strawberry season: fresh fruit at
                roadside stalls, cream-topped servings at Mapro Garden, and the specific ritual of
                stopping on the way out of town to buy jam that bears no resemblance to the
                supermarket version.
              </p>
              <p>
                A private villa stay is simply the format that suits Mahabaleshwar best. The hill
                station rewards slowness — a pool at 7 AM before the fog lifts, a cook handling
                breakfast while you sit with chai watching the mist thin below the terrace, an
                evening bonfire with no checkout pressure. Guests who&apos;ve stayed in a villa here
                consistently say going back to a hotel room afterwards feels like a step in the
                wrong direction.
              </p>
            </div>

            {/* Geo fact cards — 2 cols */}
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              {[
                { label: 'Elevation', value: '1,353 m', sub: 'Above sea level' },
                { label: 'From Pune', value: '~3 hrs', sub: '120 km via NH 48' },
                { label: 'From Mumbai', value: '~5 hrs', sub: '260 km via Expressway' },
                { label: 'River Origins', value: '5 Rivers', sub: 'Krishna, Koyna & more' },
                { label: 'Strawberry Season', value: 'Dec–Mar', sub: 'Peak farm season' },
                { label: 'Best Monsoon Views', value: 'Jun–Sep', sub: 'Waterfalls at peak' },
              ].map((fact, idx) => (
                <div
                  key={idx}
                  className="bg-card border border-border rounded-xl p-4 text-center space-y-1"
                >
                  <p className="font-playfair text-xl font-bold text-primary">{fact.value}</p>
                  <p className="font-semibold text-foreground text-sm">{fact.label}</p>
                  <p className="text-muted-foreground text-xs">{fact.sub}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Featured Villas ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4">

          <SectionTitle
            title="Featured Villas"
            subtitle="Three properties from a collection of 25+ across Mahabaleshwar and Panchgani"
          />

          <div className="grid md:grid-cols-3 gap-8 mt-12">
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

          <div className="text-center mt-12">
            <PremiumButton size="lg" href="/villas">
              Browse All Villas
              <ArrowRight className="w-5 h-5" />
            </PremiumButton>
          </div>

        </div>
      </section>

      {/* ── Attractions Grid ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-background px-4">
        <div className="max-w-7xl mx-auto">

          <SectionTitle
            title="What to Do Near Your Villa"
            subtitle="Mahabaleshwar's best destinations, all within easy reach"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-12">
            {attractions.map((place, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-2xl p-5 space-y-3 hover:shadow-card hover:border-primary/30 transition-all duration-300"
              >
                <div className="text-3xl">{place.emoji}</div>
                <h3 className="font-playfair text-base md:text-lg font-bold text-foreground">
                  {place.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {place.description}
                </p>
                <p className="text-xs font-semibold text-primary border-t border-border pt-3">
                  📍 {place.tag}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── About Section ─────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-secondary/10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">

            <div className="space-y-6">
              <SectionTitle
                title="Why Guests Come Back"
                subtitle="15+ years managing Mahabaleshwar's finest private properties"
                centered={false}
              />

              <p className="text-foreground text-base md:text-lg leading-relaxed">
                Mahabaleshwar Villa Stays was built on a straightforward idea: that the people who
                know a hill station best should be the ones finding accommodation for it. Our team
                has been managing properties in this region for over 15 years — long enough to know
                which villas catch the morning light and which have the best sunset axis, which
                caretakers are genuinely responsive, and which locations suit families versus groups
                versus couples.
              </p>

              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Every villa in the portfolio has been personally visited and evaluated. Amenity lists
                are accurate. Distance claims to Mapro Garden and other attractions are verified.
                When you WhatsApp us to ask which pool villa is best for a group of 18 in January,
                we give you a specific answer — not a list of all pool villas.
              </p>

              <PremiumButton href="/about">
                About Mahabaleshwar Villa Stays
              </PremiumButton>
            </div>

            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/villa-listing-2.jpg"
                alt="Interior of a luxury private villa in Mahabaleshwar with valley view"
                fill
                className="object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">

          <SectionTitle title="Why Choose Mahabaleshwar Villa Stays" />

          <div className="grid md:grid-cols-4 gap-6 mt-12">
            {[
              {
                number: '25+',
                title: 'Vetted Villas',
                description:
                  'Every property personally evaluated — amenity lists accurate, distances verified, caretakers assessed.',
              },
              {
                number: '24/7',
                title: 'Direct Support',
                description:
                  'WhatsApp or call us at any hour. No automated responses, no ticket systems — a real person who knows each villa.',
              },
              {
                number: '100%',
                title: 'Private Stays',
                description:
                  'Your group has the entire property. No shared pools, no lobby check-ins, no other guests in the compound.',
              },
              {
                number: '15+',
                title: 'Years on the Ground',
                description:
                  'Deep local knowledge of Mahabaleshwar\'s roads, seasons, attractions, and the properties that deliver on their promise.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-lg p-6 text-center space-y-3 hover:shadow-card transition-shadow"
              >
                <div className="text-4xl font-playfair font-bold text-primary">
                  {item.number}
                </div>
                <h3 className="font-playfair font-bold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────────── */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4">

          <SectionTitle
            title="What Guests Say"
            subtitle="From families and couples to group trips and corporate retreats"
          />

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {testimonials.map((testimonial) => (
              <ReviewCard
                key={testimonial.id}
                author={testimonial.author}
                location={testimonial.location}
                rating={testimonial.rating}
                comment={testimonial.comment}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Section ───────────────────────────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4">

          <SectionTitle
            title="Frequently Asked Questions"
            subtitle="Everything you need to know before booking a villa in Mahabaleshwar"
          />

          <div className="mt-12 space-y-5">
            {homepageFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="font-playfair text-lg md:text-xl font-bold text-foreground pr-4">
                    {faq.q}
                  </h3>
                  <span className="text-primary text-2xl font-bold transition-transform duration-300 group-open:rotate-45 flex-shrink-0">
                    +
                  </span>
                </summary>
                <div className="overflow-hidden transition-all duration-300">
                  <p className="mt-5 text-muted-foreground leading-relaxed text-base">
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA Section ───────────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10 border-y border-border">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">

          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground">
            Ready to Book Your Villa?
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tell us your dates, group size, and what matters most — pool, view, proximity to Mapro Garden,
            or budget. We&apos;ll find the right match and confirm availability the same day.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PremiumButton size="lg" href="/contact">
              Get in Touch
            </PremiumButton>

            
            <a  href="https://wa.me/919921372661"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors inline-flex items-center justify-center gap-2"
            >
              Chat on WhatsApp
            </a>
          </div>

        </div>
      </section>

      <Footer />
      <FloatingButtons />

    </main>
  );
}
