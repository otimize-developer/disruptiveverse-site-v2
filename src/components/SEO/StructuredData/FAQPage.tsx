import Head from 'next/head';

type Entity = {
  name: string;
  acceptedAnswer: {
    text: string;
  };
};

export type FAQPageProps = {
  mainEntity: Entity[];
};

export function FAQPageSD({ mainEntity }: FAQPageProps) {
  const formattedMainEntity = mainEntity.map(entity => ({
    '@type': 'Question',
    name: entity.name,
    acceptedAnswer: { '@type': 'Answer', text: entity.acceptedAnswer.text },
  }));

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity:
              formattedMainEntity.length === 1
                ? formattedMainEntity[0]
                : formattedMainEntity,
          }),
        }}
      />
    </Head>
  );
}
