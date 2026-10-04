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
import { useUserStore } from '@/store/userStore'
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
  const { user, isAuthenticated } = useUserStore()
  const { openModal, showToast } = useUIStore()
  const { trackLead } = useWhatsAppStore()

  if (!product) return null

  const inWishlist = isInWishlist(product.id)
  const currentImage = product.images[selectedImageIndex] || product.images[0]

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      onClose()
      openModal('auth-gate', {
        product,
        quantity,
        mode: 'add-to-cart',
      })
      return
    }
    addItem(product, undefined, quantity)
    showToast({
      type: 'success',
      title: 'Added to Cart',
      message: `${quantity}x ${product.name} added to cart`,
    })
    onClose()
  }

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      onClose()
      openModal('auth-gate', {
        product,
        quantity,
        mode: 'buy-now',
      })
      return
    }
    addItem(product, undefined, quantity)
    onClose()
    openModal('cart')
  }

  const handleWhatsAppOrder = () => {
    const primaryAddr = user?.addresses?.[0]
    const userCity = primaryAddr ? [primaryAddr.city, primaryAddr.state].filter(Boolean).join(', ') : ''
    const message = buildProductEnquiryMessage({
      customerName: user?.name || '',
      customerPhone: user?.phone || '',
      customerCity: userCity,
      productName: product.name,
      quantity,
      price: product.price * quantity,
      enquiry: `Hi Ayur Veda Global team! I would like to order ${quantity}x ${product.name} with Cash on Delivery (COD). Please confirm dispatch & delivery timeline.`,
      source: 'quick-view',
    })
    trackLead({
      source: 'quick-view',
      productId: product.id,
      productName: product.name,
      customerName: user?.name,
      customerPhone: user?.phone,
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
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-b from-[#13281C] via-[#0E1E14] to-[#0A160F] border border-[#C2A265]/30 shadow-xl flex items-center justify-center">
            <Image
              src={currentImage.src}
              alt={currentImage.alt || product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
            {product.ageRestricted && (
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-bold text-[#E5A855] bg-[#0B150F]/90 border border-[#C2A265]/40 shadow-sm">
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
                  className={`relative w-14 h-16 rounded-xl overflow-hidden border-2 transition-all bg-[#0B150F] shadow-sm ${
                    selectedImageIndex === idx
                      ? 'border-[#C2A265] ring-2 ring-[#C2A265]/25'
                      : 'border-[#C2A265]/20 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img.src} alt="" fill className="object-cover" sizes="56px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="md:col-span-6 space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-ayur-gold bg-[#0A2E1E] border border-ayur-gold/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {product.category === 'supplements' ? 'Herbal Supplement' : product.category === 'wellness' ? 'Power Combo' : 'Personal Care'}
              </span>
              <Rating rating={4.9} size="sm" showValue reviewsCount={1200} />
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-medium text-ayur-ivory">
              {product.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#C4BDA8]">
              {product.tagline}
            </p>
          </div>

          {/* Price Box */}
          <div className="p-3.5 rounded-2xl bg-[#0B150F] border border-ayur-gold/30 flex items-center justify-between">
            <PriceDisplay
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              size="lg"
            />
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs font-bold bg-ayur-gold text-[#0B150F] px-2.5 py-1 rounded-lg shadow-sm">
                SAVE {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-[#C4BDA8] leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Quantity and Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-ayur-ivory">Quantity:</span>
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
                className="w-full text-xs font-bold border-[#C2A265]/40 text-[#FAF7EE] hover:bg-[#C2A265]/10 hover:border-ayur-gold rounded-xl"
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
          <div className="pt-2 border-t border-[#C2A265]/20 flex items-center justify-between">
            <Link
              href={`/product/${product.slug}`}
              onClick={onClose}
              className="text-xs font-bold text-ayur-gold hover:text-ayur-gold-light flex items-center gap-1 transition-colors"
            >
              <span>View Complete Product Dossier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleWishlistToggle}
              className={`p-2 rounded-xl border transition-colors ${
                inWishlist ? 'border-red-500/40 bg-red-950/30 text-red-400' : 'border-[#C2A265]/20 text-[#C4BDA8] hover:text-red-400 hover:border-red-400/40'
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
