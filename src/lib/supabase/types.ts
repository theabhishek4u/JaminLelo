// ============================================================
// Jamin Lelo — Database TypeScript Types
// These mirror the Supabase schema from 001_initial_schema.sql
// In production, generate these from `supabase gen types typescript`
// ============================================================

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<User, 'id'>>;
      };
      locations: {
        Row: DbLocation;
        Insert: Omit<DbLocation, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<DbLocation, 'id'>>;
      };
      properties: {
        Row: Property;
        Insert: Omit<Property, 'id' | 'price_per_sqft' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Property, 'id' | 'price_per_sqft' | 'property_code'>>;
      };
      property_media: {
        Row: PropertyMedia;
        Insert: Omit<PropertyMedia, 'id' | 'created_at'>;
        Update: Partial<Omit<PropertyMedia, 'id'>>;
      };
      seller_requests: {
        Row: SellerRequest;
        Insert: Omit<SellerRequest, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<SellerRequest, 'id'>>;
      };
      seller_documents: {
        Row: SellerDocument;
        Insert: Omit<SellerDocument, 'id' | 'uploaded_at'>;
        Update: Partial<Omit<SellerDocument, 'id'>>;
      };
      buyer_leads: {
        Row: BuyerLead;
        Insert: Omit<BuyerLead, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<BuyerLead, 'id'>>;
      };
      site_visits: {
        Row: SiteVisit;
        Insert: Omit<SiteVisit, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<SiteVisit, 'id'>>;
      };
      deals: {
        Row: Deal;
        Insert: Omit<Deal, 'id' | 'brokerage_pending' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Deal, 'id' | 'brokerage_pending'>>;
      };
      documentation_requests: {
        Row: DocumentationRequest;
        Insert: Omit<DocumentationRequest, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<DocumentationRequest, 'id'>>;
      };
      reviews: {
        Row: Review;
        Insert: Omit<Review, 'id' | 'created_at'>;
        Update: Partial<Omit<Review, 'id'>>;
      };
      blog_posts: {
        Row: BlogPost;
        Insert: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<BlogPost, 'id'>>;
      };
      activity_log: {
        Row: ActivityLog;
        Insert: Omit<ActivityLog, 'id' | 'created_at'>;
        Update: never;
      };
      contact_submissions: {
        Row: ContactSubmission;
        Insert: Omit<ContactSubmission, 'id' | 'created_at'>;
        Update: Partial<Omit<ContactSubmission, 'id'>>;
      };
    };
  };
}

// --- Individual Table Types ---

export interface User {
  id: string;
  name: string;
  phone: string | null;
  email: string;
  role: 'super_admin' | 'manager' | 'staff';
  password_hash: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbLocation {
  id: string;
  name: string;
  slug: string;
  code: string;
  parent_location_id: string | null;
  latitude: number | null;
  longitude: number | null;
  description: string | null;
  seo_title: string | null;
  seo_description: string | null;
  property_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Property {
  id: string;
  property_code: string;
  title: string;
  type: 'residential' | 'commercial' | 'agricultural' | 'plot' | 'house' | 'flat';
  location_id: string;
  area_sqft: number;
  price: number;
  price_per_sqft: number;
  road_width: string | null;
  description: string | null;
  status: 'draft' | 'under_verification' | 'available' | 'featured' | 'negotiation' | 'reserved' | 'sold' | 'inactive';
  featured: boolean;
  latitude: number | null;
  longitude: number | null;
  map_display_precision: 'exact' | 'village_level';
  features: string[];
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  views_count: number;
  enquiry_count: number;
  created_by: string | null;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface PropertyMedia {
  id: string;
  property_id: string;
  type: 'photo' | 'video';
  url: string;
  alt_text: string | null;
  sort_order: number;
  created_at: string;
}

export interface SellerRequest {
  id: string;
  seller_name: string;
  phone: string;
  whatsapp: string | null;
  property_type: string | null;
  location_id: string | null;
  location_text: string | null;
  area_sqft: number | null;
  expected_price: number | null;
  description: string | null;
  road_access: string | null;
  ownership_info: string | null;
  documents_available: string | null;
  status: 'new' | 'contacted' | 'under_verification' | 'site_inspection' | 'documents_under_review' | 'approved' | 'ready_for_listing' | 'published' | 'negotiation' | 'deal_in_progress' | 'sold';
  assigned_admin_id: string | null;
  admin_notes: string | null;
  linked_property_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface SellerDocument {
  id: string;
  seller_request_id: string;
  document_type: string;
  file_url: string;
  file_name: string | null;
  verification_status: 'pending' | 'verified' | 'rejected';
  notes: string | null;
  uploaded_at: string;
}

export interface BuyerLead {
  id: string;
  buyer_name: string;
  phone: string;
  whatsapp: string | null;
  property_id: string | null;
  property_code: string | null;
  budget_min: number | null;
  budget_max: number | null;
  preferred_location: string | null;
  preferred_type: string | null;
  area_min: number | null;
  area_max: number | null;
  message: string | null;
  lead_type: 'enquiry' | 'requirement' | 'documentation' | 'general';
  source_page: string | null;
  status: 'new' | 'contacted' | 'interested' | 'follow_up' | 'site_visit_scheduled' | 'negotiation' | 'converted' | 'lost' | 'closed';
  assigned_admin_id: string | null;
  admin_notes: string | null;
  follow_up_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface SiteVisit {
  id: string;
  property_id: string;
  property_code: string | null;
  buyer_lead_id: string | null;
  visitor_name: string;
  visitor_phone: string;
  requested_date: string;
  requested_time: string | null;
  headcount: number;
  special_requirements: string | null;
  status: 'requested' | 'accepted' | 'rescheduled' | 'completed' | 'cancelled';
  admin_notes: string | null;
  rescheduled_date: string | null;
  rescheduled_time: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Deal {
  id: string;
  property_id: string;
  buyer_lead_id: string | null;
  seller_request_id: string | null;
  property_value: number | null;
  brokerage_total: number | null;
  brokerage_buyer_side: number | null;
  brokerage_seller_side: number | null;
  brokerage_received: number;
  brokerage_pending: number;
  status: 'lead' | 'negotiation' | 'token_advance' | 'documentation' | 'registration' | 'completed' | 'cancelled';
  expected_close_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface DocumentationRequest {
  id: string;
  deal_id: string | null;
  buyer_lead_id: string | null;
  customer_name: string;
  customer_phone: string;
  service_type: string;
  description: string | null;
  status: 'new' | 'in_progress' | 'completed' | 'cancelled';
  assigned_staff_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  customer_name: string;
  rating: number;
  review_text: string;
  service_used: string | null;
  location: string | null;
  status: 'pending' | 'published' | 'rejected';
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  cover_image: string | null;
  seo_title: string | null;
  meta_description: string | null;
  status: 'draft' | 'published';
  author_id: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string | null;
  user_name: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  details: Record<string, unknown> | null;
  ip_address: string | null;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  subject: string | null;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
}

// --- Joined / Enriched Types ---

export interface PropertyWithLocation extends Property {
  location: DbLocation;
  media: PropertyMedia[];
}

export interface BuyerLeadWithProperty extends BuyerLead {
  property?: Property | null;
}

export interface SiteVisitWithDetails extends SiteVisit {
  property?: Property;
  buyer_lead?: BuyerLead;
}
