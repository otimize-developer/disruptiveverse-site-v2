import { FiatEnum } from '~/enums/fiat.enum';
import { CoinPrice } from '~/interfaces/coin.interface';

import { coinResourceApi } from '../../config';

type GetCoinPriceProps = {
  slug: string;
  referenceCurrencySlug?: string;
};

type ApiResponse = {
  price: string;
  at: string;
};

export const getCoinPrice = async ({
  referenceCurrencySlug = FiatEnum.BRL,
  slug,
}: GetCoinPriceProps): Promise<CoinPrice | { price: null; at: null }> => {
  try {
    const {
      data: { price, at },
    } = await coinResourceApi().get<ApiResponse>(`/coins/${slug}/price`, {
      params: { referenceCurrencySlug },
    });

    return { price, at };
  } catch (error) {
    console.error(
      `[cms-resource-api/functions/getCoinPrice] - ${slug} | ${
        (error as Error).message
      }`,
    );
    return { price: null, at: null };
  }
};
