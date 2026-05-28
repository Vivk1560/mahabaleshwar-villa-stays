import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { InternalLink } from '@/lib/internal-links'

interface RelatedLinksProps {
  title: string
  description?: string
  links: InternalLink[]
}

export function RelatedLinks({ title, description, links }: RelatedLinksProps) {
  if (links.length === 0) return null

  return (
    <section className="py-12 border-t border-border">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-6">
          <h2 className="font-playfair text-3xl font-bold text-foreground">
            {title}
          </h2>
          {description ? (
            <p className="mt-2 text-muted-foreground leading-relaxed">
              {description}
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-2xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-card transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="font-playfair text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {link.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {link.description}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
