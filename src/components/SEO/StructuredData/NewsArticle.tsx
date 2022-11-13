import Head from 'next/head';

import { SITE_URL } from '~/enums/environment.enum';

export type NewsArticleSdProps = {
  headline: string;
  image?: string;
  author?: {
    '@type': 'Person';
    name: string | null;
    url: string | null;
  };
  url: string;
  datePublished?: string | null;
  dateCreated?: string | null;
  dateModified?: string | null;
  description?: string | null;
};

export const NewsArticle = ({
  image = `${SITE_URL}/images/default.jpg`,
  datePublished,
  dateModified,
  description,
  headline,
  author,
  url,
}: NewsArticleSdProps) => (
  <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          publisher: {
            '@type': 'Organization',
            name: 'Mobbip',
            logo: `${SITE_URL}/images/logo-text.png`,
          },
          author: {
            '@type': author?.['@type'] || 'Organization',
            name: author?.name || 'Mobbip',
            url: author?.url || SITE_URL,
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
          },
          headline,
          image,
          datePublished: datePublished || new Date().toISOString(),
          ...(dateModified ? { dateModified } : {}),
          ...(description ? { description } : {}),
        }),
      }}
    />
  </Head>
);
