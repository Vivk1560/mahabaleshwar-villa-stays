import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  accent?: boolean;
}

export function SectionTitle({
  title,
  subtitle,
  centered = true,
  accent = true,
}: SectionTitleProps) {
  return (
    <div className={`${centered ? 'text-center' : ''} space-y-2`}>
      <h2 className="font-playfair text-3xl md:text-4xl font-bold text-foreground">
        {title}
      </h2>
      {accent && (
        <div className={`h-1 w-24 bg-primary rounded-full ${centered ? 'mx-auto' : ''}`} />
      )}
      {subtitle && (
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
