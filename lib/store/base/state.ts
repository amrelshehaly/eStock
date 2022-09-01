import {derived} from 'overmind' 

export type stock = {
  ticker: string;
  name: string;
};

export interface positions {
  start:number
  end:number
}

export type Stocks = {
  count: number;
  next_url: string;
  results: any[];
  index: positions
  memory: any[]
  currentPage: number
};

export const state: Stocks = {
  next_url: "",
  count: 0,
  currentPage:0,
  results: [],
  memory : [],
  index: {
    start: 0,
    end: 16,
  },
};
