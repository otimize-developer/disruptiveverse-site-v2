import { useStats } from '~/hooks/stats';
import { CoinStats } from '~/interfaces/stats.interface';
import { formatValue } from '~/utils/value';

import { Image } from '../Image';
import { Link } from '../Link';
import * as S from './styles';

const renderCoin = (coin: CoinStats) => (
  <Link href={coin.path} key={coin.slug}>
    <S.CoinImageWrapper>
      <Image
        src={coin.iconUrl}
        alt={`${coin.name} (${coin.symbol})`}
        placeholder="empty"
        height={20}
        width={20}
      />
    </S.CoinImageWrapper>
  </Link>
);

export const Stats = () => {
  const { stats } = useStats();

  if (!stats) {
    return <S.Wrapper />;
  }

  return (
    <S.Wrapper>
      <div>
        Cryptos:{' '}
        <span className="value">
          {formatValue({
            value: stats.totalCoins,
            options: {
              notation: 'standard',
            },
          })}
        </span>
      </div>
      <div>
        Cap. de Mercado:{' '}
        <span className="value">
          {formatValue({
            value: stats.totalMarketCap,
            options: {
              style: 'currency',
              currency: 'BRL',
            },
          })}
        </span>
      </div>
      <div>
        BTC:{' '}
        <span className="value">
          {formatValue({
            value: stats.btcDominance / 100,
            options: {
              notation: 'standard',
              style: 'percent',
            },
          })}
        </span>
      </div>
      <div>
        Novas:
        <S.CoinImageContainer>
          {stats.newestCoins.map(renderCoin)}
        </S.CoinImageContainer>
      </div>
      <div>
        Maior desempenho:
        <S.CoinImageContainer>
          {stats.bestCoins.map(renderCoin)}
        </S.CoinImageContainer>
      </div>
    </S.Wrapper>
  );
};
