import Image from 'next/image';
import layouts from '../src/layouts/image-layouts.json';

interface ImageItem {
  src: string;
  alt: string;
  position?: string;
  colSpan?: number;
  rowSpan?: number;
  focusPoint?: string;
  customFocusPoint?: string;
  size?: string;
  zoom?: number;
}

interface ImageGridProps {
  layoutType: keyof typeof layouts;
  images: ImageItem[];
  className?: string;
}

export default function ImageGrid({ layoutType, images, className = '' }: ImageGridProps) {
  const layout = layouts[layoutType];
  
  if (!layout) {
    console.error(`Layout type "${layoutType}" not found`);
    return null;
  }

  const getImageClasses = (position: string) => {
    const positionConfig = layout.positions.find(p => p.id === position);
    return positionConfig?.classes || '';
  };

  const getGridClasses = () => {
    const baseClasses = 'grid';
    const templateClass = layout.gridTemplate === 'grid-cols-2' ? 'grid-cols-2' : 
                         layout.gridTemplate === 'grid-cols-3' ? 'grid-cols-3' : '';
    return `${baseClasses} ${templateClass} ${layout.gap}`;
  };

  const getImageSize = (size?: string) => {
    switch (size) {
      case 'small': return { width: 200, height: 150 };
      case 'large': return { width: 600, height: 400 };
      case 'full': return { width: 800, height: 500 };
      default: return { width: 400, height: 300 };
    }
  };

  const getObjectPosition = (image: ImageItem) => {
    if (image.customFocusPoint) {
      return image.customFocusPoint;
    }
    return image.focusPoint || 'center';
  };

  return (
    <div className={`${getGridClasses()} ${className}`}>
      {images.map((image, index) => {
        const imageSize = getImageSize(image.size);
        const objectPosition = getObjectPosition(image);
        
        return (
          <div 
            key={index} 
            className={`${getImageClasses(image.position)} ${image.colSpan ? `col-span-${image.colSpan}` : ''} overflow-hidden`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={imageSize.width}
              height={imageSize.height}
              className="w-full h-full object-cover rounded-lg"
              style={{
                objectPosition: objectPosition,
                transform: image.zoom ? `scale(${image.zoom})` : 'none',
                transformOrigin: objectPosition,
                maxWidth: 'none',
                maxHeight: 'none'
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
