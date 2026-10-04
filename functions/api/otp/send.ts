import {
  Env,
  normalizeIndianPhone,
  generateSecureCode,
  checkRateLimit,
  recordOtpDispatch,
  saveSession,
  isTestMode,
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

    const { phone: rawPhone, customerName } = body || {}

    // 1. Phone validation & normalization
    const { isValid, phone, error } = normalizeIndianPhone(rawPhone)
    if (!isValid) {
      return jsonResponse({ success: false, message: error || 'Invalid Indian mobile number' }, 422)
    }

    // 2. Security: Rate limiting & Resend Cooldown
    const rateCheck = checkRateLimit(phone)
    if (!rateCheck.allowed) {
      return jsonResponse({
        success: false,
        message: rateCheck.error,
        remainingCooldown: rateCheck.remainingCooldown,
      }, 429)
    }

    const now = Date.now()
    const expiresAt = now + OTP_CONFIG.EXPIRY_MS
    const testModeActive = isTestMode(env)

    // -------------------------------------------------------------
    // MODE A: DEVELOPMENT / TEST MODE (Zero SMS cost triggered)
    // -------------------------------------------------------------
    if (testModeActive) {
      const code = generateSecureCode()
      const sessionId = `test_sess_${phone}_${now}`

      saveSession({
        phone,
        code,
        sessionId,
        createdAt: now,
        expiresAt,
        attempts: 0,
        testMode: true,
        customerName: customerName ? String(customerName).trim().slice(0, 50) : undefined,
      })

      recordOtpDispatch(phone)

      return jsonResponse({
        success: true,
        message: 'Dev Test Mode: Verification code generated without SMS wallet charge.',
        sessionId,
        testMode: true,
        simulatedOtp: code,
        expiresAt,
        cooldownSeconds: Math.ceil(OTP_CONFIG.RESEND_COOLDOWN_MS / 1000),
      })
    }

    // -------------------------------------------------------------
    // MODE B: PRODUCTION REAL SMS GATEWAY
    // Secrets (TWOFACTOR_API_KEY / FAST2SMS_API_KEY) are kept 100% server-side
    // -------------------------------------------------------------
    const provider = env.OTP_PROVIDER || (env.TWOFACTOR_API_KEY ? '2factor' : 'fast2sms')

    // B1: 2Factor.in Gateway
    if (provider === '2factor' && env.TWOFACTOR_API_KEY) {
      try {
        const apiKey = env.TWOFACTOR_API_KEY.trim()
        const gatewayUrl = `https://2factor.in/API/V1/${encodeURIComponent(apiKey)}/SMS/+91${phone}/AUTOGEN/OTPSMS`
        
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 8000)

        const res = await fetch(gatewayUrl, {
          method: 'GET',
          signal: controller.signal,
        })
        clearTimeout(timeoutId)

        const data: any = await res.json()

        if (data && data.Status === 'Success') {
          saveSession({
            phone,
            code: '', // Managed and verified on 2Factor cloud
            sessionId: data.Details,
            createdAt: now,
            expiresAt,
            attempts: 0,
            testMode: false,
            customerName: customerName ? String(customerName).trim().slice(0, 50) : undefined,
          })

          recordOtpDispatch(phone)

          return jsonResponse({
            success: true,
            message: `Verification code sent via SMS to +91 ${phone.slice(0, 2)}••••••${phone.slice(-2)}.`,
            sessionId: data.Details,
            testMode: false,
            expiresAt,
            cooldownSeconds: Math.ceil(OTP_CONFIG.RESEND_COOLDOWN_MS / 1000),
          })
        } else {
          return jsonResponse({
            success: false,
            message: data?.Details || 'SMS gateway could not dispatch verification code. Please try again.',
          }, 502)
        }
      } catch (err: any) {
        return jsonResponse({
          success: false,
          message: 'SMS gateway timed out or is temporarily unreachable. Please retry.',
        }, 504)
      }
    }

    // B2: Fast2SMS Gateway
    if (provider === 'fast2sms' && env.FAST2SMS_API_KEY) {
      try {
        const apiKey = env.FAST2SMS_API_KEY.trim()
        const code = generateSecureCode()
        const sessionId = `f2s_${phone}_${now}`

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 8000)

        const res = await fetch('https://www.fast2sms.com/dev/bulkV2', {
          method: 'POST',
          headers: {
            'authorization': apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            variables_values: code,
            route: 'otp',
            numbers: phone,
          }),
          signal: controller.signal,
        })
        clearTimeout(timeoutId)

        const data: any = await res.json()

        if (data && data.return === true) {
          saveSession({
            phone,
            code,
            sessionId,
            createdAt: now,
            expiresAt,
            attempts: 0,
            testMode: false,
            customerName: customerName ? String(customerName).trim().slice(0, 50) : undefined,
          })

          recordOtpDispatch(phone)

          return jsonResponse({
            success: true,
            message: `Verification code sent via SMS to +91 ${phone.slice(0, 2)}••••••${phone.slice(-2)}.`,
            sessionId,
            testMode: false,
            expiresAt,
            cooldownSeconds: Math.ceil(OTP_CONFIG.RESEND_COOLDOWN_MS / 1000),
          })
        } else {
          return jsonResponse({
            success: false,
            message: Array.isArray(data?.message) ? data.message.join(', ') : 'Fast2SMS dispatch failed.',
          }, 502)
        }
      } catch {
        return jsonResponse({
          success: false,
          message: 'Fast2SMS service timed out. Please retry.',
        }, 504)
      }
    }

    return jsonResponse({
      success: false,
      message: 'No active SMS provider configured on server.',
    }, 500)
  } catch (err: any) {
    return jsonResponse({
      success: false,
      message: 'Internal server error while dispatching OTP.',
    }, 500)
  }
}
