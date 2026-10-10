"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Shield, Heart, Zap, Flame, Wind, Droplets } from "lucide-react";

const HEALTH_CONCERNS = [
  {
    id: "vitality",
    name: "Stamina",
    sanskrit: "Ojas & Bala",
    icon: Zap,
    image: "/images/products/body-essential-nutrition-thumb.jpg",
    slug: "supplements",
  },
  {
    id: "intimacy",
    name: "Endurance",
    sanskrit: "Vajikarana",
    icon: Flame,
    image: "/images/products/staymax-delay-spray-thumb.jpg",
    slug: "personal-care",
  },
  {
    id: "hair",
    name: "Hair Care",
    sanskrit: "Keshya Rasayana",
    icon: Sparkles,
    image: "/images/products/hair-regrow-kit-thumb.jpg",
    slug: "wellness",
  },
  {
    id: "gut",
    name: "Gut Health",
    sanskrit: "Deepana Pachana",
    icon: Wind,
    image: "/images/products/ashwagandha-root-extract-thumb.jpg",
    slug: "supplements",
  },
  {
    id: "longevity",
    name: "Longevity",
    sanskrit: "Rasayana",
    icon: Droplets,
    image: "/images/products/himalayan-shilajit-resin-thumb.jpg",
    slug: "wellness",
  },
];

export function ConcernsScroller() {
  return (
    <section className="bg-white py-5 sm:py-8 border-b border-[#9E8047]/15 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 mb-3.5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#8C703D] block">
              Curated Therapies
            </span>
            <h3 className="font-heading text-lg sm:text-2xl text-[#1C1D1F]">
              Shop By <span className="italic text-[#8C703D]">Health Concern</span>
            </h3>
          </div>
          <Link
            href="/shop"
            className="text-[11px] sm:text-xs font-semibold text-[#1F3D2B] hover:text-[#8C703D] transition-colors"
          >
            View All &rarr;
          </Link>
        </div>
      </div>

      {/* Luxury Horizontal Circular Category Scroller */}
      <div
        className="no-scrollbar scroll-smooth"
        style={{
          display: "flex",
          gap: "14px",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          padding: "0 16px",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {HEALTH_CONCERNS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              whileTap={{ scale: 0.94 }}
              whileHover={{ scale: 1.05 }}
              style={{
                flexShrink: 0,
                scrollSnapAlign: "center",
              }}
            >
              <Link
                href={`/shop?category=${item.slug}`}
                className="flex flex-col items-center group text-center w-[74px] sm:w-[84px]"
              >
                {/* Circular Avatar Container: 64px x 64px with emerald-gold gradient border & soft botanical icon */}
                <div className="relative w-[64px] h-[64px] rounded-full p-[2px] bg-gradient-to-tr from-[#9E8047] via-[#D4AF37] to-[#1F3D2B] shadow-sm group-hover:shadow-md transition-all">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-[#FAF7F2] border-2 border-white flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="64px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#192D21] text-white flex items-center justify-center border border-white shadow-2xs">
                      <Icon className="w-2.5 h-2.5 text-[#D4AF37]" />
                    </div>
                  </div>
                </div>

                {/* Category Title below in 11px font-semibold */}
                <span className="text-[11px] font-semibold text-[#1C1D1F] group-hover:text-[#8C703D] transition-colors mt-2 leading-tight whitespace-nowrap block">
                  {item.name}
                </span>
                <span className="text-[8.5px] font-mono text-[#737373] italic truncate max-w-[70px]">
                  {item.sanskrit}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
