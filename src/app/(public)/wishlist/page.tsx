'use client'

import { Metadata } from 'next'
import { WishlistPage } from '@/components/wishlist/WishlistPage'


export default function WishlistPageWrapper() {
  return (
    <div className="container py-8 lg:py-12">
      <WishlistPage />
    </div>
  )
}