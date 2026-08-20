"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, Search, ArrowRight } from "lucide-react";
import { LOCATIONS, PROPERTY_TYPES } from "@/lib/constants";
import { isValidIndianMobile } from "@/lib/utils";
import { trackEnquirySubmit } from "@/lib/analytics";

export default function BuyPropertyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());

    const newErrors: Record<string, string> = {};
    if (!data.buyer_name) newErrors.buyer_name = "Name is required";
    if (!data.phone || !isValidIndianMobile(data.phone as string))
      newErrors.phone = "Valid 10-digit mobile number required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // TODO: Submit to Supabase buyer_leads table with lead_type: requirement
    trackEnquirySubmit("requirement", "buy-property");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Requirement Received!</h2>
          <p className="text-neutral-500 mb-6">
            We&apos;ll match your requirement with our inventory and call you within 24 hours with options.
          </p>
          <div className="space-y-3">
            <Link href="/properties" className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
              Browse Properties Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/" className="w-full bg-neutral-100 text-neutral-800 py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-linear-to-br from-primary-700 to-primary-900 text-white py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Buy Property</h1>
          <p className="text-primary-100/80 text-lg max-w-xl mx-auto">
            Tell us what you&apos;re looking for and our team will find the perfect match from our verified inventory.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm text-neutral-500">
          <span className="flex items-center gap-1.5"><Search className="w-4 h-4 text-primary-600" /> We search for you</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-primary-600" /> Only verified listings</span>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-neutral-200 p-6 md:p-8 space-y-6" noValidate>
          <h2 className="text-xl font-bold text-neutral-900">Your Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Full Name *</label>
              <input type="text" name="buyer_name" placeholder="Your name" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg" />
              {errors.buyer_name && <p className="text-red-500 text-xs mt-1">{errors.buyer_name}</p>}
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
          <h2 className="text-xl font-bold text-neutral-900">Your Requirement</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Preferred Location</label>
              <select name="preferred_location" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg bg-white">
                <option value="">Any location</option>
                {LOCATIONS.map((l) => <option key={l.slug} value={l.name}>{l.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Property Type</label>
              <select name="preferred_type" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg bg-white">
                <option value="">Any type</option>
                {PROPERTY_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Min Budget (₹)</label>
              <input type="number" name="budget_min" placeholder="e.g. 500000" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Max Budget (₹)</label>
              <input type="number" name="budget_max" placeholder="e.g. 3000000" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Min Area (sq. ft.)</label>
              <input type="number" name="area_min" placeholder="e.g. 1000" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Road Access Required?</label>
              <select name="road_access" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg bg-white">
                <option value="">No preference</option>
                <option value="yes">Yes, required</option>
                <option value="preferred">Preferred but not required</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Additional Message</label>
            <textarea name="message" rows={3} placeholder="Any specific requirements, preferred areas, purpose..." className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg resize-none" />
          </div>

          <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2">
            Submit Requirement <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
