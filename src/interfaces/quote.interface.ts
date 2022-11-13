export type Quote = {
  code: string;
  codein: string;
  name: string;
  bid: string;
  ask: string;
};

export type Quotes = { [par: string]: Quote };
