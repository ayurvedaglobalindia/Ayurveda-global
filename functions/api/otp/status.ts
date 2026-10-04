import { Env, isTestMode, jsonResponse, OTP_CONFIG } from './_shared'

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context
  const testMode = isTestMode(env)
  const provider = testMode
    ? 'dev_test_mode (Zero SMS Cost)'
    : env.OTP_PROVIDER || (env.TWOFACTOR_API_KEY ? '2factor.in' : 'fast2sms')

  return jsonResponse({
    status: 'online',
    service: 'Ayur Veda Global Serverless OTP Gateway',
    provider,
    testMode,
    config: {
      expirySeconds: OTP_CONFIG.EXPIRY_MS / 1000,
      resendCooldownSeconds: OTP_CONFIG.RESEND_COOLDOWN_MS / 1000,
      maxVerifyAttempts: OTP_CONFIG.MAX_VERIFY_ATTEMPTS,
      rateLimitWindowMinutes: OTP_CONFIG.RATE_LIMIT_WINDOW_MS / 60000,
      maxRequestsPerWindow: OTP_CONFIG.MAX_REQUESTS_PER_WINDOW,
    },
    timestamp: new Date().toISOString(),
  })
}
