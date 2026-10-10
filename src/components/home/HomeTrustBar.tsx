"use client";

import React from "react";
import { Leaf, ShieldCheck, Truck, Package, Award, Users, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface HomeTrustBarProps {
  className?: string;
}

export function HomeTrustBar({ className = "" }: HomeTrustBarProps) {
  const pillars = [
    {
      icon: Leaf,
      title: "100% Pure Classical",
      desc: "Standardized botanical extracts, zero adulterants or steroids",
      metric: "100% Herbal",
    },
    {
      icon: ShieldCheck,
      title: "AYUSH & GMP Certified",
      desc: "Formulated in clinical labs under strict purity guidelines",
      metric: "Govt. Approved",
    },
    {
      icon: Package,
      title: "100% Discreet Packaging",
      desc: "Shipped in plain, unmarked tamper-evident boxes",
      metric: "Private Delivery",
    },
    {
      icon: Truck,
      title: "Express Delivery & COD",
      desc: "Cash on delivery & free shipping across 28,000+ pincodes",
      metric: "Pan-India",
    },
  ];

  return (
    <section className={`bg-[#FAF7F2] border-t border-[#9E8047]/20 py-4 sm:py-8 lg:py-10 overflow-hidden ${className}`}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Editorial Eyebrow */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-5 sm:mb-8 text-center">
          <span className="w-6 sm:w-12 h-px bg-[#9E8047]/30" />
          <span className="text-[9.5px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#8C703D]">
            The Ayur Veda Global Clinical Standard
          </span>
          <span className="w-6 sm:w-12 h-px bg-[#9E8047]/30" />
        </div>

        {/* 4 Trust Pillars Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5 lg:gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="flex flex-col justify-between p-3.5 sm:p-5 bg-white rounded-2xl border border-[#9E8047]/20 shadow-2xs hover:shadow-md hover:border-[#1F3D2B]/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-[#EFF4F0] border border-[#2D4A3E]/15 flex items-center justify-center text-[#1F3D2B] shadow-2xs">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#1F3D2B]" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#8C703D] bg-[#FAF7F2] px-2 py-0.5 rounded-full border border-[#9E8047]/20">
                      {item.metric}
                    </span>
                  </div>
                  <h4 className="font-heading text-xs sm:text-base font-medium text-[#1C1D1F] leading-snug">
                    {item.title}
                  </h4>
                  <p className="font-sans text-[10.5px] sm:text-xs text-[#666666] mt-1 leading-snug sm:leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Clinical Portal Marquee Banner (Inspired by Enterprise Portals) */}
        <div className="mt-6 sm:mt-10 p-3 sm:p-4 rounded-2xl bg-[#192D21] text-white flex flex-wrap items-center justify-around gap-3 text-center sm:text-left border border-[#9E8047]/30 shadow-md">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-[#FAF7F2]">50,000+ Verified Patient Consultations</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-white/20" />
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-[#FAF7F2]">100% NABL Lab Certified Ayurvedic Herbs</span>
          </div>
          <div className="hidden sm:block w-px h-5 bg-white/20" />
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-[#FAF7F2]">Direct Access to Accredited BAMS Doctors</span>
          </div>
        </div>
      </div>
    </section>
  );
}
