import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

// GET /api/galleries/[id] - Get gallery details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const { data, error } = await supabase
      .from('galleries')
      .select(`
        id,
        name,
        client_name,
        created_at,
        expires_at,
        is_active,
        photos(
          id,
          filename,
          original_name,
          file_size,
          uploaded_at
        )
      `)
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

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in gallery GET:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/galleries/[id] - Update gallery
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('galleries')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating gallery:', error);
      return NextResponse.json({ error: 'Failed to update gallery' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in gallery PUT:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/galleries/[id] - Delete gallery
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const { error } = await supabase
      .from('galleries')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting gallery:', error);
      return NextResponse.json({ error: 'Failed to delete gallery' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in gallery DELETE:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
