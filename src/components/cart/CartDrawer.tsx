'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, Plus, Minus, Trash2, Tag, Gift } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { classNames } from '@/lib/utils/formatters'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PriceDisplay } from '@/components/ui/PriceDisplay'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { formatINR, calculateShipping } from '@/lib/utils/formatters'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'

export function CartDrawer() {
  const { isCartDrawerOpen, closeCartDrawer } = useUIStore()
  const { items, couponCode, discount, shipping, tax, getSubtotal, getTotal, updateQuantity, removeItem, removeCoupon, getItemCount } = useCartStore()
  const { applyCoupon: applyCouponStore } = useCartStore()

  const subtotal = getSubtotal()
  const total = getTotal()
  const itemCount = getItemCount()
  const shippingCalc = calculateShipping(subtotal)

  const handleApplyCoupon = (code: string) => {
    // This would call the API to validate coupon
    applyCouponStore(code, 0) // Placeholder
  }

  useEffect(() => {
    if (!isCartDrawerOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCartDrawer()
    }

    document.addEventListener('keydown', handleEscape)
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
    }
  }, [isCartDrawerOpen, closeCartDrawer])

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={closeCartDrawer}
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 z-[65] w-full max-w-md bg-white shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between p-4 border-b border-ayur-beige">
              <h2 className="font-heading text-xl font-medium text-ayur-black">Shopping Cart</h2>
              <button
                onClick={closeCartDrawer}
                className="p-2 rounded-lg text-ayur-stone hover:text-ayur-black hover:bg-ayur-beige transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ayur-beige flex items-center justify-center">
                    <Trash2 className="w-8 h-8 text-ayur-stone" />
                  </div>
                  <h3 className="font-medium text-ayur-black mb-2">Your cart is empty</h3>
                  <p className="text-ayur-stone mb-6">Add some products to get started</p>
                  <Link href="/shop">
                    <Button variant="primary" className="w-full">Continue Shopping</Button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {items.map(item => (
                      <CartDrawerItem key={item.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
                    ))}
                  </div>

                  <CouponInput
                    couponCode={couponCode}
                    onApply={handleApplyCoupon}
                    onRemove={removeCoupon}
                    subtotal={subtotal}
                  />

                  <CartSummary
                    subtotal={subtotal}
                    shipping={shippingCalc.cost}
                    tax={tax}
                    discount={discount}
                    total={total}
                    freeShippingThreshold={shippingCalc.freeShipping ? 0 : 99900 - subtotal}
                  />
                </>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-4 border-t border-ayur-sand/50 bg-white space-y-2.5">
                <Link href="/checkout" onClick={closeCartDrawer}>
                  <Button variant="gold" size="lg" className="w-full text-base font-semibold shadow-md">
                    Proceed to Checkout ({formatINR(total)})
                  </Button>
                </Link>
                <div className="flex items-center justify-center gap-4 text-xs text-ayur-stone pt-1">
                  <span className="flex items-center gap-1">🔒 100% Secure Checkout</span>
                  <span className="flex items-center gap-1">🌿 Pure Ayurveda</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function CartDrawerItem({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: { id: string; productId: string; variantId?: string; quantity: number; price: number; product: { name: string; images: { src: string; alt: string }[] } }
  onUpdateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void
  onRemove: (productId: string, variantId?: string) => void
}) {
  const primaryImage = item.product.images.find(img => img.isPrimary) || item.product.images[0]

  return (
    <div className="flex gap-3 p-3 bg-ayur-cream rounded-xl">
      <Link href={`/product/${item.productId}`} className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-white relative">
        <Image src={primaryImage.src} alt={primaryImage.alt} fill className="object-cover" sizes="64px" />
      </Link>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-ayur-black line-clamp-1">{item.product.name}</h4>
        <PriceDisplay price={item.price} size="sm" className="mt-1" />
        <QuantitySelector
          value={item.quantity}
          onChange={qty => onUpdateQuantity(item.productId, item.variantId, qty)}
          min={1}
          max={99}
          size="sm"
          className="mt-2"
        />
      </div>
      <button
        onClick={() => onRemove(item.productId, item.variantId)}
        className="p-2 rounded-lg text-ayur-stone hover:text-ayur-copper hover:bg-white transition-colors flex-shrink-0"
        aria-label="Remove item"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  )
}

export function CouponInput({
  couponCode,
  onApply,
  onRemove,
  subtotal,
}: {
  couponCode?: string
  onApply: (code: string) => void
  onRemove: () => void
  subtotal: number
}) {
  const [code, setCode] = useState('')

  return (
    <div className="bg-white border border-ayur-beige rounded-xl p-4">
      <h3 className="font-medium text-ayur-black mb-3 flex items-center gap-2">
        <Gift className="w-5 h-5 text-ayur-gold" />
        Coupon Code
      </h3>
      {couponCode ? (
        <div className="flex items-center justify-between">
          <span className="font-medium text-ayur-forest">{couponCode}</span>
          <button onClick={onRemove} className="text-sm text-ayur-copper hover:underline">Remove</button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            type="text"
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase())}
            placeholder="Enter coupon code"
            className="flex-1"
            aria-label="Coupon code"
          />
          <Button onClick={() => onApply(code)} disabled={!code.trim()}>
            Apply
          </Button>
        </div>
      )}
    </div>
  )
}

function CartSummary({
  subtotal,
  shipping,
  tax,
  discount,
  total,
  freeShippingThreshold,
}: {
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
  freeShippingThreshold: number
}) {
  return (
    <div className="bg-white border border-ayur-beige rounded-xl p-4 space-y-3">
      <h3 className="font-medium text-ayur-black">Order Summary</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-ayur-forest">
          <span>Subtotal</span>
          <span>{formatINR(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-ayur-sage">
            <span>Discount</span>
            <span>-{formatINR(discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-ayur-forest">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatINR(shipping)}</span>
        </div>
        {tax > 0 && (
          <div className="flex justify-between text-ayur-forest">
            <span>Tax</span>
            <span>{formatINR(tax)}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-ayur-beige pt-2">
          <span className="font-medium text-ayur-black">Total</span>
          <span className="font-medium text-ayur-black text-lg">{formatINR(total)}</span>
        </div>
      </div>
      {freeShippingThreshold > 0 && (
        <p className="text-xs text-ayur-sage text-center">
          Add {formatINR(freeShippingThreshold)} more for free shipping
        </p>
      )}
    </div>
  )
}