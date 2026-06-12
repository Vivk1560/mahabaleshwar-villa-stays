// app/about/page.tsx

import Image from 'next/image';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { SectionTitle } from '@/components/SectionTitle';
import { ReviewCard } from '@/components/ReviewCard';
import { Check } from 'lucide-react';
import aboutData from '@/lib/data/aboutData.json';
import testimonials from '@/lib/data/testimonials.json';
import { buildImageAltText, getImageSizes } from '@/lib/images';
import { buildMetadata, dedupeKeywords } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/json-ld';
import { buildBreadcrumbSchema } from '@/lib/seo/schema';

export function generateMetadata() {
 const title = 'About Mahabaleshwar Villa Stays – Rajesh Garela, Villa Host Since 2015'
const description =
  'Mahabaleshwar Villa Stays is managed by Rajesh Garela, a local villa host with 15+ years in Mahabaleshwar. 25+ handpicked private villas, direct booking, no OTA fees.'
  return buildMetadata({
    title,
    description,
    path: '/about',
    image: '/images/Founder-RajeshGarela.jpeg',
    imageAlt: 'Founder Rajesh Garela - Mahabaleshwar Villa Stays',
    keywords: dedupeKeywords(
      [
        'Mahabaleshwar villas',
        'luxury hospitality',
        'hill station resorts',
      ],
      ['villa collections', 'Mahabaleshwar stays']
    ),
  })
}

// ✅ Person schema for founder — improves E-E-A-T signals
// Google uses this to verify the real person behind the business
const founderSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Rajesh Garela',
  jobTitle: 'Founder & CEO',
  worksFor: {
    '@type': 'Organization',
    name: 'Mahabaleshwar Villa Stays',
    url: 'https://www.mahabaleshwarvillastays.com',
  },
  email: 'rajeshgarela0@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mahabaleshwar',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Structured Data */}
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: 'About', item: '/about' },
        ])}
      />
      <JsonLd data={founderSchema} />

      <NavBar />

      {/* Header Section */}
      <section className="pt-20 pb-12 md:pt-24 md:pb-16 px-4 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-playfair text-3xl md:text-5xl font-bold text-foreground mb-3 md:mb-4 leading-tight">
            About Mahabaleshwar Villa Stays
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Redefining luxury vacation experiences in Mahabaleshwar since 2015
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">
                  Our Mission
                </h2>
                <p className="text-lg text-foreground leading-relaxed">
                  {aboutData.company.mission}
                </p>
              </div>
              <div>
                <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">
                  Our Vision
                </h2>
                <p className="text-lg text-foreground leading-relaxed">
                  {aboutData.company.vision}
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-elevated">
              <Image
                src="/images/villa-listing-1.jpg"
                alt={buildImageAltText({
                  subject: 'Mahabaleshwar villas',
                  context: 'about page image',
                  feature: 'private stay collection',
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

      {/* Founder Section */}
      <section className="py-20 px-4 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Meet Our Founder" centered={true} />
          <div className="grid md:grid-cols-3 gap-12 mt-12 items-center">
            <div className="relative h-80 rounded-lg overflow-hidden shadow-elevated">
              <Image
                src={aboutData.founder.image}
                alt={buildImageAltText({
                  subject: aboutData.founder.name,
                  context: 'founder portrait',
                  location: 'Mahabaleshwar Villa Stays',
                })}
                fill
                className="object-cover"
                sizes={getImageSizes('card')}
                loading="lazy"
                quality={78}
              />
            </div>
            <div className="md:col-span-2 space-y-4">
              <div>
                <h3 className="font-playfair text-3xl font-bold text-foreground mb-1">
                  {aboutData.founder.name}
                </h3>
                <p className="text-primary font-semibold text-lg mb-4">
                  {aboutData.founder.title}
                </p>
              </div>
              <p className="text-lg text-foreground leading-relaxed">
                {aboutData.founder.bio}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Our Core Values"
            subtitle="The principles that guide everything we do"
          />
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {aboutData.values.map((value, idx) => (
              <div
                key={idx}
                className="bg-card border border-border rounded-lg p-8 space-y-3 hover:shadow-card transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-xl font-bold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 px-4 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Why Choose Us" />
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {aboutData.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <Check className="w-5 h-5" />
                </div>
                <p className="text-lg text-foreground">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="What Our Guests Say"
            subtitle="Hear from satisfied visitors"
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

      <Footer />
      <FloatingButtons />
    </main>
  );
}
