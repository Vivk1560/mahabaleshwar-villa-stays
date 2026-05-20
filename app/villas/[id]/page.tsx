import Image from 'next/image';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { ReviewCard } from '@/components/ReviewCard';
import { PremiumButton } from '@/components/PremiumButton';
import { Star, MapPin, Users, Wifi, UtensilsCrossed, MessageCircle, Phone } from 'lucide-react';
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
  return {
    title: `${villa.name} - Luxury Villa in Mahabaleshwar | Mahabaleshwar Villa Stays`,
    description: `${villa.description} Experience luxury at ${villa.name} with valley views and premium amenities. Personalized booking and concierge service available.`,
    keywords: `${villa.name}, Mahabaleshwar villa, luxury stay, ${villa.location}, Mahabaleshwar vacation rentals`,
  };
}

export default async function VillaDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const villa = villas.find((v) => v.id === resolvedParams.id);
  if (!villa) {
    notFound();
  }

  const villaReviews = reviews.filter((r) => r.villa === villa.id).slice(0, 3);

  const amenityIcons: Record<string, React.ReactNode> = {
    WiFi: <Wifi className="w-5 h-5" />,
    Kitchen: <UtensilsCrossed className="w-5 h-5" />,
  };

  return (
    <main className="min-h-screen bg-background">
      <NavBar />

      {/* Image Gallery */}
      <section className="pt-16 md:pt-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Main Gallery Grid - 5 Images */}
          {/* Premium Gallery Grid - 8 Images */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 rounded-2xl overflow-hidden shadow-elevated">

  {/* Main Large Image */}
  <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden bg-muted min-h-[320px] md:min-h-[620px]">
    <Image
      src={villa.images.listing}
      alt={`${villa.name} - Main image`}
      fill
      className="object-cover hover:scale-105 transition duration-500"
    />
  </div>

  {/* Gallery Images */}
  {villa.images.gallery.slice(0, 7).map((image, index) => (
    <div
      key={index}
      className="relative rounded-2xl overflow-hidden bg-muted min-h-[150px] md:min-h-[300px]"
    >
      <Image
        src={image}
        alt={`${villa.name} - Gallery image ${index + 1}`}
        fill
        className="object-cover hover:scale-105 transition duration-500"
      />
    </div>
  ))}
</div>
        </div>
      </section>

      {/* Villa Details */}
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

              {/* Description */}
              <div>
                <h2 className="font-playfair text-2xl font-bold text-foreground mb-3">
                  About this Villa
                </h2>
                <p className="text-lg text-foreground leading-relaxed">{villa.description}</p>
              </div>

              {/* Amenities */}
              <div className="space-y-4">
                <h2 className="font-playfair text-3xl font-bold text-foreground">
                  Amenities
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {villa.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 bg-white border border-border rounded-lg p-5 hover:shadow-sm transition-shadow"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        {amenityIcons[amenity] || <span className="text-sm font-semibold">✓</span>}
                      </div>
                      <span className="text-foreground font-semibold text-base">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              {villaReviews.length > 0 && (
                <div className="space-y-4">
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

              {/* Map Placeholder */}
              <div className="space-y-4">
                <h2 className="font-playfair text-3xl font-bold text-foreground">Location</h2>
                <div className="w-full h-80 bg-muted border border-border rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground font-medium">{villa.location}, Mahabaleshwar</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Booking */}
            <div className="md:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 md:p-8 md:sticky md:top-24 space-y-8">
                {/* Header */}
                <div className="text-center space-y-3">
                  <p className="font-playfair text-2xl md:text-3xl font-bold text-foreground">Plan Your Stay</p>
                  <p className="text-sm text-muted-foreground">Personalized booking experience</p>
                </div>

                <div className="border-t border-border" />

                {/* Capacity */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Guest Capacity</p>
                      <p className="font-semibold text-foreground text-base mt-0.5">Up to {villa.capacity} guests</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border" />

                {/* Primary CTA - WhatsApp */}
                <a
                  href={`https://wa.me/9921372661?text=I am interested in booking ${villa.name}. Please share details and availability.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-5 md:px-6 py-4 md:py-5 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:shadow-lg text-center text-base md:text-lg flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Inquiry
                </a>

                {/* Secondary CTA - Call */}
                <a
                  href={`tel:8080557611`}
                  className="w-full px-5 md:px-6 py-3 md:py-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-all duration-300 text-center text-sm md:text-base flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>

                {/* Trust Message */}
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
