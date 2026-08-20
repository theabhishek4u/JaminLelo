-- ============================================================
-- Zameen Setu — Initial Database Schema
-- Migration: 001_initial_schema.sql
-- Matches PRD v2 §12 data model
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. Users (admin/staff accounts — separate from customers)
-- ============================================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'staff' CHECK (role IN ('super_admin', 'manager', 'staff')),
  password_hash TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 2. Locations (hierarchical: district > block > village)
-- ============================================================
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  code TEXT UNIQUE NOT NULL, -- 3-letter code for property codes (e.g., OBR)
  parent_location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  description TEXT,
  seo_title TEXT,
  seo_description TEXT,
  property_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_locations_slug ON locations(slug);

-- ============================================================
-- 3. Properties
-- ============================================================
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_code TEXT UNIQUE NOT NULL, -- ZS-<LOC>-<SEQ>, immutable once assigned
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('residential', 'commercial', 'agricultural', 'plot', 'house', 'flat')),
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE RESTRICT,
  area_sqft NUMERIC NOT NULL,
  price NUMERIC NOT NULL,
  price_per_sqft NUMERIC GENERATED ALWAYS AS (
    CASE WHEN area_sqft > 0 THEN price / area_sqft ELSE 0 END
  ) STORED,
  road_width TEXT,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN (
    'draft', 'under_verification', 'available', 'featured',
    'negotiation', 'reserved', 'sold', 'inactive'
  )),
  featured BOOLEAN DEFAULT false,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  map_display_precision TEXT DEFAULT 'village_level' CHECK (map_display_precision IN ('exact', 'village_level')),
  features JSONB DEFAULT '[]'::jsonb, -- array of feature strings
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  views_count INTEGER DEFAULT 0,
  enquiry_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  is_deleted BOOLEAN DEFAULT false, -- soft-delete, never hard-delete (§8.6 AC)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_properties_code ON properties(property_code);
CREATE INDEX idx_properties_location ON properties(location_id);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_type ON properties(type);
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_properties_not_deleted ON properties(is_deleted) WHERE is_deleted = false;

-- Sequence table for auto-generating property codes per location
CREATE TABLE property_code_sequences (
  location_code TEXT PRIMARY KEY,
  next_sequence INTEGER NOT NULL DEFAULT 1
);

-- ============================================================
-- 4. Property Media (photos/videos — public)
-- ============================================================
CREATE TABLE property_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'photo' CHECK (type IN ('photo', 'video')),
  url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_property_media_property ON property_media(property_id);

-- ============================================================
-- 5. Seller Requests (pre-listing, private)
-- ============================================================
CREATE TABLE seller_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  property_type TEXT CHECK (property_type IN ('residential', 'commercial', 'agricultural', 'plot', 'house', 'flat')),
  location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
  location_text TEXT, -- free-text fallback (village/mauza)
  area_sqft NUMERIC,
  expected_price NUMERIC,
  description TEXT,
  road_access TEXT,
  ownership_info TEXT,
  documents_available TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN (
    'new', 'contacted', 'under_verification', 'site_inspection',
    'documents_under_review', 'approved', 'ready_for_listing',
    'published', 'negotiation', 'deal_in_progress', 'sold'
  )),
  assigned_admin_id UUID REFERENCES users(id) ON DELETE SET NULL,
  admin_notes TEXT,
  linked_property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_seller_requests_status ON seller_requests(status);
CREATE INDEX idx_seller_requests_phone ON seller_requests(phone);

-- ============================================================
-- 6. Seller Documents (pre-listing, private, signed URLs)
-- ============================================================
CREATE TABLE seller_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_request_id UUID NOT NULL REFERENCES seller_requests(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL, -- e.g., 'ownership_deed', 'khatiyan', 'lagan_rasid', 'id_proof'
  file_url TEXT NOT NULL, -- stored as Supabase signed URL path
  file_name TEXT,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  notes TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_seller_docs_request ON seller_documents(seller_request_id);

-- ============================================================
-- 7. Buyer Leads (enquiries + requirements)
-- ============================================================
CREATE TABLE buyer_leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  whatsapp TEXT,
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL, -- null for requirement-only leads
  property_code TEXT, -- denormalized for quick display
  budget_min NUMERIC,
  budget_max NUMERIC,
  preferred_location TEXT,
  preferred_type TEXT,
  area_min NUMERIC,
  area_max NUMERIC,
  message TEXT,
  lead_type TEXT NOT NULL DEFAULT 'enquiry' CHECK (lead_type IN ('enquiry', 'requirement', 'documentation', 'general')),
  source_page TEXT, -- which page/CTA the lead came from
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN (
    'new', 'contacted', 'interested', 'follow_up',
    'site_visit_scheduled', 'negotiation', 'converted', 'lost', 'closed'
  )),
  assigned_admin_id UUID REFERENCES users(id) ON DELETE SET NULL,
  admin_notes TEXT,
  follow_up_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_buyer_leads_status ON buyer_leads(status);
