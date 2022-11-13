import type { Content as StrapiContent } from '~/services/cms-api/types/content';

type CoinLink = {
  name: string;
  type: string | null;
  url: string;
};

type StatisticValue = {
  iconType: string | null;
  text: string;
  value?: string | number;
};

export type Coin = {
  slug: string;
  path: string;
  symbol: string;
  name: string;
  description?: string | null;
  nameWithSymbol: string;
  color: string | null;
  marketCap: string;
  price: string | null;
  listedAt: string;
  tier: number | null;
  change: string | null;
  rank: number | null;
  sparkline: (string | null)[];
  lowVolume: boolean;
  '24hVolume': string;
  btcPrice: string | number;
  iconUrl: string | null;

  externalIds: {
    coinraking?: string;
  };

  websiteUrl?: string | null;
  links: CoinLink[];
  supply?: {
    circulating: number | null;
    total: number | null;
    confirmed: boolean;
  };
  numberOfMarkets?: number | null;
  numberOfExchanges?: number | null;
  priceAt?: string | null;
  allTimeHigh?: {
    change?: number | null;
    at: string | null;
    price: string;
  };

  content?: StrapiContent[];
  contentUpdatedAt?: string | null;

  statistics?: StatisticValue[];
};

export type CoinPrice = {
  price: string;
  at: string;
};

export type PriceHistory = {
  change: string | null;
  history: CoinPrice[];
};
