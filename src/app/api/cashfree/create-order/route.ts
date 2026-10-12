import { NextResponse } from "next/server";

export interface CashfreeCreateOrderRequest {
  order_amount: number;
  order_id: string;
  customer_details: {
    customer_id?: string;
    customer_name: string;
    customer_email?: string;
    customer_phone: string;
  };
  order_meta?: {
    return_url?: string;
    notify_url?: string;
  };
  order_note?: string;
}

export async function POST(request: Request) {
  try {
    const body: CashfreeCreateOrderRequest = await request.json();
    const { order_amount, order_id, customer_details, order_meta, order_note } = body || {};

    if (!order_amount || order_amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Valid order_amount is required" },
        { status: 400 },
      );
    }

    if (!order_id) {
      return NextResponse.json(
        { success: false, message: "order_id is required" },
        { status: 400 },
      );
    }

    if (!customer_details?.customer_phone) {
      return NextResponse.json(
        { success: false, message: "customer_phone is required" },
        { status: 400 },
      );
    }

    const appId = process.env.CASHFREE_APP_ID?.trim() || "";
    const secretKey = process.env.CASHFREE_SECRET_KEY?.trim() || "";
    const env = (process.env.CASHFREE_ENV || "TEST").toUpperCase();
    const isProd = env === "PROD";
    const baseUrl = isProd
      ? "https://api.cashfree.com/pg"
      : "https://sandbox.cashfree.com/pg";

    const cleanPhone = customer_details.customer_phone.replace(/\D/g, "").slice(-10);
    const customerId = customer_details.customer_id || `cust_${cleanPhone}`;
    const customerName = customer_details.customer_name || "Valued Patron";
    const customerEmail =
      customer_details.customer_email || `${cleanPhone}@ayurvedaglobal.com`;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ayurvedaglobal.com";
    const returnUrl =
      order_meta?.return_url ||
      `${siteUrl}/checkout/success?order_id={order_id}`;
    const notifyUrl =
      order_meta?.notify_url || `${siteUrl}/api/cashfree/webhook`;

    // If Cashfree credentials are not configured, provide simulated session for development/testing
    if (!appId || !secretKey) {
      const simulatedSessionId = `session_cf_mock_${Date.now()}_${order_id}`;
      return NextResponse.json({
        success: true,
        order_id,
        order_amount: Number(order_amount),
        order_currency: "INR",
        payment_session_id: simulatedSessionId,
        is_mock: true,
        message: "Development Mode: Cashfree credentials not configured in .env. Mock session created.",
      });
    }

    // Cashfree v2025-01-01 Standard Orders API payload
    const payload = {
      order_id,
      order_amount: Number(order_amount),
      order_currency: "INR",
      customer_details: {
        customer_id: customerId,
        customer_phone: cleanPhone,
        customer_name: customerName,
        customer_email: customerEmail,
      },
      order_meta: {
        return_url: returnUrl,
        notify_url: notifyUrl,
        payment_methods: "cc,dc,upi,nb,app,paylater",
      },
      order_note: order_note || `Ayurveda Global Order #${order_id}`,
    };

    const cfResponse = await fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "x-client-id": appId,
        "x-client-secret": secretKey,
        "x-api-version": "2025-01-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const cfData = await cfResponse.json();

    if (!cfResponse.ok) {
      console.error("Cashfree Order API Error:", cfData);
      return NextResponse.json(
        {
          success: false,
          message: cfData.message || "Failed to create order on Cashfree gateway",
          error_code: cfData.code || "CASHFREE_API_ERROR",
        },
        { status: cfResponse.status },
      );
    }

    return NextResponse.json({
      success: true,
      order_id: cfData.order_id,
      cf_order_id: cfData.cf_order_id,
      order_amount: cfData.order_amount,
      order_currency: cfData.order_currency,
      payment_session_id: cfData.payment_session_id,
      order_status: cfData.order_status,
      is_mock: false,
    });
  } catch (err: any) {
    console.error("Cashfree create-order server exception:", err);
    return NextResponse.json(
      { success: false, message: err?.message || "Internal server error" },
      { status: 500 },
    );
  }
}
