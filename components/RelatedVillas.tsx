// components/RelatedVillas.tsx
// ─────────────────────────────────────────────────────────────────────────────
// SERVER COMPONENT — no 'use client'.
// Picks up to 3 related villas: same category first, then capacity-proximity.
// Used on /villas/[id] page below the FAQ section.
// ─────────────────────────────────────────────────────────────────────────────

import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Users } from 'lucide-react';
import villas from '@/lib/data/villas.json';
import { buildImageAltText, getImageSizes } from '@/lib/images';

interface RelatedVillasProps {
  currentId: string;
  currentCategory: string;
  currentCapacity: number;
}

export function RelatedVillas({
  currentId,
  currentCategory,
  currentCapacity,
}: RelatedVillasProps) {
  // Step 1 — same category, excluding self
  const sameCategory = villas.filter(
    (v) => v.id !== currentId && v.category === currentCategory
  );

  // Step 2 — if fewer than 3, fill from capacity-adjacent villas (±8 guests)
  const capacityFallback = villas.filter(
    (v) =>
      v.id !== currentId &&
      v.category !== currentCategory &&
      Math.abs(v.capacity - currentCapacity) <= 8
  );

  const related = [...sameCategory, ...capacityFallback].slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="py-12 border-t border-border">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="font-playfair text-3xl font-bold text-foreground mb-2">
          You Might Also Like
        </h2>
        <p className="text-muted-foreground mb-8 text-base">
          More villas in Mahabaleshwar that match your travel style
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((villa) => (
            <Link
              key={villa.id}
              href={`/villas/${villa.id}`}
              className="group block rounded-2xl overflow-hidden border border-border bg-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-44 w-full overflow-hidden bg-muted">
                <Image
                  src={villa.images.listing}
                  alt={buildImageAltText({
                    subject: villa.name,
                    context: 'related villa card image',
                    location: villa.location,
                  })}
                  fill
                  sizes={getImageSizes('card')}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  quality={72}
                />
                {/* Category badge */}
                <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
                  {villa.category.replace(/-/g, ' ')}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-playfair text-base font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    {villa.name}
                  </h3>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                    <span className="text-xs font-semibold text-foreground">{villa.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-muted-foreground text-xs">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{villa.location}</span>
                </div>

                <div className="flex items-center gap-1 text-muted-foreground text-xs">
                  <Users className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{villa.bhk} · Up to {villa.capacity} guests</span>
                </div>

                <div className="pt-2 border-t border-border">
                  <span className="text-xs font-semibold text-primary group-hover:underline">
                    View Villa →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Internal link back to listing */}
        <div className="mt-8 text-center">
          <Link
            href="/villas"
            className="inline-block text-sm font-semibold text-primary border border-primary rounded-full px-6 py-2.5 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          >
            Browse All Villas in Mahabaleshwar →
          </Link>
        </div>
      </div>
    </section>
  );
}
