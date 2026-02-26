// ─── MOCK DATA for V2 tables not yet migrated ────────────────────────────────
// Used by pharmacies, stock, sales queries as fallback until DB migration runs.

export const MOCK_PHARMACIES = [
  { id:'ph-001', name:'Farmacias Arrocha — Vía España', type:'CHAIN', address:'Vía España, Ciudad de Panamá', region:'Ciudad de Panamá', province:'Panamá', latitude:8.9936, longitude:-79.5197, tier:'PREMIUM', status:'ACTIVE', contact_name:'Ana Ruiz', contact_phone:'+507 6700-1010', stock:[{level:'BAJO'},{level:'RUPTURA'}] },
  { id:'ph-002', name:'Farmacias Metro — Multiplaza', type:'CHAIN', address:'Multiplaza Pacific, Punta Pacífica', region:'Ciudad de Panamá', province:'Panamá', latitude:8.9918, longitude:-79.5163, tier:'PREMIUM', status:'ACTIVE', contact_name:'Pedro Ríos', contact_phone:'+507 6700-1011', stock:[{level:'ALTO'},{level:'MEDIO'}] },
  { id:'ph-003', name:'Hospital Nacional Farmacia', type:'HOSPITAL', address:'Calle 39, Justo Arosemena', region:'Ciudad de Panamá', province:'Panamá', latitude:8.9969, longitude:-79.5182, tier:'PREMIUM', status:'ACTIVE', contact_name:'Dr. Herrera', contact_phone:'+507 6700-1012', stock:[{level:'ALTO'},{level:'ALTO'}] },
  { id:'ph-004', name:'Clínica San Fernando Farmacia', type:'CLINIC', address:'Tumba Muerto, Ciudad de Panamá', region:'Ciudad de Panamá', province:'Panamá', latitude:9.0028, longitude:-79.5215, tier:'PREMIUM', status:'ACTIVE', contact_name:'Lic. Castro', contact_phone:'+507 6700-1013', stock:[{level:'MEDIO'},{level:'MEDIO'}] },
  { id:'ph-005', name:'Farmacia Bella Vista', type:'RETAIL', address:'Ave. Balboa, Bella Vista', region:'Ciudad de Panamá', province:'Panamá', latitude:8.9869, longitude:-79.5150, tier:'STANDARD', status:'ACTIVE', contact_name:'Rosa León', contact_phone:'+507 6700-1014', stock:[{level:'RUPTURA'},{level:'BAJO'}] },
  { id:'ph-006', name:'Farmacias Arrocha — Albrook', type:'CHAIN', address:'Albrook Mall, Panamá', region:'Ciudad de Panamá', province:'Panamá', latitude:8.9738, longitude:-79.5541, tier:'PREMIUM', status:'ACTIVE', contact_name:'Luis Mora', contact_phone:'+507 6700-1015', stock:[{level:'ALTO'},{level:'MEDIO'}] },
  { id:'ph-007', name:'Hospital Chiriquí Farmacia', type:'HOSPITAL', address:'Calle Central, David', region:'Chiriquí', province:'Chiriquí', latitude:8.4003, longitude:-82.4310, tier:'PREMIUM', status:'ACTIVE', contact_name:'Dr. Bravo', contact_phone:'+507 6700-1016', stock:[{level:'ALTO'},{level:'BAJO'}] },
  { id:'ph-008', name:'Farmacia Popular David', type:'RETAIL', address:'Ave. Estudiante, David', region:'Chiriquí', province:'Chiriquí', latitude:8.4011, longitude:-82.4297, tier:'STANDARD', status:'ACTIVE', contact_name:'Carmen Díaz', contact_phone:'+507 6700-1017', stock:[{level:'MEDIO'},{level:'MEDIO'}] },
  { id:'ph-009', name:'Farmacias Rey — Boquete', type:'CHAIN', address:'Boquete, Chiriquí', region:'Chiriquí', province:'Chiriquí', latitude:8.7785, longitude:-82.4407, tier:'STANDARD', status:'ACTIVE', contact_name:'Mario Solís', contact_phone:'+507 6700-1018', stock:[{level:'RUPTURA'}] },
  { id:'ph-010', name:'Hospital Rafael Hernández', type:'HOSPITAL', address:'David, Chiriquí', region:'Chiriquí', province:'Chiriquí', latitude:8.3998, longitude:-82.4325, tier:'PREMIUM', status:'ACTIVE', contact_name:'Dra. Vargas', contact_phone:'+507 6700-1019', stock:[{level:'ALTO'},{level:'ALTO'}] },
  { id:'ph-011', name:'Farmacia Colón Centro', type:'RETAIL', address:'Calle 7, Colón', region:'Colón', province:'Colón', latitude:9.3593, longitude:-79.9027, tier:'STANDARD', status:'ACTIVE', contact_name:'Héctor Pinto', contact_phone:'+507 6700-1020', stock:[{level:'BAJO'},{level:'RUPTURA'}] },
  { id:'ph-012', name:'Hospital Manuel A. Guerrero', type:'HOSPITAL', address:'Colón centro', region:'Colón', province:'Colón', latitude:9.3564, longitude:-79.9003, tier:'PREMIUM', status:'ACTIVE', contact_name:'Dr. Montoya', contact_phone:'+507 6700-1021', stock:[{level:'ALTO'},{level:'MEDIO'}] },
  { id:'ph-013', name:'Farmacia La Economía', type:'RETAIL', address:'La Chorrera, Panamá Oeste', region:'Panamá Oeste', province:'Panamá Oeste', latitude:8.8797, longitude:-79.7821, tier:'STANDARD', status:'ACTIVE', contact_name:'Alicia Cruz', contact_phone:'+507 6700-1022', stock:[{level:'MEDIO'}] },
  { id:'ph-014', name:'Hospital Nicolás Solano', type:'HOSPITAL', address:'La Chorrera', region:'Panamá Oeste', province:'Panamá Oeste', latitude:8.8756, longitude:-79.7800, tier:'PREMIUM', status:'ACTIVE', contact_name:'Dr. Campos', contact_phone:'+507 6700-1023', stock:[{level:'ALTO'},{level:'ALTO'}] },
  { id:'ph-015', name:'Farmacias Arrocha — La Chorrera', type:'CHAIN', address:'Super 99 La Chorrera', region:'Panamá Oeste', province:'Panamá Oeste', latitude:8.8821, longitude:-79.7843, tier:'STANDARD', status:'ACTIVE', contact_name:'Roberto Arias', contact_phone:'+507 6700-1024', stock:[{level:'MEDIO'},{level:'BAJO'}] },
]

