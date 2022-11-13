import { IconType } from 'react-icons';

export type Menu = {
  text: string;
  subItems?: {
    text: string;
    link: string;
    Icon: IconType;
  }[];
  link?: string;
};
