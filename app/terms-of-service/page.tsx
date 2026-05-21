import type { Metadata } from 'next'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service | Mahabaleshwar Villa Stays',
  description:
    'Terms of Service for Mahabaleshwar Villa Stays. Read our booking conditions, cancellation policy, and guest responsibilities.',
  alternates: {
    canonical: 'https://www.mahabaleshwarvillastays.com/terms-of-service',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-background">
      <NavBar />

      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="mb-10 border-b border-border pb-8">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-sm">
              Last updated: May 2026
            </p>
          </div>

          {/* Intro */}
          <div className="space-y-8 text-foreground">

            <div className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                Welcome to <strong>Mahabaleshwar Villa Stays</strong>, owned and operated by{' '}
                <strong>Rajesh Garela</strong>. By accessing our website at{' '}
                <a
                  href="https://www.mahabaleshwarvillastays.com"
                  className="text-primary hover:underline"
                >
                  www.mahabaleshwarvillastays.com
                </a>{' '}
                or making a villa booking inquiry, you agree to be bound by these Terms of
                Service. Please read them carefully before proceeding.
              </p>
            </div>

            {/* Section 1 */}
            <div className="space-y-3">
              <h2 className="font-playfair text-2xl font-bold text-foreground">
                1. Booking and Reservations
              </h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  All bookings are subject to villa availability and confirmation by our team
                  via WhatsApp or phone.
                </li>
                <li>
                  A booking is only confirmed once you receive explicit written confirmation
                  from Mahabaleshwar Villa Stays.
                </li>
                <li>
                  We reserve the right to decline any booking request at our discretion.
                </li>
                <li>
                  All guest details provided during booking must be accurate and complete.
                </li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h2 className="font-playfair text-2xl font-bold text-foreground">
                2. Payment Terms
              </h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  Payment terms, advance amounts, and due dates will be communicated at the
                  time of booking confirmation.
                </li>
                <li>
                  We reserve the right to cancel an unconfirmed booking if payment is not
                  received within the agreed timeframe.
                </li>
                <li>
                  Pricing is subject to change without notice for future bookings. Confirmed
                  bookings will honor the agreed price.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h2 className="font-playfair text-2xl font-bold text-foreground">
                3. Cancellation Policy
              </h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  Cancellation terms vary by villa and booking period and will be communicated
                  at the time of booking.
                </li>
                <li>
                  Cancellations must be communicated in writing via WhatsApp or email.
                </li>
                <li>
                  Refunds, if applicable, will be processed within 7–14 business days.
                </li>
                <li>
                  No-shows or cancellations within 48 hours of check-in may result in
                  forfeiture of the advance payment.
                </li>
                <li>
                  We are not liable for cancellations due to natural disasters, government
                  restrictions, or other force majeure events.
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h2 className="font-playfair text-2xl font-bold text-foreground">
                4. Check-In and Check-Out
              </h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  Standard check-in time is 12:00 PM and check-out time is 11:00 AM unless
                  otherwise agreed.
                </li>
                <li>
                  Early check-in or late check-out may be available subject to availability
                  and may incur additional charges.
                </li>
                <li>
                  Guests must present valid government-issued photo ID for all members of the
                  group at check-in.
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="space-y-3">
              <h2 className="font-playfair text-2xl font-bold text-foreground">
                5. Guest Responsibilities
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                As a guest, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  Treat the villa and its contents with care and respect.
                </li>
                <li>
                  Not exceed the maximum occupancy stated for each villa.
                </li>
                <li>
                  Not conduct any illegal activities on the premises.
                </li>
                <li>
                  Keep noise levels reasonable, especially between 10:00 PM and 8:00 AM, in
                  respect of neighbors and local community.
                </li>
                <li>
                  Not smoke inside the villa unless a designated smoking area is provided.
                </li>
                <li>
                  Report any damage or issues to the caretaker or our team immediately.
                </li>
                <li>
                  Leave the villa in a reasonably clean condition at check-out.
                </li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="space-y-3">
              <h2 className="font-playfair text-2xl font-bold text-foreground">
                6. Damage and Liability
              </h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  Guests are financially responsible for any damage caused to the property,
                  furniture, or equipment during their stay.
                </li>
                <li>
                  Mahabaleshwar Villa Stays is not liable for any loss, theft, injury, or
                  accident that occurs during your stay.
                </li>
                <li>
                  We strongly recommend guests obtain travel insurance for their trip.
                </li>
                <li>
                  Use of amenities such as swimming pools, outdoor areas, and equipment is at
                  the guest&apos;s own risk.
                </li>
              </ul>
            </div>

            {/* Section 7 */}
            <div className="space-y-3">
              <h2 className="font-playfair text-2xl font-bold text-foreground">
                7. Website Use
              </h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  All content on this website including text, images, and villa descriptions
                  is the property of Mahabaleshwar Villa Stays and may not be reproduced
                  without permission.
                </li>
                <li>
                  Villa images and descriptions are provided for informational purposes.
                  Actual villa appearance may vary slightly.
                </li>
                <li>
                  We do not guarantee that the website will always be available or free of
                  errors.
                </li>
              </ul>
            </div>

            {/* Section 8 */}
            <div className="space-y-3">
              <h2 className="font-playfair text-2xl font-bold text-foreground">
                8. Governing Law
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Service are governed by the laws of India. Any disputes arising
                from these terms or your use of our services shall be subject to the
                jurisdiction of courts in Maharashtra, India.
              </p>
            </div>

            {/* Section 9 */}
            <div className="space-y-3">
              <h2 className="font-playfair text-2xl font-bold text-foreground">
                9. Changes to These Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to update these Terms of Service at any time. Changes
                will be posted on this page with an updated date. Continued use of our
                website or services after changes constitutes acceptance of the updated terms.
              </p>
            </div>

            {/* Section 10 — Contact */}
            <div className="space-y-3 bg-card border border-border rounded-lg p-6">
              <h2 className="font-playfair text-2xl font-bold text-foreground">
                10. Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                For any questions regarding these Terms of Service, please reach out:
              </p>
              <div className="space-y-1 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Business:</strong> Mahabaleshwar Villa
                  Stays
                </p>
                <p>
                  <strong className="text-foreground">Owner:</strong> Rajesh Garela
                </p>
                <p>
                  <strong className="text-foreground">Email:</strong>{' '}
                  <a
                    href="mailto:info@mahabaleshwarvillastays.com"
                    className="text-primary hover:underline"
                  >
                    info@mahabaleshwarvillastays.com
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Phone:</strong>{' '}
                  <a href="tel:8080557611" className="text-primary hover:underline">
                    8080557611
                  </a>
                </p>
                <p>
                  <strong className="text-foreground">Location:</strong> Mahabaleshwar,
                  Maharashtra, India
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
