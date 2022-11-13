import styled from '@emotion/styled';

import { ScreenSizeValueEnum } from '~/enums';

export const Wrapper = styled.header`
  border-bottom: solid 1px #00000020;

  background: ${({ theme }) => theme.colors.container};

  .container {
    width: 100%;
    height: 100%;
    max-width: ${({ theme }) => theme.container.maxWidth}px;
    margin: 0 auto;

    display: flex;
    flex-direction: row;
    align-items: center;
  }

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
    padding: 0;
  }
`;
