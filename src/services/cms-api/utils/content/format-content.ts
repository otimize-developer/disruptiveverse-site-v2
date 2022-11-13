import type { Content } from '../../types/content';

type FormatContentProps = {
  content: Content[];
  parentId: number;
};

export const removeUnwantedContent = (richText: string) =>
  richText
    .replace(/style="[^"]*"/g, '')
    .replace(/<br>/g, '')
    .replace(/<p> <\/p>/g, '')
    .replace(/<p>&nbsp;<\/p>/g, '')
    .replace(/<p><br><\/p>/g, '')
    .replace(/<font/g, '<span')
    .replace(/<\/font/g, '</span')
    .replace(/(<(?!\/)[^>]+>)+(<\/[^>]+>)+/g, '');

export const formatContent = ({
  content = [],
  parentId,
}: FormatContentProps): Content[] => {
  const formattedContent: Content[] = content.map(component => ({
    ...component,
    id: `${parentId}-${component.id}-${component.__component}`,
    ...(component.__component === 'primary.rich-text'
      ? { rich_text: removeUnwantedContent(component.rich_text) }
      : {}),
  }));

  return formattedContent;
};
