'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Heart, ArrowLeft, ShoppingBag } from 'lucide-react'
import { classNames } from '@/lib/utils/formatters'
import { Button } from '@/components/ui/Button'
import { PriceDisplay } from '@/components/ui/PriceDisplay'
import { QuantitySelector } from '@/components/ui/QuantitySelector'
import { ProductCard } from '@/components/product/ProductCard'
import { getProductImage } from '@/lib/products/registry'
import { formatINR } from '@/lib/utils/formatters'
import { useWishlistStore } from '@/store/wishlistStore'
import { useCartStore } from '@/store/cartStore'
import { useUserStore } from '@/store/userStore'
import { useUIStore } from '@/store/uiStore'
import type { WishlistItem } from '@/types'

export function WishlistPage() {
  const { items, removeItem, getItemCount } = useWishlistStore()
  const { addItem } = useCartStore()
  const { isAuthenticated } = useUserStore()
  const { showToast, openModal } = useUIStore()
  const itemCount = getItemCount()

  const handleMoveToCart = (item: WishlistItem) => {
    if (!isAuthenticated) {
      openModal('auth-gate', {
        product: item.product,
        variantId: item.variantId,
        quantity: 1,
        mode: 'add-to-cart',
      })
      return
    }
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
      <div className="container py-10 sm:py-14 lg:py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#121622] border border-[#C2A265]/20 flex items-center justify-center">
            <Heart className="w-8 h-8 text-ayur-gold" />
          </div>
          <h1 className="font-heading text-xl sm:text-2xl font-medium text-ayur-ivory mb-2">Your wishlist is empty</h1>
          <p className="text-xs sm:text-sm text-[#C4BDA8] mb-6">Save products you love for later.</p>
          <Link href="/shop">
            <Button variant="gold" size="md" className="w-full sm:w-auto text-xs font-bold">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5 sm:py-7 lg:py-9">
      <div className="flex items-center gap-3 mb-5 sm:mb-6">
        <Link href="/" className="p-2 rounded-lg text-ayur-stone hover:text-ayur-gold hover:bg-[#18202C] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-heading text-xl sm:text-2xl font-medium text-ayur-ivory">My Wishlist ({itemCount})</h1>
      </div>

      <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
  const primaryImage = getProductImage(item.product, item.productId, 'card')
  const currentPrice = item.product.variants.find(v => v.id === item.variantId)?.price || item.product.price
  const compareAtPrice = item.product.variants.find(v => v.id === item.variantId)?.compareAtPrice || item.product.compareAtPrice

  return (
    <article className="card-luxury rounded-2xl overflow-hidden group relative">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#121622]">
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
            className="w-9 h-9 rounded-full bg-[#08090C]/90 border border-[#C2A265]/30 flex items-center justify-center shadow-medium text-[#C4BDA8] hover:text-red-400 transition-colors"
            aria-label="Remove from wishlist"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
          <Button size="sm" variant="gold" onClick={() => onMoveToCart(item)} className="w-28 text-xs font-bold">
            <ShoppingBag className="w-4 h-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium text-ayur-ivory line-clamp-1 group-hover:text-ayur-gold transition-colors">
            <Link href={`/product/${item.product.slug}`}>{item.product.name}</Link>
          </h3>
        </div>
        <PriceDisplay price={currentPrice} compareAtPrice={compareAtPrice} />
        <Button variant="gold-outline" size="sm" className="w-full text-xs font-semibold" onClick={() => onMoveToCart(item)}>
          Move to Cart
        </Button>
      </div>
    </article>
  )
}