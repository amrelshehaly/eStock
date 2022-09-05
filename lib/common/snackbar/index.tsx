import React, { FC } from "react";
import { Snackbar, Alert } from "@mui/material";

interface Props {
  error: string;
  resetErrorMsg: () => void;
}

const SnackBar: FC<Props> = ({ error, resetErrorMsg }) => {
  return (
    <div>
      {error && error.length > 0 && (
        <Snackbar
          open={error.length > 0}
          onClose={resetErrorMsg}
          autoHideDuration={6000}
        >
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default SnackBar;
