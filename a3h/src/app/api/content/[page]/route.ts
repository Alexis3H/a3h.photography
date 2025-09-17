import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ page: string }> }
) {
  try {
    const { page } = await params;
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
    const contentPath = path.join(process.cwd(), 'src', 'content', `${page}.json`);
    
    // Write content back to file
    fs.writeFileSync(contentPath, JSON.stringify(body, null, 2));
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
