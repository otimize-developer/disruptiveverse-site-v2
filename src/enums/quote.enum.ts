import type { Quotes } from '~/interfaces/quote.interface';

import { FiatEnum } from './fiat.enum';

export const DEFAULT_PAR_QUOTES: Quotes = {
  [`${FiatEnum.USD}-${FiatEnum.BRL}`]: {
    code: 'USD',
    codein: 'BRL',
    name: 'Dólar Americano/Real Brasileiro',
    bid: '5.1724',
    ask: '5.1735',
  },
};

export enum QuotePairsEnum {
  UsdToBrl = 'USD-BRL',
}
