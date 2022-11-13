import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ScreenSizeValueEnum } from '~/enums/screen.enum';

type AmpProps = {
  isAmp?: boolean;
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  color: ${({ theme }) => theme.colors.text};
`;

export const PostsWrapper = styled.div<AmpProps>`
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  ${({ isAmp = false }) =>
    isAmp
      ? css`
          gap: 1.5rem 2rem;
        `
      : css`
          gap: 1.5rem 3rem;

          @media (max-width: ${ScreenSizeValueEnum.LG}px) {
            gap: 1.5rem 2rem;
          }
        `}
`;

export const Post = styled.div<AmpProps>`
  width: 100%;

  text-decoration: none;
  color: inherit;

  a {
    text-decoration: none;
    color: unset;
  }

  :hover {
    span:nth-of-type(2) {
      transition: color 0.2s;
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  > a {
    display: flex;
    flex-direction: column;

    > span:nth-of-type(1) {
      font-size: 12px;
      line-height: 14px;

      margin: 0.5rem 0;

      strong:hover {
        transition: color 0.2s;
        color: ${({ theme }) => theme.colors.primary};
      }
    }

    > span:nth-of-type(2) {
      font-size: 1rem;
      line-height: 26px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
    }
  }

  ${({ isAmp = false }) =>
    isAmp
      ? css`
          max-width: 100%;
        `
      : css`
          max-width: calc(25% - 2.25rem);

          @media (max-width: ${ScreenSizeValueEnum.XL}px) {
            max-width: calc(33% - 1.87rem);
          }

          @media (max-width: ${ScreenSizeValueEnum.LG}px) {
            max-width: calc(50% - 1rem);
          }

          @media (max-width: ${ScreenSizeValueEnum.SM}px) {
            max-width: 100%;
          }
        `}
`;

export const ImageWrapper = styled.div`
  position: relative;

  width: 100%;
  height: 12.5rem;
  border-radius: 8px;

  overflow: hidden;

  img,
  amp-img {
    object-fit: cover;
  }
`;
