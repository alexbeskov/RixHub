import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const supabase =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      })
    : null

export function isSupabaseConfigured() {
  return !!supabase
}

export async function addSubscriber(email: string) {
  if (!supabase) throw new Error('Supabase not configured')

  const { error } = await supabase
    .from('subscribers')
    .insert({ email: email.trim().toLowerCase() })
    .select()

  if (error) {
    // Handle duplicate (unique constraint violation)
    if (error.code === '23505') {
      return { alreadyExists: true }
    }
    throw error
  }

  return { alreadyExists: false }
}

export async function getAllSubscribers() {
  if (!supabase) throw new Error('Supabase not configured')

  const { data, error } = await supabase
    .from('subscribers')
    .select('email')
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data || []).map((r) => r.email as string)
}

export async function subscriberCount() {
  if (!supabase) throw new Error('Supabase not configured')

  const { count, error } = await supabase
    .from('subscribers')
    .select('*', { count: 'exact', head: true })

  if (error) throw error
  return count || 0
}
