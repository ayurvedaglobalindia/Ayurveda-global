import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User, Address } from '@/types'

interface UserStore {
  user: User | null
  isAuthenticated: boolean
  recentOrders: any[]
  login: (user: User) => void
  logout: () => void
  updateProfile: (data: Partial<User>) => void
  addAddress: (address: Address) => void
  updateAddress: (addressId: string, address: Address) => void
  removeAddress: (addressId: string) => void
  setDefaultAddress: (addressId: string) => void
  addOrder: (order: any) => void
}

const initialUser: User | null = null

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: initialUser,
      isAuthenticated: false,
      recentOrders: [],

      addOrder: (order) => {
        set(state => ({
          recentOrders: [order, ...(state.recentOrders || [])].slice(0, 50),
        }))
      },

      login: (user) => {
        set({ user, isAuthenticated: true })
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      updateProfile: (data) => {
        set(state => ({
          user: state.user ? { ...state.user, ...data } : null,
        }))
      },

      addAddress: (address) => {
        set(state => ({
          user: state.user ? {
            ...state.user,
            addresses: [...state.user.addresses, { ...address, id: `addr-${Date.now()}` }],
          } : null,
        }))
      },

      updateAddress: (addressId, address) => {
        set(state => ({
          user: state.user ? {
            ...state.user,
            addresses: state.user.addresses.map(a =>
              a.id === addressId ? { ...a, ...address } : a
            ),
          } : null,
        }))
      },

      removeAddress: (addressId) => {
        set(state => ({
          user: state.user ? {
            ...state.user,
            addresses: state.user.addresses.filter(a => a.id !== addressId),
          } : null,
        }))
      },

      setDefaultAddress: (addressId) => {
        set(state => {
          if (!state.user) return state
          const addresses = state.user.addresses.map((a, i) => ({
            ...a,
            id: i === 0 ? addressId : a.id,
          }))
          return { user: { ...state.user, addresses } }
        })
      },
    }),
    {
      name: 'ayur-veda-user',
      storage: createJSONStorage(() => localStorage),
    }
  )
)