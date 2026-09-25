'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingBag, Eye, Sparkles, Shield, Clock, Zap, CheckCircle2 } from 'lucide-react'
import { classNames } from '@/lib/utils/formatters'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { PriceDisplay } from '@/components/ui/PriceDisplay'
import { Rating } from '@/components/ui/Rating'
import type { Product } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUIStore } from '@/store/uiStore'
import { useWhatsAppStore } from '@/store/whatsappStore'
import { buildWhatsAppUrl, buildProductEnquiryMessage } from '@/store/whatsappStore'

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'compact' | 'featured'
  showQuickActions?: boolean
}

export function ProductCard({ product, variant = 'default', showQuickActions = true }: ProductCardProps) {
  const { addItem, isInCart, getItemQuantity } = useCartStore()
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore()
  const { openModal, showToast } = useUIStore()
  const { trackLead } = useWhatsAppStore()

  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0]
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price
  const discountPercentage = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0

  const inCart = isInCart(product.id)
  const inWishlist = isInWishlist(product.id)
  const cartQuantity = getItemQuantity(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (product.ageRestricted) {
      openModal('age-gate', { productId: product.id, productName: product.name, onVerify: () => addItem(product) })
    } else {
      addItem(product)
      showToast({ type: 'success', title: 'Added to cart', message: `${product.name} has been added to your cart` })
    }
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWishlist) {
      showToast({ type: 'info', title: 'Removed from wishlist' })
    } else {
      addToWishlist(product)
      showToast({ type: 'success', title: 'Added to wishlist', message: `${product.name} added to your wishlist` })
    }
  }

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const message = buildProductEnquiryMessage({
      customerName: '',
      productName: product.name,
      quantity: 1,
      enquiry: `Hi, I want to order ${product.name} (Special Price: ₹${(product.price / 100).toFixed(0)}). Please assist with COD/Delivery!`,
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

  // Feature highlight snippet for 3D card
  const getFeatureHighlight = () => {
    if (product.id === 'vitality-power-combo') {
      return {
        badge: '👑 BEST VALUE COMBO',
        pill: 'Inside-Out Stamina + Instant Endurance',
        highlightColor: 'from-amber-500 to-yellow-600',
      }
    }
    if (product.id === 'body-essential-nutrition') {
      return {
        badge: '🌿 100% HERBAL',
        pill: 'Ashwagandha • Shilajit • 60 Caps',
        highlightColor: 'from-emerald-600 to-teal-700',
      }
    }
    return {
      badge: '⚡ FAST ACTION',
      pill: 'Lidocaine 10% • Aloe • 30ml',
      highlightColor: 'from-blue-600 to-indigo-700',
    }
  }

  const feature = getFeatureHighlight()

  if (variant === 'compact') {
    return (
      <Link href={`/product/${product.slug}`} className="flex gap-4 p-3 bg-white rounded-2xl border border-ayur-sand/50 hover:shadow-lg transition-all group">
        <div className="w-20 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-ayur-beige relative">
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
            sizes="80px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-medium text-ayur-black line-clamp-1 group-hover:text-ayur-forest transition-colors">
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
    <article className="group relative rounded-3xl bg-white border border-ayur-sand/50 hover:border-ayur-gold/60 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
      {/* 3D Top Glow Effect */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-ayur-gold/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

      {/* Product Image Stage */}
      <div className="relative">
        <Link href={`/product/${product.slug}`} className="block relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-[#f8f6f0] to-[#ece7dc]" aria-label={`View ${product.name}`}>
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            fill
            priority={product.id === 'vitality-power-combo'}
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/5 to-black/25 opacity-30 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

          {/* 3D Floating Badges (Top Left) */}
          <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10">
            <span className={classNames(
              'px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-wider uppercase text-white shadow-md backdrop-blur-md bg-gradient-to-r',
              feature.highlightColor
            )}>
              {feature.badge}
            </span>

            {hasDiscount && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold text-red-700 bg-red-100/90 border border-red-200 shadow-sm w-fit">
                {discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* Age Restricted Badge / Category Badge (Top Right) */}
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 z-10">
            {product.ageRestricted && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold text-ayur-copper bg-white/90 border border-ayur-copper/30 shadow-sm">
                18+
              </span>
            )}
            <button
              onClick={handleWishlistToggle}
              className={classNames(
                'w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110',
                inWishlist ? 'text-red-500 bg-red-50' : 'text-ayur-stone hover:text-red-500'
              )}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={classNames('w-4.5 h-4.5', inWishlist && 'fill-current text-red-500')} />
            </button>
          </div>

          {/* Hover Quick Action Tray */}
          {showQuickActions && (
            <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex gap-2 justify-center z-10">
              <button
                onClick={handleWhatsAppClick}
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-lg flex items-center justify-center gap-1.5 transition-all"
                title="Quick WhatsApp Enquiry"
              >
                <span>WhatsApp Order</span>
              </button>
              <button
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  openModal('quick-view', { product })
                }}
                className="w-9 h-9 rounded-xl bg-white/95 text-ayur-forest hover:bg-white flex items-center justify-center shadow-lg transition-all"
                title="Quick View"
              >
                <Eye className="w-4.5 h-4.5" />
              </button>
            </div>
          )}
        </Link>
      </div>

      {/* Card Content Stage */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-white">
        <div>
          {/* Rating & Fast Pill */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1">
              <Rating rating={4.9} size="sm" />
              <span className="text-ayur-stone text-[11px] font-medium ml-1">4.9 (1.2k+)</span>
            </div>
            <span className="text-[11px] font-medium text-ayur-forest/80 bg-ayur-mint-soft/80 px-2 py-0.5 rounded-full">
              {product.category === 'supplements' ? 'Supplements' : product.category === 'wellness' ? 'Combo Kit' : 'Personal Care'}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-heading font-semibold text-base sm:text-lg text-ayur-black line-clamp-1 group-hover:text-ayur-forest transition-colors">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>

          {/* Subtitle / Key herbs pill */}
          <p className="text-xs text-ayur-gold font-medium mt-1 tracking-wide flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-ayur-gold flex-shrink-0" />
            <span className="truncate">{feature.pill}</span>
          </p>

          {/* Short description */}
          <p className="text-xs text-ayur-stone line-clamp-2 mt-1.5 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & CTA Block */}
        <div className="pt-3 border-t border-ayur-sand/40 space-y-3">
          <div className="flex items-baseline justify-between">
            <PriceDisplay price={product.price} compareAtPrice={product.compareAtPrice} size="md" />
            <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Free Shipping
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {inCart ? (
              <div className="col-span-2 flex items-center justify-between bg-ayur-mint-soft/60 p-1.5 rounded-xl border border-ayur-forest/20">
                <span className="text-xs font-semibold text-ayur-forest pl-2.5">In Cart ({cartQuantity})</span>
                <Button size="sm" variant="outline" className="text-xs py-1 px-3 border-ayur-forest text-ayur-forest hover:bg-ayur-forest hover:text-white" onClick={() => openModal('cart')}>
                  View Cart
                </Button>
              </div>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleAddToCart}
                  disabled={product.inventory.trackQuantity && product.inventory.quantity === 0}
                  className="w-full text-xs font-bold border-ayur-forest/40 text-ayur-forest hover:bg-ayur-mint-soft hover:border-ayur-forest transition-all rounded-xl py-2"
                >
                  Add to Cart
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={e => {
                    handleAddToCart(e)
                    openModal('cart')
                  }}
                  disabled={product.inventory.trackQuantity && product.inventory.quantity === 0}
                  className="w-full text-xs font-bold bg-gradient-to-r from-ayur-forest to-ayur-leaf text-white hover:brightness-110 shadow-md transition-all rounded-xl py-2"
                >
                  Buy Now
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}