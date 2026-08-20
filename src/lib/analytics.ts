// ============================================================
// Jamin Lelo — Analytics Event Tracking
// ============================================================

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean | undefined>;

/**
 * Track a custom analytics event via GA4.
 */
export function trackEvent(eventName: string, params?: EventParams): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

// --- Pre-defined Events ---

export function trackPropertyView(propertyCode: string, propertyType: string, location: string): void {
  trackEvent('property_view', {
    property_code: propertyCode,
    property_type: propertyType,
    location,
  });
}

export function trackWhatsAppClick(source: string, propertyCode?: string): void {
  trackEvent('whatsapp_click', {
    source,
    property_code: propertyCode || 'none',
  });
}

export function trackCallClick(source: string, propertyCode?: string): void {
  trackEvent('call_click', {
    source,
    property_code: propertyCode || 'none',
  });
}

export function trackEnquirySubmit(leadType: string, source: string, propertyCode?: string): void {
  trackEvent('enquiry_submit', {
    lead_type: leadType,
    source,
    property_code: propertyCode || 'none',
  });
}

export function trackSiteVisitRequest(propertyCode: string): void {
  trackEvent('site_visit_request', { property_code: propertyCode });
}

export function trackSellerFormSubmit(): void {
  trackEvent('seller_form_submit');
}

export function trackSearch(filters: EventParams): void {
  trackEvent('property_search', filters);
}

export function trackLocationPageView(location: string): void {
  trackEvent('location_page_view', { location });
}
