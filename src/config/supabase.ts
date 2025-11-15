import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface BlogSubscriber {
  id: string
  email: string
  subscribed_at: string
  is_active: boolean
  unsubscribe_token: string
}

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
