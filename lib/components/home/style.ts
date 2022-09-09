import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  containers: {
    marginTop: '20px',
  },
  buttons: {
    backgroundColor: 'white !important',
    color: '#344054 !important',
    borderColor: ' #D0D5DD !important',
    border: '1px solid #D0D5DD !important',
  },
  pagination: {
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
      backgroundColor:'#00897b',
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
      backgroundColor:'#00897b',
      '& svg': {
        fontSize: '18px',
        marginLeft: '12px',
      },
    },
  },
}))

export default useStyles
