"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, LayoutGrid, Maximize2, IndianRupee, Search, ChevronDown } from "lucide-react";
import { LOCATIONS } from "@/lib/constants";

const LAND_TYPES = [
  { value: "", label: "All Land Types" },
  { value: "plot", label: "Residential Plot" },
  { value: "commercial", label: "Commercial Land" },
  { value: "residential", label: "Residential House" },
  { value: "agricultural", label: "Agricultural / Farm Land" },
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

export function HeroSearchFilter() {
  const router = useRouter();
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
    <form
      onSubmit={handleSearch}
      className="bg-white rounded-2xl md:rounded-[22px] p-3 md:p-4 shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-neutral-200/90 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-center"
    >
      {/* 1. Location */}
      <div className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-50/80 transition-colors border-b sm:border-b-0 sm:border-r border-neutral-150">
        <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#0c3924] flex items-center justify-center shrink-0">
          <MapPin className="w-5 h-5 text-[#0c3924]" />
        </div>
        <div className="flex-1 min-w-0">
          <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent text-[13.5px] font-semibold text-neutral-800 focus:outline-hidden cursor-pointer truncate"
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

      {/* 2. Land Type */}
      <div className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-50/80 transition-colors border-b sm:border-b-0 sm:border-r border-neutral-150">
        <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#0c3924] flex items-center justify-center shrink-0">
          <LayoutGrid className="w-5 h-5 text-[#0c3924]" />
        </div>
        <div className="flex-1 min-w-0">
          <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            Land Type
          </label>
          <select
            value={landType}
            onChange={(e) => setLandType(e.target.value)}
            className="w-full bg-transparent text-[13.5px] font-semibold text-neutral-800 focus:outline-hidden cursor-pointer truncate"
          >
            <option value="">Select type</option>
            {LAND_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <ChevronDown className="w-4 h-4 text-neutral-400 pointer-events-none shrink-0" />
      </div>

      {/* 3. Area */}
      <div className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-50/80 transition-colors border-b sm:border-b-0 sm:border-r border-neutral-150">
        <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#0c3924] flex items-center justify-center shrink-0">
          <Maximize2 className="w-5 h-5 text-[#0c3924]" />
        </div>
        <div className="flex-1 min-w-0">
          <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            Area
          </label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full bg-transparent text-[13.5px] font-semibold text-neutral-800 focus:outline-hidden cursor-pointer truncate"
          >
            <option value="">Select area</option>
            {AREA_RANGES.map((a) => (
              <option key={a.value} value={a.value}>
                {a.label}
              </option>
            ))}
          </select>
        </div>
        <ChevronDown className="w-4 h-4 text-neutral-400 pointer-events-none shrink-0" />
      </div>

      {/* 4. Budget */}
      <div className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-neutral-50/80 transition-colors">
        <div className="w-9 h-9 rounded-lg bg-emerald-50 text-[#0c3924] flex items-center justify-center shrink-0">
          <IndianRupee className="w-5 h-5 text-[#0c3924]" />
        </div>
        <div className="flex-1 min-w-0">
          <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
            Budget
          </label>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full bg-transparent text-[13.5px] font-semibold text-neutral-800 focus:outline-hidden cursor-pointer truncate"
          >
            <option value="">Select budget</option>
            {BUDGET_RANGES.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
        <ChevronDown className="w-4 h-4 text-neutral-400 pointer-events-none shrink-0" />
      </div>

      {/* 5. Search Property Button */}
      <div className="w-full sm:col-span-2 lg:col-span-1">
        <button
          type="submit"
          className="w-full h-13 bg-[#0c3924] hover:bg-[#072618] text-white rounded-xl font-bold text-[15px] flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
        >
          <Search className="w-4 h-4 text-white" />
          <span>Search Property</span>
        </button>
      </div>
    </form>
  );
}
