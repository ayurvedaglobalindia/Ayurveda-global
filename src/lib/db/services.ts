/**
 * ==============================================================================
 * AYUR VEDA GLOBAL (AVG) - ENTERPRISE DATA ACCESS SERVICES & ENDPOINT QUERIES
 * 1. Fetching active products and categories.
 * 2. Creating an order and generating a tracking order reference (e.g. AVG-476972).
 * 3. Booking a Vaidya doctor consultation.
 * ==============================================================================
 */

import { db, ProductRepository, OrderRepository, LeadRepository } from "@/lib/db";
import { categories as defaultCategories } from "@/lib/products/registry";

// ------------------------------------------------------------------------------
// 1. Fetching Active Products & Categories
// ------------------------------------------------------------------------------
export async function getActiveProductsAndCategories() {
  try {
    const rawProducts = ProductRepository.getAll();
    const activeProducts = rawProducts.map((p: any) => ({
      id: p.id,
      title: p.name || p.title,
      slug: p.slug,
      shortDesc: p.short_description || p.shortDesc,
      detailedDesc: p.description || p.detailedDesc,
      price: p.price,
      discountedPrice: p.compare_at_price || p.discountedPrice || null,
      stockCount: p.inventory_quantity ?? p.stockCount ?? 100,
      sku: p.sku || `AVG-${p.slug?.toUpperCase()}`,
      category: p.category || p.category_id,
      imageUrl: (typeof p.images_json === "string" ? JSON.parse(p.images_json)[0]?.src : p.imageUrl) || "/images/products/body-essential-nutrition-card.jpg",
      isFeatured: p.is_featured ?? true,
      createdAt: p.created_at,
    }));

    return {
      success: true,
      categories: defaultCategories,
      products: activeProducts,
      total: activeProducts.length,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Failed to fetch products and categories",
      categories: defaultCategories,
      products: [],
    };
  }
}

// ------------------------------------------------------------------------------
// 2. Creating an Order & Generating a Tracking Order Reference (AVG-XXXXXX)
// ------------------------------------------------------------------------------
export interface CreateOrderInput {
  userId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
    country?: string;
  };
  items: Array<{
    productId: string;
    productName?: string;
    quantity: number;
    unitPrice: number; // in Paise
  }>;
  paymentMode: "COD" | "Prepaid" | "WHATSAPP";
  couponCode?: string;
}

export async function createOrderWithTracking(input: CreateOrderInput) {
  try {
    // Generate unique reference in requested format (e.g. AVG-476972)
    const random6Digits = Math.floor(100000 + Math.random() * 900000);
    const orderReferenceId = `AVG-${random6Digits}`;
    const orderId = `ORD-${Date.now()}`;

    const subtotal = input.items.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );
    const shipping = subtotal >= 99900 ? 0 : 9900; // Free delivery above ₹999
    const totalAmount = subtotal + shipping;

    // Persist via OrderRepository
    const orderRecord = {
      id: orderId,
      orderNumber: orderReferenceId,
      orderReferenceId,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      customerEmail: input.customerEmail,
      shippingAddress: input.shippingAddress,
      billingAddress: input.shippingAddress,
      items: input.items,
      subtotal,
      shipping,
      tax: 0,
      total: totalAmount,
      paymentMethod: input.paymentMode.toLowerCase(),
      paymentStatus: input.paymentMode === "Prepaid" ? "paid" : "pending",
      orderStatus: "confirmed",
      shippingStatus: "pending",
      trackingNumber: `DEL-${Date.now().toString().slice(-8)}`,
      couponCode: input.couponCode,
    };

    const res = OrderRepository.create(orderRecord);

    return {
      success: true,
      orderId: res.id,
      orderReferenceId,
      totalAmount,
      shippingStatus: "pending",
      trackingNumber: orderRecord.trackingNumber,
      estimatedDeliveryDays: "3-5 Business Days",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Failed to create order",
    };
  }
}

// ------------------------------------------------------------------------------
// 3. Booking a Vaidya Doctor Consultation
// ------------------------------------------------------------------------------
export interface BookConsultationInput {
  userId?: string;
  patientName: string;
  phoneNumber: string;
  doshaType?: "Vata" | "Pitta" | "Kapha" | "Tridosha" | string;
  symptoms: string;
  preferredDate?: string;
}

export async function bookVaidyaConsultation(input: BookConsultationInput) {
  try {
    const consultationId = `CONS-${Date.now()}`;
    const preview = `[Dosha: ${input.doshaType || "General"}] Patient: ${input.patientName} (${input.phoneNumber}) - Symptoms: ${input.symptoms}`;

    // Record in leads database
    LeadRepository.create({
      source: "vaidya_consult_nav",
      customerName: input.patientName,
      customerPhone: input.phoneNumber,
      messagePreview: preview,
      userAgent: "WebClient",
      referrer: "/consultation",
    });

    return {
      success: true,
      consultationId,
      patientName: input.patientName,
      phoneNumber: input.phoneNumber,
      doshaType: input.doshaType || "Tridosha Assessment Required",
      bookingStatus: "confirmed",
      message: "Consultation confirmed with BAMS Ayurvedic Vaidya. Doctor will reach out on WhatsApp within 15 minutes.",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Failed to book consultation",
    };
  }
}
