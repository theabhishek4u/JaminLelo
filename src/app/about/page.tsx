import Link from "next/link";
import { Shield, MapPin, Phone, Award, Heart } from "lucide-react";
import { BRAND, LOCATIONS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Jamin Lelo — your trusted land and property partner in Aurangabad, Bihar. Local expertise, verified properties, complete documentation support.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <div className="bg-linear-to-br from-primary-800 to-primary-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Jamin Lelo</h1>
          <p className="text-primary-100/80 text-lg max-w-2xl mx-auto leading-relaxed">
            We bridge the gap between land owners and buyers in Aurangabad, Bihar — with trust, transparency, and complete documentation support.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">
        {/* Our Story */}
        <section>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Our Story</h2>
          <div className="prose prose-neutral max-w-none text-neutral-600 leading-relaxed space-y-4">
            <p>
              Jamin Lelo was born from a simple observation: buying and selling land in Aurangabad is difficult, stressful, and riddled with trust issues. Fake listings, unclear titles, paperwork confusion, and fear of being cheated — these are the daily realities for land buyers and sellers in our region.
            </p>
            <p>
              Our founding team brings years of local experience in land transactions, documentation, and brokerage. We decided to combine this on-the-ground expertise with modern technology to create a platform that makes land deals simple, transparent, and trustworthy.
            </p>
            <p>
              <strong>Jamin Lelo is not just a website — it&apos;s a local service.</strong> Every property on our platform is personally inspected. Every seller is verified. Every document is reviewed. When you deal with Jamin Lelo, you deal with real people who know this land, these villages, and these markets.
            </p>
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-2xl font-bold text-neutral-900 mb-8">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Shield className="w-6 h-6" />, title: "Trust First", desc: "We never list unverified properties. Our reputation is built on one deal at a time." },
              { icon: <Heart className="w-6 h-6" />, title: "Seller Privacy", desc: "Seller identity is never exposed publicly. We act as the trusted intermediary." },
              { icon: <Award className="w-6 h-6" />, title: "No False Claims", desc: "We never say '100% safe' or 'guaranteed.' We share what we've verified — honestly." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-neutral-200 p-6">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600 mb-3">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-neutral-800 mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Coverage */}
        <section>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">Our Local Coverage</h2>
          <p className="text-neutral-600 mb-6">
            We specialize exclusively in Aurangabad City and its surrounding local areas, villages, and mauzas:
          </p>
          <div className="flex flex-wrap gap-2">
            {LOCATIONS.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="flex items-center gap-1.5 bg-white border border-neutral-200 px-4 py-2 rounded-full text-sm text-neutral-700 hover:border-primary-300 hover:text-primary-700 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                {loc.name}
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-linear-to-r from-primary-700 to-primary-800 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to Work With Us?</h2>
          <p className="text-primary-100/80 mb-6">Contact us today — we&apos;re always happy to help.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={`tel:${BRAND.phone}`} className="bg-white text-primary-800 px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
              <Phone className="w-5 h-5" /> Call Us
            </a>
            <Link href="/contact" className="bg-white/10 border border-white/30 text-white px-6 py-3 rounded-xl font-semibold">
              Contact Page →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
