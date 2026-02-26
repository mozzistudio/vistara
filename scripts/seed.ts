import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ── HELPERS ─────────────────────────────────────────────────────────────────

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randFloat(min: number, max: number, decimals = 2) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimals))
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function stockLevel(qty: number, min: number): 'ALTO' | 'MEDIO' | 'BAJO' | 'RUPTURA' {
  if (qty === 0) return 'RUPTURA'
  if (qty <= min) return 'BAJO'
  if (qty <= min * 3) return 'MEDIO'
  return 'ALTO'
}

function dateRange(start: string, end: string): string[] {
  const dates: string[] = []
  const cur = new Date(start)
  const endDate = new Date(end)
  while (cur <= endDate) {
    dates.push(cur.toISOString().split('T')[0])
    cur.setDate(cur.getDate() + 1)
  }
  return dates
}

// ── PRODUCTS DATA ────────────────────────────────────────────────────────────

const PRODUCTS = [
  // Cardiovascular (8)
  { name: 'Losartan 50mg', molecule: 'Losartan potásico', class: 'Cardiovascular', form: 'Tableta', presentations: ['50mg x 30 tabs', '100mg x 30 tabs'], price: 18.50 },
  { name: 'Amlodipino 5mg', molecule: 'Amlodipino besilato', class: 'Cardiovascular', form: 'Tableta', presentations: ['5mg x 30 tabs', '10mg x 30 tabs'], price: 14.20 },
  { name: 'Atorvastatina 20mg', molecule: 'Atorvastatina cálcica', class: 'Cardiovascular', form: 'Tableta', presentations: ['10mg x 30 tabs', '20mg x 30 tabs', '40mg x 30 tabs'], price: 22.80 },
  { name: 'Enalapril 10mg', molecule: 'Enalapril maleato', class: 'Cardiovascular', form: 'Tableta', presentations: ['5mg x 30 tabs', '10mg x 30 tabs', '20mg x 30 tabs'], price: 12.60 },
  { name: 'Metoprolol 50mg', molecule: 'Metoprolol tartrato', class: 'Cardiovascular', form: 'Tableta', presentations: ['25mg x 30 tabs', '50mg x 30 tabs', '100mg x 30 tabs'], price: 16.90 },
  { name: 'Clopidogrel 75mg', molecule: 'Clopidogrel bisulfato', class: 'Cardiovascular', form: 'Tableta', presentations: ['75mg x 28 tabs'], price: 28.40 },
  { name: 'Rosuvastatina 10mg', molecule: 'Rosuvastatina cálcica', class: 'Cardiovascular', form: 'Tableta', presentations: ['5mg x 30 tabs', '10mg x 30 tabs', '20mg x 30 tabs'], price: 31.20 },
  { name: 'Bisoprolol 5mg', molecule: 'Bisoprolol fumarato', class: 'Cardiovascular', form: 'Tableta', presentations: ['2.5mg x 30 tabs', '5mg x 30 tabs', '10mg x 30 tabs'], price: 19.70 },

  // Diabetes (5)
  { name: 'Metformina 850mg', molecule: 'Metformina clorhidrato', class: 'Diabetes', form: 'Tableta', presentations: ['500mg x 60 tabs', '850mg x 60 tabs', '1000mg x 60 tabs'], price: 11.40 },
  { name: 'Glibenclamida 5mg', molecule: 'Glibenclamida', class: 'Diabetes', form: 'Tableta', presentations: ['2.5mg x 30 tabs', '5mg x 30 tabs'], price: 9.80 },
  { name: 'Sitagliptina 100mg', molecule: 'Sitagliptina fosfato', class: 'Diabetes', form: 'Tableta', presentations: ['50mg x 28 tabs', '100mg x 28 tabs'], price: 45.60 },
  { name: 'Insulina Glargina 100U', molecule: 'Insulina glargina', class: 'Diabetes', form: 'Solución inyectable', presentations: ['100 U/mL x 10mL vial', '100 U/mL x 3mL pluma'], price: 68.90 },
  { name: 'Empagliflozina 10mg', molecule: 'Empagliflozina', class: 'Diabetes', form: 'Tableta', presentations: ['10mg x 30 tabs', '25mg x 30 tabs'], price: 58.30 },

  // Gastroenterología (4)
  { name: 'Omeprazol 20mg', molecule: 'Omeprazol', class: 'Gastroenterología', form: 'Cápsula', presentations: ['20mg x 14 caps', '20mg x 28 caps', '40mg x 14 caps'], price: 13.50 },
  { name: 'Pantoprazol 40mg', molecule: 'Pantoprazol sódico', class: 'Gastroenterología', form: 'Tableta', presentations: ['20mg x 28 tabs', '40mg x 28 tabs'], price: 15.80 },
  { name: 'Metoclopramida 10mg', molecule: 'Metoclopramida clorhidrato', class: 'Gastroenterología', form: 'Tableta', presentations: ['10mg x 30 tabs', '10mg/2mL ampollas x 6'], price: 8.20 },
  { name: 'Domperidona 10mg', molecule: 'Domperidona maleato', class: 'Gastroenterología', form: 'Tableta', presentations: ['10mg x 30 tabs'], price: 10.40 },

  // Dolor / Analgésicos (5)
  { name: 'Ibuprofeno 400mg', molecule: 'Ibuprofeno', class: 'Dolor', form: 'Tableta', presentations: ['200mg x 24 tabs', '400mg x 24 tabs', '600mg x 20 tabs'], price: 7.60 },
  { name: 'Ketorolaco 10mg', molecule: 'Ketorolaco trometamina', class: 'Dolor', form: 'Tableta', presentations: ['10mg x 20 tabs', '30mg/mL x 10 ampollas'], price: 12.10 },
  { name: 'Diclofenaco 50mg', molecule: 'Diclofenaco sódico', class: 'Dolor', form: 'Tableta', presentations: ['25mg x 30 tabs', '50mg x 30 tabs', '75mg/3mL x 5 ampollas'], price: 9.30 },
  { name: 'Tramadol 50mg', molecule: 'Tramadol clorhidrato', class: 'Dolor', form: 'Cápsula', presentations: ['50mg x 20 caps', '100mg x 10 caps'], price: 16.80 },
  { name: 'Celecoxib 200mg', molecule: 'Celecoxib', class: 'Dolor', form: 'Cápsula', presentations: ['100mg x 20 caps', '200mg x 20 caps'], price: 24.50 },

  // Antibióticos (5)
  { name: 'Amoxicilina 500mg', molecule: 'Amoxicilina trihidrato', class: 'Antibióticos', form: 'Cápsula', presentations: ['250mg x 21 caps', '500mg x 21 caps', '875mg x 14 tabs'], price: 11.20 },
  { name: 'Azitromicina 500mg', molecule: 'Azitromicina', class: 'Antibióticos', form: 'Tableta', presentations: ['250mg x 6 tabs', '500mg x 3 tabs'], price: 14.90 },
  { name: 'Ciprofloxacino 500mg', molecule: 'Ciprofloxacino clorhidrato', class: 'Antibióticos', form: 'Tableta', presentations: ['250mg x 14 tabs', '500mg x 14 tabs'], price: 17.30 },
  { name: 'Claritromicina 500mg', molecule: 'Claritromicina', class: 'Antibióticos', form: 'Tableta', presentations: ['250mg x 14 tabs', '500mg x 14 tabs'], price: 19.60 },
  { name: 'Cefalexina 500mg', molecule: 'Cefalexina', class: 'Antibióticos', form: 'Cápsula', presentations: ['250mg x 20 caps', '500mg x 20 caps'], price: 13.70 },

  // Respiratorio (4)
  { name: 'Salbutamol 100mcg', molecule: 'Salbutamol sulfato', class: 'Respiratorio', form: 'Inhalador', presentations: ['100mcg x 200 dosis MDI', 'Solución para nebulizar 0.5% x 10mL'], price: 22.40 },
  { name: 'Montelukast 10mg', molecule: 'Montelukast sódico', class: 'Respiratorio', form: 'Tableta', presentations: ['4mg masticable x 28', '5mg masticable x 28', '10mg x 28 tabs'], price: 28.70 },
  { name: 'Budesonida 200mcg', molecule: 'Budesonida', class: 'Respiratorio', form: 'Inhalador', presentations: ['100mcg x 200 dosis', '200mcg x 100 dosis'], price: 34.50 },
  { name: 'Loratadina 10mg', molecule: 'Loratadina', class: 'Respiratorio', form: 'Tableta', presentations: ['10mg x 10 tabs', '10mg x 30 tabs', '5mg/5mL jarabe x 100mL'], price: 8.90 },

  // Neurología (2)
  { name: 'Gabapentina 300mg', molecule: 'Gabapentina', class: 'Neurología', form: 'Cápsula', presentations: ['100mg x 30 caps', '300mg x 30 caps', '400mg x 30 caps'], price: 26.80 },
  { name: 'Sertralina 50mg', molecule: 'Sertralina clorhidrato', class: 'Neurología', form: 'Tableta', presentations: ['25mg x 30 tabs', '50mg x 30 tabs', '100mg x 30 tabs'], price: 21.40 },

  // Dermatología (2)
  { name: 'Betametasona 0.05%', molecule: 'Betametasona valerato', class: 'Dermatología', form: 'Crema', presentations: ['0.05% crema x 30g', '0.1% crema x 30g'], price: 9.60 },
  { name: 'Ketoconazol 2%', molecule: 'Ketoconazol', class: 'Dermatología', form: 'Crema', presentations: ['2% crema x 30g', '2% shampoo x 120mL'], price: 11.80 },
]

