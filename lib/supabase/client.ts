import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Server-side client with service role (full access, no RLS)
export function getServerClient() {
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false }
  })
}

// Browser-side client with anon key
let browserClient: ReturnType<typeof createClient> | null = null
export function getBrowserClient() {
  if (!browserClient) {
    browserClient = createClient(supabaseUrl, supabaseAnonKey)
  }
  return browserClient
}

// Default export: server client for API routes
export const db = getServerClient()
