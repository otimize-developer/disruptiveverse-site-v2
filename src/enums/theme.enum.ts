export enum ThemeEnum {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum ThemeConfigEnum {
  localStorageKey = 'chakra-ui-color-mode',
}

export type Theme = {
  container: {
    maxWidth: number;
  };
  colors: {
    primary: string;
    background: string;
    container: string;
    text: string;
    textOpposite: string;
    tableEvenBackground: string;
    tableEvenColor: string;
    gray: {
      '50': string;
      '100': string;
      '500': string;
      '750': string;
      '800': string;
      '900': string;
      '950': string;
    };
    white: string;
    link: string;
  };
};
