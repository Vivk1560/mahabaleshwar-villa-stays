import Image from 'next/image';
import Link from 'next/link';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { PremiumButton } from '@/components/PremiumButton';
import { SectionTitle } from '@/components/SectionTitle';
import { VillaCard } from '@/components/VillaCard';
import { ReviewCard } from '@/components/ReviewCard';
import { TrustBadges } from '@/components/TrustBadges';
import { ArrowRight } from 'lucide-react';
import villas from '@/lib/data/villas.json';
import testimonials from '@/lib/data/testimonials.json';
import { buildImageAltText, getImageSizes } from '@/lib/images';
import { buildMetadata, dedupeKeywords } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/json-ld';
import { buildFaqSchema, buildOrganizationSchema } from '@/lib/seo/schema';

// ── Module-level data (shared by schema + JSX) ────────────────────────────────

const homepageFaqs = [
  {
    q: 'Which are the best luxury villas in Mahabaleshwar for family stays?',
    a: 'Families visiting Mahabaleshwar usually prefer spacious private villas near Mapro Garden, Bhilar, and Panchgani Road because these areas offer peaceful surroundings with quick access to sightseeing points. Our family villas include large lawns, indoor games, caretaker support, private pools, BBQ areas, and multiple bedrooms suitable for children, parents, and senior citizens travelling together.',
  },
  {
    q: 'Do you offer private pool villas in Mahabaleshwar?',
    a: 'Yes, Mahabaleshwar Villa Stays offers multiple private pool villas across Mahabaleshwar and Panchgani including infinity pools, valley-facing pools, heated pools, and large outdoor swimming pools for group stays. These villas are popular for birthdays, weekend parties, bachelor trips, family vacations, and romantic couple stays in the Sahyadri hills.',
  },
  {
    q: 'Which location is best to stay in Mahabaleshwar?',
    a: 'Different travellers prefer different areas depending on their travel style. Villas near Mapro Garden are ideal for sightseeing access and family vacations. Bhilar is quieter and surrounded by strawberry farms and forest landscapes. Panchgani–Mahabaleshwar Road gives access to both hill stations during one trip. Old Mahabaleshwar is preferred by guests who enjoy temples, sunrise points, and nature-focused experiences.',
  },
  {
    q: 'How many villas does Mahabaleshwar Villa Stays offer?',
    a: 'Mahabaleshwar Villa Stays manages 25+ carefully selected villas across Mahabaleshwar, Panchgani, Bhilar, and nearby mountain regions. Our collection includes luxury pool villas, couple-friendly stays, budget group villas, large 8 BHK properties, valley-view homes, forest-facing villas, and peaceful nature retreats suitable for all travel styles and budgets.',
  },
  {
    q: 'How do I book a villa in Mahabaleshwar?',
    a: 'Booking is direct and simple. You can WhatsApp or call us with your travel dates, guest count, budget, and preferences like pool villa, valley view, bonfire setup, or villa near Mapro Garden. Our team personally recommends suitable villas and shares photos, pricing, amenities, and location details without hidden platform charges.',
  },
  {
    q: 'What is the best time to visit Mahabaleshwar?',
    a: 'Mahabaleshwar remains beautiful throughout the year. Winter from October to February offers cold weather, bonfire evenings, strawberry season, and clear sunrise views from Wilson Point. Summer stays pleasant because of the hill station climate. Monsoon between June and September transforms the Sahyadri mountains into lush green valleys filled with waterfalls, misty mornings, and cloud-covered roads.',
  },
  {
    q: 'How far is Mahabaleshwar from Pune?',
    a: 'Mahabaleshwar is approximately 120 km from Pune and usually takes around 3 to 4 hours by road. Most Pune travellers prefer weekend road trips via NH48 through Satara and Wai before entering the scenic mountain roads of Panchgani and Mahabaleshwar.',
  },
  {
    q: 'How far is Mahabaleshwar from Mumbai?',
    a: 'Mahabaleshwar is around 260 km from Mumbai and takes approximately 5 to 6 hours by road via the Mumbai–Pune Expressway and Satara route. Guests from Mumbai usually prefer 2-night or 3-night stays to enjoy sightseeing points, local food, boating at Venna Lake, and peaceful villa experiences in the hills.',
  },
  {
    q: 'Which are the best tourist places near your villas in Mahabaleshwar?',
    a: 'Most villas are located close to famous attractions including Mapro Garden, Venna Lake, Wilson Point, Lingmala Waterfall, Arthur Seat, Kate\'s Point, Elephant\'s Head Point, Panchgani Table Land, and Old Mahabaleshwar Temple. Depending on the villa location, these attractions are usually within a 5–25 minute drive.',
  },
  {
    q: 'Do you offer villas near Mapro Garden in Mahabaleshwar?',
    a: 'Yes, many of our villas are located near Mapro Garden which is one of Mahabaleshwar\'s most visited attractions. Guests staying nearby enjoy quick access to strawberry cream, sandwiches, pizzas, chocolate products, strawberry farms, and scenic Panchgani Road drives.',
  },
  {
    q: 'Are your villas suitable for large groups and corporate outings?',
    a: 'Yes, we offer multiple large villas in Mahabaleshwar with capacities ranging from 15 to 30 guests. These villas are ideal for corporate retreats, college trips, birthdays, anniversaries, bachelor parties, and extended family gatherings. Many include lawns, bonfire spaces, BBQ areas, caretaker support, parking, and indoor entertainment zones.',
  },
  {
    q: 'Can we arrange bonfire and BBQ nights at the villa?',
    a: 'Yes, bonfire evenings are among the most popular experiences during winter and monsoon stays in Mahabaleshwar. Many villas include dedicated bonfire setups, valley-facing seating areas, open lawns, BBQ counters, and outdoor dining spaces where guests enjoy the cool mountain weather late into the night.',
  },
  {
    q: 'Are your villas suitable for couples and honeymoon trips?',
    a: 'Absolutely. Several villas are specially preferred by couples because of their peaceful surroundings, private pools, misty valley views, candlelight dinner setups, sunrise decks, and forest-facing balconies. Monsoon fog and winter evenings make Mahabaleshwar especially romantic for honeymoon stays and anniversaries.',
  },
  {
    q: 'Do your villas provide WiFi and workation facilities?',
    a: 'Yes, all villas provide WiFi connectivity and many properties are suitable for workations and long stays. Guests looking for remote work setups usually prefer quieter villas in Bhilar and Panchgani areas because of the calm environment, scenic surroundings, and peaceful mountain atmosphere.',
  },
  {
    q: 'Can we visit strawberry farms near the villas?',
    a: 'Yes, many villas are surrounded by strawberry farms in Bhilar, Panchgani, and Old Mahabaleshwar. During strawberry season from December to March, guests can enjoy fresh strawberry picking, mulberry cream, farm visits, homemade jams, syrups, and local fruit experiences unique to the region.',
  },
  {
    q: 'What local food is famous in Mahabaleshwar?',
    a: 'Mahabaleshwar is famous for strawberry with cream, mulberry cream, hot corn patties, makka frankies, cheese sandwiches from Mapro Garden, fresh carrot sticks, local jams, malai gola, sweet corn snacks, and hot tea sold at sunrise and sunset viewpoints. Venna Lake and Wilson Point are especially popular for local street food experiences.',
  },
  {
    q: 'What makes Mahabaleshwar a popular weekend getaway?',
    a: 'Mahabaleshwar is one of Maharashtra\'s most loved hill stations because of its cool climate, mist-covered valleys, scenic mountain roads, waterfalls, strawberry farms, boating experiences, horse riding, sunrise points, and peaceful nature retreats. Its accessibility from Pune and Mumbai makes it a perfect weekend escape from city life.',
  },
  {
    q: 'Do your villas include parking facilities?',
    a: 'Yes, all villas include private parking facilities within or near the property compound. Large group villas are designed to accommodate multiple vehicles comfortably, and caretakers help coordinate parking arrangements during busy weekends and festive periods.',
  },
  {
    q: 'Are pets allowed at your villas in Mahabaleshwar?',
    a: 'Some villas are pet-friendly while others have restrictions depending on the property layout and owner policies. Guests travelling with pets should mention it during enquiry so we can recommend suitable villas with garden spaces and safer open areas for pets.',
  },
  {
    q: 'Why choose a private villa instead of a hotel in Mahabaleshwar?',
    a: 'Private villas offer a much more relaxed and personal experience compared to hotels. Guests enjoy complete privacy, private swimming pools, bonfire evenings, open lawns, scenic terraces, mountain views, group-friendly spaces, and peaceful stays without crowded hotel environments. Villas are especially preferred for family bonding, celebrations, and nature-focused vacations.',
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

export function generateMetadata() {
  const title = 'Luxury Villas in Mahabaleshwar'
  const description =
    'Book 25+ handpicked private villas in Mahabaleshwar and Panchgani. Pool villas, family stays, couple retreats, and group escapes near Mapro Garden with direct WhatsApp booking.'

  return buildMetadata({
    title,
    description,
    path: '/',
    image: '/images/villa-listing-1.jpg',
    imageAlt: 'Luxury villa stays in Mahabaleshwar',
    keywords: dedupeKeywords(
      [
        'Mahabaleshwar villas',
        'luxury villas Mahabaleshwar',
        'villa stay Mahabaleshwar',
        'family villas Mahabaleshwar',
        'couple villa Mahabaleshwar',
        'pool villas Mahabaleshwar',
        'group stay Mahabaleshwar',
      ],
      [
        'hill station villa Maharashtra',
        'villa near Mapro Garden',
        'Panchgani villa stay',
        'weekend trip from Pune villa',
        'Mahabaleshwar weekend getaway',
        'Western Ghats villa rental',
        'private villa Mahabaleshwar',
      ]
    ),
  })
}

// ── Page Component ────────────────────────────────────────────────────────────

export default function Home() {
  const featuredVillas = villas.slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      <JsonLd data={buildOrganizationSchema()} />
      <JsonLd data={buildFaqSchema(homepageFaqs)} />

      <NavBar />

      {/* ── Hero Section ────────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-20 md:pt-28 md:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt={buildImageAltText({
              subject: 'Private luxury villa',
              context: 'hero image',
              feature: 'with valley views',
              location: 'Mahabaleshwar, Maharashtra',
            })}
            fill
            className="object-cover"
            priority
            sizes={getImageSizes('hero')}
            quality={85}
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

              <TrustBadges
                title="Trusted booking signals"
                badges={[
                  '25+ handpicked villas',
                  'Direct WhatsApp booking',
                  'Local concierge support',
                  'Family, couple & group stays',
                ]}
                className="pt-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SEO Intro Section ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-background px-4">
        <div className="max-w-5xl mx-auto text-center space-y-6">

          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground">
            Private Villa Stays in Mahabaleshwar &amp; Panchgani
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed">
            The difference between a hotel stay and a villa stay in Mahabaleshwar is the difference
            between seeing the valley and actually living in it for a few days. Our{' '}
            <Link
              href="/villas"
              className="text-primary font-medium hover:underline underline-offset-2 transition-colors"
            >
              villas
            </Link>{' '}
            put your group in a private compound — your own pool, your own cook, your own schedule — within
            reach of everything that makes this hill station worth the drive: Mapro Garden, Venna Lake,
            Wilson Point, Lingmala Waterfall, and the winding roads that connect them.
          </p>

          <p className="text-muted-foreground text-lg leading-relaxed">
            The portfolio covers a deliberate range. A family of 25 planning a reunion will find an{' '}
            <Link
              href="/villas/category/family-villas-in-mahabaleshwar"
              className="text-primary font-medium hover:underline underline-offset-2 transition-colors"
            >
              8 BHK family villa
            </Link>{' '}
            on the Mapro Garden road with a BBQ lawn and a professional cook. Two couples
            looking for a quiet weekend escape from Pune will find a{' '}
            <Link
              href="/villas/category/couple-villas-in-mahabaleshwar"
              className="text-primary font-medium hover:underline underline-offset-2 transition-colors"
            >
              3 BHK couple villa
            </Link>{' '}
            with a valley-facing pool and a garden that catches morning light. A college group of 17 on a budget trip will find a{' '}
            <Link
              href="/villas/category/budget-villas-in-mahabaleshwar"
              className="text-primary font-medium hover:underline underline-offset-2 transition-colors"
            >
              full private villa
            </Link>{' '}
            — pool, AC rooms, sports equipment, caretaker — at per-head costs
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
      <section className="py-20 md:py-24 bg-background px-4">
        <div className="max-w-7xl mx-auto">

          <SectionTitle
            title="Why Mahabaleshwar"
            subtitle="A hill station that earns every kilometre of the drive"
          />

          {/* Image + editorial text row */}
          <div className="mt-12 md:mt-14 grid md:grid-cols-2 gap-8 md:gap-12 items-start mb-12 md:mb-16">

            {/* Atmospheric image */}
            <div className="relative w-full h-72 sm:h-80 md:h-[480px] rounded-2xl overflow-hidden shadow-2xl order-last md:order-first">
              <Image
                src="/images/home/lingmala-waterfall-mahabaleshwar-tourism-entry-fee-timings-holidays-reviews-header.jpg"
                alt={buildImageAltText({
                  subject: 'Misty morning valley views',
                  context: 'waterfall landscape',
                  feature: 'with Sahyadri mountain fog at sunrise',
                  location: 'Mahabaleshwar, Maharashtra',
                })}
                fill
                sizes={getImageSizes('gallery')}
                className="object-cover"
                loading="lazy"
                quality={78}
              />
              {/* Subtle gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>

            {/* Editorial text */}
            <div className="space-y-5 text-muted-foreground text-base md:text-lg leading-8">
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
                A{' '}
                <Link
                  href="/villas/category/pool-villas-in-mahabaleshwar"
                  className="text-primary font-medium hover:underline underline-offset-2 transition-colors"
                >
                  private pool villa
                </Link>{' '}
                is simply the format that suits Mahabaleshwar best. The hill
                station rewards slowness — a pool at 7 AM before the fog lifts, a cook handling
                breakfast while you sit with chai watching the mist thin below the terrace, an
                evening bonfire with no checkout pressure. Guests who&apos;ve stayed in a villa here
                consistently say going back to a hotel room afterwards feels like a step in the
                wrong direction.
              </p>
            </div>

          </div>

          {/* Geo fact cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
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

      {/* ── Villa Category Quick Links ────────────────────────────────────────── */}
      <section className="py-14 md:py-16 bg-background px-4 border-b border-border">
        <div className="max-w-7xl mx-auto">

          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground mb-3 text-center">
            Browse Villas by Type
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto text-base">
            Every group is different. Find the right match — from intimate couple stays to large group estates.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {[
              {
                label: 'Pool Villas',
                sub: 'Private swimming pool',
                href: '/villas/category/pool-villas-in-mahabaleshwar',
                emoji: '🏊',
              },
              {
                label: 'Family Villas',
                sub: '15–25 guests',
                href: '/villas/category/family-villas-in-mahabaleshwar',
                emoji: '👨‍👩‍👧‍👦',
              },
              {
                label: 'Couple Villas',
                sub: 'Romantic & private',
                href: '/villas/category/couple-villas-in-mahabaleshwar',
                emoji: '💑',
              },
              {
                label: 'Group Villas',
                sub: 'Office & reunions',
                href: '/villas/category/group-villas-in-mahabaleshwar',
                emoji: '🎉',
              },
              {
                label: 'Valley View',
                sub: 'Panoramic Sahyadri',
                href: '/villas/category/valley-view-villas-in-mahabaleshwar',
                emoji: '🌄',
              },
              {
                label: 'Budget Villas',
                sub: 'Best-value rates',
                href: '/villas/category/budget-villas-in-mahabaleshwar',
                emoji: '✅',
              },
            ].map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 md:p-5 text-center hover:border-primary hover:shadow-md hover:bg-primary/5 transition-all duration-200"
              >
                <span className="text-2xl md:text-3xl">{cat.emoji}</span>
                <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors leading-tight">
                  {cat.label}
                </span>
                <span className="text-xs text-muted-foreground leading-tight">{cat.sub}</span>
              </Link>
            ))}
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
                When you WhatsApp us to ask which{' '}
                <Link
                  href="/villas/category/pool-villas-in-mahabaleshwar"
                  className="text-primary font-medium hover:underline underline-offset-2 transition-colors"
                >
                  pool villa
                </Link>{' '}
                is best for a group of 18 in January, we give you a specific answer — not a list of all pool villas.
              </p>

              <PremiumButton href="/about">
                About Mahabaleshwar Villa Stays
              </PremiumButton>
            </div>

            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/villa-listing-2.jpg"
                alt={buildImageAltText({
                  subject: 'Luxury private villa interior',
                  context: 'editorial image',
                  feature: 'with valley view',
                  location: 'Mahabaleshwar',
                })}
                fill
                className="object-cover"
                sizes={getImageSizes('gallery')}
                loading="lazy"
                quality={78}
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

      {/* ── Blog Teaser ──────────────────────────────────────────────────────── */}
      <section className="py-14 md:py-16 bg-background px-4 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground">
                Travel Guides &amp; Local Insights
              </h2>
              <p className="text-muted-foreground mt-1 text-base">
                Everything you need to plan the perfect Mahabaleshwar trip.
              </p>
            </div>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-200 shrink-0"
            >
              All guides
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {[
              {
                title: 'Monsoon in Mahabaleshwar',
                excerpt: 'What the hill station actually feels like during the rainiest months, plus what changes for villa guests and sightseeing.',
                href: '/blogs/monsoon-in-mahabaleshwar',
                tag: 'Season Guide',
              },
              {
                title: 'Wilson Point Sunrise Guide',
                excerpt: 'When to leave, what to expect, and how to make the early-morning trip worth the alarm.',
                href: '/blogs/wilson-point-sunrise-guide',
                tag: 'Sightseeing',
              },
              {
                title: 'Complete Mahabaleshwar Travel Guide 2026',
                excerpt: 'How to reach, where to stay, what to eat, and what to do — the one guide that covers everything before you pack.',
                href: '/blogs/mahabaleshwar-complete-travel-guide',
                tag: 'Travel Guide',
              },
            ].map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="group block bg-card border border-border rounded-2xl p-5 md:p-6 hover:border-primary/40 hover:shadow-card transition-all duration-300"
              >
                <span className="inline-block text-xs font-semibold text-primary bg-primary/10 rounded-full px-3 py-1 mb-3">
                  {post.tag}
                </span>
                <h3 className="font-playfair text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug mb-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-1.5 mt-4 text-primary text-sm font-semibold group-hover:gap-2.5 transition-all duration-200">
                  Read guide
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
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

          <div className="mt-12 space-y-4">
            {homepageFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none px-6 py-5 select-none">
                  <h3 className="font-playfair text-base md:text-lg font-bold text-foreground pr-4 leading-snug">
                    {faq.q}
                  </h3>
                  {/* Animated chevron icon — pure CSS, no JS, accessible */}
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 w-7 h-7 rounded-full border border-border bg-background flex items-center justify-center text-primary font-bold text-lg transition-transform duration-300 ease-in-out group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                {/*
                  Smooth height animation using CSS grid trick.
                  grid-rows transitions from 0fr (collapsed) to 1fr (open)
                  without JS and without fixed heights.
                */}
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

            <a
              href="https://wa.me/919921372661"
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
