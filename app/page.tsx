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

export const metadata: Metadata = {
  title: 'Luxury Villas & Vacation Rentals in Mahabaleshwar',

  description:
    'Discover 25+ premium luxury villas in Mahabaleshwar with breathtaking valley views. Pool villas, family villas, couple villas & group villas. Direct WhatsApp booking.',

  keywords: [
    'Mahabaleshwar villas',
    'luxury villas Mahabaleshwar',
    'vacation rentals Mahabaleshwar',
    'family villas Mahabaleshwar',
    'couple villa Mahabaleshwar',
    'pool villas Mahabaleshwar',
    'group stay Mahabaleshwar',
    'hill station villa Maharashtra',
    'villa near Mapro Garden',
    'budget villa Mahabaleshwar',
  ],

  alternates: {
    canonical: 'https://www.mahabaleshwarvillastays.com',
  },

  openGraph: {
    title: 'Luxury Villas & Vacation Rentals in Mahabaleshwar',
    description:
      'Discover 25+ premium luxury villas in Mahabaleshwar. Pool villas, family villas, couple villas & group villas. Direct WhatsApp booking.',
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
    title: 'Luxury Villas & Vacation Rentals in Mahabaleshwar',
    description:
      'Discover 25+ premium luxury villas in Mahabaleshwar with breathtaking valley views.',
    images: ['https://www.mahabaleshwarvillastays.com/og-image.jpg'],
  },
};

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
    const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How many villas does Mahabaleshwar Villa Stays offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer 25+ premium curated villas including pool villas, family villas, couple villas, group villas, valley view villas, and budget villas across Mahabaleshwar and Panchgani.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I book a villa in Mahabaleshwar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can book directly via WhatsApp at +91-9921372661 or call us at 8080557611.',
      },
    },
    {
      '@type': 'Question',
      name: 'What amenities are available in your Mahabaleshwar villas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our villas include valley views, private pools, WiFi, hot water, parking, power backup, indoor games, BBQ areas, and caretaker availability.',
      },
    },
  ],
};
  return (
    <main className="min-h-screen bg-background">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(faqSchema),
  }}
/>

      <NavBar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-28 md:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Luxury villas in Mahabaleshwar with breathtaking valley views"
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
                Experience unparalleled comfort with breathtaking valley views and world-class hospitality.
                25+ curated villas for your perfect hill station escape.
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

      {/* SEO Intro Section */}
      <section className="py-16 bg-background px-4">
        <div className="max-w-5xl mx-auto text-center space-y-6">

          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground">
            Discover the Best Luxury Villas in Mahabaleshwar
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed">
            Escape into the serene hills of Mahabaleshwar with premium private villas
            designed for unforgettable experiences. Whether you are planning a romantic
            getaway, a family vacation, a corporate retreat, or a weekend trip with
            friends, Mahabaleshwar Villa Stays offers handpicked luxury villas with
            breathtaking valley views, private pools, spacious living areas, and
            modern amenities.
          </p>

          <p className="text-muted-foreground text-lg leading-relaxed">
            Located near popular attractions like Mapro Garden, Venna Lake, Wilson
            Point, Lingmala Waterfall, and Panchgani, our curated villa stays provide
            the perfect balance of comfort, privacy, and nature. Enjoy cool mountain
            weather, scenic sunrise points, strawberry farms, bonfire evenings, and
            peaceful escapes in the heart of Maharashtra’s most loved hill station.
          </p>

        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-secondary/10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

            {[
              { icon: '🏠', label: '25+ Curated Villas', color: 'text-primary' },
              { icon: '🌄', label: 'Valley Views', color: 'text-accent' },
              { icon: '⛰️', label: 'Premium Location', color: 'text-secondary' },
              { icon: '✨', label: 'Luxury Amenities', color: 'text-primary' },
            ].map((item, idx) => (

              <div
                key={idx}
                className="bg-white rounded-lg p-4 md:p-6 text-center hover:shadow-card transition-shadow"
              >
                <div className={`text-3xl md:text-4xl mb-2 ${item.color}`}>
                  {item.icon}
                </div>

                <p className="font-semibold text-foreground text-sm md:text-base">
                  {item.label}
                </p>
              </div>

            ))}

          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-20 bg-background px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">

            <div className="space-y-6">
              <SectionTitle
                title="Experience Mahabaleshwar Luxury"
                subtitle="Where Comfort Meets Nature"
                centered={false}
              />

              <p className="text-foreground text-base md:text-lg leading-relaxed">
                Mahabaleshwar Villa Stays offers handpicked properties in one of India&apos;s
                most scenic hill stations. Each villa is curated to provide exceptional
                comfort while maintaining authentic local charm and hospitality.
              </p>

              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Enjoy breathtaking valley sunsets, cool mountain air, and seamless access
                to local attractions like Mapro Garden, Venna Lake and Wilson Point.
                Perfect for families, couples, and groups seeking an unforgettable escape.
              </p>

              <PremiumButton href="/about">
                Learn More About Us
              </PremiumButton>
            </div>

            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/villa-listing-2.jpg"
                alt="Premium luxury villa interior in Mahabaleshwar"
                fill
                className="object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Featured Villas */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4">

          <SectionTitle
            title="Featured Villas"
            subtitle="Handpicked selections showcasing the best of Mahabaleshwar"
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
              Explore All Villas
              <ArrowRight className="w-5 h-5" />
            </PremiumButton>
          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">

          <SectionTitle title="Why Choose Mahabaleshwar Villa Stays" />

          <div className="grid md:grid-cols-4 gap-6 mt-12">

            {[
              {
                number: '25+',
                title: 'Premium Villas',
                description: 'Carefully curated selection of luxury villas for unforgettable experiences',
              },
              {
                number: '24/7',
                title: 'Concierge Support',
                description: 'Round-the-clock assistance for all your needs and inquiries',
              },
              {
                number: '100%',
                title: 'Guest Satisfaction',
                description: 'Proven track record of exceptional hospitality and service',
              },
              {
                number: '15+',
                title: 'Years Experience',
                description: 'Deep local knowledge and expertise in Mahabaleshwar tourism',
              },
            ].map((item, idx) => (

              <div
                key={idx}
                className="bg-card border border-border rounded-lg p-6 text-center space-y-3 hover:shadow-card transition-shadow"
              >
                <div className="text-4xl font-playfair font-bold text-primary">
                  {item.number}
                </div>

                <h3 className="font-playfair font-bold text-foreground">
                  {item.title}
                </h3>

                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>

            ))}

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4">

          <SectionTitle
            title="Guest Testimonials"
            subtitle="Hear from our delighted guests"
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

     {/* FAQ Section */}
