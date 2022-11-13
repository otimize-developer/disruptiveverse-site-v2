import { Theme } from '~/enums';

import { defaultTheme } from './default.theme';

export const lightTheme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
  },
};
