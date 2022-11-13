import { useState } from 'react';

import { useAmp } from 'next/amp';
import NextImage from 'next/image';

type ImageProps = {
  width?: number;
  height?: number;
  src: string;
  alt: string;
  layout?: 'responsive' | 'fixed' | 'fill';
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  ampLayout?: 'fixed' | 'responsive';
  placeholder?: 'blur' | 'empty';
  containerStyle?: {
    width?: number;
    height?: number;
  };
};

export const Image = ({
  width,
  height,
  src,
  alt,
  layout,
  fallbackSrc = '/images/placeholder.jpg',
  loading = 'lazy',
  priority = false,
  ampLayout = 'responsive',
  placeholder = 'blur',
  containerStyle = {},
}: ImageProps) => {
  const isAmp = useAmp();
  const [imgSrc, setImgSrc] = useState(src);

  if (isAmp) {
    return (
      <amp-img
        width={width || 600}
        height={height || 337.5}
        src={src}
        alt={alt}
        layout={ampLayout}
      >
        <amp-img
          alt={alt}
          fallback=""
          width={width || 600}
          height={height || 337.5}
          src={fallbackSrc}
        />
      </amp-img>
    );
  }

  return (
    <span className="next-image" style={containerStyle}>
      <NextImage
        src={imgSrc}
        width={width}
        height={height}
        alt={alt}
        layout={layout}
        loading={priority ? 'eager' : loading}
        placeholder={placeholder}
        blurDataURL="/images/placeholder.jpg"
        onError={() => {
          setImgSrc(fallbackSrc);
        }}
        {...(priority ? { priority } : {})}
      />
    </span>
  );
};
