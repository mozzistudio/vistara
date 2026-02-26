import { db } from '../client'
import type { MsgChannel, MsgRole } from '@/types'

// In-memory store for conversations when DB tables don't exist yet
const convStore = new Map<string, { id: string; user_id: string; channel: MsgChannel; created_at: string; updated_at: string }>()
const msgStore = new Map<string, { id: string; conversation_id: string; role: MsgRole; content: string; tool_calls: unknown; created_at: string }[]>()

export async function getOrCreateConversation(userId: string, channel: MsgChannel, context?: Record<string, unknown>): Promise<string> {
  // Try V2 conversations table first
  try {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const { data: existing } = await db
      .from('conversations')
      .select('id')
      .eq('user_id', userId)
      .eq('channel', channel)
      .gte('updated_at', since)
      .order('updated_at', { ascending: false })
      .limit(1)
      .single()

    if (existing) return existing.id

    const { data, error } = await db
      .from('conversations')
      .insert({ user_id: userId, channel, context })
      .select('id')
      .single()

    if (!error && data) return data.id
  } catch {
    // Fall through to in-memory store
  }

  // In-memory fallback
  void context
  const key = `${userId}-${channel}`
  if (convStore.has(key)) return convStore.get(key)!.id
  const id = `conv-${Date.now()}`
  convStore.set(key, { id, user_id: userId, channel, created_at: new Date().toISOString(), updated_at: new Date().toISOString() })
  msgStore.set(id, [])
  return id
}

export async function getConversationMessages(conversationId: string, limit = 20) {
  // Try V2 messages table first
  try {
    const { data, error } = await db
      .from('messages')
      .select('id, role, content, tool_calls, created_at')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })
      .limit(limit)

    if (!error) return data
  } catch {
    // Fall through
  }

  return (msgStore.get(conversationId) ?? []).slice(-limit)
}

export async function appendMessage(conversationId: string, role: MsgRole, content: string, toolCalls?: unknown) {
  // Try V2 messages table first
  try {
    const { data, error } = await db
      .from('messages')
      .insert({ conversation_id: conversationId, role, content, tool_calls: toolCalls ?? null })
      .select('id')
      .single()

    if (!error && data) {
      await db.from('conversations').update({ updated_at: new Date().toISOString() }).eq('id', conversationId)
      return data.id
    }
  } catch {
    // Fall through
  }

  // In-memory fallback
  const id = `msg-${Date.now()}`
  const msgs = msgStore.get(conversationId) ?? []
  msgs.push({ id, conversation_id: conversationId, role, content, tool_calls: toolCalls ?? null, created_at: new Date().toISOString() })
  msgStore.set(conversationId, msgs)
  return id
}
