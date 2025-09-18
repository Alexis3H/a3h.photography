import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Conditional Supabase import
let supabase: any = null;
let supabaseAdmin: any = null;

console.log('Environment check:', {
  hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
  hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET',
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET',
  serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'NOT SET'
});

// Initialize public client (for reads)
if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  try {
    const { createClient } = require('@supabase/supabase-js');
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    console.log('Supabase public client initialized successfully');
  } catch (error) {
    console.log('Supabase public client not available:', error);
  }
}

// Initialize admin client (for writes)
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
    console.log('Supabase admin client initialized successfully');
  } catch (error) {
    console.log('Supabase admin client not available:', error);
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  try {
    const { page } = await params;
    
    // Try Supabase Admin first (if configured)
    if (supabaseAdmin) {
      try {
        console.log(`Attempting to read from Supabase (admin) for page: ${page}`);
        const { data, error } = await supabaseAdmin
          .from('content')
          .select('content')
          .eq('page', page)
          .single();
        
        if (!error && data) {
          console.log(`Content loaded from Supabase (admin) for page: ${page}`);
          return NextResponse.json(data.content);
        } else {
          console.log('No data found in Supabase, falling back to local files');
        }
      } catch (supabaseError) {
        console.log('Supabase admin not available, falling back to local files:', supabaseError);
      }
    }
    
    // Try Supabase public client as fallback
    if (supabase) {
      try {
        console.log(`Attempting to read from Supabase (public) for page: ${page}`);
        const { data, error } = await supabase
          .from('content')
          .select('content')
          .eq('page', page)
          .single();
        
        if (!error && data) {
          console.log(`Content loaded from Supabase (public) for page: ${page}`);
          return NextResponse.json(data.content);
        }
      } catch (supabaseError) {
        console.log('Supabase public not available, falling back to local files');
      }
    }
    
    // Fallback to local file
    const contentPath = path.join(process.cwd(), 'src', 'content', `${page}.json`);
    const content = fs.readFileSync(contentPath, 'utf8');
    return NextResponse.json(JSON.parse(content));
  } catch {
    return NextResponse.json({ error: 'Content not found' }, { status: 404 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  try {
    const { page } = await params;
    const body = await request.json();
    
    // Try Supabase Admin first (if configured)
    console.log('POST: Supabase admin client available:', !!supabaseAdmin);
    if (supabaseAdmin) {
      try {
        console.log(`Attempting to save to Supabase (admin) for page: ${page}`);
        const { error } = await supabaseAdmin
          .from('content')
          .upsert({
            page,
            content: body,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'page'
          });
        
        if (!error) {
          console.log(`Content saved to Supabase (admin) for page: ${page}`);
          return NextResponse.json({ 
            success: true, 
            message: 'Content saved to Supabase database (admin)',
            storage: 'supabase-admin'
          });
        } else {
          console.error('Supabase admin upsert error:', error);
        }
      } catch (supabaseError) {
        console.error('Failed to save to Supabase (admin):', supabaseError);
      }
    } else {
      console.log('Supabase admin client not available, falling back to local storage');
    }
    
    // Fallback to local file (development)
    const contentPath = path.join(process.cwd(), 'src', 'content', `${page}.json`);
    fs.writeFileSync(contentPath, JSON.stringify(body, null, 2));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Saved locally (development mode)',
      storage: 'local'
    });
  } catch (error) {
    console.error('Failed to save content:', error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
