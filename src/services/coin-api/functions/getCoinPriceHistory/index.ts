import { FiatEnum } from '~/enums';
import { CoinPrice } from '~/interfaces/coin.interface';

import { coinResourceApi } from '../../config';

type TimePeriod = '1h' | '3h' | '12h' | '24h' | '3m' | '1y' | '3y' | '5y';

type GetCoinPriceHistoryProps = {
  referenceCurrencySlug?: string;
  timePeriod?: TimePeriod;
  slug: string;
};

type ApiResponse = {
  change: string | null;
  history: {
    price: string;
    at: string;
  }[];
};

export const getCoinPriceHistory = async ({
  referenceCurrencySlug = FiatEnum.BRL,
  timePeriod = '24h',
  slug,
}: GetCoinPriceHistoryProps): Promise<{
  change: string | null;
  history: CoinPrice[];
}> => {
  try {
    const {
      data: { change = null, history = [] },
    } = await coinResourceApi().get<ApiResponse>(`/coins/${slug}/history`, {
      params: { referenceCurrencySlug, timePeriod },
    });

    return { change, history };
  } catch (error) {
    console.error(
      `[cms-resource-api/functions/getCoinPriceHistory] - ${slug} | ${
        (error as Error).message
      }`,
    );
    return { change: null, history: [] };
  }
};
