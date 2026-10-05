'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles, ShoppingBag, ArrowRight, ShieldCheck, Check, Heart, Leaf, Zap, MessageCircle, Truck } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
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
  const router = useRouter()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const { addItem } = useCartStore()
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore()
  const { user, isAuthenticated } = useUserStore()
  const { openModal, openCartDrawer, showToast } = useUIStore()
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
    openCartDrawer()
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
    router.push('/checkout')
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
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#999999]/30 shadow-sm flex items-center justify-center">
            <Image
              src={currentImage.src}
              alt={currentImage.alt || product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
            {product.ageRestricted && (
              <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-medium text-[#9E8047] bg-[#FFFFFF]/95 border border-[#999999]/30 shadow-xs">
                18+ Adult
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 justify-center flex-wrap">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-14 h-16 rounded-xl overflow-hidden border-2 transition-all bg-[#FAF7F2] shadow-xs ${
                    selectedImageIndex === idx
                      ? 'border-[#4E5F52] ring-2 ring-[#4E5F52]/20'
                      : 'border-[#999999]/30 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img.src} alt="" fill className="object-cover" sizes="56px" />
                </button>
              ))}
            </div>
          )}

          {/* Purity & Logistics Micro-Pills */}
          <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-[#737373]">
            <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#999999]/30 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4E5F52] flex-shrink-0" />
              <span>NABL Lab Tested</span>
            </div>
            <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#999999]/30 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#4E5F52] flex-shrink-0" />
              <span>100% Discreet COD</span>
            </div>
          </div>
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="md:col-span-6 space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10.5px] font-semibold text-[#4E5F52] bg-[#FAF7F2] border border-[#4E5F52]/30 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                {product.category === 'supplements' ? 'Herbal Supplement' : product.category === 'wellness' ? 'Power Combo' : 'Personal Care'}
              </span>
              <Rating rating={4.9} size="sm" showValue />
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-normal text-[#1C1D1F]">
              {product.name}
            </h3>
            <p className="text-xs text-[#737373] font-sans">
              {product.tagline}
            </p>
          </div>

          {/* Price Box */}
          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#999999]/30 flex items-center justify-between">
            <PriceDisplay
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              size="lg"
            />
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs font-semibold bg-[#FFFFFF] text-[#4E5F52] border border-[#4E5F52]/30 px-2.5 py-1 rounded-lg">
                SAVE {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-sans">
            {product.shortDescription}
          </p>

          {/* Key Botanical Actives */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <span className="text-[10.5px] font-mono uppercase tracking-wider text-[#737373] flex items-center gap-1">
                <Leaf className="w-3 h-3 text-[#4E5F52]" />
                Key Botanical Actives
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.ingredients.slice(0, 4).map((ing, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-[#FAF7F2] border border-[#999999]/30 text-[#1C1D1F]"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Classical Usage Guidance */}
          {product.usage && (
            <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#999999]/30 text-xs text-[#555555]">
              <span className="font-semibold text-[#1C1D1F] block text-[11px] mb-0.5">Dosage / How to Use:</span>
              <p className="text-[11.5px] leading-relaxed">{product.usage}</p>
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="space-y-2.5 pt-2">
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

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-2.5 px-3 rounded-full border border-[#1C1D1F] bg-[#FAF7F2] hover:bg-[#1C1D1F] hover:text-[#FAF7F2] text-[#1C1D1F] font-medium text-xs tracking-wider uppercase transition-colors inline-flex items-center justify-center gap-1.5 shadow-xs"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-2.5 px-3 rounded-full bg-[#1C1D1F] hover:bg-[#333333] text-[#FAF7F2] font-medium text-xs tracking-wider uppercase transition-colors inline-flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Buy Now</span>
              </button>
            </div>

            <button
              onClick={handleWhatsAppOrder}
              className="w-full py-2.5 px-4 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-[#FFFFFF] font-medium text-xs tracking-wider uppercase transition-colors inline-flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-[#FFFFFF]" />
              <span>Order via WhatsApp (COD)</span>
            </button>
          </div>

          {/* Full Details Link & Wishlist */}
          <div className="pt-3 border-t border-[#999999]/30 flex items-center justify-between">
            <Link
              href={`/product/${product.slug}`}
              onClick={onClose}
              className="text-xs font-medium text-[#1C1D1F] hover:text-[#4E5F52] flex items-center gap-1 transition-colors"
            >
              <span>View Complete Product Dossier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleWishlistToggle}
              className={`p-2 rounded-full border transition-colors ${
                inWishlist ? 'border-red-400 bg-red-50 text-red-600' : 'border-[#999999]/30 text-[#737373] hover:text-red-500 hover:border-red-300'
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
