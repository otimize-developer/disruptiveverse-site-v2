export type AdvancedRealTimeChartEmbedProps = {
  symbol: string;
};

export function AdvancedRealTimeChartEmbed({
  symbol,
}: AdvancedRealTimeChartEmbedProps) {
  const source =
    `https://s.tradingview.com/widgetembed/?frameElementId=tradingview_208ab&amp;symbol=${symbol}&amp;interval=1&amp;hidesidetoolbar=0&amp;symboledit=1&amp;saveimage=1&amp;toolbarbg=f1f3f6&amp;studies=%5B%5D&amp;theme=light&amp;style=3&amp;timezone=UTC&amp;withdateranges=1&amp;studies_overrides=%7B%7D&amp;overrides=%7B%7D&amp;enabled_features=%5B%5D&amp;disabled_features=%5B%5D&amp;locale=en&amp;utm_source=disruptiveverse.com&amp;utm_medium=widget&amp;utm_campaign=chart&amp;utm_term=${symbol}`.replace(
      /&amp;/g,
      '&',
    );

  return (
    <iframe
      id="tradingview_208ab"
      src={source}
      frameBorder="0"
      scrolling="no"
      allowFullScreen
      title={`Gráfico ${symbol}`}
      loading="lazy"
    />
  );
}