// ── PHARMACIES DATA ──────────────────────────────────────────────────────────

const PHARMACIES = [
  // Panama City (10)
  { name: 'Farmacia Central Bella Vista', type: 'RETAIL', tier: 'PREMIUM', address: 'Av. Balboa y Calle 39, Bella Vista', region: 'Panama City', province: 'Panamá', lat: 8.9924, lng: -79.5199 },
  { name: 'Farmacia El Rey San Francisco', type: 'CHAIN', tier: 'PREMIUM', address: 'Av. Via España, San Francisco', region: 'Panama City', province: 'Panamá', lat: 9.0137, lng: -79.5058 },
  { name: 'Hospital Nacional - Farmacia', type: 'HOSPITAL', tier: 'PREMIUM', address: 'Av. Cuba y Calle 38 Este, La Exposición', region: 'Panama City', province: 'Panamá', lat: 8.9964, lng: -79.5285 },
  { name: 'Farmacia Metro Albrook', type: 'CHAIN', tier: 'STANDARD', address: 'Terminal Albrook, Curundu', region: 'Panama City', province: 'Panamá', lat: 8.9933, lng: -79.5597 },
  { name: 'Farmacia Arrocha Paitilla', type: 'CHAIN', tier: 'PREMIUM', address: 'Av. Balboa, Paitilla', region: 'Panama City', province: 'Panamá', lat: 8.9880, lng: -79.5138 },
  { name: 'Clínica San Fernando - Farmacia', type: 'CLINIC', tier: 'PREMIUM', address: 'Via España, El Cangrejo', region: 'Panama City', province: 'Panamá', lat: 9.0102, lng: -79.5186 },
  { name: 'Farmacia Don Bosco', type: 'RETAIL', tier: 'STANDARD', address: 'Calle Don Bosco, La Exposición', region: 'Panama City', province: 'Panamá', lat: 8.9942, lng: -79.5323 },
  { name: 'Farmacia Panamá Viejo', type: 'RETAIL', tier: 'BASIC', address: 'Vía Cincuentenario, Panamá Viejo', region: 'Panama City', province: 'Panamá', lat: 9.0037, lng: -79.4814 },
  { name: 'Farmacia Condado del Rey', type: 'CHAIN', tier: 'STANDARD', address: 'Centro Comercial Condado del Rey', region: 'Panama City', province: 'Panamá', lat: 9.0528, lng: -79.4748 },
  { name: 'Hospital Santo Tomás - Farmacia', type: 'HOSPITAL', tier: 'PREMIUM', address: 'Av. Balboa, Ancón', region: 'Panama City', province: 'Panamá', lat: 8.9942, lng: -79.5481 },
  // Colón (3)
  { name: 'Farmacia Popular Colón', type: 'RETAIL', tier: 'STANDARD', address: 'Calle 6 y Av. Amador Guerrero, Colón', region: 'Colón', province: 'Colón', lat: 9.3562, lng: -79.9005 },
  { name: 'Farmacia Central Colón', type: 'CHAIN', tier: 'STANDARD', address: 'Av. Central, Colón', region: 'Colón', province: 'Colón', lat: 9.3589, lng: -79.9017 },
  { name: 'Hospital Manuel Amador - Farmacia', type: 'HOSPITAL', tier: 'PREMIUM', address: 'Calle del Hospital, Colón', region: 'Colón', province: 'Colón', lat: 9.3541, lng: -79.8982 },
  // David (3)
  { name: 'Farmacia La Económica David', type: 'RETAIL', tier: 'STANDARD', address: 'Av. Obaldia, David', region: 'David', province: 'Chiriquí', lat: 8.4288, lng: -82.4330 },
  { name: 'Hospital de Chiriquí - Farmacia', type: 'HOSPITAL', tier: 'PREMIUM', address: 'Calle Central, David', region: 'David', province: 'Chiriquí', lat: 8.4310, lng: -82.4297 },
  { name: 'Farmacia San José David', type: 'RETAIL', tier: 'BASIC', address: 'Calle 6, David', region: 'David', province: 'Chiriquí', lat: 8.4265, lng: -82.4360 },
  // Santiago (2)
  { name: 'Farmacia Santiago Centro', type: 'RETAIL', tier: 'STANDARD', address: 'Av. Central, Santiago', region: 'Santiago', province: 'Veraguas', lat: 8.0974, lng: -80.9863 },
  { name: 'Hospital Louis Cobo - Farmacia', type: 'HOSPITAL', tier: 'STANDARD', address: 'Calle Hospital, Santiago', region: 'Santiago', province: 'Veraguas', lat: 8.0998, lng: -80.9841 },
  // Chitré (2)
  { name: 'Farmacia El Buen Precio Chitré', type: 'RETAIL', tier: 'BASIC', address: 'Av. Pérez, Chitré', region: 'Chitré', province: 'Herrera', lat: 7.9644, lng: -80.4396 },
  { name: 'Hospital Cecilio Castillero - Farmacia', type: 'HOSPITAL', tier: 'STANDARD', address: 'Calle de la Guardia, Chitré', region: 'Chitré', province: 'Herrera', lat: 7.9667, lng: -80.4372 },
]

