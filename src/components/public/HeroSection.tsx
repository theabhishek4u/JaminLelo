"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ShieldCheck,
  Search,
  Play,
  Users,
  FileCheck2,
  MapPin,
  Handshake,
  Award,
  Home,
  X,
  TrendingUp,
  LayoutGrid,
  IndianRupee,
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { LOCATIONS } from "@/lib/constants";

const VALUE_PROPS = [
  {
    icon: ShieldCheck,
    title: "Trusted & Verified",
    desc: "Every property is verified by experts",
  },
  {
    icon: Users,
    title: "Expert Guidance",
    desc: "Get professional advice at every step",
  },
  {
    icon: FileCheck2,
    title: "Legal Support",
    desc: "Complete documentation & legal assistance",
  },
  {
    icon: MapPin,
    title: "Site Visit Support",
    desc: "We arrange site visit as per your convenience",
  },
  {
    icon: Handshake,
    title: "Safe & Secure Deals",
    desc: "Your trust is our top priority",
  },
];

const HERO_STATS = [
  {
    icon: Users,
    value: "500+",
    title: "Happy Clients",
  },
  {
    icon: Home,
    value: "1000+",
    title: "Properties Available",
  },
  {
    icon: Award,
    value: "5+ Years",
    title: "Of Trust & Service",
  },
  {
    icon: MapPin,
    value: "Aurangabad, Bihar",
    title: "Our Home, Our Service",
  },
];

const LAND_TYPES = [
  { value: "", label: "Select type" },
  { value: "plot", label: "Residential Plot" },
  { value: "commercial", label: "Commercial Land" },
  { value: "residential", label: "Residential House" },
  { value: "agricultural", label: "Agricultural Land" },
];

const AREA_RANGES = [
  { value: "", label: "Select area" },
  { value: "0-1500", label: "Up to 1,500 sq ft" },
  { value: "1500-3000", label: "1,500 - 3,000 sq ft" },
  { value: "3000-6000", label: "3,000 - 6,000 sq ft" },
  { value: "6000-43560", label: "5+ Kathaa / 1+ Acre" },
];

const BUDGET_RANGES = [
  { value: "", label: "Select budget" },
  { value: "0-1500000", label: "Under ₹15 Lakh" },
  { value: "1500000-3000000", label: "₹15 Lakh - ₹30 Lakh" },
  { value: "3000000-5000000", label: "₹30 Lakh - ₹50 Lakh" },
  { value: "5000000-10000000", label: "₹50 Lakh - ₹1 Crore" },
  { value: "10000000-999999999", label: "Above ₹1 Crore" },
];

