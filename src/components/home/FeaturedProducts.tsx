"use client";

import React, { useState, useEffect, useRef } from "react";
import { ProductCard } from "../product/ProductCard";
import { products } from "@/lib/products/registry";
import { motion, useAnimation, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function FeaturedProducts() {
  const [mounted, setMounted] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sliderRef, { once: true, margin: "-100px" });

  useEffect(() => setMounted(true), []);

  const allProducts = products.map((p) => ({ ...p, isNew: true }));

  if (!mounted) return null;

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-transparent py-16 overflow-hidden relative">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1D1F] tracking-tight">
              Apothecary Showcase
            </h2>
            <p className="font-sans text-[#737373] mt-2 max-w-md text-sm">
              Explore our master-crafted Ayurvedic formulations, displayed in our signature gallery.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex gap-3"
          >
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-[#9E8047]/30 flex items-center justify-center text-[#2D4A3E] hover:bg-[#9E8047]/10 transition-colors backdrop-blur-md shadow-sm"
              aria-label="Previous items"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-[#9E8047]/30 flex items-center justify-center text-[#2D4A3E] hover:bg-[#9E8047]/10 transition-colors backdrop-blur-md shadow-sm"
              aria-label="Next items"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* The Showcase Frame */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
          className="relative bg-white/40 backdrop-blur-2xl rounded-[32px] border-2 border-[#9E8047]/20 shadow-[0_20px_60px_-15px_rgba(158,128,71,0.2)] p-4 sm:p-8 overflow-hidden group"
        >
          {/* Inner glass reflection effect */}
          <div className="absolute inset-0 rounded-[32px] border border-white/60 pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-[32px]" />

          {/* Slider Container */}
          <div
            ref={sliderRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 sm:gap-8 pb-8 pt-4 px-4 sm:px-6 hide-scrollbar scroll-smooth relative z-10"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {allProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.8, rotateY: 15 }}
                animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  type: "spring",
                  bounce: 0.4,
                }}
                className="snap-center sm:snap-start shrink-0 w-[85vw] sm:w-[320px] lg:w-[340px] h-full"
                whileHover={{ 
                  y: -15, 
                  scale: 1.02,
                  transition: { type: "spring", bounce: 0.5 }
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
