import memoryCache from 'memory-cache';

import { Stats } from '../../interfaces/stats.interface';

const CACHE_KEY = '/api/coin-resource/stats';
const CACHE_DURATION = 24 * 1000 * 60 * 60;

type ApiData = {
  stats: Stats;
};

export const saveStatsDataCache = (data: ApiData) => {
  if (!data) {
    return;
  }

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 1);

  memoryCache.put(CACHE_KEY, data, CACHE_DURATION);
};

export const getCachedStatsData = (): ApiData | null => {
  try {
    const cachedData = memoryCache.get(CACHE_KEY);
    return cachedData || null;
  } catch (error) {
    return null;
  }
};