// V1 product full UUIDs from the real DB
const P_IDS = [
  '8f0b7107-3f3f-40f5-9853-b8148d6b59b7', // Amlodipino 5mg
  '65bc5864-0cca-4ea5-b059-6a3886567193', // Atorvastatina 40mg
  '7210636d-8f7e-487b-9177-0900c9f2b908', // Empagliflozina 10mg
  '959e7364-5cbd-429f-b950-b4d853574625', // Enalapril 10mg
  'c3e794b5-55c2-4987-8562-ce96b25a686d', // Losartán 50mg
  'b8c68e7c-ba5b-4f5c-b93b-4909435424e6', // Metformina 850mg
  'dd05c646-a61c-497e-930f-2e05f5a641c7', // Omeprazol 20mg
  '51f6848f-82fa-47b5-8e3c-6d25340e317a', // Pantoprazol 40mg
  '94b6a536-d35f-4310-846f-ff154ffa08a0', // Rosuvastatina 20mg
  '540f2c9d-c5b5-4a50-af5b-969dd05fabdc', // Sitagliptina 100mg
]
const P_NAMES: Record<string, string> = {
  '8f0b7107-3f3f-40f5-9853-b8148d6b59b7': 'Amlodipino 5mg',
  '65bc5864-0cca-4ea5-b059-6a3886567193': 'Atorvastatina 40mg',
  '7210636d-8f7e-487b-9177-0900c9f2b908': 'Empagliflozina 10mg',
  '959e7364-5cbd-429f-b950-b4d853574625': 'Enalapril 10mg',
  'c3e794b5-55c2-4987-8562-ce96b25a686d': 'Losartán 50mg',
  'b8c68e7c-ba5b-4f5c-b93b-4909435424e6': 'Metformina 850mg',
  'dd05c646-a61c-497e-930f-2e05f5a641c7': 'Omeprazol 20mg',
  '51f6848f-82fa-47b5-8e3c-6d25340e317a': 'Pantoprazol 40mg',
  '94b6a536-d35f-4310-846f-ff154ffa08a0': 'Rosuvastatina 20mg',
  '540f2c9d-c5b5-4a50-af5b-969dd05fabdc': 'Sitagliptina 100mg',
}
const PRICES: Record<string, number> = {
  '8f0b7107-3f3f-40f5-9853-b8148d6b59b7': 58,
  '65bc5864-0cca-4ea5-b059-6a3886567193': 85,
  '7210636d-8f7e-487b-9177-0900c9f2b908': 130,
  '959e7364-5cbd-429f-b950-b4d853574625': 55,
  'c3e794b5-55c2-4987-8562-ce96b25a686d': 62,
  'b8c68e7c-ba5b-4f5c-b93b-4909435424e6': 45,
  'dd05c646-a61c-497e-930f-2e05f5a641c7': 32,
  '51f6848f-82fa-47b5-8e3c-6d25340e317a': 38,
  '94b6a536-d35f-4310-846f-ff154ffa08a0': 92,
  '540f2c9d-c5b5-4a50-af5b-969dd05fabdc': 145,
}
const LEVELS = ['ALTO','ALTO','MEDIO','MEDIO','BAJO','RUPTURA'] as const
type Level = typeof LEVELS[number]

