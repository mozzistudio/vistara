import { tables } from '../client'
import { cachedQuery } from '../cache'

export interface Product {
  id: string
  name: string
  genericName: string
  therapeuticArea: string
  keyMessages: string[]
  objectionHandling: string
  detailAid: string
}

function mapRecord(record: any): Product {
  return {
    id: record.id,
    name: record.get('Name') || '',
    genericName: record.get('Generic Name') || '',
    therapeuticArea: record.get('Therapeutic Area') || '',
    keyMessages: (record.get('Key Messages') || '').split('\n').filter(Boolean),
    objectionHandling: record.get('Objection Handling') || '',
    detailAid: record.get('Detail Aid') || '',
  }
}

const FIVE_MINUTES = 5 * 60 * 1000

export async function getAllProducts(): Promise<Product[]> {
  return cachedQuery('products:all', async () => {
    const records = await tables.products.select().all()
    return records.map(mapRecord)
  }, FIVE_MINUTES)
}

export async function getProductByName(name: string): Promise<Product | null> {
  const products = await getAllProducts()
  return products.find(p =>
    p.name.toLowerCase().includes(name.toLowerCase()) ||
    p.genericName.toLowerCase().includes(name.toLowerCase())
  ) || null
}
