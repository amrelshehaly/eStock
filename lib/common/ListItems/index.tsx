import React, { FC, memo } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import useStyles from './styles'
import { useAppState } from '@lib/store'

import { Box, Button, Typography, Card, CardContent } from '@mui/material'

interface DataList {
  results: any[]
  next_url: string
  current_page: number
  LoadMore: () => void
  ClearArray: () => void
  setNextPage: () => void
  setPrevPage: () => void
  setTicker: (ticker: string) => void
}

const ListItems: FC<DataList> = ({
  results,
  LoadMore,
  setNextPage,
  setPrevPage,
  setTicker,
  next_url,
  current_page,
}) => {
  const classes = useStyles()

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
        loader={() => {}}
      >
        {results.length > 0 ? (
          results.map((val, index) => (
            <Card
              style={{
                border: '1px solid #e0e0e0',
                marginTop: '5px',
              }}
              key={index}
              onClick={() => setTicker(val.ticker)}
            >
              <CardContent sx={{cursor:'pointer'}} className='ticker'>
                <Typography variant='h5' component='div'>
                  {val.ticker}
                </Typography>
                <Typography variant='body2'>{val.name}</Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <div>No Match Found</div>
        )}
      </InfiniteScroll>
      {
        <Box alignContent='center' className={classes.container}>
          {current_page != 0 && (
            <Box className={classes.prevBox}>
              <Button onClick={handlePreviousPage} variant='contained'>
                <ArrowBack />
                Previous
              </Button>
            </Box>
          )}
          {next_url && next_url.length > 0 && (
            <Box className={classes.nextBox}>
              <Button onClick={handleNextPage} variant='contained' className='NextBtn'>
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
