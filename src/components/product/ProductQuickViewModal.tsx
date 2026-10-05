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
    if (!isAuthenticated) {
      onClose()
      openModal('auth-gate', {
        product,
        quantity,
        mode: 'buy-now',
      })
      return
    }

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
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E2DDD5] shadow-sm flex items-center justify-center">
            <Image
              src={currentImage.src}
              alt={currentImage.alt || product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
            {product.ageRestricted && (
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-medium text-[#9E8047] bg-[#FFFFFF]/90 border border-[#E2DDD5] shadow-xs">
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
                  className={`relative w-14 h-16 rounded-xl overflow-hidden border-2 transition-all bg-[#FAF7F2] shadow-xs ${
                    selectedImageIndex === idx
                      ? 'border-[#4E5F52] ring-2 ring-[#4E5F52]/20'
                      : 'border-[#E2DDD5] opacity-70 hover:opacity-100 hover:border-[#D5CEC4]'
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
              <span className="text-[11px] font-semibold text-[#4E5F52] bg-[#EFF4F0] border border-[#4E5F52]/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {product.category === 'supplements' ? 'Herbal Supplement' : product.category === 'wellness' ? 'Power Combo' : 'Personal Care'}
              </span>
              <Rating rating={4.9} size="sm" showValue />
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-medium text-[#1C1D1F]">
              {product.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#737373]">
              {product.tagline}
            </p>
          </div>

          {/* Price Box */}
          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E2DDD5] flex items-center justify-between">
            <PriceDisplay
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              size="lg"
            />
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs font-semibold bg-[#EFF4F0] text-[#4E5F52] border border-[#4E5F52]/30 px-2.5 py-1 rounded-lg">
                SAVE {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Quantity and Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-[#1C1D1F]">Quantity:</span>
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
                className="w-full text-xs font-medium border-[#E2DDD5] text-[#1C1D1F] hover:bg-[#FAF7F2] rounded-xl"
              >
                Add to Cart
              </Button>
              <Button
                variant="gold"
                size="md"
                onClick={handleBuyNow}
                className="w-full text-xs font-medium rounded-xl shadow-xs"
              >
                Buy Now
              </Button>
            </div>

            <Button
              variant="whatsapp"
              size="md"
              onClick={handleWhatsAppOrder}
              className="w-full text-xs font-medium rounded-xl shadow-xs"
            >
              Order via WhatsApp (COD)
            </Button>
          </div>

          {/* Full Details Link */}
          <div className="pt-2 border-t border-[#E2DDD5] flex items-center justify-between">
            <Link
              href={`/product/${product.slug}`}
              onClick={onClose}
              className="text-xs font-semibold text-[#1C1D1F] hover:text-[#4E5F52] flex items-center gap-1 transition-colors"
            >
              <span>View Complete Product Dossier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleWishlistToggle}
              className={`p-2 rounded-xl border transition-colors ${
                inWishlist ? 'border-red-400 bg-red-50 text-red-600' : 'border-[#E2DDD5] text-[#737373] hover:text-red-500 hover:border-red-300'
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
