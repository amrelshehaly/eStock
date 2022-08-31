import React, { useState } from 'react'
import SimpleTable from '../../common/table'
import SearchBar from '../../common/searchbar'
import headers from './headers.json'
import { Container, Box } from '@material-ui/core'
import useStyle from './style'
import { useAppState } from "@lib/store"

const DashboardModule = () => {
  const classes = useStyle()
  const { count, next_url, results } = useAppState()
  const [search, setSearch] = useState<string>()

  return (
    <Container className={classes.containers}>
      <h1 style={{ color: 'white' }}>{count}</h1>
      <SearchBar setSearch={setSearch} />
      <Box style={{ width: '100%' }}>
        <SimpleTable headers={headers} data={results} />
      </Box>
    </Container>
  )
}

export default DashboardModule
