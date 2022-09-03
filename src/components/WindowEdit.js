import React, { useState, useEffect } from "react";
import { updateWindow } from "../services/WindowService";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Button, message } from "antd";
import { TextField, MenuItem } from "@material-ui/core";

const WindowEdit = (props) => {
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [priceValid, setPriceValid] = useState(true);
  const [sizeValid, setSizeValid] = useState(true);
  const [priceError, setPriceError] = useState("");
  const [sizeError, setSizeError] = useState("");

  useEffect(() => {
    setType(props.selectedRow?.type);
    setSize(props.selectedRow?.size);
    setMaterial(props.selectedRow?.material);
    setColor(props.selectedRow?.color);
    setPrice(props.selectedRow?.price);
  }, [props.selectedRow]);

  function editRecord(id) {
    const priceRegex = new RegExp("^[0-9]+(.[0-9]{2})?$");
    const sizeRegex = new RegExp("([0-9]+[\\s]X[\\s][0-9]+$)");

    if (priceRegex.test(price) && sizeRegex.test(size)) {
      props.setOpenEditDialog(false);
      updateWindow(id, {
        type: type,
        size: size,
        material: material,
        color: color,
        price: price,
      })
        .then(() => props.fetchWindows(), message.success("Updated"))
        .catch(() => message.error("Something went wrong"));
    }
    if (!priceRegex.test(price)) {
      setPriceValid(false);
      setPriceError("Please enter a valid price *.__");
    } else {
      setPriceValid(true);
      setPriceError("");
    }
    if (!sizeRegex.test(size)) {
      setSizeValid(false);
      setSizeError("Please enter a valid size * X *");
    } else {
      setSizeValid(true);
      setSizeError("");
    }
  }
  return (
    <Dialog
      open={props.openEditDialog}
      onClose={() => props.setOpenEditDialog(false)}
    >
      <DialogContent>
        {<h2>Edit window</h2>}
        <TextField
          autoFocus
          label="Type"
          defaultValue={props.selectedRow?.type}
          required={true}
          fullWidth
          onChange={(e) => setType(e.target.value)}
        />
        <TextField
          label="Size"
          defaultValue={props.selectedRow?.size}
          required={true}
          fullWidth
          onChange={(e) => setSize(e.target.value)}
          error={!sizeValid}
          helperText={sizeError}
        />
        <TextField
          select
          label="Material"
          defaultValue={props.selectedRow?.material}
          required={true}
          fullWidth
          onChange={(e) => setMaterial(e.target.value)}
        >
          <MenuItem value={"UPVC"}>UPVC</MenuItem>
          <MenuItem value={"Wood"}>Wood</MenuItem>
          <MenuItem value={"Aluminum"}>Aluminum</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
        </TextField>
        <TextField
          label="Color"
          defaultValue={props.selectedRow?.color}
          required={true}
          fullWidth
          onChange={(e) => setColor(e.target.value)}
        />
        <TextField
          label="Price $"
          defaultValue={props.selectedRow?.price}
          required={true}
          fullWidth
          onChange={(e) => setPrice(e.target.value)}
          error={!priceValid}
          helperText={priceError}
        />
        <DialogActions>
          <Button
            type="primary"
            danger
            onClick={() => props.setOpenEditDialog(false)}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={() => editRecord(props.selectedRow._id)}
          >
            Save
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default WindowEdit;
