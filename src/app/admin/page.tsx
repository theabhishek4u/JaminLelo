import Link from "next/link";
import {
  Building2, UserPlus, Users, MapPin, ArrowUpRight, AlertCircle,
  TrendingUp, Eye, Phone as PhoneIcon
} from "lucide-react";

// Demo data — replaced by Supabase queries in production
const STATS = [
  { label: "Total Properties", value: "10", change: "+2 this week", icon: Building2, color: "bg-primary-50 text-primary-600" },
  { label: "New Leads", value: "5", change: "3 today", icon: Users, color: "bg-blue-50 text-blue-600" },
  { label: "Seller Requests", value: "3", change: "1 pending", icon: UserPlus, color: "bg-accent-50 text-accent-600" },
  { label: "Site Visits", value: "2", change: "This week", icon: MapPin, color: "bg-purple-50 text-purple-600" },
];

const RECENT_LEADS = [
  { id: "1", name: "Rajesh Kumar", phone: "+91-98XXX-XXXXX", type: "enquiry", property: "ZS-AUR-0001", status: "new", time: "2 hours ago" },
  { id: "2", name: "Priya Singh", phone: "+91-97XXX-XXXXX", type: "requirement", property: null, status: "new", time: "5 hours ago" },
  { id: "3", name: "Amit Yadav", phone: "+91-96XXX-XXXXX", type: "enquiry", property: "ZS-OBR-0001", status: "contacted", time: "1 day ago" },
  { id: "4", name: "Sunita Devi", phone: "+91-95XXX-XXXXX", type: "documentation", property: null, status: "follow_up", time: "2 days ago" },
];

const OVERDUE_FOLLOWUPS = [
  { name: "Amit Yadav", phone: "+91-96XXX-XXXXX", property: "ZS-OBR-0001", dueDate: "Aug 14, 2026" },
  { name: "Sunita Devi", phone: "+91-95XXX-XXXXX", property: null, dueDate: "Aug 13, 2026" },
];

const RECENT_ACTIVITY = [
  { action: "New buyer enquiry from Rajesh Kumar for ZS-AUR-0001", time: "2 hours ago" },
  { action: "Seller request from Manoj Mishra — New property in Obra", time: "5 hours ago" },
  { action: "Site visit completed for ZS-DND-0001", time: "1 day ago" },
  { action: "Property ZS-RFG-0001 status changed to Available", time: "2 days ago" },
  { action: "New documentation service request from Sunita Devi", time: "2 days ago" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
          <p className="text-sm text-neutral-500">Overview of your business</p>
        </div>
        <Link
          href="/admin/properties/new"
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
        >
          + Add Property
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-neutral-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-xs text-neutral-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
            <p className="text-sm text-neutral-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overdue Follow-ups — surfaced, not buried (§8.13 AC) */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <h2 className="font-semibold text-neutral-800 text-sm">Overdue Follow-ups</h2>
              </div>
              <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">
                {OVERDUE_FOLLOWUPS.length}
              </span>
            </div>
            <div className="divide-y divide-neutral-100">
              {OVERDUE_FOLLOWUPS.map((item, i) => (
                <div key={i} className="px-5 py-3 hover:bg-red-50/50 transition-colors">
                  <p className="text-sm font-medium text-neutral-800">{item.name}</p>
                  <p className="text-xs text-neutral-400">{item.phone}</p>
                  {item.property && (
                    <p className="text-xs text-primary-600 font-mono mt-0.5">{item.property}</p>
                  )}
                  <p className="text-xs text-red-500 mt-1">Due: {item.dueDate}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Leads */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
              <h2 className="font-semibold text-neutral-800 text-sm">Recent Leads</h2>
              <Link href="/admin/buyer-leads" className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1">
                View All <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-2.5 text-left font-medium">Name</th>
                    <th className="px-5 py-2.5 text-left font-medium">Type</th>
                    <th className="px-5 py-2.5 text-left font-medium">Property</th>
                    <th className="px-5 py-2.5 text-left font-medium">Status</th>
                    <th className="px-5 py-2.5 text-left font-medium">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {RECENT_LEADS.map((lead) => (
                    <tr key={lead.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-5 py-3">
                        <p className="font-medium text-neutral-800">{lead.name}</p>
                        <p className="text-xs text-neutral-400">{lead.phone}</p>
                      </td>
                      <td className="px-5 py-3">
                        <span className="bg-neutral-100 text-neutral-600 text-xs px-2 py-0.5 rounded capitalize">
                          {lead.type}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        {lead.property ? (
                          <span className="text-primary-600 font-mono text-xs">{lead.property}</span>
                        ) : (
                          <span className="text-neutral-400 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full status-${lead.status}`}>
                          {lead.status.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-xs text-neutral-400">{lead.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-neutral-100">
          <h2 className="font-semibold text-neutral-800 text-sm">Recent Activity</h2>
        </div>
        <div className="divide-y divide-neutral-100">
          {RECENT_ACTIVITY.map((item, i) => (
            <div key={i} className="px-5 py-3 flex items-center justify-between hover:bg-neutral-50 transition-colors">
              <p className="text-sm text-neutral-700">{item.action}</p>
              <span className="text-xs text-neutral-400 shrink-0 ml-4">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
