import React, { useState, FC, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import useStyles from "./styles";
import { useAppState, useActions } from "@lib/store";

import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

interface DataList {
  results: any[];
  LoadMore: () => void;
  ClearArray: () => void;
  setNextPage: () => void
}

const ListItems: FC<DataList> = ({ results, LoadMore, ClearArray, setNextPage }) => {
  const { memory } = useAppState();
  console.log("this is memory", memory);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const classes = useStyles();
//   const [array, setArray] = useState<any[]>([]);

  const fetchMoreData = () => {
    if (results.length == 16) {
      setHasMore(false);
    //   console.log("its 16 5alas");
    } else {
        console.log("its loading more")
        LoadMore();
    }
  };

  const handleNextPage = async () => {
    // setArray([]);
    ClearArray()
    setNextPage()
    setHasMore(true);
  };

//   useEffect(() => {
//     setArray((prev) => prev.concat(results));
//   }, [results]);

  return (
    <Box>
      <InfiniteScroll
        dataLength={results.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <div style={{ color: "red" }}>yay , you finished loading </div>
        }
      >
        {results.map((val, index) => (
          <div
            style={{
              color: "white",
              border: "1px solid green",
              marginTop: "5px",
            }}
            key={index}
          >
            <h1>{val.ticker}</h1>
            <p> {val.name}</p>
          </div>
        ))}
      </InfiniteScroll>
      {!hasMore && (
        <Box alignContent="center" className={classes.container}>
          <Box className={classes.prevBox}>
            <Button variant="contained">
              <ArrowBack />
              Previous
            </Button>
          </Box>
          <Box className={classes.nextBox}>
            <Button onClick={handleNextPage} variant="contained">
              Next
              <ArrowForward />
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ListItems;
