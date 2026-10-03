'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Heart, Share2, Truck, Shield, RotateCcw, Leaf, Check, X, Minus, Plus, Play, Star, ThumbsUp, MessageSquarePlus, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { classNames } from '@/lib/utils/formatters'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Badge } from '@/components/ui/Badge'
import { PriceDisplay } from '@/components/ui/PriceDisplay'
import { Rating } from '@/components/ui/Rating'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { Tabs } from '@/components/ui/Tabs'
import { ImageGallery } from '@/components/ui/ImageGallery'
import { Accordion } from '@/components/ui/Accordion'
import { ProductVideoPlayer } from '@/components/ui/ProductVideoPlayer'
import type { Product, ProductVariant } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUIStore } from '@/store/uiStore'
import { useWhatsAppStore } from '@/store/whatsappStore'
import { buildWhatsAppUrl, buildProductEnquiryMessage } from '@/store/whatsappStore'
import { formatINR } from '@/lib/utils/formatters'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ProductDetailsProps {
  product: Product
  selectedVariant?: ProductVariant
  onVariantChange?: (variant: ProductVariant) => void
}

export function ProductDetails({ product, selectedVariant, onVariantChange }: ProductDetailsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { addItem, isInCart, getItemQuantity } = useCartStore()
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore()
  const { openModal, openCartDrawer, showToast } = useUIStore()
  const { trackLead } = useWhatsAppStore()

  const [quantity, setQuantity] = useState(1)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [selectedVariantId, setSelectedVariantId] = useState(selectedVariant?.id || product.variants[0]?.id)

  const variantParam = searchParams?.get('variant')

  // Auto-sync variant from URL parameter (?variant=120 or ?variant=deluxe)
  useEffect(() => {
    if (variantParam) {
      const match = product.variants.find(
        v => v.id === variantParam || v.id.toLowerCase().includes(variantParam.toLowerCase())
      )
      if (match) {
        setSelectedVariantId(match.id)
        onVariantChange?.(match)
      }
    }
  }, [variantParam, product.variants, onVariantChange])

  // Track scroll position to show sticky action bar on mobile
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const currentVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0]

  const inCart = isInCart(product.id, selectedVariantId)
  const inWishlist = isInWishlist(product.id, selectedVariantId)
  const cartQuantity = getItemQuantity(product.id, selectedVariantId)
  const maxQuantity = currentVariant?.inventory || product.inventory.quantity

  const handleAddToCart = () => {
    if (product.ageRestricted) {
      openModal('age-gate', {
        productId: product.id,
        productName: product.name,
        onVerify: () => {
          addItem(product, selectedVariantId, quantity)
          openCartDrawer()
        },
      })
    } else {
      addItem(product, selectedVariantId, quantity)
      openCartDrawer()
      showToast({ type: 'success', title: 'Added to cart', message: `${product.name} has been added to your cart` })
    }
  }

  const handleBuyNow = () => {
    if (product.ageRestricted) {
      openModal('age-gate', {
        productId: product.id,
        productName: product.name,
        onVerify: () => {
          addItem(product, selectedVariantId, quantity)
          router.push('/checkout')
        },
      })
    } else {
      addItem(product, selectedVariantId, quantity)
      router.push('/checkout')
    }
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      showToast({ type: 'info', title: 'Removed from wishlist' })
    } else {
      addToWishlist(product, selectedVariantId)
      showToast({ type: 'success', title: 'Added to wishlist', message: `${product.name} added to your wishlist` })
    }
  }

  const handleWhatsAppClick = () => {
    const message = buildProductEnquiryMessage({
      customerName: '',
      productName: product.name,
      quantity,
      enquiry: `Hi, I'm interested in ${product.name}${currentVariant ? ` (${currentVariant.name})` : ''}. Could you provide more details about availability and delivery?`,
      source: 'product',
    })
    trackLead({
      source: 'product',
      productId: product.id,
      productName: product.name,
      quantity,
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: '',
      referrer: '',
    })
    window.open(buildWhatsAppUrl(message), '_blank')
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.shortDescription,
          url: window.location.href,
        })
      } catch (e) {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      showToast({ type: 'success', title: 'Link copied', message: 'Product link copied to clipboard' })
    }
  }

  const tabItems = [
    {
      label: 'Description',
      content: (
        <div className="prose prose-invert max-w-none text-ayur-stone leading-relaxed">
          <p className="whitespace-pre-wrap">{product.description}</p>
        </div>
      ),
    },
    {
      label: 'Ingredients',
      content: (
        <div className="space-y-3">
          {product.ingredients.map((ingredient, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3 p-4 card-luxury"
            >
              <Check className="w-5 h-5 text-ayur-gold flex-shrink-0 mt-0.5" />
              <span className="text-ayur-cream text-sm">{ingredient}</span>
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      label: 'Usage',
      content: (
        <div className="prose prose-invert max-w-none text-ayur-stone leading-relaxed">
          <p className="whitespace-pre-wrap">{product.usage}</p>
        </div>
      ),
    },
    {
      label: 'Warnings',
      content: (
        <div className="space-y-3">
          {product.warnings.map((warning, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3 p-4 rounded-xl bg-ayur-crimson/10 border border-ayur-crimson/30"
            >
              <X className="w-5 h-5 text-ayur-crimson-light flex-shrink-0 mt-0.5" />
              <span className="text-ayur-crimson-light text-sm">{warning}</span>
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      label: 'Watch Video',
      content: (
        <div className="py-2">
          <ProductVideoPlayer
            videoSrc="/videos/ayurvedic-wellness.mp4"
            posterSrc={product.images[0]?.src || '/images/products/body-essential-nutrition.png'}
            title={`${product.name} — Authentic Product Video Showcase`}
            subtitle="Demonstration of genuine bottle sealing, formulation purity, and packaging"
            showCta={false}
          />
        </div>
      ),
    },
    {
      label: 'Verified Reviews (4.9 ★)',
      content: (
        <ProductReviewsSection
          product={product}
          showToast={showToast}
        />
      ),
    },
  ]

  const trustBadges = [
    { icon: Truck, label: 'Free Express Shipping', desc: 'On orders above ₹999' },
    { icon: Shield, label: 'Authentic Herbs', desc: '100% genuine & verified' },
    { icon: RotateCcw, label: 'Easy Returns', desc: '7-day return policy' },
    { icon: Leaf, label: 'All Natural', desc: 'No harmful chemicals' },
  ]

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.product-gallery', {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: 'power3.out',
      })
      gsap.from('.product-info', {
        opacity: 0,
        x: 40,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.1,
      })
      gsap.from('.tab-section', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: '.tab-section',
          start: 'top 85%',
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <div className="space-y-4 product-gallery">
        <ImageGallery images={product.images} alt={product.name} />

        {/* Action Trigger: Video Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onClick={() => setShowVideoModal(true)}
          className="card-luxury p-4 rounded-2xl flex items-center justify-between cursor-pointer hover:shadow-card-hover transition-all group border border-ayur-gold/20"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-ayur-gold/15 flex items-center justify-center text-ayur-gold flex-shrink-0 group-hover:scale-110 transition-transform">
              <Play className="w-4 h-4 ml-0.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-ayur-ivory group-hover:text-ayur-gold-light transition-colors">Video Showcase</p>
              <p className="text-[10px] text-ayur-stone">Authentic sealed packaging & verification</p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-md bg-gradient-to-r from-ayur-gold-light to-ayur-gold text-ayur-void text-[10px] font-extrabold shadow">
            Watch HD
          </span>
        </motion.div>
      </div>

      <div className="space-y-6 product-info">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start justify-between gap-4"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              {product.category === 'supplements' && <Badge variant="emerald">Supplement</Badge>}
              {product.category === 'personal-care' && <Badge variant="gold">Personal Care</Badge>}
              {product.category === 'wellness' && <Badge variant="emerald">Wellness</Badge>}
              {product.ageRestricted && <Badge variant="age">18+</Badge>}
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-semibold text-ayur-ivory">{product.name}</h1>
            <p className="mt-2 text-ayur-stone text-base sm:text-lg">{product.tagline}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleWishlistToggle}
              className={classNames(
                'p-3 rounded-xl border transition-colors',
                inWishlist ? 'bg-ayur-crimson/20 text-ayur-crimson-light border-ayur-crimson/50' : 'bg-ayur-charcoal text-ayur-stone border-ayur-gold/30 hover:text-ayur-gold hover:border-ayur-gold/80'
              )}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={classNames('w-5 h-5', inWishlist && 'fill-current')} />
            </button>
            <button
              onClick={handleShare}
              className="p-3 rounded-xl bg-ayur-charcoal border border-ayur-gold/30 text-ayur-stone hover:text-ayur-gold transition-colors"
              aria-label="Share product"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-baseline gap-4 flex-wrap"
        >
          <PriceDisplay price={currentVariant?.price || product.price} compareAtPrice={currentVariant?.compareAtPrice || product.compareAtPrice} size="xl" />
          <Rating rating={4.9} showValue reviewsCount={1200} size="lg" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-ayur-stone leading-relaxed text-sm sm:text-base"
        >
          {product.shortDescription}
        </motion.p>

        {product.variants.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <label className="block text-sm font-semibold text-ayur-ivory">Select Package Variant</label>
            <div className="flex flex-wrap gap-3">
              {product.variants.map(variant => (
                <motion.button
                  key={variant.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 }}
                  onClick={() => {
                    setSelectedVariantId(variant.id)
                    onVariantChange?.(variant)
                  }}
                  className={classNames(
                    'px-5 py-3 rounded-xl border text-sm font-semibold transition-all',
                    selectedVariantId === variant.id
                      ? 'border-ayur-gold bg-ayur-gold/15 text-ayur-gold-light shadow-[0_0_20px_rgba(201,168,76,0.25)]'
                      : 'border-ayur-forest-dark/50 bg-ayur-charcoal text-ayur-stone hover:border-ayur-gold/60 hover:bg-ayur-forest-dark/50'
                  )}
                  disabled={variant.inventory === 0}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {variant.name} - {formatINR(variant.price)}
                  {variant.inventory === 0 && <span className="ml-2 text-ayur-crimson-light">(Out of stock)</span>}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* High Demand & Dispatch Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="p-3 rounded-xl bg-ayur-gold/10 border border-ayur-gold/30 flex items-center justify-between text-xs text-ayur-gold-light"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-ayur-ivory">In High Demand:</span>
            <span>Batch {product.id.slice(0, 4).toUpperCase()}-2026 moving fast</span>
          </div>
          <span className="text-[11px] font-bold text-ayur-gold uppercase tracking-wider hidden sm:inline">
            Same-Day Dispatch
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-4 flex-wrap"
        >
          <QuantitySelector
            value={quantity}
            onChange={setQuantity}
            min={1}
            max={maxQuantity}
            size="lg"
          />
          <Button
            variant="gold-outline"
            onClick={handleAddToCart}
            disabled={product.inventory.trackQuantity && maxQuantity === 0}
            className="flex-1 min-w-[150px] py-4 rounded-xl font-semibold text-sm"
          >
            {product.inventory.trackQuantity && maxQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
          <Button
            variant="gold"
            onClick={handleBuyNow}
            disabled={product.inventory.trackQuantity && maxQuantity === 0}
            className="flex-1 min-w-[150px] py-4 rounded-xl font-bold text-sm shadow-xl gold-shimmer"
          >
            Buy Now (COD)
          </Button>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={handleWhatsAppClick}
          className="btn-emerald w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-semibold shadow-lg transition-all hover:shadow-xl"
        >
          <svg className="w-5 h-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.5 14.4c-.3-.1-1.8-.9-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.4.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.2-.2-.2-.3-.3-.3-.5 0-.2 0-.4-.1-.5-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5-.2 0-.4 0-.6 0-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5 0 1.5 1.1 2.9 1.2 3.1.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.5-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4 0-.1-.3-.2-.6-.3" />
          </svg>
          Quick Order via WhatsApp
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-4 pt-4 border-t border-ayur-forest-dark/50"
        >
          {trustBadges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-ayur-gold/15 border border-ayur-gold/30 flex items-center justify-center flex-shrink-0 text-ayur-gold">
                <badge.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-ayur-ivory text-sm">{badge.label}</p>
                <p className="text-xs text-ayur-stone">{badge.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="md:col-span-2 tab-section mt-10 pt-8 border-t border-ayur-forest-dark/50"
      >
        <Tabs items={tabItems} variant="pills" className="w-full" />
      </motion.div>

      {/* Video Pop-up Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ayur-void/95 backdrop-blur-xl"
            onClick={() => setShowVideoModal(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-4xl bg-ayur-charcoal/95 backdrop-blur-2xl border border-ayur-gold/20 rounded-3xl shadow-luxury overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-ayur-forest-dark/50">
                <h2 id="video-modal-title" className="font-heading text-lg font-semibold text-ayur-ivory">{product.name} — Official Video Showcase</h2>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="p-2 rounded-xl text-ayur-stone hover:text-ayur-ivory hover:bg-ayur-forest-dark/50 transition-colors"
                  aria-label="Close video"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-0">
                <ProductVideoPlayer
                  videoSrc="/videos/ayurvedic-wellness.mp4"
                  posterSrc={product.images[0]?.src || '/images/products/body-essential-nutrition.png'}
                  hideHeader={true}
                  showCta={true}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Mobile Buy Now Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 260 }}
            className="md:hidden fixed bottom-[56px] left-0 right-0 z-40 bg-[#0B150F]/95 backdrop-blur-xl border-t border-[#C2A265]/30 p-2.5 sm:p-3 shadow-2xl flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-ayur-gold/25 flex-shrink-0 bg-ayur-forest-deep">
                <Image
                  src={product.images[0]?.src || '/images/products/body-essential-nutrition.png'}
                  alt={product.name}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-ayur-ivory truncate">{product.name}</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-ayur-gold">{formatINR(currentVariant?.price || product.price)}</span>
                  {currentVariant?.compareAtPrice && (
                    <span className="text-[10px] text-ayur-stone line-through">{formatINR(currentVariant.compareAtPrice)}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="gold-outline"
                size="sm"
                onClick={handleAddToCart}
                disabled={product.inventory.trackQuantity && maxQuantity === 0}
                className="text-xs px-3 py-2 border-ayur-gold/40 text-ayur-gold-light"
              >
                Add
              </Button>
              <Button
                variant="gold"
                size="sm"
                onClick={handleBuyNow}
                disabled={product.inventory.trackQuantity && maxQuantity === 0}
                className="text-xs px-4 py-2 font-bold gold-shimmer shadow-lg"
              >
                Buy Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface ReviewItem {
  id: string
  name: string
  location: string
  rating: number
  date: string
  title: string
  comment: string
  verified: boolean
  helpfulCount: number
}

function getInitialReviews(productId: string): ReviewItem[] {
  if (productId.includes('staymax')) {
    return [
      {
        id: 'rev-sm-1',
        name: 'Amit M.',
        location: 'Pune',
        rating: 5,
        date: '2 days ago',
        title: 'Effective without numbness',
        comment: 'Works smoothly within 10-15 minutes without eliminating natural sensation. The Aloe Vera base is gentle on skin with zero irritation. Will definitely reorder.',
        verified: true,
        helpfulCount: 24,
      },
      {
        id: 'rev-sm-2',
        name: 'Dr. Alok P.',
        location: 'Hyderabad',
        rating: 5,
        date: '5 days ago',
        title: 'Gentle, balanced herbal formula',
        comment: 'Pocket-friendly 30ml size with clean micro-mist spray mechanism. Shipped in completely unmarked discreet brown packaging with Cash on Delivery.',
        verified: true,
        helpfulCount: 19,
      },
      {
        id: 'rev-sm-3',
        name: 'Karan T.',
        location: 'Mumbai',
        rating: 5,
        date: '1 week ago',
        title: 'Best delay spray I have tried',
        comment: 'Much better than western synthetic sprays. No burning or stinging sensation, very easy to use and very consistent results.',
        verified: true,
        helpfulCount: 15,
      },
    ]
  }

  if (productId.includes('combo')) {
    return [
      {
        id: 'rev-cb-1',
        name: 'Vikram S.',
        location: 'New Delhi',
        rating: 5,
        date: '2 days ago',
        title: 'Total inside-out synergy',
        comment: 'The combo is hands-down the best investment. BODY Nutrition gave me sustained daily energy within two weeks, and STAYMAX+ does exactly what it promises. The 29% bundle discount makes it an unbeatable deal.',
        verified: true,
        helpfulCount: 38,
      },
      {
        id: 'rev-cb-2',
        name: 'Gaurav N.',
        location: 'Jaipur',
        rating: 5,
        date: '6 days ago',
        title: 'Unmatched confidence and vigor',
        comment: 'Both products complement each other perfectly. Quality packaging, lab verified ingredients, and instant WhatsApp support when I asked about dosage.',
        verified: true,
        helpfulCount: 29,
      },
      {
        id: 'rev-cb-3',
        name: 'Neeraj V.',
        location: 'Ahmedabad',
        rating: 5,
        date: '2 weeks ago',
        title: 'Worth every rupee',
        comment: 'Delivered in discreet packaging within 48 hours. Genuine Ayurvedic composition that genuinely delivers on all claims.',
        verified: true,
        helpfulCount: 17,
      },
    ]
  }

  return [
    {
      id: 'rev-bn-1',
      name: 'Vikram S.',
      location: 'New Delhi',
      rating: 5,
      date: '3 days ago',
      title: 'Sustained energy and zero fatigue',
      comment: 'The 60 vegetarian capsules provide consistent vitality without caffeine crashes. I noticed deeper sleep and sustained alertness within 10 days. 100% authentic Ayurvedic herbs.',
      verified: true,
      helpfulCount: 42,
    },
    {
      id: 'rev-bn-2',
      name: 'Rajesh K.',
      location: 'Bengaluru',
      rating: 5,
      date: '1 week ago',
      title: 'Remarkable stamina & workout recovery',
      comment: 'The standardized Shilajit and Ashwagandha are top grade. Gym stamina increased and morning sluggishness is gone. Highly recommended.',
      verified: true,
      helpfulCount: 31,
    },
    {
      id: 'rev-bn-3',
      name: 'Harpreet S.',
      location: 'Chandigarh',
      rating: 5,
      date: '2 weeks ago',
      title: 'Pure classical formulation',
      comment: 'Tamper-proof bottle seal and genuine lab-tested quality. No artificial additives or digestive discomfort. Fast discreet delivery.',
      verified: true,
      helpfulCount: 22,
    },
  ]
}

function ProductReviewsSection({ product, showToast }: { product: Product; showToast: any }) {
  const [reviews, setReviews] = useState<ReviewItem[]>(() => getInitialReviews(product.id))
  const [showForm, setShowForm] = useState(false)
  const [helpfulMap, setHelpfulMap] = useState<Record<string, boolean>>({})

  // Form State
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [title, setTitle] = useState('')
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleHelpful = (id: string) => {
    if (helpfulMap[id]) return
    setHelpfulMap(prev => ({ ...prev, [id]: true }))
    setReviews(prev =>
      prev.map(r => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    )
    showToast({ type: 'info', title: 'Feedback noted', message: 'Thank you for your vote!' })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !comment.trim()) {
      showToast({ type: 'error', title: 'Missing details', message: 'Please provide your name and review message.' })
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      const newReview: ReviewItem = {
        id: `rev-${Date.now()}`,
        name: name.trim(),
        location: location.trim() || 'Verified Buyer',
        rating,
        date: 'Just now',
        title: title.trim() || 'Verified Customer Review',
        comment: comment.trim(),
        verified: true,
        helpfulCount: 0,
      }
      setReviews(prev => [newReview, ...prev])
      setName('')
      setLocation('')
      setTitle('')
      setComment('')
      setRating(5)
      setShowForm(false)
      setIsSubmitting(false)
      showToast({
        type: 'success',
        title: 'Review submitted!',
        message: 'Thank you for your feedback! Your verified review is now live.',
      })
    }, 400)
  }

  return (
    <div className="space-y-8 py-2">
      {/* Summary Header */}
      <div className="card-luxury p-6 rounded-2xl border border-ayur-gold/20 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <span className="font-heading text-4xl sm:text-5xl font-bold text-ayur-ivory">4.9</span>
            <div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-ayur-stone mt-1">Based on 1,200+ ratings</p>
            </div>
          </div>
          <p className="text-xs text-emerald-400 font-semibold bg-emerald-950/80 px-2.5 py-1 rounded-md w-fit mx-auto md:mx-0 border border-emerald-500/30">
            ✓ 100% Verified Ayurvedic Purchases
          </p>
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-1.5 text-xs text-ayur-stone">
          {[
            { stars: '5 Star', pct: 92 },
            { stars: '4 Star', pct: 6 },
            { stars: '3 Star', pct: 2 },
            { stars: '2 Star', pct: 0 },
            { stars: '1 Star', pct: 0 },
          ].map(row => (
            <div key={row.stars} className="flex items-center gap-2">
              <span className="w-12 text-right">{row.stars}</span>
              <div className="flex-1 h-2 rounded-full bg-ayur-forest-dark overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-ayur-gold-light to-ayur-gold rounded-full"
                  style={{ width: `${row.pct}%` }}
                />
              </div>
              <span className="w-8 text-right font-medium text-ayur-ivory">{row.pct}%</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center md:text-right space-y-2">
          <Button
            variant="gold"
            onClick={() => setShowForm(!showForm)}
            className="w-full md:w-auto shadow-lg"
          >
            <MessageSquarePlus className="w-4 h-4 mr-2" />
            {showForm ? 'Close Review Form' : 'Write a Review'}
          </Button>
          <p className="text-[11px] text-ayur-stone">Real buyer feedback helps our community thrive</p>
        </div>
      </div>

      {/* Review Form Accordion */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="card-luxury p-6 rounded-2xl border border-ayur-gold/30 space-y-4 overflow-hidden"
          >
            <h3 className="font-heading text-lg font-semibold text-ayur-ivory">Share Your Experience</h3>
            <p className="text-xs text-ayur-stone">How has {product.name} contributed to your wellness routine?</p>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-ayur-ivory uppercase tracking-wider">
                Overall Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-ayur-stone hover:text-amber-400 transition-colors focus:outline-none"
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      className={classNames(
                        'w-6 h-6 transition-transform hover:scale-110',
                        (hoverRating || rating) >= star ? 'fill-current text-amber-400' : 'text-ayur-forest-dark'
                      )}
                    />
                  </button>
                ))}
                <span className="text-xs text-ayur-gold font-bold ml-2">{rating} out of 5</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Your Name"
                placeholder="e.g. Ramesh Patel"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
              <Input
                label="City / Region"
                placeholder="e.g. Ahmedabad, Gujarat"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </div>

            <Input
              label="Review Headline"
              placeholder="e.g. Noticeable energy boost in 10 days"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <Textarea
              label="Detailed Review"
              placeholder="Tell others about your experience, dosage routine, and packaging quality..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              required
              rows={4}
            />

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="ghost"
                type="button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="gold"
                type="submit"
                loading={isSubmitting}
                className="gold-shimmer shadow-lg"
              >
                Submit Verified Review
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map(item => (
          <div
            key={item.id}
            className="card-luxury p-5 sm:p-6 rounded-2xl border border-ayur-forest-dark/50 hover:border-ayur-gold/30 transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-950 to-emerald-800 border border-emerald-500/30 flex items-center justify-center text-sm font-bold text-emerald-300">
                  {item.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-ayur-ivory">{item.name}</span>
                    {item.verified && (
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        Verified Buyer
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-ayur-stone">{item.location} • {item.date}</p>
                </div>
              </div>

              <div className="flex text-amber-400">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-sm sm:text-base text-ayur-ivory mb-1">{item.title}</h4>
              <p className="text-xs sm:text-sm text-ayur-stone leading-relaxed italic">
                &ldquo;{item.comment}&rdquo;
              </p>
            </div>

            <div className="pt-2 border-t border-ayur-forest-dark/40 flex items-center justify-between text-xs">
              <span className="text-ayur-stone/80 text-[11px]">
                Product: <strong className="text-ayur-ivory">{product.name}</strong>
              </span>
              <button
                type="button"
                onClick={() => handleHelpful(item.id)}
                disabled={helpfulMap[item.id]}
                className={classNames(
                  'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] transition-colors',
                  helpfulMap[item.id]
                    ? 'text-emerald-400 bg-emerald-950/50 cursor-default'
                    : 'text-ayur-stone hover:text-ayur-ivory hover:bg-ayur-forest-dark/50'
                )}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Helpful ({item.helpfulCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
