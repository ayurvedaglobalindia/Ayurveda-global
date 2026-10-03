'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import {
  HeartPulse,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  UserCheck,
  PhoneCall,
  Lock,
} from 'lucide-react'
import { buildWhatsAppUrl } from '@/store/whatsappStore'

const doctorConcerns = [
  'General Fatigue & Low Daily Energy',
  'Intimate Endurance & Performance Issues',
  'Post-Workout Muscle Recovery',
  'Ayurvedic Dosage & Usage Guidance',
]

const doctorFormats = [
  'Daily Herbal Capsules (BODY Nutrition)',
  'Fast Topical Spray (STAYMAX+)',
  'Dual-Action Combo (Capsules + Spray)',
  'Doctor Customized Plan',
]

export function AyurvedicDoctorConsultation() {
  const [selectedConcern, setSelectedConcern] = useState(doctorConcerns[0])
  const [selectedFormat, setSelectedFormat] = useState(doctorFormats[2])

  const handleConsultDoctor = () => {
    const prompt = `*Ayur Veda Global - Doctor Consultation Request*\n\n` +
      `• Primary Concern: ${selectedConcern}\n` +
      `• Preferred Regimen: ${selectedFormat}\n` +
      `• Request: "Hello Doctor, I would like personalized Ayurvedic dosage guidance and diet recommendations for this health goal."`

    window.open(buildWhatsAppUrl(prompt), '_blank')
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#010804] via-[#051C10] to-[#010804] border-b border-emerald-500/20 relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-emerald-800/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#061A0F] via-[#04130A] to-[#020A05] border-2 border-[#D4AF37]/30 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          {/* Top Tag */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8 pb-5 border-b border-emerald-500/20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wider uppercase">
              <HeartPulse className="w-4 h-4 text-emerald-400" />
              <span>In-House BAMS Ayurvedic Doctors</span>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-300">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>Instant Reply (9 AM – 9 PM)</span>
              </span>
              <span className="flex items-center gap-1.5 text-[#D4AF37] font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>100% Confidential</span>
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Interactive Consultation Form */}
            <div className="lg:col-span-7">
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-snug">
                Need Dosage Guidance?{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-[#D4AF37]">
                  Consult Our Ayurvedic Doctor
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
                Take the guesswork out of your health. Get direct 1-on-1 recommendations from verified BAMS Ayurvedic practitioners on WhatsApp — 100% free of charge.
              </p>

              {/* Step 1: Health Goal */}
              <div className="mt-6">
                <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
                  1. Select Your Primary Health Concern:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {doctorConcerns.map(concern => (
                    <button
                      key={concern}
                      type="button"
                      onClick={() => setSelectedConcern(concern)}
                      className={`p-2.5 rounded-xl text-left text-xs transition-all border ${
                        selectedConcern === concern
                          ? 'bg-emerald-950/90 border-[#D4AF37] text-white font-semibold shadow-sm'
                          : 'bg-[#030E07]/60 border-emerald-500/20 text-gray-400 hover:text-gray-200 hover:border-emerald-500/40'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            selectedConcern === concern
                              ? 'border-[#D4AF37] bg-[#D4AF37]'
                              : 'border-gray-500'
                          }`}
                        >
                          {selectedConcern === concern && (
                            <div className="w-1.5 h-1.5 rounded-full bg-black" />
                          )}
                        </div>
                        <span className="truncate">{concern}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Preferred Regimen */}
              <div className="mt-5">
                <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
                  2. Preferred Regimen / Category:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {doctorFormats.map(fmt => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setSelectedFormat(fmt)}
                      className={`p-2.5 rounded-xl text-left text-xs transition-all border ${
                        selectedFormat === fmt
                          ? 'bg-emerald-950/90 border-[#D4AF37] text-white font-semibold shadow-sm'
                          : 'bg-[#030E07]/60 border-emerald-500/20 text-gray-400 hover:text-gray-200 hover:border-emerald-500/40'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            selectedFormat === fmt
                              ? 'border-[#D4AF37] bg-[#D4AF37]'
                              : 'border-gray-500'
                          }`}
                        >
                          {selectedFormat === fmt && (
                            <div className="w-1.5 h-1.5 rounded-full bg-black" />
                          )}
                        </div>
                        <span className="truncate">{fmt}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleConsultDoctor}
                  className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5B] text-black font-bold text-xs sm:text-sm flex items-center gap-2.5 shadow-lg shadow-green-950/50 transition-all transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5 text-black" />
                  <span>Start Free WhatsApp Doctor Consultation</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>

            {/* Right: Doctor Credibility Profile Card */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="p-6 rounded-2xl bg-[#030F07]/90 border border-[#D4AF37]/30 shadow-xl space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-900 to-[#D4AF37] p-0.5 flex-shrink-0 shadow-md">
                    <div className="w-full h-full bg-[#051C10] rounded-[14px] flex items-center justify-center text-[#D4AF37]">
                      <UserCheck className="w-7 h-7" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-white">
                      Ayurvedic Medical Board
                    </h3>
                    <p className="text-xs text-[#D4AF37] font-semibold">
                      BAMS, MD (Ayurveda) Specialists
                    </p>
                    <p className="text-[11px] text-gray-400">15+ Years Clinical Practice</p>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-emerald-500/20 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Personalized Dosha (Vata, Pitta, Kapha) assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Safe herb-to-herb interaction verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Customized dietary &amp; lifestyle recommendations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Zero spam guarantee — purely clinical advice</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/20 text-[11px] text-emerald-300 text-center font-medium">
                  🌟 Over 18,400+ consultations conducted with 98% patient satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
