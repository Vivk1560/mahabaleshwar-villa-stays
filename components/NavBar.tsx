import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Menu, X } from 'lucide-react'
import { buildImageAltText, getImageSizes } from '@/lib/images'

const CATEGORIES = [
  { label: 'All Villas', href: '/villas' },
  { label: 'Pool Villas', href: '/villas/category/pool-villas-in-mahabaleshwar' },
  { label: 'Family Villas', href: '/villas/category/family-villas-in-mahabaleshwar' },
  { label: 'Couple Villas', href: '/villas/category/couple-villas-in-mahabaleshwar' },
  { label: 'Group Villas', href: '/villas/category/group-villas-in-mahabaleshwar' },
  { label: 'Valley View Villas', href: '/villas/category/valley-view-villas-in-mahabaleshwar' },
  { label: 'Budget Villas', href: '/villas/category/budget-villas-in-mahabaleshwar' },
]

export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-background border-b border-border z-50 shadow-card">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">

          {/* ── Logo ───────────────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-3.5 flex-shrink-0 min-w-0">
            <div className="w-12 md:w-14 h-12 md:h-14 flex-shrink-0 rounded-lg overflow-hidden border border-primary/10 shadow-sm">
              <Image
                src="/logo.jpeg"
                alt={buildImageAltText({
                  subject: 'Mahabaleshwar Villa Stays',
                  context: 'logo',
                })}
                width={56}
                height={56}
                className="w-full h-full object-cover"
                priority
                sizes={getImageSizes('logo')}
              />
            </div>
            <span className="hidden sm:inline font-playfair font-bold text-base md:text-lg text-primary whitespace-nowrap overflow-hidden text-ellipsis">
              Mahabaleshwar Villa Stays
            </span>
          </Link>

          {/* ── Desktop Nav ─────────────────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-1 lg:gap-8">
            <Link
              href="/"
              className="text-foreground hover:text-primary font-medium transition-colors text-sm lg:text-base px-3 py-2"
            >
              Home
            </Link>

            <div className="relative group">
              <Link
                href="/villas"
                className="flex items-center gap-1 text-foreground hover:text-primary font-medium transition-colors px-3 py-2 text-sm lg:text-base"
              >
                Villas
                <ChevronDown className="w-4 h-4" />
              </Link>
              <div className="absolute left-0 mt-0 w-56 bg-card border border-border rounded-lg shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-300 py-2">
                {CATEGORIES.map((category) => (
                  <Link
                    key={category.href}
                    href={category.href}
                    className="block px-4 py-2 text-foreground hover:text-primary hover:bg-muted transition-colors text-sm"
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/blogs"
              className="text-foreground hover:text-primary font-medium transition-colors text-sm lg:text-base px-3 py-2"
            >
              Blogs
            </Link>
            <Link
              href="/about"
              className="text-foreground hover:text-primary font-medium transition-colors text-sm lg:text-base px-3 py-2"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-foreground hover:text-primary font-medium transition-colors text-sm lg:text-base px-3 py-2"
            >
              Contact Us
            </Link>
            <a
              href="https://wa.me/919921372661"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm ml-4"
            >
              WhatsApp Inquiry
            </a>
          </div>

          {/* ── Mobile Hamburger ────────────────────────────────────────────── */}
          {/*
            FIX: The outer <details> uses group/menu so that the hamburger
            Menu/X icon swap works correctly. The inner <details> for "Villas"
            uses a separate group/villas name so its ChevronDown rotation responds
            only to its own open state — NOT the outer hamburger open state.
            Previously both used the generic "group" class, causing the inner
            chevron to incorrectly read the outer details open state.
          */}
          <details className="group/menu md:hidden relative">
            <summary className="list-none cursor-pointer p-2 hover:bg-muted rounded-lg transition-colors flex items-center justify-center">
              <span className="sr-only">Open menu</span>
              {/* Hamburger — visible when menu closed */}
              <Menu className="w-6 h-6 group-open/menu:hidden" />
              {/* X — visible when menu open */}
              <X className="w-6 h-6 hidden group-open/menu:block" />
            </summary>

            <div className="absolute right-0 top-full mt-3 w-[min(92vw,22rem)] rounded-2xl border border-border bg-card shadow-elevated overflow-hidden">
              <div className="px-3 sm:px-4 py-5 space-y-3">

                <Link
                  href="/"
                  className="block px-3 py-2.5 text-sm text-foreground hover:text-primary transition-colors font-medium"
                >
                  Home
                </Link>

                {/*
                  FIX: group/villas is a named group scoped only to this inner
                  <details>. The ChevronDown now reads group-open/villas instead
                  of group-open, so it only rotates when THIS details is open —
                  not when the outer hamburger details opens.
                  
                  Result:
                    Collapsed → Villas ▼
                    Expanded  → Villas ▲
                */}
                <details className="group/villas">
                  <summary className="flex items-center justify-between px-3 py-2.5 text-sm text-foreground hover:text-primary transition-colors font-medium cursor-pointer list-none">
                    <span>Villas</span>
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-open/villas:rotate-180" />
                  </summary>
                  <div className="mt-2 pl-6 space-y-2">
                    {CATEGORIES.map((category) => (
                      <Link
                        key={category.href}
                        href={category.href}
                        className="block text-xs sm:text-sm text-foreground hover:text-primary transition-colors py-1.5"
                      >
                        {category.label}
                      </Link>
                    ))}
                  </div>
                </details>

                <Link
                  href="/blogs"
                  className="block px-3 py-2.5 text-sm text-foreground hover:text-primary transition-colors font-medium"
                >
                  Blogs
                </Link>
                <Link
                  href="/about"
                  className="block px-3 py-2.5 text-sm text-foreground hover:text-primary transition-colors font-medium"
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2.5 text-sm text-foreground hover:text-primary transition-colors font-medium"
                >
                  Contact Us
                </Link>
                <a
                  href="https://wa.me/919921372661"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm text-center"
                >
                  WhatsApp Inquiry
                </a>

              </div>
            </div>
          </details>

        </div>
      </div>
    </nav>
  )
}
