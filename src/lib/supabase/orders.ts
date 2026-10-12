import { getSupabaseBrowserClient, isSupabaseConfigured } from "./client";
import { getSupabaseAdminClient } from "./server";
import type { Database } from "./types";
import type { Order } from "@/types";

export type SupabaseOrderInsert = Database["public"]["Tables"]["orders"]["Insert"];
export type SupabaseOrderItemInsert = Database["public"]["Tables"]["order_items"]["Insert"];

export interface CreateOrderParams {
  orderNumber: string;
  userId?: string | null;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  shippingAddress: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: Array<{
    productId: string;
    title: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentMethod: "upi" | "razorpay" | "cod" | "whatsapp";
  paymentStatus?: "pending" | "paid" | "failed" | "refunded";
  notes?: string;
}

/**
 * Creates an order in Supabase PostgreSQL database along with relational order_items
 */
export async function createOrderInSupabase(
  params: CreateOrderParams,
): Promise<{ success: boolean; orderId?: string; error?: string }> {
  const supabase = getSupabaseBrowserClient();

  if (!isSupabaseConfigured() || !supabase) {
    return {
      success: false,
      error: "Supabase database is not configured. Falling back to local persistence.",
    };
  }

  try {
    // 1. Insert parent order
    const orderPayload: SupabaseOrderInsert = {
      order_number: params.orderNumber,
      user_id: params.userId || null,
      customer_name: params.customerName,
      customer_phone: params.customerPhone,
      customer_email: params.customerEmail || null,
      shipping_address: params.shippingAddress,
      items: params.items,
      subtotal: params.subtotal,
      shipping_fee: params.shippingFee,
      discount: params.discount,
      total: params.total,
      payment_method: params.paymentMethod,
      payment_status: params.paymentStatus || (params.paymentMethod === "cod" ? "pending" : "pending"),
      order_status: "confirmed",
      admin_notes: params.notes || null,
    };

    const { data: orderData, error: orderError } = await (supabase as any)
      .from("orders")
      .insert(orderPayload)
      .select("id")
      .single();

    if (orderError || !orderData) {
      console.error("Supabase order insert error:", orderError);
      return { success: false, error: orderError?.message || "Failed to create order in database" };
    }

    const orderId = orderData.id;

    // 2. Insert line items
    if (params.items && params.items.length > 0) {
      const lineItems: SupabaseOrderItemInsert[] = params.items.map((item) => ({
        order_id: orderId,
        product_id: item.productId && item.productId.length > 10 ? item.productId : null,
        title: item.title,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.total,
      }));

      const { error: itemsError } = await (supabase as any)
        .from("order_items")
        .insert(lineItems);

      if (itemsError) {
        console.warn("Supabase order_items insert warning:", itemsError);
      }
    }

    return { success: true, orderId };
  } catch (err: any) {
    console.error("Supabase createOrder exception:", err);
    return { success: false, error: err?.message || "Network error while saving order" };
  }
}

/**
 * Retrieves order by Order Number or UUID
 */
export async function getOrderFromSupabase(
  orderIdentifier: string,
): Promise<Order | null> {
  const supabase = getSupabaseBrowserClient();
  if (!isSupabaseConfigured() || !supabase) return null;

  try {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(orderIdentifier);

    let query = (supabase as any).from("orders").select("*, order_items(*)");
    if (isUuid) {
      query = query.eq("id", orderIdentifier);
    } else {
      query = query.eq("order_number", orderIdentifier);
    }

    const { data, error } = await query.single();
    if (error || !data) return null;

    return {
      id: data.id,
      orderNumber: data.order_number,
      items: (data.items as any) || [],
      subtotal: data.subtotal,
      discount: data.discount,
      shipping: data.shipping_fee,
      total: data.total,
      shippingAddress: data.shipping_address as any,
      paymentMethod: data.payment_method as any,
      paymentStatus: data.payment_status as any,
      status: data.order_status as any,
      trackingNumber: data.awb_tracking_number || undefined,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch {
    return null;
  }
}

/**
 * Fetches all orders for authenticated user
 */
export async function getUserOrdersFromSupabase(userId: string): Promise<Order[]> {
  const supabase = getSupabaseBrowserClient();
  if (!isSupabaseConfigured() || !supabase) return [];

  try {
    const { data, error } = await (supabase as any)
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error || !data) return [];

    return (data as any[]).map((d) => ({
      id: d.id,
      orderNumber: d.order_number,
      items: (d.items as any) || [],
      subtotal: d.subtotal,
      discount: d.discount,
      shipping: d.shipping_fee,
      total: d.total,
      shippingAddress: d.shipping_address as any,
      paymentMethod: d.payment_method as any,
      paymentStatus: d.payment_status as any,
      status: d.order_status as any,
      trackingNumber: d.awb_tracking_number || undefined,
      createdAt: d.created_at,
      updatedAt: d.updated_at,
    }));
  } catch {
    return [];
  }
}
