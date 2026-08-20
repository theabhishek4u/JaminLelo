import Link from "next/link";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  dark?: boolean;
}

export function Logo({ className = "", showTagline = true, dark = false }: LogoProps) {
  return (
    <Link href="/" className={`inline-flex flex-col items-start group ${className}`}>
      <div className="flex items-center gap-1.5">
        <span
          className={`text-[26px] sm:text-[28px] font-extrabold tracking-tight leading-none ${
            dark ? "text-white" : "text-neutral-900"
          }`}
        >
          Jamin<span className={dark ? "text-emerald-400" : "text-[#0d3b24]"}>Lelo</span>
        </span>
        {/* Custom Stylized Gold Pin Marker */}
        <div className="relative w-7 h-7 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-7 h-7 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-sm"
          >
            {/* Outer Pin Body */}
            <path
              d="M12 2C8.13 2 5 5.13 5 9C5 13.88 10.94 20.35 11.45 20.89C11.75 21.2 12.25 21.2 12.55 20.89C13.06 20.35 19 13.88 19 9C19 5.13 15.87 2 12 2Z"
              fill="url(#goldGradient)"
              stroke="#996e1b"
              strokeWidth="0.75"
            />
            {/* Inner Ring Pin Center */}
            <circle cx="12" cy="9" r="3.5" fill="#ffffff" />
            <circle cx="12" cy="9" r="2" fill="#0d3b24" />
            {/* Ripple base indicator */}
            <ellipse cx="12" cy="22" rx="4" ry="1.2" fill="#0d3b24" opacity="0.3" />

            <defs>
              <linearGradient id="goldGradient" x1="5" y1="2" x2="19" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#eab308" />
                <stop offset="0.5" stopColor="#ca8a04" />
                <stop offset="1" stopColor="#a16207" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {showTagline && (
        <div className="flex items-center gap-1.5 mt-0.5 w-full">
          <div className="h-px flex-1 bg-linear-to-r from-transparent to-[#ca8a04]/60" />
          <span
            className={`text-[9.5px] sm:text-[10px] font-semibold tracking-wider whitespace-nowrap ${
              dark ? "text-neutral-300" : "text-neutral-800"
            }`}
          >
            Apni Zameen, Apne Sapno Ke Liye
          </span>
          <div className="h-px flex-1 bg-linear-to-l from-transparent to-[#ca8a04]/60" />
        </div>
      )}
    </Link>
  );
}
