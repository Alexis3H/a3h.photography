'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Link href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Accueil
            </Link>
            <Link href="/headshots" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Headshots
            </Link>
            <Link href="/restaurants" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Restaurants
            </Link>
            <Link href="/evenements" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Événements
            </Link>
            <Link href="/portfolio" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              Portfolio
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium">
              À propos
            </Link>
            <Link href="/contact" className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800">
              Contact
            </Link>
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
              <Link href="/" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
                Accueil
              </Link>
              <Link href="/headshots" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
                Headshots
              </Link>
              <Link href="/restaurants" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
                Restaurants
              </Link>
              <Link href="/evenements" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
                Événements
              </Link>
              <Link href="/portfolio" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
                Portfolio
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900 block px-3 py-2 text-base font-medium">
                À propos
              </Link>
              <Link href="/contact" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
