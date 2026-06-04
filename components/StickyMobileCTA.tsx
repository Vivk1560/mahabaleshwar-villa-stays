'use client'

import Link from 'next/link'
import { MessageCircle, Phone, CalendarCheck } from 'lucide-react'

const WA_NUMBER = '919921372661'
const PHONE_NUMBER = '8080557611'
const WA_MESSAGE = encodeURIComponent(
  'Hi, I am interested in booking a villa in Mahabaleshwar. Please share availability and options for my dates.'
)

export function StickyMobileCTA() {
  return (
    <>
      {/*
        Safe-area spacer — pushes page content up so the fixed bar
        never overlaps the last line of body content on any viewport.
        Only rendered on mobile (md:hidden).
      */}
      <div className="h-[72px] md:hidden" aria-hidden="true" />

      {/*
        Fixed bar — mobile only.
        env(safe-area-inset-bottom) handles iPhone home-indicator notch.
        z-40 sits below NavBar (z-50) so it never covers the top nav.
      */}
      <div
        className="
          fixed bottom-0 left-0 right-0 z-40
          md:hidden
          bg-background/95 backdrop-blur-md
          border-t border-border
          shadow-[0_-4px_24px_rgba(0,0,0,0.10)]
          pb-[env(safe-area-inset-bottom)]
        "
        role="region"
        aria-label="Quick contact options"
      >
        <div className="flex items-stretch gap-0 px-0">

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex-1 flex flex-col items-center justify-center gap-1
              min-h-[56px] py-2 px-1
              bg-[#25D366] text-white
              active:brightness-90
              transition-all duration-150
              touch-manipulation
              select-none
            "
            aria-label="Contact us on WhatsApp"
          >
            <MessageCircle className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
            <span className="text-[11px] font-semibold tracking-wide leading-none">WhatsApp</span>
          </a>

          {/* Divider */}
          <div className="w-px bg-white/20 self-stretch" aria-hidden="true" />

          {/* Call Now */}
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="
              flex-1 flex flex-col items-center justify-center gap-1
              min-h-[56px] py-2 px-1
              bg-foreground text-background
              active:brightness-90
              transition-all duration-150
              touch-manipulation
              select-none
            "
            aria-label={`Call us at ${PHONE_NUMBER}`}
          >
            <Phone className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
            <span className="text-[11px] font-semibold tracking-wide leading-none">Call Now</span>
          </a>

          {/* Divider */}
          <div className="w-px bg-border self-stretch" aria-hidden="true" />

          {/* Check Availability */}
          <Link
            href="/contact"
            className="
              flex-1 flex flex-col items-center justify-center gap-1
              min-h-[56px] py-2 px-1
              bg-primary text-primary-foreground
              active:brightness-90
              transition-all duration-150
              touch-manipulation
              select-none
            "
            aria-label="Check villa availability"
          >
            <CalendarCheck className="w-5 h-5 flex-shrink-0" strokeWidth={2} />
            <span className="text-[11px] font-semibold tracking-wide leading-none text-center">Check Avail.</span>
          </Link>

        </div>
      </div>
    </>
  )
}
