import { IAppContext } from '@lib/store'
import { rehydrate } from 'overmind'

export const onInitializeOvermind = async ({state, effects }: IAppContext) => {
  /**
   * Use effects and other actions onInitialize
   */
  await effects.Stock.api.getTickers().then((res) => {
    state.stock.results = res.results
    state.stock.next_url = res.next_url
  })
  .catch((err) => {
    console.error(err)
  })
}

export const ClearResults = async ({ state }: IAppContext) => {   // clearing the results to make a fresh new request with no params in the state
  state.stock.results = []
  state.base.memory = []
  state.base.count = 0
  state.base.currentPage = 0
  state.base.index = {
    start: 0,
    end: 16,
  }
}

export const NextPage = async ({ state, actions }: IAppContext) => {  // This method to slice the memory array into 16 elements to be able to render 16 elements in the page list.
  if (state.base.currentPage != state.base.count) {
    state.base.currentPage = state.base.currentPage + 1
    state.base.index.start = state.base.currentPage * 16
    state.base.index.end = state.base.currentPage * 16 + 16
    const a = state.base.memory.slice(state.base.index.start, state.base.index.end)
    state.stock.results = [...a]
  } else {                                                            // if the maximum pages is equal to the current page, then means user is fetching new ticker from the BE.
    await actions.Stock.LoadMoreStocks()
    state.base.count = state.base.count + 1
    state.base.currentPage = state.base.count
  }
}

export const PrevPage = ({ state }: IAppContext) => {  // this method  slices the previous 16 elements from memory array
  state.base.currentPage = state.base.currentPage - 1
  state.base.index.start = state.base.currentPage * 16
  state.base.index.end = state.base.currentPage * 16 + 16
  const a = state.base.memory.slice(state.base.index.start, state.base.index.end)
  if (a.length > 0) {
    state.stock.results = a
  }
}

export const ChangeStartSearching = async ({ state, actions }: IAppContext) => {  // This action is triggered when the user press Enter, in order to fetch the ticker in the searchbar
  if (state.base.search.length > 0) {
    state.base.startSearching = true
    await actions.base.ClearResults()
    await actions.Stock.SearchForStock()
  } else {
    state.base.startSearching = false
  }
}

export const SetSearching = async ({ state, actions }: IAppContext, value = '') => { // This method is triggered when the user make changes in the textfield
  state.base.search = value
  if (state.base.startSearching == true && state.base.search.length == 0) {   // If the user is removing ticker search till its blank, this method will call GetAllStocks to retrieve 
                                                                              // the tickers from the beginning
    state.base.startSearching = false
    state.base.search = ''
    await actions.base.ClearResults()
    await actions.Stock.GetAllStocks()
  }
}

export const ChangePageValue = async ({ state }: IAppContext) => { // This action is triggered to switch between home and Stock details pages
  if (state.base.page == 'Home') {
    state.base.page = 'Stock Details'
  } else {
    state.base.page = 'Home'
  }
}

export const ResetErrorMsg = async ({ state }: IAppContext) => { // reset the error message to be able to make a new request
  state.base.error = ''
}

export const ToggleLoading = ({ state }: IAppContext) => {  // This method toggles the loading spinner component
  state.base.loading = !state.base.loading
}

export const changePage = async ({ state, actions }: IAppContext, value: any[] = []) => {
  rehydrate(state, value || [])
}
