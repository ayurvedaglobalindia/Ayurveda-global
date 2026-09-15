'use client'

import { ReactNode, createContext, useContext, useSyncExternalStore } from 'react'
import { useUIStore } from '@/store/uiStore'

interface UIContextType {
  store: ReturnType<typeof useUIStore>
}

const UIContext = createContext<UIContextType | null>(null)

export function UIProvider({ children }: { children: ReactNode }) {
  const store = useUIStore()
  return (
    <UIContext.Provider value={{ store }}>
      {children}
    </UIContext.Provider>
  )
}

export function useUI() {
  const context = useContext(UIContext)
  if (!context) throw new Error('useUI must be used within UIProvider')
  return context.store
}

export function useUISelector<T>(selector: (state: ReturnType<typeof useUIStore>) => T) {
  const store = useUI()
  return useSyncExternalStore(store.subscribe, () => selector(store.getState()), () => selector(store.getState()))
}