import { Fragment } from 'react';

import { Content as StrapiContent } from '~/services/cms-api/types';

import { renderers } from './renderers';
import * as S from './styles';

export type StrapiRendererProps = {
  content: StrapiContent[];
};

export const StrapiRenderer = ({ content }: StrapiRendererProps) => (
  <S.Wrapper>
    {content.map(component =>
      renderers[component.__component] ? (
        <Fragment key={`${component.__component}-${component.id}`}>
          {renderers[component.__component](component as any)}
        </Fragment>
      ) : (
        <Fragment key={`${component.__component}-${component.id}`} />
      ),
    )}
  </S.Wrapper>
);
