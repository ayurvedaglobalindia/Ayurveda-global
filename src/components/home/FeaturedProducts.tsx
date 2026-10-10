"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ProductCard } from "../product/ProductCard";
import { products } from "@/lib/products/registry";
import { ArrowUpRight, Leaf, Sparkles, ShieldCheck } from "lucide-react";

export function FeaturedProducts() {
  return (
    <section className="bg-white py-8 sm:py-14 lg:py-20 border-b border-[#D4AF37]/20 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-10 gap-3 sm:gap-4 pb-3 sm:pb-5 border-b border-[#D4AF37]/15">
          <div className="max-w-2xl">
            {/* Clean E-commerce Eyebrow */}
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              <span className="w-5 h-px bg-[#D4AF37]" />
              <span className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#D4AF37] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                Standardized Botanical Formulations
              </span>
            </div>

            {/* Editorial Best Sellers Title */}
            <h2 className="font-editorial text-2xl sm:text-4xl lg:text-[42px] font-normal text-[#081C15] tracking-tight leading-[1.15]">
              The Apothecary{" "}
              <span className="italic font-normal text-gold-shimmer">
                Best Sellers
              </span>
            </h2>

            {/* Clean D2C Description */}
            <p className="font-sans text-[12px] sm:text-[14px] text-[#555555] mt-1 sm:mt-2 leading-relaxed">
              Classical Ayurvedic remedies powered by cold-extracted herbs, third-party verified for bio-potency and zero synthetic adulterants.
            </p>
          </div>

          {/* Shop Link */}
          <div className="shrink-0 pt-0.5 sm:pt-0">
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#1B4332] hover:text-[#D4AF37] transition-colors pb-0.5 border-b border-[#1B4332]/30 hover:border-[#D4AF37]"
            >
              <span>Explore All Formulations</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bento Grid with Uniform Height Alignment */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6 px-0 items-stretch"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    damping: 24,
                    stiffness: 240,
                  },
                },
              }}
              className="h-full"
            >
              <ProductCard product={product} variant="default" />
            </motion.div>
          ))}
        </motion.div>

        {/* Natural Botanical Aesthetic Editorial Banner */}
        <div className="mt-8 sm:mt-14 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D4AF37]/35 bg-[#081C15] text-white relative shadow-2xl">
          <div className="relative w-full aspect-[16/9] sm:aspect-[24/7] min-h-[180px] sm:min-h-[240px]">
            <Image
              src="/images/campaigns/ayurveda-botanical-banner.webp"
              alt="Natural Ayurvedic Botanical Extracts and Handcrafted Formulations"
              fill
              className="object-cover opacity-80 hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#081C15]/95 via-[#081C15]/75 to-transparent flex items-center p-5 sm:p-8 lg:p-12">
              <div className="max-w-lg space-y-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[9.5px] sm:text-[10.5px] font-sans font-bold tracking-widest uppercase text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm">
                  <Leaf className="w-3 h-3 text-[#10B981]" />
                  <span>100% PURE HARVEST</span>
                </span>
                <h3 className="font-editorial text-xl sm:text-3xl lg:text-4xl font-normal text-white leading-tight">
                  Hand-Harvested{" "}
                  <span className="italic text-gold-shimmer">
                    Himalayan Botanicals
                  </span>
                </h3>
                <p className="text-[12px] sm:text-xs text-[#FDFBF7]/85 line-clamp-2 leading-relaxed">
                  Wild-sourced Ashwagandha, gold-grade Shilajit resin, and cold-pressed taila oils. No synthetic adulterants.
                </p>
                <div className="pt-1.5">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#D4AF37] hover:bg-[#E5C358] active:scale-95 text-[#081C15] text-xs font-sans font-bold uppercase tracking-wider transition-all shadow-md"
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
