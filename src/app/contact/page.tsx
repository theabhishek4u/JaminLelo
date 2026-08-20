"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, CheckCircle2, Send } from "lucide-react";
import { BRAND, getWhatsAppLink } from "@/lib/constants";
import { isValidIndianMobile } from "@/lib/utils";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());

    const newErrors: Record<string, string> = {};
    if (!data.name) newErrors.name = "Name is required";
    if (!data.message) newErrors.message = "Message is required";
    if (data.phone && !isValidIndianMobile(data.phone as string))
      newErrors.phone = "Enter a valid mobile number";

    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    // TODO: Submit to Supabase contact_submissions table
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-linear-to-br from-primary-800 to-primary-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-primary-100/80 text-lg">
            We&apos;re here to help with all your property needs in Aurangabad, Bihar
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-5">
              <h2 className="font-semibold text-neutral-800 text-lg">Get in Touch</h2>
              
              <a href={`tel:${BRAND.phone}`} className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Phone</p>
                  <p className="font-semibold text-neutral-800 group-hover:text-primary-700 transition-colors">{BRAND.phone}</p>
                </div>
              </a>

              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-green-600">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">WhatsApp</p>
                  <p className="font-semibold text-neutral-800 group-hover:text-green-700 transition-colors">{BRAND.whatsapp}</p>
                </div>
              </a>

              <a href={`mailto:${BRAND.email}`} className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Email</p>
                  <p className="font-semibold text-neutral-800 group-hover:text-blue-700 transition-colors">{BRAND.email}</p>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Office</p>
                  <p className="font-semibold text-neutral-800">{BRAND.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center text-accent-600 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Working Hours</p>
                  <p className="font-semibold text-neutral-800">Mon–Sat: 9:00 AM – 7:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-white rounded-xl border border-neutral-200 p-8 text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Message Sent!</h3>
                <p className="text-neutral-500">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-neutral-200 p-6 md:p-8 space-y-5" noValidate>
                <h2 className="text-xl font-bold text-neutral-900">Send Us a Message</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Name *</label>
                    <input type="text" name="name" placeholder="Your name" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg" />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Phone</label>
                    <input type="tel" name="phone" placeholder="10-digit mobile" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg" />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Email</label>
                  <input type="email" name="email" placeholder="your@email.com" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Subject</label>
                  <input type="text" name="subject" placeholder="How can we help?" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Message *</label>
                  <textarea name="message" rows={4} placeholder="Your message..." className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg resize-none" />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3.5 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
