"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "../product/ProductCard";
import { products } from "@/lib/products/registry";
import { ArrowUpRight, Leaf, Sparkles, ShieldCheck } from "lucide-react";

export function FeaturedProducts() {
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
    <section id="explore-formulations" className="bg-white py-6 sm:py-10 lg:py-16 border-b border-[#D4AF37]/20 relative overflow-hidden">
      <div className="container mx-auto px-0 sm:px-4 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-8 gap-2.5 sm:gap-4 pb-3 sm:pb-4 border-b border-[#D4AF37]/20 px-3.5 sm:px-0">
          <div className="max-w-2xl">
            {/* Clean E-commerce Eyebrow */}
            <div className="flex items-center gap-2 mb-1 sm:mb-1.5">
              <span className="w-4 sm:w-5 h-px bg-[#D4AF37]" />
              <span className="text-[10px] sm:text-[11px] font-editorial font-semibold uppercase tracking-[0.2em] text-[#0E3924] flex items-center gap-1.5">
                Standardized Botanical Pharmacopeia
              </span>
            </div>

            {/* Editorial Title: Explore All Formulations */}
            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-[38px] font-normal text-[#071A12] tracking-tight leading-[1.18]">
              Explore All{" "}
              <span className="italic font-normal text-[#8C703D]">
                Formulations
              </span>
            </h2>

            {/* Clean D2C Description */}
            <p className="font-editorial text-[12px] sm:text-[13.5px] text-[#555555] mt-1 sm:mt-1.5 leading-relaxed">
              Classical Ayurvedic remedies powered by standardized cold extracts, third-party verified for bio-potency and zero synthetic adulterants.
            </p>
          </div>

          {/* Shop Link */}
          <div className="shrink-0 pt-2 sm:pt-0">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-editorial font-bold uppercase tracking-wider text-[#1B4332] hover:text-[#D4AF37] transition-colors pb-0.5 border-b border-[#1B4332]/30 hover:border-[#D4AF37]"
            >
              <span>Catalog &amp; Filters ({products.length})</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Category Filter Tabs Bar */}
        <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar pb-3 sm:pb-4 mb-3 sm:mb-6 px-3.5 sm:px-0">
          {filterTabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-sans tracking-wide transition-all duration-200 shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#0E3924] text-white shadow-xs font-semibold"
                    : "bg-[#FAF7F2] text-[#555555] hover:text-[#071A12] border border-[#0E3924]/15 hover:border-[#0E3924]/30 font-medium"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[9.5px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-black/5 text-[#737373]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bento Grid: 2-column mobile grid, balanced 3-column desktop grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3.5 sm:gap-6 px-3.5 sm:px-0 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="h-full"
              >
                <ProductCard product={product} variant="default" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Natural Botanical Aesthetic Editorial Banner */}
        <div className="mt-8 sm:mt-14 mx-3.5 sm:mx-0 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D4AF37]/35 bg-[#081C15] text-white relative shadow-2xl">
          <div className="relative w-full min-h-[300px] sm:min-h-[260px] md:min-h-[240px] flex items-center py-6 px-4 sm:p-8 lg:p-12">
            <Image
              src="/images/campaigns/ayurveda-botanical-banner.webp"
              alt="Natural Ayurvedic Botanical Extracts and Handcrafted Formulations"
              fill
              className="object-cover object-center opacity-75 hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            {/* Gradient Overlays: Ensure text is crisp and readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#081C15]/95 via-[#081C15]/80 to-[#081C15]/40 pointer-events-none" />

            <div className="relative z-10 max-w-lg space-y-2.5 sm:space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[9.5px] sm:text-[10.5px] font-editorial font-bold tracking-widest uppercase text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm">
                <Leaf className="w-3 h-3 text-[#10B981]" />
                <span>100% PURE HARVEST</span>
              </span>
              <h3 className="font-editorial text-xl sm:text-3xl lg:text-4xl font-normal text-white leading-tight">
                Hand-Harvested{" "}
                <span className="italic text-[#D4AF37]">
                  Himalayan Botanicals
                </span>
              </h3>
              <p className="text-[12px] sm:text-sm text-[#FDFBF7]/90 max-w-md leading-relaxed font-editorial">
                Wild-sourced Ashwagandha, gold-grade Himalayan Shilajit, and cold-pressed medicinal taila oils. Zero synthetic adulterants.
              </p>
              <div className="pt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#D4AF37] hover:bg-[#E5C358] active:scale-95 text-[#081C15] text-xs font-editorial font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  <span>EXPLORE FORMULATIONS</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
