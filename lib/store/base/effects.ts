import axios from 'axios'
import {Stock} from '@lib/models/stock.interface'

const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_APIKEY}`,
  }

export const api = {
    getTickers: async (): Promise<any> => {
        const response = await axios.get<Stock>(process.env.NEXT_PUBLIC_GETALLSTOCKS + '',{ headers })
        return response
    },
}
