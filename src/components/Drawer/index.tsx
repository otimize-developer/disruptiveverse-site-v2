import { ReactNode } from 'react';

import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';

import { useTheme } from '~/hooks/theme';

import * as S from './styles';

type DrawerProps = {
  isOpen?: boolean;
  onClose?: () => void;
  drawerTitle?: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  children: ReactNode;
};

export const Drawer = ({
  isOpen = false,
  onClose = () => ({}),
  placement = 'left',
  drawerTitle,
  children,
}: DrawerProps) => {
  const { theme } = useTheme();

  return (
    <ChakraDrawer isOpen={isOpen} placement={placement} onClose={onClose}>
      <DrawerOverlay />
      <S.DrawerWrapper>
        <S.DrawerCloseButton siteTheme={theme} />
        {drawerTitle && <DrawerHeader>{drawerTitle}</DrawerHeader>}
        <DrawerBody>{children}</DrawerBody>
      </S.DrawerWrapper>
    </ChakraDrawer>
  );
};
