import axios from "axios";
import { IAppContext } from "@lib/store";
import {Stock} from '@lib/models/stock.interface'

export const GetAllStocks = async ({ state, actions }: IAppContext) => {
    actions.base.ToggleLoading()
    await axios
    .get<Stock>(process.env.NEXT_PUBLIC_GETALLSTOCKS + "")
    .then((res) => {
      console.log("Loading more");
      state.stock.next_url = res.data.next_url;
      if (state.stock.results.length < 16) {
        state.stock.results = state.stock.results.concat(res.data.results);
      } else {
        state.stock.results = res.data.results;
      }
      // state.stock.results = state.stock.results.concat(res.data.results)
      if (state.stock.results.length == 16) {
        state.base.memory = [... new Set(state.base.memory.concat(state.stock.results))];
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
        state.stock.next_url = res.data.next_url;
        if (state.stock.results.length < 16) {
          state.stock.results = state.stock.results.concat(res.data.results);
        } else {
          state.stock.results = res.data.results;
        }
        if (state.stock.results.length == 16) {
          state.base.memory = [... new Set(state.base.memory.concat(state.stock.results))];
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

  export const LoadMoreStocks = async ({ state, actions }: IAppContext, value: any) => {
    actions.base.ToggleLoading()
    await axios
      .get<Stock>(state.stock.next_url + process.env.NEXT_PUBLIC_SELECTIONQUERY+'')
      .then((res) => {
        console.log("Loading more");
        if(res){
            state.stock.next_url = res.data.next_url;
            if (state.stock.results.length < 16) {
            state.stock.results = state.stock.results.concat(res.data.results);
            } else {
                state.stock.results = res.data.results;
            }
            // state.results = state.results.concat(res.data.results)
            if (state.stock.results.length == 16) {
            state.base.memory = [... new Set(state.base.memory.concat(state.stock.results))];
            }
        }
        
  
        actions.base.ToggleLoading()
  
        // console.log('this is more states',res.data.results)
      })
      .catch((err) => {
        state.base.error = err.response.data.error
        setTimeout(async ()=>{
            await actions.Stock.LoadMoreStocks()
            await actions.base.ToggleLoading()
        },30000)
        
        console.log(err);
      });
  };