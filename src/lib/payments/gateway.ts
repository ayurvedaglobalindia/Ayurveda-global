/**
 * Secure Payment Gateway Adapter & Configurations
 * Supports:
 * 1. Razorpay Payment Gateway (Cards, NetBanking, Wallets, UPI Intent)
 * 2. Cashfree Payments (Instant UPI QR & Gateway)
 * 3. Direct UPI Intent (Zero fee direct settlement to verified VPA)
 * 4. Cash on Delivery (Doorstep COD with tamper-proof delivery verification)
 * 5. WhatsApp Concierge Assisted Checkout
 */

export interface PaymentProviderConfig {
  razorpayKeyId?: string;
  cashfreeAppId?: string;
  upiVpa: string;
  upiMerchantName: string;
  isTestMode: boolean;
}

export function getPaymentConfig(): PaymentProviderConfig {
  return {
    razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
    cashfreeAppId: process.env.NEXT_PUBLIC_CASHFREE_APP_ID || "",
    upiVpa: process.env.NEXT_PUBLIC_UPI_VPA || "ayurvedaglobal@okhdfcbank",
    upiMerchantName: process.env.NEXT_PUBLIC_UPI_MERCHANT_NAME || "Ayurveda Global Apothecary",
    isTestMode: process.env.NODE_ENV !== "production" && !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  };
}

export interface PaymentIntent {
  orderId: string;
  amountPaise: number;
  amountRupees: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
}

/**
 * Builds universal Indian UPI deep-link URL (works on PhonePe, Google Pay, Paytm, BHIM)
 */
export function buildUpiDeepLink(intent: PaymentIntent): string {
  const config = getPaymentConfig();
  const params = new URLSearchParams({
    pa: config.upiVpa,
    pn: config.upiMerchantName,
    mc: "5499", // Merchant Category Code: Food & Health Specialty
    tr: intent.orderId,
    tn: `Ayurveda Global Order ${intent.orderId}`,
    am: intent.amountRupees.toFixed(2),
    cu: "INR",
  });
  return `upi://pay?${params.toString()}`;
}

/**
 * Dynamically loads the official Razorpay Checkout SDK
 */
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if ((window as any).Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export interface RazorpayOptions {
  key: string;
  amount: number; // in paise
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  handler?: (response: {
    razorpay_payment_id: string;
    razorpay_order_id?: string;
    razorpay_signature?: string;
  }) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

export async function initiateRazorpayPayment(
  intent: PaymentIntent,
  onSuccess: (paymentId: string) => void,
  onDismiss?: () => void,
): Promise<{ success: boolean; error?: string }> {
  const config = getPaymentConfig();

  if (!config.razorpayKeyId) {
    return {
      success: false,
      error: "RAZORPAY_KEY_NOT_CONFIGURED",
    };
  }

  const loaded = await loadRazorpayScript();
  if (!loaded) {
    return {
      success: false,
      error: "Failed to load payment gateway SDK. Please check internet connection.",
    };
  }

  const options: RazorpayOptions = {
    key: config.razorpayKeyId,
    amount: intent.amountPaise,
    currency: "INR",
    name: "Ayur Veda Global",
    description: `Apothecary Order #${intent.orderId}`,
    prefill: {
      name: intent.customerName,
      email: intent.customerEmail || "",
      contact: intent.customerPhone,
    },
    notes: {
      orderId: intent.orderId,
    },
    theme: {
      color: "#0E3924", // Botanical Green
    },
    handler: (response) => {
      onSuccess(response.razorpay_payment_id);
    },
    modal: {
      ondismiss: onDismiss,
    },
  };

  try {
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Payment modal initiation failed",
    };
  }
}

/**
 * Dynamically loads the official Cashfree JS Web SDK (v3)
 */
export function loadCashfreeScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if ((window as any).Cashfree) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/**
 * Creates Cashfree order session by calling backend API route (/api/cashfree/create-order)
 */
export async function createCashfreeOrderSession(intent: PaymentIntent): Promise<{
  success: boolean;
  payment_session_id?: string;
  order_id?: string;
  message?: string;
  is_mock?: boolean;
}> {
  try {
    const res = await fetch("/api/cashfree/create-order/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_amount: intent.amountRupees,
        order_id: intent.orderId,
        customer_details: {
          customer_name: intent.customerName,
          customer_phone: intent.customerPhone,
          customer_email: intent.customerEmail,
        },
      }),
    });

    const data = await res.json();
    return data;
  } catch (err: any) {
    return { success: false, message: err?.message || "Failed to reach order session API" };
  }
}

/**
 * Triggers Cashfree standard checkout modal using Cashfree Web SDK v3
 */
export async function initiateCashfreePayment(
  paymentSessionId: string,
  onSuccess: (orderId: string) => void,
  onFailure?: (error: any) => void,
): Promise<{ success: boolean; error?: string }> {
  if (typeof window === "undefined") return { success: false, error: "Browser environment required" };

  const loaded = await loadCashfreeScript();
  if (!loaded) {
    return { success: false, error: "Failed to load Cashfree SDK script" };
  }

  const isProd =
    process.env.NEXT_PUBLIC_CASHFREE_ENV === "PROD" ||
    process.env.NEXT_PUBLIC_CASHFREE_ENV === "production";
  const mode = isProd ? "production" : "sandbox";

  try {
    const cashfree = (window as any).Cashfree({ mode });
    cashfree.checkout({
      paymentSessionId,
      redirectTarget: "_modal",
    });

    return { success: true };
  } catch (err: any) {
    console.error("Cashfree checkout error:", err);
    onFailure?.(err);
    return { success: false, error: err?.message || "Cashfree checkout invocation failed" };
  }
}
