'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Heart, ShoppingBag, Eye, Sparkles, Shield, CheckCircle2, Plus, Truck, Lock, RotateCcw, Leaf } from 'lucide-react'
import { PriceDisplay } from '@/components/ui/PriceDisplay'
import { Rating } from '@/components/ui/Rating'
import type { Product } from '@/types'
import { getProductImage } from '@/lib/products/registry'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUserStore } from '@/store/userStore'
import { useUIStore } from '@/store/uiStore'
import { useWhatsAppStore, buildWhatsAppUrl, buildProductEnquiryMessage } from '@/store/whatsappStore'
import { trackEvent } from '@/lib/analytics'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'compact' | 'featured'
  showQuickActions?: boolean
}

export function ProductCard({ product, variant = 'default', showQuickActions = true }: ProductCardProps) {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const { addItem, isInCart, getItemQuantity } = useCartStore()
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore()
  const { user, isAuthenticated } = useUserStore()
  const { openModal, openCartDrawer, showToast, isAgeVerified } = useUIStore()
  const { trackLead } = useWhatsAppStore()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const primaryImage = getProductImage(product, product.id, variant === 'compact' ? 'thumb' : 'card')
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

    if (product.ageRestricted && !isAgeVerified(product.id)) {
      openModal('age-gate', {
        productId: product.id,
        productName: product.name,
        onVerify: () => {
          addItem(product)
          openCartDrawer()
          showToast({
            type: 'success',
            title: 'Added to Cart',
            message: `${product.name} has been added to your cart.`,
          })
        },
      })
      return
    }

    addItem(product)
    trackEvent('add_to_cart', {
      productId: product.id,
      productName: product.name,
      price: product.price,
    })
    openCartDrawer()
    showToast({
      type: 'success',
      title: 'Added to Cart',
      message: `${product.name} has been added to your cart.`,
    })
  }

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (product.ageRestricted && !isAgeVerified(product.id)) {
      openModal('age-gate', {
        productId: product.id,
        productName: product.name,
        onVerify: () => {
          addItem(product)
          router.push('/checkout')
        },
      })
      return
    }

    addItem(product)
    router.push('/checkout')
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

    const primaryAddr = user?.addresses?.[0]
    const userCity = primaryAddr ? [primaryAddr.city, primaryAddr.state].filter(Boolean).join(', ') : ''
    const message = buildProductEnquiryMessage({
      customerName: user?.name || '',
      customerPhone: user?.phone || '',
      customerCity: userCity,
      productName: product.name,
      quantity: 1,
      price: product.price,
      enquiry: `Hi Ayur Veda Global, I want to order ${product.name} with Cash on Delivery (COD). Please assist with dispatch and delivery details.`,
      source: 'product',
    })
    trackLead({
      source: 'product',
      productId: product.id,
      productName: product.name,
      customerName: user?.name,
      customerPhone: user?.phone,
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
      }
    }
    if (product.id === 'body-essential-nutrition') {
      return {
        badge: 'Herbal Rasayana',
        pill: 'Ashwagandha • Shilajit • 60 Caps',
      }
    }
    if (product.id === 'hair-regrow-kit') {
      return {
        badge: 'Dual Kit',
        pill: '100ml Oil + 60 Botanical Capsules',
      }
    }
    if (product.id === 'hair-regrow-capsules') {
      return {
        badge: 'Hair Nutrients',
        pill: 'Bhringraj & Amla Root Micronutrients',
      }
    }
    if (product.id === 'hair-regrow-oil') {
      return {
        badge: 'Scalp Taila',
        pill: 'Bhringraj & Rosemary Scalp Oil (100ml)',
      }
    }
    if (product.id === 'staymax-delay-spray') {
      return {
        badge: 'Topical Spray',
        pill: 'Herbal Delay • Aloe & Vit E • 30ml',
      }
    }
    return {
      badge: 'Classical Rasayana',
      pill: product.tagline || 'Classical Rasayana Formulation',
    }
  }

  const feature = getFeatureHighlight()

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    openModal('quick-view', { product })
  }

  if (variant === 'compact') {
    return (
      <Link
        href={`/product/${product.slug}`}
        className="flex gap-3.5 p-2.5 bg-[#FFFFFF] rounded-xl border border-[#999999]/35 hover:border-[#1C1D1F] transition-colors group"
      >
        <div className="w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-[#FAF7F2] relative">
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="64px"
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h4 className="font-heading font-normal text-xs sm:text-sm text-[#1C1D1F] line-clamp-1 group-hover:text-[#9E8047] transition-colors">
            {product.name}
          </h4>
          <p className="text-[11px] text-[#737373] line-clamp-1 mt-0.5 font-sans">{product.shortDescription}</p>
          <div className="mt-1.5">
            <PriceDisplay price={product.price} compareAtPrice={product.compareAtPrice} size="sm" />
          </div>
        </div>
      </Link>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.22 } }}
      className="group relative rounded-2xl border border-[#999999]/35 bg-[#FFFFFF] hover:border-[#1C1D1F] transition-colors flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md"
    >
      {/* Product Image Stage */}
      <div className="relative">
        <Link
          href={`/product/${product.slug}`}
          className="block relative aspect-[4/5] overflow-hidden bg-[#FAF7F2]"
          aria-label={`View ${product.name}`}
        >
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            fill
            priority={product.id === 'vitality-power-combo'}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Discreet courtesy badge if on sale */}
          {hasDiscount && (
            <div className="absolute top-3 left-3 z-10 pointer-events-none">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wider text-[#1C1D1F] bg-[#FAF7F2]/95 border border-[#999999]/40 shadow-xs">
                {discountPercentage}% Courtesy
              </span>
            </div>
          )}

          {/* Top-Right Action Pill: Quick View + Wishlist */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleQuickView}
              className="w-8 h-8 rounded-full bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] backdrop-blur-sm flex items-center justify-center border border-[#999999]/35 text-[#737373] hover:text-[#1C1D1F] hover:border-[#1C1D1F] transition-colors shadow-xs"
              aria-label="Quick view formulation"
              title="Quick View"
            >
              <Eye className="w-3.5 h-3.5" />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleWishlistToggle}
              className={`w-8 h-8 rounded-full bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] backdrop-blur-sm flex items-center justify-center border border-[#999999]/35 transition-colors shadow-xs ${
                inWishlist ? 'text-red-500 border-red-200' : 'text-[#737373] hover:text-[#1C1D1F] hover:border-[#1C1D1F]'
              }`}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
              title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-current text-red-500' : ''}`} />
            </motion.button>
          </div>
        </Link>
      </div>

      {/* Card Content Stage: Botanical Badge → Product Name → Purpose/Description → Price → Actions */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-[#FFFFFF]">
        <div className="space-y-1.5">
          {/* Nature Botanic Tag */}
          <div className="inline-flex items-center gap-1.5 text-[10.5px] font-mono text-[#4E5F52] bg-[#FAF7F2] border border-[#999999]/30 px-2 py-0.5 rounded-full">
            <Leaf className="w-3 h-3 text-[#4E5F52] flex-shrink-0" />
            <span className="truncate">{feature.pill}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-heading font-medium text-base text-[#1C1D1F] line-clamp-1 group-hover:text-[#9E8047] transition-colors">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>

          {/* Product Description */}
          <p className="text-xs text-[#555555] line-clamp-2 leading-relaxed font-sans">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & CTA Block */}
        <div className="pt-3 border-t border-[#999999]/25 space-y-3">
          <div className="flex items-baseline justify-between">
            <PriceDisplay price={product.price} compareAtPrice={product.compareAtPrice} size="md" />
            <span className="text-[11px] text-[#737373] font-sans flex items-center gap-1">
              <Truck className="w-3 h-3 text-[#4E5F52]" />
              <span>Free Delivery</span>
            </span>
          </div>

          {/* Action Buttons: Add to Cart + View Details */}
          <div className="grid grid-cols-2 gap-2">
            {inCart ? (
              <div className="col-span-2 flex items-center justify-between bg-[#FAF7F2] p-1.5 px-3 rounded-full border border-[#999999]/40">
                <span className="text-xs font-mono text-[#1C1D1F]">
                  In Cart ({cartQuantity})
                </span>
                <button
                  className="text-xs py-1 px-3 bg-[#1C1D1F] text-[#FAF7F2] font-medium rounded-full hover:bg-[#333333] transition-colors font-sans uppercase tracking-wider inline-flex items-center gap-1"
                  onClick={() => openCartDrawer()}
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>View Cart</span>
                </button>
              </div>
            ) : (
              <>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAddToCart}
                  disabled={product.inventory.trackQuantity && product.inventory.quantity === 0}
                  className="w-full text-xs font-medium py-2 px-2.5 rounded-full border border-[#1C1D1F] bg-[#FAF7F2] hover:bg-[#1C1D1F] hover:text-[#FAF7F2] text-[#1C1D1F] transition-colors inline-flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </motion.button>
                <Link
                  href={`/product/${product.slug}`}
                  className="w-full text-xs font-medium py-2 px-2.5 rounded-full bg-[#1C1D1F] hover:bg-[#333333] text-[#FAF7F2] transition-transform active:scale-95 text-center inline-flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Details</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}