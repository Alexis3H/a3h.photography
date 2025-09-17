'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export default function ImageInput({ value, onChange, placeholder, label }: ImageInputProps) {
  const [images, setImages] = useState<Record<string, any>[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Load images from API
  useEffect(() => {
    const loadImages = async () => {
      try {
        console.log('Loading images from API...');
        const response = await fetch('/api/images');
        console.log('API response status:', response.status);
        const data = await response.json();
        console.log('API response data:', data);
        setImages(data.images || []);
        console.log('Images set:', data.images?.length || 0, 'images');
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    loadImages();
  }, []);

  // Filter images based on search term
  const filteredImages = images.filter(image => 
    image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        // Refresh images list
        const imagesResponse = await fetch('/api/images');
        const imagesData = await imagesResponse.json();
        setImages(imagesData.images || []);
        
        // Auto-select the uploaded image
        onChange(result.path);
        setIsModalOpen(false);
      } else {
        alert('Upload failed: ' + result.error);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label || 'Image Path'}
      </label>
      
      {/* Current value display */}
      <div className="flex items-center space-x-2 mb-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || '/path/to/image.jpg'}
          className="flex-1 p-2 border border-gray-300 rounded-md text-sm text-gray-900"
        />
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
        >
          Browse
        </button>
      </div>

      {/* Preview current image */}
      {value && (
        <div className="mt-2">
          <div className="relative w-20 h-20 border border-gray-200 rounded-md overflow-hidden">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
              onError={() => {
                // Handle broken images
              }}
            />
          </div>
        </div>
      )}

      {/* Image selection modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Select Image</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Search and upload */}
            <div className="mb-4 space-y-3">
              <input
                type="text"
                placeholder="Search images..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
              
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 cursor-pointer"
                >
                  {isUploading ? 'Uploading...' : 'Upload New Image'}
                </label>
              </div>
            </div>

            {/* Image grid */}
            <div className="max-h-96 overflow-y-auto">
              <div className="text-xs text-gray-500 mb-2">
                Showing {filteredImages.length} of {images.length} images
              </div>
              <div className="grid grid-cols-4 gap-3">
                {filteredImages.map((image) => (
                  <div
                    key={image.filename}
                    onClick={() => {
                      onChange(image.path);
                      setIsModalOpen(false);
                    }}
                    className={`relative aspect-square border-2 rounded-md overflow-hidden cursor-pointer transition-all ${
                      value === image.path ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image.path}
                      alt={image.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                      {image.name}
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredImages.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  {searchTerm ? 'No images found matching your search.' : 'No images available.'}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
