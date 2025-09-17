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
  { id: 'portfolio', name: 'Portfolio', path: '/portfolio' },
  { id: 'about', name: 'À propos', path: '/about' },
  { id: 'contact', name: 'Contact', path: '/contact' }
];

// Global menu cache
let menuCache: MenuItem[] | null = null;

export function getMenuItems(): MenuItem[] {
  if (typeof window === 'undefined') {
    return DEFAULT_MENU_ITEMS; // Server-side rendering
  }
  
  // Return cache if available
  if (menuCache) {
    return menuCache;
  }
  
  const cachedMenuTitles = localStorage.getItem('a3h-menu-titles');
  if (cachedMenuTitles) {
    try {
      menuCache = JSON.parse(cachedMenuTitles);
      return menuCache;
    } catch (error) {
      console.error('Error parsing cached menu titles:', error);
      menuCache = DEFAULT_MENU_ITEMS;
      return menuCache;
    }
  }
  
  menuCache = DEFAULT_MENU_ITEMS;
  return menuCache;
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
}