// Deterministic pseudo-random
function seededRand(seed: number) { return ((seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff }

// ── STOCK per product_id ──────────────────────────────────────────────────────
export const MOCK_STOCK_BY_PRODUCT: Record<string, { id: string; product_id: string; pharmacy_id: string; quantity: number; level: Level; min_threshold: number; last_updated: string }[]> = {}

P_IDS.forEach((pid, pi) => {
  MOCK_STOCK_BY_PRODUCT[pid] = MOCK_PHARMACIES.slice(0, 10).map((ph, phi) => {
    const seed = pi * 17 + phi * 31
    const qty = Math.floor(seededRand(seed) * 120) + 5
    const levelIdx = Math.floor(seededRand(seed + 1) * LEVELS.length)
    return {
      id: `stk-${pid.slice(0,4)}-${ph.id}`,
      product_id: pid,
      pharmacy_id: ph.id,
      quantity: qty,
      level: LEVELS[levelIdx],
      min_threshold: 10,
      last_updated: '2025-06-28T10:00:00Z',
    }
  })
})

// ── SALES (6 months, 4 sellers × 15 pharmacies × 10 products × ~monthly) ─────
export const MOCK_SALES: {
  id: string; product_id: string; product_name: string; pharmacy_id: string;
  pharmacy_name: string; pharmacy_region: string; seller_id: string;
  quantity: number; revenue: number; date: string;
}[] = []

const SELLER_IDS = ['s-v1-1','s-v1-2','s-v1-3','s-v1-4']
const SELLER_NAMES: Record<string, string> = {
  's-v1-1':'Ana García','s-v1-2':'Carlos Mendoza','s-v1-3':'Luis Rodríguez','s-v1-4':'Sofía Torres',
}
export const SELLER_EMAILS: Record<string, string> = {
  's-v1-1':'ana.garcia@vistara-demo.com',
  's-v1-2':'carlos.rep@vistara-demo.com',
  's-v1-3':'luis.rodriguez@vistara-demo.com',
  's-v1-4':'sofia.torres@vistara-demo.com',
}
const PH_SELLER: Record<string, string> = {
  'ph-001':'s-v1-1','ph-002':'s-v1-1','ph-003':'s-v1-1','ph-004':'s-v1-1','ph-005':'s-v1-1','ph-006':'s-v1-1',
  'ph-007':'s-v1-3','ph-008':'s-v1-3','ph-009':'s-v1-3','ph-010':'s-v1-3',
  'ph-011':'s-v1-4','ph-012':'s-v1-4',
  'ph-013':'s-v1-2','ph-014':'s-v1-2','ph-015':'s-v1-2',
}

let saleIdx = 0
for (let m = 1; m <= 6; m++) {
  for (const ph of MOCK_PHARMACIES) {
    const sellerId = PH_SELLER[ph.id] ?? 's-v1-1'
    for (const pid of P_IDS.slice(0, 7)) {
      const seed = saleIdx * 13 + m * 7
      const qty = Math.floor(seededRand(seed) * 25) + 5
      const price = PRICES[pid] ?? 60
      const day = Math.floor(seededRand(seed + 2) * 28) + 1
      MOCK_SALES.push({
        id: `sale-${++saleIdx}`,
        product_id: pid,
        product_name: P_NAMES[pid] ?? '',
        pharmacy_id: ph.id,
        pharmacy_name: ph.name,
        pharmacy_region: ph.region,
        seller_id: sellerId,
        quantity: qty,
        revenue: qty * price,
        date: `2025-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`,
      })
    }
  }
}

// ── STOCK ALERTS (BAJO + RUPTURA entries) ────────────────────────────────────
export const MOCK_STOCK_ALERTS = MOCK_PHARMACIES.flatMap((ph, phi) =>
  P_IDS.slice(0, 8).flatMap((pid, pi) => {
    const seed = (phi + 1) * 37 + pi * 13
    const level = seededRand(seed) < 0.18 ? 'RUPTURA' : seededRand(seed + 1) < 0.25 ? 'BAJO' : null
    if (!level) return []
    return [{
      id: `stk-alert-${ph.id}-${pid.slice(0,4)}`,
      quantity: level === 'RUPTURA' ? 0 : Math.floor(seededRand(seed + 2) * 8) + 1,
      level: level as Level,
      min_threshold: 10,
      last_updated: '2025-06-28T10:00:00Z',
      product: { id: pid, name: P_NAMES[pid] ?? '', molecule: '', therapeutic_class: '' },
      pharmacy: { id: ph.id, name: ph.name, region: ph.region, province: ph.province },
    }]
  })
).sort((a, b) => (b.level === 'RUPTURA' ? 1 : 0) - (a.level === 'RUPTURA' ? 1 : 0))

// Export seller name lookup for analytics
export { SELLER_NAMES, SELLER_IDS, PH_SELLER, P_NAMES, PRICES }
