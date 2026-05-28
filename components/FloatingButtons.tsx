import { MessageCircle, Phone } from 'lucide-react'

export function FloatingButtons() {
  const whatsappNumber = '919921372661'
  const phoneNumber = '8080557611'
  const whatsappMessage =
    'Hello! I am interested in booking a villa in Mahabaleshwar.'

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 flex flex-col gap-3 md:gap-4 z-40">
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          whatsappMessage
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 md:w-14 h-12 md:h-14 bg-green-500 text-white rounded-full shadow-elevated hover:shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300"
        aria-label="Contact via WhatsApp"
      >
        <MessageCircle className="w-5 md:w-6 h-5 md:h-6" />
      </a>

      <a
        href={`tel:${phoneNumber}`}
        className="w-12 md:w-14 h-12 md:h-14 bg-primary text-primary-foreground rounded-full shadow-elevated hover:shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300"
        aria-label="Call us"
      >
        <Phone className="w-5 md:w-6 h-5 md:h-6" />
      </a>
    </div>
  )
}
