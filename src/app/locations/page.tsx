import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { LOCATIONS } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties by Location | Aurangabad City & Surrounding Villages",
  description: "Browse land and plots across Aurangabad City and surrounding villages — Jasoiya, Karam Road, Dani Bigha, Nawadih, Bhabhandi, Maharajganj, Paharpura, Korma, Shahpur.",
};

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <nav className="text-sm text-neutral-500 mb-3">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-800">Locations</span>
          </nav>
          <h1 className="text-3xl font-bold text-neutral-900">Browse by Local Area & Village</h1>
          <p className="text-neutral-500 mt-1">
            Find plots and properties across Aurangabad City and its surrounding villages & mauzas
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {LOCATIONS.map((loc) => (
            <Link
              key={loc.slug}
              href={`/locations/${loc.slug}`}
              className="group bg-white rounded-xl border border-neutral-200 overflow-hidden card-hover block"
            >
              <div className="aspect-2/1 bg-linear-to-br from-primary-100 to-primary-200 flex items-center justify-center relative">
                <MapPin className="w-12 h-12 text-primary-500" />
                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-primary-900/40 to-transparent p-4">
                  <h2 className="text-xl font-bold text-white">{loc.name}</h2>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-neutral-600 leading-relaxed mb-4 line-clamp-3">
                  {loc.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400">Aurangabad, Bihar</span>
                  <span className="text-sm text-primary-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Properties <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
