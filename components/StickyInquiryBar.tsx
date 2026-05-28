import Link from 'next/link'
import { MessageCircle, Phone } from 'lucide-react'

interface StickyInquiryBarProps {
  villaName: string
}

export function StickyInquiryBar({ villaName }: StickyInquiryBarProps) {
  const whatsappMessage = `Hi, I am interested in booking ${villaName} in Mahabaleshwar. Please share availability, final pricing, and the best rate for my dates.`

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="grid grid-cols-2 gap-3">
          <a
            href={`https://wa.me/919921372661?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary bg-card px-4 py-3 text-sm font-semibold text-primary shadow-sm"
          >
            <Phone className="w-4 h-4" />
            Enquire
          </Link>
        </div>
      </div>
    </div>
  )
}
