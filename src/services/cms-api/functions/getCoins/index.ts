import { stringify } from 'qs';

import type { CmsCoin } from '~/interfaces/cms-coin.interface';

import { cmsApi } from '../../config';
import type { Pagination, Coin as StrapiCoin } from '../../types';
import { formatResponse } from './formatResponse';

type ApiReturn = {
  data: StrapiCoin[];
  meta: {
    pagination: Pagination;
  };
};

export type GetCoinsReturn = {
  coins: CmsCoin[];
  pagination: Pagination;
};

type Populate = {
  content?: boolean;
};

type GetCoinsProps = {
  slug?: string | string[];
  page?: number;
  pageSize?: number;
  proxy?: boolean;
  populate?: Populate;
};

export async function getCoins({
  pageSize = 10,
  page = 1,
  populate,
  slug,
  proxy = false,
}: GetCoinsProps): Promise<GetCoinsReturn> {
  const query = stringify({
    filters: {
      ...(slug ? { slug: { $eq: slug } } : {}),
    },
    ...(populate?.content ? { 'populate[content][populate]': '*' } : {}),
    pagination: {
      pageSize,
      page,
    },
  });

  const {
    data: { data: coins, meta },
  } = await cmsApi({ proxy }).get<ApiReturn>(`/coins/?${query}`);

  const formattedCoins = formatResponse({ coins });

  return {
    coins: formattedCoins,
    pagination: meta.pagination,
  };
}
