import React from "react";
import { Leaf, ShieldCheck, Truck, Package, HeartPulse } from "lucide-react";

export function HomeTrustBar() {
  const pillars = [
    {
      icon: Leaf,
      title: "100% Pure Ayurvedic",
      desc: "Standardized botanicals, zero steroids or chemicals",
    },
    {
      icon: ShieldCheck,
      title: "AYUSH & GMP Certified",
      desc: "Formulated in clinical labs under strict purity norms",
    },
    {
      icon: Package,
      title: "100% Discreet Packaging",
      desc: "Shipped in plain unmarked tamper-proof boxes",
    },
    {
      icon: Truck,
      title: "Express Delivery & COD",
      desc: "Cash on delivery & free shipping above ₹999",
    },
  ];

  return (
    <section className="bg-white border-y border-[#9E8047]/20 py-6 sm:py-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3 sm:gap-4 p-2 sm:p-0"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#EFF4F0] border border-[#2D4A3E]/15 flex items-center justify-center flex-shrink-0 text-[#2D4A3E]">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-sm sm:text-base font-semibold text-[#1C1D1F]">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#737373] mt-0.5 leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
