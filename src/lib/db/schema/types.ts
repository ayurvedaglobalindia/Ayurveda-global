/**
-- ==============================================================================
-- AYUR VEDA GLOBAL (AVG) - TYPESCRIPT ORM & QUERY BUILDER TYPES
-- Production Typed Models for SQLite, PostgreSQL, LibSQL / Cloudflare D1
-- ==============================================================================
 */

export interface DBCategory {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  image_url?: string | null;
  display_order: number;
  is_active: boolean | number;
  created_at: string;
  updated_at: string;
}

export interface DBProduct {
  id: string;
  slug: string;
  name: string;
  tagline?: string | null;
  description?: string | null;
  short_description?: string | null;
  category_id: string;
  price: number; // In Paise (e.g., 149900 = ₹1,499.00)
  compare_at_price?: number | null;
  cost_price?: number | null;
  inventory_quantity: number;
  track_inventory: boolean | number;
  low_stock_threshold: number;
  age_restricted: boolean | number;
  dosage_form?: string | null;
  net_quantity?: string | null;
  images_json: string;
  variants_json?: string | null;
  ingredients_json?: string | null;
  usage_instructions?: string | null;
  warnings_json?: string | null;
  tags_json?: string | null;
  seo_json?: string | null;
  is_active: boolean | number;
  rating_average: number;
  rating_count: number;
  created_at: string;
  updated_at: string;
}

export interface DBCustomer {
  id: string;
  phone: string;
  name?: string | null;
  email?: string | null;
  is_phone_verified: boolean | number;
  verified_at?: string | null;
  primary_dosha?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DBCustomerAddress {
  id: string;
  customer_id: string;
  address_type: "shipping" | "billing";
  first_name: string;
  last_name: string;
  company?: string | null;
  address_line1: string;
  address_line2?: string | null;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email?: string | null;
  country: string;
  is_default: boolean | number;
  created_at: string;
  updated_at: string;
}

export interface DBCoupon {
  code: string;
  type: "percentage" | "fixed" | "free_shipping";
  value: number;
  min_order_amount: number;
  max_discount_amount?: number | null;
  usage_limit: number;
  used_count: number;
  expires_at?: string | null;
  is_active: boolean | number;
  applicable_products_json?: string | null;
  applicable_categories_json?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DBOrder {
  id: string;
  order_number: string;
  customer_id?: string | null;
  customer_name: string;
  customer_phone: string;
  customer_email?: string | null;
  shipping_address_json: string;
  billing_address_json?: string | null;
  items_json: string;
  subtotal: number;
  shipping_cost: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  payment_method: string;
  payment_status: "pending" | "paid" | "failed" | "refunded";
  order_status: "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  courier_partner?: string | null;
  tracking_number?: string | null;
  tracking_url?: string | null;
  coupon_code?: string | null;
  notes?: string | null;
  whatsapp_message_sent: boolean | number;
  ip_address?: string | null;
  user_agent?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DBOrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id?: string | null;
  product_name: string;
  sku?: string | null;
  unit_price: number;
  quantity: number;
  total_price: number;
  created_at: string;
}

export interface DBOrderStatusHistory {
  id: string;
  order_id: string;
  status: string;
  note?: string | null;
  created_by?: string;
  created_at: string;
}

export interface DBWhatsAppLead {
  id: string | number;
  source: string;
  product_id?: string | null;
  product_name?: string | null;
  customer_name?: string | null;
  customer_phone?: string | null;
  customer_email?: string | null;
  quantity?: number | null;
  order_total?: number | null;
  message_preview?: string | null;
  user_agent?: string | null;
  referrer?: string | null;
  is_converted?: boolean | number;
  converted_order_id?: string | null;
  created_at: string;
}
