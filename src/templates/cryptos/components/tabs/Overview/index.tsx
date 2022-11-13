import { useState } from 'react';

import { Tabs, TabPanels, TabPanel } from '@chakra-ui/react';
import { useAmp } from 'next/amp';

import { Icon } from '~/components/Icon';
import { Link } from '~/components/Link';
import { StrapiRenderer } from '~/components/StrapiRenderer';
import type { Coin, PriceHistory } from '~/interfaces/coin.interface';
import { formatValue } from '~/utils/value';

import { Chart } from '../../Chart';
import { AdvancedRealTimeChart } from '../../TradingView';
import * as S from './styles';

type OverviewProps = {
  priceHistory: PriceHistory;
  coin: Coin;
  price?: string;
  priceAt?: string;
};

export const Overview = ({
  priceHistory,
  priceAt,
  price,
  coin,
}: OverviewProps) => {
  const isAmp = useAmp();
  const [readMoreOpen, setReadMoreOpen] = useState(isAmp || false);

  const statistics = [
    {
      iconType: 'coin',
      text: 'Preço para BRL',
      value: formatValue({
        value: Number(price),
        options: {
          notation: 'standard',
          style: 'currency',
          currency: 'BRL',
        },
      }),
    },
    ...(coin.statistics || []),
  ];

  return (
    <>
      <Tabs variant="soft-rounded" colorScheme="gray">
        <S.TabList>
          <div>
            <S.Tab>Gráfico</S.Tab>
            <S.Tab>TradingView</S.Tab>
          </div>
        </S.TabList>
        <TabPanels>
          <TabPanel p="0" m="0">
            <S.ChartWrapper>
              <Chart
                priceHistory={priceHistory}
                priceAt={priceAt}
                price={price}
              />
            </S.ChartWrapper>
          </TabPanel>
          <TabPanel p="0" m="0">
            <S.TradingViewChartWrapper>
              <AdvancedRealTimeChart symbol={`usdtbtc`} />
            </S.TradingViewChartWrapper>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <S.InfoWrapper>
        {(price || statistics.length > 1) && (
          <S.Info>
            <h2>Valores estatísticos</h2>
            <p>
              Uma visão geral mostrando as estatísticas do {coin.name}, como a
              moeda base e de cotação, classificação e o volume de negociação.
            </p>

            {statistics.map(statistic => (
              <S.InfoRow key={statistic.text}>
                <div className="icon">
                  <Icon type={statistic.iconType} />
                  <span>{statistic.text}</span>
                </div>
                <span>{statistic.value}</span>
              </S.InfoRow>
            ))}
          </S.Info>
        )}

        <S.Info>
          <h2>Links</h2>
          {coin.links.map(
            link =>
              link.url &&
              link.name &&
              link.type && (
                <S.CryptoLink key={link.url}>
                  <Link href={link.url}>
                    <>
                      <div className="icon">
                        <Icon type={link.type} />
                        <span>{link.type}</span>
                      </div>
                      <span>{link.name}</span>
                    </>
                  </Link>
                </S.CryptoLink>
              ),
          )}
        </S.Info>
      </S.InfoWrapper>

      {coin.content && coin.content.length > 0 && (
        <S.Content>
          <div className="info">
            <strong>Tudo sobre {coin.nameWithSymbol}</strong>
            {coin.contentUpdatedAt && (
              <time>Atualizado em {coin.contentUpdatedAt}</time>
            )}
          </div>

          <S.StrapiRendererWrapper isOpen={readMoreOpen}>
            <StrapiRenderer content={coin.content} />
          </S.StrapiRendererWrapper>

          {!readMoreOpen && (
            <S.ReadMoreButtonWrapper>
              <S.ReadMoreButton
                onClick={() => setReadMoreOpen(true)}
                type="button"
              >
                Ler mais
              </S.ReadMoreButton>
            </S.ReadMoreButtonWrapper>
          )}
        </S.Content>
      )}
    </>
  );
};
