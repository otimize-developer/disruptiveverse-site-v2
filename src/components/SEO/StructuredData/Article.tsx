import Head from 'next/head';

import { SITE_URL } from '~/enums/environment.enum';

export type ArticleSdProps = {
  headline?: string | null;
  alternativeHeadline?: string | null;
  image?: string | null;
  author?: string | null;
  genre?: string | null;
  keywords?: string[];
  wordcount?: number;
  url?: string | null;
  datePublished?: string | null;
  dateCreated?: string | null;
  dateModified?: string | null;
  description?: string | null;
  articleBody?: string | null;
};

export const Article = (props: ArticleSdProps) => (
  <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          publisher: {
            '@type': 'Organization',
            name: 'Mobbip',
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_URL}/images/logo-text.png`,
            },
          },
          ...props,
        }),
      }}
    />
  </Head>
);
