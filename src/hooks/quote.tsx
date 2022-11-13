import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import { DEFAULT_PAR_QUOTES, QuotePairsEnum } from '~/enums/quote.enum';
import { Quote } from '~/interfaces/quote.interface';
import { getQuotes } from '~/services/economia-awesomeapi/functions';

interface MenuProviderProps {
  children: ReactNode;
}

type Quotes = {
  [par: string]: Quote;
};

type QuoteContextData = {
  quotes: Quotes;
};

const QuoteContext = createContext<QuoteContextData>({} as QuoteContextData);

const QuoteProvider = ({ children }: MenuProviderProps) => {
  const [quotes, setQuotes] = useState(DEFAULT_PAR_QUOTES);

  useEffect(() => {
    getQuotes({ pairs: [QuotePairsEnum.UsdToBrl] })
      .then(data => setQuotes(oldState => ({ ...oldState, ...data })))
      .catch(() => setQuotes(DEFAULT_PAR_QUOTES));
  }, []);

  return (
    <QuoteContext.Provider value={{ quotes }}>{children}</QuoteContext.Provider>
  );
};

const useQuote = (): QuoteContextData => {
  const context = useContext(QuoteContext);

  if (!context) {
    throw new Error('useQuote must be used within an QuoteProvider');
  }

  return context;
};

export { QuoteProvider, useQuote };
