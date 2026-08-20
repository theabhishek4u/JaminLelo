import Link from "next/link";
import {
  Search, MapPin, Phone, Shield, FileText, Users, ArrowRight,
  ChevronDown, CheckCircle2, Building2, Landmark, Home, TreePine
} from "lucide-react";
import { BRAND, LOCATIONS, FAQS, DOCUMENTATION_SERVICES,
  getWhatsAppLink, formatPrice } from "@/lib/constants";
import { HeroSection } from "@/components/public/HeroSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jamin Lelo | Land & Property for Sale in Aurangabad, Bihar",
  description: "Find verified land, plots, and properties for sale in Aurangabad, Bihar. Trusted brokerage with complete documentation support. Buy, sell, and verify with Jamin Lelo.",
};

// Demo data — Aurangabad City & Surrounding Villages
const FEATURED_PROPERTIES = [
  {
    property_code: "ZS-AUR-0001", title: "Prime Residential Plot Near Aurangabad City Center",
    type: "plot", price: 1800000, area_sqft: 2400, road_width: "20 ft",
    status: "available", featured: true, features: ["Corner Plot", "Near School", "Municipal Water", "Electricity Available"],
    views_count: 45, location: { name: "Aurangabad City (Town)", slug: "aurangabad-city" }, media: [],
  },
  {
    property_code: "ZS-JSO-0001", title: "Commercial Plot Near Jasoiya More Bypass",
    type: "commercial", price: 4200000, area_sqft: 3600, road_width: "40 ft",
    status: "available", featured: true, features: ["Main Bypass Road", "High Appreciation", "Immediate Registry"],
    views_count: 68, location: { name: "Jasoiya", slug: "jasoiya" }, media: [],
  },
  {
    property_code: "ZS-KRM-0001", title: "Residential House Plot on Karam Road",
    type: "plot", price: 2400000, area_sqft: 2800, road_width: "25 ft",
    status: "available", featured: true, features: ["Wide Road", "Peaceful Colony", "Verified Khatiyan"],
    views_count: 52, location: { name: "Karam Road", slug: "karam-road" }, media: [],
  },
  {
    property_code: "ZS-DNB-0001", title: "Prime Residential Land in Dani Bigha",
    type: "residential", price: 3200000, area_sqft: 2200, road_width: "20 ft",
    status: "available", featured: true, features: ["Near Stadium", "Posh Area", "Direct Owner Deal"],
    views_count: 76, location: { name: "Dani Bigha", slug: "dani-bigha" }, media: [],
  },
];

const LATEST_PROPERTIES = [
  {
    property_code: "ZS-NWD-0001", title: "Budget Residential Plot in Nawadih Village",
    type: "plot", price: 1250000, area_sqft: 1800, road_width: "16 ft",
    status: "available", featured: false, features: ["Near City Limit", "Clear Title", "Rapid Development"],
    views_count: 31, location: { name: "Nawadih", slug: "nawadih" }, media: [],
  },
  {
    property_code: "ZS-BHB-0001", title: "Commercial & Plotted Land in Bhabhandi",
    type: "commercial", price: 2900000, area_sqft: 3200, road_width: "30 ft",
    status: "available", featured: false, features: ["Bypass Connectivity", "Water Connection", "Clear Possession"],
    views_count: 27, location: { name: "Bhabhandi", slug: "bhabhandi" }, media: [],
  },
  {
    property_code: "ZS-PHP-0001", title: "Residential Land in Paharpura / Anugrah Nagar",
    type: "residential", price: 2100000, area_sqft: 2000, road_width: "18 ft",
    status: "available", featured: false, features: ["Good Neighborhood", "Electricity Available", "Ready for Construction"],
    views_count: 34, location: { name: "Paharpura", slug: "paharpura" }, media: [],
  },
  {
    property_code: "ZS-KOR-0001", title: "Agricultural Farm Land in Korma / Manjurahi",
    type: "agricultural", price: 3500000, area_sqft: 43560, road_width: "14 ft",
    status: "available", featured: false, features: ["Irrigation Available", "Fertile Soil", "Road Facing"],
    views_count: 22, location: { name: "Korma", slug: "korma" }, media: [],
  },
];

const STATS = [
  { value: "50+", label: "Verified Plots Listed" },
  { value: "10+", label: "Local Areas & Villages" },
  { value: "100+", label: "Happy Local Clients" },
  { value: "100%", label: "Document Verification" },
];

