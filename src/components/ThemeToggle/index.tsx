import React from 'react';

import { BiMoon, BiSun } from 'react-icons/bi';

import { ThemeEnum } from '~/enums';
import { useTheme } from '~/hooks/theme';

import * as S from './styles';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <S.Button
      onClick={toggleTheme}
      siteTheme={theme}
      aria-label="Trocar o tema do site"
    >
      {theme === ThemeEnum.DARK ? <BiSun /> : <BiMoon />}
    </S.Button>
  );
};
