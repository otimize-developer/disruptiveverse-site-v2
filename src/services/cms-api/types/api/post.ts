import { Content } from '../content';
import { Image } from '../image';
import { Locale } from '../locale';
import { Author } from './author';
import { Category } from './category';

export type Post = {
  id: number;
  attributes: {
    title: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
    locale: Locale;
    content: Content[];
    featured_image: Image;
    meta: {
      id: number;
      title: string;
      description: string;
    } | null;
    category: {
      data: Category;
    };
    author?: {
      data: Author;
    };
  };
};
