import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface Toast {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message?: string
  duration?: number
}

interface Modal {
  isOpen: boolean
  type: 'age-gate' | 'cart' | 'wishlist' | 'mobile-menu' | 'search' | 'checkout-success' | null
  data?: unknown
}

interface UIStore {
  toasts: Toast[]
  modals: Record<string, Modal>
  isCartDrawerOpen: boolean
  isWishlistDrawerOpen: boolean
  isMobileMenuOpen: boolean
  isSearchOpen: boolean
  ageVerifiedProducts: string[]
  showToast: (toast: Omit<Toast, 'id'>) => void
  dismissToast: (id: string) => void
  openModal: (type: Modal['type'], data?: unknown) => void
  closeModal: (type: Modal['type']) => void
  openCartDrawer: () => void
  closeCartDrawer: () => void
  openWishlistDrawer: () => void
  closeWishlistDrawer: () => void
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
  toggleSearch: () => void
  closeSearch: () => void
  verifyAge: (productId: string) => void
  isAgeVerified: (productId: string) => boolean
}

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      toasts: [],
      modals: {},
      isCartDrawerOpen: false,
      isWishlistDrawerOpen: false,
      isMobileMenuOpen: false,
      isSearchOpen: false,
      ageVerifiedProducts: [],

      showToast: (toast) => {
        const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        const newToast = { ...toast, id }
        set(state => ({ toasts: [...state.toasts, newToast] }))

        if (toast.duration !== 0) {
          setTimeout(() => {
            get().dismissToast(id)
          }, toast.duration || 5000)
        }
      },

      dismissToast: (id) => {
        set(state => ({ toasts: state.toasts.filter(t => t.id !== id) }))
      },

      openModal: (type, data) => {
        set(state => ({
          modals: {
            ...state.modals,
            [type]: { isOpen: true, type, data },
          },
        }))
      },

      closeModal: (type) => {
        set(state => {
          const newModals = { ...state.modals }
          if (newModals[type]) {
            newModals[type] = { ...newModals[type], isOpen: false }
          }
          return { modals: newModals }
        })
      },

      openCartDrawer: () => set({ isCartDrawerOpen: true }),
      closeCartDrawer: () => set({ isCartDrawerOpen: false }),

      openWishlistDrawer: () => set({ isWishlistDrawerOpen: true }),
      closeWishlistDrawer: () => set({ isWishlistDrawerOpen: false }),

      toggleMobileMenu: () => set(state => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      closeMobileMenu: () => set({ isMobileMenuOpen: false }),

      toggleSearch: () => set(state => ({ isSearchOpen: !state.isSearchOpen })),
      closeSearch: () => set({ isSearchOpen: false }),

      verifyAge: (productId) => {
        set(state => ({
          ageVerifiedProducts: [...new Set([...state.ageVerifiedProducts, productId])],
        }))
      },

      isAgeVerified: (productId) => {
        return get().ageVerifiedProducts.includes(productId)
      },
    }),
    {
      name: 'ayur-veda-ui',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        ageVerifiedProducts: state.ageVerifiedProducts,
      }),
    }
  )
)