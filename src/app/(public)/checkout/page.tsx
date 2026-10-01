'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { CheckoutForm } from '@/components/checkout/CheckoutSteps'
import { Button } from '@/components/ui/Button'

export default function CheckoutPage() {
  const { items } = useCartStore()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="container py-16 lg:py-24 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-ayur-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container py-16 lg:py-24 text-center max-w-md mx-auto">
        <div className="glass-luxury p-8 sm:p-10 rounded-3xl border border-[#D4AF37]/30 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="font-heading text-3xl font-semibold text-white mb-3">Your Cart is Empty</h1>
          <p className="text-[#C4BDA8] text-sm mb-6 leading-relaxed">
            Add authentic Ayurvedic products to your cart to proceed with confidential doorstep delivery and Cash on Delivery.
          </p>
          <Link href="/shop" className="inline-block w-full">
            <button className="btn-gold w-full py-3.5 rounded-xl font-bold text-sm shadow-xl">
              Explore Formulations
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return <CheckoutForm />
}