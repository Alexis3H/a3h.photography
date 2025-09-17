import Image from 'next/image';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  price: string;
  description: string;
  image: {
    src: string;
    alt: string;
    focusPoint?: string;
    zoom?: number;
  };
  button: {
    text: string;
    href: string;
  };
}

export default function ServiceCard({ title, price, description, image, button }: ServiceCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
      <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
        <Image
          src={image.src}
          alt={image.alt}
          width={300}
          height={200}
          className="w-full h-full object-cover"
          style={{
            objectPosition: image.focusPoint || 'center',
            transform: image.zoom ? `scale(${image.zoom})` : 'none',
            transformOrigin: image.focusPoint || 'center',
            maxWidth: 'none',
            maxHeight: 'none'
          }}
        />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-lg text-gray-700 mb-4">{price}</p>
      <p className="text-gray-600 mb-6">{description}</p>
      <Link 
        href={button.href} 
        className="bg-blue-600 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-blue-700 transition-colors mt-auto"
      >
        {button.text}
      </Link>
    </div>
  );
}

