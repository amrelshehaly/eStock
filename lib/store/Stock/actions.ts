import { IAppContext } from '@lib/store'
import { Stock } from '@lib/models/stock.interface'

export const GetAllStocks = async ({ state, actions, effects }: IAppContext) => {
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

export const SearchForStock = async ({ state, actions, effects }: IAppContext) => {
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
        console.error(err)
        state.base.error = err.response.data.error
        actions.base.ToggleLoading()
      })
  } else {
    state.base.startSearching = false
  }
}

export const LoadMoreStocks = async ({ state, actions, effects }: IAppContext) => {
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
      setTimeout(async () => {
        await actions.Stock.LoadMoreStocks()
        await actions.base.ToggleLoading()
      }, 35000)

      console.error(err)
    })
}

export const SetArrayConcat = async ({ state }: IAppContext, value: Stock) => {
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
