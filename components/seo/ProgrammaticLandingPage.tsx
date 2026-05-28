import Link from 'next/link'
import { ChevronRight, Home, MessageCircle } from 'lucide-react'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import { FloatingButtons } from '@/components/FloatingButtons'
import { VillaCard } from '@/components/VillaCard'
import { RelatedLinks } from '@/components/seo/RelatedLinks'
import type { LandingPageData } from '@/lib/programmatic-seo'

interface ProgrammaticLandingPageProps {
  data: LandingPageData
}

export function ProgrammaticLandingPage({ data }: ProgrammaticLandingPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <NavBar />

      <nav aria-label="Breadcrumb" className="pt-20 pb-2 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center flex-wrap gap-1 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/villas" className="hover:text-primary transition-colors">
                Villas
              </Link>
            </li>
            <li className="flex items-center gap-1">
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground font-medium truncate max-w-[220px] sm:max-w-none">
                {data.h1}
              </span>
            </li>
          </ol>
        </div>
      </nav>

      <section className="pt-8 pb-10 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Programmatic search page
            </p>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground leading-tight">
              {data.h1}
            </h1>
            <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-8">
              {data.introParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/villas"
                className="px-5 py-3 rounded-lg border border-border text-foreground font-semibold hover:border-primary hover:text-primary transition-colors inline-flex items-center justify-center gap-2"
              >
                Browse all villas
              </Link>
              <a
                href="https://wa.me/919921372661?text=Hi, I am looking for a villa in Mahabaleshwar. Can you help me choose the right one?"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp inquiry
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mb-8">
            <h2 className="font-playfair text-3xl font-bold text-foreground">
              {data.whyItMattersTitle}
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              {data.whyItMattersIntro}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {data.highlights.map((highlight) => (
              <article
                key={highlight.title}
                className="rounded-2xl border border-border bg-background p-5 shadow-sm"
              >
                <h3 className="font-playfair text-xl font-bold text-foreground">
                  {highlight.title}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed text-sm md:text-base">
                  {highlight.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
            <div className="max-w-3xl">
              <h2 className="font-playfair text-3xl font-bold text-foreground">
                {data.featuredTitle}
              </h2>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {data.featuredDescription}
              </p>
            </div>
            <p className="text-sm font-semibold text-primary">
              {data.featuredLabel}
            </p>
          </div>

          {data.featuredVillas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.featuredVillas.map((villa) => (
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
            <div className="rounded-2xl border border-border bg-card p-8 text-muted-foreground">
              <p className="leading-relaxed">
                We could not find matching villas in the current data set. Use the contact button
                above to confirm availability and current policy.
              </p>
            </div>
          )}
        </div>
      </section>

      <RelatedLinks
        title="Helpful next steps"
        description="These links keep the topic cluster tight and help visitors move from intent to booking or deeper research."
        links={data.relatedLinks}
      />

      <section className="py-14 px-4 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-playfair text-3xl font-bold text-foreground mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            {data.faqItems.map((faq) => (
              <details
                key={faq.q}
                className="group border border-border rounded-2xl p-6 bg-card"
              >
                <summary className="flex justify-between items-center cursor-pointer list-none">
                  <h3 className="font-semibold text-lg text-foreground pr-5">
                    {faq.q}
                  </h3>
                  <span className="text-primary text-2xl font-bold group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-5 text-muted-foreground leading-7">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 to-accent/10 border-y border-border">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground">
            Need help choosing the right villa?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Send us your dates, group size, and must-have features. We will use the same villa data
            that powers these landing pages to recommend the best option quickly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-2"
            >
              Contact us
            </Link>
            <a
              href="https://wa.me/919921372661"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  )
}
