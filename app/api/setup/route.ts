import { NextRequest, NextResponse } from 'next/server'
import { Client } from 'pg'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const { password, action } = await req.json()
    if (!password) return NextResponse.json({ error: 'Password required' }, { status: 400 })

    const client = new Client({
      host: 'aws-0-us-east-1.pooler.supabase.com',
      port: 6543,
      database: 'postgres',
      user: 'postgres.wxqbapavtmqbrldvoxla',
      password,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 15000,
      query_timeout: 60000,
    })

    await client.connect()

    if (action === 'migrate') {
      const sql = fs.readFileSync(
        path.join(process.cwd(), 'supabase/migrations/001_v2_schema.sql'),
        'utf-8'
      )
      await client.query(sql)
      await client.end()
      return NextResponse.json({ ok: true, message: 'Migration complete ✅' })
    }

    if (action === 'seed') {
      // Run seed inline (bcrypt-hashed passwords)
      const seed = `
-- USERS
INSERT INTO users (id, email, name, password_hash, role) VALUES
  ('u-admin-001', 'admin@vistara.com', 'Admin Vistara', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'ADMIN'),
  ('u-mgr-001',   'gerente@vistara.com', 'Luis Gerente', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'MANAGER'),
  ('u-sel-001',   'vendedor@vistara.com', 'Carlos Vendedor', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'SELLER'),
  ('u-sel-002',   'maria@vistara.com', 'María López', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'SELLER'),
  ('u-sel-003',   'pedro@vistara.com', 'Pedro Gómez', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'SELLER'),
  ('u-sel-004',   'ana@vistara.com', 'Ana Torres', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'SELLER')
ON CONFLICT (id) DO NOTHING;

-- SELLERS
INSERT INTO sellers (id, user_id, employee_code, region, territory, target_monthly, target_quarterly, hire_date) VALUES
  ('s-001', 'u-sel-001', 'EMP-001', 'Ciudad de Panamá', 'Zona Norte', 45000, 135000, '2022-03-01'),
  ('s-002', 'u-sel-002', 'EMP-002', 'Panamá Oeste', 'Zona Oeste', 38000, 114000, '2021-07-15'),
  ('s-003', 'u-sel-003', 'EMP-003', 'Chiriquí', 'Zona Interior', 32000, 96000, '2023-01-10'),
  ('s-004', 'u-sel-004', 'EMP-004', 'Colón', 'Zona Atlántica', 28000, 84000, '2022-09-20')
ON CONFLICT (id) DO NOTHING;

-- PRODUCTS
INSERT INTO products (id, name, molecule, therapeutic_class, dosage_form, presentations, indications, contraindications, clinical_summary, regulatory_status) VALUES
  ('p-001', 'Cardivex 10mg', 'Atorvastatina', 'Cardiovascular', 'Tableta', ARRAY['30 tabletas','90 tabletas'], 'Hipercolesterolemia, prevención cardiovascular', 'Hepatopatía activa, embarazo', 'Reduce LDL hasta 50%. Estudio CARDIO-PAN 2023: 38% reducción eventos CV en 3 años.', 'ACTIVE'),
  ('p-002', 'Cardivex 20mg', 'Atorvastatina', 'Cardiovascular', 'Tableta', ARRAY['30 tabletas','90 tabletas'], 'Hipercolesterolemia severa', 'Hepatopatía activa, embarazo', 'Dosis alta: LDL -60%. Indicado cuando meta <70 mg/dL.', 'ACTIVE'),
  ('p-003', 'Gluconil 500mg', 'Metformina', 'Metabólico', 'Tableta', ARRAY['60 tabletas','120 tabletas'], 'Diabetes tipo 2, primera línea', 'Insuficiencia renal severa', 'HbA1c -1.5%. Guías ADA 2024: fármaco de primera elección.', 'ACTIVE'),
  ('p-004', 'Gluconil XR 750mg', 'Metformina', 'Metabólico', 'Tableta liberación prolongada', ARRAY['30 tabletas'], 'Diabetes tipo 2, mejor tolerancia GI', 'IFG <30 mL/min', 'Misma eficacia que IR, 40% menos eventos GI adversos.', 'ACTIVE'),
  ('p-005', 'Broncolix 200mg', 'Montelukast', 'Respiratorio', 'Tableta', ARRAY['30 tabletas'], 'Asma, rinitis alérgica', 'Hipersensibilidad conocida', 'Reduce exacerbaciones asmáticas 32% vs placebo. Aprobado FDA.', 'ACTIVE'),
  ('p-006', 'Broncolix Pediátrico', 'Montelukast', 'Respiratorio', 'Masticable', ARRAY['30 tabletas 5mg'], 'Asma pediátrico ≥2 años', 'Hipersensibilidad', 'Formulación pediátrica certificada. Sabor cereza.', 'ACTIVE'),
  ('p-007', 'Neurobex 25mg', 'Pregabalina', 'Neurológico', 'Cápsula', ARRAY['56 cápsulas'], 'Dolor neuropático, fibromialgia', 'Hipersensibilidad, embarazo', 'Reduce score dolor NRS 4.2 puntos. Meta-análisis 12 estudios.', 'ACTIVE'),
  ('p-008', 'Neurobex 75mg', 'Pregabalina', 'Neurológico', 'Cápsula', ARRAY['56 cápsulas'], 'Dolor neuropático severo, epilepsia', 'Hipersensibilidad, embarazo', 'Dosis mantenimiento para neuropatía diabética.', 'ACTIVE'),
  ('p-009', 'Artrozen 100mg', 'Celecoxib', 'Musculoesquelético', 'Cápsula', ARRAY['30 cápsulas','60 cápsulas'], 'Artritis, dolor agudo', 'Alergia sulfonamidas, post-CABG', '45% menos úlceras GI vs ibuprofeno. Perfil CV neutro.', 'ACTIVE'),
  ('p-010', 'Artrozen 200mg', 'Celecoxib', 'Musculoesquelético', 'Cápsula', ARRAY['30 cápsulas'], 'Osteoartritis, artritis reumatoide', 'Alergia sulfonamidas, post-CABG', 'Dosis máxima para AR. Compatible con AAS 75mg.', 'ACTIVE'),
  ('p-011', 'Gastromax 20mg', 'Omeprazol', 'Gastrointestinal', 'Cápsula', ARRAY['28 cápsulas','56 cápsulas'], 'ERGE, úlcera péptica, H. pylori', 'Uso con clopidogrel (relativo)', 'IBP de referencia. 92% cicatrización úlcera en 8 semanas.', 'ACTIVE'),
  ('p-012', 'Gastromax 40mg', 'Omeprazol', 'Gastrointestinal', 'Cápsula IV', ARRAY['Vial 40mg'], 'Síndrome Zollinger-Ellison, hospital', 'Uso con clopidogrel', 'Formulación EV para uso hospitalario exclusivo.', 'ACTIVE'),
  ('p-013', 'Dermovex Crema 1%', 'Betametasona', 'Dermatológico', 'Crema', ARRAY['30g','60g'], 'Dermatitis, psoriasis, eczema', 'Infecciones cutáneas, rosácea', 'Corticoide potente. Máx 2 semanas en áreas sensibles.', 'ACTIVE'),
  ('p-014', 'Ansionil 0.5mg', 'Alprazolam', 'Psiquiátrico', 'Tableta', ARRAY['30 tabletas'], 'Trastorno de ansiedad generalizada', 'Dep. SNC, embarazo, miastenia', 'Control estricto. Lista II sustancias controladas MINSA.', 'ACTIVE'),
  ('p-015', 'Hipertex 5mg', 'Amlodipino', 'Cardiovascular', 'Tableta', ARRAY['30 tabletas','90 tabletas'], 'HTA, angina estable', 'Hipersensibilidad dihidropiridinas', 'PA sistólica -10-15 mmHg. Sin interacción warfarina.', 'ACTIVE')
ON CONFLICT (id) DO NOTHING;

-- PHARMACIES
INSERT INTO pharmacies (id, name, type, address, region, province, latitude, longitude, tier) VALUES
  ('ph-001', 'Farmacias Arrocha - Vía España', 'CHAIN', 'Vía España, Ciudad de Panamá', 'Ciudad de Panamá', 'Panamá', 8.9936, -79.5197, 'PREMIUM'),
  ('ph-002', 'Farmacias Metro - Multiplaza', 'CHAIN', 'Multiplaza Pacific, Punta Pacífica', 'Ciudad de Panamá', 'Panamá', 8.9918, -79.5163, 'PREMIUM'),
  ('ph-003', 'Hospital Nacional', 'HOSPITAL', 'Calle 39 y Justo Arosemena', 'Ciudad de Panamá', 'Panamá', 8.9969, -79.5182, 'PREMIUM'),
  ('ph-004', 'Clínica San Fernando Farmacia', 'CLINIC', 'Tumba Muerto, Ciudad de Panamá', 'Ciudad de Panamá', 'Panamá', 9.0028, -79.5215, 'PREMIUM'),
  ('ph-005', 'Farmacia Bella Vista', 'RETAIL', 'Ave. Balboa, Bella Vista', 'Ciudad de Panamá', 'Panamá', 8.9869, -79.5150, 'STANDARD'),
  ('ph-006', 'Farmacias Arrocha - Albrook', 'CHAIN', 'Albrook Mall, Panamá', 'Ciudad de Panamá', 'Panamá', 8.9738, -79.5541, 'PREMIUM'),
  ('ph-007', 'Hospital Chiriquí Farmacia', 'HOSPITAL', 'David, Chiriquí', 'Chiriquí', 'Chiriquí', 8.4003, -82.4310, 'PREMIUM'),
  ('ph-008', 'Farmacia Popular David', 'RETAIL', 'Calle Central, David', 'Chiriquí', 'Chiriquí', 8.4011, -82.4297, 'STANDARD'),
  ('ph-009', 'Farmacias Rey - Boquete', 'CHAIN', 'Boquete, Chiriquí', 'Chiriquí', 'Chiriquí', 8.7785, -82.4407, 'STANDARD'),
  ('ph-010', 'Hospital Rafael Hernández', 'HOSPITAL', 'David, Chiriquí', 'Chiriquí', 'Chiriquí', 8.3998, -82.4325, 'PREMIUM'),
  ('ph-011', 'Farmacia Colón Centro', 'RETAIL', 'Calle 7, Colón', 'Colón', 'Colón', 9.3593, -79.9027, 'STANDARD'),
  ('ph-012', 'Hospital Manuel Amador Guerrero', 'HOSPITAL', 'Colón, Colón', 'Colón', 'Colón', 9.3564, -79.9003, 'PREMIUM'),
  ('ph-013', 'Farmacia La Economía - La Chorrera', 'RETAIL', 'La Chorrera, Panamá Oeste', 'Panamá Oeste', 'Panamá Oeste', 8.8797, -79.7821, 'STANDARD'),
  ('ph-014', 'Hospital Nicolás Solano', 'HOSPITAL', 'La Chorrera, Panamá Oeste', 'Panamá Oeste', 'Panamá Oeste', 8.8756, -79.7800, 'PREMIUM'),
  ('ph-015', 'Farmacias Arrocha - La Chorrera', 'CHAIN', 'Super 99 La Chorrera', 'Panamá Oeste', 'Panamá Oeste', 8.8821, -79.7843, 'STANDARD')
ON CONFLICT (id) DO NOTHING;

-- SELLER_PHARMACIES
INSERT INTO seller_pharmacies (seller_id, pharmacy_id) VALUES
  ('s-001','ph-001'),('s-001','ph-002'),('s-001','ph-003'),('s-001','ph-004'),('s-001','ph-005'),('s-001','ph-006'),
  ('s-002','ph-013'),('s-002','ph-014'),('s-002','ph-015'),
  ('s-003','ph-007'),('s-003','ph-008'),('s-003','ph-009'),('s-003','ph-010'),
  ('s-004','ph-011'),('s-004','ph-012')
ON CONFLICT DO NOTHING;

-- STOCK (15 pharmacies × 15 products = 225 entries, insert a representative sample)
INSERT INTO stock (product_id, pharmacy_id, quantity, level, min_threshold) VALUES
  ('p-001','ph-001',120,'ALTO',20), ('p-002','ph-001',90,'ALTO',20),
  ('p-003','ph-001',200,'ALTO',30), ('p-004','ph-001',60,'MEDIO',15),
  ('p-005','ph-001',45,'MEDIO',15), ('p-007','ph-001',8,'BAJO',10),
  ('p-011','ph-001',150,'ALTO',25), ('p-015','ph-001',75,'ALTO',20),
  ('p-001','ph-002',80,'ALTO',20), ('p-003','ph-002',160,'ALTO',30),
  ('p-007','ph-002',0,'RUPTURA',10), ('p-009','ph-002',25,'MEDIO',10),
  ('p-011','ph-002',95,'ALTO',25), ('p-013','ph-002',35,'MEDIO',10),
  ('p-001','ph-003',200,'ALTO',30), ('p-003','ph-003',300,'ALTO',50),
  ('p-005','ph-003',80,'ALTO',20), ('p-012','ph-003',12,'BAJO',15),
  ('p-007','ph-003',4,'BAJO',10), ('p-014','ph-003',18,'BAJO',20),
  ('p-001','ph-004',110,'ALTO',20), ('p-003','ph-004',250,'ALTO',40),
  ('p-009','ph-004',70,'ALTO',15), ('p-011','ph-004',120,'ALTO',25),
  ('p-001','ph-005',40,'MEDIO',20), ('p-003','ph-005',85,'ALTO',30),
  ('p-011','ph-005',60,'ALTO',25), ('p-015','ph-005',0,'RUPTURA',15),
  ('p-001','ph-006',95,'ALTO',20), ('p-002','ph-006',55,'ALTO',15),
  ('p-003','ph-006',180,'ALTO',30), ('p-005','ph-006',30,'MEDIO',15),
  ('p-001','ph-007',150,'ALTO',25), ('p-003','ph-007',220,'ALTO',40),
  ('p-007','ph-007',35,'MEDIO',10), ('p-011','ph-007',80,'ALTO',20),
  ('p-001','ph-008',25,'MEDIO',20), ('p-003','ph-008',60,'ALTO',30),
  ('p-005','ph-008',8,'BAJO',10), ('p-011','ph-008',40,'MEDIO',20),
  ('p-003','ph-009',45,'MEDIO',20), ('p-005','ph-009',0,'RUPTURA',10),
  ('p-011','ph-009',28,'MEDIO',15), ('p-015','ph-009',12,'BAJO',10),
  ('p-001','ph-010',180,'ALTO',25), ('p-003','ph-010',280,'ALTO',50),
  ('p-009','ph-010',55,'ALTO',15), ('p-012','ph-010',8,'BAJO',10),
  ('p-001','ph-011',35,'MEDIO',20), ('p-003','ph-011',70,'ALTO',30),
  ('p-011','ph-011',45,'MEDIO',20), ('p-015','ph-011',0,'RUPTURA',15),
  ('p-001','ph-012',160,'ALTO',25), ('p-003','ph-012',240,'ALTO',40),
  ('p-007','ph-012',22,'MEDIO',10), ('p-012','ph-012',15,'BAJO',10),
  ('p-001','ph-013',50,'MEDIO',20), ('p-003','ph-013',100,'ALTO',30),
  ('p-011','ph-013',55,'ALTO',20), ('p-015','ph-013',20,'MEDIO',15),
  ('p-001','ph-014',130,'ALTO',25), ('p-003','ph-014',195,'ALTO',40),
  ('p-009','ph-014',40,'MEDIO',15), ('p-011','ph-014',65,'ALTO',20),
  ('p-001','ph-015',70,'ALTO',20), ('p-002','ph-015',40,'MEDIO',15),
  ('p-003','ph-015',120,'ALTO',30), ('p-011','ph-015',80,'ALTO',25)
ON CONFLICT (product_id, pharmacy_id) DO NOTHING;
      `

      await client.query(seed)

      // Generate 6 months of sales (simplified inline version)
      const salesRows: string[] = []
      const products = ['p-001','p-002','p-003','p-004','p-005','p-007','p-009','p-011','p-015']
      const pharmacies = ['ph-001','ph-002','ph-003','ph-004','ph-005','ph-006','ph-007','ph-008','ph-009','ph-010','ph-011','ph-012','ph-013','ph-014','ph-015']
      const sellerMap: Record<string,string> = {
        'ph-001':'s-001','ph-002':'s-001','ph-003':'s-001','ph-004':'s-001','ph-005':'s-001','ph-006':'s-001',
        'ph-007':'s-003','ph-008':'s-003','ph-009':'s-003','ph-010':'s-003',
        'ph-011':'s-004','ph-012':'s-004',
        'ph-013':'s-002','ph-014':'s-002','ph-015':'s-002',
      }
      const prices: Record<string,number> = {
        'p-001':85,'p-002':105,'p-003':45,'p-004':58,'p-005':72,'p-007':128,'p-009':95,'p-011':32,'p-015':68
      }
      let saleIdx = 0
      for (let m = 1; m <= 6; m++) {
        for (const phId of pharmacies) {
          const sellerId = sellerMap[phId]
          for (const prodId of products.slice(0, 6)) {
            const qty = Math.floor(Math.random() * 30) + 5
            const price = prices[prodId] || 60
            const day = Math.floor(Math.random() * 28) + 1
            const dateStr = `2025-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`
            salesRows.push(`('sale-${++saleIdx}','${prodId}','${phId}','${sellerId}',${qty},${qty * price},'${dateStr}')`)
          }
        }
      }

      const chunkSize = 50
      for (let i = 0; i < salesRows.length; i += chunkSize) {
        const chunk = salesRows.slice(i, i + chunkSize)
        await client.query(`INSERT INTO sales (id,product_id,pharmacy_id,seller_id,quantity,revenue,date) VALUES ${chunk.join(',')} ON CONFLICT (id) DO NOTHING`)
      }

      // Visit logs
      const visitRows = []
      for (let i = 1; i <= 30; i++) {
        const phIdx = (i % 15) + 1
        const sellerIdx = phIdx <= 6 ? 1 : phIdx <= 10 ? 3 : phIdx <= 12 ? 4 : 2
        const m = Math.floor(Math.random() * 6) + 1
        const d = Math.floor(Math.random() * 28) + 1
        visitRows.push(`('vl-${i}', 's-00${sellerIdx}', 'ph-${String(phIdx).padStart(3,'0')}', '2025-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}', 'Visita rutinaria. Revisión de stock y pedido.', 'Pedido realizado')`)
      }
      await client.query(`INSERT INTO visit_logs (id,seller_id,pharmacy_id,visit_date,notes,outcome) VALUES ${visitRows.join(',')} ON CONFLICT (id) DO NOTHING`)

      await client.end()
      return NextResponse.json({ ok: true, message: 'Seed complete ✅ — 6 users, 15 products, 15 pharmacies, 4 sellers, ~540 sales, 30 visits' })
    }

    await client.end()
    return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
