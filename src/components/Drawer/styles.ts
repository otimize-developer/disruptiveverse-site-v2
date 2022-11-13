import {
  DrawerContent,
  DrawerCloseButton as ChakraDrawerCloseButton,
} from '@chakra-ui/react';
import styled from '@emotion/styled';

import { ThemeEnum } from '~/enums';
import { themes } from '~/styles/themes';

export const DrawerWrapper = styled(DrawerContent)`
  background-color: ${({ theme }) => theme.colors.container};
`;

export const DrawerCloseButton = styled(ChakraDrawerCloseButton)`
  color: ${({ siteTheme }) =>
    siteTheme === ThemeEnum.DARK
      ? themes.light.colors.background
      : themes.dark.colors.background};
`;
