import { Theme } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  containers: {
    marginTop: '20px',
  },
  buttons: {
    backgroundColor: 'white !important',
    color: '#344054 !important',
    borderColor: ' #D0D5DD !important',
    border: '1px solid #D0D5DD !important',
  },
}))

export default useStyles
