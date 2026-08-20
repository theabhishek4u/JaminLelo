import Link from "next/link";
import { MapPin, Maximize, IndianRupee, Eye, ArrowRight } from "lucide-react";
import { formatPrice, formatArea } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: {
    property_code: string;
    title: string;
    type: string;
    price: number;
    area_sqft: number;
    road_width?: string | null;
    status: string;
    featured: boolean;
    features: string[];
    views_count: number;
    location?: {
      name: string;
      slug: string;
    };
    media?: {
      url: string;
      alt_text?: string | null;
    }[];
  };
  className?: string;
}

export function PropertyCard({ property, className }: PropertyCardProps) {
  const locationName = property.location?.name || "Aurangabad";
  const firstImage = property.media?.[0]?.url;
  const typeLabel = property.type.charAt(0).toUpperCase() + property.type.slice(1);

  return (
    <Link
      href={`/property/${property.property_code}`}
      className={cn(
        "group block bg-white rounded-xl overflow-hidden border border-neutral-200 card-hover",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-4/3 bg-neutral-100 overflow-hidden">
        {firstImage ? (
          <img
            src={firstImage}
            alt={property.media?.[0]?.alt_text || property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary-50 to-primary-100">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary-200 flex items-center justify-center mx-auto mb-2">
                <MapPin className="w-8 h-8 text-primary-600" />
              </div>
              <span className="text-sm text-primary-600 font-medium">{typeLabel}</span>
            </div>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {property.featured && (
            <span className="bg-accent-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
              ★ Featured
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-sm text-neutral-800 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
            {typeLabel}
          </span>
        </div>

        {/* Status */}
        {property.status === "sold" && (
          <div className="absolute inset-0 bg-neutral-900/60 flex items-center justify-center">
            <span className="bg-red-600 text-white text-lg font-bold px-6 py-2 rounded-lg rotate-[-5deg]">
              SOLD
            </span>
          </div>
        )}

        {/* Property Code */}
        <div className="absolute bottom-3 right-3">
          <span className="bg-neutral-900/70 text-white text-xs px-2.5 py-1 rounded-md font-mono backdrop-blur-sm">
            {property.property_code}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-xl font-bold text-primary-700 flex items-center">
            {formatPrice(property.price)}
          </span>
          {property.views_count > 0 && (
            <span className="flex items-center gap-1 text-xs text-neutral-400">
              <Eye className="w-3 h-3" />
              {property.views_count}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-neutral-800 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors leading-snug">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm text-neutral-500 mb-3">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span>{locationName}, Aurangabad, Bihar</span>
        </div>

        {/* Details */}
        <div className="flex items-center gap-4 text-sm text-neutral-600 mb-3 pb-3 border-b border-neutral-100">
          <span className="flex items-center gap-1">
            <Maximize className="w-3.5 h-3.5 text-neutral-400" />
            {formatArea(property.area_sqft)}
          </span>
          {property.road_width && (
            <span className="text-neutral-400">
              Road: {property.road_width}
            </span>
          )}
        </div>

        {/* Features */}
        {property.features && property.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {property.features.slice(0, 3).map((feature, i) => (
              <span
                key={i}
                className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-md"
              >
                {feature}
              </span>
            ))}
            {property.features.length > 3 && (
              <span className="text-xs text-neutral-400">
                +{property.features.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center justify-between pt-1">
          <span className={cn(
            "text-xs font-medium px-2.5 py-1 rounded-full",
            `status-${property.status}`
          )}>
            {property.status === "available" ? "✓ Available" : 
             property.status === "featured" ? "★ Featured" :
             property.status.charAt(0).toUpperCase() + property.status.slice(1).replace(/_/g, " ")}
          </span>
          <span className="text-sm text-primary-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
            View Details
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
