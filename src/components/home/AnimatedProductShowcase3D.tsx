'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Pause, Volume2, VolumeX, Sparkles, Check, ArrowRight, ShoppingBag, Eye, Zap, Shield, Rotate3d } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { useWhatsAppStore, buildWhatsAppUrl, buildProductEnquiryMessage } from '@/store/whatsappStore'
import { products } from '@/lib/products/registry'

const showcaseItems = [
  {
    id: 'vitality-power-combo',
    title: 'Vitality & Performance Power Combo',
    tagline: 'Dual-Action Synergy • Internal Energy + Climax Control',
    price: 1999,
    compareAtPrice: 2798,
    discount: '29% OFF',
    videoSrc: '/videos/ayur-veda-product-showcase.mp4',
    posterSrc: '/images/products/vitality-power-combo.jpg',
    features: [
      'Dual pack: 1x BODY (60 Veg Caps) + 1x STAYMAX+ (30 ml Spray)',
      '100% Herbal Rasayana with Himalayan Shilajit & Ashwagandha',
      'Instant 10-15 min climax delay without skin numbness',
      'Confidential plain-box dispatch with free shipping',
    ],
    badge: '👑 Master Combo',
  },
  {
    id: 'body-essential-nutrition',
    title: 'BODY Essential Nutrition',
    tagline: '60 Vegetarian Capsules • Ayurvedic Cellular Rejuvenation',
    price: 1499,
    compareAtPrice: 1899,
    discount: '21% OFF',
    videoSrc: '/videos/ayur-veda-product-showcase.mp4',
    posterSrc: '/images/products/body-essential-nutrition.jpg',
    features: [
      '5% Standardized Withanolides from organic Ashwagandha roots',
      'High-altitude Himalayan Purified Shilajit with 84+ ionic minerals',
      'Sustained physical vigor, muscular endurance & recovery',
      'Heavy-metal screened & GMP facility certified',
    ],
    badge: '🌿 Daily Stamina',
  },
  {
    id: 'staymax-delay-spray',
    title: 'STAYMAX+ Delay Spray for Men',
    tagline: '30 ml Metered Spray • Prolonged Intimacy & Confidence',
    price: 1299,
    compareAtPrice: 1599,
    discount: '19% OFF',
    videoSrc: '/videos/3d-reveal-animation.mp4',
    posterSrc: '/images/products/staymax-delay-spray.jpg',
    features: [
      'Fast-acting herbal climax delay within 10-15 minutes',
      'Infused with Clove Bud, Nutmeg, Lavender & Natural Vitamin E',
      'Non-numbing, non-transferable and soothing for partner skin',
      'Discreet pocket-friendly bottle with 120+ sprays',
    ],
    badge: '⚡ Climax Control',
  },
]

