'use client'

import { ReactNode, createContext, useContext, useSyncExternalStore } from 'react'
import { useCartStore } from '@/store/cartStore'

interface CartContextType {
  store: ReturnType<typeof useCartStore>
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const store = useCartStore()
  return (
    <CartContext.Provider value={{ store }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context.store
}

export function useCartSelector<T>(selector: (state: ReturnType<typeof useCartStore>) => T) {
  const store = useCart()
  return useSyncExternalStore(store.subscribe, () => selector(store.getState()), () => selector(store.getState()))
}