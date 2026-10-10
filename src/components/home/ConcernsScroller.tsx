"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  Flame,
  Wind,
  Droplets,
  Heart,
  Shield,
  Activity,
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
    name: "Stamina",
    subtext: "Ojas & Bala",
    icon: Zap,
    image: "/images/products/body-essential-nutrition-thumb.jpg",
    slug: "supplements",
  },
  {
    id: "vitality",
    name: "Vitality",
    subtext: "Vajikara Potency",
    icon: Flame,
    image: "/images/products/staymax-delay-spray-thumb.jpg",
    slug: "personal-care",
  },
  {
    id: "hair",
    name: "Hair Fall",
    subtext: "Keshya Rasayana",
    icon: Sparkles,
    image: "/images/products/hair-regrow-kit-thumb.jpg",
    slug: "wellness",
  },
  {
    id: "immunity",
    name: "Immunity",
    subtext: "Pure Rasayana",
    icon: Shield,
    image: "/images/products/himalayan-shilajit-resin-thumb.jpg",
    slug: "wellness",
  },
  {
    id: "digestion",
    name: "Digestion",
    subtext: "Agni & Pachana",
    icon: Wind,
    image: "/images/products/ashwagandha-root-extract-thumb.jpg",
    slug: "supplements",
  },
  {
    id: "stress",
    name: "Stress Relief",
    subtext: "Manas Shanti",
    icon: Heart,
    image: "/images/botanicals/ashwagandha.webp",
    slug: "supplements",
  },
  {
    id: "skin",
    name: "Skin Glow",
    subtext: "Varnya Radiance",
    icon: Droplets,
    image: "/images/botanicals/amla.webp",
    slug: "wellness",
  },
];

export function ConcernsScroller() {
  return (
    <section className="bg-white py-5 sm:py-8 border-b border-[#D4AF37]/20 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 mb-3.5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#D4AF37] block">
              Instagram Story Highlights
            </span>
            <h3 className="font-editorial text-xl sm:text-2xl text-[#081C15] font-normal">
              Shop By <span className="italic text-[#1B4332] font-medium">Health Concern</span>
            </h3>
          </div>
          <Link
            href="/shop"
            className="text-[11px] sm:text-xs font-semibold text-[#1B4332] hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1"
          >
            <span>Explore All</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>

      {/* Story-Highlights Circular Category Scroller with inertia physics */}
      <div
        className="no-scrollbar scroll-smooth flex gap-3.5 sm:gap-5 overflow-x-auto px-4 sm:px-8 py-2"
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {HEALTH_CONCERNS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: idx * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileTap={{ scale: 0.94 }}
              className="flex-shrink-0 snap-center"
            >
              <Link
                href={`/shop?category=${item.slug}`}
                className="flex flex-col items-center group text-center w-[78px] sm:w-[90px]"
              >
                {/* Outer Breathing Metallic Gold/Emerald Ring */}
                <div className="relative w-[66px] h-[66px] sm:w-[74px] sm:h-[74px] rounded-full p-[2.5px] bg-gradient-to-tr from-[#D4AF37] via-[#10B981] to-[#D4AF37] shadow-[0_4px_14px_rgba(16,185,129,0.25)] group-hover:shadow-[0_6px_20px_rgba(212,175,55,0.45)] transition-all duration-300">
                  {/* Inner White Container */}
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-[#FAF7F2] border-2 border-white flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-115 transition-transform duration-500 ease-out"
                      sizes="74px"
                    />

                    {/* Gradient Depth Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081C15]/50 via-transparent to-transparent pointer-events-none" />

                    {/* Floating Botanical Vector Micro Badge */}
                    <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#081C15] text-[#D4AF37] flex items-center justify-center border border-white/80 shadow-md">
                      <Icon className="w-2.5 h-2.5 text-[#D4AF37]" />
                    </div>
                  </div>
                </div>

                {/* Bottom Label: 11px font-semibold with Dual-Line Subtext */}
                <div className="mt-2 text-center w-full">
                  <span className="text-[11px] sm:text-xs font-semibold text-[#081C15] group-hover:text-[#1B4332] transition-colors leading-tight block truncate">
                    {item.name}
                  </span>
                  <span className="text-[9px] font-sans font-medium text-[#1B4332]/80 leading-tight block truncate mt-0.5">
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
