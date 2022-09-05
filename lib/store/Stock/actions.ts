import axios from "axios";
import { IAppContext } from "@lib/store";
import {Stock} from '@lib/models/stock.interface'

export const GetAllStocks = async ({ state, actions }: IAppContext) => {
    actions.base.ToggleLoading()
    await axios
    .get<Stock>(process.env.NEXT_PUBLIC_GETALLSTOCKS + "")
    .then((res) => {
      console.log("Loading more");
      if(res){
        actions.Stock.SetArrayConcat(res.data)
      }
      // console.log('this is more states',res.data.results)
      actions.base.ToggleLoading()
  
    })
    .catch((err) => {
        state.base.error = err.response.data.error
        actions.base.ToggleLoading()
        console.log(err);
    });
  }

  export const SearchForStock = async ({ state, actions }: IAppContext) => {
    if(state.base.search.length > 0 ){
        actions.base.ToggleLoading()
      await axios
      .get<Stock>(
        `${process.env.NEXT_PUBLIC_GETALLSTOCKS}&search=${state.base.search}`
      )
      .then((res) => {
        console.log("Loading more");
        if(res){
            actions.Stock.SetArrayConcat(res.data)
        }
        actions.base.ToggleLoading()
      })
      .catch((err: any) => {
        console.log(err);
        state.base.error = err.response.data.error
        actions.base.ToggleLoading()
      });
    }else{
      state.base.startSearching = false
    }
  };

  export const LoadMoreStocks = async ({ state, actions }: IAppContext) => {
    actions.base.ToggleLoading()
    await axios
      .get<Stock>(state.stock.next_url + process.env.NEXT_PUBLIC_SELECTIONQUERY+'')
      .then((res) => {
        console.log("Loading more");
        if(res){
            actions.Stock.SetArrayConcat(res.data)
        }
        actions.base.ResetErrorMsg()
        actions.base.ToggleLoading()
      })
      .catch((err) => {
        state.base.error = err.response.data.error
        setTimeout(async ()=>{
            await actions.Stock.LoadMoreStocks()
            await actions.base.ToggleLoading()
        },35000)
        
        console.log(err);
      });
  };

export const SetArrayConcat = async ({ state,actions }: IAppContext, value:Stock) => {
    state.stock.next_url = value.next_url;
    if (state.stock.results.length < 16) {
    state.stock.results = state.stock.results.concat(value.results);
    } else {
        state.stock.results = value.results;
    }
    if (state.stock.results.length == 16) {
    state.base.memory = [... new Set(state.base.memory.concat(state.stock.results))];
    }
}