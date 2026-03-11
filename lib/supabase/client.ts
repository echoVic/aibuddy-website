import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client with service role key
export const supabaseAdmin = process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY)
  : null;

// Database types
export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Purchase {
  id: string;
  user_id: string;
  product_id: string;
  stripe_session_id: string;
  status: 'pending' | 'completed' | 'refunded';
  created_at: string;
}

export interface Download {
  id: string;
  purchase_id: string;
  download_url: string;
  expires_at: string;
}