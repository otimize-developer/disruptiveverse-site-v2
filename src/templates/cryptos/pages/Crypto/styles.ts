import { TabList as ChakraTabList } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { ScreenSizeValueEnum } from '~/enums';

export const Wrapper = styled.div`
  margin-top: 2rem;
`;

export const MainImageWrapper = styled.div`
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  border-radius: 50px;
  overflow: hidden;
`;

export const TabList = styled(ChakraTabList)`
  display: flex;
  justify-content: space-between;

  > .crypto {
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
      display: flex;
      align-items: center;

      margin-left: 0.5rem;

      font-size: 1.5rem;

      span {
        margin-left: 0.5rem;

        font-size: 1rem;
        font-weight: normal;
      }

      .crypto-rank {
        padding: 0.25rem;
        border: solid 1px #0001;

        font-size: 0.75rem;
        background: #fff1;
      }
    }

    strong {
      margin-left: 1rem;

      font-size: 1.35rem;
    }
  }

  > .tabs {
    display: flex;

    button {
      border-radius: 0;
    }
  }

  @media (max-width: ${ScreenSizeValueEnum.MD}px) {
    flex-direction: column;
    align-items: flex-start;

    > .crypto {
      width: 100%;
      padding-bottom: 0.5rem;
      border-bottom: solid 1px #0002;

      justify-content: flex-start;
    }

    > .tabs {
      max-width: 100%;
      height: 3rem;

      overflow: auto;
      white-space: nowrap;

      button {
        height: 100%;
      }
    }
  }
`;
