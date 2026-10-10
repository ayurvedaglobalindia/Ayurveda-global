-- ==============================================================================
-- AYUR VEDA GLOBAL (AVG) - ENTERPRISE PRODUCTION SQL SCHEMA
-- Target Dialects: PostgreSQL 14+, SQLite 3.35+, Cloudflare D1 / LibSQL, MySQL 8.0+
-- Currency Unit: Indian Paise (1 INR = 100 Paise) to avoid floating point inaccuracies
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. CATEGORIES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(128) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_active ON categories(is_active);

-- ------------------------------------------------------------------------------
-- 2. PRODUCTS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(128) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    tagline VARCHAR(255),
    description TEXT,
    short_description TEXT,
    category_id VARCHAR(64) NOT NULL,
    price INT NOT NULL,                     -- Price in Indian Paise (e.g. 149900 = ₹1,499.00)
    compare_at_price INT,                   -- Strikethrough price in Paise
    cost_price INT,                         -- Internal COGS in Paise
    inventory_quantity INT DEFAULT 0,
    track_inventory BOOLEAN DEFAULT TRUE,
    low_stock_threshold INT DEFAULT 10,
    age_restricted BOOLEAN DEFAULT FALSE,   -- Requires 18+ verification (e.g., STAYMAX+)
    dosage_form VARCHAR(64),                -- 'capsules', 'spray', 'oil', 'resin', 'powder'
    net_quantity VARCHAR(64),               -- '60 Veg Capsules', '30 ml', '100 ml', '20 g'
    images_json TEXT NOT NULL,              -- JSON array of ProductImage objects [{src, alt, isPrimary}]
    variants_json TEXT,                     -- JSON array of ProductVariant objects
    ingredients_json TEXT,                  -- JSON array of classical herbal ingredients
    usage_instructions TEXT,                -- Sanskrit & modern regimen instructions
    warnings_json TEXT,                     -- JSON array of contraindications & caution notes
    tags_json TEXT,                         -- Search tags & dosha tags (Vata, Pitta, Kapha)
    seo_json TEXT,                          -- Meta title, description, schema markup
    is_active BOOLEAN DEFAULT TRUE,
    rating_average DECIMAL(3, 2) DEFAULT 4.90,
    rating_count INT DEFAULT 120,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);

