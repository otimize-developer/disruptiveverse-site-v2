import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { PrimaryRichText as PrimaryRichTextProps } from '~/services/cms-api/types/components/primary';

export const PrimaryRichText = (primaryRichText: PrimaryRichTextProps) => (
  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
    {primaryRichText.rich_text}
  </ReactMarkdown>
);
