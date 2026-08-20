import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Maximize, Phone, Calendar, Users, ArrowRight, Share2, Shield, ChevronRight } from "lucide-react";
import { BRAND, LOCATIONS, formatPrice, formatArea, getPropertyWhatsAppLink, getWhatsAppLink } from "@/lib/constants";
import { trackPropertyView } from "@/lib/analytics";
import type { Metadata } from "next";

// Demo property data — replaced by Supabase query in production
const PROPERTIES: Record<string, {
  property_code: string; title: string; type: string; price: number; area_sqft: number;
  road_width: string; description: string; status: string; featured: boolean;
  features: string[]; views_count: number; location_slug: string;
  latitude: number; longitude: number;
}> = {
  "ZS-AUR-0001": {
    property_code: "ZS-AUR-0001", title: "Prime Residential Plot Near Aurangabad City Center",
    type: "plot", price: 1800000, area_sqft: 2400, road_width: "20 ft",
    description: "Well-located residential plot in a developing colony near Aurangabad city center. Ideal for building a family home. All basic amenities available nearby including schools, hospitals, and markets. The plot has a clear title and all documents are verified by our team.\n\nThis east-facing plot offers good ventilation and sunlight. The area is well-connected to the main market and bus stand. Municipal water supply and electricity are available.",
    status: "available", featured: true,
    features: ["Corner Plot", "East Facing", "Near School", "Municipal Water", "Electricity Available", "Clear Title", "Near Hospital"],
    views_count: 45, location_slug: "aurangabad", latitude: 24.7536, longitude: 84.3742,
  },
  "ZS-AUR-0002": {
    property_code: "ZS-AUR-0002", title: "Commercial Land on Main Road, Aurangabad",
    type: "commercial", price: 5500000, area_sqft: 5000, road_width: "40 ft",
    description: "High-visibility commercial plot on the main road in Aurangabad. Perfect for shops, offices, or a commercial complex. Heavy footfall area with good road connectivity. Ideal investment opportunity.",
    status: "available", featured: true,
    features: ["Main Road Facing", "Commercial Zone", "High Footfall", "Wide Road Access", "Near Bus Stand"],
    views_count: 72, location_slug: "aurangabad", latitude: 24.7550, longitude: 84.3760,
  },
  "ZS-OBR-0001": {
    property_code: "ZS-OBR-0001", title: "Agricultural Land in Obra with Road Access",
    type: "agricultural", price: 2200000, area_sqft: 43560, road_width: "12 ft",
    description: "Fertile agricultural land in Obra with existing road access. Suitable for farming or future development. Irrigation canal nearby. Clear ownership documents available.",
    status: "available", featured: false,
    features: ["Irrigation Nearby", "Road Access", "Fertile Soil", "Clear Title"],
    views_count: 22, location_slug: "obra", latitude: 24.6474, longitude: 84.4189,
  },
};

type Params = { code: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { code } = await params;
  const property = PROPERTIES[code];
  if (!property) return { title: "Property Not Found" };
  
  const loc = LOCATIONS.find((l) => l.slug === property.location_slug);
  return {
    title: `${property.title} | Jamin Lelo`,
    description: `${property.title} — ${formatPrice(property.price)} — ${formatArea(property.area_sqft)} in ${loc?.name || "Aurangabad"}, Bihar. Verified by Jamin Lelo.`,
    openGraph: {
      title: property.title,
      description: `${formatPrice(property.price)} — ${formatArea(property.area_sqft)} in ${loc?.name || "Aurangabad"}, Bihar`,
    },
  };
}

