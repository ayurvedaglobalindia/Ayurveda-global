'use client'

import { Metadata } from 'next'
import { CartPage } from '@/components/cart/CartPage'

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'Review your cart and proceed to checkout',
}

export default function CartPageWrapper() {
  return (
    <div className="container py-8 lg:py-12">
      <CartPage />
    </div>
  )
}