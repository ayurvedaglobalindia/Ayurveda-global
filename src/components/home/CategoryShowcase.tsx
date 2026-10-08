import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { categories } from "@/lib/products/registry";

export function CategoryShowcase() {
  const categoryHighlights = [
    {
      category: categories[0] || {
        id: "supplements",
        name: "Herbal Supplements",
        slug: "supplements",
      },
      tagline: "Cellular Energy & Tissue Strength",
      image: "/images/products/body-essential-nutrition-card.jpg",
      badge: "Flagship Stamina",
    },
    {
      category: categories[1] || {
        id: "personal-care",
        name: "Personal Care & Vitality",
        slug: "personal-care",
      },
      tagline: "Topical Endurance & Natural Confidence",
      image: "/images/products/staymax-delay-spray-card.jpg",
      badge: "Targeted Care",
    },
    {
      category: categories[2] || {
        id: "wellness",
        name: "Power Combos & Regrowth Kits",
        slug: "wellness",
      },
      tagline: "Inside-Out Synergy for Maximum Efficacy",
      image: "/images/products/vitality-power-combo-card.jpg",
      badge: "Synergistic Regimen",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#9E8047] block mb-2">
              Curated Apothecary Collections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1D1F] tracking-tight">
              Targeted Therapeutic Categories
            </h2>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2D4A3E] hover:underline"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {categoryHighlights.map((item, idx) => (
            <Link
              key={idx}
              href={`/categories/${item.category.slug}`}
              className="group relative rounded-2xl overflow-hidden border border-[#9E8047]/20 bg-[#FAF7F2] p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300"
            >
              <div>
                <span className="inline-block px-2.5 py-1 rounded-full bg-white text-[10px] font-mono tracking-wider uppercase text-[#2D4A3E] border border-gray-200 mb-3 shadow-2xs">
                  {item.badge}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#1C1D1F] group-hover:text-[#2D4A3E] transition-colors mb-1">
                  {item.category.name}
                </h3>
                <p className="text-xs text-[#737373] leading-relaxed mb-6">
                  {item.tagline}
                </p>
              </div>

              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white/70 p-4 mb-4 border border-gray-100 flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.category.name}
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-[#2D4A3E] pt-2 border-t border-gray-200/60">
                <span>Explore Formulations</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
