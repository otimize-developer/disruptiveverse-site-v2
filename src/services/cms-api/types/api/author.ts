import { Image } from '../image';

type SocialLinks = {
  facebook?: string | null;
  instagram?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
};

export type Author = {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description?: string | null;
    social_links?: SocialLinks;
    createdAt: string;
    updatedAt: string;
    photo: Image;
  };
};
