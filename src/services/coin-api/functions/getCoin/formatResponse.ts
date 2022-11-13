import { PathsEnum } from '~/enums/paths.enum';
import { Coin } from '~/interfaces/coin.interface';

import { Coin as CoinResourceCoin } from '../../interfaces/coin.interface';

export const formatResponse = (coin: CoinResourceCoin): Coin => ({
  ...coin,
  nameWithSymbol: `${coin.name} (${coin.symbol.toUpperCase()})`,
  path: `${PathsEnum.Crypto}/${coin.slug}`,
});
