import fs from 'fs';
import path from 'path';

export interface HomepageContent {
  page: string;
  title: string;
  sections: {
    hero: {
      layout: string;
      label: string;
      title: string;
      description: string;
      primaryButton: {
        text: string;
        href: string;
      };
      secondaryButton: {
        text: string;
        href: string;
      };
      images: Array<{
        src: string;
        alt: string;
        position: string;
      }>;
    };
    services: {
      title: string;
      cards: Array<{
        title: string;
        price: string;
        description: string;
        image: {
          src: string;
          alt: string;
        };
        button: {
          text: string;
          href: string;
        };
      }>;
    };
    social: {
      layout: string;
      title: string;
      description: string;
      features: string[];
      price: string;
      button: {
        text: string;
        href: string;
      };
      image: {
        src: string;
        alt: string;
      };
    };
    process: {
      title: string;
      steps: Array<{
        title: string;
        description: string;
      }>;
    };
    contact: {
      title: string;
      description: string;
      placeholder: string;
      button: {
        text: string;
        href: string;
      };
      legal: string;
    };
  };
}

export function loadContent(page: string): any {
  try {
    const contentPath = path.join(process.cwd(), 'src', 'content', `${page}.json`);
    const content = fs.readFileSync(contentPath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading content for page ${page}:`, error);
    return null;
  }
}

export function loadHomepageContent(): HomepageContent {
  return loadContent('homepage') as HomepageContent;
}
