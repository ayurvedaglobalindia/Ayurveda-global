import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { WhatsAppLeadEvent } from '@/types'

interface WhatsAppStore {
  leads: WhatsAppLeadEvent[]
  trackLead: (event: Omit<WhatsAppLeadEvent, 'id' | 'createdAt' | 'userAgent' | 'referrer'>) => void
  getLeads: () => WhatsAppLeadEvent[]
  clearLeads: () => void
}

const WHATSAPP_NUMBER = '9123485451'

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
  orderId: string
  orderNumber: string
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
    name: string
    quantity: number
    price: number
    total: number
  }>
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
  paymentMethod: 'whatsapp' | 'cod'
  couponCode?: string
  notes?: string
}): string {
  const formatINR = (paise: number) => `₹${(paise / 100).toFixed(2)}`

  const itemsText = data.items.map(item =>
    `${item.name} × ${item.quantity} = ${formatINR(item.total)}`
  ).join('\n')

  const address = data.shippingAddress
  const addressLines = [
    `${address.firstName} ${address.lastName}`,
    address.addressLine1,
    address.addressLine2,
    `${address.city}, ${address.state} ${address.pincode}`,
    `Phone: ${address.phone}`,
  ].filter(Boolean).join('\n')

  return `🌿 *New Order - Ayur Veda Global*

*Order ID:* ${data.orderNumber}
*Customer:* ${data.customerName}
*Phone:* ${data.customerPhone}
${data.customerEmail ? `*Email:* ${data.customerEmail}` : ''}

*Delivery Address:*
${addressLines}

*Order Items:*
${itemsText}

*Subtotal:* ${formatINR(data.subtotal)}
*Shipping:* ${formatINR(data.shipping)}
*Tax:* ${formatINR(data.tax)}
${data.discount > 0 ? `*Discount (${data.couponCode}):* -${formatINR(data.discount)}` : ''}
*Total:* ${formatINR(data.total)}

*Payment:* ${data.paymentMethod === 'whatsapp' ? 'WhatsApp Pay (UPI/Card/NetBanking)' : 'Cash on Delivery'}

${data.notes ? `*Notes:* ${data.notes}` : ''}

---
Please confirm this order and share payment details.
Thank you for choosing Ayur Veda Global! 🌿`
}

export function buildProductEnquiryMessage(data: {
  customerName: string
  productName: string
  quantity: number
  enquiry: string
  source: 'float' | 'product' | 'checkout' | 'contact'
}): string {
  return `🌿 *Product Enquiry - Ayur Veda Global*

*Customer:* ${data.customerName}
*Product:* ${data.productName}
*Quantity Interested:* ${data.quantity}
*Enquiry:* ${data.enquiry}

*Source:* ${data.source}

---
Please respond with product details, pricing, and availability.
Thank you! 🌿`
}