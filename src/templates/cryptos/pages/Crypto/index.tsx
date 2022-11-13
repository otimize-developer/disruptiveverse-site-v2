import { useCallback, useEffect, useMemo } from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';

import { Tabs, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import { BreadcrumbProps } from '~/components/Breadcrumb';
import { Image } from '~/components/Image';
import { FiatEnum, PathsEnum } from '~/enums';
import { useCryptoPrice } from '~/hooks/crypto-price';
import { useTheme } from '~/hooks/theme';
import type { Coin, PriceHistory } from '~/interfaces/coin.interface';
import type { News } from '~/interfaces/news.interface';
import { themes } from '~/styles/themes';
import { formatValue } from '~/utils/value';

import {
  Overview as OverviewTab,
  News as NewsTab,
} from '../../components/tabs';
import * as S from './styles';

export type CryptoPageProps = {
  priceHistory: PriceHistory;
  totalNews: number;
  news: News[];
  coin: Coin;
  prices: {
    [key in FiatEnum]: string;
  };
  priceAt: string;
};

export const CryptoPage = ({
  priceHistory,
  totalNews,
  priceAt,
  prices,
  coin,
  news,
}: CryptoPageProps) => {
  const { theme } = useTheme();
  const { treatCoinPrice, setCoinrankingUuids } = useCryptoPrice();

  useEffect(() => {
    if (coin?.externalIds?.coinraking) {
      setCoinrankingUuids(oldState => [
        ...new Set([...oldState, coin.externalIds.coinraking as string]),
      ]);
    }
  }, [coin, setCoinrankingUuids]);

  const priceBrl = useMemo(
    () =>
      treatCoinPrice({
        defaultPrice: prices.BRL,
        coinrankingUuid: coin?.externalIds?.coinraking,
        currency: FiatEnum.BRL,
      }),
    [prices, coin, treatCoinPrice],
  );

  const tabs = useMemo(
    () => [
      {
        title: 'Visão geral',
        available: true,
        Tab: () => (
          <OverviewTab
            coin={coin}
            priceHistory={priceHistory}
            price={prices.BRL}
            priceAt={priceAt}
          />
        ),
      },
      {
        title: 'Notícias',
        available: news.length > 0,
        Tab: () => (
          <NewsTab news={news} coinSlug={coin.slug} totalNews={totalNews} />
        ),
      },
    ],
    [coin, priceHistory, totalNews, news, priceAt, prices],
  );

  const renderTabPanels = useCallback(
    () => (
      <TabPanels>
        {tabs.map(
          tab =>
            tab.available && (
              <TabPanel key={tab.title}>
                <tab.Tab />
              </TabPanel>
            ),
        )}
      </TabPanels>
    ),
    [tabs],
  );

  return (
    <S.Wrapper>
      <Tabs colorScheme="blue">
        <S.TabList>
          <div className="crypto">
            <S.MainImageWrapper>
              <Image
                key={coin.slug}
                src={coin.iconUrl || '/images/default-coin.png'}
                fallbackSrc="/images/default-coin.png"
                alt={`Logo ${coin.nameWithSymbol}`}
                priority
                width={35}
                height={35}
                layout="fixed"
                placeholder="empty"
              />
            </S.MainImageWrapper>

            <h1>
              {coin.name} <span>{coin.symbol}</span>
              {coin.rank && <span className="crypto-rank">#{coin.rank}</span>}
            </h1>

            <strong>
              {formatValue({
                value: Number(priceBrl),
                options: {
                  notation: 'standard',
                  style: 'currency',
                  currency: 'BRL',
                },
              })}
            </strong>
          </div>

          <div className="tabs">
            {tabs.map(
              tab =>
                tab.available && (
                  <Tab
                    key={tab.title}
                    _selected={{
                      color: themes[theme].colors.primary,
                      borderBottom: `solid 2px ${themes[theme].colors.primary}`,
                    }}
                  >
                    {tab.title}
                  </Tab>
                ),
            )}
          </div>
        </S.TabList>

        {renderTabPanels()}
      </Tabs>
    </S.Wrapper>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
});

export const getStaticProps: GetStaticProps = async ({ params = {} }) => {
  const { getCoin, getCoinPriceHistory, getCoinPrice } = await import(
    '~/services/coin-api/functions'
  );
  const { getCoins: getCmsCoins, getNews } = await import(
    '~/services/cms-api/functions'
  );

  const slug = String(params.crypto);

  const coin = await getCoin({ slug });

  if (!coin) {
    return {
      notFound: true,
      revalidate: 1,
    };
  }

  const priceBrlPromise = getCoinPrice({
    slug,
    referenceCurrencySlug: FiatEnum.BRL,
  });
  const cmsCoinPromise = getCmsCoins({ slug, populate: { content: true } });
  const priceHistoryPromise = getCoinPriceHistory({ slug, timePeriod: '5y' });
  const newsPromise = getNews({
    tags: [coin.slug],
    pageSize: 28,
    populate: {
      featured_image: true,
    },
  });

  const [
    { price: priceBrl },
    {
      coins: [cmsCoin],
    },
    priceHistory,
    { news, pagination },
  ] = await Promise.all([
    priceBrlPromise,
    cmsCoinPromise,
    priceHistoryPromise,
    newsPromise,
  ]);

  coin.description = cmsCoin?.description || null;
  coin.content = cmsCoin?.content || null;
  coin.contentUpdatedAt = cmsCoin?.updatedAt || null;

  coin.statistics = [
    {
      iconType: null,
      text: 'Preço para BTC',
      value:
        coin.btcPrice &&
        formatValue({
          value: Number(coin.btcPrice),
          options: {
            notation: 'standard',
            maximumFractionDigits: 10,
          },
        }),
    },
    {
      iconType: null,
      text: 'Rank',
      value: coin.rank || '---',
    },
    {
      iconType: null,
      text: 'Volume 24h',
      value:
        coin['24hVolume'] &&
        formatValue({
          value: Number(coin['24hVolume']),
          options: {
            style: 'currency',
            currency: 'USD',
          },
        }),
    },
    {
      iconType: null,
      text: 'Market cap',
      value:
        coin.marketCap &&
        formatValue({
          value: Number(coin.marketCap),
          options: {
            style: 'currency',
            currency: 'USD',
          },
        }),
    },
    {
      iconType: null,
      text: 'Máxima de todos os tempos',
      value:
        coin.allTimeHigh?.price &&
        formatValue({
          value: Number(coin.allTimeHigh?.price),
          options: {
            style: 'currency',
            currency: 'USD',
          },
        }),
    },
  ].filter(statistic => !!statistic.value);

  const breadcrumbProps: BreadcrumbProps = {
    items: [
      {
        link: PathsEnum.Home,
        text: 'Home',
      },
      {
        link: PathsEnum.Crypto,
        text: 'Crypto',
      },
      {
        link: coin.path,
        text: coin.nameWithSymbol,
        isCurrent: true,
      },
    ],
  };

  const prices = {
    [FiatEnum.BRL]: priceBrl,
  };

  return {
    props: {
      totalNews: pagination.total,
      breadcrumbProps,
      priceHistory,
      priceAt: new Date().toISOString(),
      prices,
      coin,
      news,
    },
  };
};
