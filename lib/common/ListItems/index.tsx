import React, { FC, memo } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Box, Typography, Card, CardContent } from '@mui/material'

interface DataList {
  results: any[]
  LoadMore: () => void
  setTicker: (ticker: string) => void
}

const ListItems: FC<DataList> = ({ results, LoadMore, setTicker }) => {

  const fetchMoreData = () => {
    if (results.length != 16) {
      LoadMore()
    }
  }

  return (
    <Box>
      <InfiniteScroll dataLength={results.length} next={() => fetchMoreData()} hasMore={true} loader={<h1></h1>}>
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
              <CardContent sx={{ cursor: 'pointer' }} className='ticker'>
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
    </Box>
  )
}

export default memo(ListItems)
