import { IAppContext } from "@lib/store";
import axios from "axios";
import { StockDetails, PreviousClose, StockDetailsState, StockPreviousState } from "./state";
import * as R from 'ramda'


    const headers = {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_APIKEY}`
    }


export const getTickerDetails = async ({state,actions}:IAppContext, ticker:string) =>{
    actions.ToggleLoading()
    await axios.get<StockDetails>(`https://api.polygon.io/v3/reference/tickers/${ticker}`,{headers}).then(async ({data})=>{
        const results : StockDetails =  R.path(['results'], data) || StockDetailsState
        StockDetailsState.ticker = results.ticker
        StockDetailsState.name = results.name
        StockDetailsState.sic_description = results.sic_description
        StockDetailsState.description = results.description
        StockDetailsState.homepage_url = results.homepage_url
        if(results.branding){
            // await actions.getImageURL((results.branding?.icon_url) as string)
            await actions.getImageURL((results.branding?.logo_url) as string)
        }
        await actions.ToggleLoading()
        // StockDetailsState.branding.icon_url = results.branding?.icon_url
        // StockDetailsState.branding.logo_url = results.branding?.logo_url
    }).catch((err)=>{
        actions.ToggleLoading()
        state.error = err.response.data.error
        console.log("GETTICKERSERROR",err)
    })
}


export const getPreviousClose = async ({state, actions}:IAppContext, ticker:string) => {
    actions.ToggleLoading()
    await axios.get<PreviousClose>(`https://api.polygon.io/v2/aggs/ticker/${ticker}/prev`,{headers}).then(({data})=>{
        const results : PreviousClose = R.path(['results','0'],data) || StockPreviousState
        StockPreviousState.c = results.c
        StockPreviousState.l = results.l
        StockPreviousState.h = results.h
        StockPreviousState.o = results.o
        actions.ToggleLoading()
    }).catch((err)=>{
        actions.ToggleLoading()
        state.error = err.response.data.error
        console.log(err)
    })
}


export const ClearStockDetails = () =>{
    StockDetailsState.name =''
    StockDetailsState.description = ''
    StockDetailsState.sic_description = ''
    StockDetailsState.ticker = ''
    StockDetailsState.homepage_url = ''
    StockDetailsState.branding.icon_url = ''
    StockDetailsState.branding.logo_url = ''

}

export const ClearPreviousClose = async () =>{

    StockPreviousState.c = 0
    StockPreviousState.h = 0
    StockPreviousState.l = 0
    StockPreviousState.o = 0

    // const keys = Object.keys(PreviosCLose) 
    //  for (let key in keys) {
    //     if (StockPreviousState.hasOwnProperty(key)) {
    //         StockPreviousState[key as keyof typeof StockPreviousState]  =  PreviosCLose[key as keyof typeof PreviosCLose] || 0
    //     }
    //   }
}

export const ShowAllDetails =  async ({state, actions}:IAppContext, ticker:string) =>{
    try {
        await actions.ResetErrorMsg()
        await actions.ClearPreviousClose()
        await actions.ClearStockDetails()
        await actions.getTickerDetails(ticker)
        await actions.getPreviousClose(ticker)
        if(state.error.length == 0){
            await actions.ChangePageValue()
        }
    } catch (error) {
        console.log("this is an error keber")
    }

}

export const getImageURL = async ({state, actions}:IAppContext, url: string) =>{
    actions.ToggleLoading()
    await axios.get(`${url}`,{
        headers,
        responseType: "arraybuffer",
    }).then((res)=>{
        console.log('png ', res)
        let data = `data:${
            res.headers["content-type"]
          };base64,${new Buffer(res.data, "binary").toString("base64")}`;
        // StockDetailsState.branding.icon_url = data
        StockDetailsState.branding.logo_url = data
        actions.ToggleLoading()
    }).catch((err)=>{
        actions.ToggleLoading()
        state.error = err.response.data.error
        console.log(err)
    })
}
  