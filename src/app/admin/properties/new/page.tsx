"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { LOCATIONS, PROPERTY_TYPES, PROPERTY_STATUSES } from "@/lib/constants";

export default function AdminAddPropertyPage() {
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    // TODO: Submit to Supabase via server action
    setTimeout(() => setSaving(false), 1500);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/properties" className="p-2 rounded-lg hover:bg-neutral-200 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Add New Property</h1>
          <p className="text-sm text-neutral-500">Property code will be auto-generated</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-5">
          <h2 className="font-semibold text-neutral-800">Basic Information</h2>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Property Title *</label>
            <input type="text" name="title" placeholder="e.g. Prime Residential Plot Near City Center" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Property Type *</label>
              <select name="type" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg bg-white" required>
                <option value="">Select type</option>
                {PROPERTY_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Location *</label>
              <select name="location_id" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg bg-white" required>
                <option value="">Select location</option>
                {LOCATIONS.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Area (sq. ft.) *</label>
              <input type="number" name="area_sqft" placeholder="e.g. 2400" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Price (₹) *</label>
              <input type="number" name="price" placeholder="e.g. 1800000" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Road Width</label>
              <input type="text" name="road_width" placeholder="e.g. 20 ft" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Status</label>
              <select name="status" defaultValue="draft" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg bg-white">
                {Object.entries(PROPERTY_STATUSES).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Description</label>
            <textarea name="description" rows={4} placeholder="Detailed property description..." className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg resize-none" />
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="featured" value="true" className="w-4 h-4 rounded border-neutral-300 text-primary-600" />
              <span className="text-sm text-neutral-700">Featured Property</span>
            </label>
          </div>
        </div>

        {/* Photos */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <h2 className="font-semibold text-neutral-800 mb-4">Photos & Media</h2>
          <div className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors cursor-pointer">
            <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
            <p className="text-sm text-neutral-500">Click to upload or drag and drop</p>
            <p className="text-xs text-neutral-400 mt-1">JPG, PNG, WebP up to 5MB each</p>
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-5">
          <h2 className="font-semibold text-neutral-800">SEO Settings</h2>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">SEO Title</label>
            <input type="text" name="seo_title" placeholder="Leave blank to auto-generate" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">SEO Description</label>
            <textarea name="seo_description" rows={2} placeholder="Leave blank to auto-generate" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg resize-none" />
          </div>
        </div>

        {/* Map */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-5">
          <h2 className="font-semibold text-neutral-800">Location / Map</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Latitude</label>
              <input type="number" step="any" name="latitude" placeholder="e.g. 24.7536" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Longitude</label>
              <input type="number" step="any" name="longitude" placeholder="e.g. 84.3742" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Map Display Precision</label>
            <select name="map_display_precision" defaultValue="village_level" className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg bg-white">
              <option value="village_level">Village Level (privacy protected)</option>
              <option value="exact">Exact Pin (requires seller consent)</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Link href="/admin/properties" className="px-6 py-2.5 rounded-lg border border-neutral-300 text-neutral-700 font-semibold text-sm hover:bg-neutral-100 transition-colors">
            Cancel
          </Link>
          <button type="submit" disabled={saving} className="bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Property"}
          </button>
        </div>
      </form>
    </div>
  );
}
