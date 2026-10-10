"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Zap,
  Flame,
  Sparkles,
  Wind,
  Activity,
  HeartPulse,
} from "lucide-react";

interface ConcernCategory {
  id: string;
  name: string;
  subtext: string;
  icon: React.ElementType;
  image: string;
  slug: string;
}

const HEALTH_CONCERNS: ConcernCategory[] = [
  {
    id: "stamina",
    name: "Stamina & Energy",
    subtext: "Ojas & Bala",
    icon: Zap,
    image: "/images/products/body-essential-nutrition-thumb.jpg",
    slug: "supplements",
  },
  {
    id: "endurance",
    name: "Endurance & Delay",
    subtext: "Vajikara Chikitsa",
    icon: Flame,
    image: "/images/products/staymax-delay-spray-thumb.jpg",
    slug: "personal-care",
  },
  {
    id: "hair",
    name: "Hair Re-Grow",
    subtext: "Keshya Rasayana",
    icon: Sparkles,
    image: "/images/products/hair-regrow-kit-thumb.jpg",
    slug: "wellness",
  },
  {
    id: "gut",
    name: "Gut & Digestion",
    subtext: "Deepana Pachana",
    icon: Wind,
    image: "/images/products/ashwagandha-root-extract-thumb.jpg",
    slug: "supplements",
  },
  {
    id: "diabetes",
    name: "Diabetic Care",
    subtext: "Madhumeha Shanti",
    icon: Activity,
    image: "/images/products/himalayan-shilajit-resin-thumb.jpg",
    slug: "wellness",
  },
  {
    id: "joints",
    name: "Joint Relief",
    subtext: "Sandhi Shoola",
    icon: HeartPulse,
    image: "/images/botanicals/turmeric.webp",
    slug: "personal-care",
  },
];

export function ConcernsScroller() {
  return (
    <section className="bg-white py-3 sm:py-5 border-b border-[#0E3924]/10 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 mb-2.5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[9.5px] font-sans font-bold uppercase tracking-[0.22em] text-[#D4AF37] block">
              Ayuvya Trend • Targeted Ayurvedic Care
            </span>
            <h3 className="font-editorial text-lg sm:text-2xl text-[#071A12] font-normal leading-tight">
              Shop By <span className="italic text-[#0E3924] font-medium">Health Concern</span>
            </h3>
          </div>
          <Link
            href="/shop"
            className="text-[11px] sm:text-xs font-semibold text-[#0E3924] hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1"
          >
            <span>View All</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>

      {/* Horizontal Inertia Scroller Container strictly formatted */}
      <div
        className="no-scrollbar"
        style={{
          display: "flex",
          gap: "14px",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          padding: "0 16px",
        }}
      >
        {HEALTH_CONCERNS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.35,
                delay: idx * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileTap={{ scale: 0.94 }}
              style={{
                flexShrink: 0,
                scrollSnapAlign: "center",
              }}
            >
              <Link
                href={`/shop?category=${item.slug}`}
                className="flex flex-col items-center group text-center w-[74px] sm:w-[84px]"
              >
                {/* Circular herbal tray (64px x 64px) with animated gold-gradient border ring on hover/tap */}
                <div className="relative w-[64px] h-[64px] rounded-full p-[2px] bg-gradient-to-tr from-[#D4AF37] via-[#10B981] to-[#D4AF37] shadow-sm group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] group-active:scale-95 transition-all duration-300">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-[#FAF7F2] border border-white flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      sizes="64px"
                    />

                    {/* Gradient Depth Tint */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071A12]/45 via-transparent to-transparent pointer-events-none" />

                    {/* Subtle Micro Icon Pill */}
                    <div className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-[#071A12] text-[#D4AF37] flex items-center justify-center border border-white/80 shadow-2xs">
                      <Icon className="w-2 h-2 text-[#D4AF37]" />
                    </div>
                  </div>
                </div>

                {/* Bottom Label: 11px font-semibold with Dual-Line Subtext */}
                <div className="mt-1.5 text-center w-full">
                  <span className="text-[11px] font-semibold text-[#071A12] group-hover:text-[#0E3924] transition-colors leading-tight block truncate">
                    {item.name}
                  </span>
                  <span className="text-[8.5px] font-sans font-medium text-[#0E3924]/75 leading-tight block truncate mt-0.5">
                    {item.subtext}
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
