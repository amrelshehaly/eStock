import React from 'react'
import { useRouter } from 'next/router'
import { useAppState, useActions } from "@lib/store";



const StockDetailsComponent = () => {
    const router = useRouter()
  return (
    <button onClick={()=> router.push('/',undefined,{shallow:true})}>go back</button>
  )
}

export default StockDetailsComponent