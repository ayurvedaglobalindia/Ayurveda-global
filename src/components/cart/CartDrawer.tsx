'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, Plus, Minus, Trash2, Gift, Truck, Lock, Shield, RotateCcw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { classNames } from '@/lib/utils/formatters'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PriceDisplay } from '@/components/ui/PriceDisplay'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { formatINR, calculateShipping } from '@/lib/utils/formatters'
import { getProductImage } from '@/lib/products/registry'
import { validateCoupon } from '@/lib/coupons'
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
  const [couponError, setCouponError] = useState<string | null>(null)
  const [couponLoading, setCouponLoading] = useState(false)

  const handleApplyCoupon = (code: string) => {
    if (!code.trim()) return
    setCouponError(null)
    setCouponLoading(true)
    try {
      const data = validateCoupon(
        code.trim().toUpperCase(),
        subtotal,
        items.map(i => i.productId),
        items.map(i => i.product?.category).filter(Boolean) as string[]
      )
      if (data.valid) {
        applyCouponStore(data.coupon?.code || code.trim().toUpperCase(), data.discount)
        setCouponError(null)
      } else {
        setCouponError(data.error || 'Invalid coupon code')
      }
    } catch {
      setCouponError('Unable to apply coupon. Please try again.')
    } finally {
      setCouponLoading(false)
    }
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
            className="fixed inset-0 z-[60] bg-ayur-void/80 backdrop-blur-sm"
            onClick={closeCartDrawer}
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 z-[65] w-full max-w-full sm:max-w-md bg-ayur-charcoal border-l border-ayur-gold/30 shadow-luxury flex flex-col text-ayur-cream"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between p-4 border-b border-ayur-forest-dark/50">
              <h2 className="font-heading text-xl font-medium text-ayur-ivory">Shopping Cart</h2>
              <button
                onClick={closeCartDrawer}
                className="p-2 rounded-lg text-ayur-stone hover:text-ayur-ivory hover:bg-ayur-forest-dark/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-ayur-gold/15 border border-ayur-gold/30 flex items-center justify-center text-ayur-gold">
                    <Gift className="w-8 h-8" />
                  </div>
                  <h3 className="font-medium text-ayur-ivory mb-2">Your cart is empty</h3>
                  <p className="text-ayur-stone mb-6">Add some products to get started</p>
                  <Link href="/shop" onClick={closeCartDrawer}>
                    <Button variant="gold" className="w-full">Continue Shopping</Button>
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
                    onRemove={() => {
                      removeCoupon()
                      setCouponError(null)
                    }}
                    subtotal={subtotal}
                    error={couponError}
                    loading={couponLoading}
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
              <div className="p-4 border-t border-ayur-forest-dark/50 bg-ayur-charcoal space-y-2.5">
                <Link href="/checkout" onClick={closeCartDrawer}>
                  <Button variant="gold" size="lg" className="w-full text-base font-semibold shadow-xl gold-shimmer">
                    Proceed to Checkout ({formatINR(total)})
                  </Button>
                </Link>
                <div className="flex items-center justify-center gap-4 text-xs text-ayur-stone pt-1">
                  <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> 100% Secure Checkout</span>
                  <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Ayush Certified</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center pt-2">
                  <div className="p-2 rounded-lg bg-ayur-forest-dark/50">
                    <Truck className="w-4 h-4 text-ayur-gold mx-auto mb-1" />
                    <span className="text-[10px] text-ayur-stone">Free Express</span>
                  </div>
                  <div className="p-2 rounded-lg bg-ayur-forest-dark/50">
                    <Lock className="w-4 h-4 text-ayur-gold mx-auto mb-1" />
                    <span className="text-[10px] text-ayur-stone">Discreet Box</span>
                  </div>
                  <div className="p-2 rounded-lg bg-ayur-forest-dark/50">
                    <Shield className="w-4 h-4 text-ayur-gold mx-auto mb-1" />
                    <span className="text-[10px] text-ayur-stone">COD Available</span>
                  </div>
                  <div className="p-2 rounded-lg bg-ayur-forest-dark/50">
                    <RotateCcw className="w-4 h-4 text-ayur-gold mx-auto mb-1" />
                    <span className="text-[10px] text-ayur-stone">Easy Returns</span>
                  </div>
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
  item: {
    id: string
    productId: string
    variantId?: string
    quantity: number
    price: number
    product: {
      name: string
      images?: { src: string; alt: string; isPrimary?: boolean }[]
      variants?: { id: string; name: string }[]
    }
  }
  onUpdateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void
  onRemove: (productId: string, variantId?: string) => void
}) {
  const resolvedImage = getProductImage(item.product, item.productId)
  const [imgSrc, setImgSrc] = useState(resolvedImage.src)
  const variantName = item.product.variants?.find(v => v.id === item.variantId)?.name

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-start gap-3 p-3 bg-ayur-forest-dark/80 border border-ayur-gold/20 rounded-xl hover:border-ayur-gold/40 transition-colors"
    >
      <Link
        href={`/product/${item.productId}`}
        className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-ayur-void border border-ayur-gold/20 relative"
      >
        <Image
          src={imgSrc}
          alt={resolvedImage.alt}
          fill
          className="object-contain p-1"
          sizes="64px"
          onError={() => setImgSrc('/images/products/body-essential-nutrition.png')}
        />
      </Link>
      <div className="flex-1 min-w-0">
        <Link href={`/product/${item.productId}`}>
          <h4 className="font-medium text-ayur-ivory text-sm leading-snug line-clamp-2 hover:text-ayur-gold-light transition-colors">
            {item.product.name}
          </h4>
        </Link>
        {variantName && (
          <p className="text-[11px] text-ayur-gold-light/90 font-medium mt-0.5 truncate">
            {variantName}
          </p>
        )}
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
        className="p-2 rounded-lg text-ayur-stone hover:text-ayur-crimson-light hover:bg-ayur-crimson/10 transition-colors flex-shrink-0"
        aria-label="Remove item"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  )
}

