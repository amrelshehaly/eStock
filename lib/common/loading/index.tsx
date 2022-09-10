import React, { FC } from 'react'
import { CircularProgress, Backdrop } from '@mui/material'

interface Props {
  show: boolean
}

const Loading: FC<Props> = ({ show }) => {
  return (
    <div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={show}>
        <CircularProgress color='warning' size='5rem' />
        <h1 style={{marginLeft:'30px'}}>Please wait ...</h1>
      </Backdrop>
    </div>
  )
}

export default Loading
