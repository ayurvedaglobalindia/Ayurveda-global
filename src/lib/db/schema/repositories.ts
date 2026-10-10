/**
 * AYUR VEDA GLOBAL (AVG) - PRODUCTION SQL REPOSITORIES
 * High-performance, edge-safe typed query methods for Orders, Products, Leads, & Customers.
 */

import { db } from "@/lib/db";
import type {
  DBProduct,
  DBOrder,
  DBOrderItem,
  DBCustomer,
  DBCustomerAddress,
  DBCoupon,
  DBWhatsAppLead,
  DBOrderStatusHistory,
} from "./types";
import type { Order, WhatsAppLeadEvent } from "@/types";

// ==============================================================================
// 1. PRODUCTS REPOSITORY
// ==============================================================================
export const ProductRepository = {
  getAll(): DBProduct[] {
    const stmt = db.prepare("SELECT * FROM products WHERE is_active = 1");
    return stmt.all() as DBProduct[];
  },

  getById(id: string): DBProduct | undefined {
    const stmt = db.prepare("SELECT * FROM products WHERE id = ?");
    return stmt.get(id) as DBProduct | undefined;
  },

  getBySlug(slug: string): DBProduct | undefined {
    const stmt = db.prepare("SELECT * FROM products WHERE slug = ?");
    return stmt.get(slug) as DBProduct | undefined;
  },

  getByCategory(category: string): DBProduct[] {
    const stmt = db.prepare("SELECT * FROM products WHERE category = ? AND is_active = 1");
    return (stmt.all() as DBProduct[]).filter(
      (p) => (p as any).category === category || p.category_id === category
    );
  },

  decrementInventory(productId: string, quantity: number): boolean {
    const stmt = db.prepare(
      "UPDATE products SET inventory_quantity = inventory_quantity - ? WHERE id = ?"
    );
    const result = stmt.run(quantity, productId);
    return result.changes > 0;
  },

  incrementInventory(productId: string, quantity: number): boolean {
    const stmt = db.prepare(
      "UPDATE products SET inventory_quantity = inventory_quantity + ? WHERE id = ?"
    );
    const result = stmt.run(quantity, productId);
    return result.changes > 0;
  },
};

