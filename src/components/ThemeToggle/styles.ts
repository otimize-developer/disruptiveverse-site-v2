import styled from '@emotion/styled';

import { ThemeEnum } from '~/enums';
import { themes } from '~/styles/themes';

type ButtonProps = {
  siteTheme: ThemeEnum;
};

export const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.25rem;
  border: none;

  transition: 0.5s;
  background: transparent;

  &:hover {
    svg {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;

    transition: 0.2s;
    color: ${({ siteTheme }) =>
      siteTheme === ThemeEnum.DARK
        ? themes.light.colors.background
        : themes.dark.colors.background};
  }
`;
