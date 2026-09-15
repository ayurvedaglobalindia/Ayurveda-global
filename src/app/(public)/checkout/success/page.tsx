'use client'

import { useEffect } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, Package, MessageSquare, Home } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { useUIStore } from '@/store/uiStore'
import { buildWhatsAppUrl, buildOrderWhatsAppMessage } from '@/store/whatsappStore'

interface CheckoutSuccessPageProps {
  searchParams: Promise<{ order: string }>
}

export const metadata: Metadata = {
  title: 'Order Confirmed',
  description: 'Your order has been placed successfully',
}

export default function CheckoutSuccessPage({ searchParams }: CheckoutSuccessPageProps) {
  const { closeModal, showToast } = useUIStore()
  const [orderNumber, setOrderNumber] = useState('')

  useEffect(() => {
    searchParams.then(params => {
      if (params.order) {
        setOrderNumber(params.order)
      }
    })
  }, [searchParams])

  const handleWhatsAppShare = () => {
    const message = buildOrderWhatsAppMessage({
      orderId: orderNumber,
      orderNumber,
      customerName: '',
      customerPhone: '',
      shippingAddress: {
        firstName: '',
        lastName: '',
        addressLine1: '',
        city: '',
        state: '',
        pincode: '',
        phone: '',
      },
      items: [],
      subtotal: 0,
      shipping: 0,
      tax: 0,
      discount: 0,
      total: 0,
      paymentMethod: 'whatsapp',
    })
    window.open(buildWhatsAppUrl(message), '_blank')
  }

  return (
    <div className="container py-16 lg:py-24">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="w-24 h-24 mx-auto mb-8 rounded-full bg-ayur-forest flex items-center justify-center"
        >
          <CheckCircle className="w-12 h-12 text-ayur-cream" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-heading text-3xl md:text-4xl font-medium text-ayur-black mb-4"
        >
          Order Confirmed!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-ayur-stone text-lg mb-8"
        >
          Thank you for your order! Your order number is <strong className="text-ayur-black">{orderNumber}</strong>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mb-10"
        >
          <div className="p-6 rounded-2xl bg-ayur-cream">
            <Package className="w-10 h-10 text-ayur-forest mx-auto mb-3" />
            <h3 className="font-medium text-ayur-black mb-1">Order Placed</h3>
            <p className="text-ayur-stone text-sm">We've received your order</p>
          </div>
          <div className="p-6 rounded-2xl bg-ayur-cream">
            <MessageSquare className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <h3 className="font-medium text-ayur-black mb-1">WhatsApp Confirmation</h3>
            <p className="text-ayur-stone text-sm">Coordinate payment & delivery</p>
          </div>
          <div className="p-6 rounded-2xl bg-ayur-cream">
            <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-ayur-gold/20 flex items-center justify-center">
              <span className="text-ayur-gold font-bold">📦</span>
            </div>
            <h3 className="font-medium text-ayur-black mb-1">Processing Soon</h3>
            <p className="text-ayur-stone text-sm">We'll prepare your order</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            variant="whatsapp"
            size="lg"
            onClick={handleWhatsAppShare}
            className="flex-1"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Share on WhatsApp
          </Button>
          <Link href="/shop">
            <Button variant="outline" size="lg" className="flex-1">
              <Home className="w-5 h-5 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-sm text-ayur-stone"
        >
          You'll receive a WhatsApp message shortly with order details and payment instructions.
          Save your order number <strong className="text-ayur-black">{orderNumber}</strong> for reference.
        </motion.p>
      </div>
    </div>
  )
}

import { useState } from 'react'