CREATE INDEX idx_buyer_leads_type ON buyer_leads(lead_type);
CREATE INDEX idx_buyer_leads_phone ON buyer_leads(phone);
CREATE INDEX idx_buyer_leads_property ON buyer_leads(property_id);
CREATE INDEX idx_buyer_leads_followup ON buyer_leads(follow_up_date) WHERE follow_up_date IS NOT NULL;

-- ============================================================
-- 8. Site Visits
-- ============================================================
CREATE TABLE site_visits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  property_code TEXT, -- denormalized
  buyer_lead_id UUID REFERENCES buyer_leads(id) ON DELETE SET NULL,
  visitor_name TEXT NOT NULL,
  visitor_phone TEXT NOT NULL,
  requested_date DATE NOT NULL,
  requested_time TEXT,
  headcount INTEGER DEFAULT 1,
  special_requirements TEXT,
  status TEXT NOT NULL DEFAULT 'requested' CHECK (status IN (
    'requested', 'accepted', 'rescheduled', 'completed', 'cancelled'
  )),
  admin_notes TEXT,
  rescheduled_date DATE,
  rescheduled_time TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_site_visits_property ON site_visits(property_id);
CREATE INDEX idx_site_visits_date ON site_visits(requested_date);
CREATE INDEX idx_site_visits_status ON site_visits(status);

-- ============================================================
-- 9. Deals (v2 scope but schema ready)
-- ============================================================
CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE RESTRICT,
  buyer_lead_id UUID REFERENCES buyer_leads(id) ON DELETE SET NULL,
  seller_request_id UUID REFERENCES seller_requests(id) ON DELETE SET NULL,
  property_value NUMERIC,
  brokerage_total NUMERIC,
  brokerage_buyer_side NUMERIC,
  brokerage_seller_side NUMERIC,
  brokerage_received NUMERIC DEFAULT 0,
  brokerage_pending NUMERIC GENERATED ALWAYS AS (
    COALESCE(brokerage_total, 0) - COALESCE(brokerage_received, 0)
  ) STORED,
  status TEXT NOT NULL DEFAULT 'lead' CHECK (status IN (
    'lead', 'negotiation', 'token_advance', 'documentation',
    'registration', 'completed', 'cancelled'
  )),
  expected_close_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 10. Documentation Requests
