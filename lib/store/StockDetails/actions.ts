import { IAppContext } from "@lib/store";
import axios from "axios";
import { StockDetails, PreviousClose, StockDetailsState, StockPreviousState } from "./state";
import * as R from 'ramda'



export const getTickerDetails = async ({actions}:IAppContext, ticker:string) =>{
    actions.ToggleLoading()
    await axios.get<StockDetails>(`https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=1Ix_pEbbGO6q5wt_9vzk69eSceoI7QNj`).then(async ({data})=>{
        const results : StockDetails =  R.path(['results'], data) || ClearStockDetails()
        StockDetailsState.ticker = results.ticker
        StockDetailsState.name = results.name
        StockDetailsState.sic_description = results.sic_description
        StockDetailsState.description = results.description
        StockDetailsState.homepage_url = results.homepage_url
        if(results.branding){
            await actions.getImageURL((results.branding?.icon_url) as string)
            await actions.getImageURL((results.branding?.logo_url) as string)
        }
        actions.ToggleLoading()
        // StockDetailsState.branding.icon_url = results.branding?.icon_url
        // StockDetailsState.branding.logo_url = results.branding?.logo_url
    }).catch((err)=>{
        actions.ToggleLoading()
        console.log(err)
    })
}


export const getPreviousClose = async ({actions}:IAppContext, ticker:string) => {
    actions.ToggleLoading()
    await axios.get<PreviousClose>(`https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?apiKey=1Ix_pEbbGO6q5wt_9vzk69eSceoI7QNj`).then(({data})=>{
        const results : PreviousClose = R.path(['results','0'],data) || ClearPreviousClose()
        StockPreviousState.c = results.c
        StockPreviousState.l = results.l
        StockPreviousState.h = results.h
        StockPreviousState.o = results.o
        actions.ToggleLoading()
    }).catch((err)=>{
        actions.ToggleLoading()
        console.log(err)
    })
}


export const ClearStockDetails = () =>{
    // const ClearStock : StockDetails = {
    //     description: "",
    //     name: "",
    //     branding: {
    //       icon_url: "",
    //       logo_url: "",
    //     },
    //     sic_description: "",
    //     ticker: "",
    //     homepage_url: "",
    // }

    StockDetailsState.name =''
    StockDetailsState.description = ''
    StockDetailsState.sic_description = ''
    StockDetailsState.ticker = ''
    StockDetailsState.homepage_url = ''
    StockDetailsState.branding.icon_url = ''
    StockDetailsState.branding.logo_url = ''

    return StockDetailsState

}

export const ClearPreviousClose = () =>{
    const PreviosCLose : PreviousClose = {
        c:0,
        l:0,
        h:0,
        o:0
    }

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

      return StockPreviousState

}

export const ShowAllDetails =  async ({actions}:IAppContext, ticker:string) =>{
    await actions.getTickerDetails(ticker)
    await actions.getPreviousClose(ticker)
    await actions.ChangePageValue()
}

export const getImageURL = async ({actions}:IAppContext, url: string) =>{
    actions.ToggleLoading()
    await axios.get(`${url}`,{
        headers:{
            'Authorization': 'Bearer 1Ix_pEbbGO6q5wt_9vzk69eSceoI7QNj',
        },
        responseType: "arraybuffer",
    }).then((res)=>{
        console.log('png ', res)
        let data = `data:${
            res.headers["content-type"]
          };base64,${new Buffer(res.data, "binary").toString("base64")}`;
        StockDetailsState.branding.icon_url = data
        StockDetailsState.branding.logo_url = data
        actions.ToggleLoading()
    }).catch((err)=>{
        actions.ToggleLoading()
        console.log(err)
    })
}
  