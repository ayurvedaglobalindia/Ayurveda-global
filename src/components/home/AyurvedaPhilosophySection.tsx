"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Wind, Flame, Droplets, CheckCircle2, ArrowRight, Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BOTANICAL_HERBS = [
  {
    name: "Ashwagandha",
    sanskrit: "Withania somnifera",
    benefit: "Calms Vata, enhances vitality (Ojas), and supports cellular resilience.",
    image: "/images/products/ashwagandha-root-extract-card.jpg",
    tag: "Root Rasayana",
  },
  {
    name: "Himalayan Shilajit",
    sanskrit: "Asphaltum punjabianum",
    benefit: "84+ trace ionic minerals & fulvic acid for ATP cellular energy and endurance.",
    image: "/images/products/himalayan-shilajit-resin-card.jpg",
    tag: "Mineral Pitch",
  },
  {
    name: "BODY Nutrition",
    sanskrit: "Classical Rasayana Synergy",
    benefit: "Pure standardized daily Rasayana for muscle vitality, stamina, and metabolic energy.",
    image: "/images/products/body-essential-nutrition-card.jpg",
    tag: "Vitality Formula",
  },
  {
    name: "Bhringraj & Amla",
    sanskrit: "Keshya Hair Taila",
    benefit: "The 'King of Hair Herbs', deep follicle taila nourishment and scalp balance.",
    image: "/images/products/hair-regrow-oil-card.jpg",
    tag: "Keshya Herb",
  },
  {
    name: "Vajikara Botanicals",
    sanskrit: "Traditional Vitality Blend",
    benefit: "Cardamom, nutmeg, cinnamon, and herbal adaptogens for intimate endurance.",
    image: "/images/products/vajikara-gold-vitality-oil-card.jpg",
    tag: "Herbal Extract",
  },
  {
    name: "HAIR RE-GROW Kit",
    sanskrit: "Sampoorna Kesh Regimen",
    benefit: "Inside-out synergistic botanical capsules & herbal scalp oil for root nourishment.",
    image: "/images/products/hair-regrow-kit-card.jpg",
    tag: "Dual Regimen",
  },
];

