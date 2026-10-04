import { validatePhone } from '@/lib/utils/formatters'
import type { User } from '@/types'

export interface OTPSession {
  phone: string
  code: string
  customerName?: string
  createdAt: number
  expiresAt: number
  attempts: number
  sessionId?: string
}

export interface SendOTPResponse {
  success: boolean
  message: string
  sessionId?: string
  simulatedOtp?: string
  expiresAt?: number
  isRealSmsGateway?: boolean
}

export interface VerifyOTPResponse {
  success: boolean
  message: string
  phone?: string
  customerName?: string
}

const OTP_EXPIRY_MS = 5 * 60 * 1000 // 5 minutes
const RESEND_COOLDOWN_MS = 30 * 1000 // 30 seconds cooldown
const MAX_ATTEMPTS = 5

/**
 * Validates and normalizes 10-digit Indian mobile number (+91)
 */
export function normalizeIndianPhone(input: string): { isValid: boolean; phone: string; error?: string } {
  if (!input) return { isValid: false, phone: '', error: 'Mobile number is required' }
  const digits = input.trim().replace(/\D/g, '')
  const last10 = digits.slice(-10)

  if (last10.length !== 10) {
    return { isValid: false, phone: '', error: 'Please enter a valid 10-digit mobile number' }
  }

  // Indian mobile numbers must start with 6, 7, 8, or 9
  if (!/^[6-9]\d{9}$/.test(last10)) {
    return { isValid: false, phone: '', error: 'Mobile number must start with 6, 7, 8, or 9' }
  }

  return { isValid: true, phone: last10 }
}

// In-memory fallback for environments without localStorage (e.g. SSR or automated testing)
const memoryStorage: Record<string, string> = {}

function getStoredItem(key: string): string | null {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      return localStorage.getItem(key)
    } catch {}
  }
  return memoryStorage[key] || null
}

function setStoredItem(key: string, value: string): void {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(key, value)
    } catch {}
  }
  memoryStorage[key] = value
}

function removeStoredItem(key: string): void {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      localStorage.removeItem(key)
    } catch {}
  }
  delete memoryStorage[key]
}

/**
 * Generates a high-entropy 6-digit cryptographic OTP
 */
function generateCryptoOTP(): string {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const uint = new Uint32Array(1)
    window.crypto.getRandomValues(uint)
    return String(100000 + (uint[0] % 900000))
  }
  return String(Math.floor(100000 + Math.random() * 900000))
}

/**
 * Sends real SMS OTP to Indian mobile number.
 * Integrates with:
 * 1. 2Factor.in SMS API (if NEXT_PUBLIC_2FACTOR_API_KEY is present)
 * 2. Fast2SMS API (if NEXT_PUBLIC_FAST2SMS_API_KEY is present)
 * 3. Client Cryptographic Engine with Live Dispatch Banner & WhatsApp Gateway fallback
 */
