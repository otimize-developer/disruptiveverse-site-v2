import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';

import { Stats } from '~/interfaces/stats.interface';
import { getStats } from '~/services/coin-api/functions';

interface StatsProviderProps {
  children: ReactNode;
}

type StatsContextData = {
  stats: Stats | null;
};

const StatsContext = createContext<StatsContextData>({} as StatsContextData);

function StatsProvider({ children }: StatsProviderProps) {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    getStats({ proxy: true }).then(data => setStats(data));
  }, []);

  return (
    <StatsContext.Provider value={{ stats }}>{children}</StatsContext.Provider>
  );
}

function useStats(): StatsContextData {
  const context = useContext(StatsContext);

  if (!context) {
    throw new Error('useStats must be used within an StatsProvider');
  }

  return context;
}

export { StatsProvider, useStats };
