import React, { FC } from "react";
import styled from "@emotion/styled";
import useStyles from "./style";
import { Typography, IconButton } from "@material-ui/core";
import { ArrowBack } from "@mui/icons-material";
import { useAppState, useActions } from "@lib/store";


const Header = () => {
  const { page } = useAppState();
  const classes = useStyles();
  // const { toggleTheme } = useActions();
  const {ChangePageValue} = useActions()


  return (
    <div className={classes.containers}>
      <Typography className={classes.header}>
        {page != "Home" && (
          <IconButton aria-label="back" onClick={() => ChangePageValue()}>
            <ArrowBack sx={{color:'white'}} />
          </IconButton>
        )}
        {page}
      </Typography>
    </div>
  );
};

export default Header;
