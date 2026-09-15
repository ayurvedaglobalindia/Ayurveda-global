'use client'

import { ReactNode } from 'react'
import { CartProvider } from './CartProvider'
import { WishlistProvider } from './WishlistProvider'
import { UserProvider } from './UserProvider'
import { WhatsAppProvider } from './WhatsAppProvider'
import { UIProvider } from './UIProvider'

export function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <UserProvider>
          <WhatsAppProvider>
            <UIProvider>
              {children}
            </UIProvider>
          </WhatsAppProvider>
        </UserProvider>
      </WishlistProvider>
    </CartProvider>
  )
}