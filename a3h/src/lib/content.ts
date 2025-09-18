import fs from 'fs';
import path from 'path';

// Initialize Supabase client for server-side use
let supabaseAdmin: any = null;

function initializeSupabase() {
  console.log('Environment check in content.ts:', {
    hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET',
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'NOT SET'
  });

  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { createClient } = require('@supabase/supabase-js');
      supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false
          }
        }
      );
      console.log('Supabase admin client initialized in content.ts');
    } catch (error) {
      console.log('Supabase admin client not available in content.ts:', error);
    }
  } else {
    console.log('Supabase environment variables not available in content.ts');
  }
}

// Initialize on module load
initializeSupabase();

export async function loadHomepageContent() {
  try {
    // Try Supabase first (if configured)
    if (supabaseAdmin) {
      console.log('Attempting to load homepage content from Supabase');
      const { data, error } = await supabaseAdmin
        .from('content')
        .select('content')
        .eq('page', 'homepage')
        .single();
      
      if (!error && data) {
        console.log('Homepage content loaded from Supabase');
        return data.content;
      } else {
        console.log('No homepage data found in Supabase:', error);
      }
    }
  } catch (error) {
    console.error('Error loading homepage content from Supabase:', error);
  }
  
  // Fallback to local file
  try {
    console.log('Loading homepage content from local file');
    const contentPath = path.join(process.cwd(), 'src', 'content', 'homepage.json');
    const content = fs.readFileSync(contentPath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error loading homepage content from file:', error);
    return null;
  }
}

export function loadContactContent() {
  try {
    const contentPath = path.join(process.cwd(), 'src', 'content', 'contact.json');
    const content = fs.readFileSync(contentPath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error loading contact content:', error);
    return null;
  }
}

export function loadPageContent(page: string): Record<string, any> | null {
  try {
    const contentPath = path.join(process.cwd(), 'src', 'content', `${page}.json`);
    const content = fs.readFileSync(contentPath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading ${page} content:`, error);
    return null;
  }
}
