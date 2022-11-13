import { Fragment } from 'react';

import {
  Accordion,
  AccordionItem,
  AccordionIcon,
  useDisclosure,
  Box,
} from '@chakra-ui/react';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import NextLink from 'next/link';

import { ThemeToggle } from '~/components/ThemeToggle';
import { PathsEnum, ThemeEnum } from '~/enums';
import { useTheme } from '~/hooks/theme';
import { Menu } from '~/interfaces/menu.interface';

import { Drawer } from '../../Drawer';
import { Link } from '../../Link';
import { Logo } from '../../Logo';
import * as S from './styles';

type MenuMobileProps = {
  menus: Menu[];
};

export const MenuMobile = ({ menus = [] }: MenuMobileProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { theme } = useTheme();

  return (
    <>
      <S.Wrapper>
        <S.MobileMenuButton
          aria-label="Menu"
          onClick={onOpen}
          siteTheme={theme}
        >
          <HamburgerMenuIcon />
        </S.MobileMenuButton>

        <S.LogoWrapper>
          <Link href={PathsEnum.Home}>
            <Logo width={150} height={30} />
          </Link>
        </S.LogoWrapper>

        <ThemeToggle />
      </S.Wrapper>

      <Drawer isOpen={isOpen} onClose={onClose} drawerTitle="Menu">
        <Accordion allowToggle as="nav">
          {menus.map(menu => (
            <Fragment key={menu.text}>
              {menu.subItems?.length ? (
                <AccordionItem key={menu.text}>
                  <S.AccordionButton
                    _expanded={{
                      bg: theme === ThemeEnum.DARK ? '#0005' : '#0001',
                    }}
                  >
                    <Box flex="1" textAlign="left" as="strong">
                      {menu.text}
                    </Box>

                    <AccordionIcon />
                  </S.AccordionButton>

                  <S.AccordionPanel>
                    {menu.subItems?.map(subItem => (
                      <NextLink key={subItem.link} href={subItem.link} passHref>
                        <a>
                          <subItem.Icon />
                          <span>{subItem.text}</span>
                        </a>
                      </NextLink>
                    ))}
                  </S.AccordionPanel>
                </AccordionItem>
              ) : (
                <S.MenuLinkWrapper>
                  <Link href={menu.link as string}>{menu.text}</Link>
                </S.MenuLinkWrapper>
              )}
            </Fragment>
          ))}
        </Accordion>
      </Drawer>
    </>
  );
};
