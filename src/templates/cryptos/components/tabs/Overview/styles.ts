import { Tab as ChakraTab, TabList as ChakraTabList } from '@chakra-ui/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const TabList = styled(ChakraTabList)`
  div {
    padding: 0.5rem;
    margin-bottom: 0.25rem;
    border-radius: 8px;

    display: flex;

    background: ${({ theme }) => theme.colors.container};
  }
`;

export const Tab = styled(ChakraTab)`
  font-size: 0.75rem;
`;

export const Content = styled.div`
  margin: 2rem 0;
  padding: 2rem 0;
  border-top: solid 1px #0001;

  .info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .bullet {
    margin: 0 0.5rem;
  }

  time {
    color: ${({ theme }) => theme.colors.gray['500']};
  }
`;

export const StrapiRendererWrapper = styled.div<{ isOpen?: boolean }>`
  ${({ isOpen }) =>
    !isOpen &&
    css`
      max-height: 700px;

      overflow: hidden;
    `}
`;

export const ReadMoreButtonWrapper = styled.div`
  top: -250px;
  position: relative;

  height: 250px;

  display: flex;
  align-items: flex-end;

  background-image: ${({ theme }) =>
    `linear-gradient(180deg, transparent 0%, ${theme.colors.background} 75%)`};
`;

export const ReadMoreButton = styled.button`
  width: 100%;
  height: 3rem;

  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textOpposite};
  font-weight: bold;

  transition: 0.3s;

  :hover {
    filter: brightness(1.1);
    transition: 0.3s;
  }
`;

export const ChartWrapper = styled.div`
  max-width: 100%;
  height: 36rem;

  overflow: auto;
`;

export const TradingViewChartWrapper = styled.div`
  position: relative;
  overflow: auto;

  width: 100%;
  height: 36rem;

  background-color: #f0f4f7;

  iframe {
    width: 100%;
    height: 100%;
    margin: 0 !important;
    padding: 0 !important;
  }

  @media (max-width: 767px) {
    height: 30rem;
  }
`;

export const InfoWrapper = styled.div`
  border-top: solid 1px ${({ theme }) => theme.colors.textOpposite};
  padding-top: 1.5rem;
  margin-top: 1.5rem;

  display: flex;
  flex-wrap: wrap;
  flex-grow: 2;
  gap: 2rem 4rem;
`;

export const Info = styled.div`
  flex: 1 1 calc(50% - 2rem);
`;

export const InfoRow = styled.div`
  padding: 1rem 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  div + & {
    border-top: solid 1px ${({ theme }) => theme.colors.textOpposite};
  }

  .icon {
    display: flex;
    align-items: center;

    margin-right: 0.5rem;

    svg {
      margin-right: 0.5rem;

      color: ${({ theme }) => theme.colors.primary};
      font-size: 1.5rem;
    }
  }
`;

export const CryptoLink = styled.div`
  padding: 1rem 0;

  div + & {
    border-top: solid 1px ${({ theme }) => theme.colors.textOpposite};
  }

  .icon {
    display: flex;
    align-items: center;

    margin-right: 0.5rem;

    svg {
      margin-right: 0.5rem;

      color: ${({ theme }) => theme.colors.primary};
      font-size: 1.5rem;
    }

    span {
      text-transform: capitalize;
    }
  }

  a {
    display: flex;
    align-items: center;
    justify-content: space-between;

    text-decoration: none;
    color: unset;
  }
`;
