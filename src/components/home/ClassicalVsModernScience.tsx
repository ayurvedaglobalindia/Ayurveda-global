'use client'

import React from 'react'
import { Check, X, ShieldAlert, Sparkles } from 'lucide-react'

const comparisonPoints = [
  {
    parameter: 'Treatment Philosophy',
    classical: 'Deep Constitutional Rasayana — eliminates cellular toxins (Ama) and restores natural equilibrium.',
    synthetic: 'Symptom-masking stimulants that force temporary adrenaline rushes without addressing root depletion.',
  },
  {
    parameter: 'Endocrine Impact',
    classical: 'Naturally stimulates endogenous free testosterone and cortisol balance without hormonal disruption.',
    synthetic: 'Synthetic hormonal surges that suppress the body’s natural endocrine feedback loops over time.',
  },
  {
    parameter: 'Cellular Energy & Stamina',
    classical: 'Fulvic minerals and adaptogens supercharge mitochondrial ATP synthesis for steady, sustained vigor.',
    synthetic: 'Central nervous over-stimulation causing sudden energy crashes, palpitations, and fatigue rebound.',
  },
  {
    parameter: 'Tolerance & Habituation',
    classical: '100% Non-habit forming with zero receptor desensitization; benefits compound with regular use.',
    synthetic: 'High risk of tolerance escalation, requiring higher dosages for identical physiological responses.',
  },
  {
    parameter: 'Intimate Endurance & Sensation',
    classical: 'Calibrated herbal synergy preserves 100% natural dermal pleasure while delaying involuntary climax.',
    synthetic: 'Harsh chemical desensitizers causing total epidermal numbness, burning, and loss of partner sensation.',
  },
]

export function ClassicalVsModernScience() {
  return (
    <section className="bg-[#0B150F] py-8 sm:py-10 lg:py-12 border-b border-[#C2A265]/20 text-[#F5EFE6] relative">
      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#12241A] border border-[#C2A265]/30 text-[#C2A265] text-[9.5px] font-semibold tracking-[0.22em] uppercase mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Root-Cause Pharmacology</span>
          </div>

          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-normal text-[#FAF7EE] tracking-tight">
            Classical Ayurveda vs Synthetic Quick-Fixes
          </h2>

          <p className="text-[11px] sm:text-xs text-[#C5BFB3] mt-2 max-w-lg mx-auto leading-relaxed font-sans">
            Why temporary allopathic stimulants fail long-term, and how authentic Ayurvedic Rasayana restores constitutional vigor from the ground up.
          </p>
        </div>

        {/* Editorial Comparison Table */}
        <div className="max-w-5xl mx-auto rounded-2xl bg-[#102016] border border-[#C2A265]/25 overflow-hidden shadow-2xl">
          
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-[#0E1E14] border-b border-[#C2A265]/20 p-4 sm:p-6 text-xs uppercase tracking-wider font-semibold">
            <div className="col-span-3 text-[#A8A295] hidden sm:block">Diagnostic Parameter</div>
            <div className="col-span-12 sm:col-span-5 text-[#C2A265] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C2A265]" />
              <span>Ayur Veda Global (Classical Rasayana)</span>
            </div>
            <div className="col-span-12 sm:col-span-4 text-[#8A8478] hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8A8478]" />
              <span>Generic Synthetic Stimulants</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-[#C2A265]/10 text-xs sm:text-sm">
            {comparisonPoints.map((item, idx) => (
              <div key={idx} className="grid grid-cols-12 p-4 sm:p-6 gap-3 sm:gap-4 items-center hover:bg-[#12241A]/50 transition-colors">
                
                {/* Parameter Title */}
                <div className="col-span-12 sm:col-span-3">
                  <span className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-[#A8A295] block sm:inline">
                    {item.parameter}
                  </span>
                </div>

                {/* Classical Ayurveda Point */}
                <div className="col-span-12 sm:col-span-5 flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#C2A265]/15 border border-[#C2A265]/40 flex items-center justify-center text-[#D4B678] flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <span className="sm:hidden text-[10px] font-bold uppercase tracking-wider text-[#C2A265] block mb-0.5">
                      Classical Rasayana:
                    </span>
                    <p className="text-xs sm:text-[13px] text-[#FAF7EE] leading-relaxed">
                      {item.classical}
                    </p>
                  </div>
                </div>

                {/* Synthetic Negative Point */}
                <div className="col-span-12 sm:col-span-4 flex items-start gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#C2A265]/10">
                  <div className="w-5 h-5 rounded-full bg-red-950/40 border border-red-500/30 flex items-center justify-center text-red-400 flex-shrink-0 mt-0.5">
                    <X className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <span className="sm:hidden text-[10px] font-bold uppercase tracking-wider text-red-400/90 block mb-0.5">
                      Synthetic Stimulants:
                    </span>
                    <p className="text-xs sm:text-[13px] text-[#A8A295] leading-relaxed">
                      {item.synthetic}
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
