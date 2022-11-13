import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: ${({ theme }) => theme.container.maxWidth}px;
  margin: 0 auto;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .items-wrapper {
    display: flex;
  }
`;

export const LogoWrapper = styled.div`
  margin-right: 3rem;
  height: 3rem;

  display: flex;
  align-items: center;

  .next-image {
    display: flex;
    align-items: center;
  }
`;
