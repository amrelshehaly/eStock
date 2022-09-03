import { IAppContext } from "@lib/store";
import axios from "axios";
import { StockDetails, PreviousClose,StockDetailsState } from "./state";
import * as R from 'ramda'


// export const getPreviousClose = async ({state}:IAppContext) =>{

//     await axios.get<PreviousClose>(`https://api.polygon.io/v2/aggs/ticker/${StockDetailsState.stock.ticker}/prev?adjusted=true&apiKey=1Ix_pEbbGO6q5wt_9vzk69eSceoI7QNj`).then((res:any)=>{
//         console.log("Choosen Stock",res.data.results)
//     }).catch((err)=>{
//         console.log(err)
        
//     })
// }

export const getTickerDetails = async ({actions}:IAppContext, ticker:string) =>{
    await axios.get<StockDetails>(`https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=1Ix_pEbbGO6q5wt_9vzk69eSceoI7QNj`).then(({data})=>{
        const results : StockDetails =  R.path(['results'], data) || ClearStockDetails()
        StockDetailsState.ticker = results.ticker
        StockDetailsState.name = results.name
        StockDetailsState.sic_description = results.sic_description
        StockDetailsState.description = results.description
        StockDetailsState.homepage_url = results.homepage_url
        StockDetailsState.branding.icon_url = results.branding?.icon_url
        StockDetailsState.branding.logo_url = results.branding?.logo_url
    }).catch((err)=>{
        console.log(err)
    })
}

// export const assignObjects = () => {    
//     let stock  : StockDetails
    
    
// }   

const ClearStockDetails = () =>{
    const ClearStock : StockDetails = {
        description: "",
        name: "",
        branding: {
          icon_url: "",
          logo_url: "",
        },
        sic_description: "",
        ticker: "",
        homepage_url: "",
    }

    return ClearStock   
   
}

// export const setTicker = async ({actions}:IAppContext,ticker:string, name:string) =>{
//     console.log("ticker",ticker,"name",name)
//     StockDetailsState.stock.ticker = ticker
//     StockDetailsState.stock.name = name
//     await actions.getPreviousClose()
// }

  