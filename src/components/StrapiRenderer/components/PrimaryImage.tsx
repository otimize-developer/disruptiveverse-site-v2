import { Image } from '~/components/Image';
import { PrimaryImage as PrimaryImageProps } from '~/services/cms-api/types/components/primary';

export function PrimaryImage(primaryImage: PrimaryImageProps) {
  const image = primaryImage.image.data.attributes;

  return (
    <Image
      src={image.url}
      fallbackSrc="/images/placeholder.jpg"
      alt={image.alternativeText || image.name || 'Image'}
      width={image.width}
      height={image.height}
    />
  );
}
