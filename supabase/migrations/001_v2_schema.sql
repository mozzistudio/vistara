-- Vistara V2 Schema
-- Run this in the Supabase SQL editor at:
-- https://app.supabase.com/project/wxqbapavtmqbrldvoxla/sql/new

-- ── DROP OLD TABLES ──────────────────────────────────────────────────────────
DROP TABLE IF EXISTS conversation_logs CASCADE;
DROP TABLE IF EXISTS visit_products CASCADE;
DROP TABLE IF EXISTS alerts CASCADE;
DROP TABLE IF EXISTS routes CASCADE;
DROP TABLE IF EXISTS visits CASCADE;
DROP TABLE IF EXISTS hcps CASCADE;
DROP TABLE IF EXISTS teams CASCADE;

-- Drop old enum types (if any)
DO $$ BEGIN
  DROP TYPE IF EXISTS visit_status CASCADE;
  DROP TYPE IF EXISTS user_role_old CASCADE;
  DROP TYPE IF EXISTS alert_type CASCADE;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Drop new enum types if re-running
DO $$ BEGIN
  DROP TYPE IF EXISTS user_role CASCADE;
  DROP TYPE IF EXISTS pharmacy_type CASCADE;
  DROP TYPE IF EXISTS pharmacy_tier CASCADE;
  DROP TYPE IF EXISTS entity_status CASCADE;
  DROP TYPE IF EXISTS stock_level CASCADE;
  DROP TYPE IF EXISTS msg_channel CASCADE;
  DROP TYPE IF EXISTS msg_role CASCADE;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Drop new tables if re-running
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS conversations CASCADE;
DROP TABLE IF EXISTS visit_logs CASCADE;
DROP TABLE IF EXISTS sales CASCADE;
DROP TABLE IF EXISTS stock CASCADE;
DROP TABLE IF EXISTS seller_pharmacies CASCADE;
DROP TABLE IF EXISTS sellers CASCADE;
DROP TABLE IF EXISTS pharmacies CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ── ENUMS ────────────────────────────────────────────────────────────────────
CREATE TYPE user_role AS ENUM ('ADMIN', 'MANAGER', 'SELLER');
CREATE TYPE pharmacy_type AS ENUM ('RETAIL', 'HOSPITAL', 'CHAIN', 'CLINIC');
CREATE TYPE pharmacy_tier AS ENUM ('PREMIUM', 'STANDARD', 'BASIC');
CREATE TYPE entity_status AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');
CREATE TYPE stock_level AS ENUM ('ALTO', 'MEDIO', 'BAJO', 'RUPTURA');
CREATE TYPE msg_channel AS ENUM ('WEB', 'WHATSAPP');
CREATE TYPE msg_role AS ENUM ('USER', 'ASSISTANT', 'SYSTEM');

-- ── USERS ────────────────────────────────────────────────────────────────────
CREATE TABLE users (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role user_role DEFAULT 'SELLER',
  avatar TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ── PRODUCTS ─────────────────────────────────────────────────────────────────
CREATE TABLE products (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  molecule TEXT NOT NULL,
  therapeutic_class TEXT NOT NULL,
  dosage_form TEXT NOT NULL,
  presentations TEXT[] DEFAULT '{}',
  indications TEXT,
  contraindications TEXT,
  interactions TEXT,
  clinical_summary TEXT,
  regulatory_status TEXT DEFAULT 'ACTIVE',
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ── PHARMACIES ───────────────────────────────────────────────────────────────
CREATE TABLE pharmacies (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  type pharmacy_type DEFAULT 'RETAIL',
  address TEXT NOT NULL,
  region TEXT NOT NULL,
  province TEXT NOT NULL,
  latitude NUMERIC,
  longitude NUMERIC,
  contact_name TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  operating_hours TEXT,
  status entity_status DEFAULT 'ACTIVE',
  tier pharmacy_tier DEFAULT 'STANDARD',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ── SELLERS ──────────────────────────────────────────────────────────────────
CREATE TABLE sellers (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  employee_code TEXT UNIQUE NOT NULL,
  region TEXT NOT NULL,
  territory TEXT NOT NULL,
  target_monthly NUMERIC DEFAULT 0,
  target_quarterly NUMERIC DEFAULT 0,
  hire_date DATE NOT NULL,
  status entity_status DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ── SELLER PHARMACY ASSIGNMENTS ──────────────────────────────────────────────
CREATE TABLE seller_pharmacies (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  seller_id TEXT REFERENCES sellers(id) ON DELETE CASCADE,
  pharmacy_id TEXT REFERENCES pharmacies(id) ON DELETE CASCADE,
  assigned_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(seller_id, pharmacy_id)
);

-- ── STOCK ────────────────────────────────────────────────────────────────────
CREATE TABLE stock (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  pharmacy_id TEXT REFERENCES pharmacies(id) ON DELETE CASCADE,
  quantity INT NOT NULL DEFAULT 0,
  level stock_level NOT NULL DEFAULT 'ALTO',
  min_threshold INT DEFAULT 10,
  last_updated TIMESTAMPTZ DEFAULT now(),
  UNIQUE(product_id, pharmacy_id)
);

-- ── SALES ────────────────────────────────────────────────────────────────────
CREATE TABLE sales (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  product_id TEXT REFERENCES products(id),
  pharmacy_id TEXT REFERENCES pharmacies(id),
  seller_id TEXT REFERENCES sellers(id),
  quantity INT NOT NULL,
  revenue NUMERIC NOT NULL,
  date DATE NOT NULL,
  order_type TEXT DEFAULT 'REGULAR',
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX sales_date_idx ON sales(date);
CREATE INDEX sales_product_idx ON sales(product_id);
CREATE INDEX sales_pharmacy_idx ON sales(pharmacy_id);
CREATE INDEX sales_seller_idx ON sales(seller_id);

-- ── VISIT LOGS ───────────────────────────────────────────────────────────────
CREATE TABLE visit_logs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  seller_id TEXT REFERENCES sellers(id),
  pharmacy_id TEXT REFERENCES pharmacies(id),
  visit_date DATE NOT NULL,
  notes TEXT,
  outcome TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── AI CONVERSATIONS ─────────────────────────────────────────────────────────
CREATE TABLE conversations (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  channel msg_channel DEFAULT 'WEB',
  title TEXT,
  context JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ── MESSAGES ─────────────────────────────────────────────────────────────────
CREATE TABLE messages (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  conversation_id TEXT REFERENCES conversations(id) ON DELETE CASCADE,
  role msg_role NOT NULL,
  content TEXT NOT NULL,
  tool_calls JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ── DISABLE RLS (for service role access) ────────────────────────────────────
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE pharmacies DISABLE ROW LEVEL SECURITY;
ALTER TABLE sellers DISABLE ROW LEVEL SECURITY;
ALTER TABLE seller_pharmacies DISABLE ROW LEVEL SECURITY;
ALTER TABLE stock DISABLE ROW LEVEL SECURITY;
ALTER TABLE sales DISABLE ROW LEVEL SECURITY;
ALTER TABLE visit_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE conversations DISABLE ROW LEVEL SECURITY;
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;
