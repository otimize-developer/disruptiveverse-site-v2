import { Menu as ChakraMenu, MenuButton, MenuList } from '@chakra-ui/react';
import NextLink from 'next/link';
import { BiChevronDown } from 'react-icons/bi';

import { ThemeToggle } from '~/components/ThemeToggle';
import { PathsEnum } from '~/enums';
import { Menu } from '~/interfaces/menu.interface';

import { Link } from '../../Link';
import { Logo } from '../../Logo';
import * as S from './styles';

type MenuDesktopProps = {
  menus: Menu[];
};

export const MenuDesktop = ({ menus }: MenuDesktopProps) => (
  <S.Wrapper>
    <div className="items-wrapper">
      <Link href={PathsEnum.Home}>
        <S.LogoWrapper>
          <Logo width={150} height={30} />
        </S.LogoWrapper>
      </Link>

      {menus.map(menu => (
        <div className="menu-item" key={menu.text}>
          {menu.subItems?.length ? (
            <ChakraMenu>
              <MenuButton as="button">
                {menu.text} <BiChevronDown />
              </MenuButton>
              <MenuList className="menu-list">
                {menu.subItems.map(subItem => (
                  <NextLink key={subItem.link} href={subItem.link} passHref>
                    <a>
                      <subItem.Icon />
                      <span>{subItem.text}</span>
                    </a>
                  </NextLink>
                ))}
              </MenuList>
            </ChakraMenu>
          ) : (
            <Link href={menu.link as string}>{menu.text}</Link>
          )}
        </div>
      ))}
    </div>

    <ThemeToggle />
  </S.Wrapper>
);
