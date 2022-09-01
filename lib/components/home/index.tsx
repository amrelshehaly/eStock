import React, { useState } from 'react'
import SimpleTable from '../../common/table'
import SearchBar from '../../common/searchbar'
import headers from './headers.json'
import { Container, Box } from '@material-ui/core'
import useStyle from './style'
import { useAppState , useActions } from "@lib/store"
import ListItems from '../../common/ListItems'

const DashboardModule = () => {
  const classes = useStyle()
  const { count, next_url, results, currentPage } = useAppState()
  const { onInitializeOvermind, LoadMoreStocks, ClearResults, NextPage, PrevPage } = useActions()
  const [search, setSearch] = useState<string>()


  return (
    <Container className={classes.containers}>
      <h1 style={{ color: 'white' }}>maxpages:{count}</h1>
      <p style={{ color: 'white' }}>currentPage:{currentPage}</p>
      <SearchBar setSearch={setSearch} />
      <Box style={{ width: '100%' }}>
        <ListItems results={results} LoadMore={LoadMoreStocks} ClearArray={ClearResults} setNextPage={NextPage} setPrevPage={PrevPage} />
        {/* <SimpleTable headers={headers} data={results} /> */}
      </Box>
    </Container>
  )
}

export default DashboardModule
