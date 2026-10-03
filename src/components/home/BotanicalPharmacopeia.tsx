'use client'

import React, { useState } from 'react'
import { Sparkles, Leaf, ArrowRight, ShieldCheck } from 'lucide-react'

const botanicals = [
  {
    name: 'Purified Himalayan Shilajit',
    botanical: 'Asphaltum punjabianum',
    sanskrit: 'शिलाजतु • Rasayana & Yogavahi',
    compounds: '84+ Ionic Trace Minerals • 60% Fulvic Acid',
    target: 'Mitochondrial Cellular ATP Energy',
    description:
      'Ethically gathered from high-altitude Himalayan rock faces above 16,000 feet, our Shilajit undergoes 21 cycles of Shodhana purification with Triphala decoctions. Acts as a potent cellular catalyst, driving minerals directly into mitochondrial membranes for sustained physical stamina without caffeine jitters.',
    badge: 'Cellular ATP',
  },
  {
    name: 'Organically Grown Ashwagandha',
    botanical: 'Withania somnifera',
    sanskrit: 'अश्वगंधा • Balya & Medhya Rasayana',
    compounds: '5% Standardized Withanolides • Alkaloids',
    target: 'Cortisol Reduction & Neuromuscular Vigor',
    description:
      'Regarded as the King of Ayurvedic Adaptogens. Formulated using premium root extract to optimize free testosterone ratios, down-regulate cortisol-induced stress, and restore neuromuscular vigor after intense physical and mental exertion.',
    badge: 'Cortisol Control',
  },
  {
    name: 'Wildcrafted Safed Musli',
    botanical: 'Chlorophytum borivilianum',
    sanskrit: 'श्वेत मूसली • Divya Aushadhi & Vajikarana',
    compounds: 'Steroidal Saponins • Polysaccharides',
    target: 'Saptadhatu (Deep Tissue) Replenishment',
    description:
      'Celebrated in classical Ayurvedic compendia as the supreme restorative for Shukra Dhatu. Replenishes depleted micro-nutritional reserves, bolsters muscular tissue density, and sustains peak intimate endurance.',
    badge: 'Tissue Vigor',
  },
  {
    name: 'Gokshura Fruit Extract',
    botanical: 'Tribulus terrestris',
    sanskrit: 'गोक्षुर • Vrishya & Shothahara',
    compounds: 'Protodioscin Bioactive Saponins',
    target: 'Nitric Oxide & Hormonal Balance',
    description:
      'Standardized for protodioscin to stimulate natural nitric oxide production, enhance vascular blood flow to working muscles, and maintain healthy hormonal equilibrium across aging demographics.',
    badge: 'Nitric Flow',
  },
  {
    name: 'Kaunch Beej (Velvet Bean)',
    botanical: 'Mucuna pruriens',
    sanskrit: 'कपिकच्छु • Vata Shamaka & Balya',
    compounds: 'Natural L-Dopa (Levodopa)',
    target: 'Dopaminergic Drive & Mental Focus',
    description:
      'A natural botanical source of L-Dopa that crosses the blood-brain barrier to synthesize dopamine. Rekindles neurological focus, confidence, and calm mental control during demanding performance situations.',
    badge: 'Mental Drive',
  },
  {
    name: 'Soothing Aloe Vera & Tocopherol',
    botanical: 'Aloe barbadensis & Vit E',
    sanskrit: 'कुमारी • Twachya & Ropana',
    compounds: 'Acemannan Mucopolysaccharides • Pure Vitamin E',
    target: 'Dermal Moisture & Topical Barrier Protection',
    description:
      'The botanical vehicle in STAYMAX+ Delay Spray. Provides a non-sticky, skin-calming protective layer that prevents dermal burning, redness, or artificial numbness while ensuring smooth, calibrated absorption within 10-15 minutes.',
    badge: 'Skin Barrier',
  },
]

