'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingBag, Eye, Sparkles, Shield, CheckCircle2, Plus, Truck, Lock, RotateCcw } from 'lucide-react'
import { PriceDisplay } from '@/components/ui/PriceDisplay'
import { Rating } from '@/components/ui/Rating'
import type { Product } from '@/types'
import { getProductImage } from '@/lib/products/registry'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUIStore } from '@/store/uiStore'
import { useWhatsAppStore, buildWhatsAppUrl, buildProductEnquiryMessage } from '@/store/whatsappStore'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'compact' | 'featured'
  showQuickActions?: boolean
}

export function ProductCard({ product, variant = 'default', showQuickActions = true }: ProductCardProps) {
  const [isMounted, setIsMounted] = useState(false)
  const { addItem, isInCart, getItemQuantity } = useCartStore()
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore()
  const { openModal, openCartDrawer, showToast } = useUIStore()
  const { trackLead } = useWhatsAppStore()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const primaryImage = getProductImage(product, product.id)
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price
  const discountPercentage = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0

  const inCart = isMounted && isInCart(product.id)
  const inWishlist = isMounted && isInWishlist(product.id)
  const cartQuantity = isMounted ? getItemQuantity(product.id) : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (product.ageRestricted) {
      openModal('age-gate', {
        productId: product.id,
        productName: product.name,
        onVerify: () => {
          addItem(product)
          openCartDrawer()
        },
      })
    } else {
      addItem(product)
      openCartDrawer()
      showToast({
        type: 'success',
        title: 'Added to cart',
        message: `${product.name} has been added to your cart.`,
      })
    }
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWishlist) {
      showToast({ type: 'info', title: 'Removed from wishlist' })
    } else {
      addToWishlist(product)
      showToast({
        type: 'success',
        title: 'Added to wishlist',
        message: `${product.name} added to your wishlist.`,
      })
    }
  }

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const message = buildProductEnquiryMessage({
      customerName: '',
      productName: product.name,
      quantity: 1,
      enquiry: `Hi Ayur Veda Global, I want to order ${product.name} (Special Price: ₹${(product.price / 100).toFixed(0)}). Please assist with COD/Delivery!`,
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

  const getFeatureHighlight = () => {
    if (product.id === 'vitality-power-combo') {
      return {
        badge: 'Master Combo',
        pill: 'Inside-Out Stamina + Instant Endurance',
        icon: '👑',
      }
    }
    if (product.id === 'body-essential-nutrition') {
      return {
        badge: 'Herbal Rasayana',
        pill: 'Ashwagandha • Shilajit • 60 Caps',
        icon: '🌿',
      }
    }
    return {
      badge: 'Fast Action',
      pill: 'Lidocaine 10% • Aloe • 30ml',
      icon: '⚡',
    }
  }

  const feature = getFeatureHighlight()

  if (variant === 'compact') {
    return (
      <Link
        href={`/product/${product.slug}`}
        className="flex gap-4 p-3 bg-ayur-charcoal/85 backdrop-blur-md rounded-2xl border border-ayur-gold/25 hover:border-ayur-gold/60 shadow-lg transition-all group"
      >
        <div className="w-20 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-ayur-void relative">
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            fill
            className="object-contain p-1 group-hover:scale-105 transition-transform duration-500"
            sizes="80px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-medium text-ayur-ivory line-clamp-1 group-hover:text-ayur-gold-light transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-ayur-stone line-clamp-1 mt-1">{product.shortDescription}</p>
          <div className="mt-2">
            <PriceDisplay price={product.price} compareAtPrice={product.compareAtPrice} size="sm" />
          </div>
        </div>
      </Link>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="card-luxury card-3d group relative rounded-2xl border border-ayur-gold/25 hover:border-ayur-gold/75 shadow-xl transition-all duration-500 flex flex-col justify-between overflow-hidden"
    >
      {/* 3D Top Gold Border Glow */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-ayur-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

      {/* Product Image Stage */}
      <div className="relative">
        <Link
          href={`/product/${product.slug}`}
          className="block relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-ayur-void to-ayur-charcoal"
          aria-label={`View ${product.name}`}
        >
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            fill
            priority={product.id === 'vitality-power-combo'}
            className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-108"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Ambient Lighting Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-ayur-void/80 via-transparent to-ayur-void/20 pointer-events-none" />

          {/* 3D Badges (Top Left) */}
          <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10 pointer-events-none">
            <span className="px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-lg backdrop-blur-md bg-gradient-to-r from-ayur-forest-deep to-ayur-forest text-ayur-cream border border-ayur-gold/30">
              {feature.badge}
            </span>

            {hasDiscount && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold text-ayur-void bg-gradient-to-r from-ayur-gold-light to-ayur-gold border border-ayur-gold shadow-sm w-fit">
                {discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* Wishlist Button (Top Right) */}
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 z-10">
            {product.ageRestricted && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold text-ayur-crimson-light bg-ayur-crimson/20 border border-ayur-crimson/40 shadow-sm">
                18+
              </span>
            )}
            <button
              onClick={handleWishlistToggle}
              className={`w-9 h-9 rounded-full bg-ayur-charcoal/80 backdrop-blur-md flex items-center justify-center border border-ayur-forest-dark/50 shadow-md transition-all duration-300 hover:scale-110 hover:border-ayur-gold/50 ${
                inWishlist ? 'text-ayur-crimson-light bg-ayur-crimson/20 border-ayur-crimson/50' : 'text-ayur-stone hover:text-ayur-gold'
              }`}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-4.5 h-4.5 ${inWishlist ? 'fill-current text-ayur-crimson-light' : ''}`} />
            </button>
          </div>

          {/* Hover Quick Action Overlay */}
          {showQuickActions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-3 inset-x-3 flex gap-2 justify-center z-10"
            >
              <button
                onClick={handleWhatsAppClick}
                className="btn-emerald flex-1 py-2 px-3 rounded-xl text-xs font-semibold shadow-lg flex items-center justify-center gap-1.5 transition-all"
                title="Quick WhatsApp Enquiry"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
              <button
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  openModal('quick-view', { product })
                }}
                className="w-9 h-9 rounded-xl bg-ayur-charcoal/90 text-ayur-gold-light border border-ayur-gold/40 hover:bg-ayur-forest-dark flex items-center justify-center shadow-lg transition-all"
                title="Quick View"
              >
                <Eye className="w-4.5 h-4.5" />
              </button>
            </motion.div>
          )}
        </Link>
      </div>

      {/* Card Content Stage */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-ayur-forest-deep/90">
        <div>
          {/* Rating & Category Pill */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Rating rating={4.9} size="sm" />
              <span className="text-ayur-stone text-[11px] font-medium ml-1">4.9 (1.2k+)</span>
            </div>
            <span className="text-[10px] font-bold text-ayur-gold-light bg-ayur-gold/15 border border-ayur-gold/35 px-2.5 py-0.5 rounded-full">
              {product.category === 'supplements'
                ? 'Supplements'
                : product.category === 'wellness'
                ? 'Power Combo'
                : 'Personal Care'}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-heading font-semibold text-base sm:text-lg text-ayur-ivory line-clamp-1 group-hover:text-ayur-gold-light transition-colors">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>

          {/* Pill Subtitle */}
          <p className="text-xs text-ayur-sand font-medium mt-1 tracking-wide flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-ayur-gold flex-shrink-0" />
            <span className="truncate">{feature.pill}</span>
          </p>

          {/* Description */}
          <p className="text-xs text-ayur-stone line-clamp-2 mt-1.5 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & CTA Block */}
        <div className="pt-3 border-t border-ayur-gold/20 space-y-3">
          <div className="flex items-baseline justify-between">
            <PriceDisplay price={product.price} compareAtPrice={product.compareAtPrice} size="md" />
            <span className="text-[10px] font-semibold text-ayur-gold-light bg-ayur-charcoal px-2.5 py-0.5 rounded-md border border-ayur-gold/30">
              Free Express Shipping
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {inCart ? (
              <div className="col-span-2 flex items-center justify-between bg-ayur-gold/15 p-1.5 rounded-xl border border-ayur-gold/35">
                <span className="text-xs font-semibold text-ayur-gold-light pl-2.5">
                  In Cart ({cartQuantity})
                </span>
                <button
                  className="text-xs py-1.5 px-3 bg-ayur-gold text-ayur-void font-bold rounded-lg hover:bg-ayur-gold-light transition-colors"
                  onClick={() => openCartDrawer()}
                >
                  View Cart
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={handleAddToCart}
                  disabled={product.inventory.trackQuantity && product.inventory.quantity === 0}
                  className="btn-gold-outline w-full text-xs font-semibold py-2.5 rounded-xl"
                >
                  Add to Cart
                </button>
                <button
                  onClick={e => {
                    handleAddToCart(e)
                  }}
                  disabled={product.inventory.trackQuantity && product.inventory.quantity === 0}
                  className="btn-gold w-full text-xs font-bold py-2.5 rounded-xl shadow-lg"
                >
                  Buy Now (COD)
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}