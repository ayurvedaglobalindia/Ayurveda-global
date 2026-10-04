/**
 * Shared OTP Utilities & Provider Engine for Cloudflare Pages Serverless Functions.
 * Handles Indian phone validation, rate-limiting, cooldowns, session management,
 * and server-to-server SMS gateway dispatch (2Factor.in, Fast2SMS, Msg91).
 */

export interface Env {
  OTP_PROVIDER?: string // '2factor' | 'fast2sms' | 'msg91' | 'mock'
  TWOFACTOR_API_KEY?: string
  FAST2SMS_API_KEY?: string
  MSG91_AUTH_KEY?: string
  MSG91_TEMPLATE_ID?: string
  OTP_TEST_MODE?: string // 'true' | 'false' (default: 'true' unless explicitly set to 'false' with valid API key)
  OTP_SECRET?: string // Used for cryptographic HMAC token signing
}

export interface OTPSessionData {
  phone: string
  code: string
  sessionId: string
  createdAt: number
  expiresAt: number
  attempts: number
  testMode: boolean
  customerName?: string
}

export interface RateLimitData {
  requestCount: number
  windowStart: number
  lastSentAt: number
}

// In-memory sliding window store for edge worker isolate
const sessionStore = new Map<string, OTPSessionData>()
const rateLimitStore = new Map<string, RateLimitData>()

export const OTP_CONFIG = {
  EXPIRY_MS: 5 * 60 * 1000, // 5 minutes
  RESEND_COOLDOWN_MS: 30 * 1000, // 30 seconds
  RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS_PER_WINDOW: 5, // max 5 OTP requests per phone per 15 min
  MAX_VERIFY_ATTEMPTS: 5, // max 5 failed verify attempts per session
}

/**
 * Validates and normalizes 10-digit Indian mobile number (+91)
 * Indian mobile numbers must start with 6, 7, 8, or 9
 */
export function normalizeIndianPhone(input: string): { isValid: boolean; phone: string; error?: string } {
  if (!input) return { isValid: false, phone: '', error: 'Mobile number is required' }
  const digits = String(input).trim().replace(/\D/g, '')
  const last10 = digits.slice(-10)

  if (last10.length !== 10) {
    return { isValid: false, phone: '', error: 'Please enter a valid 10-digit Indian mobile number' }
  }

  if (!/^[6-9]\d{9}$/.test(last10)) {
    return { isValid: false, phone: '', error: 'Mobile number must start with 6, 7, 8, or 9' }
  }

  return { isValid: true, phone: last10 }
}

/**
 * Generates a high-entropy 6-digit cryptographic OTP
 */
export function generateSecureCode(): string {
  const array = new Uint32Array(1)
  crypto.getRandomValues(array)
  return String(100000 + (array[0] % 900000))
}

/**
 * Standard CORS & JSON Response Helper
 */
export function jsonResponse(data: Record<string, any>, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

/**
 * Rate Limiter and Resend Cooldown Enforcer
 */
export function checkRateLimit(phone: string): { allowed: boolean; error?: string; remainingCooldown?: number } {
  const now = Date.now()
  const record = rateLimitStore.get(phone)

  if (!record) {
    return { allowed: true }
  }

  // 1. Check Resend Cooldown (30s)
  const timeSinceLast = now - record.lastSentAt
  if (timeSinceLast < OTP_CONFIG.RESEND_COOLDOWN_MS) {
    const remainingCooldown = Math.ceil((OTP_CONFIG.RESEND_COOLDOWN_MS - timeSinceLast) / 1000)
    return {
      allowed: false,
      error: `Please wait ${remainingCooldown}s before requesting a new OTP.`,
      remainingCooldown,
    }
  }

  // 2. Check 15-minute sliding window rate limit
  if (now - record.windowStart < OTP_CONFIG.RATE_LIMIT_WINDOW_MS) {
    if (record.requestCount >= OTP_CONFIG.MAX_REQUESTS_PER_WINDOW) {
      const waitMinutes = Math.ceil((OTP_CONFIG.RATE_LIMIT_WINDOW_MS - (now - record.windowStart)) / 60000)
      return {
        allowed: false,
        error: `Too many OTP requests for this mobile number. Please try again in ${waitMinutes} minutes.`,
      }
    }
  } else {
    // Window expired, reset
    rateLimitStore.delete(phone)
  }

  return { allowed: true }
}

/**
 * Record a successful OTP dispatch for rate-limiting
 */
export function recordOtpDispatch(phone: string): void {
  const now = Date.now()
  const record = rateLimitStore.get(phone)

  if (!record || now - record.windowStart >= OTP_CONFIG.RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(phone, {
      requestCount: 1,
      windowStart: now,
      lastSentAt: now,
    })
  } else {
    record.requestCount += 1
    record.lastSentAt = now
  }
}

/**
 * Store active OTP session in memory
 */
export function saveSession(session: OTPSessionData): void {
  sessionStore.set(session.phone, session)
}

/**
 * Retrieve active OTP session
 */
export function getSession(phone: string): OTPSessionData | undefined {
  const session = sessionStore.get(phone)
  if (!session) return undefined

  // Check if session has expired
  if (Date.now() > session.expiresAt) {
    sessionStore.delete(phone)
    return undefined
  }

  return session
}

/**
 * Invalidate / delete session after successful verification or expiration
 */
export function deleteSession(phone: string): void {
  sessionStore.delete(phone)
}

/**
 * Determine if serverless environment is running in Test/Development mode
 * Test mode is ON if:
 * - env.OTP_TEST_MODE is 'true' or unset
 * - OR neither TWOFACTOR_API_KEY nor FAST2SMS_API_KEY is configured
 */
export function isTestMode(env: Env): boolean {
  if (env.OTP_TEST_MODE === 'false') {
    const has2Factor = Boolean(env.TWOFACTOR_API_KEY && env.TWOFACTOR_API_KEY.trim().length > 5)
    const hasFast2Sms = Boolean(env.FAST2SMS_API_KEY && env.FAST2SMS_API_KEY.trim().length > 5)
    return !(has2Factor || hasFast2Sms)
  }
  return true
}

/**
 * Generates an HMAC signed verification token proving the phone was verified
 */
export async function createVerificationToken(phone: string, secret = 'ayur-veda-global-secure-otp-salt'): Promise<string> {
  const payload = `${phone}:${Date.now()}`
  const encoder = new TextEncoder()
  const keyData = encoder.encode(secret)
  const messageData = encoder.encode(payload)

  try {
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )
    const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData)
    const hexSig = Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    return `${btoa(payload)}.${hexSig.slice(0, 32)}`
  } catch {
    // Resilient fallback
    return `tok_${btoa(payload)}_${Date.now().toString(36)}`
  }
}
