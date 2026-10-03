import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  Leaf,
  Truck,
  Shield,
  RotateCcw,
  Sparkles,
  Star,
  ArrowRight,
  Tag,
  CheckCircle2,
  Lock,
} from 'lucide-react'
import { getAllProducts, getCategories } from '@/lib/products/registry'
import { generateWebsiteStructuredData, generateOrganizationStructuredData } from '@/lib/seo'
import { HomeProductGrid } from '@/components/home/HomeProductGrid'
import { ShopByConcern } from '@/components/home/ShopByConcern'
import { AyurvedicTrustMetrics } from '@/components/home/AyurvedicTrustMetrics'
import { ComboSpotlight } from '@/components/home/ComboSpotlight'
import { AyurvedicDoctorConsultation } from '@/components/home/AyurvedicDoctorConsultation'
import { HomeVideoSection } from '@/components/home/HomeVideoSection'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'Ayur Veda Global | Authentic Ayurvedic Wellness & Performance Products',
  description:
    'Experience peak stamina and intimate endurance with Ayur Veda Global. Featuring BODY Essential Nutrition (60 Capsules), STAYMAX+ Delay Spray (30 ml), and the Vitality Power Combo. 100% herbal, lab tested, discreet delivery across India.',
  openGraph: {
    title: 'Ayur Veda Global | Authentic Ayurvedic Wellness Products',
    description:
      'Ancient Ayurvedic wisdom for modern vitality. 100% herbal formulations, lab tested purity, discreet delivery.',
    type: 'website',
  },
}

const ayurvedicHerbs = [
  {
    name: 'Ashwagandha',
    botanical: 'Withania somnifera',
    desc: 'Gold-standard adaptogen standardized to 5% Withanolides. Calms cortisol, accelerates muscle recovery, and elevates physical stamina.',
    tag: 'Stamina & Vigor',
  },
  {
    name: 'Purified Shilajit',
    botanical: 'Asphaltum punjabianum',
    desc: 'Harvested from high Himalayan altitudes, enriched with 84+ minerals & Fulvic Acid to supercharge cellular ATP energy synthesis.',
    tag: 'Cellular ATP Energy',
  },
  {
    name: 'Safed Musli',
    botanical: 'Chlorophytum borivilianum',
    desc: 'Celebrated in classical Ayurveda as Divya Aushadhi for replenishing deep tissue vigor, nourishment, and sustained endurance.',
    tag: 'Deep Tissue Rasayana',
  },
  {
    name: 'Gokshura',
    botanical: 'Tribulus terrestris',
    desc: 'Bioactive saponins support natural hormonal equilibrium, nitric oxide circulation, and muscular performance.',
    tag: 'Hormonal Balance',
  },
  {
    name: 'Kaunch Beej',
    botanical: 'Mucuna pruriens',
    desc: 'Natural precursor to L-Dopa, optimizing dopamine levels for mental focus, drive, and nervous system fortitude.',
    tag: 'Mental Drive & Focus',
  },
  {
    name: 'Soothing Aloe Vera',
    botanical: 'Aloe barbadensis & Vit E',
    desc: 'Skin-calming botanical base in STAYMAX+ spray that prevents irritation, redness, or burning while preserving natural sensation.',
    tag: 'Skin Comfort & Barrier',
  },
]

const customerReviews = [
  {
    name: 'Vikram S.',
    location: 'New Delhi',
    rating: 5,
    product: 'Vitality & Performance Power Combo',
    review:
      'The combo is hands-down the best investment I made. BODY Nutrition gave me sustained daily energy within two weeks without any jitters, and STAYMAX+ does exactly what it promises in 10-15 minutes without making things numb. Delivery was completely discreet in a plain brown box.',
  },
  {
    name: 'Rajesh K.',
    location: 'Bengaluru',
    rating: 5,
    product: 'BODY Essential Nutrition',
    review:
      'I was struggling with chronic work fatigue and lack of workout stamina. Taking 2 capsules after dinner has noticeably improved my morning energy and strength. 100% genuine herbs, will order the 120 capsules pack next!',
  },
  {
    name: 'Amit M.',
    location: 'Mumbai',
    rating: 5,
    product: 'STAYMAX+ Delay Spray',
    review:
      'Unlike other products in the market that cause excessive numbness or burning, STAYMAX+ is smooth, non-sticky, and feels completely natural. It absorbs fast and allows great control. Highly recommend!',
  },
]

