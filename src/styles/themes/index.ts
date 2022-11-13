import { ThemeEnum, Theme } from '~/enums';

import { darkTheme } from './dark.theme';
import { lightTheme } from './light.theme';

export const themes: { [key in ThemeEnum]: Theme } = {
  light: lightTheme,
  dark: darkTheme,
};
