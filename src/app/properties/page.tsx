import Link from "next/link";
import Image from "next/image";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  X,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Phone,
  Compass,
  Layers,
  CheckCircle2,
  Share2,
} from "lucide-react";
import { LOCATIONS, PROPERTY_TYPES, formatPrice, formatArea, getWhatsAppLink } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties for Sale in Aurangabad, Bihar | Jamin Lelo",
  description:
    "Browse 100% verified residential plots, commercial land, and farmland for sale in Aurangabad, Bihar. Verified titles, transparent pricing.",
};

// Realistic real estate listings — Aurangabad City & Prime Zones
const ALL_PROPERTIES = [
  {
    property_code: "ZS-AUR-0001",
    title: "Prime Residential Plot Near Aurangabad City Center",
    type: "plot",
    price: 1800000,
    area_sqft: 2400,
    katha: "1.7 Katha",
    road_width: "20 ft",
    facing: "East Facing",
    status: "available",
    featured: true,
    verified: true,
    image: "/images/properties/plot-residential.jpg",
    features: ["Corner Plot", "Near School", "Immediate Registry", "Clear 30-Yr Title"],
    views_count: 45,
    location: { name: "Aurangabad City (Town)", slug: "aurangabad-city" },
  },
  {
    property_code: "ZS-AUR-0002",
    title: "Commercial Land on Main Road, Aurangabad",
    type: "commercial",
    price: 5500000,
    area_sqft: 5000,
    katha: "3.6 Katha",
    road_width: "40 ft",
    facing: "North Facing",
    status: "available",
    featured: true,
    verified: true,
    image: "/images/properties/commercial-plot.jpg",
    features: ["Main Road Facing", "Commercial Zone", "High ROI", "Wide Frontage"],
    views_count: 72,
    location: { name: "Aurangabad City (Town)", slug: "aurangabad-city" },
  },
  {
    property_code: "ZS-JSO-0001",
    title: "Commercial Plot Near Jasoiya More Bypass",
    type: "commercial",
    price: 4200000,
    area_sqft: 3600,
    katha: "2.6 Katha",
    road_width: "40 ft",
    facing: "South-East",
    status: "available",
    featured: true,
    verified: true,
    image: "/images/properties/commercial-plot.jpg",
    features: ["Main Bypass Road", "High Appreciation", "Heavy Vehicle Access"],
    views_count: 68,
    location: { name: "Jasoiya", slug: "jasoiya" },
  },
  {
    property_code: "ZS-JSO-0002",
    title: "Residential Plot in Jasoiya Colony",
    type: "plot",
    price: 1650000,
    area_sqft: 2100,
    katha: "1.5 Katha",
    road_width: "20 ft",
    facing: "East Facing",
    status: "available",
    featured: false,
    verified: true,
    image: "/images/properties/plot-residential.jpg",
    features: ["Gated Layout", "Electricity Ready", "Sweet Drinking Water"],
    views_count: 39,
    location: { name: "Jasoiya", slug: "jasoiya" },
  },
  {
    property_code: "ZS-KRM-0001",
    title: "Residential House Plot on Karam Road",
    type: "plot",
    price: 2400000,
    area_sqft: 2800,
    katha: "2.0 Katha",
    road_width: "25 ft",
    facing: "North Facing",
    status: "available",
    featured: true,
    verified: true,
    image: "/images/properties/posh-plot.jpg",
    features: ["Wide Road", "Peaceful Colony", "Ready for Construction"],
    views_count: 52,
    location: { name: "Karam Road", slug: "karam-road" },
  },
  {
    property_code: "ZS-DNB-0001",
    title: "Prime Residential Land in Dani Bigha",
    type: "residential",
    price: 3200000,
    area_sqft: 2200,
    katha: "1.6 Katha",
    road_width: "20 ft",
    facing: "East Facing",
    status: "available",
    featured: true,
    verified: true,
    image: "/images/properties/posh-plot.jpg",
    features: ["Near Stadium", "Posh Area", "VIP Neighborhood"],
    views_count: 76,
    location: { name: "Dani Bigha", slug: "dani-bigha" },
  },
  {
    property_code: "ZS-NWD-0001",
    title: "Budget Residential Plot in Nawadih Village",
    type: "plot",
    price: 1250000,
    area_sqft: 1800,
    katha: "1.3 Katha",
    road_width: "16 ft",
    facing: "West Facing",
    status: "available",
    featured: false,
    verified: true,
    image: "/images/properties/plot-residential.jpg",
    features: ["Near City Limit", "Clear Title", "Affordable Price"],
    views_count: 31,
    location: { name: "Nawadih", slug: "nawadih" },
  },
  {
    property_code: "ZS-BHB-0001",
    title: "Commercial & Plotted Land in Bhabhandi",
    type: "commercial",
    price: 2900000,
    area_sqft: 3200,
    katha: "2.3 Katha",
    road_width: "30 ft",
    facing: "North-East",
    status: "available",
    featured: false,
    verified: true,
    image: "/images/properties/commercial-plot.jpg",
    features: ["Bypass Connectivity", "Clear Title", "Fast Developing"],
    views_count: 27,
    location: { name: "Bhabhandi", slug: "bhabhandi" },
  },
  {
    property_code: "ZS-MHG-0001",
    title: "Commercial Shop & Land in Maharajganj",
    type: "commercial",
    price: 6500000,
    area_sqft: 2500,
    katha: "1.8 Katha",
    road_width: "30 ft",
    facing: "South Facing",
    status: "available",
    featured: false,
    verified: true,
    image: "/images/properties/commercial-plot.jpg",
    features: ["Market Center", "High Footfall", "Instant Rental Income"],
    views_count: 42,
    location: { name: "Maharajganj", slug: "maharajganj" },
  },
  {
    property_code: "ZS-PHP-0001",
    title: "Residential Land in Paharpura / Anugrah Nagar",
    type: "residential",
    price: 2100000,
    area_sqft: 2000,
    katha: "1.4 Katha",
    road_width: "18 ft",
    facing: "North Facing",
    status: "available",
    featured: false,
    verified: true,
    image: "/images/properties/posh-plot.jpg",
    features: ["Good Neighborhood", "Electricity Available", "Street Lights"],
    views_count: 34,
    location: { name: "Paharpura", slug: "paharpura" },
  },
  {
    property_code: "ZS-KOR-0001",
    title: "Agricultural Farm Land in Korma / Manjurahi",
    type: "agricultural",
    price: 3500000,
    area_sqft: 43560,
    katha: "1.00 Acre (32 Katha)",
    road_width: "14 ft",
    facing: "Open Surroundings",
    status: "available",
    featured: false,
    verified: true,
    image: "/images/properties/agricultural-plot.jpg",
    features: ["Irrigation Borewell", "Fertile Soil", "Road Connected"],
    views_count: 22,
    location: { name: "Korma", slug: "korma" },
  },
  {
    property_code: "ZS-SHP-0001",
    title: "Affordable Plot in Shahpur / Barawan Area",
    type: "plot",
    price: 950000,
    area_sqft: 1500,
    katha: "1.1 Katha",
    road_width: "15 ft",
    facing: "East Facing",
    status: "available",
    featured: false,
    verified: true,
    image: "/images/properties/plot-residential.jpg",
    features: ["High Growth Potential", "Clear Registry", "Best for Investment"],
    views_count: 18,
    location: { name: "Shahpur", slug: "shahpur" },
  },
];

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const locFilter = typeof params.location === "string" ? params.location : "";
  const typeFilter = typeof params.type === "string" ? params.type : "";
  const minPrice = typeof params.min_price === "string" ? parseInt(params.min_price) : 0;
  const maxPrice = typeof params.max_price === "string" ? parseInt(params.max_price) : 0;

  // Filter logic
  let filtered = ALL_PROPERTIES;
  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.property_code.toLowerCase().includes(q) ||
        p.location.name.toLowerCase().includes(q)
    );
  }
  if (locFilter) filtered = filtered.filter((p) => p.location.slug === locFilter);
  if (typeFilter) filtered = filtered.filter((p) => p.type === typeFilter);
  if (minPrice) filtered = filtered.filter((p) => p.price >= minPrice);
  if (maxPrice) filtered = filtered.filter((p) => p.price <= maxPrice);

  const hasFilters = Boolean(query || locFilter || typeFilter || minPrice || maxPrice);

  return (
    <div className="min-h-screen bg-[#f7f9f8]">
      {/* ============================================================
          TOP HEADER BANNER
          ============================================================ */}
      <div className="bg-white border-b border-neutral-200/80 pt-7 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-neutral-400 mb-4">
            <Link href="/" className="hover:text-[#0c3924] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#0c3924] font-bold">Properties</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[12px] font-bold text-[#0c3924] mb-2.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Legal & Verified Land Listings</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-neutral-900 tracking-tight leading-tight">
                Verified Land & Plots in Aurangabad
              </h1>
              <p className="text-neutral-500 text-sm sm:text-[15px] mt-1.5 max-w-2xl font-normal">
                Direct owner deals, verified 30-year documentation, and transparent on-ground site visits.
              </p>
            </div>

            {/* Quick stats pill */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-[#f0f7f3] border border-emerald-100 px-4 py-2.5 rounded-2xl text-right">
                <span className="text-xs text-neutral-500 font-medium block">Showing Results</span>
                <span className="text-lg font-black text-[#0c3924]">
                  {filtered.length} <span className="text-xs font-semibold text-neutral-500">Properties</span>
                </span>
              </div>
              {hasFilters && (
                <Link
                  href="/properties"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3.5 py-2.5 rounded-2xl transition-colors"
                >
                  <X className="w-4 h-4" /> Reset Filters
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          MAIN CONTENT CONTAINER
          ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TOP HORIZONTAL SEARCH & FILTER BAR */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] mb-8">
          <form
            action="/properties"
            method="GET"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center"
          >
            {/* 1. Keyword / Code Search */}
            <div className="lg:col-span-4 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search plot code, colony, keyword..."
                className="w-full pl-11 pr-4 py-3 bg-[#f8faf9] hover:bg-[#f1f5f3] focus:bg-white border border-neutral-200/80 rounded-2xl text-sm font-medium text-neutral-800 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-[#0c3924]/20 transition-all"
              />
            </div>

            {/* 2. Location Dropdown */}
            <div className="lg:col-span-3">
              <select
                name="location"
                defaultValue={locFilter}
                className="w-full px-4 py-3 bg-[#f8faf9] hover:bg-[#f1f5f3] focus:bg-white border border-neutral-200/80 rounded-2xl text-sm font-semibold text-neutral-800 focus:outline-hidden focus:ring-2 focus:ring-[#0c3924]/20 transition-all cursor-pointer"
              >
                <option value="">All Locations (Aurangabad)</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc.slug} value={loc.slug}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Property Type Dropdown */}
            <div className="lg:col-span-2">
              <select
                name="type"
                defaultValue={typeFilter}
                className="w-full px-4 py-3 bg-[#f8faf9] hover:bg-[#f1f5f3] focus:bg-white border border-neutral-200/80 rounded-2xl text-sm font-semibold text-neutral-800 focus:outline-hidden focus:ring-2 focus:ring-[#0c3924]/20 transition-all cursor-pointer"
              >
                <option value="">All Types</option>
                {PROPERTY_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Price Inputs */}
            <div className="lg:col-span-2 flex gap-2">
              <input
                type="number"
                name="min_price"
                defaultValue={minPrice || ""}
                placeholder="Min ₹"
                className="w-1/2 px-3 py-3 bg-[#f8faf9] focus:bg-white border border-neutral-200/80 rounded-2xl text-xs font-semibold text-neutral-800 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-[#0c3924]/20 transition-all"
              />
              <input
                type="number"
                name="max_price"
                defaultValue={maxPrice || ""}
                placeholder="Max ₹"
                className="w-1/2 px-3 py-3 bg-[#f8faf9] focus:bg-white border border-neutral-200/80 rounded-2xl text-xs font-semibold text-neutral-800 placeholder:text-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-[#0c3924]/20 transition-all"
              />
            </div>

            {/* 5. Submit Button */}
            <div className="lg:col-span-1 sm:col-span-2">
              <button
                type="submit"
                className="w-full h-12 bg-[#0c3924] hover:bg-[#072618] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4 text-emerald-300" />
                <span className="lg:hidden">Apply Filters</span>
              </button>
            </div>
          </form>

          {/* Quick preset tags row */}
          <div className="mt-3.5 pt-3.5 border-t border-neutral-100 flex flex-wrap items-center gap-2 text-xs font-medium text-neutral-500">
            <span className="text-neutral-400 font-semibold mr-1">Quick Filters:</span>
            <Link
              href="/properties"
              className={`px-3 py-1 rounded-full border transition-all ${
                !locFilter && !typeFilter
                  ? "bg-[#0c3924] text-white border-[#0c3924] font-bold"
                  : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-700"
              }`}
            >
              All
            </Link>
            <Link
              href="/properties?type=plot"
              className={`px-3 py-1 rounded-full border transition-all ${
                typeFilter === "plot"
                  ? "bg-[#0c3924] text-white border-[#0c3924] font-bold"
                  : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-700"
              }`}
            >
              🏡 Residential Plots
            </Link>
            <Link
              href="/properties?type=commercial"
              className={`px-3 py-1 rounded-full border transition-all ${
                typeFilter === "commercial"
                  ? "bg-[#0c3924] text-white border-[#0c3924] font-bold"
                  : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-700"
              }`}
            >
              🏢 Commercial Land
            </Link>
            <Link
              href="/properties?type=agricultural"
              className={`px-3 py-1 rounded-full border transition-all ${
                typeFilter === "agricultural"
                  ? "bg-[#0c3924] text-white border-[#0c3924] font-bold"
                  : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-700"
              }`}
            >
              🌾 Farm Land
            </Link>
            <Link
              href="/properties?location=aurangabad-city"
              className={`px-3 py-1 rounded-full border transition-all ${
                locFilter === "aurangabad-city"
                  ? "bg-[#0c3924] text-white border-[#0c3924] font-bold"
                  : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-700"
              }`}
            >
              📍 Aurangabad City
            </Link>
            <Link
              href="/properties?location=jasoiya"
              className={`px-3 py-1 rounded-full border transition-all ${
                locFilter === "jasoiya"
                  ? "bg-[#0c3924] text-white border-[#0c3924] font-bold"
                  : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-700"
              }`}
            >
              📍 Jasoiya Bypass
            </Link>
            <Link
              href="/properties?max_price=2500000"
              className={`px-3 py-1 rounded-full border transition-all ${
                maxPrice === 2500000
                  ? "bg-[#0c3924] text-white border-[#0c3924] font-bold"
                  : "bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-700"
              }`}
            >
              💰 Under ₹25 Lakh
            </Link>
          </div>
        </div>

        {/* ============================================================
            PROPERTIES RESULTS GRID (RICH REAL ESTATE CARDS)
            ============================================================ */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl border border-neutral-200/90 p-12 text-center max-w-xl mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#0c3924] flex items-center justify-center mx-auto mb-4 border border-emerald-100">
              <Search className="w-7 h-7 text-[#0c3924]" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">No Matching Land Found</h3>
            <p className="text-neutral-500 mb-6 text-sm leading-relaxed">
              We frequently receive off-market verified plots that aren&apos;t listed online yet. Tell us your budget & location requirement!
            </p>
            <a
              href={getWhatsAppLink(
                "Hello Jamin Lelo team, I am searching for a land plot in Aurangabad but couldn't find a matching one on your website. Please assist me."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25d366] hover:bg-[#1eb954] text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>Share Requirement on WhatsApp</span>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((property) => {
              // Calculate estimated rate per sqft
              const pricePerSqft = Math.round(property.price / property.area_sqft);

              return (
                <div
                  key={property.property_code}
                  className="group bg-white rounded-3xl overflow-hidden border border-neutral-200/80 hover:border-emerald-500/50 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(12,57,36,0.12)] transition-all duration-300 flex flex-col"
                >
                  {/* Photo Container */}
                  <Link
                    href={`/property/${property.property_code}`}
                    className="relative aspect-4/3 overflow-hidden block bg-neutral-100"
                  >
                    <Image
                      src={property.image}
                      alt={property.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-108 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Badges Top Left & Right */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                      {property.featured && (
                        <span className="bg-amber-500 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                          <Sparkles className="w-3 h-3 fill-white" /> Featured
                        </span>
                      )}
                      <span className="bg-emerald-800/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <CheckCircle2 className="w-3 h-3 text-emerald-300" /> Verified
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 z-10">
                      <span className="bg-black/60 backdrop-blur-md text-white font-mono text-[10.5px] font-bold px-2.5 py-1 rounded-lg border border-white/20">
                        {property.property_code}
                      </span>
                    </div>

                    {/* Bottom overlay info */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white z-10">
                      <div className="capitalize text-xs font-bold px-2.5 py-1 rounded-lg bg-white/20 backdrop-blur-md border border-white/30">
                        {property.type === "plot" ? "Residential Plot" : property.type}
                      </div>
                      <div className="text-[11px] font-medium text-white/90 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
                        ₹{pricePerSqft}/sq.ft
                      </div>
                    </div>
                  </Link>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Price & Katha */}
                      <div className="flex items-baseline justify-between mb-1.5">
                        <div className="text-[22px] font-black text-[#0c3924] tracking-tight">
                          {formatPrice(property.price)}
                        </div>
                        {property.katha && (
                          <span className="text-[12px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-md">
                            {property.katha}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <Link
                        href={`/property/${property.property_code}`}
                        className="block font-bold text-neutral-900 text-[14.5px] leading-snug line-clamp-2 group-hover:text-[#0c3924] transition-colors mb-2.5"
                      >
                        {property.title}
                      </Link>

                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-3.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate font-medium">
                          {property.location.name}, Aurangabad
                        </span>
                      </div>

                      {/* Key Specs Pills */}
                      <div className="grid grid-cols-2 gap-2 p-2.5 bg-[#f8faf9] rounded-2xl text-[11.5px] text-neutral-600 border border-neutral-100 mb-3.5">
                        <div className="flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-[#0c3924] shrink-0" />
                          <span className="font-semibold">{formatArea(property.area_sqft)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Compass className="w-3.5 h-3.5 text-[#0c3924] shrink-0" />
                          <span className="truncate font-medium">{property.facing || "Road Access"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="pt-3 border-t border-neutral-100 flex items-center gap-2">
                      <Link
                        href={`/property/${property.property_code}`}
                        className="flex-1 h-10 bg-[#0c3924] hover:bg-[#072618] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <a
                        href={getWhatsAppLink(
                          `Hello Jamin Lelo, I want more details & site visit for property ${property.property_code} (${property.title}) priced at ${formatPrice(property.price)}.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp Inquiry"
                        className="w-10 h-10 rounded-xl bg-[#eafaf1] hover:bg-[#d5f4e3] text-[#25d366] flex items-center justify-center transition-all border border-emerald-200/80 shrink-0"
                      >
                        <Phone className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ============================================================
            BOTTOM HELP / CONSULTATION BANNER
            ============================================================ */}
        <div className="mt-14 bg-linear-to-r from-[#0c3924] to-[#165b3b] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-emerald-200 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Free Land Advisory Service
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Can&apos;t find your exact plot requirement?
            </h2>
            <p className="text-emerald-100/80 text-sm mt-2 font-normal leading-relaxed">
              Our ground team in Aurangabad has verified direct-from-owner plots across Dani Bigha, Jasoiya, Bypass, and surrounding areas.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href="tel:+919123456789"
              className="px-6 py-3.5 bg-white text-[#0c3924] hover:bg-neutral-100 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Phone className="w-4 h-4 fill-[#0c3924]" />
              <span>Call +91 91234 56789</span>
            </a>
            <a
              href={getWhatsAppLink("Hello Jamin Lelo, I need a personalized land recommendation in Aurangabad.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#25d366] hover:bg-[#1eb954] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
