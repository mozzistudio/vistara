import { NextRequest, NextResponse } from 'next/server'
import { sendWhatsAppMessage } from '@/lib/whatsapp/client'
import { formatForWhatsApp } from '@/lib/whatsapp/formatter'
import { getAnthropicClient } from '@/lib/ai/client'
import { SYSTEM_PROMPT } from '@/lib/ai/system-prompt'
import { AI_TOOLS } from '@/lib/ai/tools'
import { executeTool } from '@/lib/ai/tool-handlers'
import { db } from '@/lib/supabase/client'
import { getOrCreateConversation, getConversationMessages, appendMessage } from '@/lib/supabase/queries/conversations'
import type Anthropic from '@anthropic-ai/sdk'

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN!

// GET: Webhook verification
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 })
  }
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}

// POST: Receive messages
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const entry = body?.entry?.[0]
    const change = entry?.changes?.[0]
    const messages = change?.value?.messages

    if (!messages?.length) {
      return NextResponse.json({ status: 'ok' })
    }

    const msg = messages[0]
    if (msg.type !== 'text') return NextResponse.json({ status: 'ok' })

    const phone = msg.from
    const text = msg.text?.body as string

    if (!text) return NextResponse.json({ status: 'ok' })

    // Find or create user by phone
    let { data: user } = await db
      .from('users')
      .select('id, name')
      .eq('email', `wa_${phone}@whatsapp.com`)
      .single()

    if (!user) {
      const { data: newUser } = await db
        .from('users')
        .insert({
          email: `wa_${phone}@whatsapp.com`,
          name: `WhatsApp ${phone}`,
          role: 'SELLER',
          password_hash: 'wa_user_no_login',
        })
        .select('id, name')
        .single()
      user = newUser
    }

    if (!user) return NextResponse.json({ status: 'ok' })

    const anthropic = getAnthropicClient()
    const convId = await getOrCreateConversation(user.id, 'WHATSAPP')
    const history = await getConversationMessages(convId, 10)
    await appendMessage(convId, 'USER', text)

    const messages_arr: Anthropic.MessageParam[] = [
      ...history.map(m => ({
        role: (m.role === 'USER' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: m.content,
      })),
      { role: 'user' as const, content: text },
    ]

    let response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 800,
      system: `${SYSTEM_PROMPT}\n\n## CANAL: WHATSAPP\nUsa texto plano, emojis, sin tablas markdown.`,
      tools: AI_TOOLS,
      messages: messages_arr,
    })

    let rounds = 0
    while (response.stop_reason === 'tool_use' && rounds < 5) {
      rounds++
      const toolUses = response.content.filter(b => b.type === 'tool_use') as Anthropic.ToolUseBlock[]
      const toolResults: Anthropic.ToolResultBlockParam[] = []

      for (const tu of toolUses) {
        try {
          const result = await executeTool(tu.name, tu.input as Record<string, unknown>)
          toolResults.push({ type: 'tool_result', tool_use_id: tu.id, content: JSON.stringify(result) })
        } catch (err) {
          toolResults.push({ type: 'tool_result', tool_use_id: tu.id, content: `Error: ${err}`, is_error: true })
        }
      }

      messages_arr.push({ role: 'assistant', content: response.content })
      messages_arr.push({ role: 'user', content: toolResults })

      response = await anthropic.messages.create({
        model: 'claude-sonnet-4-5',
        max_tokens: 800,
        system: `${SYSTEM_PROMPT}\n\n## CANAL: WHATSAPP\nUsa texto plano, emojis, sin tablas markdown.`,
        tools: AI_TOOLS,
        messages: messages_arr,
      })
    }

    const textBlock = response.content.find(b => b.type === 'text') as Anthropic.TextBlock | undefined
    const replyText = textBlock?.text ?? 'Lo siento, no pude procesar su consulta.'
    const formatted = formatForWhatsApp(replyText)

    await appendMessage(convId, 'ASSISTANT', replyText)
    await sendWhatsAppMessage(phone, formatted)

    return NextResponse.json({ status: 'ok' })
  } catch (e) {
    console.error('WhatsApp webhook error:', e)
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
