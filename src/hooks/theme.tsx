import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import { ThemeConfigEnum, ThemeEnum } from '../enums';

type ThemeProviderProps = {
  children: ReactNode;
  setTheme: Dispatch<SetStateAction<ThemeEnum>>;
  theme: ThemeEnum;
};

type ThemeContextData = {
  theme: ThemeEnum;
  setTheme: Dispatch<SetStateAction<ThemeEnum>>;
  toggleTheme: () => void;
  isDark: boolean;
  isLight: boolean;
};

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider = ({
  children,
  theme,
  setTheme,
}: ThemeProviderProps) => {
  const handleSetTheme = useCallback((rawTheme: string) => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      const isDark = rawTheme === ThemeEnum.DARK;

      root.classList.remove(isDark ? ThemeEnum.LIGHT : ThemeEnum.DARK);
      root.classList.add(rawTheme);

      localStorage.setItem(ThemeConfigEnum.localStorageKey, rawTheme);
    }
  }, []);

  const toggleTheme = useCallback(
    () =>
      setTheme(oldTheme =>
        oldTheme === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT,
      ),
    [setTheme],
  );

  useEffect(() => {
    if (theme) {
      handleSetTheme(theme);
    }
  }, [theme, setTheme, handleSetTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        isDark: theme === ThemeEnum.DARK,
        isLight: theme === ThemeEnum.LIGHT,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextData => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within an ThemeProvider');
  }

  return context;
};
