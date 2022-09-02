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
  setNextPage: () => void;
  setPrevPage: () => void;
}

const ListItems: FC<DataList> = ({
  results,
  LoadMore,
  ClearArray,
  setNextPage,
  setPrevPage,
}) => {
  const classes = useStyles();

  const { next_url, currentPage, memory } = useAppState();
  console.log('this is memory', memory)

  const fetchMoreData = () => {
    if (results.length == 16) {
      console.log("the arra is 16 in length");
    } else {
      console.log("its loading more");
      LoadMore();
    }
  };

  const handleNextPage = async () => {
    // setArray([]);
    // ClearArray();
    setNextPage();
    window.scrollTo(0, 0);
    // setHasMore(true);
  };

  const handlePreviousPage = async () => {
    console.log("clicked");
    setPrevPage();
  };

  return (
    <Box>
      <InfiniteScroll
        dataLength={results.length}
        next={() => fetchMoreData()}
        hasMore={true}
        loader={<h4 style={{ color: "gold", fontSize: "30px" }}>Loading...</h4>}
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
      {
        <Box alignContent="center" className={classes.container}>
          {currentPage != 0 && (
            <Box className={classes.prevBox}>
              <Button onClick={handlePreviousPage} variant="contained">
                <ArrowBack />
                Previous
              </Button>
            </Box>
          )}
          {(next_url && next_url.length > 0) && (
            <Box className={classes.nextBox}>
              <Button onClick={handleNextPage} variant="contained">
                Next
                <ArrowForward />
              </Button>
            </Box>
          )}
        </Box>
      }
    </Box>
  );
};

export default ListItems;
