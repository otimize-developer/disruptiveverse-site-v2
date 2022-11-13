import { useMemo, useState } from 'react';

import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import { Props } from 'react-apexcharts';

import { PriceHistory } from '~/interfaces/coin.interface';
import { timelineDate, TimelineEnum } from '~/utils/date';
import { formatValue } from '~/utils/value';

import * as S from './styles';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

type ChartProps = {
  priceHistory: PriceHistory;
  priceAt?: string;
  price?: string;
};

export const Chart = ({ priceHistory }: ChartProps) => {
  const [selection, setSelection] = useState(TimelineEnum.YTD);
  const [xaxisMin, setXaxisMin] = useState(timelineDate(selection));

  const seriesData = useMemo(
    () =>
      [...(priceHistory?.history || [])]
        .filter(({ price, at }) => price && at)
        .map(({ price, at }) => [new Date(at).getTime(), Number(price)]),
    [priceHistory],
  );

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        id: 'area-datetime',
        type: 'area',
        height: 500,
        zoom: {
          autoScaleYaxis: true,
        },
      },
      dataLabels: {
        enabled: true,
        formatter(value, { dataPointIndex }) {
          return dataPointIndex === 0
            ? formatValue({
                value: Number(value),
                options: {
                  style: 'currency',
                  currency: 'BRL',
                },
              })
            : '';
        },
        textAnchor: 'end',
        offsetX: 0,
        offsetY: -5,
        style: {
          fontSize: '16px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: undefined,
          background: 'red',
        },
      },
      xaxis: {
        type: 'datetime',
        min: xaxisMin,
        tickAmount: 6,
      },
      yaxis: {
        labels: {
          formatter(value) {
            return formatValue({
              value,
              options: {
                style: 'currency',
                currency: 'BRL',
              },
            });
          },
        },
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
    }),
    [xaxisMin],
  );

  const charProps: Props = useMemo(
    () => ({
      options,
      series: [
        {
          data: seriesData,
        },
      ],
    }),
    [options, seriesData],
  );

  const updateData = (timeline: TimelineEnum) => {
    setSelection(timeline);
    setXaxisMin(timelineDate(timeline));
  };

  return (
    <>
      <S.ChartWrapper>
        <ApexChart
          {...charProps}
          selection={selection}
          type="area"
          height={500}
          style={{ minWidth: '500px' }}
        />
      </S.ChartWrapper>

      <S.TimePeriodWrapper>
        <S.TimelineButtonsWrapper>
          {Object.keys(TimelineEnum).map(timelineKey => {
            const timeline =
              TimelineEnum[timelineKey as keyof typeof TimelineEnum];

            return (
              <S.TimelineButton
                key={timelineKey}
                active={timeline === selection}
                onClick={() => updateData(timeline)}
              >
                {timelineKey}
              </S.TimelineButton>
            );
          })}
        </S.TimelineButtonsWrapper>
      </S.TimePeriodWrapper>
    </>
  );
};
