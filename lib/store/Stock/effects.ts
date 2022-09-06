import axios from 'axios'
import {Stock} from '@lib/models/stock.interface'

const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_APIKEY}`,
  }

export const api = {
    getTickers: async (): Promise<Stock> => {
        const response = await axios.get<Stock>(`${process.env.NEXT_PUBLIC_GETALLSTOCKS}`, { headers })
        return response.data
    },
    searchForTicker: async (search:string) : Promise<Stock> => {
        const response = await axios.get<Stock>(`${process.env.NEXT_PUBLIC_GETALLSTOCKS}&search=${search}`,{ headers })
        return response.data
    },
    getNextItems : async (nextUrl:string) : Promise<Stock> => {
        const response  = await axios.get<Stock>(nextUrl+'&limit=8',{ headers })
        return response.data
    },
}
