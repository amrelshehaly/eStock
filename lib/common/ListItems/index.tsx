import React, { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import useStyles from "./styles";
import {useAppState} from "@lib/store"


import {
  Box,
  Button,
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

    const {memory} = useAppState()
    console.log('this is the memory',memory)

  const classes = useStyles();

  const fetchMoreData = () => {
    if (results.length == 16) {
        console.log("the arra is 16 in length")
    } else {
      console.log("its loading more");
        LoadMore();
    }
  };

  const handleNextPage = async () => {
    // setArray([]);
    // ClearArray();
    setNextPage();
    // scroll.scrollToTop()
    window.scrollTo(0, 0)
    // setHasMore(true);
  };

  const handlePreviousPage = async () => {
    console.log("clicked")
    setPrevPage();
  };

  return (
    <Box>
        {/* <div
            id="scrollableDiv"
            style={{
                height: 700,
                overflow: "auto" 
            }}
            > */}
            <InfiniteScroll
                dataLength={results.length}
                next={fetchMoreData}
                hasMore={true}
                scrollThreshold={1}
                loader={results.length < 16 && <h4 style={{color:'gold', fontSize:'30px'}}>Loading...</h4>}
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
      {/* </div> */}
      {(results.length == 16) && (
        <Box alignContent="center" className={classes.container}>
          <Box className={classes.prevBox}>
            <Button onClick={handlePreviousPage} variant="contained">
              <ArrowBack  />
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
