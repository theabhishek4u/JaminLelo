"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import {
  ArrowLeft,
  Save,
  Upload,
  Sparkles,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Eye,
  Trash2,
  Star,
  FileText,
  DollarSign,
  Layers,
  Phone,
  User,
  Compass,
  Check,
  Building,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { LOCATIONS, PROPERTY_TYPES, PROPERTY_STATUSES, formatPrice } from "@/lib/constants";

// Bihar / Aurangabad Standard Land Unit Constants
// 1 Kathaa = 1361.25 sq ft
// 1 Dhur = 68.0625 sq ft (20 Dhur = 1 Kathaa)
// 1 Dismil (Decimal) = 435.6 sq ft
// 1 Bigha = 20 Kathaa = 27,225 sq ft
// 1 Acre = 43,560 sq ft = 32 Kathaa
const SQFT_PER_KATHAA = 1361.25;
const SQFT_PER_DHUR = 68.0625;
const SQFT_PER_DISMIL = 435.6;
const SQFT_PER_BIGHA = 27225;

const HIGHLIGHT_BADGES = [
  { id: "clear_title", label: "100% Clear Title", icon: "🛡️" },
  { id: "registry_ready", label: "Immediate Registry Ready", icon: "✍️" },
  { id: "khatiyan_verified", label: "Khatiyan & Jamabandi Verified", icon: "📜" },
  { id: "mutation_done", label: "Dakhil Kharij Done", icon: "🏛️" },
  { id: "rasid_updated", label: "Lagan Rasid Up-to-Date", icon: "🧾" },
  { id: "boundary_wall", label: "Boundary Wall Constructed", icon: "🧱" },
  { id: "road_facing", label: "Wide Road Facing", icon: "🛣️" },
  { id: "corner_plot", label: "Prime Corner Plot", icon: "📐" },
  { id: "electricity", label: "Electricity Line Available", icon: "⚡" },
  { id: "water_supply", label: "Water / Boring Available", icon: "💧" },
  { id: "car_access", label: "4-Wheeler Car Access", icon: "🚗" },
  { id: "near_market", label: "Near School & Market", icon: "🏫" },
  { id: "high_roi", label: "High Appreciation / ROI", icon: "📈" },
  { id: "peaceful_colony", label: "Peaceful Residential Colony", icon: "🏡" },
];

const FACING_OPTIONS = [
  "North (उत्तर)",
  "East (पूरब - Most Preferred)",
  "West (पश्चिम)",
  "South (दक्षिण)",
  "North-East (ईशान कोण)",
  "North-West (वायव्य कोण)",
  "South-East (आग्नेय कोण)",
  "South-West (नैऋत्य कोण)",
  "Two Side Open (Corner)",
  "Three Side Open",
];

interface UploadedImage {
  id: string;
  url: string;
  name: string;
  size: string;
  isCover: boolean;
}

