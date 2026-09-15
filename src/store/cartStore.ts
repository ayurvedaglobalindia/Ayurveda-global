import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CartItem, CartState, Product } from '@/types'

interface CartStore extends CartState {
  addItem: (product: Product, variantId?: string, quantity?: number) => void
  removeItem: (productId: string, variantId?: string) => void
  updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void
  clearCart: () => void
  applyCoupon: (code: string, discount: number) => void
  removeCoupon: () => void
  setShipping: (shipping: number) => void
  setTax: (tax: number) => void
  getSubtotal: () => number
  getTotal: () => number
  getItemCount: () => number
  isInCart: (productId: string, variantId?: string) => boolean
  getItemQuantity: (productId: string, variantId?: string) => number
  reserveStock: () => Promise<boolean>
  releaseStock: () => void
}

const initialState: CartState = {
  items: [],
  discount: 0,
  shipping: 0,
  tax: 0,
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addItem: (product, variantId, quantity = 1) => {
        const variant = variantId ? product.variants.find(v => v.id === variantId) : product.variants[0]
        const price = variant?.price || product.price
        const variantIdToUse = variant?.id || product.variants[0]?.id

        set(state => {
          const existingIndex = state.items.findIndex(
            item => item.productId === product.id && item.variantId === variantIdToUse
          )

          if (existingIndex >= 0) {
            const newItems = [...state.items]
            newItems[existingIndex].quantity += quantity
            return { items: newItems }
          }

          const newItem: CartItem = {
            id: `${product.id}-${variantIdToUse}-${Date.now()}`,
            productId: product.id,
            variantId: variantIdToUse,
            quantity,
            price,
            product,
          }
          return { items: [...state.items, newItem] }
        })
      },

      removeItem: (productId, variantId) => {
        set(state => ({
          items: state.items.filter(
            item => !(item.productId === productId && item.variantId === variantId)
          ),
        }))
      },

      updateQuantity: (productId, variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId)
          return
        }

        set(state => ({
          items: state.items.map(item =>
            item.productId === productId && item.variantId === variantId
              ? { ...item, quantity }
              : item
          ),
        }))
      },

      clearCart: () => {
        set(initialState)
      },

      applyCoupon: (code, discount) => {
        set({ couponCode: code, discount })
      },

      removeCoupon: () => {
        set({ couponCode: undefined, discount: 0 })
      },

      setShipping: (shipping) => {
        set({ shipping })
      },

      setTax: (tax) => {
        set({ tax })
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      },

      getTotal: () => {
        const { items, discount, shipping, tax } = get()
        const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        return Math.max(0, subtotal - discount + shipping + tax)
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },

      isInCart: (productId, variantId) => {
        return get().items.some(
          item => item.productId === productId && item.variantId === variantId
        )
      },

      getItemQuantity: (productId, variantId) => {
        const item = get().items.find(
          i => i.productId === productId && i.variantId === variantId
        )
        return item?.quantity || 0
      },

      reserveStock: async () => {
        return true
      },

      releaseStock: () => {
      },
    }),
    {
      name: 'ayur-veda-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        items: state.items,
        couponCode: state.couponCode,
        discount: state.discount,
      }),
    }
  )
)