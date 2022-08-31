import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  searchInputHolder: {
    marginTop: '-12px',
    height: 40,
    width: '30%',
    marginBottom: 26,
    background: '#FFFFFF',
    border: '1px solid #E5E5E5',
    boxShadow: 'none',
    borderRadius: 8,
    padding: '0 10px',
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      color: '#667085',
    },
    '& input': {
      width: '90%',
      height: 30,
      border: 0,
      padding: '0 10px',
      fontSize: 14,
      fontFamily: 'Arial',
      '&::placeholder': {
        color: '#667085',
        opacity: 1,
        fontSize: 14,
        fontFamily: 'Arial',
      },
      '&:focus-visible': {
        outline: '0px !important',
      },
    },
    '@media(max-width: 767px)': {
      width: '80%',
    },
  },
}))

export default useStyles
