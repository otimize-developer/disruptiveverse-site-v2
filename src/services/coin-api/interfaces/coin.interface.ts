type CoinLink = {
  name: string;
  type: string | null;
  url: string;
};

export type Coin = {
  slug: string;
  symbol: string;
  name: string;
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
};

export type CoinPrice = {
  price: string;
  at: string;
};
