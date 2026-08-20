import Link from "next/link";
import { FileText, ArrowRight, Phone, Shield, CheckCircle2 } from "lucide-react";
import { BRAND, DOCUMENTATION_SERVICES, getWhatsAppLink } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Land & Documentation Services",
  description: "Complete land documentation services in Aurangabad, Bihar — sale deed drafting, registry coordination, mutation assistance, document verification, and more.",
};

export default function DocumentationServicesPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <div className="bg-linear-to-br from-primary-800 to-primary-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Land & Documentation Services</h1>
          <p className="text-primary-100/80 text-lg max-w-2xl mx-auto">
            We handle the paperwork complexities so you can focus on your land transaction. Professional, reliable, local.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 stagger-children">
          {DOCUMENTATION_SERVICES.map((service, i) => (
            <div key={i} className="bg-white rounded-xl border border-neutral-200 p-6 hover:border-primary-200 hover:shadow-md transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center mb-4 transition-colors">
                <FileText className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-bold text-neutral-800 text-lg mb-2">{service.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-8 mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">How Our Documentation Service Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Contact Us", desc: "Call, WhatsApp, or fill the form below with your documentation needs." },
              { step: "2", title: "Consultation", desc: "Our team reviews your case and provides a clear scope and timeline." },
              { step: "3", title: "Execution", desc: "We handle all coordination — drafting, office visits, follow-ups." },
              { step: "4", title: "Completion", desc: "You receive completed documents with all records maintained." },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center mx-auto mb-3 font-bold">
                  {item.step}
                </div>
                <h4 className="font-semibold text-neutral-800 mb-1">{item.title}</h4>
                <p className="text-xs text-neutral-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-accent-50 border border-accent-200 rounded-xl p-6 mb-16">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-accent-600 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-accent-800 mb-1">Important Note</h3>
              <p className="text-sm text-accent-700 leading-relaxed">
                Jamin Lelo provides documentation <strong>assistance and coordination</strong> services. 
                Actual property registration is executed at the Sub-Registrar office as per applicable laws. 
                For complex legal matters, we coordinate with qualified legal professionals. 
                Our services are guidance-based and do not constitute legal advice.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-linear-to-r from-primary-700 to-primary-800 rounded-2xl p-8 md:p-10 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">Need Documentation Help?</h2>
          <p className="text-primary-100/80 mb-6 max-w-xl mx-auto">
            Contact us today and let our experienced team handle your paperwork.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={`tel:${BRAND.phone}`} className="bg-white text-primary-800 px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
              <Phone className="w-5 h-5" /> Call Now
            </a>
            <a
              href={getWhatsAppLink("Hello Jamin Lelo, I need help with land documentation services.")}
              target="_blank" rel="noopener noreferrer"
              className="whatsapp-green text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
