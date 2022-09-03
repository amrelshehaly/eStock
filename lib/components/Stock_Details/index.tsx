import React, {useEffect} from 'react'
import { useRouter } from 'next/router'
import { useAppState, useActions } from "@lib/store";
import {StockDetailsState} from '@lib/store/StockDetails'



const StockDetailsComponent = () => {
    const router = useRouter()
    const {ChangePageValue} = useActions()

    useEffect(()=>{
        console.log("here is the details", StockDetailsState)
    },[])

  return (
    <button onClick={()=> ChangePageValue()}>go back</button>
  )
}

export default StockDetailsComponent