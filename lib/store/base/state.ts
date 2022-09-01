export type stock = {
  ticker: string;
  name: string;
};

export type Stocks = {
  count: number;
  next_url: string;
  results: any[];
  index: Record<string, number>;
  memory: any[]
};

export const state: Stocks = {
  next_url: "",
  count: 0,
  results: [],
  memory : [],
  index: {
    start: 0,
    end: 16,
  },
};
