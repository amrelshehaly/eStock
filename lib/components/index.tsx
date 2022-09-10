import React from 'react'
import Home from '@lib/components/home'
import StockDetails from '@lib/components/Stock_Details'
import Header from '@lib/components/header'
import { useAppState, useActions } from '@lib/store'
import Loading from '@lib/common/loading'
import SnackBar from '@lib/common/snackbar'

const index = () => {
  const { page, loading, error } = useAppState().base
  const { ResetErrorMsg } = useActions().base
  return (
    <>

      <Header />
      {page == 'Home' ? <Home /> : <StockDetails />}
      <Loading show={loading} />
      <SnackBar error={error} resetErrorMsg={() => ResetErrorMsg()} />
    </>
  )
}

export default index