const faqs = [
  {
    title: 'How discreet is the packaging and delivery?',
    content: (
      <p className="text-ayur-stone text-xs sm:text-sm leading-relaxed">
        We understand your need for absolute privacy. All Ayur Veda Global orders are dispatched in plain, unmarked brown corrugated boxes without any brand labels, product descriptions, or sensitive terms on the outside. Even the courier label mentions only a discreet sender address.
      </p>
    ),
  },
  {
    title: 'Can I use BODY Essential Nutrition and STAYMAX+ together?',
    content: (
      <p className="text-ayur-stone text-xs sm:text-sm leading-relaxed">
        Yes, absolutely! In fact, they are specifically formulated to complement each other in our <strong>Vitality &amp; Performance Power Combo</strong>. BODY Essential Nutrition works internally from the root to build long-term stamina, energy, and muscle strength, while STAYMAX+ works topically for instant 15-minute endurance during intimate moments.
      </p>
    ),
  },
  {
    title: 'Are there any chemical side effects?',
    content: (
      <p className="text-ayur-stone text-xs sm:text-sm leading-relaxed">
        None. Ayur Veda Global formulations utilize pure, standardized Ayurvedic extracts that are screened for heavy metals and produced in GMP-certified facilities. They are 100% non-hormonal, non-addictive, and safe for regular daily use.
      </p>
    ),
  },
  {
    title: 'Is Cash on Delivery (COD) available to my pincode?',
    content: (
      <p className="text-ayur-stone text-xs sm:text-sm leading-relaxed">
        Yes! We provide Cash on Delivery (COD) as well as secure online prepaid payments across 25,000+ pincodes in India. You can pay cash directly to the delivery executive when the parcel reaches your door.
      </p>
    ),
  },
  {
    title: 'What is the recommended daily dosage and routine?',
    content: (
      <p className="text-ayur-stone text-xs sm:text-sm leading-relaxed">
        For daily vigor, take 1 to 2 capsules of BODY Essential Nutrition after dinner with lukewarm water or warm milk. For STAYMAX+, apply 2 to 3 sprays 10-15 minutes prior to intimate moments and massage gently until absorbed.
      </p>
    ),
  },
]

