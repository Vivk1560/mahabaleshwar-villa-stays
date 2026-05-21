'use client'

// app/villas/VillasFilterClient.tsx
// ─────────────────────────────────────────────────────────────────────────────
// CLIENT COMPONENT — handles only the filter tab UI.
// Does NOT fetch or render any villa data.
// Villa cards are already in the DOM (server-rendered). This component
// toggles their visibility based on the selected category.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface Category {
  label: string
  value: string
}

interface VillasFilterClientProps {
  categories: Category[]
  initialCategory: string
}

export default function VillasFilterClient({
  categories,
  initialCategory,
}: VillasFilterClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [active, setActive] = useState(initialCategory)

  // Apply filter by toggling visibility of server-rendered villa cards
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('[data-villa-card]')
    const noResults = document.getElementById('no-results-msg')
    let visibleCount = 0

    cards.forEach((card) => {
      const cardCategory = card.getAttribute('data-category') || ''
      const show = active === 'all' || cardCategory === active

      card.style.display = show ? '' : 'none'
      if (show) visibleCount++
    })

    if (noResults) {
      noResults.classList.toggle('hidden', visibleCount > 0)
    }
  }, [active])

  const handleCategoryChange = (value: string) => {
    setActive(value)
    // Update URL for shareability / bookmark without full page reload
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'all') {
      params.delete('category')
    } else {
      params.set('category', value)
    }
    router.push(`/villas${params.toString() ? '?' + params.toString() : ''}`, {
      scroll: false,
    })
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-2">
      {categories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => handleCategoryChange(cat.value)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
            ${
              active === cat.value
                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : 'bg-background text-muted-foreground border-border hover:border-primary hover:text-primary'
            }
          `}
          aria-pressed={active === cat.value}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
