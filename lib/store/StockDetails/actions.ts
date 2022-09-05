import { IAppContext } from "@lib/store";
import axios from "axios";
import * as R from 'ramda'
import {PreviousClose, StockDetails} from '@lib/models/stockdetails.interface'


    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_APIKEY}`
    }


export const getTickerDetails = async ({state, actions}:IAppContext, ticker:string) =>{
    actions.base.ToggleLoading()
    await axios.get<StockDetails>(`https://api.polygon.io/v3/reference/tickers/${ticker}`,{headers}).then(async ({data})=>{
        const results : StockDetails | undefined =  R.path(['results'], data)
        if(results){
            state.stockDetails.ticker = results.ticker
            state.stockDetails.name = results.name
            state.stockDetails.sic_description = results.sic_description
            state.stockDetails.description = results.description
            state.stockDetails.homepage_url = results.homepage_url
            if(results.branding){
            // await actions.getImageURL((results.branding?.icon_url) as string)
            await actions.StockDetails.getImageURL((results.branding?.logo_url) as string)
        }
        }
        
        await actions.base.ToggleLoading()
        // StockDetailsState.branding.icon_url = results.branding?.icon_url
        // StockDetailsState.branding.logo_url = results.branding?.logo_url
    }).catch((err)=>{
        actions.base.ToggleLoading()
        state.base.error = err.response.data.error
        console.log("GETTICKERSERROR",err)
    })
}


export const getPreviousClose = async ({state, actions}:IAppContext, ticker:string) => {
    actions.base.ToggleLoading()
    await axios.get<PreviousClose>(`https://api.polygon.io/v2/aggs/ticker/${ticker}/prev`,{headers}).then(({data})=>{
        const results : PreviousClose | undefined = R.path(['results','0'],data)
        if(results){
            state.previousClose.c = results.c
            state.previousClose.l = results.l
            state.previousClose.h = results.h
            state.previousClose.o = results.o
        }
        actions.base.ToggleLoading()
    }).catch((err)=>{
        actions.base.ToggleLoading()
        state.base.error = err.response.data.error
        console.log(err)
    })
}


export const ClearStockDetails = ({state}:IAppContext) =>{
    state.stockDetails.name =''
    state.stockDetails.description = ''
    state.stockDetails.sic_description = ''
    state.stockDetails.ticker = ''
    state.stockDetails.homepage_url = ''
    state.stockDetails.branding.icon_url = ''
    state.stockDetails.branding.logo_url = ''

}

export const ClearPreviousClose = async ({state}:IAppContext) =>{

    state.previousClose.c = 0
    state.previousClose.h = 0
    state.previousClose.l = 0
    state.previousClose.o = 0

    // const keys = Object.keys(PreviosCLose) 
    //  for (let key in keys) {
    //     if (StockPreviousState.hasOwnProperty(key)) {
    //         StockPreviousState[key as keyof typeof StockPreviousState]  =  PreviosCLose[key as keyof typeof PreviosCLose] || 0
    //     }
    //   }

}

export const ShowAllDetails =  async ({state, actions}:IAppContext, ticker:string) =>{
    try {
        await actions.base.ResetErrorMsg()
        await actions.StockDetails.ClearPreviousClose()
        await actions.StockDetails.ClearStockDetails()
        await actions.StockDetails.getTickerDetails(ticker)
        await actions.StockDetails.getPreviousClose(ticker)
        if(state.base.error.length == 0){
            await actions.base.ChangePageValue()
        }
    } catch (error) {
        console.log(error)
    }

}

export const getImageURL = async ({state, actions}:IAppContext, url: string) =>{
    actions.base.ToggleLoading()
    await axios.get(`${url}`,{
        headers,
        responseType: "arraybuffer",
    }).then((res)=>{
        console.log('png ', res)
        let data = `data:${
            res.headers["content-type"]
          };base64,${new Buffer(res.data, "binary").toString("base64")}`;
        // StockDetailsState.branding.icon_url = data
        state.stockDetails.branding.logo_url = data
        actions.base.ToggleLoading()
    }).catch((err)=>{
        actions.base.ToggleLoading()
        state.base.error = err.response.data.error
        console.log(err)
    })
}
  