import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Gallery {
  id: string
  name: string
  password: string
  client_name: string
  created_at: string
  expires_at: string
  is_active: boolean
}

export interface Photo {
  id: string
  gallery_id: string
  filename: string
  original_name: string
  file_size: number
  uploaded_at: string
}

export interface GalleryAccessLog {
  id: string
  gallery_id: string
  ip_address: string
  accessed_at: string
}

export interface Content {
  id: string
  page: string
  content: any
  updated_at: string
}
