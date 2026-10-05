'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { CheckoutForm } from '@/components/checkout/CheckoutSteps'

export default function CheckoutPage() {
  const { items } = useCartStore()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen container py-16 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1C1D1F] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F] py-12 sm:py-16">
        <div className="container max-w-md mx-auto text-center">
          <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#E2DDD5] shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F2] text-[#4E5F52] border border-[#E2DDD5] flex items-center justify-center mx-auto">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h1 className="font-heading text-xl font-normal text-[#1C1D1F]">Your Cart is Empty</h1>
            <p className="text-xs text-[#555555] leading-relaxed font-sans">
              Add authentic Ayurvedic formulations to your bag to proceed with confidential doorstep delivery and Cash on Delivery.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-block w-full py-2.5 px-4 rounded-full bg-[#1C1D1F] hover:bg-[#333333] text-[#FAF7F2] font-medium text-xs tracking-wider uppercase transition-colors"
              >
                Explore Formulations
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F]">
      <CheckoutForm />
    </div>
  )
}