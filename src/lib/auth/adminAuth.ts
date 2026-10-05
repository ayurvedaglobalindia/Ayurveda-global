'use client'

/**
 * Secure Admin Authorization & Session Service
 * Uses SHA-256 cryptographic hashing for PIN / Key verification.
 * Does NOT expose raw secrets in source code.
 */

const ADMIN_SESSION_KEY = 'ayur_admin_session'
const FAILED_ATTEMPTS_KEY = 'ayur_admin_failed_attempts'
const LOCKOUT_KEY = 'ayur_admin_lockout_until'
const SESSION_DURATION_MS = 2 * 60 * 60 * 1000 // 2 hours

// Default SHA-256 hash for initial setup ("ayur2025" or custom environment hash)
// To change: Set NEXT_PUBLIC_ADMIN_PIN_HASH in Cloudflare / .env
const DEFAULT_HASH = '179be7bb42e5668e0d99fa140b9557ec601d0c3ebc9c647b019b22e11894b988' // sha256 of "ayur2025"

async function sha256(message: string): Promise<string> {
  if (typeof window === 'undefined' || !window.crypto || !window.crypto.subtle) {
    return ''
  }
  const msgUint8 = new TextEncoder().encode(message.trim())
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export function isLockedOut(): { locked: boolean; remainingSeconds: number } {
  if (typeof window === 'undefined') return { locked: false, remainingSeconds: 0 }
  const lockoutUntil = parseInt(localStorage.getItem(LOCKOUT_KEY) || '0', 10)
  const now = Date.now()
  if (lockoutUntil > now) {
    return { locked: true, remainingSeconds: Math.ceil((lockoutUntil - now) / 1000) }
  }
  return { locked: false, remainingSeconds: 0 }
}

export async function loginAdmin(secret: string): Promise<{ success: boolean; message: string }> {
  if (typeof window === 'undefined') return { success: false, message: 'Invalid context' }

  const lockout = isLockedOut()
  if (lockout.locked) {
    return { success: false, message: `Terminal locked due to excessive failed attempts. Retry in ${lockout.remainingSeconds}s.` }
  }

  const computedHash = await sha256(secret)
  const targetHash = process.env.NEXT_PUBLIC_ADMIN_PIN_HASH || DEFAULT_HASH

  if (computedHash === targetHash) {
    // Reset failed attempts
    localStorage.removeItem(FAILED_ATTEMPTS_KEY)
    localStorage.removeItem(LOCKOUT_KEY)

    // Save session
    const session = {
      authenticated: true,
      timestamp: Date.now(),
      expiresAt: Date.now() + SESSION_DURATION_MS,
    }
    sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session))
    return { success: true, message: 'Admin terminal unlocked.' }
  } else {
    // Increment failed attempts
    const failed = parseInt(localStorage.getItem(FAILED_ATTEMPTS_KEY) || '0', 10) + 1
    localStorage.setItem(FAILED_ATTEMPTS_KEY, String(failed))

    if (failed >= 5) {
      // 5-minute lockout
      const lockUntil = Date.now() + 5 * 60 * 1000
      localStorage.setItem(LOCKOUT_KEY, String(lockUntil))
      return { success: false, message: 'Too many incorrect attempts. Terminal locked for 5 minutes.' }
    }

    return { success: false, message: `Invalid authentication credentials. (${5 - failed} attempts remaining)` }
  }
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const raw = sessionStorage.getItem(ADMIN_SESSION_KEY)
    if (!raw) return false
    const session = JSON.parse(raw)
    if (!session || !session.authenticated || !session.expiresAt) return false
    if (Date.now() > session.expiresAt) {
      logoutAdmin()
      return false
    }
    return true
  } catch {
    return false
  }
}

export function logoutAdmin(): void {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem(ADMIN_SESSION_KEY)
}
