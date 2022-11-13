type ImageSize = {
  url: string;
  width: number;
  height: number;
};

export type Image = {
  name: string;
  hash: string;
  alternativeText: string | null;
  caption: string | null;
  original: ImageSize;
  large: ImageSize;
  medium: ImageSize;
  small: ImageSize;
  thumbnail: ImageSize;
};