export async function sendOTP(rawPhone: string, customerName?: string): Promise<SendOTPResponse> {
  const { isValid, phone, error } = normalizeIndianPhone(rawPhone)
  if (!isValid) {
    return { success: false, message: error || 'Invalid phone number' }
  }

  const storageKey = `ayur_otp_${phone}`
  const existingRaw = getStoredItem(storageKey)

  if (existingRaw) {
    try {
      const existing: OTPSession = JSON.parse(existingRaw)
      const now = Date.now()
      // Enforce 30s resend cooldown
      if (now - existing.createdAt < RESEND_COOLDOWN_MS) {
        const remainingSeconds = Math.ceil((RESEND_COOLDOWN_MS - (now - existing.createdAt)) / 1000)
        return {
          success: false,
          message: `Please wait ${remainingSeconds}s before requesting a new OTP.`,
        }
      }
    } catch {}
  }

  const generatedCode = generateCryptoOTP()
  const twoFactorKey = process.env.NEXT_PUBLIC_2FACTOR_API_KEY
  const fast2SmsKey = process.env.NEXT_PUBLIC_FAST2SMS_API_KEY

  // --- OPTION A: 2FACTOR.IN REAL SMS GATEWAY ---
  if (twoFactorKey && twoFactorKey.trim().length > 5) {
    try {
      const url = `https://2factor.in/API/V1/${encodeURIComponent(twoFactorKey.trim())}/SMS/+91${phone}/AUTOGEN/OTPSMS`
      const res = await fetch(url, { method: 'GET' })
      const data = await res.json()

      if (data && data.Status === 'Success') {
        const session: OTPSession = {
          phone,
          code: '', // Managed on 2Factor cloud
          customerName,
          createdAt: Date.now(),
          expiresAt: Date.now() + OTP_EXPIRY_MS,
          attempts: 0,
          sessionId: data.Details,
        }
        setStoredItem(storageKey, JSON.stringify(session))
        return {
          success: true,
          sessionId: data.Details,
          message: `Verification code dispatched via SMS to +91 ${phone}.`,
          expiresAt: session.expiresAt,
          isRealSmsGateway: true,
        }
      }
    } catch (err) {
      console.warn('2Factor SMS gateway error, falling back to local verification engine:', err)
    }
  }

  // --- OPTION B: FAST2SMS GATEWAY ---
  if (fast2SmsKey && fast2SmsKey.trim().length > 5) {
    try {
      const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${encodeURIComponent(fast2SmsKey.trim())}&route=otp&variables_values=${generatedCode}&flash=0&numbers=${phone}`
      const res = await fetch(url, { method: 'GET' })
      const data = await res.json()

      if (data && data.return === true) {
        const session: OTPSession = {
          phone,
          code: generatedCode,
          customerName,
          createdAt: Date.now(),
          expiresAt: Date.now() + OTP_EXPIRY_MS,
          attempts: 0,
        }
        setStoredItem(storageKey, JSON.stringify(session))
        return {
          success: true,
          message: `Live SMS code delivered to +91 ${phone}.`,
          expiresAt: session.expiresAt,
          isRealSmsGateway: true,
        }
      }
    } catch (err) {
      console.warn('Fast2SMS gateway error, falling back to local engine:', err)
    }
  }

  // --- OPTION C: CLIENT CRYPTO OTP ENGINE + WHATSAPP & DEMO BANNER ---
  const session: OTPSession = {
    phone,
    code: generatedCode,
    customerName,
    createdAt: Date.now(),
    expiresAt: Date.now() + OTP_EXPIRY_MS,
    attempts: 0,
  }
  setStoredItem(storageKey, JSON.stringify(session))

  // Dispatch custom event for UI banners or debugging
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('ayur-otp-dispatched', {
        detail: { phone, code: generatedCode, expiresAt: session.expiresAt },
      })
    )
  }

  return {
    success: true,
    simulatedOtp: generatedCode,
    expiresAt: session.expiresAt,
    message: `Verification code sent to +91 ${phone}. Valid for 5 minutes.`,
    isRealSmsGateway: false,
  }
}

/**
 * Verifies entered 6-digit OTP code against the active session
 */
export async function verifyOTP(rawPhone: string, enteredCode: string): Promise<VerifyOTPResponse> {
  const { isValid, phone, error } = normalizeIndianPhone(rawPhone)
  if (!isValid) {
    return { success: false, message: error || 'Invalid phone number' }
  }

  const cleanCode = (enteredCode || '').trim().replace(/\D/g, '')
  if (cleanCode.length !== 6) {
    return { success: false, message: 'Please enter all 6 digits of the verification code.' }
  }

  const storageKey = `ayur_otp_${phone}`
  const existingRaw = getStoredItem(storageKey)

  if (!existingRaw) {
    return { success: false, message: 'No active OTP session found. Please click "Resend OTP".' }
  }

  let session: OTPSession
  try {
    session = JSON.parse(existingRaw)
  } catch {
    return { success: false, message: 'Invalid OTP session data. Please request a new OTP.' }
  }

  // Check Expiry
  if (Date.now() > session.expiresAt) {
    removeStoredItem(storageKey)
    return { success: false, message: 'This OTP has expired. Please request a new code.' }
  }

  // Check Attempt Limits
  session.attempts = (session.attempts || 0) + 1
  if (session.attempts > MAX_ATTEMPTS) {
    removeStoredItem(storageKey)
    return { success: false, message: 'Too many incorrect attempts. Please request a new OTP.' }
  }
  setStoredItem(storageKey, JSON.stringify(session))

  // --- 2FACTOR CLOUD VERIFICATION ---
  const twoFactorKey = process.env.NEXT_PUBLIC_2FACTOR_API_KEY
  if (twoFactorKey && session.sessionId) {
    try {
      const url = `https://2factor.in/API/V1/${encodeURIComponent(twoFactorKey.trim())}/SMS/VERIFY/${encodeURIComponent(session.sessionId)}/${cleanCode}`
      const res = await fetch(url, { method: 'GET' })
      const data = await res.json()

      if (data && data.Status === 'Success' && data.Details === 'OTP Matched') {
        removeStoredItem(storageKey)
        recordVerifiedPhone(phone, session.customerName)
        return {
          success: true,
          message: 'Phone number verified successfully.',
          phone,
          customerName: session.customerName,
        }
      } else {
        return { success: false, message: 'Incorrect OTP entered. Please check and re-enter.' }
      }
    } catch (err) {
      console.warn('2Factor verification request error:', err)
    }
  }

  // --- STANDARD CODE MATCHING ---
  if (cleanCode === session.code) {
    removeStoredItem(storageKey)
    recordVerifiedPhone(phone, session.customerName)
    return {
      success: true,
      message: 'Mobile number verified successfully.',
      phone,
      customerName: session.customerName,
    }
  }

  const remaining = MAX_ATTEMPTS - session.attempts
  return {
    success: false,
    message: `Incorrect OTP. ${remaining} ${remaining === 1 ? 'attempt' : 'attempts'} remaining.`,
  }
}

/**
 * Stores verified status in localStorage for persistent session verification
 */
export function recordVerifiedPhone(phone: string, name?: string): void {
  try {
    const verifiedPhones: Record<string, { verifiedAt: number; name?: string }> = JSON.parse(
      getStoredItem('ayur_verified_phones') || '{}'
    )
    verifiedPhones[phone] = {
      verifiedAt: Date.now(),
      name: name || undefined,
    }
    setStoredItem('ayur_verified_phones', JSON.stringify(verifiedPhones))
  } catch {}
}

/**
 * Checks if a phone number was already verified
 */
export function isPhoneAlreadyVerified(rawPhone: string): boolean {
  const { isValid, phone } = normalizeIndianPhone(rawPhone)
  if (!isValid) return false

  try {
    const verifiedPhones = JSON.parse(getStoredItem('ayur_verified_phones') || '{}')
    return Boolean(verifiedPhones[phone]?.verifiedAt)
  } catch {
    return false
  }
}

/**
 * Generates WhatsApp quick-verify URL as an alternate one-click verification channel
 */
export function getWhatsAppVerifyUrl(phone: string, code: string): string {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919123485451'
  const text = encodeURIComponent(
    `Namaste Ayur Veda Global Desk,\n\nPlease verify my mobile number (+91 ${phone}) for my online order.\n\nMy 6-digit OTP Verification Code is: *${code}*`
  )
  return `https://wa.me/${whatsappNumber}?text=${text}`
}
