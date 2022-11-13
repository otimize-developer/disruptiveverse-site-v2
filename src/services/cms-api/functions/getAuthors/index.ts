import { stringify } from 'qs';

import type { Author } from '~/interfaces/author.interface';

import { cmsApi } from '../../config';
import type { Author as StrapiAuthor, Pagination } from '../../types';
import { formatResponse } from './formatResponse';

type GetAuthorsProps = {
  slug?: string | string[];
};

type ApiReturn = {
  data: StrapiAuthor[];
  meta: {
    pagination: Pagination;
  };
};

type GetAuthorsReturn = {
  authors: Author[];
  pagination: Pagination;
};

export async function getAuthors({
  slug,
}: GetAuthorsProps): Promise<GetAuthorsReturn> {
  const query = stringify(
    {
      filters: {
        ...(slug ? { slug: { $eq: slug } } : {}),
      },
      'populate[0]': 'photo',
      'populate[1]': 'social_links',
    },
    { encodeValuesOnly: true },
  );

  const {
    data: { data: authors, meta },
  } = await cmsApi().get<ApiReturn>(`/authors/?${query}`);

  const formattedAuthors = formatResponse({ authors });

  return { authors: formattedAuthors, pagination: meta.pagination };
}
