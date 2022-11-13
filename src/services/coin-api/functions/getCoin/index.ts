import { AxiosError } from 'axios';

import { ErrorEnum } from '~/enums/error.enum';
import { Coin } from '~/interfaces/coin.interface';

import { coinResourceApi } from '../../config';
import { Coin as CoinResourceCoin } from '../../interfaces/coin.interface';
import { formatResponse } from './formatResponse';

type GetCoinProps = {
  referenceCurrencySlug?: string;
  shouldThrow?: boolean;
  slug: string;
};

type ApiResponse = {
  coin: CoinResourceCoin;
};

type HandleErrorProps = {
  shouldThrow?: boolean;
  error: AxiosError;
  slug: string;
};

const handleError = ({ shouldThrow = true, error, slug }: HandleErrorProps) => {
  console.error(
    `[cms-api/functions/getCoin] - ${slug} | ${(error as Error).message}`,
  );

  if (!shouldThrow) {
    return null;
  }

  if (String(error?.response?.status) === ErrorEnum.InternalServerError) {
    throw new Error('Internal Server Error');
  }

  return null;
};

export const getCoin = async ({
  referenceCurrencySlug = 'brl',
  shouldThrow = true,
  slug,
}: GetCoinProps): Promise<Coin | null> => {
  try {
    const {
      data: { coin },
    } = await coinResourceApi().get<ApiResponse>(`/coins/${slug}`, {
      params: { referenceCurrencySlug },
    });

    return formatResponse(coin);
  } catch (error) {
    return handleError({ shouldThrow, error: error as AxiosError, slug });
  }
};