-- ============================================================
CREATE TABLE documentation_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  deal_id UUID REFERENCES deals(id) ON DELETE SET NULL,
  buyer_lead_id UUID REFERENCES buyer_leads(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  service_type TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed', 'cancelled')),
  assigned_staff_id UUID REFERENCES users(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 11. Reviews / Testimonials
-- ============================================================
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT NOT NULL,
  service_used TEXT,
  location TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'published', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reviews_status ON reviews(status);

-- ============================================================
-- 12. Blog Posts (v2 scope but schema ready)
-- ============================================================
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  cover_image TEXT,
  seo_title TEXT,
  meta_description TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 13. Activity Log (audit trail — §9 Security)
-- ============================================================
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  user_name TEXT,
  action TEXT NOT NULL, -- 'create', 'update', 'delete', 'status_change', 'login', etc.
  entity_type TEXT NOT NULL, -- 'property', 'seller_request', 'buyer_lead', 'site_visit', etc.
  entity_id UUID,
  details JSONB, -- additional context (e.g., { "field": "status", "from": "draft", "to": "available" })
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_log_entity ON activity_log(entity_type, entity_id);
CREATE INDEX idx_activity_log_user ON activity_log(user_id);
CREATE INDEX idx_activity_log_created ON activity_log(created_at);

-- ============================================================
-- 14. Contact Form Submissions
-- ============================================================
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Auto-update updated_at trigger
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER tr_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_locations_updated_at BEFORE UPDATE ON locations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_properties_updated_at BEFORE UPDATE ON properties FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_seller_requests_updated_at BEFORE UPDATE ON seller_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_buyer_leads_updated_at BEFORE UPDATE ON buyer_leads FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_site_visits_updated_at BEFORE UPDATE ON site_visits FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_deals_updated_at BEFORE UPDATE ON deals FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tr_documentation_requests_updated_at BEFORE UPDATE ON documentation_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- Seed initial locations
-- ============================================================
INSERT INTO locations (name, slug, code, latitude, longitude, description, seo_title, seo_description) VALUES
  ('Aurangabad', 'aurangabad', 'AUR', 24.7536, 84.3742, 'The district headquarters and commercial hub. A growing real estate market with plots, residential and commercial properties.', 'Land & Property for Sale in Aurangabad, Bihar | Zameen Setu', 'Find verified land, plots, and properties for sale in Aurangabad, Bihar.'),
  ('Obra', 'obra', 'OBR', 24.6474, 84.4189, 'A fast-developing town south of Aurangabad with increasing demand for residential plots and agricultural land.', 'Land & Property for Sale in Obra, Aurangabad | Zameen Setu', 'Explore verified land and property listings in Obra, Aurangabad, Bihar.'),
  ('Daudnagar', 'daudnagar', 'DND', 24.9431, 84.4003, 'A historic town and sub-divisional headquarters with a thriving local market.', 'Land & Property for Sale in Daudnagar, Aurangabad | Zameen Setu', 'Looking for land in Daudnagar, Bihar? Browse verified plots and properties.'),
  ('Nabinagar', 'nabinagar', 'NBN', 24.6035, 84.1282, 'A major town in Aurangabad district with a strong local economy.', 'Land & Property for Sale in Nabinagar, Aurangabad | Zameen Setu', 'Find verified land and properties in Nabinagar, Aurangabad, Bihar.'),
  ('Rafiganj', 'rafiganj', 'RFG', 24.8131, 84.6398, 'A well-connected town on the Grand Trunk Road with good railway connectivity.', 'Land & Property for Sale in Rafiganj, Aurangabad | Zameen Setu', 'Discover verified land listings in Rafiganj, Bihar.'),
  ('Barun', 'barun', 'BRN', 24.6752, 84.5717, 'A developing block with affordable agricultural land and residential plots.', 'Land & Property for Sale in Barun, Aurangabad | Zameen Setu', 'Browse verified properties in Barun, Aurangabad district.'),
  ('Kutumba', 'kutumba', 'KTB', 24.6284, 84.2456, 'A rural block with predominantly agricultural land.', 'Land & Property for Sale in Kutumba, Aurangabad | Zameen Setu', 'Find agricultural land and rural plots in Kutumba, Bihar.'),
  ('Deo', 'deo', 'DEO', 24.6558, 84.4367, 'Known for the historic Deo Sun Temple, offering agricultural land and developing residential zones.', 'Land & Property for Sale in Deo, Aurangabad | Zameen Setu', 'Explore land and property options in Deo, Aurangabad, Bihar.'),
  ('Madanpur', 'madanpur', 'MDP', 24.5893, 84.3148, 'A growing block in the southern part of Aurangabad district.', 'Land & Property for Sale in Madanpur, Aurangabad | Zameen Setu', 'Find verified land in Madanpur, Aurangabad, Bihar.');

-- Seed property code sequences for all locations
INSERT INTO property_code_sequences (location_code, next_sequence) VALUES
  ('AUR', 1), ('OBR', 1), ('DND', 1), ('NBN', 1), ('RFG', 1),
  ('BRN', 1), ('KTB', 1), ('DEO', 1), ('MDP', 1);

-- ============================================================
-- Seed demo properties (10 real-ish listings per §15 launch gate)
-- ============================================================
INSERT INTO properties (property_code, title, type, location_id, area_sqft, price, road_width, description, status, featured, latitude, longitude, features) VALUES
  ('ZS-AUR-0001', 'Prime Residential Plot Near Aurangabad City Center', 'plot',
    (SELECT id FROM locations WHERE code = 'AUR'), 2400, 1800000, '20 ft',
    'Well-located residential plot in a developing colony near Aurangabad city center. Ideal for building a family home. All basic amenities available nearby including schools, hospitals, and markets.', 'available', true, 24.7536, 84.3742, '["Corner Plot", "Near School", "Municipal Water", "Electricity Available"]'),
  ('ZS-AUR-0002', 'Commercial Land on Main Road, Aurangabad', 'commercial',
    (SELECT id FROM locations WHERE code = 'AUR'), 5000, 5500000, '40 ft',
    'High-visibility commercial plot on the main road in Aurangabad. Perfect for shops, offices, or a commercial complex. Heavy footfall area with good road connectivity.', 'available', true, 24.7550, 84.3760, '["Main Road Facing", "Commercial Zone", "High Footfall", "Wide Road Access"]'),
  ('ZS-OBR-0001', 'Agricultural Land in Obra with Road Access', 'agricultural',
    (SELECT id FROM locations WHERE code = 'OBR'), 43560, 2200000, '12 ft',
    'Fertile agricultural land in Obra with existing road access. Suitable for farming or future development. Irrigation canal nearby. Clear ownership documents available.', 'available', false, 24.6474, 84.4189, '["Irrigation Nearby", "Road Access", "Fertile Soil", "Clear Title"]'),
  ('ZS-OBR-0002', 'Residential Plot in Obra Town', 'residential',
    (SELECT id FROM locations WHERE code = 'OBR'), 1800, 900000, '15 ft',
    'Affordable residential plot in Obra town, suitable for a 2-3 bedroom house. Located in a peaceful residential area with good neighborhood.', 'available', false, 24.6480, 84.4195, '["Peaceful Area", "Affordable", "Near Market", "Level Ground"]'),
  ('ZS-DND-0001', 'Large Residential Plot in Daudnagar', 'plot',
    (SELECT id FROM locations WHERE code = 'DND'), 3600, 2800000, '25 ft',
    'Spacious residential plot in Daudnagar near the main market area. Ideal for a large family home or small apartment building. All documents verified.', 'available', true, 24.9431, 84.4003, '["Large Size", "Near Market", "Verified Documents", "Wide Road"]'),
  ('ZS-NBN-0001', 'Farm Land with Bore Well in Nabinagar', 'agricultural',
    (SELECT id FROM locations WHERE code = 'NBN'), 87120, 4500000, '10 ft',
    'Productive agricultural land with existing bore well and pump house in Nabinagar. Currently under cultivation. Ideal for farming or orchard development.', 'available', false, 24.6035, 84.1282, '["Bore Well", "Under Cultivation", "Pump House", "Mango Trees"]'),
  ('ZS-RFG-0001', 'Plot Near GT Road, Rafiganj', 'plot',
    (SELECT id FROM locations WHERE code = 'RFG'), 2000, 1500000, '30 ft',
    'Well-positioned plot near Grand Trunk Road in Rafiganj. Excellent connectivity to Aurangabad and Gaya. Suitable for residential or small commercial use.', 'available', true, 24.8131, 84.6398, '["Near GT Road", "Railway Station Nearby", "Good Connectivity", "Developing Area"]'),
  ('ZS-BRN-0001', 'Affordable Agricultural Land in Barun', 'agricultural',
    (SELECT id FROM locations WHERE code = 'BRN'), 65340, 1800000, '8 ft',
    'Affordable agricultural land in Barun block. Suitable for farming or long-term investment. Road access available. Peaceful rural setting.', 'available', false, 24.6752, 84.5717, '["Affordable", "Rural Setting", "Road Access", "Investment Opportunity"]'),
  ('ZS-DEO-0001', 'Residential Land Near Deo Sun Temple', 'residential',
    (SELECT id FROM locations WHERE code = 'DEO'), 1500, 750000, '12 ft',
    'Residential plot in the historic town of Deo, near the famous Sun Temple. A unique opportunity to own property in this culturally significant area.', 'available', false, 24.6558, 84.4367, '["Heritage Area", "Near Sun Temple", "Tourist Area", "Peaceful"]'),
  ('ZS-MDP-0001', 'Development Plot in Madanpur', 'plot',
    (SELECT id FROM locations WHERE code = 'MDP'), 4800, 2000000, '20 ft',
    'Large development plot in Madanpur with scope for residential construction. Growing area with improving infrastructure. Good investment potential.', 'available', false, 24.5893, 84.3148, '["Large Plot", "Growing Area", "Infrastructure Development", "Investment"]');

-- Update property code sequences
UPDATE property_code_sequences SET next_sequence = 3 WHERE location_code = 'AUR';
UPDATE property_code_sequences SET next_sequence = 3 WHERE location_code = 'OBR';
UPDATE property_code_sequences SET next_sequence = 2 WHERE location_code IN ('DND', 'NBN', 'RFG', 'BRN', 'DEO', 'MDP');

-- Update location property counts
UPDATE locations SET property_count = (
  SELECT COUNT(*) FROM properties 
  WHERE properties.location_id = locations.id 
  AND properties.status IN ('available', 'featured')
  AND properties.is_deleted = false
);
