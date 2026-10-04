import {
  Env,
  normalizeIndianPhone,
  getSession,
  deleteSession,
  createVerificationToken,
  jsonResponse,
  OTP_CONFIG,
} from './_shared'

export const onRequestOptions: PagesFunction = async () => {
  return jsonResponse({}, 204)
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context

  try {
    let body: any = {}
    try {
      body = await request.json()
    } catch {
      return jsonResponse({ success: false, message: 'Invalid JSON request body' }, 400)
    }

    const { phone: rawPhone, code: rawCode, sessionId: clientSessionId } = body || {}

    // 1. Validate phone
    const { isValid, phone, error } = normalizeIndianPhone(rawPhone)
    if (!isValid) {
      return jsonResponse({ success: false, message: error || 'Invalid Indian mobile number' }, 422)
    }

    // 2. Validate OTP format (6 numeric digits)
    const code = String(rawCode || '').trim()
    if (!/^\d{6}$/.test(code)) {
      return jsonResponse({
        success: false,
        message: 'Please enter all 6 digits of the verification code.',
      }, 400)
    }

    // 3. Lookup active session
    const session = getSession(phone)
    if (!session) {
      return jsonResponse({
        success: false,
        message: 'Verification code has expired or was not requested. Please request a new OTP.',
      }, 400)
    }

    // 4. Rate-limit failed verification attempts (anti-brute-force)
    session.attempts += 1
    if (session.attempts > OTP_CONFIG.MAX_VERIFY_ATTEMPTS) {
      deleteSession(phone)
      return jsonResponse({
        success: false,
        message: 'Maximum verification attempts exceeded. Session locked for security. Please request a new OTP.',
      }, 429)
    }

    // -------------------------------------------------------------
    // VERIFICATION FLOW A: TEST / DEVELOPMENT SESSION
    // -------------------------------------------------------------
    if (session.testMode) {
      if (code === session.code) {
        deleteSession(phone)
        const token = await createVerificationToken(phone, env.OTP_SECRET)
        return jsonResponse({
          success: true,
          verified: true,
          phone,
          customerName: session.customerName,
          token,
          message: 'Mobile number verified successfully.',
        })
      } else {
        const remainingAttempts = OTP_CONFIG.MAX_VERIFY_ATTEMPTS - session.attempts
        return jsonResponse({
          success: false,
          message: `Incorrect verification code. ${remainingAttempts} ${remainingAttempts === 1 ? 'attempt' : 'attempts'} remaining.`,
          remainingAttempts,
        }, 400)
      }
    }

    // -------------------------------------------------------------
    // VERIFICATION FLOW B: REAL 2FACTOR.IN GATEWAY
    // -------------------------------------------------------------
    if (env.TWOFACTOR_API_KEY && (env.OTP_PROVIDER === '2factor' || !env.OTP_PROVIDER)) {
      const apiKey = env.TWOFACTOR_API_KEY.trim()
      const effectiveSessionId = session.sessionId || clientSessionId

      if (!effectiveSessionId) {
        deleteSession(phone)
        return jsonResponse({
          success: false,
          message: 'Session identifier missing. Please request a new OTP.',
        }, 400)
      }

      try {
        const verifyUrl = `https://2factor.in/API/V1/${encodeURIComponent(apiKey)}/SMS/VERIFY/${encodeURIComponent(effectiveSessionId)}/${encodeURIComponent(code)}`
        
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 8000)

        const res = await fetch(verifyUrl, {
          method: 'GET',
          signal: controller.signal,
        })
        clearTimeout(timeoutId)

        const data: any = await res.json()

        if (data && data.Status === 'Success' && data.Details === 'OTP Matched') {
          deleteSession(phone)
          const token = await createVerificationToken(phone, env.OTP_SECRET)
          return jsonResponse({
            success: true,
            verified: true,
            phone,
            customerName: session.customerName,
            token,
            message: 'Mobile number verified successfully via SMS Gateway.',
          })
        } else {
          const remainingAttempts = OTP_CONFIG.MAX_VERIFY_ATTEMPTS - session.attempts
          return jsonResponse({
            success: false,
            message: data?.Details || `Incorrect verification code. ${remainingAttempts} attempts remaining.`,
            remainingAttempts,
          }, 400)
        }
      } catch {
        return jsonResponse({
          success: false,
          message: 'Verification gateway timed out. Please try verifying again.',
        }, 504)
      }
    }

    // -------------------------------------------------------------
    // VERIFICATION FLOW C: FAST2SMS (CODE MATCHING)
    // -------------------------------------------------------------
    if (code === session.code) {
      deleteSession(phone)
      const token = await createVerificationToken(phone, env.OTP_SECRET)
      return jsonResponse({
        success: true,
        verified: true,
        phone,
        customerName: session.customerName,
        token,
        message: 'Mobile number verified successfully.',
      })
    } else {
      const remainingAttempts = OTP_CONFIG.MAX_VERIFY_ATTEMPTS - session.attempts
      return jsonResponse({
        success: false,
        message: `Incorrect verification code. ${remainingAttempts} attempts remaining.`,
        remainingAttempts,
      }, 400)
    }
  } catch {
    return jsonResponse({
      success: false,
      message: 'Internal server error while verifying OTP.',
    }, 500)
  }
}
