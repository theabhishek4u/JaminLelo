import { SITE_VISIT_STATUSES } from "@/lib/constants";

const DEMO_VISITS = [
  { id: "1", visitor_name: "Rajesh Kumar", visitor_phone: "+91-98XXX-XXXXX", property_code: "ZS-AUR-0001", requested_date: "Aug 18, 2026", requested_time: "10:00 AM", headcount: 2, status: "requested" as const, special_requirements: "Need to see boundary markers" },
  { id: "2", visitor_name: "Amit Yadav", visitor_phone: "+91-96XXX-XXXXX", property_code: "ZS-OBR-0001", requested_date: "Aug 17, 2026", requested_time: "2:00 PM", headcount: 3, status: "accepted" as const, special_requirements: null },
  { id: "3", visitor_name: "Vikram Singh", visitor_phone: "+91-94XXX-XXXXX", property_code: "ZS-DND-0001", requested_date: "Aug 15, 2026", requested_time: "11:00 AM", headcount: 1, status: "completed" as const, special_requirements: null },
];

export default function AdminSiteVisitsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Site Visits</h1>
        <p className="text-sm text-neutral-500">{DEMO_VISITS.length} total visits</p>
      </div>

      {/* Calendar hint */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
        💡 Calendar view coming in v2 — for now, visits are sorted by date. Check for date conflicts manually.
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap gap-2">
        <button className="px-3 py-1.5 rounded-full text-sm font-medium bg-primary-600 text-white">All</button>
        {Object.entries(SITE_VISIT_STATUSES).map(([key, val]) => (
          <button key={key} className="px-3 py-1.5 rounded-full text-sm font-medium bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors">
            {val.label}
          </button>
        ))}
      </div>

      {/* Visit Cards */}
      <div className="space-y-4">
        {DEMO_VISITS.map((visit) => (
          <div key={visit.id} className="bg-white rounded-xl border border-neutral-200 p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-neutral-800">{visit.visitor_name}</h3>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full status-${visit.status}`}>
                    {SITE_VISIT_STATUSES[visit.status]?.label}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-neutral-500">
                  <span>📞 {visit.visitor_phone}</span>
                  <span className="text-primary-600 font-mono">🏠 {visit.property_code}</span>
                  <span>📅 {visit.requested_date} at {visit.requested_time}</span>
                  <span>👥 {visit.headcount} {visit.headcount > 1 ? "people" : "person"}</span>
                </div>
                {visit.special_requirements && (
                  <p className="text-xs text-neutral-400 mt-2">Note: {visit.special_requirements}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <select defaultValue={visit.status} className="px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                  {Object.entries(SITE_VISIT_STATUSES).map(([key, val]) => (
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