export function BotanicalPharmacopeia() {
  const [selectedHerb, setSelectedHerb] = useState(0)

  return (
    <section className="bg-[#0E1E14] py-12 sm:py-16 lg:py-20 border-b border-[#C2A265]/20 text-[#F5EFE6] relative">
      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#142A1D] border border-[#C2A265]/30 text-[#C2A265] text-[10px] font-semibold tracking-[0.25em] uppercase mb-2.5">
            <Leaf className="w-3.5 h-3.5 text-[#C2A265]" />
            <span>Botanical Pharmacology</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-normal text-[#FAF7EE] tracking-tight">
            The Sacred Pharmacopeia
          </h2>

          <p className="text-xs sm:text-sm text-[#C5BFB3] mt-2.5 max-w-lg mx-auto leading-relaxed font-sans">
            Every milligram is backed by centuries of Charaka Samhita wisdom and validated through pharmaceutical-grade HPLC chromatography.
          </p>
        </div>

        {/* Mobile & Tablet Herb Selector Strip (Immediate switching without vertical scroll fatigue) */}
        <div className="lg:hidden mb-6 -mx-4 px-4 overflow-x-auto flex gap-2 pb-2 scroll-smooth">
          {botanicals.map((herb, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedHerb(idx)}
              className={`px-3.5 py-2.5 rounded-xl text-xs whitespace-nowrap transition-all flex items-center gap-2 border flex-shrink-0 ${
                selectedHerb === idx
                  ? 'bg-[#183525] border-[#C2A265] text-[#FAF7EE] shadow-md font-semibold'
                  : 'bg-[#102016] border-[#C2A265]/20 text-[#A8A295] hover:text-[#FAF7EE]'
              }`}
            >
              <span>{herb.name}</span>
              <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#C2A265]/20 text-[#D4B678] font-bold">
                {herb.badge}
              </span>
            </button>
          ))}
        </div>

        {/* Desktop Editorial Layout: 2-Column Split Ledger */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Herb Selection Column (5 Cols) - Desktop Only */}
          <div className="hidden lg:block lg:col-span-5 space-y-2.5">
            {botanicals.map((herb, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedHerb(idx)}
                className={`w-full text-left p-4 rounded-xl transition-all border flex items-center justify-between group ${
                  selectedHerb === idx
                    ? 'bg-[#142A1D] border-[#C2A265] text-[#FAF7EE] shadow-md'
                    : 'bg-[#102016] border-[#C2A265]/15 text-[#A8A295] hover:text-[#FAF7EE] hover:bg-[#12241A]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-sm sm:text-base font-normal text-[#FAF7EE] group-hover:text-[#D4B678] transition-colors">
                      {herb.name}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#A8A295] italic font-serif block mt-0.5">
                    {herb.botanical}
                  </span>
                </div>

                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${
                  selectedHerb === idx
                    ? 'bg-[#C2A265]/20 border-[#C2A265]/40 text-[#D4B678]'
                    : 'bg-[#0E1E14] border-[#C2A265]/10 text-[#8A8478]'
                }`}>
                  {herb.badge}
                </span>
              </button>
            ))}
          </div>

          {/* Detailed Herb Narrative Ledger Card (7 Cols on Desktop, Full Width on Mobile) */}
          <div className="lg:col-span-7">
            {botanicals[selectedHerb] && (
              <div className="p-6 sm:p-8 rounded-2xl bg-[#12241A] border border-[#C2A265]/30 shadow-2xl relative overflow-hidden">
                
                {/* Botanical Header Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#C2A265]/15">
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#C2A265] block">
                      Classical Sanskrit Classification
                    </span>
                    <h3 className="font-heading text-xl sm:text-2xl font-normal text-[#FAF7EE] mt-1">
                      {botanicals[selectedHerb].name}
                    </h3>
                    <p className="text-xs text-[#C2A265] font-serif mt-0.5">
                      {botanicals[selectedHerb].sanskrit}
                    </p>
                  </div>

                  <div className="px-3 py-1.5 rounded-full bg-[#183525] border border-[#C2A265]/30 text-[#D4B678] text-xs font-semibold">
                    {botanicals[selectedHerb].badge}
                  </div>
                </div>

                {/* Bioactive Specifications */}
                <div className="grid sm:grid-cols-2 gap-4 py-5 border-b border-[#C2A265]/15 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#0D1B12] border border-[#C2A265]/10">
                    <span className="text-[10px] uppercase tracking-wider text-[#A8A295] block mb-1">
                      Standardized Bioactive Markers:
                    </span>
                    <p className="text-xs font-medium text-[#FAF7EE]">
                      {botanicals[selectedHerb].compounds}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0D1B12] border border-[#C2A265]/10">
                    <span className="text-[10px] uppercase tracking-wider text-[#A8A295] block mb-1">
                      Physiological Mechanism:
                    </span>
                    <p className="text-xs font-medium text-[#FAF7EE]">
                      {botanicals[selectedHerb].target}
                    </p>
                  </div>
                </div>

                {/* Long Editorial Narrative */}
                <div className="pt-5">
                  <p className="text-xs sm:text-sm text-[#C5BFB3] leading-relaxed font-sans">
                    {botanicals[selectedHerb].description}
                  </p>
                </div>

                {/* Scientific Assurance Footnote */}
                <div className="mt-6 pt-4 border-t border-[#C2A265]/10 flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#A8A295]">
                  <div className="flex items-center gap-1.5 text-[#D4B678]">
                    <ShieldCheck className="w-4 h-4 text-[#C2A265]" />
                    <span>Heavy Metal &amp; Solvent Screened (NABL Standards)</span>
                  </div>

                  <a
                    href="#apothecary"
                    className="text-[#FAF7EE] hover:text-[#D4B678] font-medium flex items-center gap-1 transition-colors"
                  >
                    <span>View Formulations With This Herb</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  )
}
