'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Sparkles,
  Award,
  Leaf,
  ShieldCheck,
  CheckCircle2,
  HeartPulse,
  ArrowRight,
  BookOpen,
} from 'lucide-react'

export function EssenceOfAyurveda() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#020A05] via-[#051C10] to-[#020A05] border-b border-[#D4AF37]/25 relative overflow-hidden">
      {/* Decorative Traditional Mandala/Aura Background */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/5 blur-[160px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Left: Royal Editorial Narrative */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold tracking-wider uppercase mb-4 shadow">
              <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>परंपरा एवं प्रमाण • The Essence of Pure Ayurveda</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight">
              Rooted in 5,000 Years of Vedic Wisdom.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-[#D4AF37] to-yellow-200">
                Verified by Modern Pharmacology.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-gray-300 mt-4 leading-relaxed font-sans">
              At Ayur Veda Global, we do not compromise on traditional formulary lineage. Following the revered benchmarks of <em>Arya Vaidya Sala (Kottakkal)</em> and ancient Sanskrit treatises (<em>Charaka Samhita</em> and <em>Sushruta Samhita</em>), our remedies work at the fundamental root — rejuvenating the <strong>Saptadhatus</strong> (the seven vital tissues) rather than artificially masking temporary symptoms.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 my-8">
              <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20">
                <div className="flex items-center gap-2 text-white font-bold text-sm mb-1">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  <span>Wild Himalayan Sourcing</span>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Harvested from pristine altitudes above 16,000 ft where soil minerals remain untouched by industrial pollution.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20">
                <div className="flex items-center gap-2 text-white font-bold text-sm mb-1">
                  <Award className="w-4 h-4 text-[#D4AF37]" />
                  <span>AYUSH Ministry Certified</span>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed">
                  Strict adherence to classical texts, manufactured under licensed GMP and ISO 9001:2015 pharmaceutical conditions.
                </p>
              </div>
            </div>

            {/* Quote Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#04150B]/90 border-l-4 border-[#D4AF37] border-y border-r border-[#D4AF37]/20">
              <p className="text-xs sm:text-sm text-[#F3E5AB] italic font-serif leading-relaxed">
                &ldquo;रसवीर्यविपाकानां प्रभावस्य च तत्त्वतः।&rdquo; — True Ayurvedic efficacy lies not in mass synthesis, but in preserving the living prana, rasa (taste), and virya (potency) of sacred herbs.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
              >
                <span>Discover Our Ayurvedic Lineage</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/shop"
                className="px-5 py-3.5 rounded-2xl bg-transparent hover:bg-emerald-950/60 border border-[#D4AF37]/40 text-[#D4AF37] font-semibold text-xs sm:text-sm transition-colors"
              >
                Explore Formulations
              </Link>
            </div>
          </div>

          {/* Right: Traditional Sacred Motif Stage */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#072415] via-[#04140B] to-[#010804] border-2 border-[#D4AF37]/40 shadow-2xl space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full mx-auto bg-gradient-to-tr from-emerald-900 via-[#0A331C] to-[#D4AF37] p-0.5 shadow-xl flex items-center justify-center">
                  <div className="w-full h-full bg-[#020D06] rounded-full flex items-center justify-center text-[#D4AF37]">
                    <Sparkles className="w-10 h-10 animate-pulse" />
                  </div>
                </div>
                <h3 className="font-heading text-xl font-bold text-white mt-4">
                  The Three Pillars of Chikitsa
                </h3>
                <p className="text-xs text-[#D4AF37] font-medium">त्रिसूत्र आयुर्वेद (Trisutra Ayurveda)</p>
              </div>

              <div className="space-y-3 text-xs text-gray-200">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-black/40 border border-emerald-500/20">
                  <div className="w-6 h-6 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    १
                  </div>
                  <div>
                    <strong className="text-white">हेतु ज्ञान (Hetu Jnana):</strong> Identifying and eliminating the root causative lifestyle factors.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-black/40 border border-emerald-500/20">
                  <div className="w-6 h-6 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    २
                  </div>
                  <div>
                    <strong className="text-white">लिंग ज्ञान (Linga Jnana):</strong> Assessing Dosha imbalances (Vata, Pitta, Kapha) and depleted Dhatus.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-black/40 border border-emerald-500/20">
                  <div className="w-6 h-6 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    ३
                  </div>
                  <div>
                    <strong className="text-white">औषध ज्ञान (Aushadha Jnana):</strong> Administering calibrated Rasayana formulations with zero chemical side effects.
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-emerald-500/20 text-center">
                <span className="text-[11px] font-bold text-emerald-400">
                  100% Purity • Lab Standardized • Authentic Ayurvedic Lineage
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
