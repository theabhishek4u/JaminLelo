"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Lock,
  Heart,
  Award,
  Headphones,
  ShieldCheck,
  Users,
  FileText,
} from "lucide-react";
import { BRAND, getWhatsAppLink } from "@/lib/constants";
import { Logo } from "./Logo";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Buy Land" },
  { href: "/sell-your-property", label: "Sell Land" },
  { href: "/properties", label: "All Properties" },
  { href: "/properties?sort=newest", label: "New Properties" },
  { href: "/locations", label: "Popular Locations" },
  { href: "/contact?service=site-visit", label: "Site Visit" },
  { href: "/contact", label: "Contact Us" },
];

const OUR_SERVICES = [
  { href: "/services/documentation", label: "Land Brokerage" },
  { href: "/buy-property", label: "Buy Land" },
  { href: "/sell-your-property", label: "Sell Land" },
  { href: "/services/documentation", label: "Property Consultation" },
  { href: "/services/documentation", label: "Legal Assistance" },
  { href: "/services/documentation", label: "Documentation" },
  { href: "/services/documentation", label: "Site Visit Support" },
  { href: "/services/documentation", label: "Investment Guidance" },
];

const USEFUL_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#faqs", label: "FAQs" },
  { href: "/blog", label: "Blog & News" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/refund-policy", label: "Refund Policy" },
];

const TRUST_BAR_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Secure Transactions",
    desc: "Your safety is our priority",
  },
  {
    icon: Users,
    title: "100% Transparent",
    desc: "No hidden charges",
  },
  {
    icon: Award,
    title: "Verified Properties",
    desc: "Genuine & Verified Listings",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    desc: "Always here to help you",
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-[#072013] text-white pt-16 sm:pt-20 pb-8 overflow-hidden">
      {/* Background landscape subtle ambient gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-emerald-600/30 via-transparent to-transparent" />

      <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ============================================================
            MAIN 5-COLUMN FOOTER SECTION
            ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 pb-12">
          {/* Column 1: Brand Info & Mini Badges (Span 4) */}
          <div className="lg:col-span-4 space-y-5">
            <Logo dark />

            <p className="text-[13.5px] text-emerald-100/75 leading-relaxed max-w-sm">
              JaminLelo is a trusted platform for buying, selling and investing in land
              with complete transparency and professional support.
            </p>

            {/* 3 Mini Trust Badges */}
            <div className="space-y-2.5 pt-1 max-w-xs">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/4 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-white leading-tight">
                    Trusted &amp; Verified
                  </h4>
                  <p className="text-[11px] text-emerald-300/80 leading-tight mt-0.5">
                    100% Verified Properties
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/4 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-white leading-tight">
                    Expert Guidance
                  </h4>
                  <p className="text-[11px] text-emerald-300/80 leading-tight mt-0.5">
                    Professional Support
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/4 border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-white leading-tight">
                    Legal &amp; Safe
                  </h4>
                  <p className="text-[11px] text-emerald-300/80 leading-tight mt-0.5">
                    Complete Documentation
                  </p>
                </div>
              </div>
            </div>

            {/* Follow Us */}
            <div className="pt-2">
              <span className="block text-[13px] font-bold text-white mb-3">
                Follow Us
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                  aria-label="WhatsApp"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (Span 2) */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-[15px] mb-4 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-[13.5px] text-emerald-100/75 hover:text-white transition-colors block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services (Span 2) */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-[15px] mb-4 tracking-wide">
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {OUR_SERVICES.map((service, idx) => (
                <li key={idx}>
                  <Link
                    href={service.href}
                    className="text-[13.5px] text-emerald-100/75 hover:text-white transition-colors block py-0.5"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Useful Links (Span 2) */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-[15px] mb-4 tracking-wide">
              Useful Links
            </h3>
            <ul className="space-y-2.5">
              {USEFUL_LINKS.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-[13.5px] text-emerald-100/75 hover:text-white transition-colors block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Contact Us & Newsletter (Span 2 / 3) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-white font-bold text-[15px] mb-4 tracking-wide">
                Contact Us
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2.5 text-[13.5px] text-emerald-100/85">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href={`tel:${BRAND.phone}`} className="hover:text-white transition-colors">
                    +91 91234 56789
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-[13.5px] text-emerald-100/85">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href={`mailto:${BRAND.email}`} className="hover:text-white transition-colors">
                    info@jaminlelo.com
                  </a>
                </li>
                <li className="flex items-start gap-2.5 text-[13.5px] text-emerald-100/85">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span>Aurangabad, Bihar</span>
                    <span className="block text-[12px] text-emerald-200/60">India – 824101</span>
                  </div>
                </li>
                <li className="flex items-start gap-2.5 text-[13.5px] text-emerald-100/85">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
                    <span className="block text-[12px] text-emerald-200/60">Sunday Closed</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <h4 className="text-[14px] font-bold text-white mb-1.5">
                Subscribe to Our Newsletter
              </h4>
              <p className="text-[11.5px] text-emerald-200/70 mb-3 leading-snug">
                Get latest land listings, updates and offers straight to your inbox.
              </p>

              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center rounded-xl bg-white/[0.07] border border-white/15 p-1 focus-within:border-emerald-400 transition-colors">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent px-3 py-1.5 text-[13px] text-white placeholder:text-neutral-400 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="w-9 h-9 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                    aria-label="Subscribe"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="rounded-sm accent-emerald-500 w-3.5 h-3.5"
                  />
                  <span className="text-[11px] text-emerald-200/70 select-none">
                    I agree to receive updates and offers
                  </span>
                </label>

                {subscribed && (
                  <p className="text-[12px] text-emerald-400 font-semibold animate-fade-in">
                    Thank you for subscribing!
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* ============================================================
            MIDDLE TRUST STATS BAR
            ============================================================ */}
        <div className="border-t border-b border-white/10 py-6 my-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TRUST_BAR_ITEMS.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-emerald-300 shrink-0">
                    <IconComp className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-white leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[11.5px] text-emerald-200/70 font-normal leading-tight mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================
            BOTTOM BAR (COPYRIGHT & CREDITS)
            ============================================================ */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[12.5px] text-emerald-200/60">
          <p>© 2025 JaminLelo. All Rights Reserved.</p>

          <div className="flex items-center gap-1.5 text-emerald-200/80 font-medium">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Your Trusted Land Partner</span>
          </div>

          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 mx-0.5 inline" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
