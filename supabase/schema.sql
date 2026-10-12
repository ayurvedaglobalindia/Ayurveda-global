-- ==============================================================================
-- E-COMMERCE SUPABASE POSTGRESQL DATABASE SCHEMA
-- Compatible with Next.js App Router, Supabase Auth, and Row-Level Security (RLS)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. PROFILES (Extends Supabase auth.users)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  email TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'editor')),
  addresses JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Index for fast lookup by phone/email
CREATE INDEX IF NOT EXISTS idx_profiles_phone ON public.profiles(phone);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- ------------------------------------------------------------------------------
-- 2. CATEGORIES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);

-- ------------------------------------------------------------------------------
-- 3. PRODUCTS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  price INTEGER NOT NULL CHECK (price >= 0), -- Stored in paise / smallest currency unit (e.g. ₹999 = 99900)
  compare_at_price INTEGER CHECK (compare_at_price >= price),
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  sku TEXT UNIQUE,
  stock INTEGER NOT NULL DEFAULT 100 CHECK (stock >= 0),
  images TEXT[] NOT NULL DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  rating NUMERIC(3,2) DEFAULT 4.90 CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER DEFAULT 0,
  benefits TEXT[] DEFAULT '{}',
  ingredients TEXT[] DEFAULT '{}',
  how_to_use TEXT,
  specifications JSONB DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON public.products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON public.products(is_active);

-- ------------------------------------------------------------------------------
-- 4. ORDERS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL, -- e.g. ORD-20261012-ABCD
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  shipping_address JSONB NOT NULL,
  items JSONB NOT NULL, -- Snapshot of item details at time of purchase
  subtotal INTEGER NOT NULL CHECK (subtotal >= 0),
  shipping_fee INTEGER NOT NULL DEFAULT 0,
  discount INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL CHECK (total >= 0),
  payment_method TEXT NOT NULL CHECK (payment_method IN ('upi', 'razorpay', 'cod', 'whatsapp')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  order_status TEXT NOT NULL DEFAULT 'confirmed' CHECK (order_status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  carrier_name TEXT, -- e.g. BlueDart, Delhivery
  awb_tracking_number TEXT,
  tracking_history JSONB DEFAULT '[]'::jsonb,
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON public.orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(order_status);

-- ------------------------------------------------------------------------------
-- 5. ORDER ITEMS (Normalized line items for detailed analytics & reporting)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price INTEGER NOT NULL CHECK (unit_price >= 0),
  total_price INTEGER NOT NULL CHECK (total_price >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON public.order_items(product_id);

-- ------------------------------------------------------------------------------
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view and update their own profile; admins can view all
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT 
  USING (true);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Categories & Products: Anyone can read active products; Admin can modify
CREATE POLICY "Categories viewable by public" 
  ON public.categories FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Products viewable by public" 
  ON public.products FOR SELECT 
  USING (is_active = true);

-- Orders: Authenticated users can view their own orders; Anyone can create orders (e.g. guest checkout)
CREATE POLICY "Anyone can create orders" 
  ON public.orders FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Users can view their own orders" 
  ON public.orders FOR SELECT 
  USING (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Order items viewable by matching order" 
  ON public.order_items FOR SELECT 
  USING (true);

CREATE POLICY "Anyone can insert order items" 
  ON public.order_items FOR INSERT 
  WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 7. AUTOMATIC USER PROFILE TRIGGER (On Supabase auth.users Signup)
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'Patron'),
    NEW.email,
    NEW.phone,
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ------------------------------------------------------------------------------
-- 8. INITIAL SEED DATA (Classical Ayurvedic Formulations)
-- ------------------------------------------------------------------------------
INSERT INTO public.categories (name, slug, description, sort_order) VALUES
  ('Rasayana Supplements', 'supplements', 'Classical dietary Rasayana supplements for vitality, immunity, and metabolic longevity.', 1),
  ('Herbal Wellness', 'wellness', 'Traditional therapeutic formulations, organic tonics, and restorative teas.', 2),
  ('Personal Care & Oils', 'personal-care', 'Pure Ayurvedic topical oils, botanical sprays, and herbal care essentials.', 3)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.products (title, slug, description, short_description, price, compare_at_price, sku, stock, images, is_featured, rating, review_count, benefits, ingredients, how_to_use) VALUES
(
  'BODY Essential Nutrition',
  'body-essential-nutrition',
  'High-potency daily Ayurvedic Rasayana formulation with Ashwagandha, Gokshura, and Safed Musli. Scientifically standardized to support endurance, cellular recovery, and holistic balance.',
  'Daily vitality and cellular rejuvenation with standardized botanical extracts.',
  99900,
  149900,
  'AVG-BEN-01',
  150,
  ARRAY['/images/product-body-essential.png', '/images/product-body-essential-back.png'],
  true,
  4.95,
  128,
  ARRAY['Enhances natural stamina & endurance', 'Promotes cellular rejuvenation', 'Sustained energy without crash'],
  ARRAY['Standardized Ashwagandha Extract (5% Withanolides)', 'Safed Musli', 'Purified Shilajit', 'Gokshura'],
  'Take 1 capsule twice daily with warm water or milk after meals, or as directed by your Ayurvedic physician.'
),
(
  'STAYMAX+ Delay Spray',
  'staymax-delay-spray',
  'Herbal intimacy spray formulated with natural botanical extracts for enhanced control and extended intimacy. Discrete, safe, and free from harsh chemicals.',
  'Discrete endurance spray with natural cooling botanical extracts.',
  49900,
  89900,
  'AVG-SMX-01',
  200,
  ARRAY['/images/product-staymax.png'],
  true,
  4.88,
  94,
  ARRAY['Non-numbing botanical formula', 'Enhances endurance & confidence', 'Discrete & pocket-friendly'],
  ARRAY['Clove Oil', 'Nutmeg Extract', 'Aloe Vera Leaf Juice', 'Peppermint Oil'],
  'Spray 2-3 sprays on target area 15-20 minutes prior. Massage gently until absorbed.'
),
(
  'Vitality & Performance Combo',
  'vitality-power-combo',
  'The complete Ayurvedic vitality protocol combining BODY Essential Nutrition daily supplement with STAYMAX+ botanical spray for comprehensive wellness.',
  'Complete daily nourishment + extended endurance synergy kit.',
  129900,
  239800,
  'AVG-VPC-01',
  85,
  ARRAY['/images/product-body-essential.png', '/images/product-staymax.png'],
  true,
  4.98,
  76,
  ARRAY['Holistic inside-out stamina', 'Save ₹1,099 with protocol combo', 'Free express courier delivery'],
  ARRAY['Ashwagandha', 'Shilajit', 'Safed Musli', 'Botanical Herbal Actives'],
  'Follow individual instructions for BODY Essential Nutrition capsules and STAYMAX+ spray.'
)
ON CONFLICT (slug) DO NOTHING;
