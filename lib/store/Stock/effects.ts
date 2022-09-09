import axios from 'axios'
import {Stock} from '@lib/models/stock.interface'

const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_APIKEY}`,
  }

export const api = {
    getTickers: async (): Promise<Stock> => { // this api loads the first 8 tickers onIntilaizing the app or when the textfield search is cleared
        const response = await axios.get<Stock>(`${process.env.NEXT_PUBLIC_DOMAIN}/v3/reference/tickers?active=true&sort=ticker&limit=8`, { headers })
        return response.data
    },
    searchForTicker: async (search:string) : Promise<Stock> => { // this method search for a specefic ticker in the search TextField
        const response = await axios.get<Stock>(`${process.env.NEXT_PUBLIC_DOMAIN}/v3/reference/tickers?active=true&sort=ticker&limit=8&search=${search}`,{ headers })
        return response.data
    },
    getNextItems : async (nextUrl:string) : Promise<Stock> => { // This method loads more 8  tickers and its is called on mext button or when scrolling down in the list
        const response  = await axios.get<Stock>(nextUrl+'&limit=8',{ headers })
        return response.data
    },
}
