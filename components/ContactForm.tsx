'use client';

import { useState } from 'react';
import { MessageCircle, Phone, MapPin, Clock } from 'lucide-react';
import contactData from '@/lib/data/contactData.json';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
    villa: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message with form data
    const whatsappMessage = `Hello! I'm interested in your villas. 
Name: ${formData.name}
Phone: ${formData.phone}
Message: ${formData.message}
${formData.villa ? `Villa Interest: ${formData.villa}` : ''}`;

    // Redirect to WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/9921372661?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', phone: '', message: '', villa: '' });
    }, 2000);
  };

  return (
    <div className="space-y-12 md:space-y-16">
      {/* Contact Info Cards - 2 Column */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8">
        {/* Phone Card */}
        <a
          href={`tel:${contactData.phone}`}
          className="bg-card border border-border rounded-lg p-4 md:p-8 space-y-2 md:space-y-3 hover:shadow-card transition-shadow cursor-pointer"
        >
          <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Phone className="w-5 md:w-6 h-5 md:h-6" />
          </div>
          <h3 className="font-playfair font-bold text-foreground text-lg md:text-xl">Phone</h3>
          <p className="text-sm md:text-base text-muted-foreground">{contactData.phone}</p>
          <p className="text-xs md:text-sm text-accent">Click to call</p>
        </a>

        {/* WhatsApp Card */}
        <a
          href={`https://wa.me/${contactData.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-card border border-border rounded-lg p-4 md:p-8 space-y-2 md:space-y-3 hover:shadow-card transition-shadow cursor-pointer"
        >
          <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
            <MessageCircle className="w-5 md:w-6 h-5 md:h-6" />
          </div>
          <h3 className="font-playfair font-bold text-foreground text-lg md:text-xl">WhatsApp</h3>
          <p className="text-sm md:text-base text-muted-foreground">{contactData.whatsapp}</p>
          <p className="text-xs md:text-sm text-accent">Send message</p>
        </a>
      </div>

      {/* Form and Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Contact Form */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-foreground">
            Send us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            {/* Name */}
            <div>
              <label className="block text-foreground font-semibold mb-2 text-sm md:text-base">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-card border border-border rounded-lg text-sm md:text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your name"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-foreground font-semibold mb-2 text-sm md:text-base">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-card border border-border rounded-lg text-sm md:text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-foreground font-semibold mb-2 text-sm md:text-base">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-card border border-border rounded-lg text-sm md:text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Tell us about your inquiry..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 md:px-6 py-2.5 md:py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <MessageCircle className="w-4 md:w-5 h-4 md:h-5" />
              Send via WhatsApp
            </button>

            {submitted && (
              <div className="p-3 md:p-4 bg-green-500/10 text-green-700 border border-green-200 rounded-lg text-center text-sm md:text-base">
                Opening WhatsApp with your message...
              </div>
            )}
          </form>
        </div>

        {/* Info Section */}
        <div className="md:col-span-1 space-y-6 md:space-y-8">
          {/* Hours */}
          <div>
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <Clock className="w-5 md:w-6 h-5 md:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-playfair font-bold text-foreground text-base md:text-lg mb-1 md:mb-2">Hours</h3>
                <div className="space-y-0.5 text-muted-foreground text-xs md:text-sm">
                  <p>Mon - Sat: 9:00 AM - 9:00 PM</p>
                  <p>Sunday: 10:00 AM - 8:00 PM</p>
                  <p className="text-accent font-semibold mt-1.5 md:mt-2">24/7 Concierge Support</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <div className="flex items-start gap-3 md:gap-4">
              <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <MapPin className="w-5 md:w-6 h-5 md:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-playfair font-bold text-foreground text-base md:text-lg mb-1 md:mb-2">Location</h3>
                <p className="text-muted-foreground text-xs md:text-sm">{contactData.location}</p>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="w-full h-64 bg-muted border border-border rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Mahabaleshwar, Maharashtra</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
