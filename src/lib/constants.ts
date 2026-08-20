// ============================================================
// Jamin Lelo — Constants & Configuration
// ============================================================

// --- Brand ---
export const BRAND = {
  name: 'Jamin Lelo',
  tagline: 'Buy. Sell. Verify. Complete Your Land Deal — With One Trusted Local Partner.',
  shortTagline: 'Your Trusted Land Partner in Aurangabad, Bihar',
  phone: '+91-XXXXXXXXXX',
  whatsapp: '+91-XXXXXXXXXX',
  email: 'info@jaminlelo.com',
  address: 'Aurangabad, Bihar, India',
  website: 'https://jaminlelo.com',
  foundedYear: 2024,
} as const;

// --- WhatsApp ---
export function getWhatsAppLink(message?: string): string {
  const phone = BRAND.whatsapp.replace(/[^0-9]/g, '');
  const base = `https://wa.me/${phone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function getPropertyWhatsAppLink(propertyCode: string): string {
  return getWhatsAppLink(
    `Hello Jamin Lelo, I am interested in property ${propertyCode}.`
  );
}

// --- Locations ---
export interface Location {
  id: string;
  name: string;
  slug: string;
  code: string; // 3-letter code for property codes
  lat: number;
  lng: number;
  description: string;
  seoTitle: string;
  seoDescription: string;
}

export const LOCATIONS: Location[] = [
  {
    id: 'aurangabad-city',
    name: 'Aurangabad City (Town)',
    slug: 'aurangabad-city',
    code: 'AUR',
    lat: 24.7536,
    lng: 84.3742,
    description:
      'The core town and commercial hub of Aurangabad, covering Ramesh Chowk, MG Road, Overbridge, and central residential & commercial sectors.',
    seoTitle: 'Land & Property for Sale in Aurangabad City, Bihar | Jamin Lelo',
    seoDescription:
      'Find verified residential plots, commercial land, and properties in Aurangabad City center. Complete legal verification & registry support by Jamin Lelo.',
  },
  {
    id: 'jasoiya',
    name: 'Jasoiya (Bypass / More)',
    slug: 'jasoiya',
    code: 'JSO',
    lat: 24.7621,
    lng: 84.3854,
    description:
      'Prime developing hub on NH-19 GT Road Bypass & Jasoiya More. High demand for plotted colonies, commercial roadside plots, and investment lands.',
    seoTitle: 'Land & Plots for Sale in Jasoiya, Aurangabad | Jamin Lelo',
    seoDescription:
      'Explore verified plots and land in Jasoiya and Jasoiya More, Aurangabad, Bihar. Best rates on GT Road bypass properties with clear Khatiyan title.',
  },
  {
    id: 'karam-road',
    name: 'Karam Road (Karma)',
    slug: 'karam-road',
    code: 'KRM',
    lat: 24.7412,
    lng: 84.3685,
    description:
      'Rapidly developing educational and residential corridor connecting to Karma. Ideal for houses, plotted developments, and peaceful living.',
    seoTitle: 'Property & Plots on Karam Road, Aurangabad | Jamin Lelo',
    seoDescription:
      'Verified residential land and plots on Karam Road / Karma area in Aurangabad, Bihar. Safe investment with complete documentation support.',
  },
  {
    id: 'dani-bigha',
    name: 'Dani Bigha',
    slug: 'dani-bigha',
    code: 'DNB',
    lat: 24.7582,
    lng: 84.3712,
    description:
      'Prominent central residential neighborhood near Stadium and Ramesh Chowk. Premium location for residential construction and family houses.',
    seoTitle: 'Land & Plots for Sale in Dani Bigha, Aurangabad | Jamin Lelo',
    seoDescription:
      'Find verified residential land and house plots in Dani Bigha, Aurangabad, Bihar. Immediate registry and possession assistance.',
  },
  {
    id: 'nawadih',
    name: 'Nawadih',
    slug: 'nawadih',
    code: 'NWD',
    lat: 24.7689,
    lng: 84.3615,
    description:
      'Fast-growing peri-urban village and residential colony adjacent to town. High appreciation potential for residential plot buyers.',
    seoTitle: 'Plots & Land for Sale in Nawadih, Aurangabad | Jamin Lelo',
    seoDescription:
      'Browse verified plots and land in Nawadih village near Aurangabad town. Clear title, spot verification, and legal paperwork support.',
  },
  {
    id: 'bhabhandi',
    name: 'Bhabhandi',
    slug: 'bhabhandi',
    code: 'BHB',
    lat: 24.7456,
    lng: 84.3912,
    description:
      'High-growth village/mauza near the bypass corridor with plotted layouts and agricultural land transitioning to residential colonies.',
    seoTitle: 'Land & Plot Deals in Bhabhandi, Aurangabad | Jamin Lelo',
    seoDescription:
      'Verified plots and land for sale in Bhabhandi, Aurangabad, Bihar. Direct seller deals with end-to-end documentation handling.',
  },
  {
    id: 'maharajganj',
    name: 'Maharajganj',
    slug: 'maharajganj',
    code: 'MHG',
    lat: 24.7512,
    lng: 84.3789,
    description:
      'Historic commercial market and dense residential locality in central Aurangabad. Premium demand for commercial plots and shops.',
    seoTitle: 'Commercial & Residential Property in Maharajganj, Aurangabad | Jamin Lelo',
    seoDescription:
      'Explore properties and plots in Maharajganj, Aurangabad, Bihar. Verified market plots and houses with Jamin Lelo.',
  },
  {
    id: 'paharpura',
    name: 'Paharpura (Anugrah Nagar)',
    slug: 'paharpura',
    code: 'PHP',
    lat: 24.7615,
    lng: 84.3542,
    description:
      'Well-planned expanding residential area near Anugrah Narayan Nagar with wide road access and good connectivity to main city.',
    seoTitle: 'Land & Plots in Paharpura, Aurangabad | Jamin Lelo',
    seoDescription:
      'Find verified residential plots in Paharpura, Aurangabad. Complete Dakhil Kharij and Khatiyan verification by local experts.',
  },
  {
    id: 'korma',
    name: 'Korma / Manjurahi',
    slug: 'korma',
    code: 'KOR',
    lat: 24.7745,
    lng: 84.3985,
    description:
      'Surrounding village area with fertile agricultural land, farmhouse options, and upcoming layout plotting near city limits.',
    seoTitle: 'Farm & Plot Land in Korma / Manjurahi, Aurangabad | Jamin Lelo',
    seoDescription:
      'Agricultural and plotted land for sale in Korma, Aurangabad, Bihar. Transparent land deals with verified local ownership.',
  },
  {
    id: 'shahpur',
    name: 'Shahpur / Barawan',
    slug: 'shahpur',
    code: 'SHP',
    lat: 24.7325,
    lng: 84.3812,
    description:
      'Emerging peripheral village area offering affordable residential plots, farm land, and future development potential near Aurangabad.',
    seoTitle: 'Affordable Land & Plots in Shahpur, Aurangabad | Jamin Lelo',
    seoDescription:
      'Explore affordable plots and agricultural land in Shahpur / Barawan near Aurangabad, Bihar. Verified by Jamin Lelo.',
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}

export function getLocationByCode(code: string): Location | undefined {
  return LOCATIONS.find((l) => l.code === code);
}

// --- Property Types ---
export const PROPERTY_TYPES = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'agricultural', label: 'Agricultural' },
  { value: 'plot', label: 'Plot' },
  { value: 'house', label: 'House' },
  { value: 'flat', label: 'Flat' },
] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number]['value'];

// --- Property Statuses ---
export const PROPERTY_STATUSES = {
  draft: { label: 'Draft', color: 'gray' },
  under_verification: { label: 'Under Verification', color: 'yellow' },
  available: { label: 'Available', color: 'green' },
  featured: { label: 'Featured', color: 'blue' },
  negotiation: { label: 'Negotiation', color: 'orange' },
  reserved: { label: 'Reserved', color: 'purple' },
  sold: { label: 'Sold', color: 'red' },
  inactive: { label: 'Inactive', color: 'gray' },
} as const;

export type PropertyStatus = keyof typeof PROPERTY_STATUSES;

// --- Seller Request Statuses (§7.1 state machine) ---
export const SELLER_REQUEST_STATUSES = {
  new: { label: 'New', color: 'blue' },
  contacted: { label: 'Contacted', color: 'cyan' },
  under_verification: { label: 'Under Verification', color: 'yellow' },
  site_inspection: { label: 'Site Inspection', color: 'orange' },
  documents_under_review: { label: 'Documents Under Review', color: 'amber' },
  approved: { label: 'Approved', color: 'green' },
  ready_for_listing: { label: 'Ready for Listing', color: 'emerald' },
  published: { label: 'Published', color: 'teal' },
  negotiation: { label: 'Negotiation', color: 'purple' },
  deal_in_progress: { label: 'Deal in Progress', color: 'indigo' },
  sold: { label: 'Sold', color: 'red' },
} as const;

export type SellerRequestStatus = keyof typeof SELLER_REQUEST_STATUSES;

// --- Buyer Lead Statuses (§8.13) ---
export const BUYER_LEAD_STATUSES = {
  new: { label: 'New', color: 'blue' },
  contacted: { label: 'Contacted', color: 'cyan' },
  interested: { label: 'Interested', color: 'green' },
  follow_up: { label: 'Follow-up', color: 'yellow' },
  site_visit_scheduled: { label: 'Site Visit Scheduled', color: 'orange' },
  negotiation: { label: 'Negotiation', color: 'purple' },
  converted: { label: 'Converted', color: 'emerald' },
  lost: { label: 'Lost', color: 'red' },
  closed: { label: 'Closed', color: 'gray' },
} as const;

export type BuyerLeadStatus = keyof typeof BUYER_LEAD_STATUSES;

// --- Lead Types ---
export const LEAD_TYPES = {
  enquiry: { label: 'Enquiry', color: 'blue' },
  requirement: { label: 'Requirement', color: 'green' },
  documentation: { label: 'Documentation', color: 'purple' },
  general: { label: 'General', color: 'gray' },
} as const;

export type LeadType = keyof typeof LEAD_TYPES;

// --- Site Visit Statuses ---
export const SITE_VISIT_STATUSES = {
  requested: { label: 'Requested', color: 'blue' },
  accepted: { label: 'Accepted', color: 'green' },
  rescheduled: { label: 'Rescheduled', color: 'yellow' },
  completed: { label: 'Completed', color: 'emerald' },
  cancelled: { label: 'Cancelled', color: 'red' },
} as const;

export type SiteVisitStatus = keyof typeof SITE_VISIT_STATUSES;

// --- Deal Statuses (§8.17) ---
export const DEAL_STATUSES = {
  lead: { label: 'Lead', color: 'blue' },
  negotiation: { label: 'Negotiation', color: 'yellow' },
  token_advance: { label: 'Token/Advance Stage', color: 'orange' },
  documentation: { label: 'Documentation', color: 'purple' },
  registration: { label: 'Registration/Closing', color: 'indigo' },
  completed: { label: 'Completed', color: 'green' },
  cancelled: { label: 'Cancelled', color: 'red' },
} as const;

export type DealStatus = keyof typeof DEAL_STATUSES;

// --- Verification Statuses (§8.15) ---
export const VERIFICATION_PUBLIC_STATUSES = [
  'Documents Received',
  'Under Review',
  'Site Inspected',
  'Verified by Jamin Lelo',
] as const;

// --- Documentation Services ---
export const DOCUMENTATION_SERVICES = [
  {
    title: 'Sale Deed Drafting',
    description: 'Professional drafting of sale deeds with accurate legal language and proper documentation.',
    icon: 'FileText',
  },
  {
    title: 'Registry Coordination',
    description: 'End-to-end coordination with the Sub-Registrar office for property registration.',
    icon: 'Building',
  },
  {
    title: 'Mutation Assistance',
    description: 'Help with land mutation (dakhil-kharij) process at the Block/Circle office.',
    icon: 'RefreshCw',
  },
  {
    title: 'Document Verification',
    description: 'Thorough verification of ownership documents, land records, and encumbrance certificates.',
    icon: 'Shield',
  },
  {
    title: 'Land Receipt & Records',
    description: 'Assistance with obtaining lagan rasid, khatiyan, and other land revenue records.',
    icon: 'FileSearch',
  },
  {
    title: 'Legal Consultation Coordination',
    description: 'Coordination with qualified legal professionals for complex property matters.',
    icon: 'Scale',
  },
] as const;

// --- FAQ ---
export const FAQS = [
  {
    question: 'How does Jamin Lelo verify properties?',
    answer:
      'Our team conducts thorough verification including site inspection, ownership document review, seller identity verification, and legal status checks. Only properties that pass all checks receive our "Verified by Jamin Lelo" badge.',
  },
  {
    question: 'Is my information kept private?',
    answer:
      'Absolutely. Seller details (phone, address, identity) are never shown publicly. Buyer enquiries are handled by our team — we act as a trusted intermediary throughout the process.',
  },
  {
    question: 'What are your brokerage charges?',
    answer:
      'Our brokerage is competitive and transparent. Charges vary based on the property value and transaction type. Contact us directly for a detailed quote — there are no hidden fees.',
  },
  {
    question: 'Do you help with documentation and registry?',
    answer:
      'Yes, we offer complete documentation assistance including sale deed drafting, registry coordination at the Sub-Registrar office, mutation (dakhil-kharij), and document verification.',
  },
  {
    question: 'Which areas do you operate in?',
    answer:
      'We specialize exclusively in Aurangabad City and its surrounding villages and localities — including Jasoiya, Karam Road, Dani Bigha, Nawadih, Bhabhandi, Maharajganj, Paharpura, Korma, Shahpur, and neighboring mauzas.',
  },
  {
    question: 'How do I sell my property through Jamin Lelo?',
    answer:
      'Simply fill out our "Sell Your Property" form or call us. Our team will contact you, inspect the property, verify documents, set a listing price with your approval, and handle buyer negotiations on your behalf.',
  },
  {
    question: 'Can I visit a property before buying?',
    answer:
      'Yes! You can request a site visit directly from any property page. Our team will schedule and accompany you on the visit, answering all questions on-site.',
  },
  {
    question: 'What types of properties are listed?',
    answer:
      'We list residential plots, agricultural land, commercial properties, houses, and development plots across Aurangabad and its surrounding village areas.',
  },
] as const;

// --- SEO Defaults ---
export const SEO = {
  defaultTitle: 'Jamin Lelo | Land & Property for Sale in Aurangabad, Bihar',
  defaultDescription:
    'Find verified land, plots, and properties for sale in Aurangabad City & surrounding villages, Bihar. Trusted brokerage with complete documentation support.',
  defaultKeywords: [
    'land for sale in Aurangabad Bihar',
    'plot for sale Aurangabad',
    'property in Aurangabad Bihar',
    'plot Jasoiya Aurangabad',
    'land Karam Road Aurangabad',
    'plot Dani Bigha Aurangabad',
    'jamin lelo',
    'land broker Aurangabad',
    'property dealer Aurangabad Bihar',
    'land registry Aurangabad Bihar',
  ],
  ogImage: '/og-image.jpg',
} as const;

// --- Price Formatting ---
export function formatPrice(price: number): string {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }
  if (price >= 100000) {
    return `₹${(price / 100000).toFixed(2)} Lakh`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
}

export function formatArea(sqft: number): string {
  if (sqft >= 43560) {
    return `${(sqft / 43560).toFixed(2)} Acre`;
  }
  if (sqft >= 9000) {
    return `${(sqft / 9).toFixed(0)} Sq. Yd. (${sqft.toLocaleString('en-IN')} sq. ft.)`;
  }
  return `${sqft.toLocaleString('en-IN')} sq. ft.`;
}

// --- Navigation ---
export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/properties', label: 'Properties' },
  { href: '/locations', label: 'Locations' },
  { href: '/sell-your-property', label: 'Sell Property' },
  { href: '/buy-property', label: 'Buy Property' },
  { href: '/services/documentation', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

export const ADMIN_NAV_LINKS = [
  { href: '/admin', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/admin/properties', label: 'Properties', icon: 'Building2' },
  { href: '/admin/seller-requests', label: 'Seller Requests', icon: 'UserPlus' },
  { href: '/admin/buyer-leads', label: 'Buyer Leads', icon: 'Users' },
  { href: '/admin/site-visits', label: 'Site Visits', icon: 'MapPin' },
  { href: '/admin/locations', label: 'Locations', icon: 'Map' },
  { href: '/admin/settings', label: 'Settings', icon: 'Settings' },
] as const;
