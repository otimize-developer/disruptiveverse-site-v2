import { Stats } from '~/interfaces/stats.interface';

import { coinResourceApi } from '../../config';
import { Stats as ApiStats } from '../../interfaces/stats.interface';
import { formatResponse } from './formatResponse';

type ApiResponse = {
  stats: ApiStats;
};

type GetStatsProps = {
  referenceCurrencySlug?: string;
  proxy?: boolean;
};

export const getStats = async ({
  referenceCurrencySlug = 'brl',
  proxy = false,
}: GetStatsProps): Promise<Stats | null> => {
  const {
    data: { stats },
  } = await coinResourceApi({ proxy }).get<ApiResponse>(`/stats`, {
    params: {
      referenceCurrencySlug,
    },
  });

  if (!stats) {
    return null;
  }

  const formattedStats = formatResponse(stats);

  return formattedStats;
};
