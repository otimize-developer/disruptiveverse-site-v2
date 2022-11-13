import '../styles/fonts.css';

import { ReactElement, ReactNode } from 'react';

import { NextPage } from 'next';

import type { AppProps } from 'next/app';

import { MainLayout } from '~/components/layouts/Main';
import { ErrorEnum, ErrorPathsEnum } from '~/enums';
import { GlobalStyles } from '~/styles/global.styles';
import { ThemeProvider } from '~/styles/ThemeProvider';

import Error from './_error';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const ERROR_PATHS: string[] = Object.values(ErrorPathsEnum);

export default function MyApp({
  Component,
  pageProps,
  router,
}: AppPropsWithLayout) {
  const isErrorPage = ERROR_PATHS.includes(router.route);

  const getLayout =
    Component.getLayout ??
    (page => (
      <MainLayout>
        <>{page}</>
      </MainLayout>
    ));

  const errorFound = Object.values(ErrorEnum).find(
    errorCode => errorCode === router.route.replace('/', ''),
  );

  const statusCode: ErrorEnum = errorFound || ErrorEnum.InternalServerError;

  return (
    <>
      <ThemeProvider>
        <GlobalStyles />
        {isErrorPage ? (
          <Error statusCode={statusCode} />
        ) : (
          getLayout(<Component {...pageProps} />)
        )}
      </ThemeProvider>
    </>
  );
}
