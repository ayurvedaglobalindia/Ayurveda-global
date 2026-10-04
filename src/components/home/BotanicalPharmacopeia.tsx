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
    image: '/images/products/himalayan-shilajit-resin-card.jpg',
    productName: 'Pure Himalayan Shilajit Resin (Gold Grade)',
    productSlug: 'himalayan-shilajit-resin',
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
    image: '/images/products/ashwagandha-root-extract-card.jpg',
    productName: 'KSM-66 Organic Ashwagandha (60 Caps)',
    productSlug: 'ksm66-ashwagandha-root-extract',
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
    name: 'Malkangani & Akarkara (Jyotishmati)',
    botanical: 'Celastrus paniculatus & Anacyclus pyrethrum',
    sanskrit: 'ज्योतिष्मती व अकरकरा • Teekshna & Vrishya',
    compounds: 'Bioactive Sesquiterpenes • Alkylamides',
    target: 'Micro-Vascular Circulation & Tissue Firmness',
    description:
      'Classical thermogenic botanicals brewed into medicated sesame taila over 7 days. Stimulates local nitric oxide perfusion, enhances dermal elasticity, and restores firmness and tone to fatigued muscular tissues.',
    badge: 'Tissue Firmness',
    image: '/images/products/vajikara-gold-vitality-oil-card.jpg',
    productName: 'Vajikara Gold Vitality Oil (50 ml)',
    productSlug: 'vajikara-gold-vitality-oil',
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
    <section className="bg-[#0E1E14] py-8 sm:py-12 lg:py-16 border-b border-[#C2A265]/20 text-[#F5EFE6] relative">
      <div className="container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#142A1D] border border-[#C2A265]/30 text-[#C2A265] text-[10px] font-semibold tracking-[0.22em] uppercase mb-2">
            <Leaf className="w-3.5 h-3.5 text-[#C2A265]" />
            <span>Botanical Pharmacology</span>
          </div>

          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-normal text-[#FAF7EE] tracking-tight">
            The Sacred Pharmacopeia
          </h2>

          <p className="text-xs sm:text-sm text-[#C5BFB3] mt-2 max-w-lg mx-auto leading-relaxed font-sans">
            Every milligram is backed by centuries of Charaka Samhita wisdom and validated through pharmaceutical-grade HPLC chromatography.
          </p>
        </div>

        {/* Mobile & Tablet Herb Selector Strip */}
        <div className="lg:hidden mb-6 -mx-3.5 px-3.5 overflow-x-auto flex gap-2 pb-2 scroll-smooth scrollbar-none">
          {botanicals.map((herb, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedHerb(idx)}
              className={`px-3 py-2 rounded-xl text-xs whitespace-nowrap transition-all flex items-center gap-2 border flex-shrink-0 ${
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

        {/* 2-Column Split Ledger with Visual Imagery */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Herb Selection Column (5 Cols) - Desktop */}
          <div className="hidden lg:block lg:col-span-5 space-y-2.5">
            {botanicals.map((herb, idx) => {
              const isSelected = selectedHerb === idx
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedHerb(idx)}
                  className={`w-full text-left p-3.5 rounded-xl transition-all border flex items-center justify-between group ${
                    isSelected
                      ? 'bg-[#142A1D] border-[#C2A265] text-[#FAF7EE] shadow-lg shadow-black/40 ring-1 ring-[#C2A265]/30'
                      : 'bg-[#102016]/90 border-[#C2A265]/15 text-[#A8A295] hover:text-[#FAF7EE] hover:bg-[#12241A] hover:border-[#C2A265]/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full transition-all ${
                      isSelected ? 'bg-[#C2A265] scale-125 shadow-[0_0_8px_#C2A265]' : 'bg-[#C2A265]/30'
                    }`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-xs sm:text-sm font-medium text-[#FAF7EE] group-hover:text-[#D4B678] transition-colors">
                          {herb.name}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#A8A295] italic font-serif block mt-0.5">
                        {herb.botanical}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border transition-colors ${
                    isSelected
                      ? 'bg-[#C2A265]/20 border-[#C2A265]/50 text-[#D4B678]'
                      : 'bg-[#0E1E14] border-[#C2A265]/10 text-[#8A8478]'
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
                className="p-5 sm:p-7 rounded-2xl bg-[#12241A] border border-[#C2A265]/30 shadow-2xl relative overflow-hidden"
              >
                {/* Botanical Header Badge */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#C2A265]/15">
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#C2A265] block">
                      Classical Sanskrit Classification
                    </span>
                    <h3 className="font-heading text-lg sm:text-2xl font-normal text-[#FAF7EE] mt-1">
                      {current.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#C2A265] font-serif mt-0.5">
                      {current.sanskrit}
                    </p>
                  </div>

                  <div className="px-3 py-1.5 rounded-full bg-[#183525] border border-[#C2A265]/30 text-[#D4B678] text-xs font-semibold">
                    {current.badge}
                  </div>
                </div>

                {/* Botanical Visual Showcase & Bioactive Specs */}
                <div className="grid sm:grid-cols-12 gap-4 py-5 border-b border-[#C2A265]/15">
                  {/* Botanical Extraction Photography */}
                  <div className="sm:col-span-5 relative h-40 sm:h-auto min-h-[140px] rounded-xl overflow-hidden border border-[#C2A265]/25 group">
                    <Image
                      src={current.image}
                      alt={current.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 300px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B150F]/90 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-[#D4B678] bg-[#0E1E14]/80 px-2 py-0.5 rounded border border-[#C2A265]/30 inline-block backdrop-blur-sm">
                        Standardized Extract
                      </span>
                    </div>
                  </div>

                  {/* Bioactive Details */}
                  <div className="sm:col-span-7 flex flex-col justify-between gap-3">
                    <div className="p-3 rounded-xl bg-[#0D1B12] border border-[#C2A265]/15">
                      <span className="text-[10px] uppercase tracking-wider text-[#A8A295] block mb-1">
                        Standardized Bioactive Markers:
                      </span>
                      <p className="text-xs font-medium text-[#FAF7EE]">
                        {current.compounds}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#0D1B12] border border-[#C2A265]/15">
                      <span className="text-[10px] uppercase tracking-wider text-[#A8A295] block mb-1">
                        Physiological Mechanism:
                      </span>
                      <p className="text-xs font-medium text-[#FAF7EE]">
                        {current.target}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Long Editorial Narrative */}
                <div className="pt-4">
                  <p className="text-xs sm:text-sm text-[#C5BFB3] leading-relaxed font-sans">
                    {current.description}
                  </p>
                </div>

                {/* Scientific Assurance Footnote with Product Link */}
                <div className="mt-6 pt-4 border-t border-[#C2A265]/15 flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#A8A295]">
                  <div className="flex items-center gap-1.5 text-[#D4B678]">
                    <ShieldCheck className="w-4 h-4 text-[#C2A265]" />
                    <span>Heavy Metal &amp; Solvent Screened (NABL Standards)</span>
                  </div>

                  <Link
                    href={`/product/${current.productSlug}`}
                    className="text-[#FAF7EE] hover:text-[#D4B678] font-medium flex items-center gap-1 transition-colors group"
                  >
                    <span>Used in {current.productName}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-[#C2A265]" />
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
