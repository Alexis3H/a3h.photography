'use client';

import Link from 'next/link';

interface ButtonProps {
  text: string;
  type?: 'link' | 'section' | 'phone' | 'email';
  href?: string;
  sectionId?: string;
  phone?: string;
  email?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function Button({ 
  text, 
  type = 'link', 
  href, 
  sectionId, 
  phone, 
  email, 
  variant = 'primary',
  className = ''
}: ButtonProps) {
  const baseClasses = variant === 'primary' 
    ? 'bg-gray-900 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-gray-800 transition-colors'
    : 'border border-gray-300 text-gray-700 px-6 py-3 rounded-md text-base font-medium hover:bg-gray-100 transition-colors';

  const handleClick = () => {
    if (type === 'section' && sectionId) {
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // For section type, render as button with click handler
  if (type === 'section') {
    return (
      <button 
        onClick={handleClick}
        className={`${baseClasses} ${className}`}
      >
        {text}
      </button>
    );
  }

  // For phone type, render as link with tel: protocol
  if (type === 'phone' && phone) {
    return (
      <Link 
        href={`tel:${phone}`}
        className={`${baseClasses} ${className}`}
      >
        {text}
      </Link>
    );
  }

  // For email type, render as link with mailto: protocol
  if (type === 'email' && email) {
    return (
      <Link 
        href={`mailto:${email}`}
        className={`${baseClasses} ${className}`}
      >
        {text}
      </Link>
    );
  }

  // For link type or fallback, render as Link component
  return (
    <Link 
      href={href || '#'}
      className={`${baseClasses} ${className}`}
    >
      {text}
    </Link>
  );
}
