import { NextRequest, NextResponse } from 'next/server'
import { processUserMessage } from '@/lib/chat/engine'

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message required' }, { status: 400 })
    }

    const response = processUserMessage(message)
    return NextResponse.json(response)
  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json({ error: 'Chat processing failed' }, { status: 500 })
  }
}
