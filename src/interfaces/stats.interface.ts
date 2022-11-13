export type CoinStats = {
  symbol: string;
  name: string;
  iconUrl: string;
  path: string;
  slug: string;
};

export type Stats = {
  referenceCurrencyRate: number;
  totalCoins: number;
  totalMarkets: number;
  totalExchanges: number;
  totalMarketCap: string;
  total24hVolume: string;
  btcDominance: number;
  bestCoins: CoinStats[];
  newestCoins: CoinStats[];
};
