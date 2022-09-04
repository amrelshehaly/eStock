import React from 'react'
import Home from '@lib/components/home'
import StockDetails from '@lib/components/Stock_Details'
import Header from '@lib/components/header'
import {useAppState} from '@lib/store'
import Loading from '@lib/common/loading'


const index = () => {
    const {page,loading} = useAppState()
  return (
    <>
    <Header />
    {page == "Home" ? <Home /> : <StockDetails />}
    <Loading show={loading} />
    </>
  )
}

export default index