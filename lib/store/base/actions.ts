import { IAppContext } from "@lib/store";
import { rehydrate } from "overmind";
import { state, Stocks } from "./state"
import axios from 'axios'

export const onInitializeOvermind = async () => {
  /**
   * Use effects and other actions onInitialize
   */

  return await axios.get<Stocks>(process.env.NEXT_PUBLIC_GETALLSTOCKS+'')
};

export const LoadMoreStocks = async ({ state }:IAppContext, value:any) => {
  await axios.get<Stocks>(state.next_url+process.env.NEXT_PUBLIC_SELECTIONQUERY+'').then((res)=>{
    console.log("Loading more")
    state.next_url = res.data.next_url
    if(state.results.length < 16){
      state.results = state.results.concat(res.data.results)
    }else{
      state.results = res.data.results
    }
    // state.results = state.results.concat(res.data.results)
    if(state.results.length == 16){
      state.memory = state.memory.concat(state.results)
    }
    
    // console.log('this is more states',res.data.results)
  }).catch((err)=>{
    console.log(err)
  })
}

export const ClearResults = async ({ state }:IAppContext, value:any) => {
  state.results = []
}

export const NextPage = async ({ state, actions }:IAppContext, value:any) =>{
  

  if ( state.currentPage != state.count){
    state.currentPage = state.currentPage + 1
    state.index.start = state.currentPage * 16
    state.index.end = (state.currentPage * 16) + 16
    const a = state.memory.slice(state.index.start, state.index.end)
    state.results  = [...a]
  }else{
    state.count = state.count + 1
    state.currentPage = state.count
    console.log('next button loading more....')
    await actions.LoadMoreStocks()
  }

  // state.index.start = state.count * 16
  // state.index.end = (state.count * 16) + 16
  // const a = state.memory.slice(state.index.start, state.index.end) 
  // console.log("this is the page indexs",state.index.start, state.index.end)
  // if (a.length > 0){
  //   console.log("adding a in the results")
  //   state.results  = [...a]
  // }else{
  //   console.log("not in nextpage")
  // }
  
}

export const PrevPage = ({ state }:IAppContext, value:any) =>{
  state.currentPage = state.currentPage - 1
  state.index.start = state.currentPage * 16
  state.index.end = (state.currentPage * 16) + 16
  const a = state.memory.slice(state.index.start, state.index.end)
  if (a.length > 0){
    state.results  = a
  }

  // if(state.count == state.currentPage){
  //   state.count = state.count + 1
  // }
 
}

export const changePage = ({ state }: IAppContext, mutations: any) => {
  rehydrate(state, mutations || []);
};

