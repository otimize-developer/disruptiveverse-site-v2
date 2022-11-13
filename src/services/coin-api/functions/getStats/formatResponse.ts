import { PathsEnum } from '~/enums/paths.enum';
import { CoinStats, Stats } from '~/interfaces/stats.interface';

import {
  Stats as ApiStats,
  CoinStats as ApiCoinStats,
} from '../../interfaces/stats.interface';

const formatCoin = (coin: ApiCoinStats): CoinStats => ({
  iconUrl: coin.iconUrl,
  name: coin.name,
  slug: coin.slug,
  symbol: coin.symbol,
  path: `${PathsEnum.Crypto}/${coin.slug}`,
});

export const formatResponse = (stats: ApiStats): Stats => {
  const formattedBestCoins: CoinStats[] = stats.bestCoins.map(formatCoin);
  const formattedNewestCoins: CoinStats[] = stats.newestCoins.map(formatCoin);

  return {
    ...stats,
    bestCoins: formattedBestCoins,
    newestCoins: formattedNewestCoins,
  };
};
