import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET() {
  try {
    // Try multiple possible paths
    const possiblePaths = [
      join(process.cwd(), 'a3h', 'public', 'uploads'),
      join(process.cwd(), 'public', 'uploads'),
      join(__dirname, '..', '..', '..', '..', 'public', 'uploads'),
      join(process.cwd(), 'src', '..', '..', 'public', 'uploads')
    ];
    
    let uploadsDir = '';
    for (const path of possiblePaths) {
      if (existsSync(path)) {
        uploadsDir = path;
        break;
      }
    }
    
    if (!uploadsDir) {
      console.log('None of the possible paths exist:', possiblePaths);
      return NextResponse.json({ images: [] });
    }
    console.log('Found uploads directory at:', uploadsDir);
    console.log('Looking for images in:', uploadsDir);
    console.log('Directory exists:', existsSync(uploadsDir));
    
    if (!existsSync(uploadsDir)) {
      console.log('Uploads directory does not exist');
      return NextResponse.json({ images: [] });
    }

    const files = await readdir(uploadsDir);
    console.log('All files in uploads directory:', files);
    
    const imageFiles = files.filter(file => {
      const ext = file.toLowerCase().split('.').pop();
      const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '');
      console.log(`File: ${file}, Extension: ${ext}, Is Image: ${isImage}`);
      return isImage;
    });

    console.log('Filtered image files:', imageFiles);

    const images = imageFiles.map(file => {
      const timestampMatch = file.match(/^(\d+)_/);
      const uploadDate = timestampMatch 
        ? new Date(parseInt(timestampMatch[1])).toISOString()
        : new Date().toISOString();
      
      return {
        filename: file,
        path: `/uploads/${file}`,
        name: file.replace(/^\d+_/, ''), // Remove timestamp prefix
        uploadDate: uploadDate
      };
    });

    console.log('Processed images:', images);

    // Sort by upload date (newest first)
    images.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error listing images:', error);
    return NextResponse.json({ images: [] });
  }
}
