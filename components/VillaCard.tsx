'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';
import { buildImageAltText, getImageSizes } from '@/lib/images';

interface VillaCardProps {
  id: string;
  name: string;
  location: string;
  rating: number;
  capacity: number;
  amenities: string[];
  image: string;
  category: string;
}

export function VillaCard({
  id,
  name,
  location,
  rating,
  capacity,
  amenities,
  image,
  category,
}: VillaCardProps) {
  return (
    <Link href={`/villas/${id}`}>
      <div className="rounded-lg overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 bg-card hover:scale-102 transform cursor-pointer">
        {/* Image Container */}
        <div className="relative h-40 sm:h-48 w-full overflow-hidden bg-muted">
          <Image
            src={image}
            alt={buildImageAltText({
              subject: name,
              context: 'villa card image',
              location,
            })}
            fill
            className="object-cover"
            sizes={getImageSizes('card')}
            loading="lazy"
            quality={75}
          />
          {/* Category Badge */}
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-primary text-primary-foreground px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold capitalize">
            {category.replace('-', ' ')}
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 space-y-2.5 sm:space-y-3">
          {/* Name and Rating */}
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-playfair text-base sm:text-lg font-bold text-foreground line-clamp-1">{name}</h3>
            <div className="flex items-center gap-1 whitespace-nowrap flex-shrink-0">
              <Star className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-primary text-primary" />
              <span className="text-xs sm:text-sm font-semibold text-foreground">{rating}</span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 text-muted-foreground text-xs sm:text-sm">
            <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>

          {/* Amenities Preview */}
          <div className="flex flex-wrap gap-1">
            {amenities.slice(0, 2).map((amenity, idx) => (
              <span key={idx} className="text-xs bg-muted text-muted-foreground px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                {amenity}
              </span>
            ))}
            {amenities.length > 2 && (
              <span className="text-xs bg-muted text-muted-foreground px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                +{amenities.length - 2}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end pt-1.5 sm:pt-2 border-t border-border">
            <span className="text-xs text-muted-foreground">Up to {capacity} guests</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
