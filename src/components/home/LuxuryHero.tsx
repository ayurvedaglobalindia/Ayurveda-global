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
                className="px-5 py-2.5 bg-[#2D4A3E] hover:bg-[#1F332A] text-white font-sans font-medium text-xs tracking-wide transition-colors rounded-sm text-center shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-300"
              >
                Shop Now
              </Link>
              <Link
                href="/consultation"
                className="px-5 py-2.5 bg-transparent border border-[#2D4A3E] text-[#2D4A3E] hover:bg-[#2D4A3E] hover:text-white font-sans font-medium text-xs tracking-wide transition-colors rounded-sm text-center hover:shadow-lg hover:-translate-y-0.5 transform duration-300"
              >
                Consult an Expert
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Product Showcase */}
          <div className="relative flex justify-center items-center lg:justify-end mt-8 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
              className="relative w-full max-w-[280px] aspect-[4/5] bg-white rounded-sm border border-[#9E8047]/30 shadow-[0_15px_40px_rgba(45,74,62,0.15)] p-6 flex items-center justify-center group overflow-hidden"
            >
              {/* Animated Glow Behind Image */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(158,128,71,0.15)_0%,transparent_70%)]"
              />
              {/* Decorative circle */}
              <div className="absolute top-6 right-6 w-20 h-20 bg-[#E8ECE9] rounded-full mix-blend-multiply opacity-50 blur-lg transition-transform duration-700 group-hover:scale-150 group-hover:opacity-70" />

              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full"
              >
                <Image
                  src="/images/products/vitality-power-combo-card.jpg"
                  alt="Ayurveda Global Products"
                  fill
                  priority
                  className="object-contain p-4 drop-shadow-xl scale-110 group-hover:scale-125 transition-transform duration-700 ease-out"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
