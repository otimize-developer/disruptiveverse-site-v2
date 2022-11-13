import { Theme } from '~/enums';

import { defaultTheme } from './default.theme';

export const darkTheme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    background: '#1C1F24',
    container: '#252A30',
    text: '#E6E6E6',
    textOpposite: '#252A30',
    tableEvenBackground: '#f3f3f310',
    tableEvenColor: '#E6E6E6',
    link: '#40c1f4',
    primary: '#40c1f4',
  },
};
