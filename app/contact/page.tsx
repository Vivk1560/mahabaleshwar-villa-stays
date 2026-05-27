// app/contact/page.tsx

import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { ContactForm } from '@/components/ContactForm';
import { buildMetadata, dedupeKeywords, SITE, absoluteUrl } from '@/lib/seo/metadata';

export function generateMetadata() {
  const title = 'Contact Mahabaleshwar Villa Stays'
  const description =
    'Contact Mahabaleshwar Villa Stays via WhatsApp, call, or email for villa inquiries, availability, and concierge support.'

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

// ✅ LocalBusiness JSON-LD — Google reads this to verify NAP consistency
// with your Google Business Profile. Must match exactly.
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: SITE.name,
  url: SITE.url,
  telephone: SITE.contact.phone,
  email: SITE.contact.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.streetAddress,
    addressLocality: SITE.address.addressLocality,
    addressRegion: SITE.address.addressRegion,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.addressCountry,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '17.9241',
    longitude: '73.7483',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '21:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday'],
      opens: '10:00',
      closes: '20:00',
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: SITE.contact.phone,
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi', 'Marathi'],
  },
  priceRange: '₹₹₹',
  image: absoluteUrl(SITE.defaultImage),
};

// ✅ BreadcrumbList — Home > Contact
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE.url,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Contact',
      item: `${SITE.url}/contact`,
    },
  ],
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <NavBar />

      {/* Header */}
      <section className="pt-20 pb-12 md:pt-24 md:pb-16 px-4 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-playfair text-3xl md:text-5xl font-bold text-foreground mb-3 md:mb-4 leading-tight">
            Get in Touch
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
          <ContactForm />
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
