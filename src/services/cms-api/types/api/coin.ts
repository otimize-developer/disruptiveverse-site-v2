import { Content } from '../content';
import { Locale } from '../locale';

export type Coin = {
  id: number;
  attributes: {
    external_id: string;
    slug: string;
    name: string;
    symbol: string;
    description?: string | null;
    locale: Locale;
    content: Content[];
    updatedAt: string | null;
  };
};