export default function HomePage() {
  return (
    <>
      {/* ============================================================
          HERO SECTION (Mockup Design)
          ============================================================ */}
      <HeroSection />

      {/* ============================================================
          FEATURED PROPERTIES
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">
              Hand-Picked
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-1">
              Featured Properties
            </h2>
            <p className="text-neutral-500 mt-2">
              Our best verified properties, ready for site visits
            </p>
          </div>
          <Link
            href="/properties?featured=true"
            className="hidden md:flex items-center gap-1.5 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
          {FEATURED_PROPERTIES.map((property) => (
            <PropertyCardInline key={property.property_code} property={property} />
          ))}
        </div>

        <div className="md:hidden mt-6 text-center">
          <Link
            href="/properties?featured=true"
            className="inline-flex items-center gap-1.5 text-primary-600 font-semibold"
          >
            View All Featured <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ============================================================
          BROWSE BY LOCATION
          ============================================================ */}
      <section className="bg-neutral-100/50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">
              Explore Areas
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-1">
              Browse by Location
            </h2>
            <p className="text-neutral-500 mt-2 max-w-xl mx-auto">
              Find plots and land across Aurangabad City and its surrounding villages & mauzas
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 stagger-children">
            {LOCATIONS.map((loc) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className="group bg-white rounded-xl p-5 border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center mx-auto mb-3 transition-colors">
                  <MapPin className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="font-semibold text-neutral-800 group-hover:text-primary-700 transition-colors">
                  {loc.name}
                </h3>
                <p className="text-xs text-neutral-400 mt-1">View Properties →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          LATEST PROPERTIES
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-sm font-semibold text-accent-600 uppercase tracking-wider">
              Just Listed
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-1">
              Latest Properties
            </h2>
          </div>
          <Link
            href="/properties"
            className="hidden md:flex items-center gap-1.5 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            Browse All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
          {LATEST_PROPERTIES.map((property) => (
            <PropertyCardInline key={property.property_code} property={property} />
          ))}
        </div>
      </section>

      {/* ============================================================
          BUY / SELL CTAs
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Buy CTA */}
          <div className="relative bg-linear-to-br from-primary-700 to-primary-900 rounded-2xl p-8 md:p-10 text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary-600/30 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <Home className="w-10 h-10 text-primary-300 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Looking to Buy?</h3>
              <p className="text-primary-100/80 mb-6">
                Browse verified properties across Aurangabad district. Every listing is inspected and documented by our team.
              </p>
              <Link
                href="/buy-property"
                className="inline-flex items-center gap-2 bg-white text-primary-800 px-6 py-3 rounded-xl font-semibold hover:bg-primary-50 transition-colors"
              >
                Submit Your Requirement <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Sell CTA */}
          <div className="relative bg-linear-to-br from-accent-600 to-accent-800 rounded-2xl p-8 md:p-10 text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent-500/30 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <Landmark className="w-10 h-10 text-accent-200 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Want to Sell?</h3>
              <p className="text-accent-100/80 mb-6">
                List your property with us. We handle verification, pricing, buyer negotiations, and documentation — you focus on your sale.
              </p>
              <Link
                href="/sell-your-property"
                className="inline-flex items-center gap-2 bg-white text-accent-800 px-6 py-3 rounded-xl font-semibold hover:bg-accent-50 transition-colors"
              >
                Sell Your Property <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          DOCUMENTATION SERVICES
          ============================================================ */}
      <section className="bg-neutral-100/50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">
              End-to-End Support
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-1">
              Land & Documentation Services
            </h2>
            <p className="text-neutral-500 mt-2 max-w-xl mx-auto">
              We handle the paperwork so you don&apos;t have to — from deed drafting to registry coordination
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {DOCUMENTATION_SERVICES.map((service, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-neutral-200 hover:border-primary-200 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center mb-4 transition-colors">
                  <FileText className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-neutral-800 mb-2">{service.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/services/documentation"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          WHY JAMIN LELO
          ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-1">
            Why Jamin Lelo?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
          {[
            {
              icon: <Shield className="w-7 h-7" />,
              title: "Verified Properties",
              desc: "Every property is personally inspected and document-verified by our team before listing.",
            },
            {
              icon: <Users className="w-7 h-7" />,
              title: "Local Expertise",
              desc: "Deep knowledge of Aurangabad district — we know every village, road, and market rate.",
            },
            {
              icon: <FileText className="w-7 h-7" />,
              title: "Documentation Support",
              desc: "Complete assistance with sale deeds, registry, mutation, and land records.",
            },
            {
              icon: <Phone className="w-7 h-7" />,
              title: "Personal Attention",
              desc: "One call and our team is on it. No chatbots, no call centers — just real local support.",
            },
          ].map((item, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 rounded-2xl bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center mx-auto mb-4 text-primary-600 transition-colors">
                {item.icon}
              </div>
              <h3 className="font-semibold text-neutral-800 mb-2">{item.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          HOW IT WORKS
          ============================================================ */}
      <section className="bg-linear-to-br from-primary-900 to-primary-800 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-sm font-semibold text-primary-300 uppercase tracking-wider">
              Simple Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-1">How It Works</h2>
            <p className="text-primary-200/70 mt-2">Three simple steps to your land deal</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Browse & Enquire",
                desc: "Search our verified listings. Found something you like? Call, WhatsApp, or submit an enquiry — we respond the same day.",
              },
              {
                step: "02",
                title: "Verify & Visit",
                desc: "Our team arranges a site visit, shares verified documents, and walks you through every detail of the property.",
              },
              {
                step: "03",
                title: "Deal & Document",
                desc: "We negotiate the best price, draft the sale deed, coordinate registry, and handle all paperwork until the deal is done.",
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors h-full">
                  <span className="text-5xl font-black text-primary-500/30 absolute top-4 right-6">
                    {item.step}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-lg font-bold mb-5">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-primary-100/70 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FAQ SECTION
          ============================================================ */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">
            Common Questions
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <details key={i} className="group bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-neutral-50 transition-colors list-none">
                <span className="font-semibold text-neutral-800 pr-4">{faq.question}</span>
                <ChevronDown className="w-5 h-5 text-neutral-400 shrink-0 group-open:rotate-180 transition-transform duration-200" />
              </summary>
              <div className="px-5 pb-5 text-neutral-600 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ============================================================
          CONTACT / CTA SECTION
          ============================================================ */}
      <section className="bg-neutral-100/50 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Ready to Start Your Land Journey?
          </h2>
          <p className="text-lg text-neutral-500 mb-8 max-w-2xl mx-auto">
            Whether you&apos;re buying, selling, or need documentation help — we&apos;re one call away.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${BRAND.phone}`}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Us Now
            </a>
            <a
              href={getWhatsAppLink("Hello Jamin Lelo, I want to discuss a property.")}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-green text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          JSON-LD Structured Data
          ============================================================ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            name: BRAND.name,
            description: BRAND.tagline,
            url: BRAND.website,
            telephone: BRAND.phone,
            email: BRAND.email,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Aurangabad",
              addressRegion: "Bihar",
              addressCountry: "IN",
            },
            areaServed: LOCATIONS.map((l) => ({
              "@type": "City",
              name: l.name,
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </>
  );
}

// --- Inline PropertyCard for Homepage (simplified) ---
function PropertyCardInline({ property }: { property: typeof FEATURED_PROPERTIES[0] }) {
  const typeLabel = property.type.charAt(0).toUpperCase() + property.type.slice(1);
  const typeIcons: Record<string, React.ReactNode> = {
    plot: <Building2 className="w-8 h-8 text-primary-600" />,
    agricultural: <TreePine className="w-8 h-8 text-primary-600" />,
    commercial: <Landmark className="w-8 h-8 text-primary-600" />,
    residential: <Home className="w-8 h-8 text-primary-600" />,
    house: <Home className="w-8 h-8 text-primary-600" />,
    flat: <Building2 className="w-8 h-8 text-primary-600" />,
  };

  return (
    <Link
      href={`/property/${property.property_code}`}
      className="group bg-white rounded-xl overflow-hidden border border-neutral-200 card-hover block"
    >
      <div className="relative aspect-4/3 bg-linear-to-br from-primary-50 to-primary-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary-200/50 flex items-center justify-center mx-auto mb-2">
            {typeIcons[property.type] || <MapPin className="w-8 h-8 text-primary-600" />}
          </div>
          <span className="text-sm text-primary-600 font-medium">{typeLabel}</span>
        </div>
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {property.featured && (
            <span className="bg-accent-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
              ★ Featured
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="bg-neutral-900/70 text-white text-xs px-2 py-0.5 rounded font-mono backdrop-blur-sm">
            {property.property_code}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="text-xl font-bold text-primary-700 mb-1">{formatPrice(property.price)}</div>
        <h3 className="font-semibold text-neutral-800 text-sm mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">
          {property.title}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-3">
          <MapPin className="w-3 h-3" />
          {property.location?.name}, Aurangabad
        </div>
        <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-100">
          <span>{property.area_sqft >= 43560 ? `${(property.area_sqft/43560).toFixed(1)} Acre` : `${property.area_sqft.toLocaleString()} sq.ft.`}</span>
          {property.road_width && <span>Road: {property.road_width}</span>}
        </div>
      </div>
    </Link>
  );
}
