import { ReactNode } from 'react';

import { Breadcrumb, BreadcrumbProps } from '~/components/Breadcrumb';
import { Header } from '~/components/Header';
import { Menu } from '~/components/Menu';

import * as S from './styles';

type MainLayoutProps = {
  children: ReactNode & {
    props: { children: { props?: { breadcrumbProps: BreadcrumbProps } } };
  };
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  const breadcrumbProps =
    children.props?.children?.props?.breadcrumbProps || {};

  return (
    <>
      <Header />
      <Menu />
      <S.MainWrapper>
        <Breadcrumb {...breadcrumbProps} />
        {children}
      </S.MainWrapper>
      <footer></footer>
    </>
  );
};
