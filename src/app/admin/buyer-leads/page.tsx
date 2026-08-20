import { BUYER_LEAD_STATUSES, LEAD_TYPES } from "@/lib/constants";

const DEMO_LEADS = [
  { id: "1", buyer_name: "Rajesh Kumar", phone: "+91-98XXX-XXXXX", lead_type: "enquiry" as const, property_code: "ZS-AUR-0001", source_page: "property_detail", status: "new" as const, message: "I am interested in this plot. Please share more details.", created_at: "2 hours ago" },
  { id: "2", buyer_name: "Priya Singh", phone: "+91-97XXX-XXXXX", lead_type: "requirement" as const, property_code: null, source_page: "buy_property", status: "new" as const, message: "Looking for 2000+ sq ft plot in Aurangabad under ₹20 lakh.", created_at: "5 hours ago" },
  { id: "3", buyer_name: "Amit Yadav", phone: "+91-96XXX-XXXXX", lead_type: "enquiry" as const, property_code: "ZS-JSO-0001", source_page: "property_detail", status: "contacted" as const, message: "Want to visit this Jasoiya bypass commercial plot.", created_at: "1 day ago" },
  { id: "4", buyer_name: "Sunita Devi", phone: "+91-95XXX-XXXXX", lead_type: "documentation" as const, property_code: null, source_page: "documentation_services", status: "follow_up" as const, message: "Need help with land mutation process.", created_at: "2 days ago" },
  { id: "5", buyer_name: "Vikram Singh", phone: "+91-94XXX-XXXXX", lead_type: "enquiry" as const, property_code: "ZS-KRM-0001", source_page: "contact", status: "interested" as const, message: "Interested in the Karam Road plot. Budget is flexible.", created_at: "3 days ago" },
];

export default function AdminBuyerLeadsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Buyer Leads / CRM</h1>
        <p className="text-sm text-neutral-500">{DEMO_LEADS.length} total leads</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4 flex flex-wrap gap-3">
        <select className="px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
          <option value="">All Types</option>
          {Object.entries(LEAD_TYPES).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>
        <select className="px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
          <option value="">All Statuses</option>
          {Object.entries(BUYER_LEAD_STATUSES).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>
        <input type="text" placeholder="Search by name or phone..." className="flex-1 min-w-50 px-3 py-2 border border-neutral-300 rounded-lg text-sm" />
      </div>

      {/* Leads list */}
      <div className="space-y-3">
        {DEMO_LEADS.map((lead) => (
          <div key={lead.id} className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-sm transition-shadow">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-neutral-800">{lead.buyer_name}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full status-${lead.status}`}>
                    {BUYER_LEAD_STATUSES[lead.status]?.label}
                  </span>
                  <span className="bg-neutral-100 text-neutral-600 text-xs px-2 py-0.5 rounded capitalize">
                    {LEAD_TYPES[lead.lead_type]?.label}
                  </span>
                </div>
                <p className="text-sm text-neutral-600 mb-2">{lead.message}</p>
                <div className="flex flex-wrap gap-4 text-xs text-neutral-400">
                  <span>📞 {lead.phone}</span>
                  {lead.property_code && <span className="text-primary-600 font-mono">{lead.property_code}</span>}
                  <span>Source: {lead.source_page.replace(/_/g, " ")}</span>
                  <span>{lead.created_at}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <select defaultValue={lead.status} className="px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white">
                  {Object.entries(BUYER_LEAD_STATUSES).map(([key, val]) => (
                    <option key={key} value={key}>{val.label}</option>
                  ))}
                </select>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors">
                  Update
                </button>
              </div>
            </div>
            {/* Notes */}
            <div className="mt-3 pt-3 border-t border-neutral-100">
              <textarea
                placeholder="Add private notes..."
                rows={1}
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm text-neutral-600 focus:border-primary-400 resize-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
