import Image from 'next/image';
import Link from 'next/link';
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

export const metadata = {
  title: 'Mahabaleshwar Villa Stays - Luxury Villas & Vacation Rentals',
  description: 'Discover premium luxury villas in Mahabaleshwar with breathtaking valley views. Experience personalized hospitality with 25+ curated villa properties.',
  keywords: 'Mahabaleshwar villas, luxury villas, vacation rentals, hill station resorts, boutique villas, Mahabaleshwar stays',
  viewport: { width: 'device-width', initialScale: 1 },
  openGraph: {
    title: 'Mahabaleshwar Villa Stays - Luxury Villas & Vacation Rentals',
    description: 'Discover premium luxury villas in Mahabaleshwar with breathtaking valley views.',
    type: 'website',
  },
};

export default function Home() {
  const featuredVillas = villas.slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      <NavBar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-28 md:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Luxury Villas in Mahabaleshwar with Valley Views"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-start justify-center min-h-[420px] md:min-h-[600px]">
            {/* Content */}
            <div className="space-y-4 md:space-y-6 text-white max-w-2xl pr-4 md:pr-0">
              <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                Luxury Villas in Mahabaleshwar
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-white/95 leading-relaxed max-w-xl">
                Experience unparalleled comfort with breathtaking valley views and world-class hospitality. Curated villas for your perfect hill station escape.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6">
                <PremiumButton size="lg" href="/villas" className="bg-primary text-primary-foreground hover:bg-primary/85 hover:shadow-2xl shadow-lg hover:scale-105 transition-all duration-300">
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

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-secondary/10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: '🏠', label: '25 Curated Villas', color: 'text-primary' },
              { icon: '🌄', label: 'Valley Views', color: 'text-accent' },
              { icon: '⛰️', label: 'Premium Location', color: 'text-secondary' },
              { icon: '✨', label: 'Luxury Amenities', color: 'text-primary' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 md:p-6 text-center hover:shadow-card transition-shadow">
                <div className={`text-3xl md:text-4xl mb-2 ${item.color}`}>{item.icon}</div>
                <p className="font-semibold text-foreground text-sm md:text-base">{item.label}</p>
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
                Mahabaleshwar Villa Stays offers handpicked properties in one of India's most scenic hill stations. Each villa is curated to provide exceptional comfort while maintaining authentic local charm and hospitality.
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Enjoy breathtaking valley sunsets, cool mountain air, and seamless access to local attractions. Perfect for families, couples, and groups seeking an unforgettable escape with premium amenities.
              </p>
              <PremiumButton href="/about">Learn More About Us</PremiumButton>
            </div>
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/villa-listing-2.jpg"
                alt="Luxury Villa in Mahabaleshwar"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Villas Section */}
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
                pricePerNight={villa.pricePerNight}
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

      {/* Why Choose Us Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle title="Why Choose Mahabaleshwar Villa Stays" />
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            {[
              {
                number: '25',
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
              <div key={idx} className="bg-card border border-border rounded-lg p-6 text-center space-y-3 hover:shadow-card transition-shadow">
                <div className="text-4xl font-playfair font-bold text-primary">{item.number}</div>
                <h3 className="font-playfair font-bold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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
              href="https://wa.me/9921372661"
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
