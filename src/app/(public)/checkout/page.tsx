'use client'

import { useCartStore } from '@/store/cartStore'
import { CheckoutForm } from '@/components/checkout/CheckoutSteps'
import { CartItemSkeleton } from '@/components/ui/Skeleton'


export default function CheckoutPage() {
  const { items, getSubtotal } = useCartStore()
  const subtotal = getSubtotal()

  if (items.length === 0) {
    return (
      <div className="container py-16 lg:py-24 text-center">
        <h1 className="font-heading text-3xl font-medium text-ayur-black mb-4">Your cart is empty</h1>
        <p className="text-ayur-stone mb-8">Add some products to proceed to checkout.</p>
        <a href="/shop" className="inline-block">
          <button className="btn-primary">Continue Shopping</button>
        </a>
      </div>
    )
  }

  return (
    <div className="container py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="font-heading text-3xl md:text-4xl font-medium text-ayur-black">Checkout</h1>
        <p className="text-ayur-stone mt-2">Complete your purchase in a few simple steps</p>
      </div>
      <CheckoutForm />
    </div>
  )
}