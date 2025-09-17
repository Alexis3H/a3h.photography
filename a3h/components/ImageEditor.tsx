'use client';

import { useState, useRef, useCallback } from 'react';

interface ImageEditorProps {
  src: string;
  alt: string;
  initialFocusPoint?: string;
  initialZoom?: number;
  onFocusPointChange: (focusPoint: string) => void;
  onZoomChange: (zoom: number) => void;
  width?: number;
  height?: number;
}

export default function ImageEditor({ 
  src, 
  alt, 
  initialFocusPoint = 'center',
  initialZoom = 1,
  onFocusPointChange,
  onZoomChange,
  width = 400,
  height = 300
}: ImageEditorProps) {
  const [zoom, setZoom] = useState(initialZoom);
  const [focusPoint, setFocusPoint] = useState(initialFocusPoint);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomChange = useCallback((newZoom: number) => {
    setZoom(newZoom);
    onZoomChange(newZoom);
  }, [onZoomChange]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) { // Left mouse button
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    // Calculate relative position within the container
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Clamp values between 0 and 100
    const clampedX = Math.max(0, Math.min(100, x));
    const clampedY = Math.max(0, Math.min(100, y));
    
    const newFocusPoint = `${clampedX}% ${clampedY}%`;
    setFocusPoint(newFocusPoint);
    onFocusPointChange(newFocusPoint);
  }, [isDragging, onFocusPointChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.max(0.5, Math.min(3, zoom + delta));
    handleZoomChange(newZoom);
  }, [zoom, handleZoomChange]);

  const getImageStyle = () => {
    const baseStyle = {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
      objectPosition: focusPoint,
      transform: `scale(${zoom})`,
      transformOrigin: focusPoint,
      cursor: isDragging ? 'grabbing' : 'grab',
      transition: isDragging ? 'none' : 'transform 0.1s ease-out',
      maxWidth: 'none',
      maxHeight: 'none'
    };
    return baseStyle;
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Zoom:</label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={zoom}
            onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
            className="w-24"
          />
          <span className="text-sm text-gray-600 w-12">{Math.round(zoom * 100)}%</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Focus:</label>
          <span className="text-sm text-gray-600 font-mono">{focusPoint}</span>
        </div>
      </div>

      {/* Image Editor */}
      <div 
        ref={containerRef}
        className="relative border-2 border-gray-300 rounded-lg overflow-hidden bg-gray-100"
        style={{ width, height }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <img
          src={src}
          alt={alt}
          style={getImageStyle()}
          draggable={false}
        />
        
        {/* Focus Point Indicator */}
        <div
          className="absolute w-4 h-4 border-2 border-white rounded-full shadow-lg pointer-events-none"
          style={{
            left: `calc(${focusPoint.split(' ')[0]} - 8px)`,
            top: `calc(${focusPoint.split(' ')[1]} - 8px)`,
            backgroundColor: 'rgba(59, 130, 246, 0.8)'
          }}
        />
        
        {/* Instructions */}
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          Click & drag to move focus • Scroll to zoom
        </div>
      </div>

      {/* Quick Focus Presets */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-gray-700">Quick Focus:</span>
        {[
          { label: 'Center', value: 'center' },
          { label: 'Top', value: 'top' },
          { label: 'Bottom', value: 'bottom' },
          { label: 'Left', value: 'left' },
          { label: 'Right', value: 'right' },
          { label: 'TL', value: 'top left' },
          { label: 'TR', value: 'top right' },
          { label: 'BL', value: 'bottom left' },
          { label: 'BR', value: 'bottom right' }
        ].map((preset) => (
          <button
            key={preset.value}
            onClick={() => {
              setFocusPoint(preset.value);
              onFocusPointChange(preset.value);
            }}
            className={`px-2 py-1 text-xs rounded ${
              focusPoint === preset.value 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
