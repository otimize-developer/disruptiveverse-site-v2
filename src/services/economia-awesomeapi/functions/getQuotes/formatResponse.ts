import { Quotes } from '~/interfaces/quote.interface';

import { Quote as ApiQuote } from '../../interfaces/quote.interface';

export const formatResponse = (quotes: {
  [pair: string]: ApiQuote;
}): Quotes => {
  const formattedQuotes: Quotes = {};

  Object.keys(quotes).forEach(key => {
    const formatKey = key.replace(quotes[key].code, `${quotes[key].code}-`);

    formattedQuotes[formatKey] = {
      codein: quotes[key].codein,
      code: quotes[key].code,
      name: quotes[key].name,
      ask: quotes[key].ask,
      bid: quotes[key].bid,
    };
  });

  return formattedQuotes;
};
