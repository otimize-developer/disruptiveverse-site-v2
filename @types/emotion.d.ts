import '@emotion/react';

import { Theme as DefaultTheme } from '~/enums/theme.enum';

declare module '@emotion/react' {
  export interface Theme extends DefaultTheme {}
}
