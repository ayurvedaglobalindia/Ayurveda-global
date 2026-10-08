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
    <section id="all-products" className="py-16 sm:py-20 bg-[#FAF7F2]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF4F0] border border-[#2D4A3E]/20 text-[#2D4A3E] text-xs font-mono uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#9E8047]" />
            100% Authentic Classical Pharmacopeia
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1D1F] tracking-tight mb-3">
            Explore All Formulations
          </h2>
          <p className="text-sm sm:text-base text-[#737373] leading-relaxed">
            Laboratory purity-certified Ayurvedic remedies crafted with standardized herbal extracts, zero synthetic additives, and discrete doorstep fulfillment.
          </p>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10">
          {filterTabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? "bg-[#2D4A3E] text-white shadow-md scale-102"
                    : "bg-white text-[#737373] border border-gray-200 hover:border-[#9E8047]/40 hover:text-[#1C1D1F]"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-[#737373]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
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
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1C1D1F] hover:bg-[#2D4A3E] text-white text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <span>Open Advanced Catalog &amp; Filters</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-xs text-[#737373] font-mono mt-3">
            All formulations backed by our 7-Day Authenticity Guarantee • Cash on Delivery &amp; WhatsApp Checkout
          </p>
        </div>
      </div>
    </section>
  );
}
