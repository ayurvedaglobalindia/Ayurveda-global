'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { CheckoutForm } from '@/components/checkout/CheckoutSteps'
import { Button } from '@/components/ui/Button'

export default function CheckoutPage() {
  const { items } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="container py-16 lg:py-24 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-ayur-gold/20 text-ayur-gold flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="font-heading text-3xl font-medium text-ayur-black mb-3">Your Cart is Empty</h1>
        <p className="text-ayur-stone text-sm mb-8 leading-relaxed">
          Add authentic Ayurvedic products to your cart to proceed with confidential doorstep delivery and Cash on Delivery.
        </p>
        <Link href="/shop" className="inline-block">
          <Button variant="gold" size="lg" className="px-8 font-semibold">
            Explore All Products
          </Button>
        </Link>
      </div>
    )
  }

  return <CheckoutForm />
}