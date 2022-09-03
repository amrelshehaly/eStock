import React from 'react'
import Home from '@lib/components/home'
import StockDetails from '@lib/components/Stock_Details'
import {useAppState} from '@lib/store'

const index = () => {
    const {page} = useAppState()
  return (
    <>{page == "home" ? <Home /> : <StockDetails />}</>
  )
}

export default index