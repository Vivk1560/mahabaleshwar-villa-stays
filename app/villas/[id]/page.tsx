// app/villas/[id]/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// FIXES in this version:
//  1. Google Maps embed now uses villa.address in the q= param (not hardcoded coords)
//  2. startingPrice field displayed in booking sidebar when present in villa data
//  3. WhatsApp number standardised to 919921372661 throughout
//  4. VacationRental + BreadcrumbList + FAQPage schemas preserved from original
// ─────────────────────────────────────────────────────────────────────────────

import Image from 'next/image';
import Link from 'next/link';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { ReviewCard } from '@/components/ReviewCard';
import { RelatedVillas } from '@/components/RelatedVillas';
import { TrustBadges } from '@/components/TrustBadges';
import { StickyInquiryBar } from '@/components/StickyInquiryBar';
import { Star, MapPin, Users, MessageCircle, Phone, ChevronRight, Home } from 'lucide-react';
import villas from '@/lib/data/villas.json';
import reviews from '@/lib/data/reviews.json';
import { notFound } from 'next/navigation';
import { getVillaGuideLinks } from '@/lib/internal-links';
import { buildMetadata, dedupeKeywords } from '@/lib/seo/metadata';
import { buildImageAltText, getImageSizes } from '@/lib/images';
import { JsonLd } from '@/components/seo/json-ld';
import { RelatedLinks } from '@/components/seo/RelatedLinks';
import { buildBreadcrumbSchema, buildFaqSchema, buildVacationRentalSchema } from '@/lib/seo/schema';

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

  const title =
    villa.seoTitle || `${villa.name} - Luxury Villa in Mahabaleshwar`
  const description =
    villa.seoDescription ||
    `${villa.description} Experience luxury at ${villa.name} with valley views and premium amenities.`

  return buildMetadata({
    title,
    description,
    path: `/villas/${resolvedParams.id}`,
    image: villa.images.listing,
    imageAlt: `${villa.name} - ${villa.bhk} luxury villa in Mahabaleshwar`,
    keywords: dedupeKeywords(
      [
        villa.name,
        'Mahabaleshwar villa',
        'luxury stay',
        villa.location,
      ],
      [
        `${villa.bhk} villa Mahabaleshwar`,
        'Mahabaleshwar vacation rentals',
        'private pool villa Mahabaleshwar',
      ]
    ),
  });
}

export default async function VillaDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const villa = villas.find((v) => v.id === resolvedParams.id);
  if (!villa) {
    notFound();
  }

  const villaReviews = reviews.filter((r) => r.villa === villa.id).slice(0, 3);
  const villaReviewsForSchema = reviews.filter((r) => r.villa === villa.id);
  const bookingMessage = `Hi, I am interested in booking ${villa.name} in Mahabaleshwar. Please share availability, best rate, and any current offers for my dates.`;

  // ── FIX: Build a per-villa Maps embed URL using the villa's actual address ──
  // Encodes the address string so it works in the Maps embed query param.
  // This replaces the previous hardcoded generic Mahabaleshwar center coords.
  const mapsAddress = encodeURIComponent(`${villa.address}, Mahabaleshwar, Maharashtra 412806`);

  // Fallback: if no Maps API key is available, use a search-based embed
  // that still shows the correct location without a key:
  const mapsEmbedFallback = `https://maps.google.com/maps?q=${mapsAddress}&output=embed&z=15`;

  return (
    <main className="min-h-screen bg-background">
      <JsonLd
        data={buildVacationRentalSchema({
          id: villa.id,
          name: villa.name,
          description: villa.seoDescription || villa.description,
          address: villa.address,
          location: villa.location,
          priceRange: villa.priceRange,
          bhk: villa.bhk,
          capacity: villa.capacity,
          rating: villa.rating,
          geo: villa.geo,
          listingImage: villa.images.listing,
          galleryImages: villa.images.gallery,
          amenities: villa.amenities,
          reviews: villaReviewsForSchema,
        })}
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: 'Home', item: '/' },
          { name: 'Villas', item: '/villas' },
          { name: villa.name, item: `/villas/${villa.id}` },
        ])}
      />
      {villa.faqs && villa.faqs.length > 0 && (
        <JsonLd data={buildFaqSchema(villa.faqs)} />
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
                alt={buildImageAltText({
                  subject: villa.name,
                  context: 'luxury villa hero image',
                  feature: villa.amenities.includes('Valley View')
                    ? 'with valley views'
                    : 'with premium amenities',
                  location: 'Mahabaleshwar',
                })}
                fill
                priority
                sizes={getImageSizes('gallery')}
                className="object-cover hover:scale-105 transition duration-500"
                quality={85}
              />
            </div>
            {villa.images.gallery.slice(0, 7).map((image, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden bg-muted min-h-[150px] md:min-h-[300px]"
              >
              <Image
                src={image}
                alt={buildImageAltText({
                  subject: villa.name,
                  context: 'gallery image',
                  feature: villa.amenities[index] || 'interior view',
                  location: villa.location,
                })}
                fill
                sizes={getImageSizes('thumbnail')}
                className="object-cover hover:scale-105 transition duration-500"
                loading="lazy"
                quality={72}
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

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/919921372661?text=${encodeURIComponent(bookingMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Check availability
                  </a>
                  <a
                    href="tel:8080557611"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary px-5 py-3 font-semibold text-primary hover:bg-primary/5 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call now
                  </a>
                </div>

                <TrustBadges
                  title="Why guests book this villa"
                  badges={[
                    'Direct local support',
                    'Private stay for your group',
                    'Fast WhatsApp response',
                    'Trusted by real guests',
                  ]}
                />
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

              {/* FAQ */}
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

              <RelatedLinks
                title="Helpful guides for this stay"
                description={`These guides connect ${villa.name} with the right travel planning topics and strengthen the category path for ${villa.category.replace(/-/g, ' ')}.`}
                links={getVillaGuideLinks(villa.category)}
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

              {/* ── FIX: Map now uses per-villa address instead of generic coords ── */}
              <div className="space-y-4">
                <h2 className="font-playfair text-3xl font-bold text-foreground">Location</h2>
                <div className="w-full h-80 rounded-lg overflow-hidden border border-border">
                  <iframe
                    src={mapsEmbedFallback}
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

                  {/* ── FIX: Show starting price if present in villa data ── */}
                  {'startingPrice' in villa && villa.startingPrice && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-bold text-lg">
                        ₹
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                          Starting From
                        </p>
                        <p className="font-semibold text-foreground text-base mt-0.5">
                          {villa.startingPrice as string}
                          <span className="text-xs text-muted-foreground font-normal ml-1">/ night</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Varies by season & group size
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-border" />

                <TrustBadges
                  badges={[
                    'Direct booking with local support',
                    'Private villa for your group',
                    'Fast WhatsApp response',
                  ]}
                />

                <a
                  href={`https://wa.me/919921372661?text=${encodeURIComponent(bookingMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-5 md:px-6 py-4 md:py-5 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-lg text-center text-base md:text-lg flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Inquiry
                </a>

                <a
                  href="tel:8080557611"
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
      <StickyInquiryBar villaName={villa.name} />
    </main>
  );
}
