'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  Sparkles,
  User as UserIcon,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  RotateCcw,
  AlertCircle,
} from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useUserStore } from '@/store/userStore'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { formatINR, validateEmail } from '@/lib/utils/formatters'
import { getProductImage } from '@/lib/products/registry'
import {
  sendOTP,
  verifyOTP,
  normalizeIndianPhone,
  getWhatsAppVerifyUrl,
} from '@/lib/auth/otpService'
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
  const [resendCooldown, setResendCooldown] = useState(0)
  const [liveTestCode, setLiveTestCode] = useState<string | null>(null)
  const [whatsappFallbackUrl, setWhatsappFallbackUrl] = useState('')

  // Resend Countdown Timer
  useEffect(() => {
    if (resendCooldown <= 0) return
    const timer = setInterval(() => {
      setResendCooldown(prev => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [resendCooldown])

  // Reset state when modal is closed/opened
  useEffect(() => {
    if (isOpen) {
      setStep('input')
      setOtp('')
      setErrors({})
      setLiveTestCode(null)
    }
  }, [isOpen])

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
        title: `Welcome, ${authenticatedUser.name || 'Member'}!`,
        message: 'Mobile number verified successfully.',
      })
      onClose()
    }
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const { isValid, phone: cleanPhone, error } = normalizeIndianPhone(phone)
    if (!isValid) {
      setErrors({ phone: error || 'Please enter a valid 10-digit Indian mobile number' })
      return
    }

    if (!name.trim()) {
      setErrors({ name: 'Please enter your full name for order delivery' })
      return
    }

    if (email.trim() && !validateEmail(email.trim())) {
      setErrors({ email: 'Please enter a valid email address' })
      return
    }

    setLoading(true)
    try {
      const result = await sendOTP(cleanPhone, name.trim())
      setLoading(false)

      if (!result.success) {
        setErrors({ phone: result.message })
        return
      }

      setStep('otp')
      setResendCooldown(30)
      if (result.simulatedOtp) {
        setLiveTestCode(result.simulatedOtp)
        setWhatsappFallbackUrl(getWhatsAppVerifyUrl(cleanPhone, result.simulatedOtp))
      }

      showToast({
        type: 'info',
        title: 'OTP Dispatched',
        message: result.message,
      })
    } catch {
      setLoading(false)
      setErrors({ phone: 'Failed to dispatch verification code. Please retry.' })
    }
  }

  const handleResendOtp = async () => {
    if (resendCooldown > 0 || loading) return
    const { isValid, phone: cleanPhone } = normalizeIndianPhone(phone)
    if (!isValid) return

    setLoading(true)
    setErrors({})
    try {
      const result = await sendOTP(cleanPhone, name.trim())
      setLoading(false)
      if (result.success) {
        setResendCooldown(30)
        if (result.simulatedOtp) {
          setLiveTestCode(result.simulatedOtp)
          setWhatsappFallbackUrl(getWhatsAppVerifyUrl(cleanPhone, result.simulatedOtp))
        }
        showToast({
          type: 'info',
          title: 'New OTP Sent',
          message: result.message,
        })
      } else {
        setErrors({ otp: result.message })
      }
    } catch {
      setLoading(false)
      setErrors({ otp: 'Network error while resending OTP.' })
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const { isValid, phone: cleanPhone } = normalizeIndianPhone(phone)
    if (!isValid) {
      setErrors({ otp: 'Invalid phone number format.' })
      return
    }

    if (otp.trim().length !== 6) {
      setErrors({ otp: 'Please enter all 6 digits of the verification code.' })
      return
    }

    setLoading(true)
    try {
      const result = await verifyOTP(cleanPhone, otp)
      setLoading(false)

      if (!result.success) {
        setErrors({ otp: result.message })
        return
      }

      const userObj: User = {
        id: `usr-${cleanPhone}`,
        name: name.trim() || 'Ayurvedic Patron',
        email: email.trim() || `${cleanPhone}@ayurvedaglobal.com`,
        phone: cleanPhone,
        addresses: [],
        orders: [],
        wishlist: [],
        createdAt: new Date().toISOString(),
        isPhoneVerified: true,
      }

      completeAuthAndAction(userObj)
    } catch {
      setLoading(false)
      setErrors({ otp: 'Verification failed. Please retry.' })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center pt-1 pb-3">
        <div className="w-12 h-12 mx-auto mb-2.5 rounded-full bg-[#FFFFFF] border border-[#999999]/30 flex items-center justify-center text-[#9E8047] shadow-xs">
          <Sparkles className="w-5 h-5 text-[#9E8047]" />
        </div>

        <span className="text-[10px] font-semibold text-[#4E5F52] uppercase tracking-wider block mb-0.5">
          Mobile Number Verification
        </span>
        <h2 className="font-heading text-lg sm:text-xl font-normal text-[#1C1D1F]">
          {step === 'input'
            ? activeTab === 'login'
              ? 'Customer Sign In'
              : 'Join Ayurveda Global'
            : 'Enter 6-Digit OTP'}
        </h2>
        <p className="text-xs text-[#737373] mt-1 max-w-xs mx-auto leading-relaxed">
          {pendingItem?.product
            ? `Please verify your name & mobile number to proceed with ${pendingItem.product.name}.`
            : 'Authentic Ayurvedic orders require a verified 10-digit mobile number for dispatch.'}
        </p>

        {/* Pending Product Pill */}
        {pendingItem?.product && (
          <div className="mt-3 p-2 rounded-xl bg-[#FFFFFF] border border-[#999999]/30 flex items-center gap-3 text-left max-w-xs mx-auto">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#FAF7F2] border border-[#999999]/20 relative flex-shrink-0">
              <Image
                src={getProductImage(pendingItem.product, pendingItem.product.id, 'thumb').src}
                alt={pendingItem.product.name}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-[#1C1D1F] truncate">{pendingItem.product.name}</p>
              <p className="text-[11px] text-[#4E5F52] font-semibold">{formatINR(pendingItem.product.price)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      {step === 'input' && (
        <div className="flex border-b border-[#999999]/30 mb-4">
          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2 text-xs font-semibold text-center transition-colors border-b-2 -mb-px ${
              activeTab === 'login'
                ? 'border-[#1C1D1F] text-[#1C1D1F]'
                : 'border-transparent text-[#737373] hover:text-[#1C1D1F]'
            }`}
          >
            Direct Verification
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-2 text-xs font-semibold text-center transition-colors border-b-2 -mb-px ${
              activeTab === 'signup'
                ? 'border-[#1C1D1F] text-[#1C1D1F]'
                : 'border-transparent text-[#737373] hover:text-[#1C1D1F]'
            }`}
          >
            New Customer
          </button>
        </div>
      )}

      {step === 'input' ? (
        <form onSubmit={handleSendOtp} className="space-y-3">
          {/* Full Name Field (Always collected for courier delivery) */}
          <div>
            <label className="block text-[11px] font-medium text-[#737373] mb-1 uppercase tracking-wider">
              Full Name <span className="text-[#9E8047]">*</span>
            </label>
            <Input
              value={name}
              onChange={e => {
                setName(e.target.value)
                if (errors.name) setErrors({ ...errors, name: '' })
              }}
              placeholder="e.g. Vikram Sharma"
              icon={<UserIcon className="w-4 h-4 text-[#737373]" />}
              required
            />
            {errors.name && <p className="text-rose-500 text-[10px] mt-1">{errors.name}</p>}
          </div>

          {/* 10-Digit Phone */}
          <div>
            <label className="block text-[11px] font-medium text-[#737373] mb-1 uppercase tracking-wider">
              10-Digit Mobile Number (+91) <span className="text-[#9E8047]">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-xs text-[#1C1D1F] font-mono font-semibold">+91</span>
              <input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={e => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 10)
                  setPhone(val)
                  if (errors.phone) setErrors({ ...errors, phone: '' })
                }}
                placeholder="98765 43210"
                className="w-full pl-12 pr-3 py-2.5 bg-[#FFFFFF] border border-[#999999]/30 rounded-xl text-xs text-[#1C1D1F] placeholder-[#999999] focus:outline-none focus:ring-1 focus:ring-[#1C1D1F] transition-all font-mono"
                required
                autoFocus
              />
            </div>
            {errors.phone && <p className="text-rose-500 text-[10px] mt-1">{errors.phone}</p>}
            <p className="text-[10px] text-[#737373] mt-1">We will send a 6-digit SMS verification code to this number.</p>
          </div>

          {activeTab === 'signup' && (
            <div>
              <label className="block text-[11px] font-medium text-[#737373] mb-1 uppercase tracking-wider">
                Email Address (Optional)
              </label>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="vikram@example.com"
                icon={<Mail className="w-4 h-4 text-[#737373]" />}
              />
              {errors.email && <p className="text-rose-500 text-[10px] mt-1">{errors.email}</p>}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
            className="w-full font-semibold py-2.5 text-xs mt-3 rounded-full"
          >
            <span>Send 6-Digit OTP</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>

          <div className="flex items-center justify-center gap-1.5 text-[10.5px] text-[#737373] pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4E5F52]" />
            <span>100% Secure &amp; Confidential Verification</span>
          </div>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div className="text-center space-y-1 bg-[#FAF7F2] p-3 rounded-xl border border-[#999999]/30">
            <p className="text-xs text-[#1C1D1F]">
              Enter 6-digit OTP sent to: <strong className="text-[#1C1D1F] font-mono">+91 {phone}</strong>
            </p>
            <button
              type="button"
              onClick={() => {
                setStep('input')
                setOtp('')
                setErrors({})
              }}
              className="text-[11px] text-[#4E5F52] hover:underline font-medium inline-flex items-center gap-1 mt-0.5"
            >
              <span>Wrong number? Change phone</span>
            </button>
          </div>

          {/* Live Dispatch Indicator Banner */}
          {liveTestCode && (
            <div className="p-2.5 rounded-xl bg-[#EFF4F0] border border-[#4E5F52]/30 text-[#4E5F52] text-center space-y-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider block text-[#4E5F52]">
                SMS Gateway Dispatch Code
              </span>
              <span className="font-mono text-base font-bold tracking-widest text-[#1C1D1F] bg-[#FFFFFF] px-3 py-1 rounded border border-[#4E5F52]/30 inline-block">
                {liveTestCode}
              </span>
              <p className="text-[10px] text-[#555555]">
                Auto-generated verification code (Live SMS Gateways: 2Factor.in / Fast2SMS).
              </p>
            </div>
          )}

          {/* 6-Digit OTP Input */}
          <div>
            <div className="flex justify-center">
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={e => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 6)
                  setOtp(val)
                  if (errors.otp) setErrors({ ...errors, otp: '' })
                }}
                placeholder="••••••"
                className="w-48 text-center tracking-[0.4em] font-mono text-2xl py-2.5 px-3 bg-[#FFFFFF] border border-[#999999]/40 rounded-xl text-[#1C1D1F] focus:outline-none focus:ring-2 focus:ring-[#1C1D1F] shadow-inner"
                autoFocus
                required
              />
            </div>
            {errors.otp && (
              <p className="text-rose-500 text-[11px] text-center mt-2 flex items-center justify-center gap-1">
                <AlertCircle className="w-3 h-3 flex-shrink-0" />
                <span>{errors.otp}</span>
              </p>
            )}
          </div>

          {/* Resend & WhatsApp Option */}
          <div className="flex items-center justify-between text-xs px-1">
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendCooldown > 0 || loading}
              className={`flex items-center gap-1 font-medium transition-colors ${
                resendCooldown > 0
                  ? 'text-[#999999] cursor-not-allowed'
                  : 'text-[#4E5F52] hover:underline'
              }`}
            >
              <RotateCcw className="w-3 h-3" />
              <span>{resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : 'Resend OTP'}</span>
            </button>

            {whatsappFallbackUrl && (
              <a
                href={whatsappFallbackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#4E5F52] hover:underline flex items-center gap-1 font-medium"
              >
                <MessageCircle className="w-3 h-3" />
                <span>Verify via WhatsApp</span>
              </a>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
            className="w-full font-semibold py-2.5 text-xs rounded-full shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            <span>Verify Mobile &amp; Continue</span>
          </Button>
        </form>
      )}
    </Modal>
  )
}
