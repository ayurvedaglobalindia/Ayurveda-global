'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, ArrowLeft, Plus, Minus, ShoppingBag, Sparkles, Gift } from 'lucide-react'
import { classNames } from '@/lib/utils/formatters'
import { Button } from '@/components/ui/Button'
import { PriceDisplay } from '@/components/ui/PriceDisplay'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { ProductCard } from '@/components/product/ProductCard'
import { formatINR, calculateShipping } from '@/lib/utils/formatters'
import { useCartStore } from '@/store/cartStore'
import { getProductsByCategory, getProductImage } from '@/lib/products/registry'
import type { CartItem } from '@/types'
import { motion } from 'framer-motion'
import { CouponInput } from './CartDrawer'

interface CartPageProps {
  initialItems?: CartItem[]
}

export function CartPage() {
  const { items, couponCode, discount, shipping: shippingCost, tax, getSubtotal, getTotal, updateQuantity, removeItem, removeCoupon, applyCoupon, getItemCount } = useCartStore()

  const subtotal = getSubtotal()
  const total = getTotal()
  const itemCount = getItemCount()
  const shippingCalc = calculateShipping(subtotal)
  const freeShippingRemaining = Math.max(0, 99900 - subtotal)
  const [couponError, setCouponError] = useState<string | null>(null)
  const [couponLoading, setCouponLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleApplyCoupon = async (code: string) => {
    if (!code.trim()) return
    setCouponError(null)
    setCouponLoading(true)
    try {
      const res = await fetch('/api/checkout/coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code.trim().toUpperCase(),
          subtotal,
          productIds: items.map(i => i.productId),
          categories: items.map(i => i.product?.category).filter(Boolean),
        }),
      })
      const data = await res.json()
      if (data.valid) {
        applyCoupon(data.coupon?.code || code.trim().toUpperCase(), data.discount)
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

  if (!isMounted) {
    return (
      <div className="container py-16 lg:py-24 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-ayur-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center card-luxury p-8 sm:p-10 rounded-3xl border border-ayur-gold/30 shadow-luxury"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-ayur-gold/15 border border-ayur-gold/30 flex items-center justify-center text-ayur-gold">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="font-heading text-3xl font-medium text-ayur-ivory mb-3">Your cart is empty</h1>
          <p className="text-ayur-stone text-sm mb-6">Looks like you haven&apos;t added any products to your cart yet.</p>
          <Link href="/shop" className="inline-block w-full">
            <Button variant="gold" className="w-full py-3.5 rounded-xl font-bold text-sm shadow-xl gold-shimmer">
              Explore Formulations
            </Button>
          </Link>
        </motion.div>
      </div>
    )
  }

  const relatedProducts = getProductsByCategory('supplements').slice(0, 4)

  return (
    <div className="container py-8 lg:py-12 pb-32 lg:pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <Link href="/shop" className="p-2.5 rounded-xl text-ayur-gold bg-ayur-charcoal border border-ayur-gold/30 hover:border-ayur-gold hover:bg-ayur-forest-dark transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-heading text-3xl font-semibold text-ayur-ivory">Shopping Cart ({itemCount})</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              <CartPageItem item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card-luxury border border-ayur-gold/30 rounded-2xl p-6 sticky top-24 shadow-luxury"
          >
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

            <div className="mt-6 space-y-3">
              <h3 className="font-heading font-semibold text-ayur-ivory text-lg">Order Summary</h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-ayur-stone">
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="text-ayur-ivory font-medium">{formatINR(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-ayur-gold-light font-semibold">
                    <span>Discount</span>
                    <span>-{formatINR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-ayur-stone">
                  <span>Shipping</span>
                  <span className="text-ayur-gold-light font-semibold">{shippingCalc.freeShipping ? 'Free Express' : formatINR(shippingCalc.cost)}</span>
                </div>
                {tax > 0 && (
                  <div className="flex justify-between text-ayur-stone">
                    <span>Tax</span>
                    <span>{formatINR(tax)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-ayur-forest-dark/50 pt-3">
                  <span className="font-heading font-semibold text-ayur-ivory text-lg">Total</span>
                  <span className="font-heading font-bold text-ayur-gold-light text-2xl">{formatINR(total)}</span>
                </div>
              </div>
              {freeShippingRemaining > 0 && (
                <p className="text-xs text-ayur-gold-light text-center mt-3 font-medium bg-ayur-gold/10 border border-ayur-gold/20 rounded-lg p-2">
                  Add {formatINR(freeShippingRemaining)} more for free express shipping
                </p>
              )}
              <Link href="/checkout" className="mt-6 block">
                <Button variant="gold" className="w-full py-3.5 rounded-xl font-bold text-sm shadow-xl gold-shimmer">
                  Proceed to Checkout
                </Button>
              </Link>
              <p className="text-center text-xs text-ayur-stone mt-4">
                🔒 100% Confidential packaging • Cash on Delivery available
              </p>
            </div>
          </motion.div>

          {relatedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-heading text-lg font-medium text-ayur-ivory mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-ayur-gold" />
                You may also like
              </h3>
              <div className="space-y-3">
                {relatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} variant="compact" showQuickActions={false} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

function CartPageItem({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: CartItem
  onUpdateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void
  onRemove: (productId: string, variantId?: string) => void
}) {
  const resolvedImage = getProductImage(item.product, item.productId)
  const [imgSrc, setImgSrc] = useState(resolvedImage.src)
  const lineTotal = item.price * item.quantity
  const variantName = item.product?.variants?.find(v => v.id === item.variantId)?.name

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-luxury border border-ayur-gold/25 rounded-2xl overflow-hidden hover:border-ayur-gold/60 transition-all shadow-xl"
    >
      <div className="flex gap-4 p-4 sm:p-5 md:p-6">
        <Link
          href={`/product/${item.productId}`}
          className="flex-shrink-0 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-xl overflow-hidden bg-ayur-void border border-ayur-gold/20 relative"
        >
          <Image
            src={imgSrc}
            alt={resolvedImage.alt}
            fill
            className="object-contain p-2"
            sizes="(max-width: 640px) 80px, 128px"
            onError={() => setImgSrc('/images/products/body-essential-nutrition.png')}
          />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Link href={`/product/${item.productId}`}>
                <h3 className="font-heading font-semibold text-base sm:text-lg text-ayur-ivory hover:text-ayur-gold-light transition-colors leading-snug">
                  {item.product.name}
                </h3>
              </Link>
              {variantName && (
                <span className="inline-block text-xs text-ayur-gold-light mt-1 font-medium bg-ayur-gold/10 px-2 py-0.5 rounded-md border border-ayur-gold/20">
                  {variantName}
                </span>
              )}
            </div>
            <button
              onClick={() => onRemove(item.productId, item.variantId)}
              className="p-2 rounded-xl text-ayur-crimson-light hover:text-ayur-ivory hover:bg-ayur-crimson/60 border border-transparent hover:border-ayur-crimson/40 transition-colors flex-shrink-0"
              aria-label="Remove item"
            >
              <Trash2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <QuantitySelector
              value={item.quantity}
              onChange={qty => onUpdateQuantity(item.productId, item.variantId, qty)}
              min={1}
              max={99}
              size="md"
            />
            <PriceDisplay price={lineTotal} size="lg" className="font-bold text-ayur-gold-light" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}