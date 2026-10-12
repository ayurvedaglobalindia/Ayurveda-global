"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { products, categories } from "@/lib/products/registry";
import { Sparkles, ArrowRight, ShieldCheck, Filter } from "lucide-react";
import type { Product } from "@/types";

export function HomeAllProducts() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filterTabs = [
    { id: "all", label: "All Formulations", count: products.length },
    {
      id: "supplements",
      label: "Herbal Supplements",
      count: products.filter((p) => p.category === "supplements").length,
    },
    {
      id: "personal-care",
      label: "Personal Care & Vitality",
      count: products.filter((p) => p.category === "personal-care").length,
    },
    {
      id: "wellness",
      label: "Combos & Regrowth Kits",
      count: products.filter((p) => p.category === "wellness").length,
    },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section id="all-products" className="py-12 sm:py-20 bg-[#FAF7F2] border-t border-[#D4AF37]/20 relative">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E3924]/8 border border-[#0E3924]/20 text-[#0E3924] text-xs font-sans uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-semibold text-[11px]">100% Authentic Classical Pharmacopeia</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#071A12] font-normal tracking-tight mb-2.5">
            Complete Ayurvedic{" "}
            <span className="italic text-[#8C703D]">Formulations</span>
          </h2>
          <p className="font-editorial text-xs sm:text-sm text-[#555555] leading-relaxed max-w-xl mx-auto">
            Laboratory purity-certified remedies crafted with standardized herbal extracts, zero synthetic adulterants, and discrete doorstep fulfillment across India.
          </p>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap mb-8 sm:mb-10">
          {filterTabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-sans tracking-wide transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-[#0E3924] text-white shadow-sm font-semibold scale-102"
                    : "bg-white text-[#555555] border border-[#0E3924]/15 hover:border-[#0E3924]/35 hover:text-[#071A12] font-medium"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[#0E3924]/6 text-[#0E3924]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Products Grid: 2-column on mobile, 3-column on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8 items-stretch px-2 sm:px-0">
          {filteredProducts.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} variant="default" />
            </div>
          ))}
        </div>

        {/* Bottom Trust & Shop Link */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#0E3924] hover:bg-[#071A12] text-white text-xs sm:text-sm font-sans font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <span>Open Advanced Catalog &amp; Filters</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
          </Link>
          <p className="text-[11px] sm:text-xs text-[#737373] font-editorial mt-3">
            All formulations backed by our 7-Day Authenticity Guarantee • Cash on Delivery &amp; WhatsApp Checkout
          </p>
        </div>
      </div>
    </section>
  );
}