-- ------------------------------------------------------------------------------
-- 3. PRODUCT INVENTORY LOGS (AUDIT TRAIL)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS inventory_logs (
    id VARCHAR(64) PRIMARY KEY,
    product_id VARCHAR(64) NOT NULL,
    change_quantity INT NOT NULL,            -- Positive for restock, negative for sale
    balance_after INT NOT NULL,
    reason VARCHAR(64) NOT NULL,             -- 'order_placed', 'order_cancelled', 'manual_restock', 'spoilage'
    reference_id VARCHAR(64),                -- order_id or purchase_order_id
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_inv_logs_product ON inventory_logs(product_id);
CREATE INDEX IF NOT EXISTS idx_inv_logs_created_at ON inventory_logs(created_at);

-- ------------------------------------------------------------------------------
-- 4. CUSTOMERS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS customers (
    id VARCHAR(64) PRIMARY KEY,
    phone VARCHAR(20) UNIQUE NOT NULL,      -- Normalized 10-digit Indian mobile number
    name VARCHAR(255),
    email VARCHAR(255),
    is_phone_verified BOOLEAN DEFAULT FALSE,
    verified_at TIMESTAMP,
    primary_dosha VARCHAR(32),              -- 'Vata', 'Pitta', 'Kapha', 'Tridoshic'
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);

-- ------------------------------------------------------------------------------
-- 5. CUSTOMER ADDRESSES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS customer_addresses (
    id VARCHAR(64) PRIMARY KEY,
    customer_id VARCHAR(64) NOT NULL,
    address_type VARCHAR(32) DEFAULT 'shipping', -- 'shipping', 'billing'
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    company VARCHAR(128),
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    city VARCHAR(128) NOT NULL,
    state VARCHAR(128) NOT NULL,
    pincode VARCHAR(10) NOT NULL,           -- 6-digit Indian postal code
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    country VARCHAR(64) DEFAULT 'India',
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_cust_addr_customer ON customer_addresses(customer_id);
CREATE INDEX IF NOT EXISTS idx_cust_addr_pincode ON customer_addresses(pincode);

-- ------------------------------------------------------------------------------
-- 6. COUPONS & PROMOTIONS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS coupons (
    code VARCHAR(64) PRIMARY KEY,
    type VARCHAR(32) NOT NULL,               -- 'percentage', 'fixed', 'free_shipping'
    value INT NOT NULL,                     -- % (e.g. 10) or Paise for fixed discount
    min_order_amount INT DEFAULT 0,         -- In Paise
    max_discount_amount INT,                -- Cap in Paise
    usage_limit INT DEFAULT 100,
    used_count INT DEFAULT 0,
    expires_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    applicable_products_json TEXT,          -- JSON string array of product IDs
    applicable_categories_json TEXT,        -- JSON string array of category slugs
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_coupons_active ON coupons(is_active, expires_at);

-- ------------------------------------------------------------------------------
-- 7. ORDERS TABLE (CORE E-COMMERCE TRANSACTIONS)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(64) PRIMARY KEY,
    order_number VARCHAR(64) UNIQUE NOT NULL, -- e.g. ORD-20261010-8291
    customer_id VARCHAR(64),
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(255),
    
    -- Addresses stored as structured snapshots (immutable even if user edits profile)
    shipping_address_json TEXT NOT NULL,
    billing_address_json TEXT,
    items_json TEXT NOT NULL,               -- JSON snapshot of ordered line items
    
    -- Monetary amounts in Paise
    subtotal INT NOT NULL,                  -- Sum of item prices
    shipping_cost INT DEFAULT 0,            -- 0 if free shipping (above ₹999)
    tax_amount INT DEFAULT 0,               -- 12% GST breakdown
    discount_amount INT DEFAULT 0,
    total_amount INT NOT NULL,              -- Final payable amount
    
    -- Payment & Logistics
    payment_method VARCHAR(32) NOT NULL,    -- 'cod', 'whatsapp', 'prepaid_upi', 'razorpay'
    payment_status VARCHAR(32) DEFAULT 'pending', -- 'pending', 'paid', 'failed', 'refunded'
    order_status VARCHAR(32) DEFAULT 'confirmed', -- 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'
    
    -- Tracking & Courier Integration
    courier_partner VARCHAR(64),            -- 'Shiprocket', 'Delhivery', 'BlueDart'
    tracking_number VARCHAR(128),
    tracking_url TEXT,
    
    -- Marketing & Attribution
    coupon_code VARCHAR(64),
    notes TEXT,
    whatsapp_message_sent BOOLEAN DEFAULT FALSE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL,
    FOREIGN KEY (coupon_code) REFERENCES coupons(code) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_orders_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

-- ------------------------------------------------------------------------------
-- 8. ORDER ITEMS TABLE (NORMALIZED LINE ITEMS FOR REPORTING & ERP)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS order_items (
    id VARCHAR(64) PRIMARY KEY,
    order_id VARCHAR(64) NOT NULL,
    product_id VARCHAR(64) NOT NULL,
    variant_id VARCHAR(64),
    product_name VARCHAR(255) NOT NULL,
    sku VARCHAR(64),
    unit_price INT NOT NULL,                -- In Paise
    quantity INT NOT NULL,
    total_price INT NOT NULL,               -- In Paise (unit_price * quantity)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items(product_id);

-- ------------------------------------------------------------------------------
-- 9. ORDER STATUS AUDIT TRAIL
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS order_status_history (
    id VARCHAR(64) PRIMARY KEY,
    order_id VARCHAR(64) NOT NULL,
    status VARCHAR(32) NOT NULL,
    note TEXT,
    created_by VARCHAR(64) DEFAULT 'system',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_status_history_order ON order_status_history(order_id);

-- ------------------------------------------------------------------------------
-- 10. WHATSAPP LEADS & VAIDYA TELE-CONSULTATIONS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS whatsapp_leads (
    id VARCHAR(64) PRIMARY KEY,
    source VARCHAR(64) NOT NULL,            -- 'vaidya_consult_nav', 'float', 'checkout_cod', 'product_enquiry'
    product_id VARCHAR(64),
    product_name VARCHAR(255),
    customer_name VARCHAR(255),
    customer_phone VARCHAR(20),
    customer_email VARCHAR(255),
    quantity INT,
    order_total INT,                        -- In Paise
    message_preview TEXT,
    user_agent TEXT,
    referrer TEXT,
    is_converted BOOLEAN DEFAULT FALSE,
    converted_order_id VARCHAR(64),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL,
    FOREIGN KEY (converted_order_id) REFERENCES orders(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON whatsapp_leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON whatsapp_leads(customer_phone);
CREATE INDEX IF NOT EXISTS idx_leads_source ON whatsapp_leads(source);

-- ------------------------------------------------------------------------------
-- 11. OTP VERIFICATION AUDIT LOGS (CYBERSECURITY & ANTI-FRAUD)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS otp_verifications (
    id VARCHAR(64) PRIMARY KEY,
    phone VARCHAR(20) NOT NULL,
    hashed_otp VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    attempts INT DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_otp_phone ON otp_verifications(phone);
CREATE INDEX IF NOT EXISTS idx_otp_expires ON otp_verifications(expires_at);
