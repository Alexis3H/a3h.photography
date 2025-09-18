import Image from 'next/image';
import layouts from '../src/layouts/image-layouts.json';

interface ImageItem {
  src: string;
  alt: string;
  focusPoint?: string;
  customFocusPoint?: string;
  zoom?: number;
}

interface FlexibleImageContainerProps {
  images: ImageItem[];
  layoutType: 'single' | 'collage';
  singleOrientation?: 'portrait' | 'landscape' | 'square';
  collageLayout?: 'layout1' | 'layout2' | 'layout3' | 'layout4';
  className?: string;
}

export default function FlexibleImageContainer({ 
  images, 
  layoutType, 
  singleOrientation = 'landscape',
  collageLayout = 'layout1',
  className = ''
}: FlexibleImageContainerProps) {
  
  const getObjectPosition = (image: ImageItem) => {
    // Prioritize focusPoint over customFocusPoint for consistency
    if (image.focusPoint) {
      return image.focusPoint;
    }
    if (image.customFocusPoint) {
      return image.customFocusPoint;
    }
    return 'center';
  };

  // Single image layout
  if (layoutType === 'single' && images.length > 0) {
    const layout = layouts.single[singleOrientation];
    const image = images[0];
    
    if (!layout) {
      console.warn(`Single layout "${singleOrientation}" not found`);
      return null;
    }

    return (
      <div className={`${layout.containerClasses} ${className} relative overflow-hidden`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className={layout.imageClasses}
          style={{
            objectPosition: getObjectPosition(image),
            transform: image.zoom ? `scale(${image.zoom})` : 'none',
            transformOrigin: getObjectPosition(image),
            maxWidth: 'none',
            maxHeight: 'none'
          }}
        />
      </div>
    );
  }

  // Collage layout
  if (layoutType === 'collage' && images.length > 0) {
    const layout = layouts.collage[collageLayout];
    
    if (!layout) {
      console.warn(`Collage layout "${collageLayout}" not found`);
      return null;
    }

    // Limit images to maxImages for this layout
    const displayImages = images.slice(0, layout.maxImages);

    return (
      <div className={`${layout.containerClasses} ${className}`}>
        {displayImages.map((image, index) => {
          const position = layout.positions[index];
          if (!position) return null;

          return (
            <div key={index} className={`${position.classes} relative overflow-hidden`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={layout.imageClasses}
                style={{
                  objectPosition: getObjectPosition(image),
                  transform: image.zoom ? `scale(${image.zoom})` : 'none',
                  transformOrigin: getObjectPosition(image),
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

  return null;
}
