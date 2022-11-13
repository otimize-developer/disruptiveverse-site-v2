import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  height: 2.5rem;
  margin: 0 auto;

  display: flex;
  align-items: center;

  white-space: nowrap;
  overflow: auto;
  background: ${({ theme }) => theme.colors.container};

  > div {
    display: flex;

    margin: 0 0.75rem;

    color: ${({ theme }) => theme.colors.gray['500']};
    font-size: 0.8rem;
  }

  .value {
    color: ${({ theme }) => theme.colors.primary};
    margin-left: 0.25rem;
  }
`;

export const CoinImageContainer = styled.div`
  display: flex;
  align-items: center;

  margin-left: 5px;
`;

export const CoinImageWrapper = styled.div`
  width: 22px;
  height: 22px;
  border: 0.5px solid #999;
  border-radius: 100%;
  margin: 0 0.1rem;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
`;
