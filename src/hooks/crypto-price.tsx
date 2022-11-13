import {
  SetStateAction,
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useMemo,
  Dispatch,
  useCallback,
} from 'react';

import {
  COINRANKING_ACCESS_TOKEN,
  CoinrankingEnum,
  QuotePairsEnum,
  FiatEnum,
} from '~/enums';

import { useQuote } from './quote';

interface CryptoPriceProviderProps {
  children: ReactNode;
}

type CoinPrice = {
  [uuid: string]: {
    price: {
      [key in FiatEnum]: string | number;
    };
  };
};

type TreatCoinPriceProps = {
  defaultPrice?: string | number | null;
  coinrankingUuid?: string | number;
  currency: FiatEnum;
};

type CryptoPriceContextData = {
  setCoinrankingUuids: Dispatch<SetStateAction<string[]>>;
  coinPrices: CoinPrice;
  treatCoinPrice: (
    props: TreatCoinPriceProps,
  ) => string | number | null | undefined;
};

const CryptoPriceContext = createContext<CryptoPriceContextData>(
  {} as CryptoPriceContextData,
);

const CryptoPriceProvider = ({ children }: CryptoPriceProviderProps) => {
  const [coinrankingUuids, setCoinrankingUuids] = useState<string[]>([]);
  const [coinPrices, setCoinPrices] = useState<CoinPrice>({});

  const { quotes } = useQuote();

  const isBrowser = typeof window !== 'undefined';
  const websocket = useMemo(
    () =>
      isBrowser
        ? new WebSocket(
            `${CoinrankingEnum.WebSocketUrl}?x-access-token=${COINRANKING_ACCESS_TOKEN}`,
          )
        : null,
    [isBrowser],
  );

  useEffect(() => {
    if (websocket) {
      websocket.onopen = () => {
        websocket.send(
          JSON.stringify({
            throttle: CoinrankingEnum.WebSocketThrottle,
            uuids: coinrankingUuids,
          }),
        );

        websocket.onmessage = event => {
          const data = JSON.parse(event.data);

          if (data.currencyUuid) {
            const priceBrl =
              Number(data.price) * Number(quotes[QuotePairsEnum.UsdToBrl].ask);

            if (data.price) {
              setCoinPrices(oldState => ({
                ...oldState,
                [data.currencyUuid]: {
                  price: {
                    [FiatEnum.BRL]: priceBrl,
                    [FiatEnum.USD]: data.price,
                  },
                },
              }));
            }
          }
        };
      };
    }
  }, [coinrankingUuids, quotes, websocket]);

  const treatCoinPrice = useCallback(
    ({ coinrankingUuid, defaultPrice, currency }: TreatCoinPriceProps) =>
      coinrankingUuid
        ? coinPrices[coinrankingUuid]?.price[currency] || defaultPrice
        : defaultPrice,
    [coinPrices],
  );

  return (
    <CryptoPriceContext.Provider
      value={{ setCoinrankingUuids, treatCoinPrice, coinPrices }}
    >
      {children}
    </CryptoPriceContext.Provider>
  );
};

const useCryptoPrice = (): CryptoPriceContextData => {
  const context = useContext(CryptoPriceContext);

  if (!context) {
    throw new Error(
      'useCryptoPrice must be used within an CryptoPriceProvider',
    );
  }

  return context;
};

export { CryptoPriceProvider, useCryptoPrice };
