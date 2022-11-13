import { Dispatch, ReactNode, SetStateAction } from 'react';

import { ThemeEnum } from '~/enums';

import { CryptoPriceProvider } from './crypto-price';
import { QuoteProvider } from './quote';
import { ScreenProvider } from './screen';
import { StatsProvider } from './stats';
import { ThemeProvider } from './theme';

type AppProviderProps = {
  children: ReactNode;
  setTheme: Dispatch<SetStateAction<ThemeEnum>>;
  theme: ThemeEnum;
};

export function AppProvider({ children, setTheme, theme }: AppProviderProps) {
  return (
    <ScreenProvider>
      <ThemeProvider setTheme={setTheme} theme={theme}>
        <QuoteProvider>
          <CryptoPriceProvider>
            <StatsProvider>{children}</StatsProvider>
          </CryptoPriceProvider>
        </QuoteProvider>
      </ThemeProvider>
    </ScreenProvider>
  );
}
