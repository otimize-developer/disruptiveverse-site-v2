import { Image } from './image.interface';

export type Author = {
  id: number;
  name: string;
  slug: string;
  initials: string;
  description?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  twitterUrl?: string | null;
  linkedinUrl?: string | null;
  photo: Image | null;
};
