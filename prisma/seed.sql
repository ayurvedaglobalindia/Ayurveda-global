-- ==============================================================================
-- AYUR VEDA GLOBAL (AVG) - INITIAL PRODUCTION SEED SCRIPT
-- Products: BODY Essential Nutrition, STAYMAX+ Spray, Hair Re-Grow Kit, etc.
-- ==============================================================================

-- 1. Sample Users
INSERT INTO users (id, name, phone_number, email, role, created_at, updated_at)
VALUES 
  ('usr-001', 'Dr. Ramesh Vaidya', '919123485451', 'vaidya@ayurvedaglobal.com', 'ADMIN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('usr-002', 'Vikram Malhotra', '919876543210', 'vikram.m@example.com', 'CUSTOMER', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('usr-003', 'Ananya Deshmukh', '919820011223', 'ananya.d@example.com', 'CUSTOMER', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (phone_number) DO NOTHING;

-- 2. Core Sample Ayurvedic Products
INSERT INTO products (
  id, title, slug, short_desc, detailed_desc, price, discounted_price, stock_count, sku, category, image_url, is_featured, created_at, updated_at
) VALUES 
  (
    'prod-body-nutrition',
    'BODY Essential Nutrition (60 Capsules)',
    'body-essential-nutrition',
    'Premium Ayurvedic revitalization formula with 60 vegetarian capsules to boost physical stamina, inner strength, and sustained vitality.',
    'Ayur Veda Global''s BODY Essential Nutrition is an authentic, lab-certified Ayurvedic formulation engineered for peak energy, muscle vitality, and endurance. Built on classical Rasayana principles, this daily supplement works from within to strengthen bodily tissues (Dhatus), support nervous system vitality, and maintain healthy metabolism. Standardized extracts of Ashwagandha, Shilajit, Safed Musli, Gokshura, and Kaunch Beej.',
    149900,  -- ₹1,499.00
    199900,  -- ₹1,999.00 compare-at
    250,
    'AVG-CAP-BEN-60',
    'supplements',
    '/images/products/body-essential-nutrition-card.jpg',
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'prod-staymax-spray',
    'STAYMAX+ Delay Spray for Men (30ml)',
    'staymax-delay-spray',
    'Clinically verified natural delay spray with Aloe Vera & Vitamin E for extended performance and heightened intimacy endurance.',
    'STAYMAX+ is a doctor-formulated intimate endurance topical solution combining soothing Aloe Vera and Vitamin E with mild desensitizing agents. Engineered specifically for prolonged performance, reduced sensitivity without numbness, and rapid 10-15 minute absorption with no greasy residue. 100% skin safe and discreetly packaged.',
    99900,   -- ₹999.00
    149900,  -- ₹1,499.00 compare-at
    180,
    'AVG-SPR-SMX-30',
    'personal-care',
    '/images/products/staymax-delay-spray-card.jpg',
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'prod-hair-regrow-kit',
    'Complete Ayurvedic Hair Re-Grow Kit',
    'hair-regrow-kit',
    'Holistic 2-in-1 inside-out kit: Classical Bhringraj Scalp Taila (100ml) paired with 60 Botanical Follicle Nutrition Capsules.',
    'Complete Ayurvedic therapy targeting hair fall and thinning at the follicular root. Features our classical cold-pressed Bhringraj Scalp Taila to nourish hair follicles externally, combined with 60 Botanical Follicle Nutrition Capsules providing daily internal micro-nutrients of Amla, Brahmi, and Shankhpushpi. Clinically shown to reduce fallout in 4 weeks.',
    189900,  -- ₹1,899.00
    279900,  -- ₹2,799.00 compare-at
    140,
    'AVG-KIT-HRK-01',
    'wellness',
    '/images/products/hair-regrow-kit-card.jpg',
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  ),
  (
    'prod-vitality-combo',
    'Total Vitality Power Combo (Capsules + Spray)',
    'vitality-power-combo',
    'Synergistic duo: BODY Essential Nutrition 60 Capsules paired with STAYMAX+ Delay Spray for holistic vitality and performance.',
    'The ultimate men''s vitality synergy. Combine internal Rasayana strength with external confidence. Includes full-size BODY Essential Nutrition capsules and STAYMAX+ spray at exclusive bundled savings.',
    219900,  -- ₹2,199.00
    349900,  -- ₹3,499.00 compare-at
    95,
    'AVG-CMB-VPC-01',
    'wellness',
    '/images/products/vitality-power-combo-card.jpg',
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
  )
ON CONFLICT (slug) DO UPDATE SET
  price = EXCLUDED.price,
  discounted_price = EXCLUDED.discounted_price,
  stock_count = EXCLUDED.stock_count,
  updated_at = CURRENT_TIMESTAMP;

-- 3. Sample Doctor Consultation (Vaidya Consult)
INSERT INTO consultations (
  id, user_id, patient_name, phone_number, dosha_type, symptoms, booking_status, doctor_notes, consultation_date, created_at, updated_at
) VALUES (
  'cons-001',
  'usr-002',
  'Vikram Malhotra',
  '919876543210',
  'Vata-Pitta',
  'Chronic fatigue, disturbed sleep patterns, stress-induced hair thinning, and low afternoon stamina.',
  'CONFIRMED',
  'Recommended daily Ashwagandha Rasayana with warm cow milk at bedtime. Prescribed Bhringraj scalp massage 3x weekly.',
  CURRENT_TIMESTAMP + INTERVAL '1 day',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT (id) DO NOTHING;

-- 4. Sample Order & Order Items
INSERT INTO orders (
  id, order_reference_id, user_id, total_amount, payment_mode, payment_status, shipping_status, tracking_number, shipping_address, created_at, updated_at
) VALUES (
  'ord-001',
  'AVG-476972',
  'usr-002',
  149900,
  'COD',
  'PENDING',
  'DISPATCHED',
  'DEL-849201948',
  '{"firstName":"Vikram","lastName":"Malhotra","addressLine1":"Flat 402, Lotus Grand","city":"Mumbai","state":"Maharashtra","pincode":"400001","phone":"9876543210"}',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
)
ON CONFLICT (order_reference_id) DO NOTHING;

INSERT INTO order_items (
  id, order_id, product_id, quantity, unit_price
) VALUES (
  'item-001',
  'ord-001',
  'prod-body-nutrition',
  1,
  149900
)
ON CONFLICT (id) DO NOTHING;

-- 5. Verified Buyer Reviews
INSERT INTO reviews (
  id, product_id, user_id, customer_name, rating, review_text, is_verified_buyer, created_at
) VALUES 
  (
    'rev-001',
    'prod-body-nutrition',
    'usr-002',
    'Vikram M.',
    5,
    'Noticeable difference in stamina after 2 weeks of disciplined use. No palpitations, very smooth and authentic herbal energy.',
    TRUE,
    CURRENT_TIMESTAMP
  ),
  (
    'rev-002',
    'prod-staymax-spray',
    NULL,
    'Rohit K.',
    5,
    'Fast acting and zero unpleasant odor or burning. Very discreet delivery package as promised.',
    TRUE,
    CURRENT_TIMESTAMP
  ),
  (
    'rev-003',
    'prod-hair-regrow-kit',
    'usr-003',
    'Ananya D.',
    5,
    'The Bhringraj oil is non-sticky and smells like authentic Ayurvedic herbs. Hair fall reduced significantly by week 3.',
    TRUE,
    CURRENT_TIMESTAMP
  )
ON CONFLICT (id) DO NOTHING;