// ── SELLERS DATA ─────────────────────────────────────────────────────────────

const SELLERS_DATA = [
  { name: 'Carlos Rodríguez', email: 'carlos.vendedor@vistara.com', code: 'V001', region: 'Panama City', territory: 'Panama City Norte', target_m: 18000, target_q: 54000 },
  { name: 'María González', email: 'maria.vendedor@vistara.com', code: 'V002', region: 'Panama City', territory: 'Panama City Sur', target_m: 20000, target_q: 60000 },
  { name: 'Roberto Sánchez', email: 'roberto.vendedor@vistara.com', code: 'V003', region: 'Colón', territory: 'Colón y Atlántico', target_m: 12000, target_q: 36000 },
  { name: 'Ana Martínez', email: 'ana.vendedor@vistara.com', code: 'V004', region: 'David', territory: 'Chiriquí Occidental', target_m: 14000, target_q: 42000 },
  { name: 'Luis Herrera', email: 'luis.vendedor@vistara.com', code: 'V005', region: 'Santiago', territory: 'Veraguas y Herrera', target_m: 10000, target_q: 30000 },
  { name: 'Carmen Flores', email: 'carmen.vendedor@vistara.com', code: 'V006', region: 'Panama City', territory: 'Panama City Centro', target_m: 22000, target_q: 66000 },
]

