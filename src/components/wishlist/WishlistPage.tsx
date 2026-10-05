'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Heart, ArrowLeft, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { PriceDisplay } from '@/components/ui/PriceDisplay'
import { getProductImage } from '@/lib/products/registry'
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
    addItem(item.product, item.variantId, 1)
    removeItem(item.productId, item.variantId)
    showToast({ type: 'success', title: 'Moved to Cart', message: `${item.product.name} added to your cart.` })
  }

  const handleRemove = (productId: string, variantId?: string) => {
    removeItem(productId, variantId)
    showToast({ type: 'info', title: 'Removed from Wishlist' })
  }

  if (items.length === 0) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F]">
        <div className="container py-12 sm:py-16">
          <div className="max-w-md mx-auto text-center space-y-3">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#FFFFFF] border border-[#999999]/30 flex items-center justify-center text-[#4E5F52]">
              <Heart className="w-6 h-6" />
            </div>
            <h1 className="font-heading text-2xl font-normal text-[#1C1D1F]">Your Wishlist is Empty</h1>
            <p className="text-xs text-[#555555] font-sans">Save your preferred Ayurvedic formulations to review anytime.</p>
            <div className="pt-3">
              <Link href="/shop">
                <Button variant="primary" size="md" className="px-6 py-2.5 rounded-full bg-[#1C1D1F] hover:bg-[#333333] text-[#FAF7F2] text-xs font-medium uppercase tracking-wider">
                  Browse Formulations
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#1C1D1F]">
      <div className="container py-6 sm:py-8 lg:py-10">
        
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#999999]/30">
          <Link href="/" className="p-2 rounded-lg text-[#737373] hover:text-[#1C1D1F] transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-normal text-[#1C1D1F]">Saved Wishlist</h1>
            <p className="text-xs text-[#737373] font-mono mt-0.5">{itemCount} formulation{itemCount !== 1 ? 's' : ''} saved</p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map(item => (
            <WishlistItemCard key={item.id} item={item} onMoveToCart={handleMoveToCart} onRemove={handleRemove} />
          ))}
        </div>

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
    <article className="rounded-xl overflow-hidden bg-[#FFFFFF] border border-[#999999]/30 shadow-xs flex flex-col justify-between group">
      <div>
        <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F1EB]">
          <Link href={`/product/${item.product.slug}`}>
            <Image
              src={primaryImage.src}
              alt={primaryImage.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </Link>
          <div className="absolute top-2.5 right-2.5">
            <button
              onClick={() => onRemove(item.productId, item.variantId)}
              className="w-8 h-8 rounded-full bg-[#FFFFFF]/90 border border-[#999999]/30 flex items-center justify-center text-[#737373] hover:text-red-600 transition-colors shadow-xs"
              aria-label="Remove from wishlist"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <h3 className="font-heading text-sm font-medium text-[#1C1D1F] line-clamp-1 group-hover:text-[#9E8047] transition-colors">
            <Link href={`/product/${item.product.slug}`}>{item.product.name}</Link>
          </h3>
          <PriceDisplay price={currentPrice} compareAtPrice={compareAtPrice} size="sm" />
        </div>
      </div>

      <div className="p-4 pt-0">
        <Button
          variant="outline"
          size="sm"
          className="w-full text-xs font-medium uppercase tracking-wider py-2 border-[#1C1D1F] text-[#1C1D1F] hover:bg-[#1C1D1F] hover:text-[#FAF7F2] transition-colors"
          onClick={() => onMoveToCart(item)}
        >
          <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
          Move to Cart
        </Button>
      </div>
    </article>
  )
}