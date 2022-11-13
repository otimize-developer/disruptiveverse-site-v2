type Currency = {
  uuid: string;
  symbol: string;
};

type Exchange = {
  name: string;
  uuid: string;
  iconUrl: string | null;
};

type ExternalIds = {
  coinranking?: string;
};

export type Market = {
  slug: string;
  base: Currency;
  quote: Currency;
  exchange: Exchange;
  '24hVolume': string;
  price: string;
  btcPrice: string | null;
  rank: number | null;
  marketShare: string | null;
  recommended: boolean;
  externalIds: ExternalIds;
};
