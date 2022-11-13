import { useEffect, useState } from 'react';

import { Flex, Spinner } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

import { AdvancedRealTimeChartEmbedProps } from './AdvancedRealTimeChartEmbed';

const Loader = () => (
  <Flex justify="center" pt="2.75rem">
    <Spinner color="#0D2F73" />
  </Flex>
);

const AdvancedRealTimeChartEmbed = dynamic<AdvancedRealTimeChartEmbedProps>(
  () =>
    import('./AdvancedRealTimeChartEmbed').then(
      mod => mod.AdvancedRealTimeChartEmbed,
    ),
  {
    loading: () => <Loader />,
    ssr: false,
  },
);

export function AdvancedRealTimeChart(props: AdvancedRealTimeChartEmbedProps) {
  const [visibleChart, setVisibleChart] = useState(false);

  useEffect(() => {
    setVisibleChart(true);
  }, []);

  return visibleChart ? <AdvancedRealTimeChartEmbed {...props} /> : <Loader />;
}
