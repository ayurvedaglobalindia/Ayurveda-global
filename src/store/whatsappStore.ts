import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { WhatsAppLeadEvent } from '@/types'

interface WhatsAppStore {
  leads: WhatsAppLeadEvent[]
  trackLead: (event: Omit<WhatsAppLeadEvent, 'id' | 'createdAt' | 'userAgent' | 'referrer'> & {
    userAgent?: string
    referrer?: string
  }) => void
  getLeads: () => WhatsAppLeadEvent[]
  clearLeads: () => void
}

const RAW_WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919123485451'
const cleanDigits = RAW_WHATSAPP_NUMBER.replace(/\D/g, '')
const WHATSAPP_NUMBER = cleanDigits.length === 10 ? `91${cleanDigits}` : cleanDigits

export const useWhatsAppStore = create<WhatsAppStore>()(
  persist(
    (set, get) => ({
      leads: [],

      trackLead: (eventData) => {
        const event: WhatsAppLeadEvent = {
          ...eventData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
        }

        set(state => ({
          leads: [event, ...state.leads].slice(0, 500),
        }))

        if (typeof window !== 'undefined') {
          fetch('/api/whatsapp/lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event),
          }).catch(() => {})
        }
      },

      getLeads: () => {
        return get().leads
      },

      clearLeads: () => {
        set({ leads: [] })
      },
    }),
    {
      name: 'ayur-veda-whatsapp-leads',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export function buildWhatsAppUrl(message: string): string {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

export function buildOrderWhatsAppMessage(data: {
  orderId?: string
  orderNumber?: string
  customerName: string
  customerPhone: string
  customerEmail?: string
  shippingAddress: {
    firstName: string
    lastName: string
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    pincode: string
    phone: string
  }
  items: Array<{
    name?: string
    productName?: string
    quantity: number
    price: number
    total: number
  }>
  subtotal: number
  shipping: number
  tax?: number
  discount: number
  total: number
  paymentMethod: string
  couponCode?: string
  notes?: string
}): string {
  const itemsList = data.items
    .map(
      (item, index) =>
        `${index + 1}. ${item.productName || item.name || 'Product'} x${item.quantity} — ₹${(item.total / 100).toLocaleString('en-IN')}`
    )
    .join('\n')

  return `🌿 *New Order - Ayur Veda Global*

*Order ID:* ${data.orderNumber || data.orderId || 'AVG-DIRECT'}

*Customer:* ${data.customerName}
*Phone:* ${data.customerPhone}
${data.customerEmail ? `*Email:* ${data.customerEmail}\n` : ''}
*Delivery Address:*
${data.shippingAddress.firstName} ${data.shippingAddress.lastName}
${data.shippingAddress.addressLine1}
${data.shippingAddress.addressLine2 || ''}
${data.shippingAddress.city}, ${data.shippingAddress.state} ${data.shippingAddress.pincode}

*Items:*
${itemsList}

*Subtotal:* ₹${(data.subtotal / 100).toLocaleString('en-IN')}
*Shipping:* ${data.shipping === 0 ? 'Free' : `₹${(data.shipping / 100).toLocaleString('en-IN')}`}
${data.discount > 0 ? `*Discount (${data.couponCode || 'Promo'}):* -₹${(data.discount / 100).toLocaleString('en-IN')}\n` : ''}*Total:* ₹${(data.total / 100).toLocaleString('en-IN')}
*Payment Method:* ${data.paymentMethod.toUpperCase()}
${data.notes ? `\n*Notes:* ${data.notes}` : ''}

---
Please confirm this order. Thank you! 🌿`
}

export function buildProductEnquiryMessage(data: {
  customerName?: string
  productName: string
  quantity: number
  enquiry: string
  source: string
}): string {
  return `🌿 *Enquiry - Ayur Veda Global*

*Customer:* ${data.customerName || 'Interested Customer'}
*Product:* ${data.productName}
*Quantity:* ${data.quantity}

*Message:* ${data.enquiry}

---
Please share pricing, delivery time, and availability. Thank you! 🌿`
}