export default function HomePage() {
  const structuredData = [
    generateWebsiteStructuredData(),
    generateOrganizationStructuredData(),
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 1. Hero & Product-First Immediate Showcase */}
      <HomeProductGrid />

      {/* 2. Shop By Health Concern (Dr. Vaidya's Style Concern Selector) */}
      <ShopByConcern />

      {/* 3. Clinical Validation & Ayurvedic Heritage Metrics */}
      <AyurvedicTrustMetrics />

      {/* 4. Special Dedicated Flagship Combo Spotlight Section */}
      <ComboSpotlight />

      {/* 5. Free Ayurvedic Doctor Consultation & WhatsApp Dosage Advisor */}
      <AyurvedicDoctorConsultation />

      {/* 3. Curated Ayurvedic Category Cards */}
      <section className="bg-ayur-obsidian border-b border-ayur-gold/20 py-10 sm:py-14 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-ayur-gold uppercase tracking-wider">
                Explore Collections
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-medium text-ayur-ivory mt-1">
                Targeted Ayurvedic Formulations
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs sm:text-sm font-semibold text-ayur-gold hover:text-ayur-gold-light flex items-center gap-1 transition-colors"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <Link
              href="/shop?category=supplements"
              className="card-luxury p-5 rounded-2xl border border-ayur-forest-dark/50 hover:border-ayur-gold/50 hover:shadow-xl transition-all duration-300 group flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base text-ayur-ivory group-hover:text-emerald-300 transition-colors">
                  Herbal Supplements
                </h3>
                <p className="text-xs text-ayur-stone">BODY Nutrition (60 Veg Caps)</p>
              </div>
            </Link>

            <Link
              href="/shop?category=personal-care"
              className="card-luxury p-5 rounded-2xl border border-ayur-forest-dark/50 hover:border-ayur-gold/50 hover:shadow-xl transition-all duration-300 group flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base text-ayur-ivory group-hover:text-emerald-300 transition-colors">
                  Men&apos;s Personal Care
                </h3>
                <p className="text-xs text-ayur-stone">STAYMAX+ Delay Spray (30 ml)</p>
              </div>
            </Link>

            <Link
              href="/product/vitality-power-combo"
              className="card-luxury p-5 rounded-2xl bg-gradient-to-r from-[#042417] to-[#083D28] text-ayur-ivory border-2 border-ayur-gold/50 hover:border-ayur-gold hover:shadow-2xl transition-all duration-300 group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-ayur-gold/20 border border-ayur-gold/40 flex items-center justify-center flex-shrink-0 text-ayur-gold">
                  <Tag className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm sm:text-base text-ayur-ivory">Power Combo</h3>
                    <span className="text-[10px] font-black bg-gradient-to-r from-[#F4E295] to-[#D4AF37] text-black px-2 py-0.5 rounded shadow">
                      29% OFF
                    </span>
                  </div>
                  <p className="text-xs text-ayur-stone">Dual Action Synergy (Capsules + Spray)</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-ayur-gold group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Vedic Extraction & Packaging Demonstration Video Section */}
      <HomeVideoSection />

      {/* 5. Key Ayurvedic Botanicals Section */}
      <section className="py-16 sm:py-20 bg-[#021008] border-b border-ayur-gold/20 relative">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
            <span className="text-xs font-bold text-ayur-gold uppercase tracking-wider">
              Botanical Pharmacology
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-ayur-ivory mt-2">
              Standardized Ayurvedic Actives
            </h2>
            <p className="text-ayur-stone text-sm sm:text-base mt-2">
              Every milligram is backed by classical texts and verified through pharmaceutical HPLC analysis.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {ayurvedicHerbs.map(herb => (
              <div
                key={herb.name}
                className="card-luxury p-6 rounded-3xl border border-ayur-forest-dark/60 hover:border-ayur-gold/50 shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold text-ayur-gold-light bg-ayur-gold/15 border border-ayur-gold/30 px-2.5 py-1 rounded-full">
                      {herb.tag}
                    </span>
                    <Leaf className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-ayur-ivory group-hover:text-ayur-gold-light transition-colors">
                    {herb.name}
                  </h3>
                  <p className="text-xs text-ayur-stone italic font-serif mt-0.5">{herb.botanical}</p>
                  <p className="text-xs sm:text-sm text-ayur-stone leading-relaxed mt-2.5">
                    {herb.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-ayur-forest-dark/40 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lab Screened Extract</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Verified Customer Reviews & Real Buyer Testimonials */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#021008] to-ayur-obsidian border-b border-ayur-gold/20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-1 text-amber-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-ayur-ivory">
              Real Experiences from Verified Customers
            </h2>
            <p className="text-ayur-stone text-sm mt-2">
              Rated 4.9/5 based on over 1,200+ verified orders nationwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {customerReviews.map(review => (
              <div
                key={review.name}
                className="card-luxury p-6 rounded-3xl border border-ayur-forest-dark/60 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-amber-400 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md w-fit mb-2.5 border border-emerald-500/30">
                    Verified Purchase: {review.product}
                  </p>
                  <p className="text-xs sm:text-sm text-ayur-stone leading-relaxed italic">
                    &ldquo;{review.review}&rdquo;
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-ayur-forest-dark/40 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-ayur-ivory">{review.name}</p>
                    <p className="text-[11px] text-ayur-stone">{review.location}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    Verified Buyer
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Frequently Asked Questions (FAQ) Section */}
      <section className="py-16 sm:py-20 bg-ayur-obsidian border-b border-ayur-gold/20">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-xs font-bold text-ayur-gold uppercase tracking-wider">
              Transparency &amp; Confidence
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-ayur-ivory mt-2">
              Frequently Asked Questions
            </h2>
            <p className="text-ayur-stone text-sm mt-2">
              Everything you need to know about our formulations, discreet packaging, and Cash on Delivery.
            </p>
          </div>

          <Accordion items={faqs} allowMultiple={false} />

          <div className="mt-10 text-center">
            <p className="text-xs text-ayur-stone mb-3">Still have questions?</p>
            <a
              href="https://wa.me/919123485451?text=Hi%20Ayur%20Veda%20Global%2C%20I%20have%20a%20question%20before%20ordering."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>Chat with our Ayurvedic consultant on WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}