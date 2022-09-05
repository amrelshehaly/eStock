import { Theme } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  containers: {
    background: theme.palette.primary.main,
    height: '100px',
  },
  header: {
    padding: '28px',
    color: 'white',
    fontSize: '30px',
    fontWeight: 700,
  },
  buttons: {
    backgroundColor: 'white !important',
    color: '#344054 !important',
    borderColor: ' #D0D5DD !important',
    border: '1px solid #D0D5DD !important',
  },
}))

export default useStyles
