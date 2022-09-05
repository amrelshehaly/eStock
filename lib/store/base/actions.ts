import { IAppContext } from '@lib/store'
import { rehydrate } from 'overmind'
import { Stock } from '@lib/models/stock.interface'
import axios from 'axios'

export const onInitializeOvermind = async () => {
  /**
   * Use effects and other actions onInitialize
   */

  return await axios.get<Stock>(process.env.NEXT_PUBLIC_GETALLSTOCKS + '')
}

export const ClearResults = async ({ state }: IAppContext, value: any) => {
  state.stock.results = []
  state.base.memory = []
  state.base.count = 0
  state.base.currentPage = 0
  state.base.index = {
    start: 0,
    end: 16,
  }
}

export const NextPage = async ({ state, actions }: IAppContext, value: any) => {
  if (state.base.currentPage != state.base.count) {
    state.base.currentPage = state.base.currentPage + 1
    state.base.index.start = state.base.currentPage * 16
    state.base.index.end = state.base.currentPage * 16 + 16
    const a = state.base.memory.slice(state.base.index.start, state.base.index.end)
    state.stock.results = [...a]
  } else {
    await actions.Stock.LoadMoreStocks()
    state.base.count = state.base.count + 1
    state.base.currentPage = state.base.count
    console.log('next button loading more....')
  }
}

export const PrevPage = ({ state }: IAppContext, value: any) => {
  state.base.currentPage = state.base.currentPage - 1
  state.base.index.start = state.base.currentPage * 16
  state.base.index.end = state.base.currentPage * 16 + 16
  const a = state.base.memory.slice(state.base.index.start, state.base.index.end)
  if (a.length > 0) {
    state.stock.results = a
  }
}

export const ChangeStartSearching = async ({ state, actions }: IAppContext) => {
  if (state.base.search.length > 0) {
    state.base.startSearching = true
    await actions.base.ClearResults()
    await actions.Stock.SearchForStock()
  } else {
    state.base.startSearching = false
  }
}

export const SetSearching = async ({ state, actions }: IAppContext, value = '') => {
  if (value.length > 0) {
    state.base.search = value
  } else if (state.base.startSearching == true) {
    state.base.startSearching = false
    state.base.search = ''
    await actions.base.ClearResults()
    await actions.Stock.GetAllStocks()
  }
}

export const ChangePageValue = async ({ state, actions }: IAppContext) => {
  if (state.base.page == 'Home') {
    state.base.page = 'Stock Details'
  } else {
    state.base.page = 'Home'
  }
}

export const ResetErrorMsg = async ({ state }: IAppContext) => {
  state.base.error = ''
}

export const ToggleLoading = ({ state }: IAppContext) => {
  state.base.loading = !state.base.loading
}

export const changePage = ({ state }: IAppContext, mutations: any) => {
  rehydrate(state, mutations || [])
}
