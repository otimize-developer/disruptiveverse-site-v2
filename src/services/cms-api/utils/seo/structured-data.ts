import { ArticleSdProps } from '~/components/SEO/StructuredData/Article';
import { NewsArticleSdProps } from '~/components/SEO/StructuredData/NewsArticle';
import { SITE_URL } from '~/enums/environment.enum';
import type { News } from '~/interfaces/news.interface';
import type { Post } from '~/interfaces/post.interface';
import { htmlToText } from '~/utils/html';

import type {
  Post as StrapiPost,
  News as StrapiNews,
  PrimaryRichText,
} from '../../types';

type PageStructuredDataProps = {
  Post(post: Post, strapiPost: StrapiPost): ArticleSdProps;
  Phone(): null;
};

function sanitizeSimpleObject<T>(obj: T): T {
  return JSON.parse(
    JSON.stringify(obj, (key, value) => (!value && value !== 0 ? null : value)),
  );
}

const sanitizeValue = (value?: string | number): string | null =>
  !value && value !== 0 ? null : String(value);

export const pageStructuredData: PageStructuredDataProps = {
  Post: (
    post: Post,
    { attributes: strapiPost }: StrapiPost,
  ): ArticleSdProps => {
    const articleSd: ArticleSdProps = {
      headline: sanitizeValue(post?.title),
      alternativeHeadline: post?.meta?.title,
      image: post?.featuredImage?.original?.url,
      author: post?.author?.name,
      // award: 'Best article ever written',
      // editor: 'Craig Mount',
      genre: post?.category?.name,
      // keywords: [],
      // wordcount: '1120',
      url: post?.url,
      datePublished: strapiPost?.publishedAt,
      dateCreated: strapiPost?.createdAt,
      dateModified: strapiPost?.updatedAt,
      description: post?.meta?.description,
      articleBody:
        htmlToText(
          (post?.content || [])
            .filter(component => component.__component === 'primary.rich-text')
            .map(richText => (richText as PrimaryRichText).rich_text)
            .join(''),
        ) || null,
    };

    return sanitizeSimpleObject<ArticleSdProps>(articleSd);
  },
  Phone: () => null,
};

export const newsStructuredData = (
  news: News,
  { attributes: strapiNews }: StrapiNews,
) => {
  const newsArticleSd: NewsArticleSdProps = {
    headline: news?.meta?.title || news?.title,
    image: news?.featuredImage?.original?.url,
    url: news?.url,
    datePublished: strapiNews?.publishedAt,
    dateCreated: strapiNews?.createdAt,
    dateModified: strapiNews?.updatedAt,
    description: news?.meta?.description,

    ...(news?.author?.slug
      ? {
          author: {
            '@type': 'Person',
            name: news?.author?.name || 'Equipe DisruptiveVerse',
            url: news.author.slug
              ? `${SITE_URL}/blog/authors/${news.author.slug}`
              : null,
          },
        }
      : {}),
  };

  return sanitizeSimpleObject<NewsArticleSdProps>(newsArticleSd);
};
