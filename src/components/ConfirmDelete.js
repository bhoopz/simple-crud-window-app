import React from "react";
import { Button, message } from "antd";
import "antd/dist/antd.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { deleteWindow } from "../services/WindowService";

const ConfirmDelete = (props) => {
  function deleteRecord(id) {
    props.setOpenDeleteDialog(false);
    deleteWindow(id)
      .then(() => props.fetchWindows(), message.success("Deleted"))
      .catch(() => message.error("Something went wrong"));
  }

  return (
    <Dialog
      open={props.openDeleteDialog}
      onClose={() => props.setOpenDeleteDialog(false)}
    >
      <DialogContent>
        {<h2>Are you sure to delete this record?</h2>}
        <DialogActions>
          <Button
            type="primary"
            onClick={() => props.setOpenDeleteDialog(false)}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => deleteRecord(props.selectedRow._id)}
          >
            Yes
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDelete;
