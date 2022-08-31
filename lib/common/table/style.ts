import { styled, TableCell, tableCellClasses, Theme, TableRow } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'

export const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'grey',
    color: 'white',
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

export const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#F9FAFB',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

export const useStyles = makeStyles((theme: Theme) => ({
  DoubleRecord: {
    '& :nth-child(1)': {
      color: '#101828',
      fontWeight: '500',
    },
    '& :nth-child(2)': {
      fontSize: '14px',
      color: ' #667085',
      fontWeight: '400',
    },
  },
}))
