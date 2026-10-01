'use client'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Star, Check, Sparkles, Shield, Truck, Tag, ArrowRight, Leaf, Zap } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { useWhatsAppStore, buildWhatsAppUrl, buildProductEnquiryMessage } from '@/store/whatsappStore'
import { products } from '@/lib/products/registry'
import type { Product } from '@/types'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const productMeta: Record<string, {
  badge: string
  badgeBg: string
  tagline: string
  highlights: string[]
  isCombo?: boolean
}> = {
  'body-essential-nutrition': {
    badge: 'Herbal Rasayana • 60 Veg Caps',
    badgeBg: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30',
    tagline: 'Internal Stamina, Muscle Strength & ATP Energy',
    highlights: [
      'Ashwagandha standardized to 5% Withanolides',
      'Purified Himalayan Shilajit (84+ Minerals & Fulvic Acid)',
      'Safed Musli, Gokshura & Kaunch Beej extract',
      '100% Ayurvedic • Non-hormonal • Zero Side Effects',
    ],
  },
  'staymax-delay-spray': {
    badge: 'Fast Action • 30 ml Spray',
    badgeBg: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30',
    tagline: 'Topical Intimate Endurance & Climax Control',
    highlights: [
      'Extends intimate duration by 10-15 minutes',
      'Skin-calming Aloe Vera base prevents burning or redness',
      'Non-numbing, non-greasy & quick absorbing',
      'Discreet, pocket-friendly 30 ml bottle (approx. 75+ sprays)',
    ],
  },
  'vitality-power-combo': {
    badge: '⭐ Best Value Kit • 29% OFF',
    badgeBg: 'bg-gradient-to-r from-amber-500/20 to-emerald-500/20 text-amber-300 border-amber-400/40',
    tagline: 'Complete Inside-Out Synergy (Capsules + Spray)',
    highlights: [
      'Includes 1× BODY Essential Nutrition (60 Capsules)',
      'Includes 1× STAYMAX+ Delay Spray (30 ml)',
      'Dual-action stamina: internal endurance + topical control',
      'Save ₹799 compared to purchasing individually',
    ],
    isCombo: true,
  },
}

