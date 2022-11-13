import {
  AccordionPanel as ChakraAccordionPanel,
  AccordionButton as ChakraAccordionButton,
} from '@chakra-ui/react';
import styled from '@emotion/styled';

import { ThemeEnum } from '~/enums';
import { themes } from '~/styles/themes';

type MobileMenuButtonProps = {
  siteTheme: ThemeEnum;
};

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 0.25rem 0.5rem;
`;

export const MobileMenuButton = styled.button<MobileMenuButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.5rem;

  svg {
    color: ${({ theme }) => theme.colors.primary};
    width: 1.5rem;
    height: 1.5rem;

    transition: color 0.3s;

    color: ${({ siteTheme }) =>
      siteTheme === ThemeEnum.DARK
        ? themes.light.colors.background
        : themes.dark.colors.background};
  }

  &:hover {
    svg {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;

  .next-image {
    display: flex;
    align-items: center;
  }
`;

export const AccordionButton = styled(ChakraAccordionButton)`
  color: ${({ theme }) => theme.colors.text};
`;

export const AccordionPanel = styled(ChakraAccordionPanel)`
  a {
    padding: 0.5rem 0;

    display: flex;
    align-items: center;

    text-decoration: none;
    color: unset;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

export const MenuLinkWrapper = styled.div`
  display: flex;

  font-weight: bold;

  a {
    width: 100%;
    padding: 0.5rem 1rem;

    color: unset;
    text-decoration: none;
  }
`;
