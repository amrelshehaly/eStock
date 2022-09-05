interface StockProps {
  ticker: string
  name: string
}

export interface Stock {
  results: StockProps[]
  next_url: string
}
