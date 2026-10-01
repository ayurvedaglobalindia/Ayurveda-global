import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { CartItem, CartState, Product } from '@/types'
import { getProductById, getProductBySlug, getProductImage } from '@/lib/products/registry'
import { calculateShipping } from '@/lib/shipping'

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
        const canonical = getProductById(product.id) || getProductBySlug(product.slug || product.id)
        const baseProduct = canonical ? { ...canonical, ...product } : product
        const resolvedImg = getProductImage(baseProduct, product.id)
        const images = (baseProduct.images && Array.isArray(baseProduct.images) && baseProduct.images.length > 0)
          ? baseProduct.images
          : [resolvedImg]

        const enrichedProduct: Product = {
          ...baseProduct,
          images,
        }

        const variant = variantId
          ? enrichedProduct.variants?.find(v => v.id === variantId)
          : enrichedProduct.variants?.[0]
        const price = variant?.price || enrichedProduct.price
        const variantIdToUse = variant?.id || enrichedProduct.variants?.[0]?.id || 'default'

        set(state => {
          const existingIndex = state.items.findIndex(
            item => item.productId === enrichedProduct.id && item.variantId === variantIdToUse
          )

          if (existingIndex >= 0) {
            const newItems = [...state.items]
            newItems[existingIndex].quantity += quantity
            newItems[existingIndex].product = enrichedProduct
            return { items: newItems }
          }

          const newItem: CartItem = {
            id: `${enrichedProduct.id}-${variantIdToUse}-${Date.now()}`,
            productId: enrichedProduct.id,
            variantId: variantIdToUse,
            quantity,
            price,
            product: enrichedProduct,
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
        if (items.length === 0) return 0
        const effectiveShipping = shipping > 0 ? shipping : calculateShipping(subtotal).cost
        return Math.max(0, subtotal - discount + effectiveShipping + tax)
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
      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray(state.items)) {
          state.items = state.items.map(item => {
            const canonical = getProductById(item.productId) || getProductBySlug(item.productId)
            const fallbackImg = getProductImage(item.product, item.productId)
            const baseProduct = canonical ? { ...canonical, ...item.product } : item.product
            const images = (baseProduct?.images && Array.isArray(baseProduct.images) && baseProduct.images.length > 0)
              ? baseProduct.images
              : [fallbackImg]

            return {
              ...item,
              product: {
                ...baseProduct,
                images,
              },
            }
          })
        }
      },
    }
  )
)