import React from 'react'
import SearchBar from '../../common/searchbar'
import { Container, Box, Button } from '@material-ui/core'
import useStyle from './style'
import { useAppState, useActions } from '@lib/store'
import ListItems from '../../common/ListItems'
import { ArrowBack, ArrowForward } from '@mui/icons-material'

const DashboardModule = () => {
  const classes = useStyle()
  const { count, currentPage, search } = useAppState().base
  const { results, next_url } = useAppState().stock
  const { NextPage, PrevPage, SetSearching, ClearResults } = useActions().base
  const { ShowAllDetails } = useActions().StockDetails
  const { LoadMoreStocks, SearchForStock } = useActions().Stock

  const handleOnSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      ClearResults()
      SearchForStock()
    }
  }

  const handlePrevPage = async () =>{
    window.scrollTo(0, 0)
    PrevPage()
  }

  const handleNextPage = async () => {
    window.scrollTo(0, 0)
    NextPage()
  }

  return (
    <Container className={classes.containers}>
      <SearchBar setSearch={SetSearching} onSubmit={handleOnSubmit} search={search} />
      <Box style={{ width: '100%' }}>
        <ListItems
          setTicker={ShowAllDetails}
          results={results}
          LoadMore={LoadMoreStocks}
        />
      </Box>
      <Box alignContent='center' className={classes.pagination}>
        {currentPage != 0 && (
          <Box className={classes.prevBox}>
            <Button color='secondary'  onClick={handlePrevPage} variant='contained'>
              <ArrowBack />
              Previous
            </Button>
          </Box>
        )}
        <Box className={classes.Pages}>
          {currentPage} - {count}
        </Box>
        {next_url && next_url.length > 0 && (
          <Box className={classes.nextBox}>
            <Button color='secondary' onClick={handleNextPage} variant='contained' className='NextBtn'>
              Next
              <ArrowForward />
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  )
}

export default DashboardModule
