import { convert } from 'html-to-text';

export const htmlToText = (htmlString: string): string => convert(htmlString);