export default async function PropertyDetailPage({ params }: { params: Promise<Params> }) {
  const { code } = await params;
  const property = PROPERTIES[code];

  if (!property) {
    notFound();
  }

  const location = LOCATIONS.find((l) => l.slug === property.location_slug);
  const locationName = location?.name || "Aurangabad";
  const typeLabel = property.type.charAt(0).toUpperCase() + property.type.slice(1);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-neutral-500 gap-1 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link href="/properties" className="hover:text-primary-600">Properties</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link href={`/locations/${property.location_slug}`} className="hover:text-primary-600">{locationName}</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-neutral-800 font-medium">{property.property_code}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery Placeholder */}
            <div className="bg-linear-to-br from-primary-50 to-primary-100 rounded-2xl overflow-hidden aspect-video flex items-center justify-center relative">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary-400 mx-auto mb-3" />
                <p className="text-primary-600 font-medium text-lg">{typeLabel} Property</p>
                <p className="text-primary-500 text-sm">{property.property_code}</p>
              </div>
              {property.featured && (
                <span className="absolute top-4 left-4 bg-accent-500 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md">
                  ★ Featured
                </span>
              )}
              <span className="absolute top-4 right-4 bg-white/90 text-neutral-800 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-primary-600" />
                Verified by Jamin Lelo
              </span>
            </div>

            {/* Title & Price */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="status-available text-xs font-medium px-2.5 py-1 rounded-full">✓ Available</span>
                <span className="bg-neutral-100 text-neutral-600 text-xs font-medium px-2.5 py-1 rounded-full capitalize">{typeLabel}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">{property.title}</h1>
              <div className="flex items-center gap-1.5 text-neutral-500">
                <MapPin className="w-4 h-4" />
                <span>{locationName}, Aurangabad, Bihar</span>
              </div>
            </div>

            {/* Key Details */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <h2 className="font-semibold text-neutral-800 mb-4">Property Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-neutral-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-neutral-500 mb-1">Price</p>
                  <p className="text-lg font-bold text-primary-700">{formatPrice(property.price)}</p>
                </div>
                <div className="bg-neutral-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-neutral-500 mb-1">Area</p>
                  <p className="text-lg font-bold text-neutral-800">{formatArea(property.area_sqft)}</p>
                </div>
                <div className="bg-neutral-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-neutral-500 mb-1">Road Width</p>
                  <p className="text-lg font-bold text-neutral-800">{property.road_width}</p>
                </div>
                <div className="bg-neutral-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-neutral-500 mb-1">Price/sq.ft.</p>
                  <p className="text-lg font-bold text-neutral-800">
                    ₹{Math.round(property.price / property.area_sqft).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <h2 className="font-semibold text-neutral-800 mb-3">Description</h2>
              <div className="text-neutral-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </div>
            </div>

            {/* Features */}
            {property.features.length > 0 && (
              <div className="bg-white rounded-xl border border-neutral-200 p-6">
                <h2 className="font-semibold text-neutral-800 mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-neutral-700">
                      <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center shrink-0">
                        <svg className="w-3 h-3 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location Map Placeholder */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6">
              <h2 className="font-semibold text-neutral-800 mb-4">Location</h2>
              <div className="bg-neutral-100 rounded-lg aspect-video flex items-center justify-center">
                <div className="text-center text-neutral-400">
                  <MapPin className="w-10 h-10 mx-auto mb-2" />
                  <p className="text-sm font-medium">{locationName}, Aurangabad, Bihar</p>
                  <p className="text-xs mt-1">Map view — village-level precision (privacy protected)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6 sticky top-28">
              <div className="text-center mb-6">
                <p className="text-sm text-neutral-500">Price</p>
                <p className="text-3xl font-extrabold text-primary-700">{formatPrice(property.price)}</p>
                <p className="text-xs text-neutral-400 mt-1">Property Code: {property.property_code}</p>
              </div>

              <div className="space-y-3">
                <a
                  href={`tel:${BRAND.phone}`}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3.5 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call Jamin Lelo
                </a>

                <a
                  href={getPropertyWhatsAppLink(property.property_code)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full whatsapp-green text-white py-3.5 rounded-xl font-semibold hover:shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Enquiry
                </a>

                <Link
                  href={`/property/${property.property_code}#enquiry`}
                  className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 py-3.5 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Request Site Visit
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-6 pt-6 border-t border-neutral-100 space-y-3">
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Shield className="w-4 h-4 text-primary-600 shrink-0" />
                  <span>Verified by Jamin Lelo</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Users className="w-4 h-4 text-primary-600 shrink-0" />
                  <span>Seller identity protected</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Maximize className="w-4 h-4 text-primary-600 shrink-0" />
                  <span>Site visit available</span>
                </div>
              </div>
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
            "@type": "Offer",
            name: property.title,
            description: property.description,
            price: property.price,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            areaServed: { "@type": "City", name: locationName },
            seller: { "@type": "RealEstateAgent", name: BRAND.name, telephone: BRAND.phone },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: BRAND.website },
              { "@type": "ListItem", position: 2, name: "Properties", item: `${BRAND.website}/properties` },
              { "@type": "ListItem", position: 3, name: locationName, item: `${BRAND.website}/locations/${property.location_slug}` },
              { "@type": "ListItem", position: 4, name: property.property_code },
            ],
          }),
        }}
      />
    </div>
  );
}
