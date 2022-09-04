import React from 'react'
import Home from '@lib/components/home'
import StockDetails from '@lib/components/Stock_Details'
import Header from '@lib/components/header'
import {useAppState} from '@lib/store'

const index = () => {
    const {page} = useAppState()
  return (
    <>
    <Header />
    {page == "Home" ? <Home /> : <StockDetails />
    }</>
  )
}

export default index