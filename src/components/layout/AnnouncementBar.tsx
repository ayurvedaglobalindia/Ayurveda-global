"use client";

import React from "react";

export function AnnouncementBar() {
  const marqueeItems = [
    "Free Express Delivery across India",
    "100% Discreet Packaging",
    "Extra 5% Off on Prepaid / Partial COD",
    "AYUSH & GMP Certified Formulations",
    "Free Doctor Consultation on WhatsApp",
  ];

  return (
    <div className="w-full bg-[#192D21] text-[#FAF7F2] overflow-hidden border-b border-[#9E8047]/20 py-1.5 sm:py-2 select-none relative z-50">
      <div className="flex w-max animate-marquee items-center gap-6 text-[10.5px] sm:text-xs font-sans tracking-wide">
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 shrink-0">
            <span className="text-[#D4AF37] text-xs">✦</span>
            <span className="font-medium">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
