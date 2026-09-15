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
        </prose>
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
        </prose>
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
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378 9.86 9.86 0 01-.473-.288 10.3 10.3 0 01-.438-.343c-.172-.214-.35-.44-.556-.684-.228-.268-.46-.578-.693-.89-.234-.312-.42-.614-.53-.75a16.577 16.577 0 01-.203-.587c-.038-.129-.075-.259-.077-.297a.32.32 0 01.12-.22c.153-.118.36-.18.582-.18.143 0 .267.016.39.026.113.012.166.133.108.288-.043.132-.095.306-.14.478-.05.174-.1.41-.12.544-.018.113-.02.153-.02.233 0 .099.02.22.04.443.038.38.22.762.57 1.08.33.295.705.533 1.102.708.43.187.872.279 1.316.279.345 0 .676-.037.986-.11.31-.073.62-.186.92-.32.285-.133.54-.293.785-.477.245-.184.468-.387.658-.588.19-.2.352-.4.472-.588.12-.187.207-.355.25-.47.043-.115.068-.158.068-.334 0-.153-.042-.294-.085-.392-.068-.156-.19-.337-.35-.538-.173-.214-.4-.44-.64-.684-.24-.244-.5-.48-.745-.693-.258-.213-.52-.404-.785-.572a10.6 10.6 0 01-.558-.424 11.18 11.18 0 01-.48-.47c-.15-.15-.28-.28-.44-.44a11.31 11.31 0 01-.4-.44c-.11-.11-.19-.2-.3-.32a.89.89 0 00-.44-.4c-.13-.1-.24-.17-.37-.22a11.5 11.5 0 01-.42-.25 11.88 11.88 0 01-.37-.23c-.12-.07-.21-.1-.32-.14-.1-.04-.2-.06-.3-.06h-.004zm1.71-12.858c.242-.008.497-.008.75-.025.248-.017.51-.04.75-.05.248-.01.488-.025.74-.025.248 0 .498.008.748.033.272.025.506.074.708.149.213.074.398.173.558.3.16.133.272.28.33.448.067.173.108.372.11.558.008.213-.008.418-.008.608 0 .19 0 .372-.017.544-.025.19-.017.373-.04.535-.075.16-.025.308-.058.438-.075.13-.017.24-.025.36-.033a4.5 4.5 0 01.592-.033c.129 0 .258.008.378.017.12.01.24.025.35.04.11.017.213.04.3.074.107.033.207.083.297.14.09.057.17.117.24.183.15.15.287.316.41.506.12.183.208.367.26.545.052.179.075.353.075.525 0 .179-.023.343-.058.49-.025.113-.058.213-.108.3-.05.083-.116.158-.19.213-.083.05-.173.083-.272.108-.1.025-.207.04-.31.05-.103.008-.203.008-.304.008-.1 0-.198-.008-.287-.017-.1-.008-.19-.017-.272-.033-.083-.017-.15-.04-.208-.075-.058-.025-.108-.058-.15-.09-.1-.05-.19-.1-.272-.167-.1-.075-.198-.15-.28-.233-.083-.083-.142-.173-.19-.272-.042-.1-.068-.207-.083-.31-.025-.11-.04-.22-.04-.33 0-.108.008-.216.025-.325.025-.117.05-.225.092-.325.042-.1.085-.19.133-.272.05-.09.1-.183.167-.267.067-.083.142-.15.225-.2.083-.05.167-.09.25-.125.083-.033.167-.058.25-.083.083-.025.167-.042.25-.058.1-.025.2-.033.305-.042.1-.008.2-.008.3-.008.1 0 .197.008.29.025.1.017.19.033.28.05.08.025.158.05.225.083.133.058.257.125.39.217.227.15.438.325.628.53.19.208.367.42.525.64.16.213.308.427.438.645.129.213.233.427.32.64.092.213.158.418.2.625.042.207.067.414.075.62.008.208-.008.414-.025.606-.017.19-.04.373-.075.535-.033.16-.074.31-.116.448-.042.14-.083.268-.133.387-.05.117-.1.225-.158.325-.05.1-.108.19-.167.272-.067.09-.142.167-.225.233-.092.074-.19.142-.29.19-.1.05-.207.083-.317.1-.11.017-.213.025-.325.025-.107 0-.207-.008-.31-.025-.092-.017-.17-.033-.24-.058-.074-.025-.14-.05-.2-.083-.067-.033-.133-.067-.198-.108-.068-.042-.134-.09-.198-.14-.074-.058-.133-.116-.19-.183-.057-.067-.11-.133-.167-.2-.05-.067-.092-.125-.133-.192-.042-.067-.083-.133-.125-.2-.042-.067-.075-.125-.11-.183-.033-.058-.05-.117-.067-.175-.017-.058-.025-.117-.033-.175-.008-.058-.008-.108-.008-.175 0-.067-.008-.117-.008-.175" />
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