import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const ChartWrapper = styled.div`
  height: 500px;
`;

export const TimePeriodWrapper = styled.div`
  margin-top: 1rem;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TimelineButtonsWrapper = styled.div`
  border: solid 1px ${({ theme }) => theme.colors.primary}75;
  padding: 0.25rem 1rem;

  display: flex;
`;

export const TimelineButton = styled.button<{ active?: boolean }>`
  padding: 0.25rem 0.5rem;

  transition: 0.3s;
  font-size: 0.75rem;
  font-weight: 600;

  :hover {
    background: ${({ theme }) => theme.colors.primary}40;
    transition: 0.3s;
  }

  ${({ active, theme }) =>
    active &&
    css`
      background: ${theme.colors.primary};
      color: #fff;

      :hover {
        background: ${theme.colors.primary};
      }
    `}
`;
