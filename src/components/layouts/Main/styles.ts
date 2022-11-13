import styled from '@emotion/styled';

import { ScreenSizeValueEnum } from '~/enums';

export const MainWrapper = styled.main`
  margin: 1rem auto;
  max-width: ${({ theme }) => theme.container.maxWidth}px;

  @media (max-width: ${ScreenSizeValueEnum.XL}px) {
    padding: 0 4rem;
  }

  @media (max-width: ${ScreenSizeValueEnum.LG}px) {
    padding: 0 3rem;
  }

  @media (max-width: ${ScreenSizeValueEnum.MD}px) {
    padding: 0 2rem;
  }

  @media (max-width: ${ScreenSizeValueEnum.SM}px) {
    padding: 0 1rem;
  }
`;
