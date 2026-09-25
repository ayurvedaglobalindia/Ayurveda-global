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
  Clock,
  Zap,
  Lock,
  HeartHandshake,
  HelpCircle,
  Package,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { ProductCard } from '@/components/product/ProductCard'
import { getAllProducts, getCategories } from '@/lib/products/registry'
import { generateWebsiteStructuredData, generateOrganizationStructuredData } from '@/lib/seo'
import { Hero } from '@/components/hero/Hero'
import { ComboSpotlight } from '@/components/home/ComboSpotlight'

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

const trustBadges = [
  {
    icon: Truck,
    title: 'Free Express Shipping',
    desc: 'Across 25,000+ pin codes in India on orders above ₹999',
  },
  {
    icon: Lock,
    title: '100% Discreet Packaging',
    desc: 'Plain tamper-proof brown box with no sensitive product mentions',
  },
  {
    icon: Shield,
    title: 'Ayush & GMP Certified',
    desc: 'Heavy-metal screened & scientifically standardized botanicals',
  },
  {
    icon: RotateCcw,
    title: 'Cash on Delivery (COD)',
    desc: 'Pay at your doorstep with verified courier partners',
  },
]

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
    desc: 'Skin-calming botanical base in STAYMAX+ spray that prevents irritation, redness, or burning while preserving comfort.',
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
    q: 'How discreet is the packaging and delivery?',
    a: 'We understand your need for absolute privacy. All Ayur Veda Global orders are dispatched in plain, unmarked brown corrugated boxes without any brand labels, product descriptions, or sensitive terms on the outside.',
  },
  {
    q: 'Can I use BODY Essential Nutrition and STAYMAX+ together?',
    a: 'Yes, absolutely! In fact, they are specifically formulated to complement each other. BODY Essential Nutrition works internally from the root to build long-term stamina, energy, and muscle strength, while STAYMAX+ works topically for instant 15-minute endurance during intimate moments.',
  },
  {
    q: 'Are there any chemical side effects?',
    a: 'None. Ayur Veda Global formulations utilize pure, standardized Ayurvedic extracts that are screened for heavy metals and produced in GMP-certified facilities. They are 100% non-hormonal, non-addictive, and safe for regular use.',
  },
  {
    q: 'Is Cash on Delivery (COD) available?',
    a: 'Yes! We provide Cash on Delivery (COD) as well as secure online payments across 25,000+ pincodes in India. You can pay cash directly to the delivery executive when the parcel reaches your door.',
  },
  {
    q: 'How do I take the Vitality Power Combo?',
    a: 'Take 1 capsule of BODY Essential Nutrition in the morning and 1 at night after meals with warm water or milk. Use 2 to 3 sprays of STAYMAX+ on the desired area 10-15 minutes before intimacy, gently massaging until absorbed.',
  },
]

