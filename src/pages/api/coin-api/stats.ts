import type { NextApiRequest, NextApiResponse } from 'next';

import { coinResourceApi } from '~/services/coin-api/config';
import * as statsUtils from '~/services/coin-api/utils/cache/stats.util';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const cachedData = statsUtils.getCachedStatsData();

  if (cachedData) {
    return res.status(200).json(cachedData);
  }

  const { data } = await coinResourceApi({ proxy: false }).get('/stats', {
    params: req.query,
  });

  statsUtils.saveStatsDataCache(data);

  return res.status(200).json(data);
}
