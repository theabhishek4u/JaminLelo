-- ============================================================
-- Zameen Setu — Row-Level Security Policies
-- Migration: 002_rls_policies.sql
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE seller_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE seller_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE buyer_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Public Read Policies (anon users can read these)
-- ============================================================

-- Locations: public read
CREATE POLICY "locations_public_read" ON locations
  FOR SELECT USING (is_active = true);

-- Properties: public read for published, non-deleted properties only
CREATE POLICY "properties_public_read" ON properties
  FOR SELECT USING (
    is_deleted = false 
    AND status IN ('available', 'featured', 'negotiation', 'reserved', 'sold')
  );

-- Property Media: public read (follows property visibility)
CREATE POLICY "property_media_public_read" ON property_media
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM properties 
      WHERE properties.id = property_media.property_id 
      AND properties.is_deleted = false
      AND properties.status IN ('available', 'featured', 'negotiation', 'reserved', 'sold')
    )
  );

-- Reviews: public read for published only
CREATE POLICY "reviews_public_read" ON reviews
  FOR SELECT USING (status = 'published');

-- Blog Posts: public read for published only
CREATE POLICY "blog_posts_public_read" ON blog_posts
  FOR SELECT USING (status = 'published');

-- ============================================================
-- Public Insert Policies (anon users can submit these forms)
-- ============================================================

-- Seller Requests: anyone can submit
CREATE POLICY "seller_requests_public_insert" ON seller_requests
  FOR INSERT WITH CHECK (true);

-- Buyer Leads: anyone can submit
CREATE POLICY "buyer_leads_public_insert" ON buyer_leads
  FOR INSERT WITH CHECK (true);

-- Site Visits: anyone can request
CREATE POLICY "site_visits_public_insert" ON site_visits
  FOR INSERT WITH CHECK (true);

-- Contact Submissions: anyone can submit
CREATE POLICY "contact_submissions_public_insert" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Documentation Requests: anyone can submit
CREATE POLICY "documentation_requests_public_insert" ON documentation_requests
  FOR INSERT WITH CHECK (true);

-- Reviews: anyone can submit (pending moderation)
CREATE POLICY "reviews_public_insert" ON reviews
  FOR INSERT WITH CHECK (status = 'pending');

-- ============================================================
-- Authenticated Admin Policies (full CRUD for admin users)
-- ============================================================

-- Helper: check if user is authenticated admin
-- Note: In Supabase, use auth.uid() and match against users table

-- Users: admin full access
CREATE POLICY "users_admin_all" ON users
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Locations: admin full access
CREATE POLICY "locations_admin_all" ON locations
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Properties: admin full access (including drafts)
CREATE POLICY "properties_admin_all" ON properties
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Property Media: admin full access
CREATE POLICY "property_media_admin_all" ON property_media
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Seller Requests: admin full access
CREATE POLICY "seller_requests_admin_all" ON seller_requests
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Seller Documents: admin full access
CREATE POLICY "seller_documents_admin_all" ON seller_documents
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Buyer Leads: admin full access
CREATE POLICY "buyer_leads_admin_all" ON buyer_leads
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Site Visits: admin full access
CREATE POLICY "site_visits_admin_all" ON site_visits
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Deals: admin full access (brokerage gated at app layer per §11)
CREATE POLICY "deals_admin_all" ON deals
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Documentation Requests: admin full access
CREATE POLICY "documentation_requests_admin_all" ON documentation_requests
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Reviews: admin full access
CREATE POLICY "reviews_admin_all" ON reviews
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Blog Posts: admin full access
CREATE POLICY "blog_posts_admin_all" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Activity Log: admin read + insert only (no updates/deletes on audit log)
CREATE POLICY "activity_log_admin_read" ON activity_log
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "activity_log_admin_insert" ON activity_log
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Contact Submissions: admin full access
CREATE POLICY "contact_submissions_admin_all" ON contact_submissions
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