export function HeroSection() {
  const router = useRouter();
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [landType, setLandType] = useState("");
  const [area, setArea] = useState("");
  const [budget, setBudget] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (landType) params.set("type", landType);
    if (area) {
      const [min, max] = area.split("-");
      if (min) params.set("min_area", min);
      if (max) params.set("max_area", max);
    }
    if (budget) {
      const [min, max] = budget.split("-");
      if (min) params.set("min_price", min);
      if (max) params.set("max_price", max);
    }
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="relative overflow-hidden pt-0 pb-0 -mt-20 sm:-mt-22 lg:-mt-23">
      {/* ============================================================
          MAIN HERO FULL-WIDTH PANORAMIC SECTION
          ============================================================ */}
      <div className="relative w-full min-h-135 sm:min-h-160 lg:min-h-180 flex flex-col justify-between overflow-hidden">
        {/* Full-width Panoramic Landscape Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-land.jpg"
            alt="Apni Zameen, Apne Sapno Ke Liye - Aurangabad, Bihar"
            fill
            priority
            className="object-cover object-[70%_center] sm:object-center lg:object-[82%_center]"
            sizes="100vw"
          />
          {/* Natural soft gradient blend for left text legibility */}
          <div className="absolute inset-0 bg-linear-to-b sm:bg-linear-to-r from-[#f4f7f4]/95 via-[#f4f7f4]/80 to-transparent sm:to-transparent lg:w-[62%]" />
          <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-24 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 lg:pb-24">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#eaf4ee]/95 backdrop-blur-xs border border-[#c3e3d0] text-[#0c3924] text-[12px] sm:text-[13px] font-semibold px-3 sm:px-3.5 py-1.5 rounded-lg mb-4 sm:mb-6 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#0c3924] fill-[#0c3924]/20 shrink-0" />
              <span>Trusted Land Partner in Aurangabad, Bihar</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[58px] font-black text-[#0c3924] tracking-tight leading-[1.12] mb-3 sm:mb-5">
              Apni Zameen,
              <br />
              <span className="text-[#0c3924]">Apne Sapno Ke Liye</span>
            </h1>

            {/* Subtitle */}
            <p className="text-neutral-700 text-[14.5px] sm:text-[17px] font-normal leading-relaxed mb-6 sm:mb-8 max-w-xl">
              Find verified land for your home, investment or future.
              <br className="hidden sm:inline" />
              {" "}We make your property journey simple, safe &amp; transparent.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 max-w-md sm:max-w-none">
              <Link
                href="/properties"
                className="bg-[#0c3924] hover:bg-[#072618] text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-[14.5px] sm:text-[15px] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 text-center"
              >
                <Search className="w-4 h-4 text-white stroke-[2.5]" />
                <span>Explore Land</span>
              </Link>

              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                className="bg-white/95 hover:bg-white text-neutral-800 border border-neutral-300/90 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-[14.5px] sm:text-[15px] shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer text-center"
              >
                <Play className="w-4 h-4 text-[#0c3924] fill-[#0c3924]" />
                <span>How It Works</span>
              </button>
            </div>
          </div>
        </div>

        {/* Floating Verified Properties Badge on Right Bottom (Visible on tablet & desktop) */}
        <div className="hidden sm:flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 justify-end pb-12 sm:pb-16 pointer-events-none">
          <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-white/80 flex items-center gap-3 pointer-events-auto">
            <div className="w-10 h-10 rounded-xl bg-[#0c3924] flex items-center justify-center text-white shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h4 className="text-[13.5px] font-bold text-neutral-900 leading-tight">
                Verified Properties
              </h4>
              <p className="text-[11.5px] font-medium text-emerald-700 leading-tight mt-0.5">
                100% Transparent Deals
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          HERO FLOATING SEARCH FILTER BAR
          ============================================================ */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative -mt-6 sm:-mt-12 z-30">
        <div className="bg-white rounded-[20px] sm:rounded-[28px] p-3.5 sm:p-5 shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-neutral-200/90">
          <form
            onSubmit={handleSearch}
            className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2.5 lg:gap-2"
          >
              {/* Location */}
              <div className="flex-1 flex items-center gap-3 px-3 py-2 sm:py-2.5 rounded-xl bg-neutral-50/60 lg:bg-transparent hover:bg-neutral-50 transition-colors border border-neutral-100 lg:border-0 lg:border-r lg:border-neutral-200/80">
                <div className="w-9 h-9 rounded-full bg-[#eaf4ee] text-[#0c3924] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#0c3924]" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[11px] sm:text-[12px] font-bold text-neutral-900">
                    Location
                  </span>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-transparent text-[13px] text-neutral-600 font-medium focus:outline-hidden cursor-pointer appearance-none"
                  >
                    <option value="">Enter location</option>
                    {LOCATIONS.map((loc) => (
                      <option key={loc.slug} value={loc.slug}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </div>
                <ChevronDown className="w-4 h-4 text-neutral-400 pointer-events-none shrink-0" />
              </div>

              {/* Land Type */}
              <div className="flex-1 flex items-center gap-3 px-3 py-2 sm:py-2.5 rounded-xl bg-neutral-50/60 lg:bg-transparent hover:bg-neutral-50 transition-colors border border-neutral-100 lg:border-0 lg:border-r lg:border-neutral-200/80">
                <div className="w-9 h-9 rounded-full bg-[#eaf4ee] text-[#0c3924] flex items-center justify-center shrink-0">
                  <LayoutGrid className="w-4 h-4 text-[#0c3924]" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[11px] sm:text-[12px] font-bold text-neutral-900">
                    Land Type
                  </span>
                  <select
                    value={landType}
                    onChange={(e) => setLandType(e.target.value)}
                    className="w-full bg-transparent text-[13px] text-neutral-600 font-medium focus:outline-hidden cursor-pointer appearance-none"
                  >
                    {LAND_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
                <ChevronDown className="w-4 h-4 text-neutral-400 pointer-events-none shrink-0" />
              </div>

              {/* Area */}
              <div className="flex-1 flex items-center gap-3 px-3 py-2 sm:py-2.5 rounded-xl bg-neutral-50/60 lg:bg-transparent hover:bg-neutral-50 transition-colors border border-neutral-100 lg:border-0 lg:border-r lg:border-neutral-200/80">
                <div className="w-9 h-9 rounded-full bg-[#eaf4ee] text-[#0c3924] flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4 h-4 text-[#0c3924]" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[11px] sm:text-[12px] font-bold text-neutral-900">
                    Area
                  </span>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full bg-transparent text-[13px] text-neutral-600 font-medium focus:outline-hidden cursor-pointer appearance-none"
                  >
                    {AREA_RANGES.map((a) => (
                      <option key={a.value} value={a.value}>
                        {a.label}
                      </option>
                    ))}
                  </select>
                </div>
                <ChevronDown className="w-4 h-4 text-neutral-400 pointer-events-none shrink-0" />
              </div>

              {/* Budget */}
              <div className="flex-1 flex items-center gap-3 px-3 py-2 sm:py-2.5 rounded-xl bg-neutral-50/60 lg:bg-transparent hover:bg-neutral-50 transition-colors border border-neutral-100 lg:border-0">
                <div className="w-9 h-9 rounded-full bg-[#eaf4ee] text-[#0c3924] flex items-center justify-center shrink-0">
                  <IndianRupee className="w-4 h-4 text-[#0c3924]" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[11px] sm:text-[12px] font-bold text-neutral-900">
                    Budget
                  </span>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-transparent text-[13px] text-neutral-600 font-medium focus:outline-hidden cursor-pointer appearance-none"
                  >
                    {BUDGET_RANGES.map((b) => (
                      <option key={b.value} value={b.value}>
                        {b.label}
                      </option>
                    ))}
                  </select>
                </div>
                <ChevronDown className="w-4 h-4 text-neutral-400 pointer-events-none shrink-0" />
              </div>

              {/* Search Property Button */}
              <div className="w-full lg:w-47.5 shrink-0 pt-1 lg:pt-0">
                <button
                  type="submit"
                  className="w-full h-11.5 sm:h-12 bg-[#0c3924] hover:bg-[#072618] text-white rounded-xl font-bold text-[14px] sm:text-[14.5px] flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer px-4"
                >
                  <Search className="w-4 h-4 text-white stroke-[2.5]" />
                  <span>Search Property</span>
                </button>
              </div>
            </form>
          </div>
        </div>

      {/* ============================================================
          BOTTOM DARK GREEN STATS RIBBON
          ============================================================ */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-6 sm:mt-10">
        <div className="bg-[#0c3924] rounded-[20px] sm:rounded-[24px] text-white py-4 sm:py-5 px-4 sm:px-10 shadow-md">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {HERO_STATS.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 sm:gap-4 ${
                    idx > 0 ? "lg:border-l lg:border-emerald-800/50 lg:pl-8" : ""
                  }`}
                >
                  <div className="text-white/80 shrink-0">
                    <IconComp className="w-5 h-5 sm:w-7 sm:h-7 stroke-[1.75]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg sm:text-2xl font-black text-white tracking-tight leading-tight truncate">
                      {stat.value}
                    </div>
                    <div className="text-[11px] sm:text-[13px] text-emerald-100/80 font-normal mt-0.5 leading-snug">
                      {stat.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>


      {/* ============================================================
          HOW IT WORKS MODAL
          ============================================================ */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-2xl font-black text-[#0c3924] mb-3">
              How Jamin Lelo Works
            </h3>
            <p className="text-neutral-600 text-sm mb-6">
              A 3-step transparent process to buy or sell verified land in Aurangabad, Bihar.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 items-start p-3.5 rounded-2xl bg-[#f0fdf4] border border-emerald-100">
                <span className="w-8 h-8 rounded-full bg-[#0c3924] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  1
                </span>
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm">
                    Search or Request Property
                  </h4>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Browse verified plots by location, budget, and dimension, or post your requirements.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-3.5 rounded-2xl bg-[#f0fdf4] border border-emerald-100">
                <span className="w-8 h-8 rounded-full bg-[#0c3924] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  2
                </span>
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm">
                    Free Guided Site Visit
                  </h4>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Our local expert accompanies you to inspect the physical boundaries and surroundings.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-3.5 rounded-2xl bg-[#f0fdf4] border border-emerald-100">
                <span className="w-8 h-8 rounded-full bg-[#0c3924] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  3
                </span>
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm">
                    100% Legal Verification &amp; Registry
                  </h4>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    We verify Khatiyan, Jamabandi, and handle deed drafting, registry, and mutation.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 flex justify-end gap-3">
              <Link
                href="/properties"
                onClick={() => setVideoModalOpen(false)}
                className="w-full text-center bg-[#0c3924] hover:bg-[#072618] text-white py-3 rounded-xl font-bold text-sm shadow-md"
              >
                Browse Verified Land Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
