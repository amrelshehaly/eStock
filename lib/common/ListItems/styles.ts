import { Theme } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid #EAECF0',
    height: '70px',
  },
  prevBox: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: '5px',
    '& button': {
      border: '1px solid #D0D5DD',
      color: 'white',
      textTransform: 'none',
      borderRadius: '8px',
      '& svg': {
        fontSize: '18px',
        marginRight: '12px',
      },
    },
  },
  Pages: {
    margin: 'auto',
    textAlign: 'center',
    display: 'flex',
    '& div': {
      width: '40px',
      height: '40px',
      fontWeight: 500,
      fontSize: '14px',
      padding: '1.5%',
      color: '#667085',
    },
  },
  nextBox: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: '5px',
    '& button': {
      border: '1px solid #D0D5DD',
      color: 'white',
      width: '88px',
      textTransform: 'none',
      borderRadius: '8px',
      '& svg': {
        fontSize: '18px',
        marginLeft: '12px',
      },
    },
  },
}))

export default useStyles