import styled from '@emotion/styled';

import { ScreenSizeValueEnum } from '~/enums';

export const Wrapper = styled.nav`
  border-bottom: solid 1px #00000020;

  background: ${({ theme }) => theme.colors.container};

  .menu-item {
    height: 3rem;

    display: flex;
    align-items: center;

    + .menu-item {
      margin-left: 3rem;
    }

    a,
    button {
      font-weight: 600;
      color: ${({ theme }) => theme.colors.text};
      text-decoration: none;
      transition: 0.3s;

      :hover {
        color: ${({ theme }) => theme.colors.primary};
        transition: 0.3s;
      }
    }

    button {
      margin: 0;
      padding: 0;
      outline: 0;

      background: none;

      :hover {
      }
    }
  }

  .menu-list {
    padding: 0;
    box-shadow: 2px 2px 8px #0001;

    display: flex;
    flex-direction: column;

    background: ${({ theme }) => theme.colors.container};

    a {
      padding: 0.75rem;

      display: flex;
      align-items: center;

      :hover {
        backdrop-filter: brightness(0.95);
      }

      svg {
        margin-right: 0.5rem;
      }
    }
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
