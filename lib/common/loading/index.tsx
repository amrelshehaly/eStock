import React, { FC } from 'react'
import { CircularProgress, Backdrop } from '@mui/material'
import { useTheme } from '@mui/material'

interface Props {
  show: boolean
}

const Loading: FC<Props> = ({ show }) => {
  const theme = useTheme()
  return (
    <div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={show}>
        <CircularProgress color='warning' size='5rem' />
      </Backdrop>
    </div>
  )
}

export default Loading
