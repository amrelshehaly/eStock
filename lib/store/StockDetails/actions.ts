import { IAppContext } from '@lib/store'
import * as R from 'ramda'
import { PreviousClose, StockDetails } from '@lib/models/stockdetails.interface'


export const getTickerDetails = async ({ state, actions, effects }: IAppContext, ticker: string) => {
    actions.base.ToggleLoading()
    await  effects.StockDetails.api.getTickerDetails(ticker)
    .then(async (res) => {
      const results: StockDetails | undefined = R.path(['results'], res)
      if (results) {
        state.stockDetails.ticker = results.ticker
        state.stockDetails.name = results.name
        state.stockDetails.sic_description = results.sic_description
        state.stockDetails.description = results.description
        state.stockDetails.homepage_url = results.homepage_url
        if (results.branding) {
          await actions.StockDetails.getImageURL(results.branding?.logo_url as string)
        }
      }

      await actions.base.ToggleLoading()

    })
    .catch((err) => {
      actions.base.ToggleLoading()
      state.base.error = err.response.data.error
    })
}

export const getPreviousClose = async ({ state, actions, effects }: IAppContext, ticker: string) => {
    actions.base.ToggleLoading()
    await effects.StockDetails.api.getPreviousClose(ticker)
    .then((res) => {
      const results: PreviousClose | undefined = R.path(['results', '0'], res)
      if (results) {
        state.previousClose.c = results.c
        state.previousClose.l = results.l
        state.previousClose.h = results.h
        state.previousClose.o = results.o
      }
      actions.base.ToggleLoading()
    })
    .catch((err) => {
      actions.base.ToggleLoading()
      state.base.error = err.response.data.error
      console.error(err)
    })
}

export const ClearStockDetails = ({ state }: IAppContext) => {
  state.stockDetails.name = ''
  state.stockDetails.description = ''
  state.stockDetails.sic_description = ''
  state.stockDetails.ticker = ''
  state.stockDetails.homepage_url = ''
  state.stockDetails.branding.icon_url = ''
  state.stockDetails.branding.logo_url = ''
}

export const ClearPreviousClose = async ({ state }: IAppContext) => {
  state.previousClose.c = 0
  state.previousClose.h = 0
  state.previousClose.l = 0
  state.previousClose.o = 0
}

export const ShowAllDetails = async ({ state, actions }: IAppContext, ticker: string) => {
  try {
    await actions.base.ResetErrorMsg()
    await actions.StockDetails.ClearPreviousClose()
    await actions.StockDetails.ClearStockDetails()
    await actions.StockDetails.getTickerDetails(ticker)
    await actions.StockDetails.getPreviousClose(ticker)
    if (state.base.error.length == 0) {
      await actions.base.ChangePageValue()
    }
  } catch (error) {
    console.error(error)
  }
}

export const getImageURL = async ({ state, actions, effects }: IAppContext, url: string) => {
  actions.base.ToggleLoading()
    
    await effects.StockDetails.api.getTickerPicture(url)
    .then((res) => {
      const data = `data:${res.headers['content-type']};base64,${new Buffer(res.data, 'binary').toString('base64')}`
      // StockDetailsState.branding.icon_url = data
      state.stockDetails.branding.logo_url = data
      actions.base.ToggleLoading()
    })
    .catch((err) => {
      actions.base.ToggleLoading()
      state.base.error = err.response.data.error
      console.error(err)
    })
}
