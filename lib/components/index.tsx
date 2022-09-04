import React from 'react'
import Home from '@lib/components/home'
import StockDetails from '@lib/components/Stock_Details'
import Header from '@lib/components/header'
import {useAppState, useActions} from '@lib/store'
import Loading from '@lib/common/loading'
import {Snackbar, Alert } from '@mui/material'


const index = () => {
    const {page,loading, error} = useAppState()
    const {ResetErrorMsg} = useActions()
  return (
    <>
    <Header />
    {page == "Home" ? <Home /> : <StockDetails />}
    <Loading show={loading} />
    <Snackbar open={error.length > 0} onClose={() => ResetErrorMsg()} autoHideDuration={6000}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
    </Snackbar>
    </>
  )
}

export default index