import { IAppContext } from '@lib/store'
import { Stock } from '@lib/models/stock.interface'

export const GetAllStocks = async ({ state, actions, effects }: IAppContext) => { // this method gets all stocks from the api 
  actions.base.ToggleLoading()
   
    await effects.Stock.api.getTickers()
    .then((res) => {
      if (res) {
        actions.Stock.SetArrayConcat(res)
      }
      actions.base.ToggleLoading()
    })
    .catch((err) => {
      state.base.error = err.response.data.error
      actions.base.ToggleLoading()
      console.error(err)
    })
}

export const SearchForStock = async ({ state, actions, effects }: IAppContext) => { // This method is called to  search for a specefic ticker from the inputField
  if (state.base.search.length > 0) {
      actions.base.ToggleLoading()
      await effects.Stock.api.searchForTicker(state.base.search)
      .then((res) => {
        if (res) {
          actions.Stock.SetArrayConcat(res)
        }
        actions.base.ToggleLoading()
      })
      .catch((err: any) => {
        state.base.error = err.response.data.error
        const timer = setTimeout(async () => {              // I mad a setTimeout to ensure consistency in project flow as the api requires an upgrade to 
                                                            // make serveral consecutive request with no time limits
          await actions.Stock.SearchForStock()
          await actions.base.ToggleLoading()
          }, 30000)
          console.error(err)
          return () => clearTimeout(timer)   
      })
  } else {
    state.base.startSearching = false
  }
}

export const LoadMoreStocks = async ({ state, actions, effects }: IAppContext) => { // This method is triggered when user wishes to load more tickers from the BE, 
                                                                                    // as it reterns 8 by 8 tickers 
  actions.base.ToggleLoading()
   
    await effects.Stock.api.getNextItems(state.stock.next_url)
    .then((res) => {
      if (res) {
        actions.Stock.SetArrayConcat(res)
      }
      actions.base.ResetErrorMsg()
      actions.base.ToggleLoading()
    })
    .catch((err) => {
      state.base.error = err.response.data.error
      console.error(err)
      const timer = setTimeout(async () => {              // I mad a setTimeout to ensure consistency in project flow as the api requires an upgrade to 
                                                          // make serveral consecutive request with no time limits
        await actions.Stock.LoadMoreStocks()
        await actions.base.ToggleLoading()
      }, 30000)

      return () => clearTimeout(timer)   
    })
}

export const SetArrayConcat = async ({ state }: IAppContext, value: Stock) => {  // This method is used to fetch the new results in the results state and 
                                                                                  //concatenate the previous results into the memory state
  state.stock.next_url = value.next_url
  if (state.stock.results.length < 16) {
    state.stock.results = state.stock.results.concat(value.results)
  } else {
    state.stock.results = value.results
  }
  if (state.stock.results.length == 16) {
    state.base.memory = [...new Set(state.base.memory.concat(state.stock.results))]
  }
}
