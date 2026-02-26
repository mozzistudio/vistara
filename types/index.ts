// ── ENUMS ─────────────────────────────────────────────────────────────────────

export type UserRole = 'ADMIN' | 'MANAGER' | 'SELLER'
export type PharmacyType = 'RETAIL' | 'HOSPITAL' | 'CHAIN' | 'CLINIC'
export type PharmacyTier = 'PREMIUM' | 'STANDARD' | 'BASIC'
export type EntityStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
export type StockLevel = 'ALTO' | 'MEDIO' | 'BAJO' | 'RUPTURA'
export type MsgChannel = 'WEB' | 'WHATSAPP'
export type MsgRole = 'USER' | 'ASSISTANT' | 'SYSTEM'

// ── CORE MODELS ───────────────────────────────────────────────────────────────

export interface User {
  id: string
  email: string
  name: string
  password_hash: string
  role: UserRole
  avatar?: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  molecule: string
  therapeutic_class: string
  dosage_form: string
  presentations: string[]
  indications?: string
  contraindications?: string
  interactions?: string
  clinical_summary?: string
  regulatory_status: string
  image_url?: string
  created_at: string
  updated_at: string
}

export interface Pharmacy {
  id: string
  name: string
  type: PharmacyType
  address: string
  region: string
  province: string
  latitude?: number
  longitude?: number
  contact_name?: string
  contact_phone?: string
  contact_email?: string
  operating_hours?: string
  status: EntityStatus
  tier: PharmacyTier
  created_at: string
  updated_at: string
}

export interface Seller {
  id: string
  user_id: string
  employee_code: string
  region: string
  territory: string
  target_monthly: number
  target_quarterly: number
  hire_date: string
  status: EntityStatus
  created_at: string
  updated_at: string
  // Joined
  user?: Pick<User, 'id' | 'name' | 'email' | 'avatar'>
}

export interface SellerPharmacy {
  id: string
  seller_id: string
  pharmacy_id: string
  assigned_at: string
}

export interface Stock {
  id: string
  product_id: string
  pharmacy_id: string
  quantity: number
  level: StockLevel
  min_threshold: number
  last_updated: string
  // Joined
  product?: Pick<Product, 'id' | 'name' | 'molecule' | 'therapeutic_class'>
  pharmacy?: Pick<Pharmacy, 'id' | 'name' | 'region'>
}

export interface Sale {
  id: string
  product_id: string
  pharmacy_id: string
  seller_id: string
  quantity: number
  revenue: number
  date: string
  order_type: string
  created_at: string
  // Joined
  product?: Pick<Product, 'id' | 'name' | 'molecule'>
  pharmacy?: Pick<Pharmacy, 'id' | 'name' | 'region'>
  seller?: Pick<Seller, 'id' | 'employee_code'>
}

export interface VisitLog {
  id: string
  seller_id: string
  pharmacy_id: string
  visit_date: string
  notes?: string
  outcome?: string
  created_at: string
  pharmacy?: Pick<Pharmacy, 'id' | 'name' | 'region'>
}

export interface Conversation {
  id: string
  user_id: string
  channel: MsgChannel
  title?: string
  context?: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  conversation_id: string
  role: MsgRole
  content: string
  tool_calls?: unknown
  created_at: string
}

// ── ANALYTICS / AGGREGATED ────────────────────────────────────────────────────

export interface KpiSummary {
  totalProducts: number
  activePharmacies: number
  totalRevenue: number
  totalUnits: number
  stockAlerts: number
  criticalAlerts: number
  revenueGrowth: number
}

export interface SalesDataPoint {
  date: string
  revenue: number
  units: number
}

export interface ProductRevenue {
  product_id: string
  product_name: string
  total_revenue: number
  total_units: number
}

export interface PharmacyRevenue {
  pharmacy_id: string
  pharmacy_name: string
  region: string
  total_revenue: number
  total_units: number
}

export interface SellerPerformance {
  seller_id: string
  seller_name: string
  employee_code: string
  region: string
  territory: string
  target_monthly: number
  actual_revenue: number
  performance_pct: number
  visit_count: number
  pharmacy_count: number
}

export interface StockAlert {
  id: string
  product_name: string
  pharmacy_name: string
  region: string
  quantity: number
  level: StockLevel
  min_threshold: number
  last_updated: string
  product_id: string
  pharmacy_id: string
}

// ── NEXT AUTH ─────────────────────────────────────────────────────────────────

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      role: UserRole
    }
  }
  interface User {
    id: string
    name: string
    email: string
    role: UserRole
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: UserRole
  }
}
