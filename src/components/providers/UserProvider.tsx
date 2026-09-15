'use client'

import { ReactNode, createContext, useContext, useSyncExternalStore } from 'react'
import { useUserStore } from '@/store/userStore'

interface UserContextType {
  store: ReturnType<typeof useUserStore>
}

const UserContext = createContext<UserContextType | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const store = useUserStore()
  return (
    <UserContext.Provider value={{ store }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within UserProvider')
  return context.store
}

export function useUserSelector<T>(selector: (state: ReturnType<typeof useUserStore>) => T) {
  const store = useUser()
  return useSyncExternalStore(store.subscribe, () => selector(store.getState()), () => selector(store.getState()))
}