export default function HomePage() {
  const structuredData = [
    generateWebsiteStructuredData(),
    generateOrganizationStructuredData(),
  ]
  const allProducts = getAllProducts()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 3D Interactive Hero with Live Product Switcher */}
      <Hero />

      {/* 3D Category Navigation Bar */}
      <section className="bg-ayur-cream/80 backdrop-blur-md border-b border-ayur-sand/50 py-6">
        <div className="container">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-bold text-ayur-forest uppercase tracking-wider">Ayurvedic Formulations</span>
              <h2 className="font-heading text-xl sm:text-2xl font-medium text-ayur-black">Explore Specialized Collections</h2>
            </div>
            <Link href="/shop" className="text-xs sm:text-sm font-semibold text-ayur-forest hover:text-ayur-gold flex items-center gap-1 transition-colors">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <Link
              href="/shop?category=supplements"
              className="p-4 rounded-2xl bg-white border border-ayur-sand/60 hover:border-emerald-600 hover:shadow-lg transition-all duration-300 group flex items-center gap-3.5"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Leaf className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base text-ayur-black group-hover:text-emerald-700 transition-colors">Herbal Supplements</h3>
                <p className="text-xs text-ayur-stone">BODY Nutrition (60 Caps)</p>
              </div>
            </Link>

            <Link
              href="/shop?category=personal-care"
              className="p-4 rounded-2xl bg-white border border-ayur-sand/60 hover:border-ayur-gold hover:shadow-lg transition-all duration-300 group flex items-center gap-3.5"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base text-ayur-black group-hover:text-amber-700 transition-colors">Men's Personal Care</h3>
                <p className="text-xs text-ayur-stone">STAYMAX+ Delay Spray (30 ml)</p>
              </div>
            </Link>

            <Link
              href="/product/vitality-power-combo"
              className="p-4 rounded-2xl bg-gradient-to-r from-[#0F2D1E] to-[#1a4a33] text-white border border-ayur-gold/40 hover:border-ayur-gold hover:shadow-xl transition-all duration-300 group flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-ayur-gold/20 flex items-center justify-center flex-shrink-0">
                  <Tag className="w-6 h-6 text-ayur-gold" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-sm sm:text-base text-white">Power Combo Kit</h3>
                    <span className="text-[10px] font-bold bg-ayur-gold text-black px-1.5 py-0.5 rounded">29% OFF</span>
                  </div>
                  <p className="text-xs text-ayur-sand/90">Dual Action: Internal + External</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-ayur-gold group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Showcase: 2 Standalone Products + 1 Combo in 3D Cards */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ayur-mint-soft text-ayur-forest text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-ayur-forest" />
                Clinical-Grade Formulations
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-ayur-black">Our Authentic Range</h2>
              <p className="text-ayur-stone mt-2 text-sm sm:text-base">
                Discover our specialized formulations crafted for sustained stamina, power, and intimate control.
              </p>
            </div>
            <Link href="/shop">
              <Button variant="outline" className="gap-2 border-ayur-forest text-ayur-forest hover:bg-ayur-forest hover:text-white rounded-xl font-semibold">
                Shop Catalog
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* 3 Products Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Dedicated 3D Combo Spotlight Section */}
      <ComboSpotlight />

      {/* Key Ayurvedic Botanicals Section (3D Glass Cards) */}
      <section className="py-16 sm:py-24 bg-ayur-cream/60 border-y border-ayur-sand/40 relative">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold text-ayur-forest uppercase tracking-wider">Botanical Science</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-ayur-black mt-2">
              Standardized Ayurvedic Actives
            </h2>
            <p className="text-ayur-stone text-sm sm:text-base mt-2">
              Every milligram is backed by centuries of Ayurvedic texts and confirmed through modern pharmaceutical testing.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {ayurvedicHerbs.map(herb => (
              <div
                key={herb.name}
                className="p-5 sm:p-6 rounded-3xl bg-white border border-ayur-sand/60 hover:border-ayur-forest/40 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold text-ayur-forest bg-ayur-mint-soft px-2.5 py-1 rounded-full">
                      {herb.tag}
                    </span>
                    <Leaf className="w-4 h-4 text-emerald-600 group-hover:rotate-12 transition-transform" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-ayur-black">{herb.name}</h3>
                  <p className="text-xs text-ayur-stone italic font-serif mt-0.5">{herb.botanical}</p>
                  <p className="text-xs sm:text-sm text-ayur-stone/90 leading-relaxed mt-2.5">
                    {herb.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-ayur-sand/30 flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Lab Tested & Purified Extract</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Discreet Delivery Guarantees */}
      <section className="py-14 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {trustBadges.map(badge => (
              <div
                key={badge.title}
                className="p-5 rounded-2xl bg-gradient-to-b from-ayur-cream/50 to-white border border-ayur-sand/50 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-ayur-forest/10 text-ayur-forest flex items-center justify-center mb-3.5">
                  <badge.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-base font-bold text-ayur-black mb-1">{badge.title}</h3>
                <p className="text-xs text-ayur-stone leading-relaxed">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Customer Reviews */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-[#fbf9f4] to-ayur-cream border-t border-ayur-sand/40">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-1 text-ayur-gold mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <h2 className="font-heading text-3xl font-semibold text-ayur-black">Real Results from Real Men</h2>
            <p className="text-ayur-stone text-sm mt-2">Rated 4.9/5 based on over 1,200+ verified orders nationwide</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {customerReviews.map(review => (
              <div
                key={review.name}
                className="p-6 rounded-3xl bg-white border border-ayur-sand/60 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-amber-400 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs font-semibold text-ayur-forest bg-ayur-mint-soft/80 px-2 py-0.5 rounded-md w-fit mb-2">
                    Verified Purchase: {review.product}
                  </p>
                  <p className="text-xs sm:text-sm text-ayur-stone leading-relaxed italic">
                    "{review.review}"
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-ayur-sand/30 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-ayur-black">{review.name}</p>
                    <p className="text-[11px] text-ayur-stone">{review.location}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Verified Buyer
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Section */}
      <section className="py-16 sm:py-20 bg-white border-t border-ayur-sand/40">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-ayur-forest uppercase tracking-wider">Got Questions?</span>
            <h2 className="font-heading text-3xl font-semibold text-ayur-black mt-2">Frequently Asked Questions</h2>
            <p className="text-ayur-stone text-sm mt-2">Everything you need to know about our products, delivery, and safety.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-5 sm:p-6 rounded-2xl bg-ayur-cream/40 border border-ayur-sand/60 hover:border-ayur-forest/40 transition-colors"
              >
                <h3 className="font-heading text-base sm:text-lg font-bold text-ayur-black mb-2 flex items-center gap-2.5">
                  <HelpCircle className="w-5 h-5 text-ayur-forest flex-shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-xs sm:text-sm text-ayur-stone leading-relaxed pl-7.5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / Direct WhatsApp Consultation Bar */}
      <section className="py-14 bg-gradient-to-r from-[#0F2D1E] to-[#1B4332] text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-ayur-gold/20 text-ayur-gold text-xs font-bold uppercase tracking-wider border border-ayur-gold/30">
              Personalized Wellness Support
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold">
              Have Questions Before Ordering?
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-ayur-sand max-w-xl mx-auto leading-relaxed">
              Our Ayurvedic wellness consultants are available on WhatsApp to answer your questions confidentially and assist with Cash on Delivery orders.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/919999999999?text=Hi%20Ayur%20Veda%20Global%2C%20I%20have%20a%20question%20regarding%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-xl transition-all"
              >
                <span>Chat Confidentially on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}