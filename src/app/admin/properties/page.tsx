import Link from "next/link";
import { Plus, Search, Eye, Edit, MapPin } from "lucide-react";
import { formatPrice, PROPERTY_STATUSES } from "@/lib/constants";

// Demo data
const PROPERTIES = [
  { id: "1", property_code: "ZS-AUR-0001", title: "Prime Residential Plot Near Aurangabad City Center", type: "plot", price: 1800000, area_sqft: 2400, status: "available" as const, featured: true, location: "Aurangabad City", views_count: 45, enquiry_count: 8 },
  { id: "2", property_code: "ZS-AUR-0002", title: "Commercial Land on Main Road, Aurangabad", type: "commercial", price: 5500000, area_sqft: 5000, status: "available" as const, featured: true, location: "Aurangabad City", views_count: 72, enquiry_count: 12 },
  { id: "3", property_code: "ZS-JSO-0001", title: "Commercial Plot Near Jasoiya More Bypass", type: "commercial", price: 4200000, area_sqft: 3600, status: "available" as const, featured: true, location: "Jasoiya", views_count: 68, enquiry_count: 9 },
  { id: "4", property_code: "ZS-KRM-0001", title: "Residential House Plot on Karam Road", type: "plot", price: 2400000, area_sqft: 2800, status: "available" as const, featured: true, location: "Karam Road", views_count: 52, enquiry_count: 7 },
  { id: "5", property_code: "ZS-DNB-0001", title: "Prime Residential Land in Dani Bigha", type: "residential", price: 3200000, area_sqft: 2200, status: "available" as const, featured: true, location: "Dani Bigha", views_count: 76, enquiry_count: 14 },
  { id: "6", property_code: "ZS-NWD-0001", title: "Budget Residential Plot in Nawadih Village", type: "plot", price: 1250000, area_sqft: 1800, status: "draft" as const, featured: false, location: "Nawadih", views_count: 31, enquiry_count: 4 },
];

export default function AdminPropertiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Properties</h1>
          <p className="text-sm text-neutral-500">{PROPERTIES.length} total properties</p>
        </div>
        <Link href="/admin/properties/new" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Property
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-50">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input type="text" placeholder="Search by code, title..." className="w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg text-sm" />
        </div>
        <select className="px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
          <option value="">All Statuses</option>
          {Object.entries(PROPERTY_STATUSES).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>
        <select className="px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
          <option value="">All Types</option>
          <option value="plot">Plot</option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="agricultural">Agricultural</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3 text-left font-medium">Property</th>
                <th className="px-5 py-3 text-left font-medium">Location</th>
                <th className="px-5 py-3 text-left font-medium">Type</th>
                <th className="px-5 py-3 text-left font-medium">Price</th>
                <th className="px-5 py-3 text-left font-medium">Status</th>
                <th className="px-5 py-3 text-center font-medium">Views</th>
                <th className="px-5 py-3 text-center font-medium">Enquiries</th>
                <th className="px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {PROPERTIES.map((p) => (
                <tr key={p.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-neutral-800 line-clamp-1">{p.title}</p>
                    <p className="text-xs text-primary-600 font-mono">{p.property_code}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1 text-neutral-600 text-sm">
                      <MapPin className="w-3 h-3" /> {p.location}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="bg-neutral-100 text-neutral-600 text-xs px-2 py-0.5 rounded capitalize">{p.type}</span>
                  </td>
                  <td className="px-5 py-4 font-semibold text-neutral-800">{formatPrice(p.price)}</td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full status-${p.status}`}>
                      {PROPERTY_STATUSES[p.status]?.label || p.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className="flex items-center justify-center gap-1 text-neutral-500 text-xs">
                      <Eye className="w-3 h-3" /> {p.views_count}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center text-sm text-neutral-600">{p.enquiry_count}</td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/property/${p.property_code}`} className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link href={`/admin/properties/${p.id}/edit`} className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
