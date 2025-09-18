import { Metadata } from 'next';

// Default metadata fallback
const DEFAULT_METADATA: Metadata = {
  title: "A3H Photography - Photographe à Morges et la Côte",
  description: "Photographe professionnel à Morges, Nyon et Lausanne. Headshots, restaurants et événements privés. Livraison express J+0/J+1, studio mobile.",
  keywords: "photographe, Morges, Nyon, Lausanne, headshots, portraits, restaurants, événements, studio mobile",
  authors: [{ name: "Alexis3H" }],
  creator: "A3H Photography",
  publisher: "A3H Photography",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "fr_CH",
    url: "https://a3h.photography",
    siteName: "A3H Photography",
    title: "A3H Photography - Photographe à Morges et la Côte",
    description: "Photographe professionnel à Morges, Nyon et Lausanne. Headshots, restaurants et événements privés.",
  },
};

// Function to generate metadata from content
export async function generateMetadataFromContent(page: string): Promise<Metadata> {
  try {
    // Try to load content from Supabase via API
    let content = null;
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
    
    try {
      const response = await fetch(`${baseUrl}/api/content/${page}`, {
        cache: 'no-store'
      });
      if (response.ok) {
        content = await response.json();
      }
    } catch (error) {
      console.log('Error fetching metadata from API:', error);
    }
    
    // Fallback to local file if API fails
    if (!content) {
      try {
        const fs = require('fs');
        const path = require('path');
        const contentPath = path.join(process.cwd(), 'src', 'content', `${page}.json`);
        const fileContent = fs.readFileSync(contentPath, 'utf8');
        content = JSON.parse(fileContent);
      } catch (error) {
        console.log('Error loading metadata from file:', error);
      }
    }
    
    if (content) {
      return {
        title: content.seoTitle || content.title || DEFAULT_METADATA.title,
        description: content.seoDescription || DEFAULT_METADATA.description,
        keywords: DEFAULT_METADATA.keywords, // Keep default keywords for now
        authors: DEFAULT_METADATA.authors,
        creator: DEFAULT_METADATA.creator,
        publisher: DEFAULT_METADATA.publisher,
        robots: DEFAULT_METADATA.robots,
        openGraph: {
          ...DEFAULT_METADATA.openGraph,
          title: content.seoTitle || content.title || DEFAULT_METADATA.openGraph?.title,
          description: content.seoDescription || DEFAULT_METADATA.openGraph?.description,
        },
      };
    }
  } catch (error) {
    console.log('Error generating metadata:', error);
  }
  
  return DEFAULT_METADATA;
}

// Function to get default metadata
export function getDefaultMetadata(): Metadata {
  return DEFAULT_METADATA;
}
