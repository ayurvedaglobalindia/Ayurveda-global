'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Leaf, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react'

interface Botanical {
  name: string
  botanical: string
  sanskrit: string
  compounds: string
  target: string
  description: string
  badge: string
  image: string
  productName: string
  productSlug: string
}

const botanicals: Botanical[] = [
  {
    name: 'Purified Himalayan Shilajit',
    botanical: 'Asphaltum punjabianum',
    sanskrit: 'शिलाजतु • Rasayana & Yogavahi',
    compounds: '84+ Ionic Trace Minerals • 75%+ Fulvic Acid',
    target: 'Mitochondrial Cellular ATP Energy',
    description:
      'Ethically gathered from high-altitude Himalayan rock faces above 16,000 feet, our Shilajit undergoes 21 cycles of Shodhana purification with Triphala decoctions. Acts as a potent cellular catalyst, driving minerals directly into mitochondrial membranes for sustained physical stamina without caffeine jitters.',
    badge: 'Cellular ATP',
    image: '/images/products/vitality-power-combo-card.jpg',
    productName: 'Vitality & Performance Power Combo',
    productSlug: 'vitality-power-combo',
  },
  {
    name: 'Organically Grown Ashwagandha',
    botanical: 'Withania somnifera',
    sanskrit: 'अश्वगंधा • Balya & Medhya Rasayana',
    compounds: '5% Standardized Withanolides • HPLC Tested',
    target: 'Cortisol Reduction & Neuromuscular Vigor',
    description:
      'Regarded as the King of Ayurvedic Adaptogens. Formulated using premium root extract to optimize free testosterone ratios, down-regulate cortisol-induced stress, and restore neuromuscular vigor after intense physical and mental exertion.',
    badge: 'Cortisol Control',
    image: '/images/products/body-essential-nutrition-card.jpg',
    productName: 'BODY Essential Nutrition (60 Caps)',
    productSlug: 'body-essential-nutrition',
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
    image: '/images/products/body-essential-nutrition-card.jpg',
    productName: 'BODY Essential Nutrition',
    productSlug: 'body-essential-nutrition',
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
    image: '/images/products/vitality-power-combo-card.jpg',
    productName: 'Vitality & Performance Combo',
    productSlug: 'vitality-power-combo',
  },
  {
    name: 'Pure Rosemary & Bhringraj Taila',
    botanical: 'Rosmarinus officinalis & Eclipta alba',
    sanskrit: 'केश संजीवनी तैल • Keshya & Romajanana',
    compounds: 'Rosmarinic Acid • Camphor • Wedelolactone',
    target: 'Scalp Dermal Micro-Circulation & Root Nourishment',
    description:
      'Classical therapeutic oil formulation combining Rosemary essential oil with pure Bhringraj and Sesame extract. Calms scalp inflammation, unclogs hair roots, stimulates follicle micro-circulation, and arrests excessive hair fall.',
    badge: 'Follicle Vigor',
    image: '/images/products/hair-regrow-oil-card.jpg',
    productName: 'HAIR RE-GROW Ayurvedic Scalp Oil (100 ml)',
    productSlug: 'hair-regrow-oil',
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
    image: '/images/products/body-essential-nutrition-detail.jpg',
    productName: 'BODY Essential Nutrition',
    productSlug: 'body-essential-nutrition',
  },
  {
    name: 'Bhringraj & Amalaki (Keshya Rasayana)',
    botanical: 'Eclipta alba & Emblica officinalis',
    sanskrit: 'भृंगराज व आमलकी • Keshya & Rasayana',
    compounds: 'Wedelolactone Bioactives • Pure Vitamin C & Tannins',
    target: 'Follicular Regrowth & Scalp Micro-Circulation',
    description:
      'Celebrated in Brihat Trayi as the supreme Ayurvedic therapy for hair roots. Wedelolactone and bio-flavonoids penetrate hair follicles, inhibit premature shedding, promote melanin synthesis against greying, and awaken dormant dermal papilla cells.',
    badge: 'Hair Regrowth',
    image: '/images/products/hair-regrow-kit-card.jpg',
    productName: 'HAIR RE-GROW Complete Growth Kit',
    productSlug: 'hair-regrow-kit',
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
    image: '/images/products/staymax-delay-spray-detail.jpg',
    productName: 'STAYMAX+ Delay Spray (30 ml)',
    productSlug: 'staymax-delay-spray',
  },
]

