import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';
import { ContactForm } from '@/components/ContactForm';

export const metadata = {
  title: 'Contact Us | Mahabaleshwar Villa Stays - WhatsApp Inquiry',
  description: 'Contact Mahabaleshwar Villa Stays. Reach us via WhatsApp, call, or email for villa inquiries. 24/7 concierge support available.',
  keywords: 'contact Mahabaleshwar Villa Stays, WhatsApp booking, villa inquiry, concierge service, Mahabaleshwar',
};

export default function ContactPage() {

  return (
    <main className="min-h-screen bg-background">
      <NavBar />

      {/* Header */}
      <section className="pt-20 pb-12 md:pt-24 md:pb-16 px-4 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-playfair text-3xl md:text-5xl font-bold text-foreground mb-3 md:mb-4 leading-tight">
            Get in Touch
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about our villas? We&apos;re here to help! Contact us anytime for instant WhatsApp booking.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <ContactForm />
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
}
