interface MenuItem {
  id: string;
  name: string;
  path: string;
}

const DEFAULT_MENU_ITEMS: MenuItem[] = [
  { id: 'homepage', name: 'Accueil', path: '/' },
  { id: 'headshots', name: 'Headshots', path: '/headshots' },
  { id: 'restaurants', name: 'Restaurants', path: '/restaurants' },
  { id: 'evenements', name: 'Événements', path: '/evenements' },
  { id: 'contact', name: 'Contact', path: '/contact' }
];

// Global menu cache
let menuCache: MenuItem[] | null = null;

export async function getMenuItems(): Promise<MenuItem[]> {
  // Always return default items for SSR to prevent hydration mismatch
  if (typeof window === 'undefined') {
    return DEFAULT_MENU_ITEMS;
  }
  
  // Try to load from localStorage first
  try {
    const cached = localStorage.getItem('a3h-menu-titles');
    if (cached) {
      const parsedCache = JSON.parse(cached);
      if (parsedCache && Array.isArray(parsedCache)) {
        return parsedCache;
      }
    }
  } catch (error) {
    console.log('Error loading menu from cache:', error);
  }
  
  // Fallback to default items
  return DEFAULT_MENU_ITEMS;
}

// Synchronous version for backward compatibility
export function getMenuItemsSync(): MenuItem[] {
  if (typeof window === 'undefined') {
    return DEFAULT_MENU_ITEMS;
  }
  
  try {
    const cached = localStorage.getItem('a3h-menu-titles');
    if (cached) {
      const parsedCache = JSON.parse(cached);
      if (parsedCache && Array.isArray(parsedCache) && parsedCache.length > 0) {
        // Validate that we have the expected structure
        const isValid = parsedCache.every(item => 
          item && typeof item.id === 'string' && typeof item.name === 'string' && typeof item.path === 'string'
        );
        if (isValid) {
          return parsedCache;
        }
      }
    }
  } catch (error) {
    console.log('Error loading menu from cache:', error);
  }
  
  return DEFAULT_MENU_ITEMS;
}

export function updateMenuCache(newMenuItems: MenuItem[]) {
  menuCache = newMenuItems;
  localStorage.setItem('a3h-menu-titles', JSON.stringify(newMenuItems));
  
  // Dispatch custom event to notify components
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('menuUpdated', { 
      detail: { menuItems: newMenuItems } 
    }));
  }
}

export function clearMenuCache() {
  menuCache = null;
  if (typeof window !== 'undefined') {
    localStorage.removeItem('a3h-menu-titles');
  }
}
