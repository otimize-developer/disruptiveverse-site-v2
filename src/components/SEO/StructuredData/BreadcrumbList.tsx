import Head from 'next/head';
import { useRouter } from 'next/router';

type BreadcrumbListElementProps = {
  name: string;
  link?: string;
  isCurrent?: boolean;
};

type BreadcrumbListProps = {
  itemListElement: BreadcrumbListElementProps[];
};

export function BreadcrumbList({ itemListElement }: BreadcrumbListProps) {
  const { asPath, locale = '' } = useRouter();
  const baseURL = process.env.NEXT_PUBLIC_URL;

  const formattedItemListElement = itemListElement.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@id': `${baseURL}${
        item.isCurrent ? `/${locale}${asPath}` : item.link || '/'
      }`,
      name: item?.name,
    },
  }));

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: formattedItemListElement,
          }),
        }}
      />
    </Head>
  );
}
