import React from 'react';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  author: string;
  location: string;
  rating: number;
  comment: string;
}

export function ReviewCard({ author, location, rating, comment }: ReviewCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-3">
      {/* Rating */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-primary text-primary' : 'text-muted'}`}
          />
        ))}
      </div>

      {/* Comment */}
      <p className="text-foreground italic">"{comment}"</p>

      {/* Author Info */}
      <div className="pt-2 border-t border-border">
        <p className="font-semibold text-foreground">{author}</p>
        <p className="text-sm text-muted-foreground">{location}</p>
      </div>
    </div>
  );
}
