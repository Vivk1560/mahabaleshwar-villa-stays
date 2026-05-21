'use client'

import { useState, useMemo } from 'react'
import { VillaCard } from '@/components/VillaCard'

// ✅ Type matching your villas.json structure
interface Villa {
  id: string
  name: string
  location: string
  rating: number
  capacity: number
  amenities: string[]
  images: { listing: string; gallery: string[] }
  category: string
}

interface VillasClientProps {
  villas: Villa[]
  initialCategory: string
}

const categories = [
  { id: 'all', label: 'All Villas' },
  { id: 'pool-villas', label: 'Pool Villas' },
  { id: 'family-villas', label: 'Family Villas' },
  { id: 'couple-villas', label: 'Couple Villas' },
  { id: 'group-villas', label: 'Group Villas' },
  { id: 'valley-view-villas', label: 'Valley View Villas' },
  { id: 'budget-villas', label: 'Budget Villas' },
]

export default function VillasClient({ villas, initialCategory }: VillasClientProps) {
  // ✅ No useSearchParams — initialCategory comes from server as prop
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)

  const filteredVillas = useMemo(() => {
    if (selectedCategory === 'all') return villas
    return villas.filter((villa) => villa.category === selectedCategory)
  }, [selectedCategory, villas])

  return (
    <>
      {/* Header Section */}
      <section className="pt-20 pb-12 md:pt-24 md:pb-16 px-4 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-playfair text-3xl md:text-5xl font-bold text-foreground mb-3 md:mb-4 leading-tight">
            Curated Villa Collection
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover your perfect villa in Mahabaleshwar with our curated collection of premium properties
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-10 md:py-12 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-playfair font-bold text-foreground mb-4 md:mb-6 text-lg md:text-xl">
            Filter by Category
          </h2>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 md:px-6 py-2 rounded-lg font-semibold transition-all text-sm md:text-base ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-card'
                    : 'bg-card border border-border text-foreground hover:border-primary hover:text-primary'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          <p className="text-muted-foreground mt-4 md:mt-6 text-sm md:text-base">
            Showing {filteredVillas.length} villa{filteredVillas.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Villas Grid */}
      <section className="py-12 md:py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          {filteredVillas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {filteredVillas.map((villa) => (
                <VillaCard
                  key={villa.id}
                  id={villa.id}
                  name={villa.name}
                  location={villa.location}
                  rating={villa.rating}
                  capacity={villa.capacity}
                  amenities={villa.amenities}
                  image={villa.images.listing}
                  category={villa.category}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 md:py-20">
              <p className="text-lg md:text-xl text-muted-foreground">
                No villas found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
