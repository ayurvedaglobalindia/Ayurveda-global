'use client'

import React from 'react'
import { Award, Sparkles, Shield, Leaf } from 'lucide-react'

export function VedicShlokaBar() {
  return (
    <div className="bg-[#020C06] border-b border-[#D4AF37]/30 py-2 sm:py-2.5 px-3 text-center relative overflow-hidden">
      {/* Decorative Gold Border Line */}
      <div className="container flex flex-col md:flex-row items-center justify-between gap-2 max-w-6xl mx-auto">
        {/* Left Sacred Shloka */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#F3E5AB]">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0 animate-pulse" />
          <span className="font-serif italic tracking-wide">
            &ldquo;प्रयोजनं चास्य स्वस्थस्य स्वास्थ्यरक्षणमातुरस्य विकारप्रशमनं च ॥&rdquo;
          </span>
          <span className="text-[10px] text-[#D4AF37] font-sans font-bold uppercase tracking-wider hidden lg:inline">
            — चरक संहिता
          </span>
        </div>

        {/* Right Authentic Seals */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs text-gray-300">
          <span className="flex items-center gap-1 text-[#D4AF37] font-semibold">
            <Award className="w-3 h-3 text-[#D4AF37]" />
            <span>कोट्टक्कल परंपरा (150+ Yrs Lineage)</span>
          </span>
          <span className="text-gray-500">•</span>
          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
            <Leaf className="w-3 h-3 text-emerald-400" />
            <span>१००% शुद्ध जड़ी-बूटी</span>
          </span>
          <span className="text-gray-500">•</span>
          <span className="flex items-center gap-1 text-[#D4AF37] font-semibold">
            <Shield className="w-3 h-3 text-[#D4AF37]" />
            <span>AYUSH Approved</span>
          </span>
        </div>
      </div>
    </div>
  )
}