async function loadEnv() {
  const { config } = await import('dotenv')
  config({ path: '.env.local' })
}

async function main() {
  await loadEnv()
  console.log('🌱 Seeding Vistara V2 database...\n')

  // ── USERS ──────────────────────────────────────────────────────────────────
  console.log('Creating users...')
  const passwordHash = await bcrypt.hash('demo2026', 10)

  const usersToInsert = [
    { email: 'admin@vistara.com', name: 'Admin Vistara', role: 'ADMIN', password_hash: passwordHash },
    { email: 'gerente@vistara.com', name: 'Jorge Méndez', role: 'MANAGER', password_hash: passwordHash },
    { email: 'vendedor@vistara.com', name: 'Carlos Rodríguez', role: 'SELLER', password_hash: passwordHash },
    ...SELLERS_DATA.slice(1).map(s => ({
      email: s.email,
      name: s.name,
      role: 'SELLER' as const,
      password_hash: passwordHash,
    }))
  ]

  const { data: users, error: usersError } = await supabase
    .from('users')
    .insert(usersToInsert)
    .select()

  if (usersError) {
    console.error('Users error:', usersError.message)
    process.exit(1)
  }
  console.log(`  ✓ ${users.length} users created`)

  // ── PRODUCTS ───────────────────────────────────────────────────────────────
  console.log('Creating products...')
  const productsToInsert = PRODUCTS.map(p => ({
    name: p.name,
    molecule: p.molecule,
    therapeutic_class: p.class,
    dosage_form: p.form,
    presentations: p.presentations,
    regulatory_status: 'ACTIVE',
    indications: `Indicado para el tratamiento de condiciones relacionadas con ${p.class.toLowerCase()}.`,
    contraindications: `Contraindicado en pacientes con hipersensibilidad a ${p.molecule}.`,
    interactions: `Puede interactuar con otros medicamentos del grupo ${p.class}.`,
    clinical_summary: `${p.name} (${p.molecule}) es un medicamento de la clase ${p.class}. Disponible en ${p.presentations.join(', ')}.`,
  }))

  const { data: products, error: productsError } = await supabase
    .from('products')
    .insert(productsToInsert)
    .select()

  if (productsError) {
    console.error('Products error:', productsError.message)
    process.exit(1)
  }
  console.log(`  ✓ ${products.length} products created`)

  // ── PHARMACIES ─────────────────────────────────────────────────────────────
  console.log('Creating pharmacies...')
  const pharmaciesToInsert = PHARMACIES.map(p => ({
    name: p.name,
    type: p.type,
    tier: p.tier,
    address: p.address,
    region: p.region,
    province: p.province,
    latitude: p.lat,
    longitude: p.lng,
    contact_name: `Director ${p.name.split(' ')[1]}`,
    contact_phone: `+507 6${rand(100, 999)}-${rand(1000, 9999)}`,
    contact_email: `farmacia@${p.name.toLowerCase().replace(/\s+/g, '').slice(0, 10)}.com`,
    operating_hours: 'Lun-Vie 8am-6pm, Sáb 9am-2pm',
    status: 'ACTIVE',
  }))

  const { data: pharmacies, error: pharmaciesError } = await supabase
    .from('pharmacies')
    .insert(pharmaciesToInsert)
    .select()

  if (pharmaciesError) {
    console.error('Pharmacies error:', pharmaciesError.message)
    process.exit(1)
  }
  console.log(`  ✓ ${pharmacies.length} pharmacies created`)

  // ── SELLERS ────────────────────────────────────────────────────────────────
  console.log('Creating sellers...')
  const sellerUsers = users.filter(u => u.role === 'SELLER')
  const sellersToInsert = SELLERS_DATA.map((s, i) => ({
    user_id: sellerUsers[i].id,
    employee_code: s.code,
    region: s.region,
    territory: s.territory,
    target_monthly: s.target_m,
    target_quarterly: s.target_q,
    hire_date: `${2020 + (i % 4)}-0${(i % 9) + 1}-15`,
    status: 'ACTIVE',
  }))

  const { data: sellers, error: sellersError } = await supabase
    .from('sellers')
    .insert(sellersToInsert)
    .select()

  if (sellersError) {
    console.error('Sellers error:', sellersError.message)
    process.exit(1)
  }
  console.log(`  ✓ ${sellers.length} sellers created`)

  // ── SELLER PHARMACY ASSIGNMENTS ────────────────────────────────────────────
  console.log('Assigning pharmacies to sellers...')
  const assignments: { seller_id: string, pharmacy_id: string }[] = []

  // Panama City sellers (V001, V002, V006) → Panama City pharmacies (0-9)
  const pcPharmacies = pharmacies.slice(0, 10)
  const pcSellers = sellers.filter(s => s.region === 'Panama City')
  pcPharmacies.forEach((ph, i) => {
    assignments.push({ seller_id: pcSellers[i % pcSellers.length].id, pharmacy_id: ph.id })
  })

  // Colón seller (V003) → Colón pharmacies (10-12)
  const colonSeller = sellers.find(s => s.region === 'Colón')!
  pharmacies.slice(10, 13).forEach(ph => {
    assignments.push({ seller_id: colonSeller.id, pharmacy_id: ph.id })
  })

  // David seller (V004) → David pharmacies (13-15)
  const davidSeller = sellers.find(s => s.region === 'David')!
  pharmacies.slice(13, 16).forEach(ph => {
    assignments.push({ seller_id: davidSeller.id, pharmacy_id: ph.id })
  })

  // Santiago/Herrera seller (V005) → Santiago + Chitré pharmacies (16-19)
  const santiagoSeller = sellers.find(s => s.region === 'Santiago')!
  pharmacies.slice(16, 20).forEach(ph => {
    assignments.push({ seller_id: santiagoSeller.id, pharmacy_id: ph.id })
  })

  await supabase.from('seller_pharmacies').insert(assignments)
  console.log(`  ✓ ${assignments.length} pharmacy assignments created`)

  // ── STOCK ──────────────────────────────────────────────────────────────────
  console.log('Creating stock entries...')
  const stockEntries: object[] = []

  // Base prices per product (index → price)
  const productPrices = PRODUCTS.map(p => p.price)

  for (const pharmacy of pharmacies) {
    for (let pi = 0; pi < products.length; pi++) {
      const product = products[pi]
      // Some pharmacies carry fewer products
      if (pharmacy.tier === 'BASIC' && Math.random() < 0.3) continue

      // Vary stock by product type and pharmacy tier
      let baseQty = 0
      if (pharmacy.tier === 'PREMIUM') baseQty = rand(30, 300)
      else if (pharmacy.tier === 'STANDARD') baseQty = rand(10, 150)
      else baseQty = rand(0, 60)

      // Make some deliberately low/critical
      if (Math.random() < 0.1) baseQty = rand(0, 8)
      if (Math.random() < 0.05) baseQty = 0

      const minThreshold = pick([5, 10, 15, 20])
      stockEntries.push({
        product_id: product.id,
        pharmacy_id: pharmacy.id,
        quantity: baseQty,
        level: stockLevel(baseQty, minThreshold),
        min_threshold: minThreshold,
        last_updated: new Date(Date.now() - rand(0, 7) * 86400000).toISOString(),
      })
    }
  }

  // Insert in batches of 200
  for (let i = 0; i < stockEntries.length; i += 200) {
    const { error } = await supabase.from('stock').insert(stockEntries.slice(i, i + 200))
    if (error) { console.error('Stock error:', error.message); process.exit(1) }
  }
  console.log(`  ✓ ${stockEntries.length} stock entries created`)

  // ── SALES ──────────────────────────────────────────────────────────────────
  console.log('Creating sales data (6 months)...')
  const salesEntries: object[] = []
  const dates = dateRange('2025-01-01', '2025-06-30')

  // Monthly growth factor (Jan=1.0, Jun=1.4)
  const monthGrowth: Record<string, number> = {
    '2025-01': 1.0, '2025-02': 1.05, '2025-03': 1.12,
    '2025-04': 1.18, '2025-05': 1.28, '2025-06': 1.38
  }

  for (const date of dates) {
    const dow = new Date(date).getDay() // 0=Sun
    const isWeekend = dow === 0 || dow === 6
    const monthKey = date.slice(0, 7)
    const growth = monthGrowth[monthKey] || 1.0

    // Each pharmacy makes ~3-6 sales per day
    for (const pharmacy of pharmacies.slice(0, 10)) { // Top 10 pharmacies more active
      const numSales = isWeekend ? rand(1, 3) : rand(2, 5)
      for (let s = 0; s < numSales; s++) {
        const product = products[rand(0, products.length - 1)]
        const pi = products.findIndex(p => p.id === product.id)
        const basePrice = productPrices[pi] || 15
        const qty = rand(1, 8)
        const revenue = parseFloat((qty * basePrice * growth * randFloat(0.9, 1.1)).toFixed(2))
        const sellerAssignment = assignments.find(a => a.pharmacy_id === pharmacy.id)
        if (!sellerAssignment) continue

        salesEntries.push({
          product_id: product.id,
          pharmacy_id: pharmacy.id,
          seller_id: sellerAssignment.seller_id,
          quantity: qty,
          revenue,
          date,
          order_type: Math.random() < 0.1 ? 'URGENTE' : 'REGULAR',
        })
      }
    }

    // Smaller pharmacies get fewer sales
    for (const pharmacy of pharmacies.slice(10)) {
      if (isWeekend && Math.random() < 0.5) continue
      const product = products[rand(0, products.length - 1)]
      const pi = products.findIndex(p => p.id === product.id)
      const basePrice = productPrices[pi] || 15
      const qty = rand(1, 4)
      const revenue = parseFloat((qty * basePrice * growth).toFixed(2))
      const sellerAssignment = assignments.find(a => a.pharmacy_id === pharmacy.id)
      if (!sellerAssignment) continue

      salesEntries.push({
        product_id: product.id,
        pharmacy_id: pharmacy.id,
        seller_id: sellerAssignment.seller_id,
        quantity: qty,
        revenue,
        date,
        order_type: 'REGULAR',
      })
    }
  }

  // Insert in batches of 500
  for (let i = 0; i < salesEntries.length; i += 500) {
    const { error } = await supabase.from('sales').insert(salesEntries.slice(i, i + 500))
    if (error) { console.error('Sales error:', error.message); process.exit(1) }
  }
  console.log(`  ✓ ${salesEntries.length} sales entries created`)

  // ── VISIT LOGS ─────────────────────────────────────────────────────────────
  console.log('Creating visit logs...')
  const visitLogs: object[] = []
  const visitDates = dateRange('2025-01-01', '2025-06-30')
  const outcomes = ['Pedido realizado', 'Seguimiento necesario', 'Demostración realizada', 'Revisión de inventario', 'Captación de nuevo contacto']

  for (const seller of sellers) {
    const sellerPharmacies = assignments.filter(a => a.seller_id === seller.id)
    for (const month of ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06']) {
      const monthDates = visitDates.filter(d => d.startsWith(month) && new Date(d).getDay() !== 0 && new Date(d).getDay() !== 6)
      // ~12-15 visits per seller per month
      const numVisits = rand(10, 15)
      for (let v = 0; v < numVisits; v++) {
        const assignment = pick(sellerPharmacies)
        if (!assignment) continue
        visitLogs.push({
          seller_id: seller.id,
          pharmacy_id: assignment.pharmacy_id,
          visit_date: pick(monthDates),
          notes: `Visita de seguimiento. ${pick(outcomes)}.`,
          outcome: pick(outcomes),
        })
      }
    }
  }

  await supabase.from('visit_logs').insert(visitLogs)
  console.log(`  ✓ ${visitLogs.length} visit logs created`)

  console.log('\n✅ Seed complete!')
  console.log('\n📋 Demo accounts (password: demo2026):')
  console.log('  Admin:   admin@vistara.com')
  console.log('  Manager: gerente@vistara.com')
  console.log('  Seller:  vendedor@vistara.com')
}

main().catch(console.error)
