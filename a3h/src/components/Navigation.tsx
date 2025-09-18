'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getMenuItemsSync } from '../lib/menuManager';

// Default menu items for SSR
const DEFAULT_MENU_ITEMS = [
  { id: 'homepage', name: 'Accueil', path: '/' },
  { id: 'headshots', name: 'Headshots', path: '/headshots' },
  { id: 'restaurants', name: 'Restaurants', path: '/restaurants' },
  { id: 'evenements', name: 'Événements', path: '/evenements' },
  { id: 'contact', name: 'Contact', path: '/contact' }
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState(DEFAULT_MENU_ITEMS);
  const [isClient, setIsClient] = useState(false);
  
  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);
    // Load cached menu items immediately
    const cachedMenuItems = getMenuItemsSync();
    setMenuItems(cachedMenuItems);
  }, []);
  
  // Listen for menu updates
  useEffect(() => {
    if (!isClient) return;
    
    const handleMenuUpdate = () => {
      setMenuItems(getMenuItemsSync());
    };

    window.addEventListener('menuUpdated', handleMenuUpdate);
    return () => window.removeEventListener('menuUpdated', handleMenuUpdate);
  }, [isClient]);

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">A3H</span>
            <span className="ml-2 text-sm text-gray-600">Photography</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link 
                key={item.id}
                href={item.path} 
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  item.id === 'contact' 
                    ? 'bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item) => (
                <Link 
                  key={item.id}
                  href={item.path} 
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    item.id === 'contact' 
                      ? 'bg-gray-900 text-white rounded-md hover:bg-gray-800'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
