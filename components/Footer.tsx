import React from 'react';
import Link from 'next/link';
import { Phone, MapPin, MessageCircle } from 'lucide-react';
import contactData from '@/lib/data/contactData.json';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div className="space-y-3">
            <h3 className="font-playfair text-lg font-bold text-foreground">
              Mahabaleshwar Villa Stays
            </h3>
            <p className="text-muted-foreground text-sm">
              Premium luxury villas in Mahabaleshwar with breathtaking valley views and world-class hospitality.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-playfair font-bold text-foreground">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/villas" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Browse Villas
              </Link>
              <Link href="/blogs" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Blog
              </Link>
              <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                About Us
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="font-playfair font-bold text-foreground">Contact</h4>
            <div className="space-y-2 text-sm">
              <a
                href={`tel:${contactData.phone}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                {contactData.phone}
              </a>
              <a
                href={`https://wa.me/${contactData.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                Mahabaleshwar, Maharashtra
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2024 Mahabaleshwar Villa Stays. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
