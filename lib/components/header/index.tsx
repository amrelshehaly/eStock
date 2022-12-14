import React from 'react'
import useStyles from './style'
import { Typography, IconButton } from '@material-ui/core'
import { ArrowBack } from '@mui/icons-material'
import { useAppState, useActions } from '@lib/store'

const Header = () => {
  const { page } = useAppState().base
  const classes = useStyles()
  const { ChangePageValue } = useActions().base

  return (
    <div className={classes.containers}>
      <Typography className={classes.header}>
        {page != 'Home' && (
          <IconButton aria-label='back' onClick={() => ChangePageValue()} className='backBtn'>
            <ArrowBack sx={{ color: 'white' }} />
          </IconButton>
        )}
        {page}
      </Typography>
    </div>
  )
}

export default Header
