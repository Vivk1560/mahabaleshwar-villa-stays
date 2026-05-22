// app/contact/page.tsx

import type { Metadata } from 'next';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us — WhatsApp Villa Inquiry',
  description:
    'Contact Mahabaleshwar Villa Stays. Reach us via WhatsApp, call, or email for villa inquiries. 24/7 concierge support available.',
  keywords:
    'contact Mahabaleshwar Villa Stays, WhatsApp booking, villa inquiry, concierge service, Mahabaleshwar',
  alternates: {
    canonical: 'https://www.mahabaleshwarvillastays.com/contact',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.mahabaleshwarvillastays.com/contact',
    siteName: 'Mahabaleshwar Villa Stays',
    title: 'Contact Us | Mahabaleshwar Villa Stays',
    description:
      'Contact Mahabaleshwar Villa Stays. Reach us via WhatsApp, call, or email for villa inquiries. 24/7 concierge support available.',
    images: [
      {
        url: 'https://www.mahabaleshwarvillastays.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Mahabaleshwar Villa Stays',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Mahabaleshwar Villa Stays',
    description:
      'Reach us via WhatsApp, call, or email for villa inquiries. 24/7 concierge support available.',
    images: ['https://www.mahabaleshwarvillastays.com/og-image.jpg'],
  },
};

// ✅ LocalBusiness JSON-LD — Google reads this to verify NAP consistency
// with your Google Business Profile. Must match exactly.
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Mahabaleshwar Villa Stays',
  url: 'https://www.mahabaleshwarvillastays.com',
  telephone: '+918080557611',
  email: 'rajeshgarela0@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Bhilar, Panchgani Mahabaleshwar Road',
    addressLocality: 'Satara',
    addressRegion: 'Maharashtra',
    postalCode: '412806',
    addressCountry: 'IN',
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
    telephone: '+918080557611',
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi', 'Marathi'],
  },
  priceRange: '₹₹₹',
  image: 'https://www.mahabaleshwarvillastays.com/og-image.jpg',
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
      item: 'https://www.mahabaleshwarvillastays.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Contact',
      item: 'https://www.mahabaleshwarvillastays.com/contact',
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
