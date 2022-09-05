import { derived } from 'overmind'
import { base } from '@lib/models/base.interface'
import { Stock } from '@lib/models/stock.interface'
import { StockDetails, PreviousClose } from '@lib/models/stockdetails.interface'

type Props = {
  base: base
  stock: Stock
  stockDetails: StockDetails
  previousClose: PreviousClose
}

export const state: Props = {
  base: {
    count: 0,
    currentPage: 0,
    error: '',
    index: {
      start: 0,
      end: 16,
    },
    loading: false,
    memory: [],
    page: 'Home',
    search: '',
    startSearching: false,
  },
  stock: {
    next_url: '',
    results: [],
  },
  stockDetails: {
    description: '',
    name: '',
    branding: {
      icon_url: '',
      logo_url: '',
    },
    sic_description: '',
    ticker: '',
    homepage_url: '',
  },
  previousClose: {
    c: 0,
    l: 0,
    h: 0,
    o: 0,
  },
}

// export interface ErrorHandling {
//   success: boolean;
//   error?: { message: string };
// }
