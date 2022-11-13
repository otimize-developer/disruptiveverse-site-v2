import { LocaleEnum } from '~/enums/locale.enum';
import { Content as StrapiContent } from '~/services/cms-api/types/content';

export type Category = {
  id?: number;
  name: string;
  slug: string;
  path: string;
  url?: string;
  locale?: LocaleEnum;
  content?: StrapiContent[];
};
