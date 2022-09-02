import { IAppContext } from "@lib/store";
import { rehydrate } from "overmind";
import { state, Stocks } from "./state";
import axios from "axios";

export const onInitializeOvermind = async () => {
  /**
   * Use effects and other actions onInitialize
   */

  return await axios.get<Stocks>(process.env.NEXT_PUBLIC_GETALLSTOCKS + "");
};

export const GetAllStocks = async ({ state }: IAppContext) => {
  await axios
  .get<Stocks>(process.env.NEXT_PUBLIC_GETALLSTOCKS + "")
  .then((res) => {
    console.log("Loading more");
    state.next_url = res.data.next_url;
    if (state.results.length < 16) {
      state.results = state.results.concat(res.data.results);
    } else {
      state.results = res.data.results;
    }
    // state.results = state.results.concat(res.data.results)
    if (state.results.length == 16) {
      state.memory = [... new Set(state.memory.concat(state.results))];
    }

    // console.log('this is more states',res.data.results)
  })
  .catch((err) => {
    console.log(err);
  });
}

export const SearchForStock = async ({ state }: IAppContext) => {

  if(state.search.length > 0 ){
    await axios
    .get<Stocks>(
      `https://api.polygon.io/v3/reference/tickers?search=${state.search}&active=true&sort=ticker&order=asc&limit=8&apiKey=1Ix_pEbbGO6q5wt_9vzk69eSceoI7QNj`
    )
    .then((res) => {
      console.log("Loading more");
      state.next_url = res.data.next_url;
      if (state.results.length < 16) {
        state.results = state.results.concat(res.data.results);
      } else {
        state.results = res.data.results;
      }
      if (state.results.length == 16) {
        state.memory = [... new Set(state.memory.concat(state.results))];
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
  }else{
    state.startSearching = false
  }
};

export const LoadMoreStocks = async ({ state }: IAppContext, value: any) => {
  await axios
    .get<Stocks>(state.next_url + process.env.NEXT_PUBLIC_SELECTIONQUERY+'')
    .then((res) => {
      console.log("Loading more");
      state.next_url = res.data.next_url;
      if (state.results.length < 16) {
        state.results = state.results.concat(res.data.results);
      } else {
        state.results = res.data.results;
      }
      // state.results = state.results.concat(res.data.results)
      if (state.results.length == 16) {
        state.memory = [... new Set(state.memory.concat(state.results))];
      }

      // console.log('this is more states',res.data.results)
    })
    .catch((err) => {
      console.log(err);
    });
};

export const ClearResults = async ({ state }: IAppContext, value: any) => {
  state.results = [];
  state.memory = []
};

export const NextPage = async ({ state, actions }: IAppContext, value: any) => {

  if (state.currentPage != state.count) {
    state.currentPage = state.currentPage + 1;
    state.index.start = state.currentPage * 16;
    state.index.end = state.currentPage * 16 + 16;
    const a = state.memory.slice(state.index.start, state.index.end);
    state.results = [...a];
  } else {
    state.count = state.count + 1;
    state.currentPage = state.count;
    console.log("next button loading more....");
    await actions.LoadMoreStocks();
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
};

export const PrevPage = ({ state }: IAppContext, value: any) => {
  state.currentPage = state.currentPage - 1;
  state.index.start = state.currentPage * 16;
  state.index.end = state.currentPage * 16 + 16;
  const a = state.memory.slice(state.index.start, state.index.end);
  if (a.length > 0) {
    state.results = a;
  }

  // if(state.count == state.currentPage){
  //   state.count = state.count + 1
  // }
};

export const ChangeStartSearching = async ({ state, actions }: IAppContext) => {
  if(state.search.length > 0){
    state.startSearching = true
    await actions.ClearResults()
    await actions.SearchForStock()
  }else{  
    state.startSearching = false
  }
} 

export const SetSearching = async ({ state,actions }: IAppContext, value:string = '') => {
  if(value.length > 0){
    state.search = value
  }else if (state.startSearching == true) {
    state.startSearching = false
    await actions.ClearResults()
    await actions.GetAllStocks()
  }
}


export const changePage = ({ state }: IAppContext, mutations: any) => {
  rehydrate(state, mutations || []);
};
