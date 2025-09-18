import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

// GET /api/galleries - List all galleries (admin only)
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('galleries')
      .select(`
        id,
        name,
        client_name,
        created_at,
        expires_at,
        is_active,
        photos(count)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching galleries:', error);
      return NextResponse.json({ error: 'Failed to fetch galleries' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in galleries GET:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/galleries - Create a new gallery
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, password, client_name, expires_at } = body;

    if (!name || !password || !client_name || !expires_at) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('galleries')
      .insert({
        name,
        password,
        client_name,
        expires_at
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating gallery:', error);
      return NextResponse.json({ error: 'Failed to create gallery' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in galleries POST:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