export function HomeProductGrid() {
  const { addItem } = useCartStore()
  const { openModal, openCartDrawer, showToast } = useUIStore()
  const { trackLead } = useWhatsAppStore()

  const handleAddToCart = (product: Product) => {
    if (product.ageRestricted) {
      openModal('age-gate', {
        productId: product.id,
        productName: product.name,
        onVerify: () => {
          addItem(product)
          openCartDrawer()
          showToast({
            type: 'success',
            title: 'Added to Cart!',
            message: `${product.name} added to your cart.`,
          })
        },
      })
    } else {
      addItem(product)
      openCartDrawer()
      showToast({
        type: 'success',
        title: 'Added to Cart!',
        message: `${product.name} added to your cart.`,
      })
    }
  }

  const handleWhatsAppOrder = (product: Product) => {
    const formattedPrice = (product.price / 100).toLocaleString('en-IN')
    const message = buildProductEnquiryMessage({
      customerName: '',
      productName: product.name,
      quantity: 1,
      enquiry: `Hi Ayur Veda Global, I want to order ${product.name} (Special Price: ₹${formattedPrice}). Please confirm Cash on Delivery (COD) to my pincode.`,
      source: 'product',
    })
    trackLead({
      source: 'product',
      productId: product.id,
      productName: product.name,
      quantity: 1,
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: '',
      referrer: '',
    })
    window.open(buildWhatsAppUrl(message), '_blank')
  }

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
      })

      gsap.from('.product-card-reveal', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.products-grid',
          start: 'top 80%',
        },
      })

      gsap.from('.trust-badge-reveal', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.trust-section',
          start: 'top 85%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#021209] via-[#041a0e] to-[#020e07] border-b border-emerald-500/20">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-950/30 rounded-full blur-[200px] animate-float-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-ayur-gold/10 rounded-full blur-[200px] animate-float" style={{ animationDelay: '-2s' }} />
        </div>

        <div className="container relative z-10 py-12 sm:py-16 lg:py-20">
          <div className="text-center max-w-3xl mx-auto hero-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>100% Herbal • Ayush Certified • Discreet Express Delivery</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-ayur-ivory tracking-tight leading-tight">
              Authentic Ayurvedic Formulations
            </h1>
            <p className="text-sm sm:text-base text-ayur-stone mt-3 max-w-2xl mx-auto leading-relaxed">
              Clinically standardized Himalayan Shilajit, Ashwagandha, and botanical actives for peak daily energy and intimate endurance. Zero side effects.
            </p>
          </div>
        </div>

        <div className="container relative z-10 pb-12 sm:pb-16 lg:pb-20">
          <div className="products-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {products.map((product) => {
              const meta = productMeta[product.id] || {
                badge: 'Ayurvedic Formula',
                badgeBg: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30',
                tagline: product.tagline || product.name,
                highlights: [],
                isCombo: false,
              }
              const isCombo = meta.isCombo
              const primaryImage = product.images.find(img => img.isPrimary) || product.images[0]
              const discountPercentage = product.compareAtPrice
                ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
                : 0
              const savings = product.compareAtPrice
                ? (product.compareAtPrice - product.price) / 100
                : 0

              return (
                <div
                  key={product.id}
                  className={`product-card-reveal rounded-3xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                    isCombo
                      ? 'bg-gradient-to-b from-[#093520] via-[#052214] to-[#03150c] border-2 border-emerald-400/50 shadow-2xl shadow-emerald-950/50 ring-1 ring-emerald-400/20'
                      : 'bg-gradient-to-b from-[#062416] to-[#03150c] border border-emerald-500/25 shadow-xl hover:border-emerald-400/40'
                  }`}
                >
                  {isCombo && (
                    <div className="bg-gradient-to-r from-amber-500 to-emerald-500 text-black text-center py-1.5 px-4 text-xs font-bold tracking-wider uppercase shadow-md flex items-center justify-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Best Value Kit — Save ₹{savings.toLocaleString('en-IN')} (29% OFF)</span>
                    </div>
                  )}

                  <div className="p-5 sm:p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide border uppercase ${meta.badgeBg}`}>
                        {meta.badge}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-400/90 flex items-center gap-1">
                        <Truck className="w-3 h-3 text-emerald-400" />
                        <span>Free COD</span>
                      </span>
                    </div>

                    <Link
                      href={`/product/${product.slug}`}
                      className="relative block aspect-[4/3] w-full rounded-2xl bg-[#021007]/90 border border-emerald-500/15 overflow-hidden group mb-4 p-3"
                    >
                      <Image
                        src={primaryImage.src}
                        alt={primaryImage.alt || product.name}
                        fill
                        priority={isCombo}
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#021007]/60 via-transparent to-transparent pointer-events-none" />
                    </Link>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-ayur-ivory">4.9</span>
                      <span className="text-xs text-ayur-stone">• 1,200+ Verified Orders</span>
                    </div>

                    <Link href={`/product/${product.slug}`}>
                      <h2 className="font-heading text-lg sm:text-xl font-semibold text-ayur-ivory hover:text-emerald-300 transition-colors leading-snug">
                        {product.name}
                      </h2>
                    </Link>
                    <p className="text-xs text-emerald-300/90 font-medium mt-1 mb-3">
                      {meta.tagline}
                    </p>

                    <ul className="space-y-1.5 my-3 pt-3 border-t border-emerald-500/15 text-xs text-ayur-stone flex-grow">
                      {meta.highlights.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="leading-tight">{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-3 border-t border-emerald-500/20 mb-4">
                      <div className="flex items-baseline gap-2.5">
                        <span className="font-heading text-2xl sm:text-3xl font-bold text-ayur-ivory">
                          ₹{(product.price / 100).toLocaleString('en-IN')}
                        </span>
                        {product.compareAtPrice && product.compareAtPrice > product.price && (
                          <>
                            <span className="text-sm text-ayur-stone line-through">
                              ₹{(product.compareAtPrice / 100).toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/30">
                              Save ₹{savings.toLocaleString('en-IN')} ({discountPercentage}%)
                            </span>
                          </>
                        )}
                      </div>
                      <p className="text-[11px] text-ayur-stone mt-0.5">
                        Inclusive of all taxes • Free express shipping above ₹999
                      </p>
                    </div>

                    <div className="space-y-2 mt-auto">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                          isCombo
                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-bold'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                        }`}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart — ₹{(product.price / 100).toLocaleString('en-IN')}</span>
                      </button>

                      <button
                        onClick={() => handleWhatsAppOrder(product)}
                        className="w-full py-2.5 px-4 rounded-xl font-medium text-xs text-emerald-300 bg-[#128C7E]/20 hover:bg-[#128C7E]/30 border border-[#25D366]/40 flex items-center justify-center gap-2 transition-colors"
                      >
                        <svg className="w-3.5 h-3.5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.5 14.4c-.3-.1-1.8-.9-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.4.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.2-.2-.2-.3-.3-.3-.5 0-.2 0-.4-.1-.5-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5-.2 0-.4 0-.6 0-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5 0 1.5 1.1 2.9 1.2 3.1.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.5-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4 0-.1-.3-.2-.6-.3" />
                        </svg>
                        <span>Instant WhatsApp Order (COD)</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#020d06] px-5 py-2.5 border-t border-emerald-500/15 flex items-center justify-between text-[11px] text-ayur-stone">
                    <span className="flex items-center gap-1">
                      <Shield className="w-3 h-3 text-emerald-400" /> 100% Plain Box
                    </span>
                    <Link
                      href={`/product/${product.slug}`}
                      className="text-emerald-400 hover:text-emerald-300 flex items-center gap-0.5 font-medium"
                    >
                      View Details <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="trust-section bg-ayur-obsidian border-y border-emerald-500/20 py-10 sm:py-14 relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-emerald-950/20 rounded-full blur-[200px] -translate-x-1/2" />
        </div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Truck, label: 'Free Express Shipping', desc: 'On all orders above ₹999 across India' },
              { icon: Shield, label: '100% Discreet Packaging', desc: 'Plain unmarked brown box guarantee' },
              { icon: Zap, label: 'Ayush & GMP Certified', desc: 'Tested for heavy metals and purity' },
              { icon: Leaf, label: 'Cash on Delivery (COD)', desc: 'Pay safely at your doorstep' },
            ].map((badge, idx) => (
              <div
                key={idx}
                className="trust-badge-reveal flex items-start gap-3.5 p-4 rounded-2xl bg-ayur-charcoal/80 border border-ayur-forest-dark/50 hover:border-ayur-gold/40 shadow-lg transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-ayur-gold/10 border border-ayur-gold/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-ayur-gold/20 transition-all duration-300 shadow-[0_0_12px_rgba(201,168,76,0.1)]">
                  <badge.icon className="w-5 h-5 text-ayur-gold" />
                </div>
                <div>
                  <p className="font-heading text-sm font-semibold text-ayur-ivory">{badge.label}</p>
                  <p className="text-xs text-ayur-stone mt-0.5 leading-relaxed">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-ayur-obsidian via-ayur-forest-deep to-ayur-obsidian text-ayur-ivory border-t border-ayur-gold/30 py-16 sm:py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-ayur-gold/15 text-ayur-gold-light text-xs font-bold uppercase tracking-wider border border-ayur-gold/35">
              Personalized Wellness Support
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold text-ayur-ivory">
              Have Questions Before Ordering?
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-ayur-stone max-w-xl mx-auto leading-relaxed">
              Our Ayurvedic wellness consultants are available on WhatsApp to answer your questions confidentially and assist with Cash on Delivery orders.
            </p>
            <div className="pt-2">
              <a
                href="https://wa.me/919123485451?text=Hi%20Ayur%20Veda%20Global%2C%20I%20have%20a%20question%20regarding%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2 text-ayur-void font-bold text-sm px-8 py-4 rounded-2xl shadow-xl transition-all gold-shimmer"
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