import type { News } from '~/interfaces/news.interface';

import type { News as StrapiNews } from '../../types/api/news';
import { contentUtils, imageUtils, seoUtils } from '../../utils';
import { formatResponse as formatAuthors } from '../getAuthors/formatResponse';

type FormatResponseProps = {
  news: StrapiNews[];
};

type CreatePathProps = {
  slug: string;
};

export const createPath = ({ slug }: CreatePathProps) => `/news/${slug}`;

export const formatResponse = ({ news }: FormatResponseProps): News[] => {
  const formattedNews: News[] = news.map(({ id, attributes }) => {
    const { slug, featured_image, content, author } = attributes;

    const [formattedAuthor] = author?.data
      ? formatAuthors({ authors: [author.data] })
      : [null];

    const path = createPath({ slug });
    const url = `${process.env.NEXT_PUBLIC_URL}${path}`;

    const meta = {
      title: attributes?.meta?.title || attributes?.title,
      description:
        attributes?.meta?.description ||
        contentUtils.getMetaDescriptionFromContent({
          content: [
            {
              id: 1,
              __component: 'primary.rich-text',
              rich_text: content,
            },
          ],
        }),
    };

    const publishedAtDate = attributes.publishedAt
      ? new Date(attributes.publishedAt)
      : new Date();

    publishedAtDate.setHours(publishedAtDate.getHours() - 3);

    const publishedAt = attributes.publishedAt
      ? publishedAtDate.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : null;

    const formattedNewsPost: News = {
      ...attributes,
      publishedAt,
      author: formattedAuthor,
      id,
      meta,
      content: contentUtils.removeUnwantedContent(content),
      featuredImage: featured_image
        ? imageUtils.formatImage(featured_image)
        : null,
      path,
      url,
      sourceUrl: attributes.source_url,
      structuredData: null,
    };

    const structuredData = seoUtils.newsStructuredData(formattedNewsPost, {
      id,
      attributes,
    });

    return { ...formattedNewsPost, structuredData };
  });

  return formattedNews;
};
