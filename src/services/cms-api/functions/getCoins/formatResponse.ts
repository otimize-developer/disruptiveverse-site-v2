import { CmsCoin } from '~/interfaces/cms-coin.interface';

import type { Coin as StrapiCoin } from '../../types';
import { contentUtils } from '../../utils';

type FormatPagesProps = {
  coins: StrapiCoin[];
};

const EXCLUDE_SENTENCES = ['coinranking.com'];

const formatCoinDescription = (description?: string | null): string | null => {
  if (!description) {
    return null;
  }

  const lines = description.split('.\n').filter(line => {
    const excludeLine = EXCLUDE_SENTENCES.every(
      sentence => line.indexOf(sentence) === -1,
    );

    return excludeLine;
  });

  return lines.join('.\n');
};

export const formatResponse = ({ coins }: FormatPagesProps): CmsCoin[] => {
  const formattedCmsCoins: CmsCoin[] = coins.map(({ id, attributes }) => ({
    description: formatCoinDescription(attributes.description),
    externalId: attributes.external_id,
    content: contentUtils.formatContent({
      content: attributes.content,
      parentId: id,
    }),
    symbol: attributes.symbol,
    name: attributes.name,
    slug: attributes.slug,
    updatedAt: attributes.updatedAt
      ? new Date(attributes.updatedAt).toLocaleDateString('pt-BR')
      : null,
  }));

  return formattedCmsCoins;
};
