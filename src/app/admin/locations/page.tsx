import { LOCATIONS } from "@/lib/constants";
import { Edit, MapPin } from "lucide-react";

export default function AdminLocationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Locations</h1>
        <p className="text-sm text-neutral-500">{LOCATIONS.length} active locations</p>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3 text-left font-medium">Location</th>
              <th className="px-5 py-3 text-left font-medium">Code</th>
              <th className="px-5 py-3 text-left font-medium">Slug</th>
              <th className="px-5 py-3 text-left font-medium">SEO Title</th>
              <th className="px-5 py-3 text-center font-medium">Properties</th>
              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {LOCATIONS.map((loc) => (
              <tr key={loc.slug} className="hover:bg-neutral-50 transition-colors">
                <td className="px-5 py-4">
                  <span className="flex items-center gap-2 font-medium text-neutral-800">
                    <MapPin className="w-4 h-4 text-primary-600" /> {loc.name}
                  </span>
                </td>
                <td className="px-5 py-4 font-mono text-xs text-primary-600">{loc.code}</td>
                <td className="px-5 py-4 text-neutral-500">/locations/{loc.slug}</td>
                <td className="px-5 py-4 text-neutral-500 text-xs max-w-50 truncate">{loc.seoTitle}</td>
                <td className="px-5 py-4 text-center text-neutral-600">—</td>
                <td className="px-5 py-4 text-right">
                  <button className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
