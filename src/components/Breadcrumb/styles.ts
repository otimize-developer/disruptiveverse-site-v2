import styled from '@emotion/styled';

type WrapperProps = {
  gap?: string;
};

export const Wrapper = styled.nav<WrapperProps>`
  display: flex;
  gap: ${({ gap = '0.3rem' }) => gap};

  font-size: 0.875rem;

  a {
    color: inherit;
    text-decoration: none;

    transition: color 0.3s;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
