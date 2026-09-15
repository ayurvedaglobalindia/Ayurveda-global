'use client'

import { ReactNode, createContext, useContext, useSyncExternalStore } from 'react'
import { useWhatsAppStore } from '@/store/whatsappStore'

interface WhatsAppContextType {
  store: ReturnType<typeof useWhatsAppStore>
}

const WhatsAppContext = createContext<WhatsAppContextType | null>(null)

export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const store = useWhatsAppStore()
  return (
    <WhatsAppContext.Provider value={{ store }}>
      {children}
    </WhatsAppContext.Provider>
  )
}

export function useWhatsApp() {
  const context = useContext(WhatsAppContext)
  if (!context) throw new Error('useWhatsApp must be used within WhatsAppProvider')
  return context.store
}

export function useWhatsAppSelector<T>(selector: (state: ReturnType<typeof useWhatsAppStore>) => T) {
  const store = useWhatsApp()
  return useSyncExternalStore(store.subscribe, () => selector(store.getState()), () => selector(store.getState()))
}