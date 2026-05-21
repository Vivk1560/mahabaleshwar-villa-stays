// app/villas/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// SERVER COMPONENT — no 'use client' here.
// All villa cards are rendered as static HTML at build time.
// Google (and every crawler) will see the full villa list without JavaScript.
// VillasClient handles ONLY the filter tabs + hide/show logic client-side.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from 'next'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { FloatingButtons } from '@/components/FloatingButtons'
import { VillaCard } from '@/components/VillaCard'
import VillasFilterClient from './VillasFilterClient'
import villas from '@/lib/data/villas.json'

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'All Luxury Villas in Mahabaleshwar — Browse 25+ Properties',
  description:
    'Browse 25+ premium luxury villas in Mahabaleshwar. Pool villas, family villas, couple villas, group villas & budget villas. Direct WhatsApp booking with 24/7 concierge.',
  keywords:
    'luxury villas Mahabaleshwar, pool villas Mahabaleshwar, family villas Mahabaleshwar, couple villas Mahabaleshwar, group villas Mahabaleshwar, budget villas Mahabaleshwar, vacation rentals Mahabaleshwar',
  alternates: {
    canonical: 'https://www.mahabaleshwarvillastays.com/villas',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.mahabaleshwarvillastays.com/villas',
    title: 'Luxury Villas in Mahabaleshwar — 25+ Curated Properties',
    description:
      'Browse premium pool villas, family villas, couple villas & group villas in Mahabaleshwar. Direct WhatsApp booking.',
    images: [
      {
        url: 'https://www.mahabaleshwarvillastays.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxury villas in Mahabaleshwar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Villas in Mahabaleshwar — 25+ Curated Properties',
    description:
      'Pool villas, family villas, couple villas & group villas in Mahabaleshwar. Book via WhatsApp.',
    images: ['https://www.mahabaleshwarvillastays.com/og-image.jpg'],
  },
}

// ── Structured Data ───────────────────────────────────────────────────────────
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
  ],
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Luxury Villas in Mahabaleshwar',
  description: 'Curated collection of 25+ premium villas in Mahabaleshwar',
  numberOfItems: villas.length,
  itemListElement: villas.map((villa, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: villa.name,
    url: `https://www.mahabaleshwarvillastays.com/villas/${villa.id}`,
  })),
}

// ── Category filter tabs config ───────────────────────────────────────────────
const CATEGORIES = [
  { label: 'All Villas', value: 'all' },
  { label: 'Pool Villas', value: 'pool-villas' },
  { label: 'Family Villas', value: 'family-villas' },
  { label: 'Couple Villas', value: 'couple-villas' },
  { label: 'Group Villas', value: 'group-villas' },
  { label: 'Valley View', value: 'valley-view-villas' },
  { label: 'Budget Villas', value: 'budget-villas' },
]

// ── Page Component ────────────────────────────────────────────────────────────
export default function VillasPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const activeCategory = searchParams.category || 'all'

  return (
    <main className="min-h-screen bg-background">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <NavBar />

      {/* ── Hero / Header ──────────────────────────────────────────────────── */}
      <section className="pt-24 pb-8 px-4 bg-background">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            Luxury Villas in Mahabaleshwar
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our handpicked collection of {villas.length}+ premium villas.
            Filter by type or explore them all.
          </p>
        </div>
      </section>

      {/* ── Filter Tabs (client) + Villa Grid (server-rendered) ────────────── */}
      {/*
        VillasFilterClient renders the category tabs and uses CSS/JS to
        show/hide villa cards by data-category attribute.
        All cards are present in the HTML — Google sees every villa.
      */}
      <section className="py-8 px-4 bg-background">
        <div className="max-w-7xl mx-auto">

          {/* Client-side filter tabs */}
          <VillasFilterClient
            categories={CATEGORIES}
            initialCategory={activeCategory}
          />

          {/* 
            SERVER-RENDERED villa grid.
            Every villa card is in the HTML. VillasFilterClient toggles
            visibility via data attributes — no content is hidden from crawlers.
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {villas.map((villa) => (
              <div
                key={villa.id}
                data-category={villa.category}
                data-villa-card
              >
                <VillaCard
                  id={villa.id}
                  name={villa.name}
                  location={villa.location}
                  rating={villa.rating}
                  capacity={villa.capacity}
                  amenities={villa.amenities}
                  image={villa.images.listing}
                  category={villa.category}
                />
              </div>
            ))}
          </div>

          {/* No-JS fallback message (hidden by JS when filters run) */}
          <p
            id="no-results-msg"
            className="hidden text-center text-muted-foreground py-12 text-lg"
          >
            No villas found in this category.
          </p>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  )
}
