import { Fragment } from 'react';

import { useAmp } from 'next/amp';
import { useRouter } from 'next/router';

import { capitalize } from '~/utils/text';

import { Link } from '../Link';
import { BreadcrumbListSD } from '../SEO';
import * as S from './styles';

type BreadcrumbItem = {
  text: string;
  link: string;
  isCurrent?: boolean;
};

export type BreadcrumbProps = {
  items?: BreadcrumbItem[];
  gap?: string;
  hideLastItem?: boolean;
};

const getDefaultItemsByPath = (path: string) => {
  const pathNames = [...path.split('/')].filter(name => name);

  const homeItem = {
    text: 'Home',
    link: '/',
    isCurrent: pathNames.length === 0,
  };

  const defaultItems: BreadcrumbItem[] = pathNames.map((name, index) => ({
    text: capitalize(name.replace(/-/g, ' ')),
    link: `/${pathNames.slice(0, index + 1).join('/')}`,
    isCurrent: pathNames.length - 1 === index,
  }));

  return [homeItem, ...defaultItems];
};

export const Breadcrumb = ({
  items: providedItems,
  hideLastItem = false,
  gap,
}: BreadcrumbProps) => {
  const isAmp = useAmp();
  const { asPath } = useRouter();
  const items = providedItems || getDefaultItemsByPath(asPath);

  if (hideLastItem) {
    items.splice(items.length - (isAmp ? 2 : 1), items.length);
  }

  const breadcrumbListSD = items.map(({ text, link }) => ({
    name: text,
    link,
  }));

  return (
    <>
      <BreadcrumbListSD itemListElement={breadcrumbListSD} />
      <S.Wrapper gap={gap}>
        {items.map((item, index) => (
          <Fragment key={`${item.text}-${item.link}`}>
            {item.isCurrent ? (
              <span>{item.text}</span>
            ) : (
              <Link href={item.link}>{item.text}</Link>
            )}

            {index < items.length - 1 && <span>{'>'}</span>}
          </Fragment>
        ))}
      </S.Wrapper>
    </>
  );
};
