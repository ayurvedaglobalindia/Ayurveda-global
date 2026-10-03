'use client'

import React, { useState } from 'react'
import { Sparkles, X, ChevronUp, Leaf, ShieldCheck, HeartHandshake } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const quickTips = [
  'Drink warm water with Shilajit in the morning for sustained cellular ATP energy.',
  'Take BODY Essential Nutrition with lukewarm milk or water after dinner for optimal herbal absorption.',
  'STAYMAX+ Delay Spray is 100% herbal & non-numbing with soothing Aloe Vera and Vitamin E.',
  'All orders shipped across India in 100% discreet, confidential tamper-proof packaging.',
]

export function AGMascotGuide() {
  const [isOpen, setIsOpen] = useState(false)
  const [tipIndex, setTipIndex] = useState(0)

  const nextTip = () => {
    setTipIndex((prev) => (prev + 1) % quickTips.length)
  }

  return (
    <aside aria-label="Ayurvedic Wellness Assistant" className="fixed bottom-20 left-4 z-30 hidden sm:block">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-2 w-72 rounded-2xl bg-[#12241A]/95 backdrop-blur-md border border-[#C2A265]/30 p-4 shadow-2xl text-[#FAF7EE]"
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#C2A265]/20">
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#C2A265]" />
                <span className="text-xs font-semibold text-[#D4B678] uppercase tracking-wider">
                  Ayur Veda Guide
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#A8A295] hover:text-[#FAF7EE] transition-colors"
                aria-label="Close Guide"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#C5BFB3] leading-relaxed mb-3">
              {quickTips[tipIndex]}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-[#C2A265]/15 text-[10px] text-[#A8A295]">
              <button
                onClick={nextTip}
                className="text-[#D4B678] hover:underline font-medium"
              >
                Next Wellness Tip &rarr;
              </button>
              <span className="flex items-center gap-1 text-[#D4B678]">
                <ShieldCheck className="w-3 h-3 text-[#C2A265]" />
                Lab Certified
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#12241A]/90 hover:bg-[#183525] border border-[#C2A265]/40 shadow-lg text-xs text-[#D4B678] transition-all hover:scale-105"
        title="Ayurvedic Wellness Tips"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#C2A265] animate-pulse" />
        <span className="font-medium text-[11px]">Wellness Tip</span>
        {isOpen ? <X className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
      </button>
    </aside>
  )
}
