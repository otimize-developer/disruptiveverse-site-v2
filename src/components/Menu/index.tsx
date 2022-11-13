import { useAmp } from 'next/amp';
import { BiNews, BiFile, BiTrim, BiBitcoin } from 'react-icons/bi';

import { PathsEnum } from '~/enums';
import { useScreen } from '~/hooks/screen';

import { MenuDesktop } from './Desktop';
import { MenuMobile } from './Mobile';
import * as S from './styles';

export const Menu = () => {
  const { isMobile } = useScreen();
  const isAmp = useAmp();

  if (isAmp) {
    return <></>;
  }

  const menus = [
    {
      text: 'Crypto',
      subItems: [
        {
          text: 'Todas as criptomoedas',
          link: PathsEnum.Crypto,
          Icon: BiBitcoin,
        },
      ],
    },
    {
      text: 'Exchanges',
      link: PathsEnum.Exchanges,
    },
    {
      text: 'Aprenda',
      subItems: [
        { text: 'Blog', link: PathsEnum.Blog, Icon: BiFile },
        { text: 'Notícias', link: PathsEnum.News, Icon: BiNews },
        { text: 'Stories', link: PathsEnum.WebStories, Icon: BiTrim },
      ],
    },
  ];

  return (
    <S.Wrapper>
      {isMobile ? <MenuMobile menus={menus} /> : <MenuDesktop menus={menus} />}
    </S.Wrapper>
  );
};
