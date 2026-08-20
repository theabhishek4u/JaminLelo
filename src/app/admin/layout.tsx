"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, Building2, UserPlus, Users, MapPin, Map, Settings,
  LogOut, Menu, X, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/properties", label: "Properties", icon: Building2 },
  { href: "/admin/seller-requests", label: "Seller Requests", icon: UserPlus },
  { href: "/admin/buyer-leads", label: "Buyer Leads", icon: Users },
  { href: "/admin/site-visits", label: "Site Visits", icon: MapPin },
  { href: "/admin/locations", label: "Locations", icon: Map },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // TODO: Add real auth check — redirect to /admin/login if not authenticated

  return (
    <div className="min-h-screen bg-neutral-100 flex">
      {/* Sidebar — Desktop */}
      <aside className="hidden lg:flex w-64 bg-neutral-900 text-white flex-col fixed inset-y-0 left-0 z-40">
        {/* Brand */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-neutral-800">
          <div className="w-9 h-9 rounded-lg bg-linear-to-br from-primary-500 to-primary-700 flex items-center justify-center">
            <span className="text-white font-bold text-sm">J</span>
          </div>
          <div>
            <span className="font-bold text-sm">Jamin Lelo</span>
            <span className="block text-[10px] text-neutral-400">Admin Dashboard</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary-600 text-white"
                    : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-neutral-800">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            View Public Site
          </Link>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-400 hover:bg-red-900/50 hover:text-red-400 transition-colors w-full">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-64 bg-neutral-900 text-white h-full flex flex-col animate-fade-in">
            <div className="flex items-center justify-between px-5 py-5 border-b border-neutral-800">
              <span className="font-bold">Jamin Lelo Admin</span>
              <button onClick={() => setSidebarOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive ? "bg-primary-600 text-white" : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar */}
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-6 h-14">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-neutral-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="text-sm text-neutral-500 hidden lg:block">
              Welcome back, Admin
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