export function AnimatedProductShowcase3D() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [viewMode, setViewMode] = useState<'3d-video' | 'photo'>('3d-video')
  const videoRef = useRef<HTMLVideoElement>(null)

  const { addItem } = useCartStore()
  const { openModal, showToast } = useUIStore()
  const { trackLead } = useWhatsAppStore()

  const currentItem = showcaseItems[activeIndex]
  const matchedProduct = products.find(p => p.id === currentItem.id) || products[0]

  const handleTogglePlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play()
      setIsPlaying(true)
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleToggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(videoRef.current.muted)
  }

  const handleQuickBuy = () => {
    if (matchedProduct.ageRestricted) {
      openModal('age-gate', {
        productId: matchedProduct.id,
        productName: matchedProduct.name,
        onVerify: () => {
          addItem(matchedProduct)
          openModal('cart')
        },
      })
    } else {
      addItem(matchedProduct)
      openModal('cart')
      showToast({ type: 'success', title: 'Added to Cart', message: `${matchedProduct.name} added with discount.` })
    }
  }

  const handleWhatsAppOrder = () => {
    const message = buildProductEnquiryMessage({
      customerName: '',
      productName: currentItem.title,
      quantity: 1,
      enquiry: `Hi Ayur Veda Global! I want to order ${currentItem.title} (Price: ₹${currentItem.price}). Please confirm Cash on Delivery to my area.`,
      source: '3d-showcase',
    })
    trackLead({
      source: '3d-showcase',
      productId: currentItem.id,
      productName: currentItem.title,
      quantity: 1,
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: '',
      referrer: '',
    })
    window.open(buildWhatsAppUrl(message), '_blank')
  }

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#06140b] via-[#0b2416] to-[#040e07] text-white relative overflow-hidden">
      {/* 3D Radial Glow and Particles */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-ayur-gold/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ayur-gold/15 border border-ayur-gold/30 text-ayur-gold text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-ayur-gold animate-spin-slow" />
            <span>Interactive 3D Animated Product Showcase</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ayur-cream">
            Experience Authenticity in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ayur-gold via-[#edd28e] to-ayur-copper">
              Dynamic 3D Motion
            </span>
          </h2>
          <p className="text-sm sm:text-base text-ayur-sand/80 mt-3 max-w-xl mx-auto">
            Switch between products, watch real unboxing videos, and inspect the pharmaceutical-grade tamper seals.
          </p>

          {/* Product Switcher Pills */}
          <div className="inline-flex p-1.5 mt-6 rounded-2xl bg-black/40 border border-ayur-gold/25 backdrop-blur-lg gap-2">
            {showcaseItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveIndex(idx)
                  setIsPlaying(true)
                }}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeIndex === idx
                    ? 'bg-gradient-to-r from-ayur-gold to-[#c79c3f] text-black shadow-lg shadow-ayur-gold/20'
                    : 'text-ayur-sand/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.badge}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Showcase Stage Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: 3D Animated Showcase Stage */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-lg">
              {/* 3D Glass Frame with Gold Border & Backlight */}
              <div className="relative rounded-3xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-2xl border-2 border-ayur-gold/40 p-4 sm:p-5 shadow-2xl shadow-black/80 group">
                <div className="absolute -inset-1 bg-gradient-to-r from-ayur-gold/30 via-emerald-500/20 to-ayur-gold/30 rounded-3xl blur-xl opacity-60 pointer-events-none" />

                {/* Stage Header */}
                <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold text-ayur-gold uppercase tracking-wider">
                      Live 3D Template Player
                    </span>
                  </div>

                  {/* Mode Switcher (Video vs Photo) */}
                  <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/10">
                    <button
                      onClick={() => setViewMode('3d-video')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                        viewMode === '3d-video' ? 'bg-ayur-gold text-black font-bold' : 'text-ayur-sand hover:text-white'
                      }`}
                    >
                      3D Video
                    </button>
                    <button
                      onClick={() => setViewMode('photo')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                        viewMode === 'photo' ? 'bg-ayur-gold text-black font-bold' : 'text-ayur-sand hover:text-white'
                      }`}
                    >
                      3D Photo
                    </button>
                  </div>
                </div>

                {/* Media Stage */}
                <div className="relative z-10 aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-black border border-white/15 shadow-inner flex items-center justify-center">
                  {viewMode === '3d-video' ? (
                    <video
                      key={currentItem.videoSrc}
                      ref={videoRef}
                      src={currentItem.videoSrc}
                      poster={currentItem.posterSrc}
                      autoPlay
                      muted={isMuted}
                      loop
                      playsInline
                      className="w-full h-full object-contain cursor-pointer"
                      onClick={handleTogglePlay}
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <Image
                        src={currentItem.posterSrc}
                        alt={currentItem.title}
                        fill
                        className="object-contain p-4 hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 500px"
                      />
                    </div>
                  )}

                  {/* Video Floating Controls */}
                  {viewMode === '3d-video' && (
                    <div className="absolute bottom-3 inset-x-3 flex items-center justify-between pointer-events-auto">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleTogglePlay}
                          className="w-8 h-8 rounded-full bg-black/60 hover:bg-ayur-gold hover:text-black text-white backdrop-blur-md flex items-center justify-center transition-colors border border-white/20"
                          aria-label={isPlaying ? 'Pause' : 'Play'}
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                        </button>
                        <button
                          onClick={handleToggleMute}
                          className="w-8 h-8 rounded-full bg-black/60 hover:bg-ayur-gold hover:text-black text-white backdrop-blur-md flex items-center justify-center transition-colors border border-white/20"
                          aria-label={isMuted ? 'Unmute' : 'Mute'}
                        >
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                      </div>

                      <span className="text-[10px] bg-black/70 px-2.5 py-1 rounded-full text-ayur-gold border border-ayur-gold/30 backdrop-blur-sm">
                        Tap video to pause
                      </span>
                    </div>
                  )}
                </div>

                {/* Stage Footer Bar */}
                <div className="relative z-10 mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-ayur-sand/80">
                  <span className="flex items-center gap-1.5 text-ayur-cream font-medium">
                    <Shield className="w-3.5 h-3.5 text-ayur-gold" />
                    Ayush & GMP Certified
                  </span>
                  <span className="text-ayur-gold font-semibold">
                    100% Genuine Plant Extracts
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Specifications & Buying Action */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <div>
              <span className="text-xs font-bold text-ayur-gold uppercase tracking-wider bg-ayur-gold/15 px-3 py-1 rounded-full border border-ayur-gold/30">
                {currentItem.badge}
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-medium text-white mt-3">
                {currentItem.title}
              </h3>
              <p className="text-sm text-ayur-sand/90 mt-1">
                {currentItem.tagline}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-white/5 border border-ayur-gold/30 backdrop-blur-md flex items-center justify-between">
              <div>
                <span className="text-xs text-ayur-sand/70 block">Special Direct Offer:</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-bold text-ayur-cream font-heading">
                    ₹{currentItem.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm text-ayur-sand/60 line-through">
                    ₹{currentItem.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold bg-gradient-to-r from-ayur-gold to-ayur-copper text-black px-3 py-1.5 rounded-xl shadow-md">
                SAVE {currentItem.discount}
              </span>
            </div>

            {/* Feature Checklist */}
            <div className="space-y-2.5">
              {currentItem.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-ayur-cream/90">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Button
                variant="gold"
                size="lg"
                onClick={handleQuickBuy}
                className="flex-1 font-bold shadow-lg shadow-ayur-gold/20 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Buy Online (COD)
              </Button>

              <Button
                variant="whatsapp"
                size="lg"
                onClick={handleWhatsAppOrder}
                className="flex-1 font-bold flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.5 14.4c-.3-.1-1.8-.9-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.4.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.2-.2-.2-.3-.3-.3-.5 0-.2 0-.4-.1-.5-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5-.2 0-.4 0-.6 0-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5 0 1.5 1.1 2.9 1.2 3.1.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.5-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4 0-.1-.3-.2-.6-.3" />
                </svg>
                WhatsApp Desk
              </Button>
            </div>

            <p className="text-[11px] text-ayur-sand/70 text-center sm:text-left">
              🔒 100% Confidential packaging with zero external markings. Free express delivery across India.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
