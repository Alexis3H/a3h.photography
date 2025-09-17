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

export function getMenuItems(): MenuItem[] {
  // Always return default items for SSR to prevent hydration mismatch
  if (typeof window === 'undefined') {
    return DEFAULT_MENU_ITEMS;
  }
  
  // Clear any old cache and return current default items
  menuCache = DEFAULT_MENU_ITEMS;
  localStorage.setItem('a3h-menu-titles', JSON.stringify(DEFAULT_MENU_ITEMS));
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