export function AyurvedaPhilosophySection() {
  const [activeDosha, setActiveDosha] = useState<"vata" | "pitta" | "kapha">("vata");

  const doshaData = {
    vata: {
      name: "Vata Dosha",
      elements: "Air & Space (Vayu & Akasha)",
      quality: "Governs Movement, Nervous Transmission & Biological Drive",
      imbalance: "Restlessness, fatigue, dry scalp, anxiety & fluctuating stamina.",
      herbalSolution:
        "Calmed by warming, grounding adaptogens like Ashwagandha, Sesame oil & Safed Musli.",
      color: "border-sky-300 bg-sky-50/30",
      icon: Wind,
    },
    pitta: {
      name: "Pitta Dosha",
      elements: "Fire & Water (Agni & Jala)",
      quality: "Governs Digestion, Cellular Metabolism & Internal Heat",
      imbalance: "Premature thinning hair, scalp heat, acidity & metabolic irritation.",
      herbalSolution:
        "Balanced by cooling, rejuvenating botanicals like Bhringraj, Amla, Shatavari & Aloe Vera.",
      color: "border-amber-300 bg-amber-50/30",
      icon: Flame,
    },
    kapha: {
      name: "Kapha Dosha",
      elements: "Earth & Water (Prithvi & Jala)",
      quality: "Governs Physical Structure, Lubrication & Immunity (Ojas)",
      imbalance: "Lethargy, slow metabolism, heavy stagnation & sluggish stamina.",
      herbalSolution:
        "Energized by micro-circulatory stimulants like Himalayan Shilajit, Kaunch Beej & Gokshura.",
      color: "border-emerald-300 bg-emerald-50/30",
      icon: Droplets,
    },
  };

  const current = doshaData[activeDosha];
  const CurrentIcon = current.icon;

  return (
    <section className="py-5 sm:py-10 lg:py-14 bg-[#EFF4F0]/50 border-y border-[#9E8047]/20 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#9E8047]/30 text-[#1F3D2B] text-xs font-mono uppercase tracking-[0.16em] mb-2.5 sm:mb-3 shadow-2xs">
            <Leaf className="w-3.5 h-3.5 text-[#4E5F52]" />
            Foundational Ayurvedic Science
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl text-[#1C1D1F] tracking-tight mb-2 sm:mb-3">
            The Three Doshas: <span className="italic font-normal text-[#8C703D]">Restoring Inner Balance</span>
          </h2>
          <p className="text-xs sm:text-base text-[#555555] leading-relaxed">
            Every human constitution (Prakriti) is a unique interplay of three bio-energies: Vata, Pitta, and Kapha. Our formulations work synergistically to recalibrate these doshas at their cellular root.
          </p>
        </div>

        {/* Dosha Selector Tabs */}
        <div className="flex justify-center gap-1.5 sm:gap-3 mb-6 sm:mb-8 w-full max-w-md mx-auto">
          {(["vata", "pitta", "kapha"] as const).map((key) => {
            const data = doshaData[key];
            const isActive = activeDosha === key;
            return (
              <button
                key={key}
                onClick={() => setActiveDosha(key)}
                className={`flex-1 sm:flex-initial px-3 sm:px-8 py-2 sm:py-3 rounded-xl font-heading text-xs sm:text-base transition-all flex items-center justify-center gap-1.5 sm:gap-2 border whitespace-nowrap ${
                  isActive
                    ? "bg-[#1F3D2B] text-white border-[#1F3D2B] shadow-sm"
                    : "bg-white text-[#555555] border-[#9E8047]/25 hover:border-[#1F3D2B]"
                }`}
              >
                <span>{data.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Dosha Card with Smooth Tab Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDosha}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`max-w-3xl mx-auto rounded-2xl border ${current.color} p-4 sm:p-8 lg:p-10 shadow-xs transition-all duration-300 bg-white mb-8 sm:mb-16`}
          >
            <div className="flex items-center gap-3 sm:gap-3.5 mb-4 sm:mb-5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#EFF4F0] border border-[#1F3D2B]/15 flex items-center justify-center text-[#1F3D2B]">
                <CurrentIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="font-heading text-xl sm:text-2xl text-[#1C1D1F]">
                  {current.name}
                </h3>
                <p className="text-[11px] sm:text-xs font-mono text-[#737373]">
                  {current.elements}
                </p>
              </div>
            </div>

          <div className="space-y-3 sm:space-y-4 text-xs sm:text-base leading-relaxed text-[#555555]">
            <p className="font-medium text-[#1C1D1F] text-xs sm:text-base">
              {current.quality}
            </p>
            <div className="p-3 sm:p-4 rounded-xl bg-[#FAF7F2] border border-[#9E8047]/25 shadow-2xs">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.14em] text-rose-900 font-semibold block mb-0.5 sm:mb-1">
                Signs of Imbalance:
              </span>
              <p className="text-xs sm:text-sm text-[#555555]">
                {current.imbalance}
              </p>
            </div>
            <div className="p-3 sm:p-4 rounded-xl bg-[#EFF4F0] border border-[#1F3D2B]/25 shadow-2xs">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.14em] text-[#1F3D2B] font-semibold block mb-0.5 sm:mb-1">
                Ayurvedic Botanical Solution:
              </span>
              <p className="text-xs sm:text-sm text-[#1C1D1F]">
                {current.herbalSolution}
              </p>
            </div>
          </div>

            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[#9E8047]/15 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
              <span className="text-[11px] sm:text-xs text-[#737373]">
                Need personalized guidance on your dominant Prakriti?
              </span>
              <Link
                href="/consultation"
                className="inline-flex items-center gap-1.5 sm:gap-2 text-xs font-semibold text-[#1F3D2B] hover:underline"
              >
                <span>Book Free Dosha Evaluation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Botanical Materia Medica Showcase */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#9E8047]/25 text-[#4E5F52] text-[10.5px] sm:text-xs font-mono uppercase tracking-wider mb-1.5 sm:mb-2">
              <Leaf className="w-3.5 h-3.5 text-[#4E5F52]" />
              <span>Standardized Materia Medica</span>
            </div>
            <h3 className="font-heading text-xl sm:text-3xl text-[#1C1D1F]">
              Real Botanical Ingredients We Harness
            </h3>
            <p className="text-[11.5px] sm:text-sm text-[#555555] mt-1 sm:mt-1.5">
              Every formulation is anchored in pure, lab-verified Indian herbs with zero synthetic isolates.
            </p>
          </div>

          {/* Botanical Cards: Swipeable row on mobile, 6-col grid on desktop */}
          <div
            className="whitespace-nowrap overflow-x-auto no-scrollbar sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5 -mx-4 px-4 sm:mx-0 sm:px-0 pb-1 sm:pb-0"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {BOTANICAL_HERBS.map((herb) => (
              <div
                key={herb.name}
                className="inline-block sm:block align-top whitespace-normal w-[145px] sm:w-auto shrink-0 bg-white rounded-2xl border border-[#9E8047]/25 p-2.5 sm:p-3.5 hover:shadow-md hover:border-[#1F3D2B]/40 transition-all text-center group mr-3 sm:mr-0 last:mr-0"
              >
                <div>
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[#FAF7F2] mb-2 sm:mb-3 border border-[#9E8047]/15">
                    <Image
                      src={herb.image}
                      alt={herb.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 150px, 200px"
                    />
                    <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2">
                      <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-white/90 text-[8.5px] sm:text-[9px] font-mono text-[#1F3D2B] border border-[#9E8047]/20 shadow-2xs">
                        {herb.tag}
                      </span>
                    </div>
                  </div>

                  <h4 className="font-heading font-medium text-xs sm:text-sm text-[#1C1D1F] group-hover:text-[#9E8047] transition-colors leading-tight">
                    {herb.name}
                  </h4>
                  <p className="text-[9.5px] sm:text-[10px] font-mono text-[#737373] italic mb-1">
                    {herb.sanskrit}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-[#555555] leading-snug line-clamp-2 sm:line-clamp-3">
                    {herb.benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
