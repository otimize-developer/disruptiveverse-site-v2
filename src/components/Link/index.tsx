import { ReactNode } from 'react';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';

type Rel = 'nofollow' | 'sponsored' | 'ugc' | 'external' | 'noreferrer';
interface LinkProps extends NextLinkProps {
  children: ReactNode;
  rel?: Rel[];
  target?: '_blank';
}

export function Link({ href, rel = [], target, children, ...rest }: LinkProps) {
  const defaultRel = target === '_blank' ? ['noopener', 'noreferrer'] : [];
  const uniqueRelValues = [...defaultRel, ...rel];

  const tagAProps = {
    rel: uniqueRelValues.join(' '),
    target,
  };

  return (
    <NextLink href={href} passHref scroll={true} {...rest}>
      <a {...tagAProps}>{children}</a>
    </NextLink>
  );
}
