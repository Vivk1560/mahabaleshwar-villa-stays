import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Top Grid — 5 columns on large screens, stacked on mobile */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* ── Col 1: Brand ───────────────────────────────────────────────── */}
          <div className="space-y-4 lg:col-span-1">
            <h3 className="font-playfair text-2xl font-bold text-foreground">
              Mahabaleshwar Villa Stays
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Discover premium luxury villas in Mahabaleshwar with breathtaking
              valley views, private pools, modern amenities, and personalized
              hospitality for unforgettable hill station getaways.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Serving guests across Mahabaleshwar, Panchgani, Bhilar, and nearby
              scenic hill station destinations in Maharashtra.
            </p>
          </div>

          {/* ── Col 2: Explore Villas (category pages) ─────────────────────── */}
          <div className="space-y-4">
            <h4 className="font-playfair text-lg font-bold text-foreground">
              Explore Villas
            </h4>
            <div className="space-y-2 text-sm">
              <Link
                href="/villas/category/pool-villas-in-mahabaleshwar"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Pool Villas in Mahabaleshwar
              </Link>
              <Link
                href="/villas/category/family-villas-in-mahabaleshwar"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Family Villas in Mahabaleshwar
              </Link>
              <Link
                href="/villas/category/couple-villas-in-mahabaleshwar"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Couple-Friendly Villas
              </Link>
              <Link
                href="/villas/category/group-villas-in-mahabaleshwar"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Group Villas in Mahabaleshwar
              </Link>
              <Link
                href="/villas/category/valley-view-villas-in-mahabaleshwar"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Valley View Villas
              </Link>
              <Link
                href="/villas/category/budget-villas-in-mahabaleshwar"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Budget Villas in Mahabaleshwar
              </Link>
            </div>
          </div>

          {/* ── Col 3: Popular Villa Collections (root-route SEO links) ────────
              These point to the canonical root-level commercial landing pages.
              This section passes footer authority to the highest-priority SEO
              targets on every page across the site.
          ─────────────────────────────────────────────────────────────────── */}
          <div className="space-y-4">
            <h4 className="font-playfair text-lg font-bold text-foreground">
              Popular Collections
            </h4>
            <div className="space-y-2 text-sm">
              <Link
                href="/luxury-villas-in-mahabaleshwar"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Luxury Villas in Mahabaleshwar
              </Link>
              <Link
                href="/private-pool-villas-in-mahabaleshwar"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Private Pool Villas
              </Link>
              <Link
                href="/villas-for-family-in-mahabaleshwar"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Family Villas in Mahabaleshwar
              </Link>
              <Link
                href="/villas-near-mapro-garden"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Villas Near Mapro Garden
              </Link>
              <Link
                href="/villas/pet-friendly-villas-in-mahabaleshwar"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Pet-Friendly Villas
              </Link>
              <Link
                href="/3-bhk-villas-in-mahabaleshwar"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                3 BHK Villas in Mahabaleshwar
              </Link>
              <Link
                href="/4-bhk-villas-in-mahabaleshwar"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                4 BHK Villas in Mahabaleshwar
              </Link>

          {/* ── Col 4: Nearby Attractions ───────────────────────────────────── */}
          <div className="space-y-4">
            <h4 className="font-playfair text-lg font-bold text-foreground">
              Nearby Attractions
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">Mapro Garden</p>
              <p className="text-muted-foreground">Venna Lake</p>
              <p className="text-muted-foreground">Wilson Point</p>
              <p className="text-muted-foreground">Lingmala Waterfall</p>
              <p className="text-muted-foreground">Panchgani Table Land</p>
            </div>
          </div>

          {/* ── Col 5: Contact ──────────────────────────────────────────────── */}
          <div className="space-y-4">
            <h4 className="font-playfair text-lg font-bold text-foreground">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="tel:8080557611"
                  className="hover:text-primary transition-colors"
                >
                  📞 8080557611
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919921372661"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  💬 WhatsApp Support
                </a>
              </li>
              <li>
                <a
                  href="mailto:rajeshgarela0@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  ✉️ rajeshgarela0@gmail.com
                </a>
              </li>
              <li className="leading-relaxed">
                📍 Bhilar, Panchgani Mahabaleshwar Road,
                <br />
                Satara, Maharashtra – 412806
              </li>
            </ul>
          </div>

        </div>

        {/* ── SEO Content Strip ───────────────────────────────────────────────── */}
        <div className="border-t border-border pt-8 pb-8">
          <p className="text-sm text-muted-foreground leading-relaxed text-center max-w-5xl mx-auto">
            Looking for the best{' '}
            <Link href="/luxury-villas-in-mahabaleshwar" className="hover:text-primary transition-colors underline-offset-2 hover:underline">
              luxury villas in Mahabaleshwar
            </Link>
            ? Explore curated{' '}
            <Link href="/private-pool-villas-in-mahabaleshwar" className="hover:text-primary transition-colors underline-offset-2 hover:underline">
              private pool villas
            </Link>
            , valley views,{' '}
            <Link href="/villas-for-family-in-mahabaleshwar" className="hover:text-primary transition-colors underline-offset-2 hover:underline">
              family-friendly villas
            </Link>
            , romantic stays for couples, and spacious group villas near top attractions like{' '}
            <Link href="/villas-near-mapro-garden" className="hover:text-primary transition-colors underline-offset-2 hover:underline">
              Mapro Garden
            </Link>
            , Venna Lake, Wilson Point, and Panchgani.
          </p>
        </div>

        {/* ── Bottom Nav ──────────────────────────────────────────────────────── */}
        <div className="border-t border-border pt-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
            <p className="text-muted-foreground text-sm text-center lg:text-left">
              © {new Date().getFullYear()} Mahabaleshwar Villa Stays. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-5 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/villas" className="text-muted-foreground hover:text-primary transition-colors">
                Villas
              </Link>
              <Link href="/blogs" className="text-muted-foreground hover:text-primary transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* ── Developer Credit ─────────────────────────────────────────────────── */}
        <div className="border-t border-white/10 mt-6 pt-6 text-center">
          <p className="text-xs text-gray-500">
            Designed & Developed by{' '}
            <a
              href="https://wa.me/917972767203?text=Hi%20Vivaan!%20I%20saw%20your%20work%20on%20Mahabaleshwar%20Villa%20Stays.%20I%27d%20like%20a%20similar%20website."
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-200 font-medium"
            >
              Vivaan Kukreja
            </a>
          </p>
        </div>

      </div>
    </footer>
  );

