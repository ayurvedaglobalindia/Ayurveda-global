"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Wind, Flame, Droplets, CheckCircle2, ArrowRight } from "lucide-react";

export function AyurvedaPhilosophySection() {
  const [activeDosha, setActiveDosha] = useState<"vata" | "pitta" | "kapha">("vata");

  const doshaData = {
    vata: {
      name: "Vata Dosha",
      elements: "Air & Space (Vayu & Akasha)",
      quality: "Governs Movement, Nervous System & Biological Drive",
      imbalance: "Restlessness, fatigue, dry scalp, anxiety & fluctuating stamina.",
      herbalSolution:
        "Calmed by warming, heavy adaptogens like Ashwagandha, Sesame oil & Safed Musli.",
      color: "border-sky-300 bg-sky-50/40",
      accent: "text-sky-800",
      icon: Wind,
    },
    pitta: {
      name: "Pitta Dosha",
      elements: "Fire & Water (Agni & Jala)",
      quality: "Governs Digestion, Metabolism & Cellular Heat",
      imbalance: "Premature graying/thinning hair, acidity, excess body heat & irritation.",
      herbalSolution:
        "Balanced by cooling, rejuvenating botanicals like Bhringraj, Amla, Shatavari & Aloe Vera.",
      color: "border-amber-300 bg-amber-50/40",
      accent: "text-amber-800",
      icon: Flame,
    },
    kapha: {
      name: "Kapha Dosha",
      elements: "Earth & Water (Prithvi & Jala)",
      quality: "Governs Physical Structure, Lubrication & Immunity (Ojas)",
      imbalance: "Lethargy, slow metabolism, stagnation & heavy sluggishness.",
      herbalSolution:
        "Energized by micro-circulatory stimulants like Himalayan Shilajit, Kaunch Beej & Gokshura.",
      color: "border-emerald-300 bg-emerald-50/40",
      accent: "text-emerald-800",
      icon: Droplets,
    },
  };

  const current = doshaData[activeDosha];
  const CurrentIcon = current.icon;

  return (
    <section className="py-16 sm:py-24 bg-[#EFF4F0]/60 border-y border-[#2D4A3E]/15">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#2D4A3E]/20 text-[#2D4A3E] text-xs font-mono uppercase tracking-wider mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#9E8047]" />
            Foundational Ayurvedic Science
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1D1F] tracking-tight mb-4">
            The Three Doshas: Restoring Inner Harmony
          </h2>
          <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
            Every human constitution (Prakriti) is a unique interplay of three bio-energies: Vata, Pitta, and Kapha. Our formulations work synergistically to recalibrate these doshas at the cellular root.
          </p>
        </div>

        {/* Dosha Selector Tabs */}
        <div className="flex justify-center gap-3 sm:gap-4 mb-8">
          {(["vata", "pitta", "kapha"] as const).map((key) => {
            const data = doshaData[key];
            const isActive = activeDosha === key;
            return (
              <button
                key={key}
                onClick={() => setActiveDosha(key)}
                className={`px-5 sm:px-8 py-3 rounded-xl font-serif text-sm sm:text-base transition-all flex items-center gap-2 border ${
                  isActive
                    ? "bg-[#2D4A3E] text-white border-[#2D4A3E] shadow-md scale-102"
                    : "bg-white text-[#555555] border-gray-200 hover:border-[#9E8047]/40"
                }`}
              >
                <span>{data.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Dosha Card */}
        <div className={`max-w-3xl mx-auto rounded-2xl border ${current.color} p-6 sm:p-10 shadow-sm transition-all duration-300 bg-white`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#EFF4F0] flex items-center justify-center text-[#2D4A3E]">
              <CurrentIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-2xl text-[#1C1D1F]">
                {current.name}
              </h3>
              <p className="text-xs font-mono text-[#737373]">
                {current.elements}
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#555555]">
            <p className="font-medium text-[#1C1D1F]">
              {current.quality}
            </p>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-xs font-mono uppercase tracking-wider text-rose-700 block mb-1">
                Signs of Imbalance:
              </span>
              <p className="text-xs sm:text-sm text-[#555555]">
                {current.imbalance}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#EFF4F0]/70 border border-[#2D4A3E]/20">
              <span className="text-xs font-mono uppercase tracking-wider text-[#2D4A3E] font-semibold block mb-1">
                Ayurvedic Botanical Solution:
              </span>
              <p className="text-xs sm:text-sm text-[#1C1D1F]">
                {current.herbalSolution}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#737373]">
              Need personalized guidance on your dominant Prakriti?
            </span>
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#2D4A3E] hover:underline"
            >
              <span>Book Free Dosha Evaluation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
