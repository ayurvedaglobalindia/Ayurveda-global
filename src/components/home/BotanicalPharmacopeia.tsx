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
    <section className="bg-[#090A0D] py-14 sm:py-20 lg:py-24 border-b border-[#999999]/20 text-[#FAF7EE] relative overflow-hidden">
      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-[11px] font-mono tracking-[0.24em] text-[#999999] uppercase mb-2">
            Analytical Botanical Pharmacology
          </p>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FAF7EE] tracking-tight">
            The Botanical Pharmacopeia
          </h2>

          <p className="text-sm sm:text-[15px] text-[#999999] mt-3.5 max-w-xl mx-auto leading-relaxed font-sans font-normal">
            Every milligram is backed by centuries of classical Charaka Samhita wisdom and validated through high-performance liquid chromatography (HPLC).
          </p>
        </div>

        {/* Mobile & Tablet Herb Selector Strip */}
        <div className="lg:hidden mb-8 -mx-3.5 px-3.5 overflow-x-auto flex gap-2 pb-2 scroll-smooth scrollbar-none">
          {botanicals.map((herb, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedHerb(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs whitespace-nowrap transition-all flex items-center gap-2 border flex-shrink-0 ${
                selectedHerb === idx
                  ? 'bg-[#181C26] border-[#FAF7EE] text-[#FAF7EE] font-medium'
                  : 'bg-[#0D0F15] border-[#999999]/20 text-[#999999] hover:text-[#FAF7EE]'
              }`}
            >
              <span className="font-mono text-[10px] text-[#D8C28A]">0{idx + 1}</span>
              <span>{herb.name}</span>
            </button>
          ))}
        </div>

        {/* 2-Column Split Ledger with Visual Imagery */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Herb Selection Column (5 Cols) - Desktop */}
          <div className="hidden lg:block lg:col-span-5 space-y-2">
            {botanicals.map((herb, idx) => {
              const isSelected = selectedHerb === idx
              const specimenNum = idx < 9 ? `0${idx + 1}` : `${idx + 1}`
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedHerb(idx)}
                  className={`w-full text-left p-3.5 rounded-xl transition-all duration-300 border flex items-center justify-between group ${
                    isSelected
                      ? 'bg-[#141722] border-[#999999]/50 text-[#FAF7EE]'
                      : 'bg-[#0D0F15] border-[#999999]/15 text-[#999999] hover:text-[#FAF7EE] hover:bg-[#11141D]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-[#D8C28A] tracking-wider">
                      {specimenNum}
                    </span>
                    <div>
                      <span className="font-heading text-sm font-normal text-[#FAF7EE] group-hover:text-[#D8C28A] transition-colors block">
                        {herb.name}
                      </span>
                      <span className="text-[10.5px] text-[#999999] italic font-serif block mt-0.5">
                        {herb.botanical}
                      </span>
                    </div>
                  </div>

                  <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#999999]">
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
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-8 rounded-2xl bg-[#0D0F15] border border-[#999999]/20 shadow-xl relative overflow-hidden"
              >
                {/* Botanical Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#999999]/15">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#999999] block">
                      Classical Classification
                    </span>
                    <h3 className="font-heading text-2xl sm:text-3xl font-normal text-[#FAF7EE] mt-1">
                      {current.name}
                    </h3>
                    <p className="text-sm sm:text-base text-[#D8C28A] font-serif italic mt-0.5 tracking-wide">
                      {current.sanskrit}
                    </p>
                  </div>

                  <span className="text-xs font-mono uppercase tracking-wider text-[#FAF7EE] bg-[#141722] px-3 py-1 rounded-full border border-[#999999]/20">
                    {current.badge}
                  </span>
                </div>

                {/* Botanical Visual Showcase & Bioactive Specs */}
                <div className="grid sm:grid-cols-12 gap-5 py-6 border-b border-[#999999]/15">
                  {/* Botanical Extraction Photography */}
                  <div className="sm:col-span-5 relative h-44 sm:h-auto min-h-[160px] rounded-xl overflow-hidden border border-[#999999]/20 bg-[#08090C] group">
                    <Image
                      src={current.image}
                      alt={current.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-103"
                      sizes="(max-width: 640px) 100vw, 300px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F15]/90 via-transparent to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <span className="text-[9.5px] uppercase font-mono tracking-wider text-[#FAF7EE] bg-[#090A0D]/90 px-2 py-0.5 rounded border border-[#999999]/30 inline-block">
                        Standardized Extract
                      </span>
                    </div>
                  </div>

                  {/* Bioactive Details */}
                  <div className="sm:col-span-7 flex flex-col justify-between gap-3">
                    <div className="p-3.5 rounded-xl bg-[#090A0D] border border-[#999999]/15">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-[#999999] block mb-1">
                        Standardized Bioactive Markers
                      </span>
                      <p className="text-xs sm:text-[13px] font-normal text-[#FAF7EE] leading-snug">
                        {current.compounds}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#090A0D] border border-[#999999]/15">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-[#999999] block mb-1">
                        Physiological Mechanism
                      </span>
                      <p className="text-xs sm:text-[13px] font-normal text-[#FAF7EE] leading-snug">
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
                <div className="mt-6 pt-5 border-t border-[#999999]/15 flex flex-wrap items-center justify-between gap-3.5 text-xs text-[#999999]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#6EE7B7] flex-shrink-0" />
                    <span>Screened for Heavy Metals &amp; Pesticide Residue (NABL Standard)</span>
                  </div>

                  <Link
                    href={`/product/${current.productSlug}`}
                    className="inline-flex items-center gap-1.5 text-xs text-[#FAF7EE] hover:text-[#D8C28A] font-medium transition-colors group"
                  >
                    <span>Used in {current.productName}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
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
