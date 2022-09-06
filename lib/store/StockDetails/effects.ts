import axios from 'axios'
import { StockDetails, PreviousClose } from '@lib/models/stockdetails.interface'
const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_APIKEY}`,
}
export const api = {
  getTickerDetails: async (ticker: string): Promise<StockDetails> => {
    const response = await axios.get<StockDetails>(`https://api.polygon.io/v3/reference/tickers/${ticker}`, { headers })
    return response.data
  },
  getPreviousClose: async (ticker: string): Promise<PreviousClose> => {
    const response = await axios.get<PreviousClose>(`https://api.polygon.io/v2/aggs/ticker/${ticker}/prev`, { headers })
    return response.data
  },
  getTickerPicture: async (url:string): Promise<any> => {
    const response =  await axios.get(`${url}`, {headers,responseType: 'arraybuffer',})
    return response
  },
}
