type DifferenceInSecondsOptions = {
  abs?: boolean;
};

interface DateOptions extends Intl.DateTimeFormatOptions {
  showTimeDifference?: boolean;
}

type FormatDate = {
  date?: Date | string | null;
  locale?: string;
  dateOptions?: DateOptions;
};

export enum TimelineEnum {
  '7D' = 'one_week',
  '1M' = 'one_month',
  '3M' = 'three_months',
  '6M' = 'six_months',
  '1Y' = 'one_year',
  '3Y' = 'three_years',
  '5Y' = 'five_years',
  'YTD' = 'ytd',
}

export const differenceInSeconds = (
  firstDate: Date,
  secondDate: Date,
  options?: DifferenceInSecondsOptions,
): number => {
  const seconds = (firstDate.getTime() - secondDate.getTime()) / 1000;

  if (options?.abs) {
    return Math.abs(seconds);
  }

  return seconds;
};

export const isValidDate = (date: Date) =>
  // eslint-disable-next-line no-restricted-globals
  date instanceof Date && !isNaN(date.valueOf());

export const timeDifference = ({
  firstDate,
  secondDate,
}: {
  firstDate: Date;
  secondDate: Date;
}) => {
  const seconds = differenceInSeconds(firstDate, secondDate, { abs: true });
  const minutes = parseInt(String(seconds / 60), 10) || 1;

  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
  }

  const hours = parseInt(String(minutes / 60), 10) || 1;

  return `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
};

export const formatDate = ({
  date: providedDate,
  locale = 'pt-BR',
  dateOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    showTimeDifference: false,
  },
}: FormatDate) => {
  let date = providedDate;

  if (typeof date === 'string') {
    date = new Date(date);
  }

  if (!isValidDate(date as Date)) {
    return '';
  }

  const differenceSeconds = differenceInSeconds(date as Date, new Date(), {
    abs: true,
  });

  if (!dateOptions.showTimeDifference || differenceSeconds >= 86400) {
    return date?.toLocaleDateString(locale, dateOptions);
  }

  return timeDifference({
    firstDate: date as Date,
    secondDate: new Date(),
  });
};

export const timelineDate = (timelineOption: TimelineEnum) => {
  const currentDate = new Date();

  if (timelineOption === TimelineEnum['7D']) {
    return new Date().setDate(currentDate.getDate() - 7);
  }

  if (timelineOption === TimelineEnum['1M']) {
    return new Date().setMonth(currentDate.getMonth() - 1);
  }

  if (timelineOption === TimelineEnum['3M']) {
    return new Date().setMonth(currentDate.getMonth() - 3);
  }

  if (timelineOption === TimelineEnum['6M']) {
    return new Date().setMonth(currentDate.getMonth() - 6);
  }

  if (timelineOption === TimelineEnum['1Y']) {
    return new Date().setMonth(currentDate.getMonth() - 12);
  }

  if (timelineOption === TimelineEnum['3Y']) {
    return new Date().setMonth(currentDate.getMonth() - 36);
  }

  if (timelineOption === TimelineEnum['5Y']) {
    return new Date().setMonth(currentDate.getMonth() - 60);
  }

  if (timelineOption === TimelineEnum.YTD) {
    return new Date(currentDate.getFullYear(), 0, 1).getTime();
  }

  throw new Error('Invalid timeline');
};
