'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Heart, Share2, Truck, ShieldCheck, RotateCcw, Leaf, Check, X, Star, ThumbsUp, MessageSquarePlus, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { classNames } from '@/lib/utils/formatters'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { PriceDisplay } from '@/components/ui/PriceDisplay'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { Tabs } from '@/components/ui/Tabs'
import { ImageGallery } from '@/components/ui/ImageGallery'
import type { Product, ProductVariant } from '@/types'
import { getProductImage } from '@/lib/products/registry'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUserStore } from '@/store/userStore'
import { useUIStore } from '@/store/uiStore'
import { useWhatsAppStore, buildWhatsAppUrl, buildProductEnquiryMessage } from '@/store/whatsappStore'
import { formatINR } from '@/lib/utils/formatters'

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
  const { user, isAuthenticated } = useUserStore()
  const { openModal, openCartDrawer, showToast } = useUIStore()
  const { trackLead } = useWhatsAppStore()

  const [quantity, setQuantity] = useState(1)
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
      setShowStickyBar(window.scrollY > 450)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const currentVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0]
  const inCart = isInCart(product.id, selectedVariantId)
  const inWishlist = isInWishlist(product.id, selectedVariantId)
  const maxQuantity = currentVariant?.inventory || product.inventory.quantity

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      openModal('auth-gate', {
        product,
        variantId: selectedVariantId,
        quantity,
        mode: 'add-to-cart',
      })
      return
    }

    if (product.ageRestricted) {
      const hasVerified = sessionStorage.getItem(`age_verified_${product.id}`)
      if (!hasVerified) {
        openModal('age-verification', {
          product,
          onConfirm: () => {
            sessionStorage.setItem(`age_verified_${product.id}`, 'true')
            performAddToCart()
          },
        })
        return
      }
    }

    performAddToCart()
  }

  const performAddToCart = () => {
    addItem(product, selectedVariantId, quantity)
    showToast({
      type: 'success',
      title: 'Added to Cart',
      message: `${product.name} has been added to your selection.`,
    })
    openCartDrawer()
  }

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      openModal('auth-gate', {
        product,
        variantId: selectedVariantId,
        quantity,
        mode: 'buy-now',
      })
      return
    }

    addItem(product, selectedVariantId, quantity)
    router.push('/checkout')
  }

  const handleWhatsAppClick = () => {
    trackLead({
      source: 'product',
      productId: product.id,
      productName: product.name,
    })

    const message = buildProductEnquiryMessage({
      productName: product.name,
      price: currentVariant?.price || product.price,
      quantity,
      enquiry: `Pranam. I would like confidential Ayurvedic guidance and ordering assistance for ${product.name} (${currentVariant?.name || 'Standard'}).`,
      source: 'product',
    })

    window.open(buildWhatsAppUrl(message), '_blank')
  }

  const handleWishlistToggle = () => {
    addToWishlist(product, selectedVariantId)
    showToast({
      type: 'success',
      title: inWishlist ? 'Removed from Wishlist' : 'Saved to Wishlist',
      message: `${product.name} ${inWishlist ? 'removed from' : 'added to'} your private wishlist.`,
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.shortDescription,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      showToast({ type: 'success', title: 'Link copied', message: 'Product link copied to clipboard' })
    }
  }

  const tabItems = [
    {
      label: 'Description',
      content: (
        <div className="text-xs sm:text-sm text-[#555555] leading-relaxed font-sans space-y-3">
          <p className="whitespace-pre-wrap">{product.description}</p>
        </div>
      ),
    },
    {
      label: 'Ingredients',
      content: (
        <div className="space-y-2.5">
          {product.ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E2DDD5]"
            >
              <Check className="w-4 h-4 text-[#4E5F52] flex-shrink-0 mt-0.5" />
              <span className="text-[#1C1D1F] text-xs sm:text-sm font-sans">{ingredient}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: 'Usage & Regimen',
      content: (
        <div className="text-xs sm:text-sm text-[#555555] leading-relaxed font-sans space-y-3">
          <p className="whitespace-pre-wrap">{product.usage}</p>
        </div>
      ),
    },
    {
      label: 'Quality & Safety',
      content: (
        <div className="space-y-2.5">
          {product.warnings.map((warning, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E2DDD5]"
            >
              <ShieldCheck className="w-4 h-4 text-[#4E5F52] flex-shrink-0 mt-0.5" />
              <span className="text-[#555555] text-xs sm:text-sm font-sans">{warning}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: 'Verified Reviews',
      content: (
        <ProductReviewsSection
          product={product}
          showToast={showToast}
        />
      ),
    },
  ]

  const trustBadges = [
    { icon: Truck, label: 'Free Express Shipping', desc: 'Discreet unmarked parcels across India' },
    { icon: ShieldCheck, label: 'AYUSH & GMP Certified', desc: 'Standardized pure botanical extracts' },
    { icon: RotateCcw, label: '100% Purity Guarantee', desc: 'NABL third-party laboratory tested' },
    { icon: Leaf, label: 'Pure Vegetarian Shells', desc: 'Zero animal gelatin, talc, or fillers' },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
      {/* Product Image Gallery */}
      <div className="space-y-4">
        <ImageGallery images={product.images} alt={product.name} />
      </div>

      {/* Product Info & Action Block */}
      <div className="space-y-5">
        
        {/* Title & Category Line */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#737373] uppercase">
              {product.category === 'supplements' ? 'Herbal Supplement' : product.category === 'personal-care' ? 'Topical Care' : 'Synergistic Kit'}
            </span>
            {product.ageRestricted && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F5F1EB] border border-[#E2DDD5] text-[#737373]">
                18+ Adult
              </span>
            )}
          </div>

          <div className="flex items-start justify-between gap-4">
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1C1D1F] leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={handleWishlistToggle}
                className={classNames(
                  'p-2.5 rounded-full border transition-colors',
                  inWishlist
                    ? 'bg-rose-50 text-rose-600 border-rose-200'
                    : 'bg-[#FFFFFF] text-[#737373] border-[#E2DDD5] hover:border-[#1C1D1F]'
                )}
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart className={classNames('w-4 h-4', inWishlist && 'fill-current')} />
              </button>
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-[#FFFFFF] border border-[#E2DDD5] text-[#737373] hover:border-[#1C1D1F] transition-colors"
                aria-label="Share product"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="mt-1.5 text-xs sm:text-sm text-[#737373] font-sans">
            {product.tagline}
          </p>
        </div>

        {/* Price & Rating Reassurance */}
        <div className="flex items-baseline gap-4 flex-wrap pt-1 border-t border-[#E2DDD5]/60">
          <PriceDisplay
            price={currentVariant?.price || product.price}
            compareAtPrice={currentVariant?.compareAtPrice || product.compareAtPrice}
            size="xl"
          />
          <div className="flex items-center gap-1.5 text-xs text-[#737373]">
            <div className="flex text-[#9E8047]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span>• Verified Patron Formulation</span>
          </div>
        </div>

        {/* Short Purpose Description */}
        <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-sans">
          {product.shortDescription}
        </p>

        {/* Variant Selection (if multiple) */}
        {product.variants.length > 1 && (
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#737373]">
              Select Package Size / Course
            </label>
            <div className="flex flex-wrap gap-2">
              {product.variants.map(variant => (
                <button
                  key={variant.id}
                  onClick={() => {
                    setSelectedVariantId(variant.id)
                    onVariantChange?.(variant)
                  }}
                  className={classNames(
                    'px-3.5 py-2 rounded-lg border text-xs transition-colors',
                    selectedVariantId === variant.id
                      ? 'border-[#1C1D1F] bg-[#1C1D1F] text-[#FAF7F2] font-medium'
                      : 'border-[#E2DDD5] bg-[#FFFFFF] text-[#555555] hover:border-[#1C1D1F]'
                  )}
                  disabled={variant.inventory === 0}
                >
                  {variant.name} — {formatINR(variant.price)}
                  {variant.inventory === 0 && <span className="ml-1 text-red-500">(Out of stock)</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Plain Packaging Reassurance */}
        <div className="p-3 rounded-lg bg-[#F5F1EB] border border-[#E2DDD5] flex items-center justify-between text-xs text-[#555555]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4E5F52]" />
            <span className="text-[#1C1D1F] font-medium">Confidential Delivery:</span>
            <span>Unmarked box, zero sensitive product labels</span>
          </div>
          <span className="text-[11px] font-mono text-[#4E5F52] hidden sm:inline">
            Cash on Delivery Available
          </span>
        </div>

        {/* Action Buttons: Quantity, Add to Cart, Buy Now (COD) */}
        <div className="flex items-center gap-3 flex-wrap pt-2">
          <QuantitySelector
            value={quantity}
            onChange={setQuantity}
            min={1}
            max={maxQuantity}
            size="lg"
          />

          <Button
            variant="outline"
            onClick={handleAddToCart}
            disabled={product.inventory.trackQuantity && maxQuantity === 0}
            className="flex-1 min-w-[130px] py-3 rounded-full border-[#1C1D1F] text-[#1C1D1F] hover:bg-[#FAF7F2] font-medium text-xs tracking-wider uppercase"
          >
            {product.inventory.trackQuantity && maxQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>

          <Button
            variant="primary"
            onClick={handleBuyNow}
            disabled={product.inventory.trackQuantity && maxQuantity === 0}
            className="flex-1 min-w-[130px] py-3 rounded-full bg-[#1C1D1F] hover:bg-[#333333] text-[#FAF7F2] font-medium text-xs tracking-wider uppercase shadow-sm"
          >
            Buy Now (COD)
          </Button>
        </div>

        {/* Quick WhatsApp Guidance / Order Button */}
        <button
          onClick={handleWhatsAppClick}
          className="w-full py-2.5 px-4 rounded-full bg-[#FFFFFF] border border-[#E2DDD5] hover:border-[#1C1D1F] text-[#1C1D1F] font-medium text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4 text-[#4E5F52]" />
          <span>Quick WhatsApp Order / Dosage Enquiry</span>
        </button>

        {/* 4-Item Quality Guarantee Grid */}
        <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-[#E2DDD5]">
          {trustBadges.map((badge, index) => (
            <div
              key={index}
              className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#E2DDD5] flex items-start gap-2.5"
            >
              <div className="w-7 h-7 rounded bg-[#FAF7F2] border border-[#E2DDD5] flex items-center justify-center text-[#4E5F52] flex-shrink-0">
                <badge.icon className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-xs text-[#1C1D1F] truncate">{badge.label}</p>
                <p className="text-[10px] text-[#737373] truncate font-sans">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Tabs: Description, Ingredients, Usage, Quality, Verified Reviews */}
      <div className="md:col-span-2 mt-8 pt-8 border-t border-[#E2DDD5]">
        <Tabs items={tabItems} variant="pills" className="w-full" />
      </div>

      {/* Sticky Mobile Buy Now Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="md:hidden fixed bottom-[56px] left-0 right-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-t border-[#E2DDD5] p-2.5 shadow-lg flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-[#E2DDD5] flex-shrink-0 bg-[#FFFFFF]">
                <Image
                  src={getProductImage(product, product.id, 'thumb').src}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-[#1C1D1F] truncate">{product.name}</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-[#1C1D1F]">{formatINR(currentVariant?.price || product.price)}</span>
                  {currentVariant?.compareAtPrice && (
                    <span className="text-[10px] text-[#999999] line-through">{formatINR(currentVariant.compareAtPrice)}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleAddToCart}
                disabled={product.inventory.trackQuantity && maxQuantity === 0}
                className="text-xs px-3 py-1.5 rounded-full border border-[#1C1D1F] text-[#1C1D1F] font-medium"
              >
                Add
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.inventory.trackQuantity && maxQuantity === 0}
                className="text-xs px-3.5 py-1.5 rounded-full bg-[#1C1D1F] text-[#FAF7F2] font-medium"
              >
                Buy Now
              </button>
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
        date: 'Recent Order',
        title: 'Effective without numbness',
        comment: 'Absorbs within 10-15 minutes without eliminating natural sensation. The plant-based Aloe Vera vehicle is gentle on skin with zero burning. Completely discreet delivery.',
        verified: true,
        helpfulCount: 24,
      },
      {
        id: 'rev-sm-2',
        name: 'Alok P.',
        location: 'Hyderabad',
        rating: 5,
        date: 'Recent Order',
        title: 'Calibrated herbal formula',
        comment: 'Pocket-friendly 30ml size with clean metered spray mechanism. Shipped in completely unmarked brown packaging with Cash on Delivery.',
        verified: true,
        helpfulCount: 19,
      },
      {
        id: 'rev-sm-3',
        name: 'Karan T.',
        location: 'Mumbai',
        rating: 5,
        date: 'Recent Order',
        title: 'Reliable and non-greasy',
        comment: 'Much better than western synthetic sprays. No burning or stinging sensation, very easy to use and consistent results.',
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
        location: 'Delhi',
        rating: 5,
        date: 'Recent Order',
        title: 'Total inside-out synergy',
        comment: 'The combo is the best approach. BODY Nutrition gave me sustained daily physical stamina within two weeks, and STAYMAX+ provides calm, dependable endurance without numbness.',
        verified: true,
        helpfulCount: 38,
      },
      {
        id: 'rev-cb-2',
        name: 'Gaurav N.',
        location: 'Jaipur',
        rating: 5,
        date: 'Recent Order',
        title: 'Natural confidence and vigor',
        comment: 'Both products complement each other. Quality packaging, lab verified ingredients, and responsive WhatsApp support when I enquired about dosage.',
        verified: true,
        helpfulCount: 29,
      },
      {
        id: 'rev-cb-3',
        name: 'Neeraj V.',
        location: 'Ahmedabad',
        rating: 5,
        date: 'Recent Order',
        title: 'Authentic formulation',
        comment: 'Delivered in discreet packaging within 48 hours. Genuine Ayurvedic composition that delivers on its promises.',
        verified: true,
        helpfulCount: 17,
      },
    ]
  }

  return [
    {
      id: 'rev-bn-1',
      name: 'Vikram S.',
      location: 'Delhi',
      rating: 5,
      date: 'Recent Order',
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
      date: 'Recent Order',
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
      date: 'Recent Order',
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
        title: 'Review submitted',
        message: 'Thank you for your feedback! Your verified review is now recorded.',
      })
    }, 400)
  }

  return (
    <div className="space-y-6 py-2">
      {/* Summary Header */}
      <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E2DDD5] grid grid-cols-1 md:grid-cols-3 gap-6 items-center shadow-xs">
        <div className="text-center md:text-left space-y-1.5">
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <span className="font-heading text-3xl sm:text-4xl font-normal text-[#1C1D1F]">4.9</span>
            <div>
              <div className="flex text-[#9E8047]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-[11px] text-[#737373] mt-0.5">Verified Patron Reflections</p>
            </div>
          </div>
          <p className="text-xs text-[#4E5F52] font-mono">
            ✓ 100% Genuine Ayurvedic Buyers
          </p>
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-1.5 text-xs text-[#737373]">
          {[
            { stars: '5 Star', pct: 92 },
            { stars: '4 Star', pct: 8 },
            { stars: '3 Star', pct: 0 },
            { stars: '2 Star', pct: 0 },
            { stars: '1 Star', pct: 0 },
          ].map(row => (
            <div key={row.stars} className="flex items-center gap-2">
              <span className="w-12 text-right">{row.stars}</span>
              <div className="flex-1 h-1.5 rounded-full bg-[#F5F1EB] overflow-hidden">
                <div
                  className="h-full bg-[#4E5F52] rounded-full"
                  style={{ width: `${row.pct}%` }}
                />
              </div>
              <span className="w-8 text-right font-mono text-[#1C1D1F]">{row.pct}%</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center md:text-right">
          <Button
            variant="outline"
            onClick={() => setShowForm(!showForm)}
            className="w-full md:w-auto px-5 py-2.5 rounded-full border-[#1C1D1F] text-[#1C1D1F] text-xs font-medium uppercase tracking-wider"
          >
            <MessageSquarePlus className="w-3.5 h-3.5 mr-1.5" />
            {showForm ? 'Close Form' : 'Write a Review'}
          </Button>
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
            className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E2DDD5] space-y-4 overflow-hidden shadow-xs"
          >
            <h3 className="font-heading text-base font-medium text-[#1C1D1F]">Share Your Experience</h3>
            <p className="text-xs text-[#737373]">How has {product.name} contributed to your routine?</p>

            <div className="space-y-1">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#737373]">
                Your Rating
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-[#E2DDD5] hover:text-[#9E8047] transition-colors focus:outline-none"
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      className={classNames(
                        'w-5 h-5',
                        (hoverRating || rating) >= star ? 'fill-current text-[#9E8047]' : 'text-[#E2DDD5]'
                      )}
                    />
                  </button>
                ))}
                <span className="text-xs text-[#1C1D1F] font-mono ml-2">{rating} / 5</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              placeholder="e.g. Noticeable stamina support in 10 days"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <Textarea
              label="Detailed Review"
              placeholder="Describe your dosage routine, effects observed, and packaging..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              required
              rows={3}
            />

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="ghost"
                type="button"
                onClick={() => setShowForm(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                loading={isSubmitting}
                className="px-5 py-2 rounded-full bg-[#1C1D1F] hover:bg-[#333333] text-[#FAF7F2] text-xs font-medium uppercase tracking-wider"
              >
                Submit Review
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      <div className="space-y-3.5">
        {reviews.map(item => (
          <div
            key={item.id}
            className="p-5 rounded-xl bg-[#FFFFFF] border border-[#E2DDD5] space-y-2.5 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E2DDD5] flex items-center justify-center text-xs font-mono font-medium text-[#1C1D1F]">
                  {item.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-xs sm:text-sm text-[#1C1D1F]">{item.name}</span>
                    {item.verified && (
                      <span className="text-[10px] font-mono text-[#4E5F52] bg-[#F5F1EB] px-2 py-0.5 rounded-full border border-[#E2DDD5]">
                        Verified Buyer
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-[#737373]">{item.location} • {item.date}</p>
                </div>
              </div>

              <div className="flex text-[#9E8047]">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-xs sm:text-sm text-[#1C1D1F]">{item.title}</h4>
              <p className="text-xs text-[#555555] leading-relaxed mt-1 italic font-serif">
                &ldquo;{item.comment}&rdquo;
              </p>
            </div>

            <div className="pt-2 border-t border-[#E2DDD5] flex items-center justify-between text-xs">
              <span className="text-[#737373] text-[11px]">
                Product: <strong className="text-[#1C1D1F] font-normal">{product.name}</strong>
              </span>
              <button
                type="button"
                onClick={() => handleHelpful(item.id)}
                disabled={helpfulMap[item.id]}
                className={classNames(
                  'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] transition-colors border',
                  helpfulMap[item.id]
                    ? 'text-[#4E5F52] bg-[#F5F1EB] border-[#4E5F52]/30 cursor-default'
                    : 'text-[#737373] border-[#E2DDD5] hover:text-[#1C1D1F] hover:border-[#1C1D1F]'
                )}
              >
                <ThumbsUp className="w-3 h-3" />
                <span>Helpful ({item.helpfulCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
