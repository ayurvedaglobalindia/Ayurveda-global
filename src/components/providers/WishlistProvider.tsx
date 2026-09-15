'use client'

import { ReactNode, createContext, useContext, useSyncExternalStore } from 'react'
import { useWishlistStore } from '@/store/wishlistStore'

interface WishlistContextType {
  store: ReturnType<typeof useWishlistStore>
}

const WishlistContext = createContext<WishlistContextType | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const store = useWishlistStore()
  return (
    <WishlistContext.Provider value={{ store }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used within WishlistProvider')
  return context.store
}

export function useWishlistSelector<T>(selector: (state: ReturnType<typeof useWishlistStore>) => T) {
  const store = useWishlist()
  return useSyncExternalStore(store.subscribe, () => selector(store.getState()), () => selector(store.getState()))
}