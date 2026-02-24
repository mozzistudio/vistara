import { NextRequest, NextResponse } from 'next/server'
import { getAllProducts, getProductByName } from '@/lib/airtable/queries/products'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const name = searchParams.get('name')

    if (name) {
      const product = await getProductByName(name)
      if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })
      return NextResponse.json(product)
    }

    const products = await getAllProducts()
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}
