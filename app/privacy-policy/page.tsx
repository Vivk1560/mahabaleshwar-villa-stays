import type { Metadata } from 'next'
import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | Mahabaleshwar Villa Stays',
  description:
    'Privacy Policy for Mahabaleshwar Villa Stays. Learn how we collect, use, and protect your personal information.',
  alternates: {
    canonical: 'https://www.mahabaleshwarvillastays.com/privacy-policy',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <NavBar />

      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="mb-10 border-b border-border pb-8">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-sm">
              Last updated: May 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-neutral max-w-none space-y-8 text-foreground">

            <div className="space-y-3">
              <p className="text-muted-foreground leading-relaxed">
                This Privacy Policy describes how <strong>Mahabaleshwar Villa Stays</strong>, owned
                and operated by <strong>Rajesh Garela</strong> (&quot;we&quot;, &quot;us&quot;, or
                &quot;our&quot;), collects, uses, and protects the information you provide when you
                visit our website{' '}
                <a
                  href="https://www.mahabaleshwarvillastays.com"
                  className="text-primary hover:underline"
                >
                  www.mahabaleshwarvillastays.com
                </a>{' '}
                or contact us for villa bookings.
              </p>
            </div>

            {/* Section 1 */}
            <div className="space-y-3">
              <h2 className="font-playfair text-2xl font-bold text-foreground">
                1. Information We Collect
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                When you interact with our website or contact us for a booking inquiry, we may
                collect the following information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Your name and contact details (phone number, WhatsApp number)</li>
                <li>Travel dates and group size for booking inquiries</li>
                <li>Any additional information you voluntarily share via WhatsApp or phone</li>
                <li>
                  Basic website usage data collected automatically by Vercel (our hosting
                  provider) such as page views and general traffic analytics
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                We do <strong>not</strong> collect payment information directly — all payments and
                financial transactions are handled offline or through trusted third-party channels.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h2 className="font-playfair text-2xl font-bold text-foreground">
                2. How We Use Your Information
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The information we collect is used solely for the following purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>To respond to your villa booking inquiries and provide availability details</li>
                <li>To confirm and manage your villa reservations</li>
                <li>To provide personalized concierge support during your stay</li>
                <li>To improve our website and services based on general usage patterns</li>
                <li>To contact you regarding your booking or any related updates</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                We will <strong>never</strong> use your personal information for unsolicited
                marketing or share it with third parties for advertising purposes.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h2 className="font-playfair text-2xl font-bold text-foreground">
                3. WhatsApp Communication
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our primary communication channel is WhatsApp. When you initiate a WhatsApp
                conversation with us, your messages and contact details are accessible to our
                team for the purpose of handling your booking. WhatsApp&apos;s own privacy
                policy governs the security and handling of messages on their platform. We
                recommend reviewing{' '}
                <a
                  href="https://www.whatsapp.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  WhatsApp&apos;s Privacy Policy
                </a>{' '}
                for more information.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h2 className="font-playfair text-2xl font-bold text-foreground">
                4. Cookies and Tracking
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may use basic cookies and analytics provided by Vercel (our hosting
                infrastructure) to understand general website traffic and performance. These do
                not personally identify you. We do not use Google Analytics, Facebook Pixel, or
                any third-party advertising trackers.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You may disable cookies through your browser settings at any time without
                affecting your ability to browse our website.
              </p>
            </div>

            {/* Section 5 */}
            <div className="space-y-3">
              <h2 className="font-playfair text-2xl font-bold text-foreground">
                5. Data Sharing and Third Parties
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or rent your personal information to any third parties.
                Your information may only be shared in the following limited circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>
                  With our villa caretakers or staff, strictly for the purpose of managing
                  your stay
                </li>
                <li>
                  With Vercel, our website hosting provider, which processes basic website
                  traffic data
                </li>
                <li>
                  When required by law or legal process
                </li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="space-y-3">
              <h2 className="font-playfair text-2xl font-bold text-foreground">
                6. Data Security
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We take reasonable steps to protect the personal information you share with us.
                Our website is served over HTTPS (secure connection). However, no method of
                electronic transmission or storage is 100% secure, and we cannot guarantee
                absolute security.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-3">
              <h2 className="font-playfair text-2xl font-bold text-foreground">
                7. Your Rights
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Request access to the personal information we hold about you</li>
                <li>Request correction of any inaccurate information</li>
                <li>Request deletion of your personal data from our records</li>
                <li>Opt out of any future communications from us</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                To exercise any of these rights, please contact us at the email address below.
              </p>
            </div>

            {/* Section 8 */}
            <div className="space-y-3">
              <h2 className="font-playfair text-2xl font-bold text-foreground">
                8. Children&apos;s Privacy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website and services are not directed at children under the age of 13. We
                do not knowingly collect personal information from children. If you believe a
                child has provided us with personal information, please contact us and we will
                delete it promptly.
              </p>
            </div>

            {/* Section 9 */}
            <div className="space-y-3">
              <h2 className="font-playfair text-2xl font-bold text-foreground">
                9. Changes to This Policy
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be
                reflected on this page with an updated &quot;Last updated&quot; date. We
                encourage you to review this page periodically.
              </p>
            </div>

            {/* Section 10 — Contact */}
            <div className="space-y-3 bg-card border border-border rounded-lg p-6">
              <h2 className="font-playfair text-2xl font-bold text-foreground">
                10. Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy or how we handle your
                data, please contact us:
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
                    rajeshgarela0@gmail.com
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
