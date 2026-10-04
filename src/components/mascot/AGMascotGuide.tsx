'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, X, ChevronUp, Leaf, ShieldCheck, Clock, PackageCheck, HeartPulse } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface WellnessTip {
  category: string
  title: string
  body: string
  actionLabel?: string
  actionHref?: string
}

const tips: WellnessTip[] = [
  {
    category: 'Mitochondrial Energy',
    title: 'Purified Shilajit Protocol',
    body: 'Consume purified Shilajit resin or capsules with warm water or Vedic A2 milk upon waking to facilitate cellular ATP synthesis and mineral delivery.',
    actionLabel: 'View Power Combo',
    actionHref: '/products/vitality-power-combo',
  },
  {
    category: 'Nighttime Rasayana',
    title: 'Ashwagandha & Dhatu Restoration',
    body: 'Take BODY Essential Nutrition 30 minutes after dinner. Standardized Withanolides down-regulate nocturnal cortisol and rebuild neuromuscular vigor.',
    actionLabel: 'Explore Formulation',
    actionHref: '/products/body-essential-nutrition',
  },
  {
    category: 'Intimate Endurance',
    title: 'Topical Application Routine',
    body: 'Apply 1-2 metered sprays of STAYMAX+ 15 minutes prior. The soothing Aloe Vera and Tocopherol base absorbs cleanly with zero artificial numbness.',
    actionLabel: 'Read Directions',
    actionHref: '/products/staymax-delay-spray',
  },
  {
    category: 'Discreet Logistics',
    title: '100% Confidential Transit',
    body: 'Every shipment across India travels in plain, tamper-evident unmarked outer boxes. No brand or product names are visible externally.',
    actionLabel: 'Track Delivery',
    actionHref: '/orders',
  },
]

export function AGMascotGuide() {
  const [isOpen, setIsOpen] = useState(false)
  const [tipIndex, setTipIndex] = useState(0)

  const current = tips[tipIndex]

  const nextTip = () => {
    setTipIndex((prev) => (prev + 1) % tips.length)
  }

  return (
    <aside aria-label="Ayurvedic Wellness Assistant" className="fixed bottom-20 left-4 z-30 hidden sm:block">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="mb-2 w-80 rounded-2xl bg-[#0E1E14]/95 backdrop-blur-xl border border-[#C2A265]/35 p-4 shadow-2xl text-[#FAF7EE] ring-1 ring-black/40"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#C2A265]/20">
              <div className="flex items-center gap-2">
                <div className="relative w-6 h-6 rounded-full overflow-hidden border border-[#C2A265]/50 flex-shrink-0 bg-[#142A1D]">
                  <Image
                    src="/images/team/mageesh.jpg"
                    alt="Ayurveda Guide"
                    fill
                    className="object-cover object-top"
                    sizes="24px"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#D4B678] uppercase tracking-wider block">
                    Vaidya Desk Assistant
                  </span>
                  <span className="text-[9px] text-[#A8A295] block -mt-0.5">
                    {current.category}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-[#A8A295] hover:text-[#FAF7EE] p-1 rounded-lg hover:bg-[#142A1D] transition-colors"
                aria-label="Close Guide"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tip Content */}
            <div className="space-y-1.5 mb-3">
              <h4 className="font-heading text-xs font-semibold text-[#FAF7EE] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#C2A265]" />
                <span>{current.title}</span>
              </h4>
              <p className="text-[11px] text-[#C5BFB3] leading-relaxed font-sans">
                {current.body}
              </p>
            </div>

            {/* Quick action link if available */}
            {current.actionHref && (
              <div className="mb-3">
                <Link
                  href={current.actionHref}
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-[#D4B678] hover:text-[#FAF7EE] transition-colors bg-[#142A1D] hover:bg-[#183525] px-2.5 py-1 rounded-lg border border-[#C2A265]/25"
                >
                  <span>{current.actionLabel} &rarr;</span>
                </Link>
              </div>
            )}

            {/* Footer Navigation */}
            <div className="flex items-center justify-between pt-2 border-t border-[#C2A265]/15 text-[10px]">
              <button
                type="button"
                onClick={nextTip}
                className="text-[#D4B678] hover:underline font-medium flex items-center gap-1"
              >
                <span>Next Advice ({tipIndex + 1}/{tips.length})</span>
              </button>

              <span className="flex items-center gap-1 text-emerald-400 text-[9.5px]">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Verified Ayurvedic Advice</span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button with Glowing Ring */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12241A]/95 hover:bg-[#183525] border border-[#C2A265]/50 shadow-xl text-xs text-[#D4B678] transition-all hover:scale-105 active:scale-95 backdrop-blur-md group"
        title="Ayurvedic Wellness Assistant"
        aria-expanded={isOpen}
      >
        <div className="relative w-4 h-4 rounded-full overflow-hidden border border-[#C2A265]/60 flex-shrink-0">
          <Image
            src="/images/team/mageesh.jpg"
            alt="Vaidya Guide"
            fill
            className="object-cover object-top"
            sizes="16px"
          />
        </div>
        <span className="font-medium text-[11px] text-[#FAF7EE] group-hover:text-[#D4B678] transition-colors">
          Vaidya Tips
        </span>
        {isOpen ? (
          <X className="w-3 h-3 text-[#A8A295]" />
        ) : (
          <ChevronUp className="w-3 h-3 text-[#C2A265] transition-transform group-hover:-translate-y-0.5" />
        )}
      </button>
    </aside>
  )
}
