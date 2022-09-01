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
  const { count, next_url, results } = useAppState()
  const { onInitializeOvermind, LoadMoreStocks, ClearResults, NextPage } = useActions()
  const [search, setSearch] = useState<string>()

  const LoadMore = async () => {
    LoadMoreStocks()
  }

  return (
    <Container className={classes.containers}>
      <h1 style={{ color: 'white' }}>{count}</h1>
      <SearchBar setSearch={setSearch} />
      <Box style={{ width: '100%' }}>
        <ListItems results={results} LoadMore={LoadMore} ClearArray={ClearResults} setNextPage={NextPage} />
        {/* <SimpleTable headers={headers} data={results} /> */}
      </Box>
    </Container>
  )
}

export default DashboardModule
