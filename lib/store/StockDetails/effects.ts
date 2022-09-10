import axios from 'axios'
import { StockDetails, PreviousClose } from '@lib/models/stockdetails.interface'
const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_APIKEY}`,
}
export const api = {
  getTickerDetails: async (ticker: string): Promise<StockDetails> => { // get ticker details api
    const response = await axios.get<StockDetails>(`${process.env.NEXT_PUBLIC_DOMAIN}/v3/reference/tickers/${ticker}`, { headers })
    return response.data
  },
  getPreviousClose: async (ticker: string): Promise<PreviousClose> => { // get ticker's previous close
    const response = await axios.get<PreviousClose>(`${process.env.NEXT_PUBLIC_DOMAIN}/v2/aggs/ticker/${ticker}/prev`, { headers })
    return response.data
  },
  getTickerPicture: async (url:string): Promise<any> => { // get tickers logo or picture
    const response =  await axios.get(`${url}`, {headers,responseType: 'arraybuffer',})
    return response
  },
}
