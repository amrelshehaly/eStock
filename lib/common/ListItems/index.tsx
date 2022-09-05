import React, {  FC, memo } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import useStyles from './styles'
import { useAppState } from '@lib/store'

import { Box, Button, Typography, Card, CardContent } from '@mui/material'

interface DataList {
  results: any[]
  LoadMore: () => void
  ClearArray: () => void
  setNextPage: () => void
  setPrevPage: () => void
  setTicker: (ticker: string) => void
}

const ListItems: FC<DataList> = ({ results, LoadMore, setNextPage, setPrevPage, setTicker }) => {
  const classes = useStyles()

  const { currentPage } = useAppState().base
  const { next_url } = useAppState().stock


  const fetchMoreData = () => {
    if (results.length == 16) {
      console.log('the arra is 16 in length')
    } else {
      LoadMore()
    }
  }

  const handleNextPage = async () => {
    // setArray([]);
    // ClearArray();
    setNextPage()
    window.scrollTo(0, 0)
    // setHasMore(true);
  }

  const handlePreviousPage = async () => {
    setPrevPage()
  }

  return (
    <Box>
      <InfiniteScroll
        dataLength={results.length}
        next={() => fetchMoreData()}
        hasMore={true}
        refreshFunction={() => LoadMore()}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>}
        releaseToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>}
        loader={results.length < 16 && <h4 style={{ color: 'gold', fontSize: '30px' }}>Loading...</h4>}
        endMessage={<div style={{ color: 'red' }}>yay , you finished loading </div>}
      >
        {results.map((val, index) => (
          <Card
            style={{
              border: '1px solid #e0e0e0',
              marginTop: '5px',
            }}
            key={index}
            onClick={() => setTicker(val.ticker)}
          >
            <CardContent>
              <Typography variant='h5' component='div'>
                {val.ticker}
              </Typography>
              <Typography variant='body2'>{val.name}</Typography>
            </CardContent>
          </Card>
        ))}
      </InfiniteScroll>
      {
        <Box alignContent='center' className={classes.container}>
          {currentPage != 0 && (
            <Box className={classes.prevBox}>
              <Button onClick={handlePreviousPage} variant='contained'>
                <ArrowBack />
                Previous
              </Button>
            </Box>
          )}
          {next_url && next_url.length > 0 && (
            <Box className={classes.nextBox}>
              <Button onClick={handleNextPage} variant='contained'>
                Next
                <ArrowForward />
              </Button>
            </Box>
          )}
        </Box>
      }
    </Box>
  )
}

export default memo(ListItems)
