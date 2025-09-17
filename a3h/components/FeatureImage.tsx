import Image from 'next/image';

interface FeatureImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function FeatureImage({ src, alt, className = '' }: FeatureImageProps) {
  return (
    <div className={`h-96 bg-gray-100 rounded-lg overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={400}
        height={384}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

