'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Share2, Truck, Shield, RotateCcw, Leaf, Check, X, Minus, Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { classNames } from '@/lib/utils/formatters'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { PriceDisplay } from '@/components/ui/PriceDisplay'
import { Rating } from '@/components/ui/Rating'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { Tabs } from '@/components/ui/Tabs'
import { ImageGallery } from '@/components/ui/ImageGallery'
import { Accordion } from '@/components/ui/Accordion'
import type { Product, ProductVariant } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUIStore } from '@/store/uiStore'
import { useWhatsAppStore } from '@/store/whatsappStore'
import { buildWhatsAppUrl, buildProductEnquiryMessage } from '@/store/whatsappStore'
import { formatINR } from '@/lib/utils/formatters'

interface ProductDetailsProps {
  product: Product
  selectedVariant?: ProductVariant
  onVariantChange?: (variant: ProductVariant) => void
}

export function ProductDetails({ product, selectedVariant, onVariantChange }: ProductDetailsProps) {
  const { addItem, isInCart, getItemQuantity } = useCartStore()
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore()
  const { openModal, showToast } = useUIStore()
  const { trackLead } = useWhatsAppStore()

  const [quantity, setQuantity] = useState(1)
  const [selectedVariantId, setSelectedVariantId] = useState(selectedVariant?.id || product.variants[0]?.id)
  const currentVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0]

  const inCart = isInCart(product.id, selectedVariantId)
  const inWishlist = isInWishlist(product.id, selectedVariantId)
  const cartQuantity = getItemQuantity(product.id, selectedVariantId)
  const maxQuantity = currentVariant?.inventory || product.inventory.quantity

  const handleAddToCart = () => {
    if (product.ageRestricted) {
      openModal('age-gate', { productId: product.id, productName: product.name, onVerify: () => addItem(product, selectedVariantId, quantity) })
    } else {
      addItem(product, selectedVariantId, quantity)
      showToast({ type: 'success', title: 'Added to cart', message: `${product.name} has been added to your cart` })
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
        <div className="prose prose-ayur max-w-none">
          <p className="text-ayur-forest leading-relaxed whitespace-pre-wrap">{product.description}</p>
        </div>
      ),
    },
    {
      label: 'Ingredients',
      content: (
        <div className="space-y-3">
          {product.ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-ayur-cream rounded-lg">
              <Check className="w-5 h-5 text-ayur-sage flex-shrink-0 mt-0.5" />
              <span className="text-ayur-forest">{ingredient}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: 'Usage',
      content: (
        <div className="prose prose-ayur max-w-none">
          <p className="text-ayur-forest leading-relaxed whitespace-pre-wrap">{product.usage}</p>
        </div>
      ),
    },
    {
      label: 'Warnings',
      content: (
        <div className="space-y-3">
          {product.warnings.map((warning, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
              <X className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <span className="text-red-700">{warning}</span>
            </div>
          ))}
        </div>
      ),
    },
  ]

  const trustBadges = [
    { icon: Truck, label: 'Free Shipping', desc: 'On orders above ₹999' },
    { icon: Shield, label: 'Authentic', desc: '100% genuine herbs' },
    { icon: RotateCcw, label: 'Easy Returns', desc: '7-day return policy' },
    { icon: Leaf, label: 'Natural', desc: 'No harmful chemicals' },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <div className="space-y-4">
        <ImageGallery images={product.images} alt={product.name} />
      </div>

      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              {product.category === 'supplements' && <Badge variant="sage">Supplement</Badge>}
              {product.category === 'personal-care' && <Badge variant="gold">Personal Care</Badge>}
              {product.category === 'wellness' && <Badge variant="sage">Wellness</Badge>}
              {product.ageRestricted && <Badge variant="age">18+</Badge>}
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-medium text-ayur-black">{product.name}</h1>
            <p className="mt-2 text-ayur-stone text-lg">{product.tagline}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleWishlistToggle}
              className={classNames(
                'p-2 rounded-lg transition-colors',
                inWishlist ? 'bg-red-50 text-red-600' : 'bg-ayur-cream text-ayur-stone hover:bg-ayur-beige hover:text-ayur-copper'
              )}
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={classNames('w-5 h-5', inWishlist && 'fill-current')} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-ayur-cream text-ayur-stone hover:bg-ayur-beige transition-colors"
              aria-label="Share product"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-baseline gap-4 flex-wrap">
          <PriceDisplay price={currentVariant?.price || product.price} compareAtPrice={currentVariant?.compareAtPrice || product.compareAtPrice} size="xl" />
          <Rating rating={4.5} showValue reviewsCount={0} size="lg" />
        </div>

        <p className="text-ayur-forest leading-relaxed">{product.shortDescription}</p>

        {product.variants.length > 1 && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-ayur-forest">Select Variant</label>
            <div className="flex flex-wrap gap-3">
              {product.variants.map(variant => (
                <button
                  key={variant.id}
                  onClick={() => {
                    setSelectedVariantId(variant.id)
                    onVariantChange?.(variant)
                  }}
                  className={classNames(
                    'px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all',
                    selectedVariantId === variant.id
                      ? 'border-ayur-forest bg-ayur-forest/5 text-ayur-forest'
                      : 'border-ayur-sand text-ayur-forest hover:border-ayur-forest'
                  )}
                  disabled={variant.inventory === 0}
                >
                  {variant.name} - {formatINR(variant.price)}
                  {variant.inventory === 0 && <span className="ml-2 text-ayur-copper">(Out of stock)</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 flex-wrap">
          <QuantitySelector
            value={quantity}
            onChange={setQuantity}
            min={1}
            max={maxQuantity}
            size="lg"
          />
          <Button
            size="lg"
            onClick={handleAddToCart}
            disabled={product.inventory.trackQuantity && maxQuantity === 0}
            className="flex-1 min-w-[200px]"
          >
            {product.inventory.trackQuantity && maxQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>

        <Button
          variant="whatsapp"
          size="lg"
          onClick={handleWhatsAppClick}
          className="w-full sm:w-auto flex-1 min-w-[200px] gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.5 14.4c-.3-.1-1.8-.9-2-.9-.3-.1-.5-.1-.7.2-.2.3-.8 1-.9 1.2-.2.2-.4.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.2-.2-.2-.3-.3-.3-.5 0-.2 0-.4-.1-.5-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5-.2 0-.4 0-.6 0-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5 0 1.5 1.1 2.9 1.2 3.1.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.5-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4 0-.1-.3-.2-.6-.3" />
          </svg>
          Enquire on WhatsApp
        </Button>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-ayur-beige">
          {trustBadges.map((badge, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-ayur-forest/10 flex items-center justify-center flex-shrink-0">
                <badge.icon className="w-5 h-5 text-ayur-forest" />
              </div>
              <div>
                <p className="font-medium text-ayur-black text-sm">{badge.label}</p>
                <p className="text-xs text-ayur-stone">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Tabs items={tabItems} variant="pills" className="mt-4" />
    </div>
  )
}