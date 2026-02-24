import { NextRequest, NextResponse } from 'next/server'
import { getAllHCPs, getHCPById, searchHCPs, getHCPsByRep } from '@/lib/airtable/queries/hcps'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const repId = searchParams.get('repId')
    const search = searchParams.get('search')

    if (id) {
      const hcp = await getHCPById(id)
      if (!hcp) return NextResponse.json({ error: 'HCP not found' }, { status: 404 })
      return NextResponse.json(hcp)
    }

    if (search) {
      const hcps = await searchHCPs(search)
      return NextResponse.json(hcps)
    }

    if (repId) {
      const hcps = await getHCPsByRep(repId)
      return NextResponse.json(hcps)
    }

    const hcps = await getAllHCPs()
    return NextResponse.json(hcps)
  } catch (error) {
    console.error('Error fetching HCPs:', error)
    return NextResponse.json({ error: 'Failed to fetch HCPs' }, { status: 500 })
  }
}
