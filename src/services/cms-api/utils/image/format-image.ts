import type { Image } from '~/interfaces/image.interface';

import type { Image as StrapiImage } from '../../types';

export const formatImage = (image: StrapiImage): Image | null => {
  if (!image?.data?.attributes) {
    return null;
  }

  const strapiImageAttrs = image.data.attributes;

  const original = {
    url: strapiImageAttrs.url,
    width: strapiImageAttrs.width,
    height: strapiImageAttrs.height,
  };

  const sanitizeFormat = (format: typeof strapiImageAttrs.formats.large) =>
    format
      ? {
          url: format.url,
          width: format.width,
          height: format.height,
        }
      : original;

  const formattedFeaturedImage = {
    name: strapiImageAttrs?.name,
    hash: strapiImageAttrs.hash,
    alternativeText: strapiImageAttrs.alternativeText,
    caption: strapiImageAttrs.caption,
    original,
    large: sanitizeFormat(strapiImageAttrs.formats.large),
    medium: sanitizeFormat(strapiImageAttrs.formats.medium),
    small: sanitizeFormat(strapiImageAttrs.formats.small),
    thumbnail: sanitizeFormat(strapiImageAttrs.formats.thumbnail),
  };

  return formattedFeaturedImage;
};
