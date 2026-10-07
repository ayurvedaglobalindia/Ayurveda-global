import { db } from "@/lib/db";

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    short_description TEXT,
    category TEXT NOT NULL,
    price INTEGER NOT NULL,
    compare_at_price INTEGER,
    inventory_quantity INTEGER DEFAULT 0,
    track_inventory BOOLEAN DEFAULT 1,
    age_restricted BOOLEAN DEFAULT 0,
    images_json TEXT NOT NULL,
    variants_json TEXT,
    ingredients_json TEXT,
    usage TEXT,
    warnings_json TEXT,
    tags_json TEXT,
    seo_json TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    order_number TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    shipping_address_json TEXT NOT NULL,
    billing_address_json TEXT,
    items_json TEXT NOT NULL,
    subtotal INTEGER NOT NULL,
    shipping_cost INTEGER DEFAULT 0,
    tax_amount INTEGER DEFAULT 0,
    discount_amount INTEGER DEFAULT 0,
    total_amount INTEGER NOT NULL,
    payment_method TEXT NOT NULL,
    payment_status TEXT DEFAULT 'pending',
    order_status TEXT DEFAULT 'confirmed',
    coupon_code TEXT,
    notes TEXT,
    whatsapp_message_sent BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS order_status_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT NOT NULL,
    status TEXT NOT NULL,
    note TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id)
  );

  CREATE TABLE IF NOT EXISTS coupons (
    code TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    value INTEGER NOT NULL,
    min_order_amount INTEGER DEFAULT 0,
    max_discount_amount INTEGER,
    usage_limit INTEGER,
    used_count INTEGER DEFAULT 0,
    expires_at DATETIME,
    is_active BOOLEAN DEFAULT 1,
    applicable_products_json TEXT,
    applicable_categories_json TEXT
  );

  CREATE TABLE IF NOT EXISTS whatsapp_leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source TEXT NOT NULL,
    product_id TEXT,
    product_name TEXT,
    customer_name TEXT,
    customer_phone TEXT,
    customer_email TEXT,
    quantity INTEGER,
    order_total INTEGER,
    message_preview TEXT,
    user_agent TEXT,
    referrer TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
  CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
  CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
  CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON orders(customer_phone);
  CREATE INDEX IF NOT EXISTS idx_whatsapp_leads_created_at ON whatsapp_leads(created_at);
`);
