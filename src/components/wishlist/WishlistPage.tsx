'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Heart, ArrowLeft, ShoppingBag } from 'lucide-react'
import { classNames } from '@/lib/utils/formatters'
import { Button } from '@/components/ui/Button'
import { PriceDisplay } from '@/components/ui/PriceDisplay'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { ProductCard } from '@/components/product/ProductCard'
import { formatINR } from '@/lib/utils/formatters'
import { useWishlistStore } from '@/store/wishlistStore'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import type { WishlistItem } from '@/types'

export function WishlistPage() {
  const { items, removeItem, getItemCount } = useWishlistStore()
  const { addItem } = useCartStore()
  const { showToast } = useUIStore()
  const itemCount = getItemCount()

  const handleMoveToCart = (item: WishlistItem) => {
    addItem(item.product, item.variantId, 1)
    removeItem(item.productId, item.variantId)
    showToast({ type: 'success', title: 'Moved to cart', message: `${item.product.name} added to your cart` })
  }

  const handleRemove = (productId: string, variantId?: string) => {
    removeItem(productId, variantId)
    showToast({ type: 'info', title: 'Removed from wishlist' })
  }

  if (items.length === 0) {
    return (
      <div className="container py-16 lg:py-24">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-ayur-beige flex items-center justify-center">
            <Heart className="w-12 h-12 text-ayur-stone" />
          </div>
          <h1 className="font-heading text-3xl font-medium text-ayur-black mb-4">Your wishlist is empty</h1>
          <p className="text-ayur-stone mb-8">Save products you love for later.</p>
          <Link href="/shop">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 lg:py-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/" className="p-2 rounded-lg text-ayur-stone hover:text-ayur-forest hover:bg-ayur-beige transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-heading text-3xl font-medium text-ayur-black">My Wishlist ({itemCount})</h1>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map(item => (
          <WishlistItemCard key={item.id} item={item} onMoveToCart={handleMoveToCart} onRemove={handleRemove} />
        ))}
      </div>
    </div>
  )
}

function WishlistItemCard({
  item,
  onMoveToCart,
  onRemove,
}: {
  item: WishlistItem
  onMoveToCart: (item: WishlistItem) => void
  onRemove: (productId: string, variantId?: string) => void
}) {
  const primaryImage = item.product.images.find(img => img.isPrimary) || item.product.images[0]
  const currentPrice = item.product.variants.find(v => v.id === item.variantId)?.price || item.product.price
  const compareAtPrice = item.product.variants.find(v => v.id === item.variantId)?.compareAtPrice || item.product.compareAtPrice

  return (
    <article className="card-hover group relative">
      <div className="relative aspect-square overflow-hidden bg-ayur-beige">
        <Link href={`/product/${item.product.slug}`}>
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>
        <div className="absolute top-3 right-3">
          <button
            onClick={() => onRemove(item.productId, item.variantId)}
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-medium text-ayur-stone hover:text-ayur-copper transition-colors"
            aria-label="Remove from wishlist"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
          <Button size="sm" variant="primary" onClick={() => onMoveToCart(item)} className="w-24">
            <ShoppingBag className="w-4 h-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-ayur-black line-clamp-1 group-hover:text-ayur-forest transition-colors">
            <Link href={`/product/${item.product.slug}`}>{item.product.name}</Link>
          </h3>
        </div>
        <PriceDisplay price={currentPrice} compareAtPrice={compareAtPrice} />
        <Button variant="outline" size="sm" className="w-full" onClick={() => onMoveToCart(item)}>
          Move to Cart
        </Button>
      </div>
    </article>
  )
}