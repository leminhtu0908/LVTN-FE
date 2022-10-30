import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const ConfirmDialog = (props) => {
  const handleClose = (status) => {
    props.closeDialog(status);
  };
  return (
    <>
      <Dialog
        open={props.openDialog}
        onClose={(e) => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title p-4"></DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => handleClose(false)}
            color="error"
            variant="contained"
          >
            HỦY BỎ
          </Button>
          <Button
            onClick={(e) => handleClose(true)}
            color="success"
            autoFocus
            variant="contained"
          >
            ĐỒNG Ý
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmDialog;
