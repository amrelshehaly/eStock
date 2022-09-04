import { IAppContext } from "@lib/store";
import { rehydrate } from "overmind";
import { state, Stocks } from "./state";
import axios from "axios";
import { action } from "overmind/lib/operator";

export const onInitializeOvermind = async () => {
  /**
   * Use effects and other actions onInitialize
   */

  return await axios.get<Stocks>(process.env.NEXT_PUBLIC_GETALLSTOCKS + "");
};

export const GetAllStocks = async ({ state, actions }: IAppContext) => {
  actions.ToggleLoading()
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
    actions.ToggleLoading()

  })
  .catch((err) => {
    actions.ToggleLoading()
    console.log(err);
  });
}

export const SearchForStock = async ({ state, actions }: IAppContext) => {
  if(state.search.length > 0 ){
    actions.ToggleLoading()
    await axios
    .get<Stocks>(
      `${process.env.NEXT_PUBLIC_GETALLSTOCKS}&search=${state.search}`
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
      actions.ToggleLoading()
    })
    .catch((err: any) => {
      console.log(err);
      actions.ToggleLoading()
    });
  }else{
    state.startSearching = false
  }
};

export const LoadMoreStocks = async ({ state, actions }: IAppContext, value: any) => {
  actions.ToggleLoading()
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

      actions.ToggleLoading()

      // console.log('this is more states',res.data.results)
    })
    .catch((err) => {
      actions.ToggleLoading()
      console.log(err);
    });
};

export const ClearResults = async ({ state }: IAppContext, value: any) => {
  state.results = [];
  state.memory = []
  state.count = 0
  state.currentPage = 0
  state.index = {
    start:0,
    end : 16
  }
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

};

export const PrevPage = ({ state }: IAppContext, value: any) => {
  state.currentPage = state.currentPage - 1;
  state.index.start = state.currentPage * 16;
  state.index.end = state.currentPage * 16 + 16;
  const a = state.memory.slice(state.index.start, state.index.end);
  if (a.length > 0) {
    state.results = a;
  }

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
    state.search = ''
    await actions.ClearResults()
    await actions.GetAllStocks()
  }
}

export const ChangePageValue = async ({ state, actions }: IAppContext) => {
  if (state.page == 'Home'){
    state.page = 'Stock Details'
  }else{
    actions.ClearPreviousClose()
    actions.ClearStockDetails()
    state.page = 'Home'
  }
  console.log(state.page)

}

export const ToggleLoading = ({ state }: IAppContext) => {
  state.loading = !state.loading
}


export const changePage = ({ state }: IAppContext, mutations: any) => {
  rehydrate(state, mutations || []);
};
