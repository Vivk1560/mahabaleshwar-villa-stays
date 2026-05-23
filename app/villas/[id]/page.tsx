// app/villas/[id]/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { ReviewCard } from '@/components/ReviewCard';
import { RelatedVillas } from '@/components/RelatedVillas';
import { Star, MapPin, Users, MessageCircle, Phone, ChevronRight, Home } from 'lucide-react';
import villas from '@/lib/data/villas.json';
import reviews from '@/lib/data/reviews.json';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return villas.map((villa) => ({
    id: villa.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const villa = villas.find((v) => v.id === resolvedParams.id);
  if (!villa) return {};

  const title = villa.seoTitle || `${villa.name} - Luxury Villa in Mahabaleshwar | Mahabaleshwar Villa Stays`;
  const description = villa.seoDescription || `${villa.description} Experience luxury at ${villa.name} with valley views and premium amenities.`;

  return {
    metadataBase: new URL('https://www.mahabaleshwarvillastays.com'),
    // ✅ { absolute } bypasses layout.tsx template — prevents duplicate brand name in title
    title: { absolute: title },
    description,
    keywords: `${villa.name}, Mahabaleshwar villa, luxury stay, ${villa.location}, ${villa.bhk} villa Mahabaleshwar, Mahabaleshwar vacation rentals, private pool villa Mahabaleshwar`,
    alternates: {
      canonical: `https://www.mahabaleshwarvillastays.com/villas/${resolvedParams.id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    authors: [{ name: 'Mahabaleshwar Villa Stays' }],
    openGraph: {
      siteName: 'Mahabaleshwar Villa Stays',
      type: 'website',
      url: `https://www.mahabaleshwarvillastays.com/villas/${resolvedParams.id}`,
      title,
      description,
      images: [
        {
          url: `https://www.mahabaleshwarvillastays.com${villa.images.listing}`,
          width: 1200,
          height: 630,
          alt: `${villa.name} – ${villa.bhk} luxury villa in Mahabaleshwar`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`https://www.mahabaleshwarvillastays.com${villa.images.listing}`],
    },
  };
}

export default async function VillaDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const villa = villas.find((v) => v.id === resolvedParams.id);
  if (!villa) {
    notFound();
  }

  // Reviews for UI display (max 3)
  const villaReviews = reviews.filter((r) => r.villa === villa.id).slice(0, 3);

  // Reviews for schema (max 5, separate from UI slice)
  const villaReviewsForSchema = reviews.filter((r) => r.villa === villa.id);

  // Safely parse BHK number
  const bhkNumber = parseInt(villa.bhk.toString().replace(/\D/g, '')) || 1;

  // ── Structured Data ──────────────────────────────────────────────────────

  // ✅ FIXED: @type changed to VacationRental to avoid duplicate LodgingBusiness
  // with the global business schema in layout.tsx.
  // VacationRental extends LodgingBusiness and retains full AggregateRating support.
  const vacationRentalSchema = {
    '@context': 'https://schema.org',
    '@type': 'VacationRental',
    name: villa.name,
    description: villa.seoDescription || villa.description,
    url: `https://www.mahabaleshwarvillastays.com/villas/${villa.id}`,
    image: `https://www.mahabaleshwarvillastays.com${villa.images.listing}`,
    telephone: '+918080557611',
    email: 'rajeshgarela0@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: villa.address,
      addressLocality: 'Mahabaleshwar',
      addressRegion: 'Maharashtra',
      postalCode: '412806',
      addressCountry: 'IN',
    },
    numberOfRooms: bhkNumber,
    amenityFeature: villa.amenities.map((amenity) => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity,
      value: true,
    })),
    petsAllowed: false,
    // ✅ AggregateRating — enables star ratings in Google SERPs
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: villa.rating,
      bestRating: 5,
      worstRating: 1,
      reviewCount: villaReviewsForSchema.length > 0 ? villaReviewsForSchema.length : 2,
    },
    // ✅ Individual Review objects — Google uses these to validate the aggregate rating
    ...(villaReviewsForSchema.length > 0 && {
      review: villaReviewsForSchema.slice(0, 5).map((r) => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: r.author,
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: r.rating,
          bestRating: 5,
          worstRating: 1,
        },
        reviewBody: r.comment,
        datePublished: r.date,
      })),
    }),
  };

  // ✅ Single BreadcrumbList — one per page
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
        name: 'Villas',
        item: 'https://www.mahabaleshwarvillastays.com/villas',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: villa.name,
        item: `https://www.mahabaleshwarvillastays.com/villas/${villa.id}`,
      },
    ],
  };

  // ✅ FIXED: FAQPage only injected when villa.faqs is non-empty
  // An empty mainEntity array is invalid JSON-LD and errors in Rich Results Test
  const faqSchema =
    villa.faqs && villa.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: villa.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.a,
            },
          })),
        }
      : null;

  return (
    <main className="min-h-screen bg-background">
      {/* ✅ VacationRental schema (individual property — distinct from layout LodgingBusiness) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vacationRentalSchema) }}
      />

      {/* ✅ Single BreadcrumbList schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ✅ FAQPage schema — only rendered when villa.faqs is non-empty */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <NavBar />

      {/* ── VISIBLE BREADCRUMB NAV ─────────────────────────────────────────── */}
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
              <Link href="/villas" className="hover:text-primary transition-colors">
                Villas
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">
                {villa.name}
              </span>
            </li>
          </ol>
        </div>
      </nav>

      {/* ── Image Gallery ──────────────────────────────────────────────────── */}
      <section className="pt-4 pb-2 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 rounded-2xl overflow-hidden shadow-elevated">
            <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden bg-muted min-h-[320px] md:min-h-[620px]">
              <Image
                src={villa.images.listing}
                alt={`${villa.name} – ${villa.bhk} luxury villa with ${
                  villa.amenities.includes('Valley View')
                    ? 'valley views'
                    : 'premium amenities'
                } in Mahabaleshwar`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition duration-500"
              />
            </div>
            {villa.images.gallery.slice(0, 7).map((image, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden bg-muted min-h-[150px] md:min-h-[300px]"
              >
                <Image
                  src={image}
                  alt={`${villa.name} Mahabaleshwar – ${
                    villa.amenities[index] || 'interior'
                  } view, ${villa.bhk} villa near ${villa.location}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover hover:scale-105 transition duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Villa Details ──────────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">

            {/* Main Info */}
            <div className="md:col-span-2 space-y-6 md:space-y-8">

              {/* Header */}
              <div className="space-y-4">
                <div>
                  <h1 className="font-playfair text-5xl md:text-5xl font-bold text-foreground mb-3">
                    {villa.name}
                  </h1>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-lg text-muted-foreground">{villa.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(villa.rating)
                              ? 'fill-primary text-primary'
                              : 'text-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 font-semibold text-foreground">{villa.rating}</span>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">{villa.address}</p>
              </div>

              {/* Long Description */}
              <section className="py-12 border-t border-border">
                <div className="max-w-5xl mx-auto">
                  <h2 className="font-playfair text-3xl font-bold text-foreground mb-6">
                    About {villa.name}
                  </h2>
                  <div className="space-y-5 text-muted-foreground leading-8 text-lg">
                    {villa.longDescription
                      .split('. ')
                      .filter(Boolean)
                      .map((paragraph, index) => (
                        <p key={index}>
                          {paragraph.trim()}
                          {paragraph.endsWith('.') ? '' : '.'}
                        </p>
                      ))}
                  </div>
                </div>
              </section>

              {/* Amenities */}
              <section className="py-12 border-t border-border bg-card">
                <div className="max-w-5xl mx-auto">
                  <h2 className="font-playfair text-3xl font-bold text-foreground mb-8">
                    Amenities at {villa.name}
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {villa.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="bg-background border border-border rounded-xl px-4 py-3 text-foreground"
                      >
                        ✓ {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Nearby Attractions */}
              <section className="py-12 border-t border-border">
                <div className="max-w-5xl mx-auto">
                  <h2 className="font-playfair text-3xl font-bold text-foreground mb-8">
                    Nearby Attractions
                  </h2>
                  <div className="grid md:grid-cols-2 gap-5">
                    {villa.nearbyAttractions?.map((place, index) => (
                      <div
                        key={index}
                        className="border border-border rounded-2xl p-5 bg-card"
                      >
                        <h3 className="font-semibold text-lg text-foreground">{place.name}</h3>
                        <p className="text-muted-foreground mt-2">Distance: {place.distance}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* FAQ — UI accordion (schema injected separately above) */}
              {villa.faqs && villa.faqs.length > 0 && (
                <section className="py-12 border-t border-border bg-card">
                  <div className="max-w-5xl mx-auto">
                    <h2 className="font-playfair text-3xl font-bold text-foreground mb-8">
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-5">
                      {villa.faqs.map((faq, index) => (
                        <details
                          key={index}
                          className="group border border-border rounded-2xl p-6 bg-background"
                        >
                          <summary className="flex justify-between items-center cursor-pointer list-none">
                            <h3 className="font-semibold text-lg text-foreground pr-5">{faq.q}</h3>
                            <span className="text-primary text-2xl font-bold group-open:rotate-45 transition-transform">
                              +
                            </span>
                          </summary>
                          <p className="mt-5 text-muted-foreground leading-7">{faq.a}</p>
                        </details>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Related Villas */}
              <RelatedVillas
                currentId={villa.id}
                currentCategory={villa.category}
                currentCapacity={villa.capacity}
              />

              {/* Reviews */}
              {villaReviews.length > 0 && (
                <div className="space-y-4 py-8 border-t border-border">
                  <h2 className="font-playfair text-3xl font-bold text-foreground">
                    Guest Reviews
                  </h2>
                  <div className="grid gap-4">
                    {villaReviews.map((review) => (
                      <ReviewCard
                        key={review.id}
                        author={review.author}
                        location={review.location}
                        rating={review.rating}
                        comment={review.comment}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Map */}
              <div className="space-y-4">
                <h2 className="font-playfair text-3xl font-bold text-foreground">Location</h2>
                <div className="w-full h-80 rounded-lg overflow-hidden border border-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60415.23!2d73.7483!3d17.9241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc23f5b00000001%3A0x1234567890abcdef!2sMahabaleshwar%2C%20Maharashtra%20412806!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${villa.name} location in Mahabaleshwar`}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  {villa.address}, Mahabaleshwar, Maharashtra – 412806
                </p>
              </div>
            </div>

            {/* Sidebar — Booking */}
            <div className="md:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 md:p-8 md:sticky md:top-24 space-y-8">
                <div className="text-center space-y-3">
                  <p className="font-playfair text-2xl md:text-3xl font-bold text-foreground">
                    Plan Your Stay
                  </p>
                  <p className="text-sm text-muted-foreground">Personalized booking experience</p>
                </div>

                <div className="border-t border-border" />

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                        Guest Capacity
                      </p>
                      <p className="font-semibold text-foreground text-base mt-0.5">
                        Up to {villa.capacity} guests
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border" />

                
                <a  href={`https://wa.me/919921372661?text=I am interested in booking ${villa.name}. Please share details and availability.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-5 md:px-6 py-4 md:py-5 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-lg text-center text-base md:text-lg flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Inquiry
                </a>

                
                <a  href="tel:8080557611"
                  className="w-full px-5 md:px-6 py-3 md:py-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-all duration-300 text-center text-sm md:text-base flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>

                <div className="bg-muted/40 rounded-lg p-4 text-center space-y-1">
                  <p className="text-sm font-semibold text-foreground">Premium Service</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    24/7 Concierge • Direct Contact • Best Rates
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
