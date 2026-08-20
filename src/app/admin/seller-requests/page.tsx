import { SELLER_REQUEST_STATUSES } from "@/lib/constants";
import { formatPrice } from "@/lib/constants";

const DEMO_REQUESTS = [
  { id: "1", seller_name: "Ramesh Prasad", phone: "+91-98XXX-XXXXX", property_type: "agricultural", location: "Jasoiya", area_sqft: 43560, expected_price: 2500000, status: "new" as const, created_at: "Aug 15, 2026" },
  { id: "2", seller_name: "Manoj Kumar", phone: "+91-97XXX-XXXXX", property_type: "plot", location: "Karam Road", area_sqft: 3200, expected_price: 2000000, status: "contacted" as const, created_at: "Aug 13, 2026" },
  { id: "3", seller_name: "Sunil Yadav", phone: "+91-96XXX-XXXXX", property_type: "residential", location: "Dani Bigha", area_sqft: 1500, expected_price: 1200000, status: "site_inspection" as const, created_at: "Aug 10, 2026" },
];

export default function AdminSellerRequestsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Seller Requests</h1>
        <p className="text-sm text-neutral-500">{DEMO_REQUESTS.length} total requests</p>
      </div>

      {/* Status filter pills */}
      <div className="flex flex-wrap gap-2">
        <button className="px-3 py-1.5 rounded-full text-sm font-medium bg-primary-600 text-white">All</button>
        {Object.entries(SELLER_REQUEST_STATUSES).slice(0, 6).map(([key, val]) => (
          <button key={key} className="px-3 py-1.5 rounded-full text-sm font-medium bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors">
            {val.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {DEMO_REQUESTS.map((req) => (
          <div key={req.id} className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-sm transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-neutral-800">{req.seller_name}</h3>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full status-${req.status}`}>
                    {SELLER_REQUEST_STATUSES[req.status]?.label}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-neutral-500">
                  <span>📞 {req.phone}</span>
                  <span>📍 {req.location}</span>
                  <span className="capitalize">🏠 {req.property_type}</span>
                  <span>💰 {formatPrice(req.expected_price)}</span>
                </div>
                <p className="text-xs text-neutral-400 mt-2">Submitted: {req.created_at}</p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  defaultValue={req.status}
                  className="px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white"
                >
                  {Object.entries(SELLER_REQUEST_STATUSES).map(([key, val]) => (
                    <option key={key} value={key}>{val.label}</option>
                  ))}
                </select>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors">
                  Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
