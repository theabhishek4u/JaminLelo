import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ArrowRight, Phone, ChevronRight } from "lucide-react";
import { LOCATIONS, BRAND, formatPrice, formatArea, getWhatsAppLink } from "@/lib/constants";
import type { Metadata } from "next";

const DEMO_PROPERTIES_BY_LOCATION: Record<string, Array<{
  property_code: string; title: string; type: string; price: number; area_sqft: number;
  road_width: string; status: string; features: string[];
}>> = {
  "aurangabad-city": [
    { property_code: "ZS-AUR-0001", title: "Prime Residential Plot Near Aurangabad City Center", type: "plot", price: 1800000, area_sqft: 2400, road_width: "20 ft", status: "available", features: ["Corner Plot", "Near School", "Municipal Water"] },
    { property_code: "ZS-AUR-0002", title: "Commercial Land on Main Road, Aurangabad", type: "commercial", price: 5500000, area_sqft: 5000, road_width: "40 ft", status: "available", features: ["Main Road Facing", "High Footfall"] },
  ],
  jasoiya: [
    { property_code: "ZS-JSO-0001", title: "Commercial Plot Near Jasoiya More Bypass", type: "commercial", price: 4200000, area_sqft: 3600, road_width: "40 ft", status: "available", features: ["Main Bypass Road", "High Appreciation"] },
    { property_code: "ZS-JSO-0002", title: "Residential Plot in Jasoiya Colony", type: "plot", price: 1650000, area_sqft: 2100, road_width: "20 ft", status: "available", features: ["Gated Layout", "Electricity"] },
  ],
  "karam-road": [
    { property_code: "ZS-KRM-0001", title: "Residential House Plot on Karam Road", type: "plot", price: 2400000, area_sqft: 2800, road_width: "25 ft", status: "available", features: ["Wide Road", "Peaceful Colony"] },
  ],
  "dani-bigha": [
    { property_code: "ZS-DNB-0001", title: "Prime Residential Land in Dani Bigha", type: "residential", price: 3200000, area_sqft: 2200, road_width: "20 ft", status: "available", features: ["Near Stadium", "Posh Area"] },
  ],
  nawadih: [
    { property_code: "ZS-NWD-0001", title: "Budget Residential Plot in Nawadih Village", type: "plot", price: 1250000, area_sqft: 1800, road_width: "16 ft", status: "available", features: ["Near City Limit", "Clear Title"] },
  ],
  bhabhandi: [
    { property_code: "ZS-BHB-0001", title: "Commercial & Plotted Land in Bhabhandi", type: "commercial", price: 2900000, area_sqft: 3200, road_width: "30 ft", status: "available", features: ["Bypass Connectivity", "Clear Title"] },
  ],
  maharajganj: [
    { property_code: "ZS-MHG-0001", title: "Commercial Shop & Land in Maharajganj", type: "commercial", price: 6500000, area_sqft: 2500, road_width: "30 ft", status: "available", features: ["Market Area", "High Rental Income"] },
  ],
  paharpura: [
    { property_code: "ZS-PHP-0001", title: "Residential Land in Paharpura / Anugrah Nagar", type: "residential", price: 2100000, area_sqft: 2000, road_width: "18 ft", status: "available", features: ["Good Neighborhood", "Electricity Available"] },
  ],
  korma: [
    { property_code: "ZS-KOR-0001", title: "Agricultural Farm Land in Korma / Manjurahi", type: "agricultural", price: 3500000, area_sqft: 43560, road_width: "14 ft", status: "available", features: ["Irrigation Available", "Fertile Soil"] },
  ],
  shahpur: [
    { property_code: "ZS-SHP-0001", title: "Affordable Plot in Shahpur / Barawan Area", type: "plot", price: 950000, area_sqft: 1500, road_width: "15 ft", status: "available", features: ["Affordable", "Future Growth"] },
  ],
};

type Params = { slug: string };

export async function generateStaticParams() {
  return LOCATIONS.map((loc) => ({ slug: loc.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const loc = LOCATIONS.find((l) => l.slug === slug);
  if (!loc) return { title: "Location Not Found" };
  return {
    title: loc.seoTitle,
    description: loc.seoDescription,
  };
}

export default async function LocationPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const location = LOCATIONS.find((l) => l.slug === slug);

  if (!location) {
    notFound();
  }

  const properties = DEMO_PROPERTIES_BY_LOCATION[slug] || [];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <div className="bg-linear-to-br from-primary-800 to-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <nav className="flex items-center text-sm text-primary-200 gap-1 mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/locations" className="hover:text-white">Locations</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">{location.name}</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary-300" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Land & Property in {location.name}
              </h1>
              <p className="text-primary-200 mt-1">Aurangabad District, Bihar</p>
            </div>
          </div>
          <p className="text-primary-100/80 max-w-2xl leading-relaxed">
            {location.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Properties */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Available Properties in {location.name}
          </h2>
          <p className="text-neutral-500">
            {properties.length} {properties.length === 1 ? "property" : "properties"} available
          </p>
        </div>

        {properties.length === 0 ? (
          <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
            <MapPin className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">
              No listings yet in {location.name}
            </h3>
            <p className="text-neutral-500 mb-6">
              We&apos;re actively adding properties. Let us know what you&apos;re looking for!
            </p>
            <a
              href={getWhatsAppLink(`Hello Jamin Lelo, I am looking for property in ${location.name}.`)}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 whatsapp-green text-white px-6 py-3 rounded-xl font-semibold"
            >
              Tell Us on WhatsApp
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {properties.map((p) => (
              <Link
                key={p.property_code}
                href={`/property/${p.property_code}`}
                className="group bg-white rounded-xl overflow-hidden border border-neutral-200 card-hover block"
              >
                <div className="aspect-4/3 bg-linear-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-10 h-10 text-primary-500 mx-auto mb-1" />
                    <span className="text-sm text-primary-600 font-medium capitalize">{p.type}</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-lg font-bold text-primary-700 mb-1">{formatPrice(p.price)}</div>
                  <h3 className="font-semibold text-neutral-800 text-sm mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">{p.title}</h3>
                  <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-100">
                    <span>{formatArea(p.area_sqft)}</span>
                    <span>Road: {p.road_width}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 bg-linear-to-r from-primary-700 to-primary-800 rounded-2xl p-8 md:p-10 text-white">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold mb-3">
              Looking for Property in {location.name}?
            </h3>
            <p className="text-primary-100/80 mb-6">
              Can&apos;t find what you need? Tell us your requirements and our local team will find the perfect match.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${BRAND.phone}`} className="bg-white text-primary-800 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-primary-50 transition-colors">
                <Phone className="w-5 h-5" /> Call Us
              </a>
              <Link href="/buy-property" className="bg-white/10 border border-white/30 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-white/20 transition-colors">
                Submit Requirement <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: BRAND.website },
              { "@type": "ListItem", position: 2, name: "Locations", item: `${BRAND.website}/locations` },
              { "@type": "ListItem", position: 3, name: location.name },
            ],
          }),
        }}
      />
    </div>
  );
}
