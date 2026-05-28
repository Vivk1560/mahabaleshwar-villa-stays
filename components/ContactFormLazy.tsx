'use client'

import dynamic from 'next/dynamic'

export const ContactFormLazy = dynamic(
  () => import('@/components/ContactForm').then((module) => module.ContactForm),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
        <div className="h-8 w-56 rounded bg-muted animate-pulse" />
        <div className="mt-6 space-y-4">
          <div className="h-12 rounded bg-muted animate-pulse" />
          <div className="h-12 rounded bg-muted animate-pulse" />
          <div className="h-24 rounded bg-muted animate-pulse" />
          <div className="h-12 rounded bg-muted animate-pulse" />
        </div>
      </div>
    ),
  }
)
