import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf } from "lucide-react";
import { categories } from "@/lib/products/registry";

export function CategoryShowcase() {
  const categoryHighlights = [
    {
      category: categories[0] || {
        id: "supplements",
        name: "Herbal Supplements",
        slug: "supplements",
      },
      tagline: "Cellular Energy, Muscle Stamina & Tissue Vitality",
      image: "/images/categories/supplements.webp",
      badge: "Rasayana Extracts",
      herbs: "Ashwagandha • Shilajit • Safed Musli",
    },
    {
      category: categories[1] || {
        id: "personal-care",
        name: "Personal Care & Vitality",
        slug: "personal-care",
      },
      tagline: "Topical Endurance, Scalp Nourishment & Pure Oils",
      image: "/images/categories/personal-care.webp",
      badge: "Targeted Formulations",
      herbs: "Bhringraj • Aloe Vera • Vitamin E",
    },
    {
      category: categories[2] || {
        id: "wellness",
        name: "Power Combos & Regrowth Kits",
        slug: "wellness",
      },
      tagline: "Inside-Out Synergy for Maximum Clinical Efficacy",
      image: "/images/categories/wellness.webp",
      badge: "Dual Regimen Kits",
      herbs: "Complete Dual-Action Therapy",
    },
  ];

  return (
    <section className="py-5 sm:py-10 lg:py-14 bg-white border-b border-[#9E8047]/20 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 sm:mb-10 gap-3 sm:gap-4 pb-3 sm:pb-0 border-b sm:border-b-0 border-[#9E8047]/15">
          <div>
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              <span className="w-4 sm:w-5 h-px bg-[#9E8047]" />
              <span className="text-[10px] sm:text-[10.5px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8C703D]">
                Curated Therapeutic Regimens
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl text-[#1C1D1F] tracking-tight">
              Shop By <span className="italic font-normal text-[#8C703D]">Formulation Category</span>
            </h2>
            <p className="text-[11.5px] sm:text-sm text-[#737373] mt-1 max-w-xl">
              Targeted Ayurvedic protocols tailored for cellular stamina, intimate wellness, and complete restorative hair therapy.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-wider text-[#1F3D2B] hover:text-[#8C703D] transition-colors pb-0.5 border-b border-[#1F3D2B]/30 hover:border-[#8C703D] flex-shrink-0"
          >
            <span>Browse All Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Categories: Horizontal Swipe Carousel on Mobile, 3-Col Grid on Desktop */}
        <div
          className="whitespace-nowrap overflow-x-auto no-scrollbar md:grid md:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8 -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 sm:pb-0"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {categoryHighlights.map((item, idx) => (
            <Link
              key={idx}
              href={`/shop?category=${item.category.slug}`}
              className="inline-block md:flex align-top whitespace-normal w-[78vw] sm:w-auto shrink-0 group relative rounded-2xl overflow-hidden border border-[#9E8047]/25 bg-[#FAF7F2] flex-col justify-between hover:shadow-md hover:border-[#1F3D2B]/50 transition-all duration-300 mr-3.5 sm:mr-0 last:mr-0"
            >
              {/* Photo Stage */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] overflow-hidden bg-white/70 border-b border-[#9E8047]/20">
                <Image
                  src={item.image}
                  alt={item.category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 80vw, 380px"
                />
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10">
                  <span className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/95 backdrop-blur-xs text-[9.5px] sm:text-[10px] font-mono tracking-wider uppercase text-[#1F3D2B] border border-[#9E8047]/30 shadow-2xs">
                    {item.badge}
                  </span>
                </div>
              </div>

              {/* Text Stage */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
                <div className="space-y-1 sm:space-y-1.5">
                  <h3 className="font-heading text-lg sm:text-2xl text-[#1C1D1F] group-hover:text-[#9E8047] transition-colors leading-snug">
                    {item.category.name}
                  </h3>
                  <p className="text-[11.5px] sm:text-xs text-[#555555] leading-relaxed line-clamp-2">
                    {item.tagline}
                  </p>
                </div>

                <div className="pt-2.5 sm:pt-3 border-t border-[#9E8047]/15 flex items-center justify-between text-xs text-[#4E5F52]">
                  <span className="font-mono text-[10.5px] sm:text-[11px] truncate max-w-[170px] sm:max-w-[200px]">
                    {item.herbs}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold group-hover:translate-x-1 transition-transform flex-shrink-0 text-[#1F3D2B] text-xs">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
