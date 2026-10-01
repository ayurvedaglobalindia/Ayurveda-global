'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, ShoppingBag, ArrowRight, Shield, Check, Heart } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { PriceDisplay } from '@/components/ui/PriceDisplay'
import { Rating } from '@/components/ui/Rating'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useUIStore } from '@/store/uiStore'
import { useWhatsAppStore, buildWhatsAppUrl, buildProductEnquiryMessage } from '@/store/whatsappStore'
import type { Product } from '@/types'

interface ProductQuickViewModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function ProductQuickViewModal({ product, isOpen, onClose }: ProductQuickViewModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const { addItem } = useCartStore()
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore()
  const { openModal, showToast } = useUIStore()
  const { trackLead } = useWhatsAppStore()

  if (!product) return null

  const inWishlist = isInWishlist(product.id)
  const currentImage = product.images[selectedImageIndex] || product.images[0]

  const handleAddToCart = () => {
    addItem(product, undefined, quantity)
    showToast({
      type: 'success',
      title: 'Added to Cart',
      message: `${quantity}x ${product.name} added to cart`,
    })
    onClose()
  }

  const handleBuyNow = () => {
    addItem(product, undefined, quantity)
    onClose()
    openModal('cart')
  }

  const handleWhatsAppOrder = () => {
    const message = buildProductEnquiryMessage({
      customerName: '',
      productName: product.name,
      quantity,
      enquiry: `Hi Mageesh / Ayur Veda Global team! I would like to order ${quantity}x ${product.name} (Special Price: ₹${((product.price * quantity) / 100).toFixed(0)}). Please confirm COD availability.`,
      source: 'quick-view',
    })
    trackLead({
      source: 'quick-view',
      productId: product.id,
      productName: product.name,
      quantity,
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: '',
      referrer: '',
    })
    window.open(buildWhatsAppUrl(message), '_blank')
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      showToast({ type: 'info', title: 'Removed from Wishlist' })
    } else {
      addToWishlist(product)
      showToast({ type: 'success', title: 'Added to Wishlist', message: `${product.name} added to your wishlist` })
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      title={product.name}
      showCloseButton
    >
      <div className="grid md:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Image Stage */}
        <div className="md:col-span-6 space-y-3">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-b from-[#f9f8f4] to-[#ede7dc] border border-ayur-sand/50 shadow-inner flex items-center justify-center">
            <Image
              src={currentImage.src}
              alt={currentImage.alt || product.name}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
            {product.ageRestricted && (
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-bold text-ayur-copper bg-white/95 border border-ayur-copper/30 shadow-sm">
                18+ Adult
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 justify-center">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-14 h-16 rounded-xl overflow-hidden border-2 transition-all bg-white shadow-sm ${
                    selectedImageIndex === idx
                      ? 'border-ayur-gold ring-2 ring-ayur-gold/25'
                      : 'border-ayur-sand/60 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img.src} alt="" fill className="object-contain p-1" sizes="56px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="md:col-span-6 space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-ayur-forest bg-ayur-mint-soft px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {product.category === 'supplements' ? 'Herbal Supplement' : product.category === 'wellness' ? 'Power Combo' : 'Personal Care'}
              </span>
              <Rating rating={4.9} size="sm" showValue reviewsCount={1200} />
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-medium text-ayur-black">
              {product.name}
            </h3>
            <p className="text-xs sm:text-sm text-ayur-stone">
              {product.tagline}
            </p>
          </div>

          {/* Price Box */}
          <div className="p-3.5 rounded-2xl bg-ayur-cream/80 border border-ayur-sand/60 flex items-center justify-between">
            <PriceDisplay
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              size="lg"
            />
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs font-bold bg-ayur-gold text-black px-2.5 py-1 rounded-lg shadow-sm">
                SAVE {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-ayur-stone/90 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Quantity and Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-ayur-forest">Quantity:</span>
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                min={1}
                max={10}
                size="sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <Button
                variant="outline"
                size="md"
                onClick={handleAddToCart}
                className="w-full text-xs font-bold border-ayur-forest text-ayur-forest hover:bg-ayur-forest hover:text-white rounded-xl"
              >
                Add to Cart
              </Button>
              <Button
                variant="gold"
                size="md"
                onClick={handleBuyNow}
                className="w-full text-xs font-bold rounded-xl shadow-md"
              >
                Buy Now
              </Button>
            </div>

            <Button
              variant="whatsapp"
              size="md"
              onClick={handleWhatsAppOrder}
              className="w-full text-xs font-bold rounded-xl shadow-sm"
            >
              Order via WhatsApp (COD)
            </Button>
          </div>

          {/* Full Details Link */}
          <div className="pt-2 border-t border-ayur-sand/30 flex items-center justify-between">
            <Link
              href={`/product/${product.slug}`}
              onClick={onClose}
              className="text-xs font-bold text-ayur-forest hover:text-ayur-gold flex items-center gap-1 transition-colors"
            >
              <span>View Complete Product Dossier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleWishlistToggle}
              className={`p-2 rounded-xl border transition-colors ${
                inWishlist ? 'border-red-300 bg-red-50 text-red-600' : 'border-ayur-sand text-ayur-stone hover:text-red-500'
              }`}
              aria-label="Add to wishlist"
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
