import type { Metadata } from 'next'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { FloatingButtons } from '@/components/FloatingButtons'
import VillasClient from './VillasClient'
import villas from '@/lib/data/villas.json'

export const metadata: Metadata = {
  title: 'All Luxury Villas in Mahabaleshwar — Browse 25+ Properties',
  description:
    'Browse 25+ premium luxury villas in Mahabaleshwar. Filter by pool villas, family villas, couple villas, group villas & budget villas. Direct WhatsApp booking.',
  alternates: {
    canonical: 'https://www.mahabaleshwarvillastays.com/villas',
  },
  openGraph: {
    title: 'Luxury Villas in Mahabaleshwar — 25+ Curated Properties',
    description:
      'Browse premium pool villas, family villas, couple villas & group villas in Mahabaleshwar.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

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

export default function VillasPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <NavBar />
      <VillasClient
        villas={villas}
        initialCategory={searchParams.category || 'all'}
      />
      <Footer />
      <FloatingButtons />
    </main>
  )
}
