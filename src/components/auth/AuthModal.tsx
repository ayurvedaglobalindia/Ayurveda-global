'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  Sparkles,
  Lock,
  Phone,
  User as UserIcon,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
} from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useUserStore } from '@/store/userStore'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { formatINR, validatePhone, validateEmail } from '@/lib/utils/formatters'
import type { Product, User } from '@/types'

export interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  pendingItem?: {
    product: Product
    variantId?: string
    quantity?: number
    mode?: 'add-to-cart' | 'buy-now'
  } | null
}

export function AuthModal({ isOpen, onClose, pendingItem }: AuthModalProps) {
  const router = useRouter()
  const { login } = useUserStore()
  const { addItem } = useCartStore()
  const { openCartDrawer, showToast } = useUIStore()

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState<'input' | 'otp'>('input')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const completeAuthAndAction = (authenticatedUser: User) => {
    login(authenticatedUser)

    if (pendingItem?.product) {
      const qty = pendingItem.quantity || 1
      addItem(pendingItem.product, pendingItem.variantId, qty)

      showToast({
        type: 'success',
        title: `Welcome, ${authenticatedUser.name || 'Member'}!`,
        message: `${pendingItem.product.name} has been added to your cart.`,
      })

      if (pendingItem.mode === 'buy-now') {
        onClose()
        router.push('/checkout')
        return
      } else {
        onClose()
        openCartDrawer()
        return
      }
    } else {
      showToast({
        type: 'success',
        title: `Welcome back, ${authenticatedUser.name || 'Member'}!`,
        message: 'Successfully signed in to your account.',
      })
      onClose()
    }
  }

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const cleanPhone = phone.trim().replace(/\D/g, '').slice(-10)
    if (!cleanPhone || cleanPhone.length !== 10) {
      setErrors({ phone: 'Please enter a valid 10-digit Indian mobile number' })
      return
    }

    if (activeTab === 'signup' && !name.trim()) {
      setErrors({ name: 'Please enter your full name' })
      return
    }

    if (email.trim() && !validateEmail(email.trim())) {
      setErrors({ email: 'Please enter a valid email address' })
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep('otp')
      setOtp('7514') // Simulated auto-OTP
      showToast({
        type: 'info',
        title: 'OTP Sent',
        message: `Verification code sent to +91 ${cleanPhone}. (Auto-filled: 7514)`,
      })
    }, 400)
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      const cleanPhone = phone.trim().replace(/\D/g, '').slice(-10)
      const userObj: User = {
        id: `usr-${cleanPhone}`,
        name: name.trim() || 'Ayurvedic Patron',
        email: email.trim() || `${cleanPhone}@ayurvedaglobal.com`,
        phone: cleanPhone,
        addresses: [],
        orders: [],
        wishlist: [],
        createdAt: new Date().toISOString(),
      }
      completeAuthAndAction(userObj)
    }, 400)
  }

  const handleQuickWhatsAppLogin = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const userObj: User = {
        id: `usr-wa-${Date.now().toString().slice(-6)}`,
        name: 'WhatsApp Patron',
        email: '',
        phone: '9123485451',
        addresses: [],
        orders: [],
        wishlist: [],
        createdAt: new Date().toISOString(),
      }
      completeAuthAndAction(userObj)
    }, 300)
  }

  const handleGuestCheckout = () => {
    if (pendingItem?.product) {
      const qty = pendingItem.quantity || 1
      addItem(pendingItem.product, pendingItem.variantId, qty)

      showToast({
        type: 'info',
        title: 'Continuing as Guest',
        message: `${pendingItem.product.name} added to your cart.`,
      })

      if (pendingItem.mode === 'buy-now') {
        onClose()
        router.push('/checkout')
        return
      } else {
        onClose()
        openCartDrawer()
        return
      }
    }
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center pt-1 pb-4">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-ayur-emerald-card border border-ayur-gold/35 flex items-center justify-center shadow-lg shadow-ayur-gold/10">
          <Sparkles className="w-5 h-5 text-ayur-gold" />
        </div>

        <span className="text-[10px] font-bold text-ayur-gold-light uppercase tracking-widest block mb-1">
          Apothecary Member Access
        </span>
        <h2 className="font-heading text-lg sm:text-xl font-medium text-ayur-ivory">
          {activeTab === 'login' ? 'Sign In to Your Account' : 'Join Ayur Veda Global'}
        </h2>
        <p className="text-xs text-ayur-stone mt-1 max-w-xs mx-auto leading-relaxed">
          {pendingItem?.product
            ? `Please sign in or create an account to add ${pendingItem.product.name} to your bag.`
            : 'Access exclusive Rasayana formulations, confidential order tracking & member benefits.'}
        </p>

        {/* Pending Product Pill */}
        {pendingItem?.product && (
          <div className="mt-3.5 p-2 rounded-xl bg-ayur-forest-deep/80 border border-ayur-gold/25 flex items-center gap-3 text-left max-w-xs mx-auto">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-ayur-void relative flex-shrink-0">
              <Image
                src={pendingItem.product.images[0]?.src || '/images/products/vitality-power-combo.jpg'}
                alt={pendingItem.product.name}
                fill
                className="object-contain p-0.5"
                sizes="40px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-ayur-ivory truncate">{pendingItem.product.name}</p>
              <p className="text-[11px] text-ayur-gold font-medium">{formatINR(pendingItem.product.price)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-ayur-gold/20 mb-5">
        <button
          type="button"
          onClick={() => { setActiveTab('login'); setStep('input') }}
          className={`flex-1 py-2 text-xs font-semibold text-center transition-colors border-b-2 -mb-px ${
            activeTab === 'login'
              ? 'border-ayur-gold text-ayur-gold-light'
              : 'border-transparent text-ayur-stone hover:text-ayur-cream'
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('signup'); setStep('input') }}
          className={`flex-1 py-2 text-xs font-semibold text-center transition-colors border-b-2 -mb-px ${
            activeTab === 'signup'
              ? 'border-ayur-gold text-ayur-gold-light'
              : 'border-transparent text-ayur-stone hover:text-ayur-cream'
          }`}
        >
          Create Account
        </button>
      </div>

      {step === 'input' ? (
        <form onSubmit={handleSendOtp} className="space-y-3.5">
          {activeTab === 'signup' && (
            <div>
              <label className="block text-[11px] font-semibold text-ayur-sand mb-1 uppercase tracking-wider">
                Full Name
              </label>
              <Input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Rajesh Sharma"
                icon={<UserIcon className="w-4 h-4 text-ayur-stone" />}
                required
              />
              {errors.name && <p className="text-rose-400 text-[10px] mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-ayur-sand mb-1 uppercase tracking-wider">
              10-Digit Mobile Number
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-xs text-ayur-gold font-mono font-semibold">+91</span>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="98765 43210"
                className="w-full pl-12 pr-3 py-2.5 bg-ayur-void/90 border border-ayur-gold/30 rounded-xl text-xs text-ayur-cream placeholder-ayur-stone/60 focus:outline-none focus:ring-1 focus:ring-ayur-gold transition-all font-mono"
                required
                autoFocus
              />
            </div>
            {errors.phone && <p className="text-rose-400 text-[10px] mt-1">{errors.phone}</p>}
          </div>

          {activeTab === 'signup' && (
            <div>
              <label className="block text-[11px] font-semibold text-ayur-sand mb-1 uppercase tracking-wider">
                Email Address (Optional)
              </label>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="client@example.com"
                icon={<Mail className="w-4 h-4 text-ayur-stone" />}
              />
              {errors.email && <p className="text-rose-400 text-[10px] mt-1">{errors.email}</p>}
            </div>
          )}

          <Button
            type="submit"
            variant="gold"
            size="md"
            loading={loading}
            className="w-full font-bold shadow-lg gold-shimmer py-2.5 text-xs mt-2"
          >
            {activeTab === 'login' ? 'Send Verification OTP' : 'Join & Continue'}
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>

          {/* Quick WhatsApp Login */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleQuickWhatsAppLogin}
              className="w-full py-2 px-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 hover:border-emerald-500/60 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Instant 1-Click WhatsApp Login</span>
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div className="text-center space-y-1">
            <p className="text-xs text-ayur-cream">
              Enter 4-digit code sent to <strong className="text-ayur-gold font-mono">+91 {phone}</strong>
            </p>
            <button
              type="button"
              onClick={() => setStep('input')}
              className="text-[11px] text-ayur-gold hover:underline"
            >
              Change phone number
            </button>
          </div>

          <div className="flex justify-center">
            <input
              type="text"
              maxLength={4}
              value={otp}
              onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="••••"
              className="w-36 text-center tracking-[0.5em] font-mono text-xl py-2 px-3 bg-ayur-void border border-ayur-gold/40 rounded-xl text-ayur-gold focus:outline-none focus:ring-2 focus:ring-ayur-gold"
              autoFocus
              required
            />
          </div>

          <Button
            type="submit"
            variant="gold"
            size="md"
            loading={loading}
            className="w-full font-bold shadow-lg gold-shimmer py-2.5 text-xs"
          >
            Verify & Add to Cart
          </Button>
        </form>
      )}

      {/* Guest Fallback */}
      <div className="mt-5 pt-3.5 border-t border-ayur-forest-dark/60 text-center">
        <button
          type="button"
          onClick={handleGuestCheckout}
          className="text-xs text-ayur-stone hover:text-ayur-gold transition-colors underline underline-offset-4"
        >
          Skip & Continue as Guest
        </button>
      </div>
    </Modal>
  )
}
