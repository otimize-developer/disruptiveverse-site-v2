export type FormatValueProps = {
  value: number | string;
  locale?: string;
  options?: Intl.NumberFormatOptions;
};

const DEFAULT_OPTIONS: Intl.NumberFormatOptions = {
  notation: 'compact',
  maximumFractionDigits: 2,
};

export const formatValue = ({
  locale = 'pt-BR',
  options = {},
  value,
}: FormatValueProps) => {
  const formatter = Intl.NumberFormat(locale, {
    ...DEFAULT_OPTIONS,
    ...options,
  });

  return formatter.format(Number(value));
};
