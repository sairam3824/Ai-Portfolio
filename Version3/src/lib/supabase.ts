
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase environment variables');
}

const isValidUrl = (url: string) => url && url.startsWith('http') && !url.includes('YOUR_SUPABASE');

export const supabase = (supabaseUrl && supabaseAnonKey && isValidUrl(supabaseUrl))
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
