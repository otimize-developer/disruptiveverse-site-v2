import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useMemo,
} from 'react';

import { ScreenSize, ScreenSizeValueEnum } from '../enums';

interface MenuProviderProps {
  children: ReactNode;
}

type WindowSize = {
  width?: number;
  height?: number;
};

type ScreenContextData = {
  isMobile: boolean;
  windowSize: WindowSize;
  screenSize: ScreenSize;
};

const ScreenContext = createContext<ScreenContextData>({} as ScreenContextData);

export const ScreenProvider = ({ children }: MenuProviderProps) => {
  const [windowSize, setWindowSize] = useState<WindowSize>({});
  const [screenSize, setScreenSize] = useState<ScreenSize>('SM');

  const isMobile = useMemo(
    () => (windowSize?.width || 0) <= ScreenSizeValueEnum.MD,
    [windowSize],
  );

  const handleScreenSize = (windowWidth: number) => {
    if (!windowWidth) {
      return setScreenSize('MD');
    }

    if (windowWidth > ScreenSizeValueEnum.LG) {
      return setScreenSize('XL');
    }

    if (windowWidth > ScreenSizeValueEnum.MD) {
      return setScreenSize('LG');
    }

    if (windowWidth > ScreenSizeValueEnum.SM) {
      return setScreenSize('MD');
    }

    return setScreenSize('SM');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleWindowSize = (): void => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });

        handleScreenSize(window.innerWidth);
      };

      window.addEventListener('resize', handleWindowSize);
      handleWindowSize();

      return () => window.removeEventListener('resize', handleWindowSize);
    }

    return undefined;
  }, []);

  return (
    <ScreenContext.Provider value={{ isMobile, windowSize, screenSize }}>
      {children}
    </ScreenContext.Provider>
  );
};

export const useScreen = (): ScreenContextData => {
  const context = useContext(ScreenContext);

  if (!context) {
    throw new Error('useScreen must be used within an ScreenProvider');
  }

  return context;
};
