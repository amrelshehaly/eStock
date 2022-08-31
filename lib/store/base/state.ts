export type stock = {
  ticker: string;
  name: string;
};

export type Stocks = {
  count: number;
  next_url: string;
  results: stock[];
};

export const state: Stocks = {
  next_url: "",
  count: 10,
  results: [],
};
