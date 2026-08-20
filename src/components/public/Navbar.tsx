"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { trackCallClick } from "@/lib/analytics";
import { Logo } from "./Logo";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Buy Land" },
  { href: "/sell-your-property", label: "Sell Land" },
  { href: "/services/documentation", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 px-3 sm:px-6 pt-3 pb-2 transition-all">
      <div className="max-w-350 mx-auto bg-white/95 backdrop-blur-md rounded-[24px] sm:rounded-4xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] border border-neutral-200/80 px-4 sm:px-8 py-3 transition-all">
        <nav className="flex items-center justify-between">
          {/* Brand Logo */}
          <Logo />

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[15px] font-medium transition-all relative py-1 ${
                    isActive
                      ? "text-[#0d3b24] font-semibold"
                      : "text-neutral-700 hover:text-[#0d3b24]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0d3b24] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Call to Action Expert Button */}
          <div className="hidden lg:flex items-center">
            <a
              href={`tel:${BRAND.phone}`}
              onClick={() => trackCallClick("navbar_expert_cta")}
              className="bg-[#0c3924] hover:bg-[#072618] text-white pl-3.5 pr-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-3.5 group"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Phone className="w-4 h-4 text-white fill-white" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-white/80 font-medium leading-none">
                  Talk to Our Expert
                </span>
                <span className="text-[13px] font-bold text-white tracking-wide mt-0.5 leading-tight">
                  +91 91234 56789
                </span>
              </div>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${BRAND.phone}`}
              onClick={() => trackCallClick("navbar_mobile_call")}
              className="w-9 h-9 rounded-full bg-[#0c3924] text-white flex items-center justify-center shadow-xs"
              aria-label="Call Expert"
            >
              <Phone className="w-4 h-4 fill-white" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#0c3924]" />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-neutral-150 animate-fadeIn">
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((link) => {
                const isActive =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-[15px] font-medium transition-colors ${
                      isActive
                        ? "bg-[#f0fdf4] text-[#0c3924] font-bold"
                        : "text-neutral-700 hover:bg-neutral-50 hover:text-[#0c3924]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="mt-3 pt-3 border-t border-neutral-100 flex flex-col gap-2">
                <a
                  href={`tel:${BRAND.phone}`}
                  onClick={() => {
                    trackCallClick("navbar_mobile_expert");
                    setIsOpen(false);
                  }}
                  className="w-full bg-[#0c3924] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 shadow-sm"
                >
                  <Phone className="w-4 h-4 fill-white" />
                  <span>Talk to Our Expert: +91 91234 56789</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
