import { IconType as ReactIconType } from 'react-icons';
import {
  FaLink,
  FaSquare,
  FaBitcoin,
  FaCube,
  FaGithub,
  FaReddit,
  FaTelegram,
  FaFileAlt,
  FaDiscord,
  FaTwitter,
} from 'react-icons/fa';

type IconType =
  | 'website'
  | 'bitcointalk'
  | 'explorer'
  | 'github'
  | 'reddit'
  | 'telegram'
  | 'whitepaper';

type IconProps = {
  type?: string | null;
};

const ICONS: { [key: IconType[number]]: ReactIconType } = {
  website: FaLink,
  bitcointalk: FaBitcoin,
  explorer: FaCube,
  github: FaGithub,
  reddit: FaReddit,
  telegram: FaTelegram,
  whitepaper: FaFileAlt,
  discord: FaDiscord,
  twitter: FaTwitter,
};

const ICON_KEYS = Object.keys(ICONS);

export const Icon = ({ type }: IconProps) => {
  if (!type || !ICON_KEYS.includes(type)) {
    return <FaSquare />;
  }

  const ReactIcon = ICONS[type];

  return <ReactIcon />;
};
