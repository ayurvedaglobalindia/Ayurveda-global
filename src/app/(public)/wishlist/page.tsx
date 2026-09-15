'use client'

import { Metadata } from 'next'
import { WishlistPage } from '@/components/wishlist/WishlistPage'

export const metadata: Metadata = {
  title: 'My Wishlist',
  description: 'Your saved products for later',
}

export default function WishlistPageWrapper() {
  return (
    <div className="container py-8 lg:py-12">
      <WishlistPage />
    </div>
  )
}