<section className="py-20 bg-background">
  <div className="max-w-5xl mx-auto px-4">

    <SectionTitle
      title="Frequently Asked Questions"
      subtitle="Everything you need to know about booking luxury villas in Mahabaleshwar"
    />

    <div className="mt-12 space-y-5">

      {[
        {
          q: 'How many villas does Mahabaleshwar Villa Stays offer?',
          a: 'We offer 25+ carefully curated luxury villas in Mahabaleshwar and Panchgani including pool villas, family villas, couple villas, group villas, budget villas, and premium valley-view stays.',
        },
        {
          q: 'How do I book a villa in Mahabaleshwar?',
          a: 'You can directly contact us via WhatsApp or phone call for personalized booking assistance. Our team helps you choose the perfect villa based on your budget, group size, and travel preferences.',
        },
        {
          q: 'Do your villas have private swimming pools?',
          a: 'Yes, many of our premium villas include private swimming pools with scenic valley views. Pool villa availability depends on the property you choose.',
        },
        {
          q: 'Which are the best areas to stay in Mahabaleshwar?',
          a: 'Our villas are located near popular areas like Bhilar, Panchgani Road, Mapro Garden, Venna Lake, and scenic valley-facing locations offering peaceful surroundings and easy access to tourist attractions.',
        },
        {
          q: 'Are your villas suitable for family vacations?',
          a: 'Absolutely. We offer spacious family villas with multiple bedrooms, kitchens, indoor games, gardens, parking, and caretaker services — ideal for family vacations and reunions.',
        },
        {
          q: 'Do you offer villas for large groups and corporate outings?',
          a: 'Yes, we have multiple large villas suitable for bachelor trips, corporate retreats, birthday celebrations, and group vacations with capacities ranging from small groups to 25+ guests.',
        },
        {
          q: 'What amenities are included in the villas?',
          a: 'Amenities vary by property but commonly include WiFi, hot water, power backup, private pools, mountain views, parking, BBQ areas, caretaker support, indoor games, kitchens, and spacious living areas.',
        },
        {
          q: 'Are pets allowed in your Mahabaleshwar villas?',
          a: 'Pet policies depend on the specific villa. Some properties are pet-friendly while others may have restrictions. Please contact us before booking if you plan to bring pets.',
        },
        {
          q: 'What is the best time to visit Mahabaleshwar?',
          a: 'Mahabaleshwar is beautiful throughout the year. October to June is ideal for sightseeing and pleasant weather, while monsoon season offers lush greenery and misty valley views.',
        },
        {
          q: 'How far are your villas from tourist attractions?',
          a: 'Most of our villas are conveniently located near major attractions like Mapro Garden, Venna Lake, Wilson Point, Lingmala Waterfall, and local strawberry farms.',
        },
      ].map((faq, idx) => (

        <details
          key={idx}
          className="group bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
        >
          <summary className="flex items-center justify-between cursor-pointer list-none">

            <h3 className="font-playfair text-lg md:text-xl font-bold text-foreground pr-4">
              {faq.q}
            </h3>

            <span className="text-primary text-2xl font-bold transition-transform duration-300 group-open:rotate-45">
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10 border-y border-border">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">

          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground">
            Ready to Book Your Dream Villa?
          </h2>

          <p className="text-lg text-muted-foreground">
            Contact us today and let us help you plan the perfect getaway to Mahabaleshwar
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">

            <PremiumButton size="lg" href="/contact">
              Contact Us Now
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
