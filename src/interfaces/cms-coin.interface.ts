import type { Content as StrapiContent } from '~/services/cms-api/types/content';

export type CmsCoin = {
  externalId: string;
  name: string;
  symbol: string;
  slug: string;
  description?: string | null;
  content: StrapiContent[];
  updatedAt?: string | null;
};
