'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const categories = [
  { label: 'All Villas', href: '/villas' },
  { label: 'Pool Villas', href: '/villas?category=pool-villas' },
  { label: 'Family Villas', href: '/villas?category=family-villas' },
  { label: 'Couple Villas', href: '/villas?category=couple-villas' },
  { label: 'Group Villas', href: '/villas?category=group-villas' },
  { label: 'Valley View Villas', href: '/villas?category=valley-view-villas' },
  { label: 'Budget Villas', href: '/villas?category=budget-villas' },
];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background border-b border-border z-50 shadow-card">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3.5 flex-shrink-0 min-w-0">
            <div className="w-12 md:w-14 h-12 md:h-14 flex-shrink-0 rounded-lg overflow-hidden border border-primary/10 shadow-sm">
              <Image
                src="/logo.jpeg"
                alt="Mahabaleshwar Villa Stays"
                width={56}
                height={56}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <span className="hidden sm:inline font-playfair font-bold text-base md:text-lg text-primary whitespace-nowrap overflow-hidden text-ellipsis">
              Mahabaleshwar Villa Stays
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1 lg:gap-8">
            <Link href="/" className="text-foreground hover:text-primary font-medium transition-colors text-sm lg:text-base px-3 py-2">
              Home
            </Link>

            {/* Villa Categories Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-foreground hover:text-primary font-medium transition-colors px-3 py-2 text-sm lg:text-base">
                Villas
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute left-0 mt-0 w-56 bg-card border border-border rounded-lg shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2">
                {categories.map((category) => (
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

            <Link href="/blogs" className="text-foreground hover:text-primary font-medium transition-colors text-sm lg:text-base px-3 py-2">
              Blogs
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary font-medium transition-colors text-sm lg:text-base px-3 py-2">
              About Us
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary font-medium transition-colors text-sm lg:text-base px-3 py-2">
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="px-3 sm:px-4 py-5 space-y-3">
              <Link href="/" className="block px-3 py-2.5 text-sm text-foreground hover:text-primary transition-colors font-medium" onClick={() => setIsOpen(false)}>
                Home
              </Link>

              {/* Mobile Villa Categories */}
              <div>
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm text-foreground hover:text-primary transition-colors w-full font-medium"
                >
                  Villas
                  <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                </button>
                {isCategoryOpen && (
                  <div className="mt-2 pl-6 space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category.href}
                        href={category.href}
                        className="block text-xs sm:text-sm text-foreground hover:text-primary transition-colors py-1.5"
                        onClick={() => setIsOpen(false)}
                      >
                        {category.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/blogs" className="block px-3 py-2.5 text-sm text-foreground hover:text-primary transition-colors font-medium" onClick={() => setIsOpen(false)}>
                Blogs
              </Link>
              <Link href="/about" className="block px-3 py-2.5 text-sm text-foreground hover:text-primary transition-colors font-medium" onClick={() => setIsOpen(false)}>
                About Us
              </Link>
              <Link href="/contact" className="block px-3 py-2.5 text-sm text-foreground hover:text-primary transition-colors font-medium" onClick={() => setIsOpen(false)}>
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
          </div>
        )}
      </div>
    </nav>
  );
}
