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

function formatPaiseToINR(amount: number | undefined): string {
  if (!amount || amount === 0) return '0'
  const rupees = amount >= 10000 ? Math.round(amount / 100) : Math.round(amount)
  return rupees.toLocaleString('en-IN')
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
    variantName?: string
    quantity: number
    price: number
    total?: number
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
    .map((item, index) => {
      const title = item.productName || item.name || 'Product'
      const variant = item.variantName ? ` (${item.variantName})` : ''
      const itemTotal = item.total !== undefined ? item.total : item.price * item.quantity
      return `• *${index + 1}. ${title}${variant}* x${item.quantity} — ₹${formatPaiseToINR(itemTotal)}`
    })
    .join('\n')

  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  const addressLine2Str = data.shippingAddress.addressLine2 ? `\n${data.shippingAddress.addressLine2}` : ''
  const emailStr = data.customerEmail ? `\n• *Email:* ${data.customerEmail}` : ''
  const discountStr = data.discount > 0 ? `\n• *Discount (${data.couponCode || 'Promo'}):* -₹${formatPaiseToINR(data.discount)}` : ''
  const notesStr = data.notes && data.notes.trim() ? `\n\n📝 *Delivery Note:* ${data.notes.trim()}` : ''

  const paymentLabels: Record<string, string> = {
    whatsapp: 'WhatsApp Direct Confirmation / Concierge',
    cod: 'Cash on Delivery (Doorstep COD)',
    upi: 'Instant UPI (PhonePe / GPay / Paytm)',
    card: 'Online / Card Payment',
  }
  const paymentLabel = paymentLabels[data.paymentMethod.toLowerCase()] || data.paymentMethod.toUpperCase()

  return `🌿 *ORDER CONFIRMATION — AYUR VEDA GLOBAL*
━━━━━━━━━━━━━━━━━━━━━━━━━
📦 *Order ID:* ${data.orderNumber || data.orderId || 'AVG-DIRECT'}
📅 *Date:* ${dateStr}

👤 *CUSTOMER DETAILS:*
• *Name:* ${data.customerName}
• *Phone:* ${data.customerPhone}${emailStr}

📍 *DELIVERY ADDRESS:*
${data.customerName}
${data.shippingAddress.addressLine1}${addressLine2Str}
${data.shippingAddress.city}, ${data.shippingAddress.state} - ${data.shippingAddress.pincode}
Contact: ${data.shippingAddress.phone || data.customerPhone}

🛍️ *ORDERED ITEMS:*
${itemsList}

━━━━━━━━━━━━━━━━━━━━━━━━━
💰 *ORDER SUMMARY:*
• *Subtotal:* ₹${formatPaiseToINR(data.subtotal)}
• *Shipping:* ${data.shipping === 0 ? 'FREE (Express Courier)' : `₹${formatPaiseToINR(data.shipping)}`}${discountStr}
• *Total Payable:* ₹${formatPaiseToINR(data.total)}
• *Payment Mode:* ${paymentLabel}${notesStr}

━━━━━━━━━━━━━━━━━━━━━━━━━
🔒 *100% Confidential Delivery Guarantee*
Dispatched in plain unmarked packaging with zero product labels on exterior carton.
Please confirm and share tracking details. Pranam! 🌿`
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