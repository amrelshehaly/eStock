import React, { useState, useEffect } from "react";
import SimpleTable from "../../common/table";
import SearchBar from "../../common/searchbar";
import headers from "./headers.json";
import { Container, Box } from "@material-ui/core";
import useStyle from "./style";
import { useAppState, useActions } from "@lib/store";
import ListItems from "../../common/ListItems";
import { useRouter } from 'next/router'
import {StockDetailsState} from '@lib/store/StockDetails'



const DashboardModule = () => {
  const classes = useStyle();
  const { count, next_url, results, currentPage, startSearching,search } = useAppState();
  const {
    LoadMoreStocks,
    ClearResults,
    NextPage,
    PrevPage,
    SearchForStock,
    SetSearching,
    ChangeStartSearching,
    ShowAllDetails,
    
  } = useActions();
  // const [search, setSearch] = useState<string>("");

  const router = useRouter()

  const handleOnSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log(event);
      ChangeStartSearching();
    }
  };

  useEffect(()=>{
    console.log("prev", StockDetailsState.StockPreviousState)
    console.log(StockDetailsState.StockDetailsState)
  },[])

  return (
    <Container className={classes.containers}>
      <h1 >maxpages:{count}</h1>
      <p >currentPage:{currentPage}</p>
      <SearchBar setSearch={SetSearching} onSubmit={handleOnSubmit} search={search} />
      <Box style={{ width: "100%" }}>
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
  );
};

export default DashboardModule;