export function CouponInput({
  couponCode,
  onApply,
  onRemove,
  subtotal,
  error,
  loading = false,
}: {
  couponCode?: string
  onApply: (code: string) => void
  onRemove: () => void
  subtotal: number
  error?: string | null
  loading?: boolean
}) {
  const [code, setCode] = useState('')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-luxury p-4"
    >
      <h3 className="font-medium text-ayur-ivory mb-3 flex items-center gap-2">
        <Gift className="w-5 h-5 text-ayur-gold" />
        Coupon Code
      </h3>
      {couponCode ? (
        <div className="flex items-center justify-between">
          <span className="font-medium text-emerald-400 font-mono tracking-wider">{couponCode}</span>
          <button onClick={onRemove} className="text-sm text-ayur-stone hover:text-ayur-crimson-light transition-colors">Remove</button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value.toUpperCase())}
              placeholder="Enter coupon code"
              className="flex-1"
              aria-label="Coupon code"
            />
            <Button variant="gold" onClick={() => onApply(code)} disabled={!code.trim() || loading}>
              {loading ? 'Verifying...' : 'Apply'}
            </Button>
          </div>
          {error && (
            <p className="text-xs text-rose-400 font-medium">{error}</p>
          )}
        </div>
      )}
    </motion.div>
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-luxury p-4 space-y-3"
    >
      <h3 className="font-medium text-ayur-ivory">Order Summary</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-ayur-stone">
          <span>Subtotal</span>
          <span className="text-ayur-ivory font-medium">{formatINR(subtotal)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-ayur-gold-light">
            <span>Discount</span>
            <span className="font-medium">-{formatINR(discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-ayur-stone">
          <span>Shipping</span>
          <span className="text-ayur-gold-light font-medium">{shipping === 0 ? 'Free' : formatINR(shipping)}</span>
        </div>
        {tax > 0 && (
          <div className="flex justify-between text-ayur-stone">
            <span>Tax</span>
            <span className="text-ayur-ivory font-medium">{formatINR(tax)}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-ayur-forest-dark/50 pt-2">
          <span className="font-medium text-ayur-ivory">Total</span>
          <span className="font-medium text-ayur-gold-light text-lg">{formatINR(total)}</span>
        </div>
      </div>
      {freeShippingThreshold > 0 && (
        <p className="text-xs text-ayur-gold-light text-center bg-ayur-gold/10 border border-ayur-gold/20 rounded-lg p-2">
          Add {formatINR(freeShippingThreshold)} more for free express shipping
        </p>
      )}
    </motion.div>
  )
}