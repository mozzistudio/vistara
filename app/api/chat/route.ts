import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getAnthropicClient } from '@/lib/ai/client'
import { SYSTEM_PROMPT } from '@/lib/ai/system-prompt'
import { AI_TOOLS } from '@/lib/ai/tools'
import { executeTool } from '@/lib/ai/tool-handlers'
import { getOrCreateConversation, getConversationMessages, appendMessage } from '@/lib/supabase/queries/conversations'
import type { MsgChannel } from '@/types'
import type Anthropic from '@anthropic-ai/sdk'

export const maxDuration = 60

const MAX_TOOL_ROUNDS = 5

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      message: string
      conversationId?: string
      channel?: MsgChannel
      context?: Record<string, unknown>
    }

    // Auth: try server session first, fall back to userId from request body
    const session = await getServerSession(authOptions)
    const sessionUserId = (session?.user as Record<string, unknown> | undefined)?.id as string | undefined
    const userId = sessionUserId ?? (body.context?.userId as string | undefined) ?? 'anonymous'

    if (!session?.user && !body.context?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { message, conversationId: existingConvId, channel, context } = body

    if (!message?.trim()) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 })
    }

    const ch: MsgChannel = channel ?? 'WEB'
    const anthropic = getAnthropicClient()

    // Get or create conversation
    const convId = existingConvId
      ?? await getOrCreateConversation(userId, ch, context)

    // Load history
    const history = await getConversationMessages(convId, 20)

    // Save user message
    await appendMessage(convId, 'USER', message)

    // Build messages array for Claude
    const messages: Anthropic.MessageParam[] = [
      ...history.map(m => ({
        role: (m.role === 'USER' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: m.content,
      })),
      { role: 'user' as const, content: message },
    ]

    // Add context to system prompt
    const systemPrompt = context
      ? `${SYSTEM_PROMPT}\n\n## CONTEXTO ACTUAL\nEl usuario está viendo: ${JSON.stringify(context)}`
      : SYSTEM_PROMPT

    // Claude tool-calling loop
    let response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      system: systemPrompt,
      tools: AI_TOOLS,
      messages,
    })

    let rounds = 0
    while (response.stop_reason === 'tool_use' && rounds < MAX_TOOL_ROUNDS) {
      rounds++

      // Extract tool uses
      const toolUses = response.content.filter(b => b.type === 'tool_use') as Anthropic.ToolUseBlock[]

      // Build tool result messages
      const toolResults: Anthropic.ToolResultBlockParam[] = []
      for (const toolUse of toolUses) {
        try {
          const result = await executeTool(toolUse.name, toolUse.input as Record<string, unknown>)
          toolResults.push({
            type: 'tool_result',
            tool_use_id: toolUse.id,
            content: JSON.stringify(result),
          })
        } catch (err) {
          toolResults.push({
            type: 'tool_result',
            tool_use_id: toolUse.id,
            content: `Error: ${String(err)}`,
            is_error: true,
          })
        }
      }

      // Continue conversation
      messages.push({ role: 'assistant', content: response.content })
      messages.push({ role: 'user', content: toolResults })

      response = await anthropic.messages.create({
        model: 'claude-sonnet-4-5',
        max_tokens: 1024,
        system: systemPrompt,
        tools: AI_TOOLS,
        messages,
      })
    }

    // Extract final text
    const textBlock = response.content.find(b => b.type === 'text') as Anthropic.TextBlock | undefined
    const assistantText = textBlock?.text ?? 'No se pudo generar una respuesta.'

    // Save assistant message
    await appendMessage(convId, 'ASSISTANT', assistantText)

    return NextResponse.json({ message: assistantText, conversationId: convId })
  } catch (e) {
    console.error('Chat error:', e)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
