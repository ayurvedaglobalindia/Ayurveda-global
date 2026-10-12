import { NextResponse } from "next/server";
import crypto from "crypto";
import { getSupabaseAdminClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-webhook-signature") || "";
    const timestamp = request.headers.get("x-webhook-timestamp") || "";
    const secretKey = process.env.CASHFREE_SECRET_KEY?.trim() || "";

    // 1. Signature Verification
    if (secretKey && signature && timestamp) {
      const signedPayload = timestamp + rawBody;
      const expectedSignature = crypto
        .createHmac("sha256", secretKey)
        .update(signedPayload)
        .digest("base64");

      if (signature !== expectedSignature) {
        console.warn("Cashfree Webhook Signature Mismatch:", { signature, expectedSignature });
        return NextResponse.json(
          { status: "ERROR", message: "Invalid webhook signature" },
          { status: 401 },
        );
      }
    } else if (secretKey && !signature) {
      return NextResponse.json(
        { status: "ERROR", message: "Missing webhook signature header" },
        { status: 401 },
      );
    }

    // 2. Parse Payload
    let payload: any = {};
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { status: "ERROR", message: "Invalid JSON payload" },
        { status: 400 },
      );
    }

    const eventType = payload.type;
    const orderData = payload.data?.order;
    const paymentData = payload.data?.payment;
    const orderId = orderData?.order_id;

    if (!orderId) {
      return NextResponse.json(
        { status: "OK", message: "Webhook acknowledged without order_id" },
        { status: 200 },
      );
    }

    const isSuccess =
      eventType === "PAYMENT_SUCCESS_WEBHOOK" ||
      paymentData?.payment_status === "SUCCESS";

    if (isSuccess) {
      const paymentId = paymentData?.cf_payment_id || "CF_WEBHOOK_VERIFIED";

      // 3. Update Supabase Database
      try {
        const supabase = getSupabaseAdminClient();
        if (supabase) {
          const { error: sbError } = await (supabase as any)
            .from("orders")
            .update({
              payment_status: "paid",
              order_status: "confirmed",
              updated_at: new Date().toISOString(),
            })
            .eq("order_number", orderId);

          if (sbError) {
            console.warn("Supabase webhook update warning:", sbError);
          }
        }
      } catch (sbErr) {
        console.warn("Supabase webhook connection exception:", sbErr);
      }

      // 4. Update Local Database (.data/ayurveda.json) for hybrid persistence
      try {
        const fs = await import("fs");
        const path = await import("path");
        const dbPath = path.join(process.cwd(), ".data", "ayurveda.json");
        if (fs.existsSync(dbPath)) {
          const content = fs.readFileSync(dbPath, "utf-8");
          const dbData = JSON.parse(content);
          if (Array.isArray(dbData.orders)) {
            const foundOrder = dbData.orders.find(
              (o: any) => o.orderNumber === orderId || o.id === orderId,
            );
            if (foundOrder) {
              foundOrder.paymentStatus = "paid";
              foundOrder.status = "confirmed";
              foundOrder.paymentId = String(paymentId);
              foundOrder.updatedAt = new Date().toISOString();
              fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
            }
          }
        }
      } catch (localErr) {
        console.warn("Local DB webhook update note:", localErr);
      }

      return NextResponse.json({
        status: "OK",
        message: `Order ${orderId} verified and marked as paid`,
        order_id: orderId,
        payment_id: paymentId,
      });
    }

    return NextResponse.json({
      status: "OK",
      message: `Event ${eventType} recorded for order ${orderId}`,
    });
  } catch (err: any) {
    console.error("Cashfree webhook processing error:", err);
    return NextResponse.json(
      { status: "ERROR", message: err?.message || "Internal server error" },
      { status: 500 },
    );
  }
}
