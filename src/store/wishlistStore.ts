import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { WishlistItem, Product } from '@/types'

interface WishlistStore {
  items: WishlistItem[]
  addItem: (product: Product, variantId?: string) => void
  removeItem: (productId: string, variantId?: string) => void
  clearWishlist: () => void
  isInWishlist: (productId: string, variantId?: string) => boolean
  moveToCart: (productId: string, variantId?: string, quantity?: number) => void
  getItemCount: () => number
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, variantId) => {
        const variant = variantId ? product.variants.find(v => v.id === variantId) : product.variants[0]
        const variantIdToUse = variant?.id || product.variants[0]?.id

        set(state => {
          if (state.items.some(item => item.productId === product.id && item.variantId === variantIdToUse)) {
            return state
          }

          const newItem: WishlistItem = {
            id: `${product.id}-${variantIdToUse}-${Date.now()}`,
            productId: product.id,
            variantId: variantIdToUse,
            product,
            addedAt: new Date().toISOString(),
          }
          return { items: [newItem, ...state.items] }
        })
      },

      removeItem: (productId, variantId) => {
        set(state => ({
          items: state.items.filter(
            item => !(item.productId === productId && item.variantId === variantId)
          ),
        }))
      },

      clearWishlist: () => {
        set({ items: [] })
      },

      isInWishlist: (productId, variantId) => {
        return get().items.some(
          item => item.productId === productId && item.variantId === variantId
        )
      },

      moveToCart: (productId, variantId, quantity = 1) => {
        const item = get().items.find(
          i => i.productId === productId && i.variantId === variantId
        )
        if (item) {
          get().removeItem(productId, variantId)
        }
      },

      getItemCount: () => {
        return get().items.length
      },
    }),
    {
      name: 'ayur-veda-wishlist',
      storage: createJSONStorage(() => localStorage),
    }
  )
)