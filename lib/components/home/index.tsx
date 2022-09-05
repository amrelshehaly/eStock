import React from 'react'
import SearchBar from '../../common/searchbar'
import { Container, Box } from '@material-ui/core'
import useStyle from './style'
import { useAppState, useActions } from '@lib/store'
import ListItems from '../../common/ListItems'

const DashboardModule = () => {
  const classes = useStyle()
  const { count, currentPage, startSearching, search } = useAppState().base
  const { results } = useAppState().stock
  const { NextPage, ChangeStartSearching, ClearResults, PrevPage, SetSearching } = useActions().base
  const { ShowAllDetails } = useActions().StockDetails
  const { LoadMoreStocks, SearchForStock } = useActions().Stock


  const handleOnSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      ChangeStartSearching()
    }
  }

  return (
    <Container className={classes.containers}>
      <h1>maxpages:{count}</h1>
      <p>currentPage:{currentPage}</p>
      <SearchBar setSearch={SetSearching} onSubmit={handleOnSubmit} search={search} />
      <Box style={{ width: '100%' }}>
        <ListItems
          setTicker={ShowAllDetails}
          results={results}
          LoadMore={startSearching ? SearchForStock : LoadMoreStocks}
          ClearArray={ClearResults}
          setNextPage={NextPage}
          setPrevPage={PrevPage}
        />
      </Box>
    </Container>
  )
}

export default DashboardModule
