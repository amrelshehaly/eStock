import { IAppContext } from "@lib/store";
import { rehydrate } from "overmind";
import { state, Stocks } from "./state"
import axios from 'axios'

export const onInitializeOvermind = async () => {
  /**
   * Use effects and other actions onInitialize
   */
  return await axios.get<Stocks>(`${process.env.GETALLORDERS}`)
};

export const LoadMoreStocks = async ({ state }:IAppContext, value:any) => {
  await axios.get<Stocks>(`${process.env.GETALLORDERS}`).then((res)=>{
    state.next_url = res.data.next_url
    state.memory = state.memory.concat(res.data.results)
    state.results = state.results.concat(res.data.results)
    console.log('this is more states',res.data.results)
  })
}

export const ClearResults = async ({ state }:IAppContext, value:any) => {
  state.results = []
}

export const NextPage = ({ state }:IAppContext, value:any) =>{
  state.count += 1

}

export const PrevPage = ({ state }:IAppContext, value:any) =>{
  state.count -= 1

}

export const changePage = ({ state }: IAppContext, mutations: any) => {
  rehydrate(state, mutations || []);
};

