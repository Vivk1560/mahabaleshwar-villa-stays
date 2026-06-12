// app/contact/page.tsx

import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { ContactFormLazy } from '@/components/ContactFormLazy'
import { TrustBadges } from '@/components/TrustBadges';
import { buildMetadata, dedupeKeywords } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/json-ld';
import { buildBreadcrumbSchema, buildLocalBusinessSchema } from '@/lib/seo/schema';

export function generateMetadata() {
const title = 'Book a Villa in Mahabaleshwar – Contact Rajesh Directly'
const description =
  'WhatsApp or call Rajesh Garela to book a private villa in Mahabaleshwar. Same-day availability confirmation, no OTA markup, direct host booking from ₹11,999/night.'

  return buildMetadata({
    title,
    description,
    path: '/contact',
    image: '/images/villa-listing-2.jpg',
    imageAlt: 'Contact Mahabaleshwar Villa Stays',
    keywords: dedupeKeywords(
      ['contact Mahabaleshwar Villa Stays', 'WhatsApp booking', 'villa inquiry'],
      ['concierge service', 'Mahabaleshwar']
    ),
  })
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Structured Data */}
      <JsonLd data={buildLocalBusinessSchema()} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: 'Contact', item: '/contact' },
        ])}
      />

      <NavBar />

      {/* Header */}
      <section className="pt-20 pb-12 md:pt-24 md:pb-16 px-4 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-playfair text-3xl md:text-5xl font-bold text-foreground mb-3 md:mb-4 leading-tight">
            Book a Villa in Mahabaleshwar
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about our villas? We&apos;re here to help! Contact us anytime for
            instant WhatsApp booking.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 md:mb-10">
            <TrustBadges
              title="What you get when you enquire"
              badges={[
                'Direct WhatsApp response',
                'Local Mahabaleshwar support',
                'Best-match villa suggestions',
                'No platform fees',
              ]}
            />
          </div>
          <ContactFormLazy />
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
