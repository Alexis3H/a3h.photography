'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageSelector from './ImageSelector';

interface ImageInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
}

export default function ImageInput({ value, onChange, placeholder, label, className }: ImageInputProps) {
  const [showSelector, setShowSelector] = useState(false);

  const handleImageSelect = (imagePath: string) => {
    onChange(imagePath);
    setShowSelector(false);
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="flex space-x-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || "Image path (e.g., /image.jpg)"}
          className="flex-1 p-2 border border-gray-300 rounded-md text-gray-900"
        />
        <button
          type="button"
          onClick={() => setShowSelector(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 whitespace-nowrap"
        >
          Browse Images
        </button>
      </div>

      {/* Preview */}
      {value && (
        <div className="mt-3">
          <div className="text-sm text-gray-600 mb-2">Preview:</div>
          <div className="relative w-32 h-24 border border-gray-200 rounded-md overflow-hidden">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        </div>
      )}

      {/* Image Selector Modal */}
      {showSelector && (
        <ImageSelector
          selectedImage={value}
          onImageSelect={handleImageSelect}
          onClose={() => setShowSelector(false)}
        />
      )}
    </div>
  );
}
