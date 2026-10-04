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
      <div className="container py-8 sm:py-12 lg:py-16 text-center max-w-md mx-auto">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#102016] border border-[#C2A265]/30 shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-[#142A1D] text-[#C2A265] border border-[#C2A265]/30 flex items-center justify-center mx-auto mb-3.5">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h1 className="font-heading text-lg sm:text-xl font-medium text-[#FAF7EE] mb-2">Your Cart is Empty</h1>
          <p className="text-[#A8A295] text-xs mb-5 leading-relaxed">
            Add authentic Ayurvedic formulations to your bag to proceed with confidential doorstep delivery and Cash on Delivery.
          </p>
          <Link href="/shop" className="inline-block w-full">
            <button className="w-full py-2.5 px-4 rounded-xl bg-[#C2A265] hover:bg-[#D4B678] text-[#0B150F] font-semibold text-xs tracking-wide shadow-md transition-all">
              Explore Formulations
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return <CheckoutForm />
}