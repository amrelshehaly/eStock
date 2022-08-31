import React, { FC, useState } from 'react'
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { useStyles, StyledTableCell, StyledTableRow } from './style'
import { HeaderRow, DataRow } from './interface'
import * as R from 'ramda'

const SimpleTable: FC<DataRow> = ({ headers, data, actions }) => {
  const classes = useStyles()
  const [page, setPage] = useState<number>(0)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleDataRow = (data: unknown) => {
    const array: string[] = []
    return headers.map((val: HeaderRow, _idx: any) => {
      // console.log(data)
      const dataCell: string = R.path(val.key, data) || ''
      if (matches) {
        array.push(dataCell)
        // console.log(array)
        if (array.length == 2) {
          return (
            <StyledTableCell className={classes.DoubleRecord} component='th' key={_idx} align='left'>
              <Typography>{array[0]}</Typography>
              <Typography>{array[1]}</Typography>
            </StyledTableCell>
          )
        }
      } else {
        return (
          <StyledTableCell key={_idx} align='center'>
            {dataCell}
          </StyledTableCell>
        )
      }
    })
  }

  return (
    <Paper elevation={10}>
      <TableContainer>
        <Table aria-label='customized table'>
          {!matches && (
            <TableHead>
              <TableRow>
                {headers.map((val: any, idx: any) => {
                  return (
                    <StyledTableCell key={idx} align='center'>
                      {val.name}
                    </StyledTableCell>
                  )
                })}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((val: any, _idx: any) => {
              return <StyledTableRow key={_idx}>{handleDataRow(val)}</StyledTableRow>
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component='div'
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default SimpleTable
