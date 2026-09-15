'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Trash2, ArrowLeft, Plus, Minus } from 'lucide-react'
import { classNames } from '@/lib/utils/formatters'
import { Button } from '@/components/ui/Button'
import { PriceDisplay } from '@/components/ui/PriceDisplay'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { ProductCard } from '@/components/product/ProductCard'
import { CartItemSkeleton } from '@/components/ui/Skeleton'
import { formatINR, calculateShipping } from '@/lib/utils/formatters'
import { useCartStore } from '@/store/cartStore'
import { getProductsByCategory } from '@/lib/products/registry'
import type { CartItem } from '@/types'
import { CouponInput } from './CartDrawer'

interface CartPageProps {
  initialItems?: CartItem[]
}

export function CartPage() {
  const { items, couponCode, discount, shipping, tax, getSubtotal, getTotal, updateQuantity, removeItem, removeCoupon, applyCoupon, getItemCount } = useCartStore()
  const [couponInput, setCouponInput] = useState('')

  const subtotal = getSubtotal()
  const total = getTotal()
  const itemCount = getItemCount()
  const shippingCalc = calculateShipping(subtotal)

  const handleApplyCoupon = (code: string) => {
    applyCoupon(code, 0)
  }

  if (items.length === 0) {
    return (
      <div className="container py-16 lg:py-24">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-ayur-beige flex items-center justify-center">
            <Trash2 className="w-12 h-12 text-ayur-stone" />
          </div>
          <h1 className="font-heading text-3xl font-medium text-ayur-black mb-4">Your cart is empty</h1>
          <p className="text-ayur-stone mb-8">Looks like you haven't added any products yet.</p>
          <Link href="/shop">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const relatedProducts = getProductsByCategory('supplements').slice(0, 4)

  return (
    <div className="container py-8 lg:py-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/shop" className="p-2 rounded-lg text-ayur-stone hover:text-ayur-forest hover:bg-ayur-beige transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-heading text-3xl font-medium text-ayur-black">Shopping Cart ({itemCount})</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <CartPageItem key={item.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-ayur-beige rounded-2xl p-6 sticky top-24">
            <CouponInput
              couponCode={couponCode}
              onApply={handleApplyCoupon}
              onRemove={removeCoupon}
              subtotal={subtotal}
            />

            <div className="mt-6 space-y-3">
              <h3 className="font-medium text-ayur-black">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-ayur-forest">
                  <span>Subtotal ({itemCount} items)</span>
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
                  <span>{shippingCalc.freeShipping ? 'Free' : formatINR(shippingCalc.cost)}</span>
                </div>
                {tax > 0 && (
                  <div className="flex justify-between text-ayur-forest">
                    <span>Tax</span>
                    <span>{formatINR(tax)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-ayur-beige pt-3">
                  <span className="font-medium text-ayur-black text-lg">Total</span>
                  <span className="font-medium text-ayur-black text-xl">{formatINR(total)}</span>
                </div>
              </div>
              {shippingCalc.freeShippingThreshold > 0 && (
                <p className="text-xs text-ayur-sage text-center mt-3">
                  Add {formatINR(shippingCalc.freeShippingThreshold)} more for free shipping
                </p>
              )}
              <Link href="/checkout" className="mt-6 block">
                <Button variant="primary" size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>
              <p className="text-center text-xs text-ayur-stone mt-4">
                Shipping, taxes, and discounts calculated at checkout.
              </p>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div>
              <h3 className="font-heading text-lg font-medium text-ayur-black mb-4">You may also like</h3>
              <div className="space-y-3">
                {relatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} variant="compact" showQuickActions={false} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
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
  const primaryImage = item.product.images.find(img => img.isPrimary) || item.product.images[0]
  const lineTotal = item.price * item.quantity

  return (
    <div className="bg-white border border-ayur-beige rounded-2xl overflow-hidden hover:shadow-medium transition-shadow">
      <div className="flex gap-4 p-4 md:p-6">
        <Link href={`/product/${item.productId}`} className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-ayur-beige relative">
          <Image src={primaryImage.src} alt={primaryImage.alt} fill className="object-cover" sizes="128px" />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Link href={`/product/${item.productId}`}>
                <h3 className="font-medium text-ayur-black hover:text-ayur-forest transition-colors">{item.product.name}</h3>
              </Link>
              {item.variantId && (
                <p className="text-sm text-ayur-stone mt-1">{item.product.variants.find(v => v.id === item.variantId)?.name}</p>
              )}
            </div>
            <button
              onClick={() => onRemove(item.productId, item.variantId)}
              className="p-2 rounded-lg text-ayur-stone hover:text-ayur-copper hover:bg-ayur-beige transition-colors flex-shrink-0"
              aria-label="Remove item"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <QuantitySelector
              value={item.quantity}
              onChange={qty => onUpdateQuantity(item.productId, item.variantId, qty)}
              min={1}
              max={99}
              size="md"
            />
            <PriceDisplay price={lineTotal} size="lg" className="font-medium" />
          </div>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'