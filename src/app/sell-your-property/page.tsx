"use client";

import Link from "next/link";
import { useState } from "react";
import { Upload, CheckCircle2, ArrowRight, Shield } from "lucide-react";
import { PROPERTY_TYPES, getWhatsAppLink } from "@/lib/constants";
import { isValidIndianMobile } from "@/lib/utils";
import { trackSellerFormSubmit } from "@/lib/analytics";

export default function SellYourPropertyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());

    // Validation
    const newErrors: Record<string, string> = {};
    if (!data.seller_name) newErrors.seller_name = "Name is required";
    if (!data.phone || !isValidIndianMobile(data.phone as string))
      newErrors.phone = "Valid 10-digit mobile number required";
    if (!data.property_type) newErrors.property_type = "Select property type";
    if (!data.location_text) newErrors.location_text = "Location is required";
    if (!data.consent) newErrors.consent = "Consent is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // TODO: Submit to Supabase seller_requests table
    trackSellerFormSubmit();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Request Submitted!</h2>
          <p className="text-neutral-500 mb-6">
            Thank you for trusting Jamin Lelo. Our team will call you within 24 hours to discuss your property.
          </p>
          <div className="space-y-3">
            <a
              href={getWhatsAppLink("Hello Jamin Lelo, I just submitted a property selling request on your website.")}
              target="_blank" rel="noopener noreferrer"
              className="w-full whatsapp-green text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              Message Us on WhatsApp for Faster Response
            </a>
            <Link
              href="/"
              className="w-full bg-neutral-100 text-neutral-800 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-linear-to-br from-accent-700 to-accent-900 text-white py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Sell Your Property</h1>
          <p className="text-accent-100/80 text-lg max-w-xl mx-auto">
            List your property with Jamin Lelo. We handle verification, pricing, negotiations, and documentation — so you get the best deal.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-sm text-neutral-500">
          <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-primary-600" /> Your details stay private</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary-600" /> No upfront charges</span>
          <span className="flex items-center gap-1.5"><Upload className="w-4 h-4 text-primary-600" /> Free property listing</span>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-neutral-200 p-6 md:p-8 space-y-6" noValidate>
          <h2 className="text-xl font-bold text-neutral-900 mb-2">Your Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Full Name *</label>
              <input type="text" name="seller_name" placeholder="Your name" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg" />
              {errors.seller_name && <p className="text-red-500 text-xs mt-1">{errors.seller_name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Mobile Number *</label>
              <input type="tel" name="phone" placeholder="10-digit mobile" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg" />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">WhatsApp Number</label>
              <input type="tel" name="whatsapp" placeholder="If different from mobile" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg" />
            </div>
          </div>

          <hr className="border-neutral-100" />
          <h2 className="text-xl font-bold text-neutral-900 mb-2">Property Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Property Type *</label>
              <select name="property_type" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg bg-white">
                <option value="">Select type</option>
                {PROPERTY_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
              {errors.property_type && <p className="text-red-500 text-xs mt-1">{errors.property_type}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Location / Village / Mauza *</label>
              <input type="text" name="location_text" placeholder="e.g. Obra, Near NH" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg" />
              {errors.location_text && <p className="text-red-500 text-xs mt-1">{errors.location_text}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Area (sq. ft.)</label>
              <input type="number" name="area_sqft" placeholder="e.g. 2400" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Expected Price (₹)</label>
              <input type="number" name="expected_price" placeholder="e.g. 1500000" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Road Access</label>
              <input type="text" name="road_access" placeholder="e.g. 20 ft road" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Ownership Info</label>
              <input type="text" name="ownership_info" placeholder="e.g. Ancestral, Single owner" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Description</label>
            <textarea name="description" rows={3} placeholder="Tell us about your property..." className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg resize-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Documents Available</label>
            <input type="text" name="documents_available" placeholder="e.g. Sale deed, Khatiyan, LPC" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg" />
          </div>

          {/* Consent (DPDP Act) */}
          <div className="bg-neutral-50 rounded-lg p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" name="consent" value="true" className="mt-1 w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500" />
              <span className="text-sm text-neutral-600">
                I consent to Jamin Lelo collecting and processing my personal information (name, phone, property details) for the purpose of facilitating my property sale. My contact details will not be shared publicly. I understand I can request deletion of my data at any time.
              </span>
            </label>
            {errors.consent && <p className="text-red-500 text-xs mt-2">{errors.consent}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-accent-600 hover:bg-accent-700 text-white py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
          >
            Submit Property for Review <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-xs text-neutral-400 text-center">
            Your property will not be published until reviewed and approved by our team.
          </p>
        </form>
      </div>
    </div>
  );
}
