import fs from 'fs';
import path from 'path';

export function loadHomepageContent() {
  try {
    const contentPath = path.join(process.cwd(), 'src', 'content', 'homepage.json');
    const content = fs.readFileSync(contentPath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error loading homepage content:', error);
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