export function BotanicalPharmacopeia() {
  const [selectedHerb, setSelectedHerb] = useState(0)
  const current = botanicals[selectedHerb]

  return (
    <section className="bg-[#08090C] py-12 sm:py-16 lg:py-20 border-b border-[#999999]/20 text-[#FAF7EE] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#6EE7B7]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#D8C28A]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11141E] border border-[#6EE7B7]/30 text-[#6EE7B7] text-[10px] font-semibold tracking-[0.24em] uppercase mb-3 backdrop-blur-md shadow-sm">
            <Leaf className="w-3.5 h-3.5 text-[#6EE7B7]" />
            <span>№ 03 • Botanical Pharmacology</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-light text-[#FAF7EE] tracking-tight">
            The Sacred Pharmacopeia
          </h2>

          <p className="text-xs sm:text-sm text-[#999999] mt-3 max-w-xl mx-auto leading-relaxed font-sans font-normal">
            Every milligram is backed by centuries of classical Charaka Samhita wisdom and validated through pharmaceutical-grade HPLC chromatography.
          </p>
        </div>

        {/* Mobile & Tablet Herb Selector Strip */}
        <div className="lg:hidden mb-8 -mx-3.5 px-3.5 overflow-x-auto flex gap-2.5 pb-2 scroll-smooth scrollbar-none">
          {botanicals.map((herb, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedHerb(idx)}
              className={`px-3.5 py-2.5 rounded-2xl text-xs whitespace-nowrap transition-all flex items-center gap-2 border flex-shrink-0 ${
                selectedHerb === idx
                  ? 'bg-gradient-to-r from-[#161D2B] to-[#121622] border-[#6EE7B7]/60 text-[#6EE7B7] shadow-lg font-semibold ring-1 ring-[#6EE7B7]/30'
                  : 'bg-[#10141E] border-[#999999]/20 text-[#999999] hover:text-[#FAF7EE]'
              }`}
            >
              <span className="font-mono text-[10px] text-[#D8C28A]/80">0{idx + 1}</span>
              <span>{herb.name}</span>
              <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-[#D8C28A]/15 text-[#E6D5AC] font-bold border border-[#D8C28A]/25">
                {herb.badge}
              </span>
            </button>
          ))}
        </div>

        {/* 2-Column Split Ledger with Visual Imagery */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Herb Selection Column (5 Cols) - Desktop */}
          <div className="hidden lg:block lg:col-span-5 space-y-2.5">
            {botanicals.map((herb, idx) => {
              const isSelected = selectedHerb === idx
              const specimenNum = idx < 9 ? `№ 0${idx + 1}` : `№ ${idx + 1}`
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedHerb(idx)}
                  className={`w-full text-left p-3.5 rounded-2xl transition-all duration-300 border flex items-center justify-between group ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#161D2B] to-[#121622] border-[#6EE7B7]/50 text-[#FAF7EE] shadow-xl shadow-black/40 ring-1 ring-[#6EE7B7]/30'
                      : 'bg-[#0E1119]/80 border-[#999999]/20 text-[#999999] hover:text-[#FAF7EE] hover:bg-[#131722] hover:border-[#999999]/35'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-[#D8C28A]/80 font-medium tracking-wider">
                      {specimenNum}
                    </span>
                    <div className={`w-2 h-2 rounded-full transition-all ${
                      isSelected ? 'bg-[#6EE7B7] scale-125 shadow-[0_0_8px_#6EE7B7]' : 'bg-[#999999]/40'
                    }`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-xs sm:text-sm font-medium text-[#FAF7EE] group-hover:text-[#E6D5AC] transition-colors">
                          {herb.name}
                        </span>
                      </div>
                      <span className="text-[10.5px] text-[#999999] italic font-serif block mt-0.5">
                        {herb.botanical}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border transition-colors ${
                    isSelected
                      ? 'bg-[#6EE7B7]/15 border-[#6EE7B7]/40 text-[#6EE7B7]'
                      : 'bg-[#0A0D14] border-[#999999]/20 text-[#999999]'
                  }`}>
                    {herb.badge}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Detailed Herb Narrative Ledger Card with Authentic Botanical Photography (7 Cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedHerb}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#131722] via-[#0E1118] to-[#0A0C11] border border-[#999999]/25 hover:border-[#D8C28A]/35 shadow-2xl relative overflow-hidden transition-all duration-300"
              >
                {/* Botanical Header Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#999999]/20">
                  <div>
                    <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#6EE7B7] block">
                      Classical Sanskrit Classification
                    </span>
                    <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-normal text-[#FAF7EE] mt-1">
                      {current.name}
                    </h3>
                    <p className="text-sm sm:text-base text-[#D8C28A] font-serif italic mt-0.5 tracking-wide">
                      {current.sanskrit}
                    </p>
                  </div>

                  <div className="px-3.5 py-1.5 rounded-full bg-[#131924] border border-[#6EE7B7]/40 text-[#6EE7B7] text-xs font-semibold shadow-sm">
                    {current.badge}
                  </div>
                </div>

                {/* Botanical Visual Showcase & Bioactive Specs */}
                <div className="grid sm:grid-cols-12 gap-5 py-6 border-b border-[#999999]/20">
                  {/* Botanical Extraction Photography */}
                  <div className="sm:col-span-5 relative h-44 sm:h-auto min-h-[160px] rounded-2xl overflow-hidden border border-[#999999]/25 group">
                    <Image
                      src={current.image}
                      alt={current.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 300px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08090C]/90 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-[#6EE7B7] bg-[#08090C]/90 px-2.5 py-1 rounded-full border border-[#6EE7B7]/30 inline-block backdrop-blur-md">
                        Standardized Extract
                      </span>
                    </div>
                  </div>

                  {/* Bioactive Details */}
                  <div className="sm:col-span-7 flex flex-col justify-between gap-3">
                    <div className="p-3.5 rounded-2xl bg-[#0B0D14]/90 border border-[#999999]/20 hover:border-[#6EE7B7]/30 transition-colors">
                      <span className="text-[10px] uppercase tracking-wider text-[#999999] block mb-1 font-semibold">
                        Standardized Bioactive Markers:
                      </span>
                      <p className="text-xs sm:text-[13px] font-medium text-[#FAF7EE] leading-snug">
                        {current.compounds}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#0B0D14]/90 border border-[#999999]/20 hover:border-[#D8C28A]/30 transition-colors">
                      <span className="text-[10px] uppercase tracking-wider text-[#999999] block mb-1 font-semibold">
                        Physiological Mechanism:
                      </span>
                      <p className="text-xs sm:text-[13px] font-medium text-[#FAF7EE] leading-snug">
                        {current.target}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Long Editorial Narrative in #999999 */}
                <div className="pt-5">
                  <p className="text-xs sm:text-sm text-[#999999] leading-relaxed font-sans font-normal">
                    {current.description}
                  </p>
                </div>

                {/* Scientific Assurance Footnote with Product Link */}
                <div className="mt-6 pt-5 border-t border-[#999999]/20 flex flex-wrap items-center justify-between gap-3.5 text-xs text-[#999999]">
                  <div className="flex items-center gap-2 text-[#E6D5AC]">
                    <ShieldCheck className="w-4 h-4 text-[#6EE7B7] flex-shrink-0" />
                    <span>Heavy Metal &amp; Solvent Screened (NABL Standards)</span>
                  </div>

                  <Link
                    href={`/product/${current.productSlug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#151926] hover:bg-[#1E2536] border border-[#999999]/25 hover:border-[#D8C28A]/50 text-[#FAF7EE] hover:text-[#D8C28A] font-semibold text-xs tracking-wider transition-all duration-300 group"
                  >
                    <span>Used in {current.productName}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-[#6EE7B7]" />
                  </Link>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  )
}
