import {
  PrimaryAccordionGroup,
  PrimaryYouTubeVideo,
  PrimaryRichText,
  PrimaryImage,
} from './components/primary';

export type Content =
  | PrimaryAccordionGroup
  | PrimaryYouTubeVideo
  | PrimaryRichText
  | PrimaryImage;
