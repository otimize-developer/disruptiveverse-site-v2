import type { Author } from '~/interfaces/author.interface';

import type { Author as AuthorStrapi } from '../../types';
import { imageUtils } from '../../utils';

type FormatResponseProps = {
  authors: AuthorStrapi[];
};

export const formatResponse = ({ authors }: FormatResponseProps): Author[] => {
  const formattedAuthors: Author[] = authors.map(author => {
    const {
      name,
      slug = '',
      description,
      social_links,
      photo,
    } = author.attributes;

    const fullName = name.split(' ');
    const initials =
      (fullName.shift() || '').charAt(0) + (fullName.pop() || '').charAt(0);

    return {
      id: author.id,
      name,
      initials,
      slug,
      photo: imageUtils.formatImage(photo),
      description,
      facebookUrl: social_links?.facebook || null,
      instagramUrl: social_links?.instagram || null,
      linkedinUrl: social_links?.linkedin || null,
      twitterUrl: social_links?.twitter || null,
    };
  });

  return formattedAuthors;
};
