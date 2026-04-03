import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a dummy client if credentials are missing
export const supabase: SupabaseClient | null = (supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'your_supabase_url_here' && 
  supabaseAnonKey !== 'your_supabase_anon_key_here')
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export interface ContactMessage {
  id: string
  message: string
  created_at: string
  is_read: boolean
  user_agent?: string
  ip_address?: string
}

export interface BlogResource {
  category: string
  links: Array<{
    title: string
    url: string
    description?: string
  }>
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  read_time: string
  tags: string[]
  icon: string
  icon_color: string
  resources: BlogResource[]
  view_count?: number
  published: boolean
  created_at: string
  updated_at?: string
}
