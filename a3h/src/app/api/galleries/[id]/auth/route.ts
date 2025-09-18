import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../lib/supabase';

// POST /api/galleries/[id]/auth - Authenticate gallery access
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 });
    }

    // Get gallery with password
    const { data, error } = await supabase
      .from('galleries')
      .select('id, name, password, client_name, expires_at, is_active')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching gallery:', error);
      return NextResponse.json({ error: 'Gallery not found' }, { status: 404 });
    }

    // Check if gallery is active and not expired
    if (!data.is_active || new Date(data.expires_at) < new Date()) {
      return NextResponse.json({ error: 'Gallery not available' }, { status: 404 });
    }

    // Verify password
    if (data.password !== password) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Log access attempt
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    await supabase
      .from('gallery_access_logs')
      .insert({
        gallery_id: id,
        ip_address: clientIP
      });

    // Return gallery info (without password)
    const { password: _, ...galleryInfo } = data;
    return NextResponse.json({
      success: true,
      gallery: galleryInfo
    });
  } catch (error) {
    console.error('Error in gallery auth:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
