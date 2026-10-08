"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainerVariant, scaleUpVariant } from "@/lib/animations";

export function LuxuryHero() {
  return (
    <section className="relative w-full bg-[#E8ECE9] py-8 lg:py-12 flex items-center overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-8 items-center">
          {/* Left Column */}
          <motion.div 
            variants={staggerContainerVariant}
            initial="hidden"
            animate="visible"
            className="space-y-4 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={fadeUpVariant} className="inline-block px-3 py-1 rounded-full border border-[#2D4A3E]/30 text-[#2D4A3E] text-[10px] sm:text-xs font-sans tracking-widest uppercase">
              Ancient Wisdom for Modern Healing
            </motion.div>

            {/* Heading */}
            <motion.h1 variants={fadeUpVariant} className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#1C1D1F] leading-[1.1] tracking-tight">
              Experience True Ayurvedic Luxury
            </motion.h1>

            {/* Subtext */}
            <motion.p variants={fadeUpVariant} className="text-sm text-[#555555] font-sans font-light max-w-sm mx-auto lg:mx-0 leading-relaxed">
              Pure, authentic & holistic wellness products powered by nature.
              Discover time-tested remedies for a balanced life.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={fadeUpVariant} className="flex flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/shop"
                className="px-5 py-2.5 bg-[var(--color-forest-accent)] hover:bg-[var(--color-charcoal)] text-white font-sans font-medium text-xs tracking-wide transition-colors rounded-sm text-center shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-300"
              >
                Shop Now
              </Link>
              <Link
                href="/consultation"
                className="px-5 py-2.5 bg-transparent border border-[var(--color-forest-accent)] text-[var(--color-forest-accent)] hover:bg-[var(--color-forest-accent)] hover:text-white font-sans font-medium text-xs tracking-wide transition-colors rounded-sm text-center hover:shadow-lg hover:-translate-y-0.5 transform duration-300"
              >
                Consult an Expert
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Product Showcase */}
          <div className="relative flex justify-center items-center lg:justify-end mt-6 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, type: "spring", bounce: 0.3 }}
              className="relative w-full max-w-[320px] sm:max-w-[340px] aspect-[4/5] bg-white/80 backdrop-blur-md rounded-2xl border border-[#9E8047]/30 shadow-[0_20px_50px_rgba(45,74,62,0.18)] p-4 sm:p-6 flex items-center justify-center group overflow-hidden"
            >
              {/* Animated Glow Behind Image */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.65, 0.35] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(158,128,71,0.2)_0%,transparent_70%)]"
              />

              {/* Floating Quality Stamp */}
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-[#1F332A] bg-white/95 border border-[#1F332A]/20 shadow-xs">
                  GMP Certified Purity
                </span>
              </div>

              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <Image
                  src="/images/products/vitality-power-combo-card.jpg"
                  alt="Ayurveda Global Vitality Formulations"
                  fill
                  priority
                  className="object-contain p-3 drop-shadow-xl group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 280px, 340px"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