// ==============================================================================
// 2. ORDERS REPOSITORY
// ==============================================================================
export const OrderRepository = {
  create(order: Order | any): { success: boolean; id: string; orderNumber: string } {
    const orderId = order.id || `ORD-${Date.now()}`;
    const orderNumber = order.orderNumber || orderId;

    const subtotal = order.subtotal ?? order.total;
    const shippingCost = order.shipping ?? 0;
    const taxAmount = order.tax ?? 0;
    const discountAmount = order.discount ?? 0;
    const totalAmount = order.total;

    const stmt = db.prepare(`
      INSERT INTO orders (
        id, order_number, customer_name, customer_phone, customer_email,
        shipping_address_json, billing_address_json, items_json,
        subtotal, shipping_cost, tax_amount, discount_amount, total_amount,
        payment_method, payment_status, order_status, coupon_code, notes,
        whatsapp_message_sent
      ) VALUES (
        @id, @orderNumber, @customerName, @customerPhone, @customerEmail,
        @shippingAddressJson, @billingAddressJson, @itemsJson,
        @subtotal, @shippingCost, @taxAmount, @discountAmount, @totalAmount,
        @paymentMethod, @paymentStatus, @orderStatus, @couponCode, @notes,
        @whatsappMessageSent
      )
    `);

    stmt.run({
      id: orderId,
      orderNumber,
      customerName:
        order.customerName ||
        `${order.shippingAddress?.firstName || ""} ${order.shippingAddress?.lastName || ""}`.trim() ||
        "Valued Patron",
      customerPhone: order.customerPhone || order.shippingAddress?.phone || "",
      customerEmail: order.customerEmail || order.shippingAddress?.email || null,
      shippingAddressJson: JSON.stringify(order.shippingAddress || {}),
      billingAddressJson: JSON.stringify(order.billingAddress || order.shippingAddress || {}),
      itemsJson: JSON.stringify(order.items || []),
      subtotal,
      shippingCost,
      taxAmount,
      discountAmount,
      totalAmount,
      paymentMethod: order.paymentMethod || "cod",
      paymentStatus: order.paymentStatus || "pending",
      orderStatus: order.orderStatus || order.status || "confirmed",
      couponCode: order.couponCode || null,
      notes: order.notes || null,
      whatsappMessageSent: order.whatsappMessageSent ? 1 : 0,
    });

    // Record initial status history
    const historyStmt = db.prepare(`
      INSERT INTO order_status_history (order_id, status, note)
      VALUES (?, ?, ?)
    `);
    historyStmt.run(orderId, order.orderStatus || "confirmed", "Order recorded in AVG SQL Engine");

    // Adjust product inventory quantities
    if (Array.isArray(order.items)) {
      for (const item of order.items) {
        const pId = item.productId || item.id;
        const qty = item.quantity || 1;
        if (pId) {
          ProductRepository.decrementInventory(pId, qty);
        }
      }
    }

    return { success: true, id: orderId, orderNumber };
  },

  getByOrderNumber(orderNumber: string): DBOrder | undefined {
    const stmt = db.prepare("SELECT * FROM orders WHERE order_number = ?");
    return stmt.get(orderNumber) as DBOrder | undefined;
  },

  getById(id: string): DBOrder | undefined {
    const stmt = db.prepare("SELECT * FROM orders WHERE id = ?");
    return stmt.get(id) as DBOrder | undefined;
  },

  getByPhone(phone: string): DBOrder[] {
    const stmt = db.prepare("SELECT * FROM orders WHERE customer_phone = ?");
    return stmt.all(phone) as DBOrder[];
  },

  updateStatus(orderId: string, status: string, note?: string): boolean {
    const stmt = db.prepare(
      "UPDATE orders SET order_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? OR order_number = ?"
    );
    const result = stmt.run(status, orderId, orderId);

    if (result.changes > 0) {
      const historyStmt = db.prepare(`
        INSERT INTO order_status_history (order_id, status, note)
        VALUES (?, ?, ?)
      `);
      historyStmt.run(orderId, status, note || `Status updated to ${status}`);
      return true;
    }
    return false;
  },

  getAll(limit: number = 50, offset: number = 0): DBOrder[] {
    const stmt = db.prepare(
      "SELECT * FROM orders ORDER BY created_at DESC LIMIT ? OFFSET ?"
    );
    return stmt.all(limit, offset) as DBOrder[];
  },

  getStatusHistory(orderId: string): DBOrderStatusHistory[] {
    const stmt = db.prepare(
      "SELECT * FROM order_status_history WHERE order_id = ? ORDER BY created_at ASC"
    );
    return stmt.all(orderId) as DBOrderStatusHistory[];
  },
};

// ==============================================================================
// 3. WHATSAPP LEADS REPOSITORY
// ==============================================================================
export const LeadRepository = {
  create(lead: WhatsAppLeadEvent | any): { success: boolean; id: string | number } {
    const stmt = db.prepare(`
      INSERT INTO whatsapp_leads (
        source, product_id, product_name, customer_name, customer_phone,
        customer_email, quantity, order_total, message_preview, user_agent, referrer
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
    `);

    stmt.run(
      lead.source || "general",
      lead.productId || null,
      lead.productName || null,
      lead.customerName || null,
      lead.customerPhone || null,
      lead.customerEmail || null,
      lead.quantity || 1,
      lead.orderTotal || null,
      lead.messagePreview || null,
      lead.userAgent || "",
      lead.referrer || ""
    );

    return { success: true, id: Date.now() };
  },

  getAll(limit: number = 100): DBWhatsAppLead[] {
    const stmt = db.prepare(
      "SELECT * FROM whatsapp_leads ORDER BY created_at DESC LIMIT ?"
    );
    return stmt.all(limit) as DBWhatsAppLead[];
  },
};

// ==============================================================================
// 4. COUPONS REPOSITORY
// ==============================================================================
export const CouponRepository = {
  getByCode(code: string): DBCoupon | undefined {
    const stmt = db.prepare("SELECT * FROM coupons WHERE code = ?");
    return stmt.get(code.toUpperCase()) as DBCoupon | undefined;
  },

  incrementUsage(code: string): boolean {
    const stmt = db.prepare(
      "UPDATE coupons SET used_count = used_count + 1 WHERE code = ?"
    );
    const res = stmt.run(code.toUpperCase());
    return res.changes > 0;
  },
};
