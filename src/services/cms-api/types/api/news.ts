import type { Image } from '../image';
import type { Author } from './author';

type Attributes = {
  title: string;
  content: string;
  source_url?: string;
  show_source_url?: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  featured_image: Image | null;
  meta?: {
    title: string;
    description: string;
  };
  author?: {
    data: Author;
  };
};

export type News = {
  id: number;
  attributes: Attributes;
};
