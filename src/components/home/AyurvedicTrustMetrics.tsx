'use client'

import React from 'react'
import {
  Award,
  ShieldCheck,
  Leaf,
  FlaskConical,
  Truck,
  HeartPulse,
  Sparkles,
  Users,
} from 'lucide-react'

const stats = [
  {
    number: '150+',
    unit: 'Years',
    title: 'Ayurvedic Lineage',
    desc: 'Formulations refined across generations according to classical texts (Charaka Samhita).',
    icon: Award,
  },
  {
    number: '94%',
    unit: 'Success Rate',
    title: 'Reported Boosted Stamina',
    desc: 'Based on customer feedback within 21 to 30 days of consistent daily usage.',
    icon: HeartPulse,
  },
  {
    number: '100%',
    unit: 'Herbal & Safe',
    title: 'Zero Chemical Dependency',
    desc: 'No steroids, no synthetic hormones, and rigorously screened for zero heavy metals.',
    icon: Leaf,
  },
  {
    number: '25k+',
    unit: 'Pincodes',
    title: 'Nationwide COD Coverage',
    desc: 'Discreet unmarked express delivery directly to your doorstep anywhere in India.',
    icon: Truck,
  },
]

const certifications = [
  { label: 'AYUSH Ministry Certified', desc: 'Compliant with Ayurvedic pharmacopeia' },
  { label: 'GMP Certified Facility', desc: 'World-class hygiene and manufacturing' },
  { label: 'HPLC Lab Tested', desc: 'Standardized active Withanolides & Fulvic Acid' },
  { label: '100% Discreet Packaging', desc: 'Plain outer brown box with private labeling' },
]

export function AyurvedicTrustMetrics() {
  return (
    <section className="py-12 sm:py-16 bg-[#020D06] border-b border-emerald-500/20 relative overflow-hidden">
      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-3">
            <FlaskConical className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Clinical Efficacy &amp; Botanical Pharmacology</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight">
            Ancient Wisdom.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-[#D4AF37]">
              Proven by Modern Science.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-2 max-w-xl mx-auto">
            We bridge authentic centuries-old Vedic preparations with rigorous pharmaceutical quality controls.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={i}
                className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#051C10] to-[#030F08] border border-emerald-500/25 hover:border-[#D4AF37]/50 shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                      {stat.unit}
                    </span>
                    <Icon className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="font-heading text-3xl sm:text-4xl font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                    {stat.number}
                  </div>
                  <h3 className="font-semibold text-xs sm:text-sm text-gray-200 mb-1.5">
                    {stat.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Trust Badges Strip */}
        <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-emerald-500/20 grid grid-cols-2 md:grid-cols-4 gap-3 text-center sm:text-left">
          {certifications.map((cert, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-white">{cert.label}</p>
                <p className="text-[10px] text-gray-400 leading-tight mt-0.5">{cert.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
