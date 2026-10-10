"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "../product/ProductCard";
import { products } from "@/lib/products/registry";
import { ArrowUpRight, Leaf } from "lucide-react";

export function FeaturedProducts() {
  return (
    <section className="bg-white py-8 sm:py-14 lg:py-20 border-b border-[#9E8047]/20 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-10 gap-3 sm:gap-4 pb-3 sm:pb-5 border-b border-[#9E8047]/15">
          <div className="max-w-2xl">
            {/* Clean E-commerce Eyebrow */}
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              <span className="w-4 sm:w-5 h-px bg-[#9E8047]" />
              <span className="text-[10px] sm:text-[10.5px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8C703D]">
                Standardized Botanical Formulations
              </span>
            </div>

            {/* Standard Best Sellers Title */}
            <h2 className="font-heading text-2xl sm:text-4xl lg:text-[40px] font-normal text-[#1C1D1F] tracking-tight leading-[1.15]">
              The Apothecary <span className="italic font-normal text-[#8C703D]">Best Sellers</span>
            </h2>

            {/* Clean D2C Description */}
            <p className="font-sans text-[11.5px] sm:text-[14px] text-[#666666] mt-1 sm:mt-2 leading-relaxed">
              Classical Ayurvedic remedies powered by cold-extracted herbs, third-party verified for bio-potency and zero synthetic adulterants.
            </p>
          </div>

          {/* Shop Link */}
          <div className="shrink-0 pt-0.5 sm:pt-0">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-wider text-[#1F3D2B] hover:text-[#8C703D] transition-colors pb-0.5 border-b border-[#1F3D2B]/30 hover:border-[#8C703D]"
            >
              <span>Explore All Categories</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* All Products Display Grid (Mobile 2x2 with strict 2-col alignment, Tablet 3-col, Desktop 4-col) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6 px-0 sm:px-0 items-stretch">
          {products.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} variant="default" />
            </div>
          ))}
        </div>

        {/* Natural Botanical Aesthetic Banner Generated with Antigravity CLI */}
        <div className="mt-8 sm:mt-12 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#9E8047]/30 bg-[#1C1D1F] text-white relative shadow-lg">
          <div className="relative w-full aspect-[16/9] sm:aspect-[24/7] min-h-[170px] sm:min-h-[220px]">
            <Image
              src="/images/campaigns/ayurveda-botanical-banner.webp"
              alt="Natural Ayurvedic Botanical Extracts and Handcrafted Formulations"
              fill
              className="object-cover opacity-85 hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#192D21]/92 via-[#192D21]/65 to-transparent flex items-center p-5 sm:p-8 lg:p-10">
              <div className="max-w-md space-y-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-xs text-[9.5px] sm:text-[10px] font-sans font-semibold tracking-widest uppercase text-[#D4AF37] border border-[#D4AF37]/30">
                  <Leaf className="w-3 h-3 text-[#D4AF37]" />
                  <span>100% PURE HARVEST</span>
                </span>
                <h3 className="font-heading text-lg sm:text-2xl lg:text-3xl font-normal text-[#FAF7F2] leading-tight">
                  Hand-Harvested <span className="italic text-[#D4AF37]">Himalayan Botanicals</span>
                </h3>
                <p className="text-[11px] sm:text-xs text-[#FAF7F2]/80 line-clamp-2 leading-relaxed">
                  Wild-sourced Ashwagandha, gold-grade Shilajit resin, and cold-pressed taila oils. No synthetic adulterants.
                </p>
                <div className="pt-1">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-white text-[#192D21] hover:bg-[#FAF7F2] text-xs font-semibold uppercase tracking-wider transition-all shadow-xs"
                  >
                    <span>EXPLORE FORMULATIONS</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
