import { Content } from '../content';
import { Locale } from '../locale';

export type Category = {
  id: number;
  attributes: {
    name: string;
    slug: string;
    content: Content[];
    locale: Locale;
    createdAt: string;
    updatedAt: string;
  };
};
