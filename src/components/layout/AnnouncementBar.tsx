"use client";

import React from "react";

export function AnnouncementBar() {
  const marqueeItems = [
    "✨ 100% NABL Lab Certified & AYUSH Approved",
    "🌿 Free Doctor Consultation on WhatsApp",
    "🚚 Free Express Delivery across India",
    "💎 Extra 5% Off on Prepaid / Instant UPI",
    "🔒 100% Discreet Tamper-Evident Packaging",
  ];

  return (
    <div className="w-full bg-[#071A12] text-[#FDFBF7] overflow-hidden border-b border-[#D4AF37]/25 py-1.5 select-none relative z-50">
      <div className="flex w-max animate-marquee items-center gap-8 text-[10.5px] sm:text-xs font-sans tracking-wide">
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 shrink-0">
            <span className="text-[#D4AF37] text-xs font-bold">✦</span>
            <span className="font-medium text-[#FDFBF7]/95">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
