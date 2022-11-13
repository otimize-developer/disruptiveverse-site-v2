import { Quotes } from '~/interfaces/quote.interface';

import { economiaAwesomeApi } from '../../config';
import { Quote as ApiQuote } from '../../interfaces/quote.interface';
import { formatResponse } from './formatResponse';

type GetQuotesProps = {
  pairs: string[];
};

type ApiResponse = {
  [pair: string]: ApiQuote;
};

export const getQuotes = async ({ pairs }: GetQuotesProps): Promise<Quotes> => {
  const { data } = await economiaAwesomeApi.get<ApiResponse>(
    `/json/last/${pairs.join(',')}`,
  );

  const formattedQuotes = formatResponse(data);

  return formattedQuotes;
};