export default function AdminAddPropertyPage() {
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");

  // Basic Form States
  const [title, setTitle] = useState("");
  const [type, setType] = useState("plot");
  const [locationId, setLocationId] = useState("");
  const [status, setStatus] = useState("available");
  const [featured, setFeatured] = useState(false);
  const [verifiedBadge, setVerifiedBadge] = useState(true);

  // Measurements & Calculations
  const [areaSqft, setAreaSqft] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [inputUnit, setInputUnit] = useState<"sqft" | "kathaa" | "dismil" | "dhur">("sqft");
  const [unitInputValue, setUnitInputValue] = useState<number | "">("");

  // Dimensions & Details
  const [roadWidth, setRoadWidth] = useState("20 ft");
  const [frontage, setFrontage] = useState("");
  const [depth, setDepth] = useState("");
  const [facing, setFacing] = useState("East (पूरब - Most Preferred)");
  const [description, setDescription] = useState("");

  // Land Badges & Highlights
  const [selectedBadges, setSelectedBadges] = useState<string[]>([
    "clear_title",
    "registry_ready",
    "khatiyan_verified",
    "car_access",
  ]);

  // Location & Land Record (Khata/Khesra)
  const [mauza, setMauza] = useState("");
  const [thanaNo, setThanaNo] = useState("");
  const [khataNo, setKhataNo] = useState("");
  const [khesraNo, setKhesraNo] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [mapPrecision, setMapPrecision] = useState("village_level");

  // Seller Info (Internal CRM - Hidden from Public)
  const [sellerName, setSellerName] = useState("");
  const [sellerPhone, setSellerPhone] = useState("");
  const [sellerMinPrice, setSellerMinPrice] = useState<number | "">("");
  const [internalNotes, setInternalNotes] = useState("");
  const [docsVerified, setDocsVerified] = useState({
    khatiyan: true,
    rasid: true,
    jamabandi: true,
    sellerAadhaar: true,
  });

  // Images state with initial rich defaults
  const [images, setImages] = useState<UploadedImage[]>([
    {
      id: "img-1",
      url: "/images/properties/plot-residential.jpg",
      name: "plot-front-view.jpg",
      size: "1.4 MB",
      isCover: true,
    },
  ]);

  // Auto-calculated property code
  const generatedCode = useMemo(() => {
    const locObj = LOCATIONS.find((l) => l.id === locationId);
    const locPrefix = locObj ? locObj.code : "AUR";
    const typePrefix =
      type === "plot"
        ? "PLT"
        : type === "residential" || type === "house"
        ? "RES"
        : type === "commercial"
        ? "COM"
        : type === "agricultural"
        ? "AGR"
        : "PRP";
    const randomNum = "24" + Math.floor(10 + Math.random() * 89);
    return `${locPrefix}-${typePrefix}-${randomNum}`;
  }, [locationId, type]);

  // Land Unit Conversions calculations
  const sqftValue = useMemo(() => {
    if (inputUnit === "sqft") return typeof areaSqft === "number" ? areaSqft : 0;
    if (typeof unitInputValue !== "number" || unitInputValue <= 0) return 0;

    if (inputUnit === "kathaa") return unitInputValue * SQFT_PER_KATHAA;
    if (inputUnit === "dhur") return unitInputValue * SQFT_PER_DHUR;
    if (inputUnit === "dismil") return unitInputValue * SQFT_PER_DISMIL;
    return 0;
  }, [inputUnit, areaSqft, unitInputValue]);

  const conversions = useMemo(() => {
    if (!sqftValue || sqftValue <= 0) return null;
    const kathaa = sqftValue / SQFT_PER_KATHAA;
    const dhur = sqftValue / SQFT_PER_DHUR;
    const dismil = sqftValue / SQFT_PER_DISMIL;
    const bigha = sqftValue / SQFT_PER_BIGHA;

    return {
      kathaa: kathaa.toFixed(2),
      dhur: dhur.toFixed(1),
      dismil: dismil.toFixed(2),
      bigha: bigha.toFixed(3),
      sqft: Math.round(sqftValue).toLocaleString("en-IN"),
    };
  }, [sqftValue]);

  // Price per unit calculations
  const priceCalculations = useMemo(() => {
    if (typeof price !== "number" || price <= 0 || !sqftValue || sqftValue <= 0) {
      return null;
    }
    const ratePerSqft = Math.round(price / sqftValue);
    const kathaaCount = sqftValue / SQFT_PER_KATHAA;
    const ratePerKathaa = Math.round(price / kathaaCount);
    const dismilCount = sqftValue / SQFT_PER_DISMIL;
    const ratePerDismil = Math.round(price / dismilCount);

    return {
      ratePerSqft: ratePerSqft.toLocaleString("en-IN"),
      ratePerKathaa: ratePerKathaa.toLocaleString("en-IN"),
      ratePerDismil: ratePerDismil.toLocaleString("en-IN"),
      formattedTotal: formatPrice(price),
    };
  }, [price, sqftValue]);

  // Handler for location quick select
  const handleLocationChange = (id: string) => {
    setLocationId(id);
    const selected = LOCATIONS.find((l) => l.id === id);
    if (selected) {
      setLatitude(selected.lat.toString());
      setLongitude(selected.lng.toString());
    }
  };

  // Toggle Highlight Badge
  const toggleBadge = (badgeId: string) => {
    setSelectedBadges((prev) =>
      prev.includes(badgeId) ? prev.filter((id) => id !== badgeId) : [...prev, badgeId]
    );
  };

  // Image Upload Mock
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newImg: UploadedImage = {
        id: "img-" + Date.now(),
        url: URL.createObjectURL(file),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        isCover: images.length === 0,
      };
      setImages((prev) => [...prev, newImg]);
    }
  };

  const setCoverImage = (id: string) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isCover: img.id === id,
      }))
    );
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      if (filtered.length > 0 && !filtered.some((img) => img.isCover)) {
        filtered[0].isCover = true;
      }
      return filtered;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    // Simulate saving to backend / Supabase
    setTimeout(() => {
      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-neutral-200/90 shadow-xs">
        <div className="flex items-center gap-3.5">
          <Link
            href="/admin/properties"
            className="p-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
            title="Back to Properties"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                Add New Property
              </h1>
              <span className="px-2.5 py-0.5 rounded-md bg-[#eaf4ee] text-[#0c3924] border border-[#c3e3d0] font-mono text-xs font-bold">
                {generatedCode}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-semibold">
                Auto-Draft
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
              Aurangabad, Bihar — Complete land specifications, unit conversions, and document checks
            </p>
          </div>
        </div>

        {/* Tab switcher & preview */}
        <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab("form")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "form"
                ? "bg-white text-[#0c3924] shadow-xs"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Edit Form
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "preview"
                ? "bg-white text-[#0c3924] shadow-xs"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Card Preview</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-[#0c3924] px-5 py-4 rounded-2xl flex items-center gap-3 shadow-xs animate-fadeIn">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          <div className="flex-1">
            <h4 className="font-bold text-sm">Property Saved Successfully!</h4>
            <p className="text-xs text-emerald-800">
              Listing code <strong>{generatedCode}</strong> has been created with all verification badges and calculations.
            </p>
          </div>
        </div>
      )}

      {/* Main Container */}
      {activeTab === "preview" ? (
        /* ============================================================
           LIVE BUYER PREVIEW MODE
           ============================================================ */
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
              <div>
                <h3 className="font-bold text-base text-neutral-900">
                  Buyer View Preview
                </h3>
                <p className="text-xs text-neutral-500">
                  This is how the property will appear to visitors on the Jamin Lelo website
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("form")}
                className="text-xs font-bold text-[#0c3924] hover:underline"
              >
                ← Return to Editing
              </button>
            </div>

            <div className="max-w-md mx-auto bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-md">
              {/* Card Image */}
              <div className="relative h-48 bg-neutral-100">
                {images.length > 0 ? (
                  <Image
                    src={images.find((i) => i.isCover)?.url || images[0].url}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-neutral-400">
                    <Building className="w-10 h-10" />
                  </div>
                )}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="bg-[#0c3924] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                    {type.toUpperCase()}
                  </span>
                  {featured && (
                    <span className="bg-amber-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                      ★ Featured
                    </span>
                  )}
                </div>
                {verifiedBadge && (
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs text-[#0c3924] text-[11px] font-bold px-2.5 py-1 rounded-lg border border-[#c3e3d0] flex items-center gap-1 shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-neutral-500">
                    {generatedCode}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {LOCATIONS.find((l) => l.id === locationId)?.name || "Aurangabad"}
                  </span>
                </div>

                <h4 className="font-bold text-neutral-900 text-base line-clamp-1">
                  {title || "Property Title Placeholder"}
                </h4>

                <div className="grid grid-cols-2 gap-2 text-xs bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                  <div>
                    <span className="text-neutral-500 block">Total Area</span>
                    <span className="font-bold text-neutral-800">
                      {conversions ? `${conversions.sqft} sq ft` : "—"}
                    </span>
                    {conversions && (
                      <span className="text-[10.5px] text-emerald-700 block">
                        ≈ {conversions.kathaa} Kathaa
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Price / Rate</span>
                    <span className="font-bold text-neutral-900 text-[14px]">
                      {priceCalculations ? priceCalculations.formattedTotal : "—"}
                    </span>
                    {priceCalculations && (
                      <span className="text-[10.5px] text-neutral-500 block">
                        ₹{priceCalculations.ratePerSqft}/sq ft
                      </span>
                    )}
                  </div>
                </div>

                {/* Badges preview */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {selectedBadges.slice(0, 3).map((bId) => {
                    const badge = HIGHLIGHT_BADGES.find((b) => b.id === bId);
                    return (
                      <span
                        key={bId}
                        className="text-[10.5px] bg-[#eaf4ee] text-[#0c3924] font-medium px-2 py-0.5 rounded-md"
                      >
                        {badge?.icon} {badge?.label}
                      </span>
                    );
                  })}
                  {selectedBadges.length > 3 && (
                    <span className="text-[10.5px] bg-neutral-100 text-neutral-600 font-medium px-2 py-0.5 rounded-md">
                      +{selectedBadges.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ============================================================
           FORM EDITING MODE
           ============================================================ */
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SECTION 1: Basic Information */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 sm:p-7 space-y-5 shadow-xs">
            <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100">
              <div className="w-8 h-8 rounded-lg bg-[#eaf4ee] text-[#0c3924] flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h2 className="font-black text-neutral-900 text-base sm:text-lg">
                  Basic Property Information
                </h2>
                <p className="text-xs text-neutral-500">
                  Enter title, property type, location, and listing status
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                Property Title (English / Hindi) *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Prime 2 Kathaa Residential Plot on Jasoiya Bypass GT Road"
                className="w-full px-4 py-3 bg-neutral-50 focus:bg-white border border-neutral-300 rounded-xl text-sm font-medium text-neutral-900 focus:outline-hidden focus:ring-2 focus:ring-[#0c3924]/20 transition-all"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Property Type *
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 focus:bg-white border border-neutral-300 rounded-xl text-sm font-medium text-neutral-800 focus:outline-hidden cursor-pointer"
                  required
                >
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Location (Aurangabad Mauza / Area) *
                </label>
                <select
                  value={locationId}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 focus:bg-white border border-neutral-300 rounded-xl text-sm font-medium text-neutral-800 focus:outline-hidden cursor-pointer"
                  required
                >
                  <option value="">Select location / area</option>
                  {LOCATIONS.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name} ({l.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Listing Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 focus:bg-white border border-neutral-300 rounded-xl text-sm font-medium text-neutral-800 focus:outline-hidden cursor-pointer"
                >
                  {Object.entries(PROPERTY_STATUSES).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Featured and Verified Toggles */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0c3924] focus:ring-[#0c3924] cursor-pointer"
                />
                <span className="text-xs sm:text-sm font-bold text-neutral-800">
                  ★ Mark as Featured Property (Top Homepage Listing)
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={verifiedBadge}
                  onChange={(e) => setVerifiedBadge(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-600 cursor-pointer"
                />
                <span className="text-xs sm:text-sm font-bold text-[#0c3924] flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Apply &quot;Verified by Jamin Lelo&quot; Badge
                </span>
              </label>
            </div>
          </div>

          {/* SECTION 2: Bihar Land Unit Converter & Price Calculations */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 sm:p-7 space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#eaf4ee] text-[#0c3924] flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h2 className="font-black text-neutral-900 text-base sm:text-lg flex items-center gap-2">
                    <span>Bihar Land Area &amp; Auto Price Calculator</span>
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Enter land size in Kathaa, Dhur, Dismil, or Sq. Ft. for automatic live calculation
                  </p>
                </div>
              </div>
            </div>

            {/* Unit Selector & Input */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-4">
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Input Unit
                </label>
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-neutral-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setInputUnit("kathaa")}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                      inputUnit === "kathaa"
                        ? "bg-white text-[#0c3924] shadow-xs"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`}
                  >
                    Kathaa (कट्ठा)
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputUnit("sqft")}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                      inputUnit === "sqft"
                        ? "bg-white text-[#0c3924] shadow-xs"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`}
                  >
                    Sq. Ft. (वर्ग फीट)
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputUnit("dismil")}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                      inputUnit === "dismil"
                        ? "bg-white text-[#0c3924] shadow-xs"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`}
                  >
                    Dismil (डिसमिल)
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputUnit("dhur")}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                      inputUnit === "dhur"
                        ? "bg-white text-[#0c3924] shadow-xs"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`}
                  >
                    Dhur (धुर)
                  </button>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  {inputUnit === "kathaa"
                    ? "Land Area (in Kathaa) *"
                    : inputUnit === "dhur"
                    ? "Land Area (in Dhur) *"
                    : inputUnit === "dismil"
                    ? "Land Area (in Dismil / Decimal) *"
                    : "Land Area (in Sq. Ft.) *"}
                </label>
                {inputUnit === "sqft" ? (
                  <input
                    type="number"
                    step="any"
                    value={areaSqft}
                    onChange={(e) => setAreaSqft(e.target.value ? parseFloat(e.target.value) : "")}
                    placeholder="e.g. 2722.5"
                    className="w-full px-4 py-2.5 bg-neutral-50 focus:bg-white border border-neutral-300 rounded-xl text-sm font-bold text-neutral-900 focus:outline-hidden"
                    required
                  />
                ) : (
                  <input
                    type="number"
                    step="any"
                    value={unitInputValue}
                    onChange={(e) =>
                      setUnitInputValue(e.target.value ? parseFloat(e.target.value) : "")
                    }
                    placeholder={
                      inputUnit === "kathaa"
                        ? "e.g. 2.0"
                        : inputUnit === "dismil"
                        ? "e.g. 6.25"
                        : "e.g. 40"
                    }
                    className="w-full px-4 py-2.5 bg-neutral-50 focus:bg-white border border-neutral-300 rounded-xl text-sm font-bold text-neutral-900 focus:outline-hidden"
                    required
                  />
                )}
              </div>

              <div className="sm:col-span-4">
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Total Listing Price (₹) *
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value ? parseFloat(e.target.value) : "")}
                  placeholder="e.g. 3500000"
                  className="w-full px-4 py-2.5 bg-neutral-50 focus:bg-white border border-neutral-300 rounded-xl text-sm font-bold text-neutral-900 focus:outline-hidden"
                  required
                />
              </div>
            </div>

            {/* Live Auto-Conversion Breakdown Ribbon */}
            {conversions && (
              <div className="bg-[#f4f9f6] border border-[#c3e3d0] rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#0c3924] pb-2 border-b border-[#c3e3d0]/60">
                  <span>📐 Bihar Standard Land Measurement Breakdown</span>
                  <span className="font-mono text-[11px]">1 Kathaa = 1,361.25 Sq. Ft. (20 Dhur)</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                  <div className="bg-white p-2.5 rounded-lg border border-emerald-100 shadow-2xs">
                    <span className="text-[10.5px] text-neutral-500 block">Square Feet</span>
                    <span className="text-sm font-black text-neutral-900">{conversions.sqft}</span>
                    <span className="text-[10px] text-neutral-400 block">sq. ft.</span>
                  </div>
                  <div className="p-2.5 rounded-lg border border-emerald-200 shadow-2xs bg-emerald-50/50">
                    <span className="text-[10.5px] text-emerald-800 font-bold block">Kathaa (कट्ठा)</span>
                    <span className="text-sm font-black text-[#0c3924]">{conversions.kathaa}</span>
                    <span className="text-[10px] text-emerald-600 block">Kathaa</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-emerald-100 shadow-2xs">
                    <span className="text-[10.5px] text-neutral-500 block">Dhur (धुर)</span>
                    <span className="text-sm font-black text-neutral-900">{conversions.dhur}</span>
                    <span className="text-[10px] text-neutral-400 block">Dhur</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-emerald-100 shadow-2xs">
                    <span className="text-[10.5px] text-neutral-500 block">Dismil (डिसमिल)</span>
                    <span className="text-sm font-black text-neutral-900">{conversions.dismil}</span>
                    <span className="text-[10px] text-neutral-400 block">Decimal</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-emerald-100 shadow-2xs col-span-2 sm:col-span-1">
                    <span className="text-[10.5px] text-neutral-500 block">Bigha (बीघा)</span>
                    <span className="text-sm font-black text-neutral-900">{conversions.bigha}</span>
                    <span className="text-[10px] text-neutral-400 block">Bigha</span>
                  </div>
                </div>
              </div>
            )}

            {/* Live Price Per Unit & Rate Ribbon */}
            {priceCalculations && (
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4">
                <div className="flex items-center justify-between text-xs font-bold text-amber-900 pb-2 border-b border-amber-200">
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Price &amp; Rate Breakdown</span>
                  </span>
                  <span className="text-sm font-black text-amber-950">
                    Total: {priceCalculations.formattedTotal}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 text-center">
                  <div className="bg-white p-2.5 rounded-lg border border-amber-100 shadow-2xs">
                    <span className="text-[11px] text-neutral-500 block">Rate per Sq. Ft.</span>
                    <span className="text-base font-black text-neutral-900">
                      ₹{priceCalculations.ratePerSqft}
                    </span>
                    <span className="text-[10px] text-neutral-400 block">/ sq ft</span>
                  </div>
                  <div className="p-2.5 rounded-lg border border-amber-200 shadow-2xs bg-amber-50/50">
                    <span className="text-[11px] text-amber-900 font-bold block">
                      Rate per Kathaa (दर प्रति कट्ठा)
                    </span>
                    <span className="text-base font-black text-[#0c3924]">
                      ₹{priceCalculations.ratePerKathaa}
                    </span>
                    <span className="text-[10px] text-emerald-700 block">/ Kathaa</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-amber-100 shadow-2xs">
                    <span className="text-[11px] text-neutral-500 block">Rate per Dismil</span>
                    <span className="text-base font-black text-neutral-900">
                      ₹{priceCalculations.ratePerDismil}
                    </span>
                    <span className="text-[10px] text-neutral-400 block">/ Dismil</span>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Physical Dimensions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Road Width Facing
                </label>
                <input
                  type="text"
                  value={roadWidth}
                  onChange={(e) => setRoadWidth(e.target.value)}
                  placeholder="e.g. 20 ft / 30 ft Pitch Road"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 focus:bg-white border border-neutral-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Frontage (सामने की चौड़ाई)
                </label>
                <input
                  type="text"
                  value={frontage}
                  onChange={(e) => setFrontage(e.target.value)}
                  placeholder="e.g. 35 ft Front"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 focus:bg-white border border-neutral-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Depth / Length (लंबाई)
                </label>
                <input
                  type="text"
                  value={depth}
                  onChange={(e) => setDepth(e.target.value)}
                  placeholder="e.g. 70 ft"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 focus:bg-white border border-neutral-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Facing (दिशा)
                </label>
                <select
                  value={facing}
                  onChange={(e) => setFacing(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 focus:bg-white border border-neutral-300 rounded-xl text-sm cursor-pointer"
                >
                  {FACING_OPTIONS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                Detailed Property Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Mention surroundings, nearby landmarks (e.g. 200m from Ramesh Chowk, near Reliance Smart Bazaar), road connectivity, suitable for residential building / commercial godown..."
                className="w-full px-4 py-2.5 bg-neutral-50 focus:bg-white border border-neutral-300 rounded-xl text-sm text-neutral-900 resize-none"
              />
            </div>
          </div>

          {/* SECTION 3: Photos & Media Management */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 sm:p-7 space-y-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#eaf4ee] text-[#0c3924] flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h2 className="font-black text-neutral-900 text-base sm:text-lg">
                    Property Photos &amp; Layout Map
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Upload plot photographs, boundary photos, or site map (JPG, PNG, WebP)
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-neutral-500">
                {images.length} photo(s) selected
              </span>
            </div>

            {/* Upload Area */}
            <label className="border-2 border-dashed border-neutral-300 hover:border-[#0c3924] rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer bg-neutral-50/50 hover:bg-[#f4f9f6]/40 flex flex-col items-center justify-center group">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-full bg-[#eaf4ee] text-[#0c3924] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-neutral-800">
                Click to upload plot photographs or drag and drop
              </p>
              <p className="text-xs text-neutral-400 mt-1">
                Upload up to 10 photos • Max 5MB each • PNG, JPG, WebP
              </p>
            </label>

            {/* Uploaded Thumbnails Grid */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {images.map((img) => (
                  <div
                    key={img.id}
                    className={`relative rounded-xl overflow-hidden border-2 group transition-all ${
                      img.isCover ? "border-[#0c3924] shadow-sm" : "border-neutral-200"
                    }`}
                  >
                    <div className="relative h-32 w-full bg-neutral-100">
                      <Image src={img.url} alt={img.name} fill className="object-cover" />
                    </div>

                    {img.isCover && (
                      <span className="absolute top-2 left-2 bg-[#0c3924] text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        Cover Image
                      </span>
                    )}

                    <div className="p-2 bg-white flex items-center justify-between text-xs">
                      <span className="text-[11px] text-neutral-600 truncate max-w-25">
                        {img.name}
                      </span>
                      <div className="flex items-center gap-1">
                        {!img.isCover && (
                          <button
                            type="button"
                            onClick={() => setCoverImage(img.id)}
                            className="p-1 text-neutral-400 hover:text-amber-500"
                            title="Set as Cover Photo"
                          >
                            <Star className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(img.id)}
                          className="p-1 text-neutral-400 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SECTION 4: Verification & Key Highlights */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 sm:p-7 space-y-5 shadow-xs">
            <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100">
              <div className="w-8 h-8 rounded-lg bg-[#eaf4ee] text-[#0c3924] flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div>
                <h2 className="font-black text-neutral-900 text-base sm:text-lg">
                  Verification Badges &amp; Key Highlights
                </h2>
                <p className="text-xs text-neutral-500">
                  Select all amenities and legal features that apply to this property
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {HIGHLIGHT_BADGES.map((badge) => {
                const isSelected = selectedBadges.includes(badge.id);
                return (
                  <button
                    key={badge.id}
                    type="button"
                    onClick={() => toggleBadge(badge.id)}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#eaf4ee] border-[#0c3924] text-[#0c3924] font-bold shadow-2xs"
                        : "bg-neutral-50 border-neutral-200/80 text-neutral-700 hover:bg-neutral-100/70 font-medium"
                    }`}
                  >
                    <span className="text-base">{badge.icon}</span>
                    <span className="text-xs leading-snug flex-1">{badge.label}</span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-[#0c3924] stroke-3 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SECTION 5: Location, Mauza & Bihar Revenue Land Record */}
          <div className="bg-white rounded-2xl border border-neutral-200/90 p-5 sm:p-7 space-y-5 shadow-xs">
            <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100">
              <div className="w-8 h-8 rounded-lg bg-[#eaf4ee] text-[#0c3924] flex items-center justify-center font-bold text-sm">
                5
              </div>
              <div>
                <h2 className="font-black text-neutral-900 text-base sm:text-lg">
                  Location, Mauza &amp; Land Revenue Records (Bihar)
                </h2>
                <p className="text-xs text-neutral-500">
                  Khatiyan, Khata, Khesra details and Map GPS coordinates
                </p>
              </div>
            </div>

            {/* Quick Location Pills */}
            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                Quick Local Area Preset (Auto-fills GPS Coordinates)
              </label>
              <div className="flex flex-wrap gap-2">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => handleLocationChange(loc.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      locationId === loc.id
                        ? "bg-[#0c3924] text-white shadow-xs"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    }`}
                  >
                    📍 {loc.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Mauza / Village Name (मौजा)
                </label>
                <input
                  type="text"
                  value={mauza}
                  onChange={(e) => setMauza(e.target.value)}
                  placeholder="e.g. Jasoiya / Dani Bigha"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 focus:bg-white border border-neutral-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Thana Number (थाना नं.)
                </label>
                <input
                  type="text"
                  value={thanaNo}
                  onChange={(e) => setThanaNo(e.target.value)}
                  placeholder="e.g. Thana No. 248"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 focus:bg-white border border-neutral-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Khata Number (खाता नं.)
                </label>
                <input
                  type="text"
                  value={khataNo}
                  onChange={(e) => setKhataNo(e.target.value)}
                  placeholder="e.g. Khata 142"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 focus:bg-white border border-neutral-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Khesra / Plot No. (खेसरा / प्लॉट नं.)
                </label>
                <input
                  type="text"
                  value={khesraNo}
                  onChange={(e) => setKhesraNo(e.target.value)}
                  placeholder="e.g. Khesra 524"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 focus:bg-white border border-neutral-300 rounded-xl text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Latitude (GPS)
                </label>
                <input
                  type="number"
                  step="any"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="24.7536"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 focus:bg-white border border-neutral-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Longitude (GPS)
                </label>
                <input
                  type="number"
                  step="any"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="84.3742"
                  className="w-full px-3.5 py-2.5 bg-neutral-50 focus:bg-white border border-neutral-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Map Display Precision
                </label>
                <select
                  value={mapPrecision}
                  onChange={(e) => setMapPrecision(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 focus:bg-white border border-neutral-300 rounded-xl text-sm cursor-pointer"
                >
                  <option value="village_level">Village / Area Level (Privacy Protected)</option>
                  <option value="exact">Exact GPS Pin (With Owner Consent)</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 6: Seller / Owner Info & Internal CRM (Private - Staff Only) */}
          <div className="bg-neutral-900 text-white rounded-2xl p-5 sm:p-7 space-y-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-sm">
                  🔒
                </div>
                <div>
                  <h2 className="font-black text-white text-base sm:text-lg">
                    Seller Details &amp; Deal Margin (Internal CRM)
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Confidential — This information is NEVER shown on the public website
                  </p>
                </div>
              </div>
              <span className="bg-red-950/80 text-red-400 border border-red-800/40 text-[10.5px] font-bold px-2.5 py-1 rounded-md">
                Admin Eyes Only
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Land Owner / Seller Name
                </label>
                <input
                  type="text"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  placeholder="e.g. Rameshwar Singh"
                  className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-sm text-white placeholder:text-neutral-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Seller Mobile / WhatsApp No.
                </label>
                <input
                  type="tel"
                  value={sellerPhone}
                  onChange={(e) => setSellerPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-sm text-white placeholder:text-neutral-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                  Seller Minimum Agreed Net Price (₹)
                </label>
                <input
                  type="number"
                  value={sellerMinPrice}
                  onChange={(e) =>
                    setSellerMinPrice(e.target.value ? parseFloat(e.target.value) : "")
                  }
                  placeholder="e.g. 3200000"
                  className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-sm text-white placeholder:text-neutral-500 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Document Checklist Checkboxes */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                Internal Document Verification Status
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <label className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-800/80 border border-neutral-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={docsVerified.khatiyan}
                    onChange={(e) =>
                      setDocsVerified({ ...docsVerified, khatiyan: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-emerald-500"
                  />
                  <span className="text-xs font-medium text-neutral-200">Khatiyan Checked</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-800/80 border border-neutral-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={docsVerified.rasid}
                    onChange={(e) => setDocsVerified({ ...docsVerified, rasid: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-500"
                  />
                  <span className="text-xs font-medium text-neutral-200">Lagan Rasid Checked</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-800/80 border border-neutral-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={docsVerified.jamabandi}
                    onChange={(e) =>
                      setDocsVerified({ ...docsVerified, jamabandi: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-emerald-500"
                  />
                  <span className="text-xs font-medium text-neutral-200">Jamabandi Checked</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-800/80 border border-neutral-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={docsVerified.sellerAadhaar}
                    onChange={(e) =>
                      setDocsVerified({ ...docsVerified, sellerAadhaar: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-emerald-500"
                  />
                  <span className="text-xs font-medium text-neutral-200">Aadhaar/PAN ID Verified</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-1.5">
                Internal Private Deal Notes (Disputes, Token Agreement, Key Contacts)
              </label>
              <textarea
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                rows={2}
                placeholder="e.g. Seller is willing to close before Diwali, 2 brothers have already signed NOC, boundary pillars physically verified on site..."
                className="w-full px-3.5 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-sm text-white placeholder:text-neutral-500 resize-none focus:outline-hidden"
              />
            </div>
          </div>

          {/* Sticky Bottom Action Bar */}
          <div className="sticky bottom-4 z-40 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-neutral-200/90 shadow-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link
                href="/admin/properties"
                className="px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 font-bold text-xs sm:text-sm hover:bg-neutral-100 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs sm:text-sm transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Preview Card</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="bg-[#0c3924] hover:bg-[#072618] disabled:bg-neutral-400 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                {saving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Saving Property...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Publish / Save Property</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
